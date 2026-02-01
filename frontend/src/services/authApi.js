const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const handleResponse = async (response) => {
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = data?.message || "Request failed";
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

export const login = async ({ email, password }) => {
  return handleResponse(
    await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
  );
};
