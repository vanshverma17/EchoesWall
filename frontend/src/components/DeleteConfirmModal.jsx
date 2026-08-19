import React from "react";

const DeleteConfirmModal = ({
  pendingDelete,
  deletingId,
  onCancel,
  onConfirm,
}) => {
  if (!pendingDelete) return null;

  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.35)] backdrop-blur-[2px] flex items-center justify-center z-[999] p-4 animate-[fadeIn_0.2s_ease-out]"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-[14px] p-5 max-w-[360px] w-full shadow-[0_12px_32px_rgba(0,0,0,0.18)] border border-[rgba(123,140,217,0.25)] animate-[scaleIn_0.25s_cubic-bezier(0.34,1.56,0.64,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-[18px] font-bold text-[#1a202c] mb-2">Delete this wall?</div>
        <div className="text-[14px] text-[#4a5568] mb-4 leading-[1.5]">
          This will permanently remove "{pendingDelete.title}". You cannot undo this action.
        </div>
        <div className="flex justify-end gap-2.5">
          <button
            className="p-[8px_14px] rounded-[10px] border border-[rgba(123,140,217,0.25)] bg-[#f7fafc] text-[#2d3748] cursor-pointer font-bold text-[13px] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(123,140,217,0.35)] transition-all"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className={`p-[8px_14px] rounded-[10px] border border-[rgba(239,68,68,0.25)] bg-[#fef2f2] text-[#c53030] cursor-pointer font-bold text-[13px] hover:-translate-y-0.5 transition-all ${
              deletingId === pendingDelete.id ? "opacity-70 cursor-not-allowed" : ""
            }`}
            onClick={onConfirm}
            disabled={deletingId === pendingDelete.id}
          >
            {deletingId === pendingDelete.id ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
