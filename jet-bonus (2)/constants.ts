// constants.ts

// IMPORTANTE: SUBSTITUA ESTA URL pela URL real da sua Planilha Google publicada como CSV.
// Correção: Alterado o valor inicial para a string placeholder para corresponder à lógica de comparação e resolver erros de tipo.
// Fix: Explicitly type GOOGLE_SHEET_CSV_URL as string and set its initial value to the placeholder
// to prevent type errors in comparisons and to ensure correct application logic for configuration checks.
export const GOOGLE_SHEET_CSV_URL: string = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRVBXE-7Pk2bLUr078JPMwePyyxWh6sc_e-ax6QnArYrQW9C0h4N7-kMiilTXhY4MfKfd6_I7j0HiID/pub?output=csv';

// Instruções para publicar sua Planilha Google:
// 1. Abra sua Planilha Google.
// 2. Vá em Arquivo > Compartilhar > Publicar na web.
// 3. Na aba "Link":
//    - Selecione a planilha específica contendo os números de telefone e códigos de bônus.
//    - Escolha "Valores separados por vírgula (.csv)" como formato.
// 4. Em "Conteúdo publicado e configurações", certifique-se de que "Documento inteiro" ou a planilha correta esteja selecionada.
// 5. Clique em "Publicar" e confirme.
// 6. Copie a URL gerada e cole-a acima, substituindo a string placeholder.
// Alternativamente, para uma planilha compartilhada como "Qualquer pessoa com o link pode ver", você pode frequentemente usar o formato:
// https://docs.google.com/spreadsheets/d/{SEU_ID_DA_PLANILHA}/export?format=csv&gid={GID_DA_SUA_PLANILHA}
// Para a primeira planilha (gid=0), seria: https://docs.google.com/spreadsheets/d/{SEU_ID_DA_PLANILHA}/export?format=csv&gid=0
// Para links /pubhtml, o formato é: https://docs.google.com/spreadsheets/d/e/{SEU_ID_LONGO_PUBLICADO}/pub?output=csv

// Requisitos da Estrutura do Arquivo CSV:
// - A primeira linha do seu CSV DEVE ser uma linha de cabeçalho.
// - Você DEVE ter uma coluna chamada 'PhoneNumber' (sensível a maiúsculas/minúsculas) para números de telefone.
// - Você DEVE ter uma coluna chamada 'BonusCode' (sensível a maiúsculas/minúsculas) para os códigos de bônus correspondentes.
// - Os números de telefone devem estar em um formato consistente, preferencialmente apenas dígitos, para correspondência confiável.

// Exemplo de conteúdo CSV:
// PhoneNumber,BonusCode,OutraColunaOpcional
// "11987654321","BEMVINDO10",AlgumDado
// "22123456789","ESPECIAL20",MaisDados

// Nota de Segurança: Publicar sua planilha na web torna seu conteúdo publicamente acessível a qualquer pessoa com o link.
// Para dados sensíveis, considere usar um serviço de backend para acessar de forma segura a API do Google Sheets.