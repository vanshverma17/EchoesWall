const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const handleResponse = async (response) => {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Request failed");
  }
  if (response.status === 204) {
    return null;
  }
  return response.json();
};

const normalizeEcho = (doc) => ({
  id: doc._id || doc.id,
  type: doc.type,
  text: doc.text || "",
  src: doc.src || "",
  color: doc.color || "",
  top: doc.top || "0px",
  left: doc.left || "0px",
  createdAt: doc.createdAt,
  updatedAt: doc.updatedAt,
});

export const fetchEchoes = async () => {
  const data = await handleResponse(await fetch(`${API_BASE_URL}/api/echoes`));
  return Array.isArray(data) ? data.map(normalizeEcho) : [];
};

export const saveEchoes = async (items = []) => {
  const payload = {
    items: items.map(({ id, type, text, src, color, top, left }) => ({
      id,
      type,
      text,
      src,
      color,
      top,
      left,
    })),
  };

  const data = await handleResponse(
    await fetch(`${API_BASE_URL}/api/echoes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
  );

  return Array.isArray(data) ? data.map(normalizeEcho) : [];
};

export const deleteAllEchoes = async () => {
  await handleResponse(
    await fetch(`${API_BASE_URL}/api/echoes`, {
      method: "DELETE",
    })
  );
};
