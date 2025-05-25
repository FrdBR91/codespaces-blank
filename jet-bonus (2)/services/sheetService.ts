
import { GOOGLE_SHEET_CSV_URL } from '../constants';
import { BonusRecord } from '../types';

// Definição de classes de erro personalizadas
export class ConfigurationError extends Error { constructor(message: string) { super(message); this.name = "ConfigurationError"; } }
export class NetworkFetchError extends Error { constructor(message: string) { super(message); this.name = "NetworkFetchError"; } }
export class SheetNotFoundError extends Error { constructor(message: string) { super(message); this.name = "SheetNotFoundError"; } }
export class SheetFetchStatusError extends Error { 
    public status: number;
    constructor(message: string, status: number) { 
        super(message); 
        this.name = "SheetFetchStatusError"; 
        this.status = status;
    } 
}
export class InvalidCsvFormatError extends Error { constructor(message: string) { super(message); this.name = "InvalidCsvFormatError"; } }
export class CsvProcessingError extends Error { constructor(message: string) { super(message); this.name = "CsvProcessingError"; } }


// Função auxiliar para limpar números de telefone (remover não-dígitos)
const cleanPhoneNumber = (phoneNumber: string): string => {
    if (typeof phoneNumber !== 'string') return '';
    return phoneNumber.replace(/\D/g, '');
};

// Adaptação da função parseCsv para garantir que lida com os cabeçalhos esperados
const parseCsv = (csvText: string): BonusRecord[] => {
    const lines = csvText.trim().split(/\r?\n/).filter(line => line.trim() !== ''); // Trata tanto \n quanto \r\n
    if (lines.length < 1) {
        console.warn("CSV fornecido está vazio ou contém apenas linhas em branco.");
        return [];
    }

    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    const phoneNumberHeaderIndex = headers.indexOf('PhoneNumber');
    const bonusCodeHeaderIndex = headers.indexOf('BonusCode');

    if (phoneNumberHeaderIndex === -1 || bonusCodeHeaderIndex === -1) {
        const errorMsg = `Formato do CSV da planilha inválido: Não foram encontrados os cabeçalhos 'PhoneNumber' e 'BonusCode'. Verifique a documentação e os cabeçalhos do seu CSV. Cabeçalhos encontrados: [${headers.join(', ')}]`;
        console.warn(errorMsg);
        throw new InvalidCsvFormatError(errorMsg);
    }
    
    if (lines.length < 2) {
        console.warn("CSV contém cabeçalhos, mas nenhuma linha de dados.");
        return [];
    }

    const records: BonusRecord[] = [];
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(value => value.trim().replace(/^"|"$/g, ''));
        if (values.length >= Math.max(phoneNumberHeaderIndex, bonusCodeHeaderIndex) + 1) {
             const record: BonusRecord = {};
             headers.forEach((header, index) => {
                record[header] = values[index] || ""; 
             });
             if (record['PhoneNumber'] !== undefined && record['BonusCode'] !== undefined) {
                records.push(record);
             } else {
                console.warn(`Pulando linha devido a colunas essenciais inesperadamente ausentes após o parsing: ${lines[i]}`);
             }
        } else {
          console.warn(`Pulando linha CSV malformada (valores insuficientes para cabeçalhos): ${lines[i]}`);
        }
    }
    return records;
};


export const searchBonusCode = async (searchNumber: string): Promise<string | null> => {
    // A string placeholder exata pode não ser a melhor forma de verificar configuração,
    // mas mantendo a lógica original de verificação.
    if (!GOOGLE_SHEET_CSV_URL || GOOGLE_SHEET_CSV_URL === 'REPLACE_WITH_YOUR_GOOGLE_SHEET_PUBLISHED_CSV_URL') {
        throw new ConfigurationError('Erro de configuração: A URL da Planilha Google não está configurada.');
    }

    let response: Response;
    try {
        response = await fetch(GOOGLE_SHEET_CSV_URL, { cache: "no-store" });
    } catch (error) {
        console.error('Erro de rede ao buscar CSV:', error);
        throw new NetworkFetchError('Falha ao buscar a planilha: Erro de rede. Verifique sua conexão ou a URL da planilha.');
    }
    
    if (!response.ok) {
        console.error(`Falha ao buscar CSV: ${response.status} ${response.statusText}`);
        if (response.status === 404) {
             throw new SheetNotFoundError(`Falha ao buscar a planilha: URL não encontrada (404). Verifique se a URL está correta e a planilha publicada.`);
        }
        throw new SheetFetchStatusError(`Falha ao buscar a planilha. Status: ${response.status}`, response.status);
    }

    const csvText = await response.text();
    if (!csvText.trim()) {
        console.warn('CSV buscado está vazio.');
        return null; // Não é um erro necessariamente, pode ser uma planilha vazia.
    }
  
    try {
        const records = parseCsv(csvText);
        const cleanedSearchNumber = cleanPhoneNumber(searchNumber);

        const foundRecord = records.find(record => {
            const recordPhoneNumber = cleanPhoneNumber(record.PhoneNumber); // Limpa também o número da planilha para comparação robusta
            return recordPhoneNumber === cleanedSearchNumber;
        });

        return foundRecord ? foundRecord.BonusCode : null;

    } catch (error: any) {
        console.error("Erro ao processar CSV em sheetService:", error);
        if (error instanceof InvalidCsvFormatError) { // Re-throw se já for do tipo correto
             throw error; 
        }
        // Para outros erros de parsing ou processamento não previstos
        throw new CsvProcessingError("Ocorreu um erro ao processar os dados da planilha.");
    }
};
