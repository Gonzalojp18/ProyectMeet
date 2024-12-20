import { useEffect, useState, useCallback } from "react";

export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error("Error en la petición")
        }

        const jsonData = await response.json();

        setData(jsonData)
        setError(null);
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
  }, [url])

  useEffect(() => {
    fetchData()
  }, [url])

  const refetch = useCallback(async () => {
    fetchData();
  }, [fetchData])

  return { data, loading, error, refetch }
}