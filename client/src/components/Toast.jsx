import { AnimatePresence, motion } from "framer-motion";

function Toast({ toast, onClose }) {
  return (
    <AnimatePresence>
      {toast?.message && (
        <motion.div
          className={`fixed right-4 top-20 z-60 rounded-xl border px-4 py-3 text-sm shadow-lg ${
            toast.type === "success"
              ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-100"
              : "border-rose-500/40 bg-rose-500/15 text-rose-100"
          }`}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 24 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="status"
        >
          {toast.message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Toast;
