"use client";

import { Check, X } from "lucide-react";

export type ToastMessage = {
  id: number;
  message: string;
  type: "success" | "error";
};

export function Toast({ toast, onClose }: { toast: ToastMessage; onClose: () => void }) {
  const Icon = toast.type === "success" ? Check : X;

  return (
    <div className="glass-elevated flex min-w-72 items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-[color:var(--text-primary)] shadow-[var(--shadow-xl)]">
      <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${toast.type === "success" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
        <Icon size={16} />
      </div>
      <span className="flex-1">{toast.message}</span>
      <button onClick={onClose} className="rounded-lg p-1 text-[color:var(--text-muted)] transition hover:bg-white/10" aria-label="Dismiss toast">
        <X size={14} />
      </button>
    </div>
  );
}
