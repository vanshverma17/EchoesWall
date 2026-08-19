const checkHealth = (_req, res) => {
  res.json({ status: "ok" });
};

const rootHealth = (_req, res) => {
  res.json({ status: "ok", message: "EchoesWall API is running" });
};

module.exports = {
  checkHealth,
  rootHealth,
};
