import React from "react";
import styles from "./SingleApplication.module.css";
import { Application } from "./types/Application";
import { formatGBP } from "./helpers/currencies";
import { formatDate } from "./helpers/dates";

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
      <div className={styles.cellRight}>
        <sub>Loan Amount</sub>
        {formatGBP(application.loan_amount)}
      </div>
      <div className={styles.cellRight}>
        <sub>Application Date</sub>
        {formatDate(application.date_created)}
      </div>
      <div className={styles.cellRight}>
        <sub>Expiry date</sub>
        {formatDate(application.expiry_date)}
      </div>
    </div>
  );
};

export default SingleApplication;
