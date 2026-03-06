import { HiOutlineExclamationCircle } from "react-icons/hi";

function ErrorAlert({ message, onRetry }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
      <HiOutlineExclamationCircle className="text-red-500 w-6 h-6 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <h4 className="text-red-800 font-medium text-sm">Error</h4>
        <p className="text-red-600 text-sm mt-1">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 text-sm text-red-700 underline hover:text-red-900"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorAlert;