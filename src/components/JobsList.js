import React from "react";
import Job from "./Job";
import classes from "./JobsList.module.css";
import Card from "./UI/Card";

const JobsList = (props) => {
  return (
    <Card>
      <ul className={classes["jobs-list"]}>
        {props.jobs.map((job) => (
          <Job
            key={job.id}
            jobTitle={job.jobTitle}
            jobCompany={job.jobCompany}
            shortDesc={job.shortDesc}
          />
        ))}
      </ul>
    </Card>
  );
};

export default JobsList;
