import { useState } from "react";
import { HiOutlineCode, HiOutlineClipboardCopy } from "react-icons/hi";
import toast from "react-hot-toast";

function JsonViewer({ data, title = "JSON Output" }) {
  const [expanded, setExpanded] = useState(false);
  const jsonString = JSON.stringify(data, null, 2);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonString);
    toast.success("JSON copied to clipboard!");
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <HiOutlineCode className="text-gray-500 flex-shrink-0" />
          <h3 className="font-medium text-gray-700 text-sm sm:text-base truncate">
            {title}
          </h3>
        </div>
        <div className="flex gap-1.5 sm:gap-2 flex-shrink-0">
          <button
            onClick={copyToClipboard}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            title="Copy JSON"
          >
            <HiOutlineClipboardCopy className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs btn-secondary py-1 px-2 sm:px-3"
          >
            {expanded ? "Collapse" : "Expand"}
          </button>
        </div>
      </div>
      <pre
        className={`bg-gray-900 text-green-400 rounded-lg p-3 sm:p-4 text-xs sm:text-sm overflow-x-auto ${
          expanded ? "max-h-none" : "max-h-48 sm:max-h-64"
        } overflow-y-auto`}
      >
        {jsonString}
      </pre>
    </div>
  );
}

export default JsonViewer;