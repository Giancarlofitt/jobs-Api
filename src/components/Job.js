import React from "react";
import classes from "./Job.module.css";

const Job = (props) => {
  return (
    <li className={classes.job}>
      <h2>{props.jobTitle}</h2>
      <h3>{props.jobCompany}</h3>
      <p dangerouslySetInnerHTML={{ __html: props.shortDesc }}></p>
    </li>
  );
};

export default Job;
