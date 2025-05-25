import React, { useState, useCallback, useEffect } from 'react';
import { PhoneForm } from './components/PhoneForm';
import { ResultDisplay } from './components/ResultDisplay';
import { searchBonusCode, ConfigurationError, NetworkFetchError, SheetNotFoundError, SheetFetchStatusError, InvalidCsvFormatError, CsvProcessingError } from './services/sheetService';
import { GOOGLE_SHEET_CSV_URL } from './constants';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { IntroAnimation } from './components/IntroAnimation';

const App: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [bonusCode, setBonusCode] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [formSubmissionError, setFormSubmissionError] = useState<string | null>(null);
    const [showIntro, setShowIntro] = useState<boolean>(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowIntro(false);
        }, 4000); 
        return () => clearTimeout(timer);
    }, []);

    const handlePhoneNumberChange = useCallback((number: string) => {
        setPhoneNumber(number);
        setBonusCode(null); 
        setError(null);     
        setFormSubmissionError(null); 
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setBonusCode(null);
        setFormSubmissionError(null); 

        if (GOOGLE_SHEET_CSV_URL === 'REPLACE_WITH_YOUR_GOOGLE_SHEET_PUBLISHED_CSV_URL') {
          setError('Erro de configuração: A URL da Planilha Google não está configurada. Por favor, edite o arquivo \'constants.ts\'.');
          return;
        }

        const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
        
        if (cleanedPhoneNumber.length !== 11) {
            setFormSubmissionError('Formato de telefone inválido. Por favor, insira um número com DDD e 9 dígitos (total 11 dígitos). Ex: 11987654321');
            return;
        }

        setIsLoading(true);
        try {
            const foundCode = await searchBonusCode(cleanedPhoneNumber);
            if (foundCode) {
                setBonusCode(foundCode);
                setError(null);
            } else {
                setError('Desculpe, não encontramos um código de bônus ativo para este número de telefone. Verifique o número e tente novamente.');
                setBonusCode(null);
            }
        } catch (err: any) { 
            console.error("Erro ao buscar bônus:", err);
            let specificErrorMessage: string;

            if (err instanceof ConfigurationError) {
                specificErrorMessage = "Erro de configuração: A URL da Planilha Google não está configurada. Por favor, verifique o arquivo 'constants.ts'.";
            } else if (err instanceof SheetNotFoundError) { 
                specificErrorMessage = err.message; 
            } else if (err instanceof SheetFetchStatusError) { 
                if (err.status === 400) {
                    specificErrorMessage = `Erro (${err.status}) ao buscar os dados da planilha. Isso geralmente indica que a URL da planilha (no arquivo 'constants.ts') está incorreta ou a planilha não está publicada corretamente na web como CSV.`;
                } else {
                    specificErrorMessage = `Ocorreu um erro (${err.status}) ao conectar com a planilha. Por favor, tente novamente mais tarde.`;
                }
            } else if (err instanceof NetworkFetchError) {
                specificErrorMessage = 'Erro de rede ao tentar acessar a planilha. Verifique sua conexão com a internet e a validade da URL da planilha (no arquivo \'constants.ts\').';
            } else if (err instanceof InvalidCsvFormatError) {
                specificErrorMessage = err.message; 
            } else if (err instanceof CsvProcessingError) {
                specificErrorMessage = err.message; 
            } else {
                 specificErrorMessage = "Ocorreu um erro inesperado ao processar sua solicitação. Por favor, tente novamente.";
            }
            setError(specificErrorMessage);
            setBonusCode(null);
        } finally {
            setIsLoading(false);
        }
    }, [phoneNumber]); 

    if (showIntro) {
        return <IntroAnimation />;
    }

    return (
        <div className="min-h-screen font-sans flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8 animate-main-fade-in">
            <div className="max-w-md w-full space-y-8">
                <Header />

                <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl transition-all duration-300">
                    <PhoneForm
                        phoneNumber={phoneNumber}
                        onPhoneNumberChange={handlePhoneNumberChange}
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                        formError={formSubmissionError}
                    />
                    <ResultDisplay
                        bonusCode={bonusCode}
                        error={error}
                        isLoading={isLoading}
                        initialMessage="Digite seu número de telefone para encontrar seu código de bônus exclusivo."
                    />
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default App;