// fetchWithToken.js
import { useToken } from "@/hooks/useToken";

const useFetchWithToken = () => {
  const { getPenggunaToken } = useToken();

  const fetchWithToken = async (
    url,
    method = "GET",
    body = null,
    options = {}
  ) => {
    const token = getPenggunaToken();

    const headers = new Headers(options.headers || {});
    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    }

    if (body) {
      headers.append("Content-Type", "application/json");
      body = JSON.stringify(body);
    }

    const newOptions = { ...options, headers, method, body };
    const response = await fetch(url, newOptions);
    return response;
  };

  return fetchWithToken;
};

export default useFetchWithToken;
