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
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <HiOutlineCode className="text-gray-500" />
          <h3 className="font-medium text-gray-700">{title}</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={copyToClipboard}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            title="Copy JSON"
          >
            <HiOutlineClipboardCopy className="w-5 h-5" />
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs btn-secondary py-1 px-3"
          >
            {expanded ? "Collapse" : "Expand"}
          </button>
        </div>
      </div>
      <pre
        className={`bg-gray-900 text-green-400 rounded-lg p-4 text-sm overflow-x-auto ${
          expanded ? "max-h-none" : "max-h-64"
        } overflow-y-auto`}
      >
        {jsonString}
      </pre>
    </div>
  );
}

export default JsonViewer;