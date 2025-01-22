import { useState, useEffect } from "react";
import { Application } from "../types/Application";

const API_URL = "http://localhost:3001/api/applications";
const LIMIT = 5;

export const useApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}?_page=${page}&_limit=${LIMIT}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const linkHeader = response.headers.get("Link");

      setHasMore(linkHeader && linkHeader.includes('rel="next"'));
      setApplications((prev) => [...prev, ...data]);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to fetch applications"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => setPage((p) => p + 1);

  useEffect(() => {
    fetchApplications();
  }, [page]);

  return { applications, isLoading, hasMore, error, loadMore };
};
