import React from "react";
import styles from "./SingleApplication.module.css";
import { Application } from "./types/Application";
import { formatGBP } from "./helpers/currencies";

interface SingleApplicationProps {
  application: Application;
}

const SingleApplication: React.FC<SingleApplicationProps> = ({
  application,
}) => {
  return (
    <div className={styles.SingleApplication}>
      <div className={styles.cell}>
        <sub>Company</sub>
        {application.company}
      </div>
      <div className={styles.cell}>
        <sub>Name</sub>
        {application.first_name} {application.last_name}
      </div>
      <div className={styles.cell}>
        <sub>Email</sub>
        <a href={`mailto:${application.email}`}>{application.email}</a>
      </div>
      <div className={styles.cell}>
        <sub>Loan Amount</sub>
        {formatGBP(application.loan_amount)}
      </div>
      <div className={styles.cell}>
        <sub>Application Date</sub>
        {application.date_created}
      </div>
      <div className={styles.cell}>
        <sub>Expiry date</sub>
        {application.expiry_date}
      </div>
    </div>
  );
};

export default SingleApplication;
