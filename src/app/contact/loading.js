import { Phone, Mail, Globe } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-green-900/20 animate-pulse">
      <div className="h-12 bg-gray-300 dark:bg-green-800/50 rounded w-3/4 max-w-xl mb-8"></div>

      <div className="flex space-x-8">
        <div className="flex flex-col items-center">
          <Phone className="w-12 h-12 text-gray-400 dark:text-green-300 animate-bounce" />
          <div className="h-4 bg-gray-300 dark:bg-green-800/50 rounded w-16 mt-2"></div>
        </div>

        <div className="flex flex-col items-center">
          <Mail className="w-12 h-12 text-gray-400 dark:text-green-300 animate-bounce" />
          <div className="h-4 bg-gray-300 dark:bg-green-800/50 rounded w-16 mt-2"></div>
        </div>

        <div className="flex flex-col items-center">
          <Globe className="w-12 h-12 text-gray-400 dark:text-green-300 animate-bounce" />
          <div className="h-4 bg-gray-300 dark:bg-green-800/50 rounded w-16 mt-2"></div>
        </div>
      </div>
    </div>
  );
}
