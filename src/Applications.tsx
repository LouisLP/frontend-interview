import React, { useEffect, useState } from "react";
import SingleApplication from "./SingleApplication";
import { Button } from "./ui/Button/Button";
import { Spinner } from "./ui/Spinner/Spinner";
import styles from "./Applications.module.css";
import { Application } from "./types/Application";

const Applications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const LIMIT = 5;

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/api/applications?_page=${page}&_limit=${LIMIT}`
      );
      const data = await response.json();

      const linkHeader = response.headers.get("Link");
      setHasMore(linkHeader?.includes('rel="next"') ?? false);

      setApplications((prev) => [...prev, ...data]);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [page]);

  return (
    <div className={styles.Applications}>
      {applications.map((application) => (
        <SingleApplication key={application.id} application={application} />
      ))}
      {isLoading ? (
        <Spinner />
      ) : (
        hasMore && (
          <Button onClick={() => setPage((p) => p + 1)} disabled={isLoading}>
            Load more
          </Button>
        )
      )}
    </div>
  );
};

export default Applications;
