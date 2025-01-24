import { useState, useEffect } from "react";
import { Application } from "../types/Application";
import { applicationsApi } from "../services/applicationsApi";

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
      const { data, hasMore: hasMorePages } =
        await applicationsApi.getApplications(page, LIMIT);

      setHasMore(hasMorePages);
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
