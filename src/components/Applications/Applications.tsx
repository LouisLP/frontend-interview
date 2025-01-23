import SingleApplication from "./SingleApplication";
import { Button } from "../ui/Button/Button";
import { Spinner } from "../ui/Spinner/Spinner";
import styles from "./Applications.module.css";
import { useApplications } from "../../hooks/useApplications";

const Applications = () => {
  const { applications, isLoading, hasMore, error, loadMore } =
    useApplications();

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.Applications}>
      {applications.map((application) => (
        <SingleApplication key={application.guid} application={application} />
      ))}

      {isLoading ? (
        <Spinner />
      ) : (
        hasMore && (
          <Button onClick={loadMore} disabled={isLoading}>
            Load more
          </Button>
        )
      )}
    </div>
  );
};

export default Applications;
