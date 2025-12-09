import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

interface RefreshSuggestionProps {
  suggestion: string | null;
  onClose: () => void;
}

export default function RefreshSuggestion({
  suggestion,
  onClose,
}: RefreshSuggestionProps) {
  //Close automatically after 5 seconds
  useEffect(() => {
    if (suggestion) {
      const timer = setTimeout(() => {
        onClose();
      }, 10000); // 10 seconds
      return () => clearTimeout(timer);
    }
  }, [suggestion, onClose]);

  return (
    <AnimatePresence>
      {suggestion && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 1 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-100 px-6 py-4 rounded-lg shadow-lg flex items-center space-x-4 z-50"
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <X size={16} />
          </button>
          <p className="text-lg font-medium text-gray-700 pr-6">{suggestion}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
