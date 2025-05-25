
import React, { useState } from 'react';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { ExclamationTriangleIcon } from './icons/ExclamationTriangleIcon';
import { InformationCircleIcon } from './icons/InformationCircleIcon';

interface ResultDisplayProps {
    bonusCode: string | null;
    error: string | null;
    initialMessage?: string;
    isLoading?: boolean;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ bonusCode, error, initialMessage, isLoading }) => {
    const [copied, setCopied] = useState(false);

    const handleCopyCode = () => {
        if (bonusCode) {
            navigator.clipboard.writeText(bonusCode).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); 
            }).catch(err => {
                console.error('Falha ao copiar código: ', err);
            });
        }
    };
    
    if (isLoading) { 
        return null;
    }

    if (bonusCode) {
        return (
            <div className="bg-green-50 p-6 rounded-lg flex flex-col items-start space-y-4 mt-6 border border-green-200 shadow-sm">
                <div className="flex items-start space-x-3">
                    <CheckCircleIcon className="h-7 w-7 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <h3 className="text-xl font-semibold text-green-700">Seu código de bônus é:</h3>
                        <p className="text-3xl font-bold text-green-700 break-words bg-green-100 px-4 py-2 rounded-md inline-block mt-2">
                            {bonusCode}
                        </p>
                        <p className="text-sm text-green-600 mt-2 text-justify">Por favor, guarde este código.</p>
                    </div>
                </div>
                <button
                    onClick={handleCopyCode}
                    className={`mt-3 px-5 py-2.5 text-sm font-medium rounded-lg shadow-sm transition-all duration-150 ease-in-out transform ${
                        copied 
                        ? 'bg-slate-400 text-white cursor-default' 
                        : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 hover:scale-105 hover:shadow-md'
                    }`}
                    disabled={copied}
                    aria-live="polite"
                >
                    {copied ? 'Copiado!' : 'Copiar Código'}
                </button>
            </div>
        );
    }

    if (error) {
        let icon = <ExclamationTriangleIcon className="h-7 w-7 text-red-500 flex-shrink-0 mt-0.5" />;
        let title = "Erro!";
        let containerClasses = "bg-red-50 border-red-200";
        let titleColor = "text-red-700";
        let textColor = "text-red-600";

        if (error.includes("não encontramos um código de bônus ativo")) {
            title = "Código de Bônus Não Encontrado";
        } else if (error.includes("Formato de telefone inválido")) {
            title = "Número Inválido";
        } else if (error.includes("Erro de configuração") || error.includes("URL da planilha não configurada") || error.includes("Formato do CSV da planilha inválido")) {
            title = "Erro de Configuração";
            icon = <InformationCircleIcon className="h-7 w-7 text-amber-500 flex-shrink-0 mt-0.5" />;
            containerClasses = "bg-amber-50 border-amber-300";
            titleColor = "text-amber-700";
            textColor = "text-amber-600";
        } else if (error.includes("Erro de rede") || error.includes("conectar com a planilha")) {
            title = "Problema de Conexão";
        }

        return (
            <div className={`${containerClasses} p-6 rounded-lg flex items-start space-x-3 mt-6 border shadow-sm`}>
                {icon}
                <div>
                    <h3 className={`text-xl font-semibold ${titleColor}`}>{title}</h3>
                    <p className={`text-base ${textColor} text-justify`}>{error}</p>
                </div>
            </div>
        );
    }

    if (initialMessage && !bonusCode && !error && !isLoading) {
        return (
            <div className="bg-sky-50 p-6 rounded-lg flex items-start space-x-3 mt-6 border border-sky-200 shadow-sm">
                <InformationCircleIcon className="h-7 w-7 text-sky-500 flex-shrink-0 mt-0.5" />
                 <div>
                    <h3 className="text-lg font-semibold text-sky-700">Pronto para encontrar seu bônus?</h3>
                    <p className="text-base text-sky-600 text-justify">{initialMessage}</p>
                </div>
            </div>
        );
    }

    return null;
};