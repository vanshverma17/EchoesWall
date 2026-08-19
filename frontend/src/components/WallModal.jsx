import React from "react";

const WallModal = ({
  modalType,
  formData,
  setFormData,
  uploadedFile,
  handleFileUpload,
  handleSubmit,
  closeModal,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-[4px] flex items-center justify-center z-[1000] animate-[fadeIn_0.2s_ease-out]"
      onClick={closeModal}
    >
      <div
        className="bg-white/95 backdrop-blur-[20px] rounded-[16px] md:rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.3)] min-w-[90vw] md:min-w-[400px] max-w-[90vw] md:max-w-[500px] p-5 md:p-8 m-4 md:m-0 animate-[scaleIn_0.25s_cubic-bezier(0.34,1.56,0.64,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-[20px] md:text-[24px] font-bold mb-4 md:mb-6 text-[#2d3748] font-sans">
          {modalType === "note" && "Add a New Note"}
          {modalType === "image" && "Add a New Image"}
          {modalType === "thought" && "Add a New Thought"}
        </h3>
        <form onSubmit={handleSubmit}>
          {modalType === "image" ? (
            <>
              <div className="mb-5">
                <label className="block mb-2 text-[14px] font-semibold text-[#4a5568]">
                  Upload Image
                </label>
                <label
                  htmlFor="file-upload"
                  className="w-full p-3 rounded-[10px] border-2 border-dashed border-[rgba(123,140,217,0.3)] bg-[rgba(123,140,217,0.05)] text-[#7b8cd9] cursor-pointer font-semibold text-[14px] transition-all duration-300 ease flex items-center justify-center gap-2 hover:bg-[rgba(123,140,217,0.1)]"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  Choose Image from Device
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                {uploadedFile && (
                  <div className="mt-3 p-3 rounded-[10px] bg-[rgba(102,187,106,0.1)] text-[#66bb6a] text-[13px] font-semibold flex items-center gap-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {uploadedFile.name}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3 my-4 text-[#a0aec0] text-[13px] font-medium">
                <div className="flex-1 h-px bg-[rgba(123,140,217,0.2)]"></div>
                <span>OR</span>
                <div className="flex-1 h-px bg-[rgba(123,140,217,0.2)]"></div>
              </div>
              <div className="mb-5">
                <label className="block mb-2 text-[14px] font-semibold text-[#4a5568]">
                  Image URL
                </label>
                <input
                  type="url"
                  className="w-full p-3 rounded-[10px] border border-[rgba(123,140,217,0.2)] text-[14px] font-inherit outline-none bg-white/80 text-[#2d3748] transition-all duration-300 ease box-border focus:border-[rgba(123,140,217,0.5)] focus:shadow-[0_0_0_3px_rgba(123,140,217,0.1)]"
                  value={formData.url}
                  onChange={(e) => {
                    setFormData({ ...formData, url: e.target.value });
                  }}
                  placeholder="https://example.com/image.jpg"
                  disabled={!!uploadedFile}
                />
              </div>
            </>
          ) : (
            <>
              <div className="mb-5">
                <label className="block mb-2 text-[14px] font-semibold text-[#4a5568]">
                  {modalType === "note" ? "Note Content" : "Thought Content"}
                </label>
                <textarea
                  className="w-full p-3 rounded-[10px] border border-[rgba(123,140,217,0.2)] text-[14px] font-inherit resize-y min-h-[100px] outline-none bg-white/80 text-[#2d3748] transition-all duration-300 ease box-border focus:border-[rgba(123,140,217,0.5)] focus:shadow-[0_0_0_3px_rgba(123,140,217,0.1)]"
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  placeholder={
                    modalType === "note" ? "Write your note here..." : "Share your thought..."
                  }
                  required
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 text-[14px] font-semibold text-[#4a5568]">
                  Background Color
                </label>
                <input
                  type="color"
                  className="w-full h-[50px] p-1 rounded-[10px] border-none cursor-pointer outline-none transition-all duration-300 ease box-border"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                />
              </div>
            </>
          )}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              className="flex-1 p-3 rounded-[10px] border border-[rgba(123,140,217,0.3)] bg-transparent text-[#7b8cd9] cursor-pointer font-semibold text-[15px] transition-all duration-300 ease hover:bg-[#f4f6ff] hover:border-[#7b8cd9]"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 p-3 rounded-[10px] border-none bg-[linear-gradient(135deg,#7b8cd9_0%,#9eadeb_100%)] text-white cursor-pointer font-semibold text-[15px] shadow-[0_4px_16px_rgba(123,140,217,0.25)] transition-all duration-300 ease hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(123,140,217,0.35)]"
            >
              Add to Wall
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WallModal;
