import type { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  htmlFor: string;
  children: ReactNode;
  error?: string;
};

export default function FormField({ label, htmlFor, children, error }: FormFieldProps) {
  return (
    <div className="mb-4 flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-xs font-semibold text-slate-500">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
