// fetchWithToken.js
import { useToken } from "@/hooks/useToken";

const useFetchWithToken = () => {
  const { getPenggunaToken } = useToken();

  const fetchWithToken = async (url, options = {}) => {
    const token = getPenggunaToken();

    const headers = new Headers(options.headers || {});
    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    }

    const newOptions = { ...options, headers };
    const response = await fetch(url, newOptions);
    return response;
  };

  return fetchWithToken;
};

export default useFetchWithToken;
