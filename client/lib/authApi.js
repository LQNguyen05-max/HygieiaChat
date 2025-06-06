export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    throw new Error("No token found in localStorage. Please log in.");
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch data.");
  }

  return response.json();
};