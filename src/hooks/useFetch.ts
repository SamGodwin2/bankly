import { useState, useEffect, useCallback } from "react";
import "whatwg-fetch";
import { APIRoutes } from "../../types";

type FormattedResponse<T> = {
  data: T | [];
  loading: boolean;
  error: any;
  refresh: () => void;
};

const useFetch = <T>(path: APIRoutes): FormattedResponse<T> => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T | []>([]);
  const [error, setError] = useState(null);
  const [retries, setRetries] = useState(0);

  const fetchData = useCallback(() => {
    fetch(`/api/${path}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`Somethings gone wrong, retry count ${retries}`);
      })
      .then((data) => {
        setLoading(false);
        setData(data);
      })
      .catch((err) => setError(err));
  }, [path]);

  useEffect(() => {
    setLoading(true);
    setData([]);
    setError(null);
    fetchData();
  }, [path, retries]);

  return { data, loading, error, refresh: () => setRetries(retries + 1) };
};

export default useFetch;
