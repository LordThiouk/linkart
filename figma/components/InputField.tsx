import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function InputField({ label, error, className = '', ...props }: InputFieldProps) {
  return (
    <div className="w-full space-y-2">
      {label && <label className="block text-[#D4D4D4]">{label}</label>}
      <input
        className={`
          w-full px-4 py-4 
          bg-[#1A1A1A] 
          border border-[#404040] 
          rounded-2xl 
          text-[#F5F5F5] 
          placeholder:text-[#A3A3A3]
          focus:outline-none 
          focus:border-[#6366F1] 
          focus:ring-2 
          focus:ring-[#6366F1]/20
          transition-all
          ${error ? 'border-[#EF4444]' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-[#EF4444]">{error}</p>}
    </div>
  );
}
