
import React from 'react';
import { GOOGLE_SHEET_CSV_URL } from '../constants';

interface InstructionsProps {
  id?: string;
}

export const Instructions: React.FC<InstructionsProps> = ({ id }) => {
  const isUrlConfigured = GOOGLE_SHEET_CSV_URL !== 'REPLACE_WITH_YOUR_GOOGLE_SHEET_PUBLISHED_CSV_URL';

  return (
    <div id={id} className="mt-6 p-6 bg-white shadow-lg rounded-lg border border-gray-200 space-y-6 text-sm">
      <h2 className="text-xl font-semibold text-[#007bff] text-center">Guia de Uso e Configuração da Planilha Google</h2>
      
      {!isUrlConfigured && (
        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700">
          <p className="font-bold">Ação Requerida: URL da Planilha Não Configurada</p>
          <p className="text-justify">A URL da Planilha Google ainda não foi definida. Por favor, edite o arquivo <code className="bg-gray-200 text-gray-800 px-1 rounded text-xs">src/constants.ts</code> com a URL correta.</p>
        </div>
      )}
      {isUrlConfigured && (
        <div className="p-4 bg-green-50 border-l-4 border-green-400 text-green-700">
          <p className="font-bold">Status da Configuração: URL da Planilha Configurada</p>
          <p className="break-all text-justify">URL Atual: <code className="bg-gray-200 text-gray-800 px-1 rounded text-xs">{GOOGLE_SHEET_CSV_URL}</code></p>
          <p className="text-xs mt-1 text-justify">Se encontrar problemas, verifique se esta URL está correta e se a planilha está publicada como CSV e acessível publicamente.</p>
        </div>
      )}

      <p className="text-gray-700 text-justify">Para que este aplicativo funcione, sua Planilha Google (contendo números de telefone e códigos de bônus) deve ser publicada na web como um arquivo CSV (Valores Separados por Vírgula).</p>
      
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">Passos para Publicar sua Planilha:</h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-600 pl-4">
          <li className="text-justify">Abra sua Planilha Google.</li>
          <li className="text-justify">No menu, vá em <code className="font-semibold">Arquivo</code> &gt; <code className="font-semibold">Compartilhar</code> &gt; <code className="font-semibold">Publicar na web</code>.</li>
          <li className="text-justify">
            Na janela "Publicar na web", na aba "Link":
            <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
              <li className="text-justify">**Importante:** No primeiro menu suspenso, selecione a planilha específica (aba) que contém os dados de bônus (ex: "DadosBonus", "Página1"). Não selecione "Documento inteiro" se você tiver múltiplas abas e apenas uma contiver os dados relevantes.</li>
              <li className="text-justify">No segundo menu suspenso, escolha <code className="font-semibold">Valores separados por vírgula (.csv)</code> como formato.</li>
            </ul>
          </li>
          <li className="text-justify">Em "Conteúdo publicado e configurações" (pode estar abaixo ou exigir expansão):
            <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                <li className="text-justify">Certifique-se que a opção "Publicar automaticamente quando alterações são feitas" está marcada se desejar que as atualizações na planilha reflitam automaticamente (pode levar alguns minutos).</li>
            </ul>
          </li>
          <li className="text-justify">Clique no botão verde <code className="bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">Publicar</code> e confirme.</li>
          <li className="text-justify">Uma URL será gerada. Copie esta URL.</li>
          <li className="text-justify">Abra o arquivo <code className="bg-gray-200 text-gray-800 px-1 rounded text-xs">src/constants.ts</code> neste projeto.</li>
          <li className="text-justify">Substitua a string placeholder <code className="bg-gray-200 text-gray-800 px-1 rounded text-xs">'REPLACE_WITH_YOUR_GOOGLE_SHEET_PUBLISHED_CSV_URL'</code> pela URL que você copiou. Salve o arquivo.</li>
        </ol>
      </div>

      <div className="pt-4 border-t border-gray-200 space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">Requisitos Críticos da Estrutura do CSV:</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600 pl-4">
            <li className="text-justify">A primeira linha do seu CSV (após a publicação) <strong>DEVE</strong> ser a linha de cabeçalho.</li>
            <li className="text-justify"><strong>Sensível a Maiúsculas/Minúsculas:</strong> Seu CSV <strong>DEVE</strong> ter uma coluna com o cabeçalho exatamente <code className="font-bold bg-gray-200 text-gray-800 px-1 rounded text-xs">PhoneNumber</code>.</li>
            <li className="text-justify"><strong>Sensível a Maiúsculas/Minúsculas:</strong> Seu CSV <strong>DEVE</strong> ter uma coluna com o cabeçalho exatamente <code className="font-bold bg-gray-200 text-gray-800 px-1 rounded text-xs">BonusCode</code>.</li>
            <li className="text-justify">Outras colunas são permitidas, mas serão ignoradas pela aplicação.</li>
            <li className="text-justify"><strong>Formato dos Números de Telefone:</strong> Para melhor compatibilidade, armazene os números de telefone na sua planilha em um formato consistente, idealmente apenas dígitos (ex: <code className="bg-gray-200 text-gray-800 px-1 rounded text-xs">11987654321</code>). O aplicativo tentará limpar os números removendo caracteres não numéricos, mas a consistência na origem é preferível.</li>
        </ul>
        <p className="text-xs text-gray-500 mt-2 text-justify">Exemplo de conteúdo da planilha (antes de publicar como CSV):</p>
        <pre className="bg-gray-100 p-3 rounded text-xs text-gray-700 overflow-x-auto border border-gray-200">
PhoneNumber,BonusCode,DescricaoOpcional<br/>
11987654321,BEMVINDO10,Bonus para novos clientes<br/>
22123456789,PROMO20,Promocao especial
        </pre>
      </div>

      <div className="pt-4 border-t border-gray-200 space-y-3">
        <h3 className="text-lg font-semibold text-red-600">Diagnóstico de Problemas Comuns:</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600 pl-4">
          <li className="text-justify"><strong>Erro "Formato do CSV da planilha inválido..." ou "Cabeçalhos não encontrados":</strong>
            <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
              <li className="text-justify">Verifique se os nomes dos cabeçalhos <code className="font-bold text-xs">PhoneNumber</code> e <code className="font-bold text-xs">BonusCode</code> estão EXATAMENTE corretos na sua planilha (sem espaços extras, mesma capitalização).</li>
              <li className="text-justify">Certifique-se de que publicou a ABA CORRETA da sua planilha que contém esses cabeçalhos.</li>
              <li className="text-justify">Abra a URL do CSV publicada diretamente no seu navegador. Você deve ver o texto puro do CSV. Verifique se os cabeçalhos aparecem na primeira linha como esperado.</li>
            </ul>
          </li>
          <li className="text-justify"><strong>Códigos não encontrados para números válidos:</strong>
            <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
              <li className="text-justify">Verifique se o número de telefone existe na coluna <code className="font-bold text-xs">PhoneNumber</code> da sua planilha e se possui um código na coluna <code className="font-bold text-xs">BonusCode</code> na mesma linha.</li>
              <li className="text-justify">Lembre-se que as alterações na planilha podem levar alguns minutos para serem refletidas no CSV publicado, a menos que você force uma nova publicação.</li>
            </ul>
          </li>
          <li className="text-justify"><strong>Erro "URL não encontrada (404)" ou problemas de conexão:</strong>
            <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
              <li className="text-justify">A URL no arquivo <code className="bg-gray-200 text-gray-800 px-1 rounded text-xs">src/constants.ts</code> está correta? Copie e cole-a no navegador para testar.</li>
              <li className="text-justify">A planilha ainda está publicada? (O Google Sheets permite despublicar).</li>
            </ul>
          </li>
           <li className="text-justify"><strong>Alterações na planilha não refletem no app:</strong>
            <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
              <li className="text-justify">O Google Sheets atualiza o CSV publicado em intervalos. Se "Publicar automaticamente quando alterações são feitas" estiver ativo, aguarde alguns minutos.</li>
              <li className="text-justify">Para forçar a atualização imediata, você pode precisar ir em `Arquivo > Compartilhar > Publicar na Web`, clicar em "Conteúdo publicado e configurações", depois "Parar publicação" e então "Publicar" novamente para gerar um CSV atualizado (a URL pode ou não mudar).</li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-yellow-600">Nota Importante de Segurança:</h3>
        <p className="text-gray-600 text-justify">Publicar sua planilha na web torna seu conteúdo acessível a qualquer pessoa que tenha o link. Se sua planilha contiver informações sensíveis além do necessário para esta aplicação, este método pode não ser adequado. Para dados altamente sensíveis, considere implementar um serviço de backend que utilize a API do Google Sheets com autenticação apropriada.</p>
      </div>
    </div>
  );
};