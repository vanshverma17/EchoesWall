const createItemId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const sanitizeItems = (items = []) =>
  items
    .filter((item) => item && item.type)
    .map((item) => ({
      id: item.id || item._id || createItemId(),
      type: item.type,
      text: item.text || "",
      src: item.src || "",
      color: item.color || "",
      top: item.top || "40px",
      left: item.left || "40px",
    }));

const ensureItemsHaveIds = (items = []) =>
  items.map((item) => ({
    ...item,
    id: item.id || item._id || createItemId(),
  }));

const attachItemIds = (snapshot) => {
  if (!snapshot) return snapshot;
  const doc = snapshot.toObject ? snapshot.toObject() : snapshot;
  return {
    ...doc,
    items: ensureItemsHaveIds(doc.items || []),
  };
};

module.exports = {
  createItemId,
  sanitizeItems,
  ensureItemsHaveIds,
  attachItemIds,
};
