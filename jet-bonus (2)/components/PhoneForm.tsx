import React, { useState, useEffect, useRef } from 'react';
import { LoadingSpinnerIcon } from './icons/LoadingSpinnerIcon';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import { DevicePhoneMobileIcon } from './icons/DevicePhoneMobileIcon';

interface PhoneFormProps {
    phoneNumber: string;
    onPhoneNumberChange: (number: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
    formError: string | null;
}

export const PhoneForm: React.FC<PhoneFormProps> = ({
    phoneNumber,
    onPhoneNumberChange,
    onSubmit,
    isLoading,
    formError,
}) => {
    const [inputError, setInputError] = useState<string | null>(null);
    const phoneInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (formError && phoneInputRef.current) {
            phoneInputRef.current.focus();
        }
    }, [formError]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ''); 

        if (value.length > 11) {
            value = value.substring(0, 11); 
        }
        
        if (value.length > 0 && value.length < 11) {
            setInputError('O telefone deve ter 11 dígitos (DDD + número). Ex: 11987654321');
        } else if (value.length === 11) {
             setInputError(null);
        }
         else {
            setInputError(null); 
        }
        onPhoneNumberChange(value); 
    };

    const isFormSubmittable = phoneNumber.length === 11 && !inputError && !isLoading;

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div>
                <label htmlFor="phone-number" className="block text-base font-semibold text-slate-700 mb-2">
                    Seu número de telefone
                </label>
                <div className="relative rounded-lg shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                        <DevicePhoneMobileIcon className="h-5 w-5 text-slate-400" aria-hidden="true" />
                    </div>
                    <input
                        ref={phoneInputRef}
                        type="tel"
                        name="phone-number"
                        id="phone-number"
                        className={`block w-full px-4 py-3.5 pl-10 bg-gray-50 border rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 sm:text-sm text-slate-700 disabled:opacity-60 transition-colors ${
                            inputError || formError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'
                        }`}
                        placeholder="Ex: 11987654321"
                        value={phoneNumber}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        required
                        aria-invalid={!!inputError || !!formError}
                        aria-describedby={inputError || formError ? "phone-error-message" : undefined}
                        maxLength={11}
                    />
                </div>
                {(inputError || formError) && (
                    <p className="mt-2 text-sm text-red-600" id="phone-error-message" role="alert">
                        {formError || inputError}
                    </p>
                )}
            </div>
            <button
                type="submit"
                className={`w-full flex items-center justify-center px-6 py-3.5 border border-transparent text-base font-medium rounded-lg shadow-md text-white transition-all duration-150 ease-in-out transform ${
                    !isFormSubmittable
                        ? 'bg-blue-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-700 hover:scale-105 hover:shadow-lg'
                }`}
                disabled={!isFormSubmittable || isLoading}
            >
                {isLoading ? (
                    <>
                        <LoadingSpinnerIcon className="animate-spin h-5 w-5 mr-3" />
                        Verificando...
                    </>
                ) : (
                    <>
                        Obter Meu Código de Bônus
                        <ArrowRightIcon className="h-5 w-5 ml-2" />
                    </>
                )}
            </button>
        </form>
    );
};