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

const normalizeEcho = (doc = {}) => ({
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

const normalizeSnapshot = (doc = {}) => ({
  id: doc._id || doc.id,
  items: Array.isArray(doc.items) ? doc.items.map(normalizeEcho) : [],
  createdAt: doc.createdAt,
  updatedAt: doc.updatedAt,
});

export const fetchEchoes = async (options = {}) => {
  const { signal, history = false } = options;

  if (history) {
    try {
      const data = await handleResponse(await fetch(`${API_BASE_URL}/api/walls`, { signal }));
      return Array.isArray(data) ? data.map(normalizeSnapshot) : [];
    } catch {
      // Fallback for servers that don't expose /api/walls
      const latestEchoes = await handleResponse(await fetch(`${API_BASE_URL}/api/echoes`, { signal }));
      if (!Array.isArray(latestEchoes)) return [];
      return [
        normalizeSnapshot({
          items: latestEchoes,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      ];
    }
  }

  try {
    const latest = await handleResponse(await fetch(`${API_BASE_URL}/api/walls/latest`, { signal }));
    const normalized = normalizeSnapshot(latest || {});
    return normalized.items;
  } catch {
    // Fallback to legacy echoes list
    const latestEchoes = await handleResponse(await fetch(`${API_BASE_URL}/api/echoes`, { signal }));
    return Array.isArray(latestEchoes) ? latestEchoes.map(normalizeEcho) : [];
  }
};

export const saveEchoes = async (items = []) => {
  const payload = {
    items: items.map(({ type, text, src, color, top, left }) => ({
      type,
      text,
      src,
      color,
      top,
      left,
    })),
  };

  try {
    const data = await handleResponse(
      await fetch(`${API_BASE_URL}/api/walls`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
    );

    const snapshot = normalizeSnapshot(data || {});
    return snapshot.items;
  } catch {
    // Fallback to legacy endpoint
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
  }
};

export const deleteAllEchoes = async () => {
  await handleResponse(
    await fetch(`${API_BASE_URL}/api/walls`, {
      method: "DELETE",
    })
  );
};
