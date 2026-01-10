import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axiosInstance";

export function usePost<T>(url: string, initalData: T) {
  const [data, setData] = useState<T>(initalData);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      try {
        const { data } = await axiosInstance(url, { signal });
        setData(data);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof Error && error.name != "CanceledError") {
          setError(error.message || "알 수 없는 오류가 발생했습니다.");
          setIsLoading(false);
        }
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, error, isLoading };
}
