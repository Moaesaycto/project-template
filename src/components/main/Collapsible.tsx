import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

type Variant =
  | "blue"
  | "slate"
  | "gray"
  | "stone"
  | "neutral"
  | "zinc"
  | "indigo"
  | "teal"
  | "emerald";

const variantClasses: Record<Variant, { container: string; button: string; hover: string }> = {
  blue: { container: "bg-blue-900", button: "bg-blue-800", hover: "hover:bg-blue-900" },
  slate: { container: "bg-slate-800", button: "bg-slate-700", hover: "hover:bg-slate-800" },
  gray: { container: "bg-gray-800", button: "bg-gray-700", hover: "hover:bg-gray-800" },
  stone: { container: "bg-stone-800", button: "bg-stone-700", hover: "hover:bg-stone-800" },
  neutral: { container: "bg-neutral-800", button: "bg-neutral-700", hover: "hover:bg-neutral-800" },
  zinc: { container: "bg-zinc-800", button: "bg-zinc-700", hover: "hover:bg-zinc-800" },
  indigo: { container: "bg-indigo-800", button: "bg-indigo-700", hover: "hover:bg-indigo-800" },
  teal: { container: "bg-teal-800", button: "bg-teal-700", hover: "hover:bg-teal-800" },
  emerald: { container: "bg-emerald-800", button: "bg-emerald-700", hover: "hover:bg-emerald-800" },
};

const Collapsible = ({
  children,
  label = "Toggle",
  variant = "blue",
}: {
  children: React.ReactNode;
  label?: string;
  variant?: Variant;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [measuredHeight, setMeasuredHeight] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const node = containerRef.current;
    const resizeObserver = new ResizeObserver(() => {
      setMeasuredHeight(node.scrollHeight);
    });

    resizeObserver.observe(node);
    setMeasuredHeight(node.scrollHeight);

    return () => resizeObserver.disconnect();
  }, [children, isOpen]);

  const styles = variantClasses[variant];

  return (
    <div className={`w-full my-5 rounded ${styles.container}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center gap-2 px-4 py-2 text-white transition-colors duration-300
          ${styles.button} ${styles.hover}
          ${isOpen ? "rounded-t" : "rounded"}`
        }
      >
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={18} />
        </motion.span>
        {isOpen ? `Hide ${label}` : `Show ${label}`}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: measuredHeight, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            onAnimationComplete={() => {
              if (isOpen && containerRef.current) {
                containerRef.current.style.height = "auto";
              }
            }}
            style={{ overflow: "hidden", width: "100%" }}
          >
            <div ref={containerRef}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Collapsible;
