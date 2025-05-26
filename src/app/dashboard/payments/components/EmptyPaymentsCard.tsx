import { Button } from "@/components/ui/button";
import { FC } from "react";

interface EmptyPaymentsCardProps {
  message: string;
  buttonText: string;
  buttonHref: string;
  icon?: React.ReactNode;
}

const EmptyPaymentsCard: FC<EmptyPaymentsCardProps> = ({ message, buttonText, buttonHref, icon }) => (
  <div className="flex flex-col items-center justify-center min-h-[220px] bg-white/40 dark:bg-green-900/30 rounded-2xl shadow-xl p-8 relative overflow-hidden">
    <svg className="absolute -top-10 -left-10 w-48 h-48 opacity-10 text-green-400" fill="none" viewBox="0 0 200 200"><circle cx="100" cy="100" r="100" fill="currentColor" /></svg>
    {icon || (
      <svg className="w-12 h-12 text-green-500 mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M12 3v18" /></svg>
    )}
    <p className="text-lg text-green-800 dark:text-green-100 font-semibold mb-2">{message}</p>
    <Button asChild className="mt-2 px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg transition-colors">
      <a href={buttonHref}>{buttonText}</a>
    </Button>
  </div>
);

export default EmptyPaymentsCard;
