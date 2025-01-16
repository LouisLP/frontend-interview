import React, { useEffect, useState } from "react";
import SingleApplication from "./SingleApplication";
import { Button } from "./ui/Button/Button";
import styles from "./Applications.module.css";
import { Application } from "./types/Application";

const Applications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 5;

  const fetchApplications = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/applications?_page=${page}&_limit=${LIMIT}`
      );
      const data = await response.json();

      // Checking for more pages
      const linkHeader = response.headers.get("Link");
      setHasMore(linkHeader?.includes('rel="next"') ?? false);

      setApplications((prev) => [...prev, ...data]);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
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
      {hasMore && (
        <Button onClick={() => setPage((p) => p + 1)}>Load more</Button>
      )}
    </div>
  );
};

export default Applications;
