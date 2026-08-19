const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:4000").replace(/\/+$/, "");

const handleResponse = async (response) => {
  let data = null;
  let text = "";
  try {
    text = await response.text();
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message = data?.message || text || (response.statusText ? `${response.status} ${response.statusText}` : "Request failed");
    throw new Error(message);
  }

  return data;
};

export const pingAuth = async () => {
  return handleResponse(await fetch(`${API_BASE_URL}/api/auth/ping`));
};

export const signup = async ({ name, email, password }) => {
  return handleResponse(
    await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })
  );
};

export const login = async ({ email, identifier, password }) => {
  const loginId = (identifier || email || "").trim();
  return handleResponse(
    await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: loginId, identifier: loginId, password }),
    })
  );
};

export const setStoredUser = (user) => {
  try {
    if (user && !user.id && user._id) {
      user.id = user._id;
    }
    localStorage.setItem("echoesUser", JSON.stringify(user));
  } catch (err) {
    console.error("Failed to persist user", err);
  }
};

export const getStoredUser = () => {
  try {
    const raw = localStorage.getItem("echoesUser");
    const user = raw ? JSON.parse(raw) : null;
    if (user && !user.id && user._id) {
      user.id = user._id;
    }
    return user;
  } catch (err) {
    console.error("Failed to read stored user", err);
    return null;
  }
};

export const clearStoredUser = () => {
  try {
    localStorage.removeItem("echoesUser");
  } catch (err) {
    console.error("Failed to clear stored user", err);
  }
};

