import { useEffect, useState } from "react";
import "./App.css";
import JobsList from "./components/JobsList";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import AbcIcon from "@mui/icons-material/Abc";

function App() {
  /*  I've  created two components that are JobsList and Job, I am only using two useStates to manage the application,
   I've mixed up normal css with module.css a bit, I've also used material UI for the buttons and the icons of the buttons
    */

  const [jobs, setJobs] = useState([]);
  const [jobsIsLoading, setJobsIsLoading] = useState(false);

  const url = "https://www.zippia.com/api/jobs/";

  /* Using useEffect to load the jobs one time only at the start of the application, here I am using fetch instead of axios, and to keep 
  it simple i've used normal promises instead of async await. I am using map to get the list of jobs, and slicing through the first 10 itens 
  and setting the array into the state jobs variable. I am also using a state to manage the loading state of the job fetch. */

  useEffect(() => {
    setJobsIsLoading(true);
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        companySkills: true,
        dismissedListingHashes: [],
        fetchJobDesc: true,
        jobTitle: "Business Analyst",
        locations: [],
        numJobs: 20,
        previousListingHashes: [],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Http error, status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const jobs = data.jobs
          .map((job) => ({
            id: job.jobId,
            jobTitle: job.jobTitle,
            jobCompany: job.companyName,
            shortDesc: job.jobDescription,
            postedDate: job.postedDate,
          }))
          .slice(0, 10);

        setJobs(jobs);
        setJobsIsLoading(false);
      });
  }, []);

  /* here I am using this method to get the jobs filtering by 7 days ago using regular expression */

  const handleLastJobs = () => {
    const filteredLast7DaysJobs = jobs.filter((job) => {
      if (new RegExp("[1-7]d ago").test(job.postedDate)) return job;
      return false;
    });

    setJobs(filteredLast7DaysJobs);
  };

  /* here I am sorting the company name by ascending order using sort with slice to create a new object */

  const handleByCompanyName = () => {
    const sortedJobsByCompanyName = jobs
      .slice()
      .sort((a, b) => (a.jobCompany > b.jobCompany ? 1 : -1));

    setJobs(sortedJobsByCompanyName);
  };

  /* this is my conditions for the loading state */

  let content = <h1>No jobs found</h1>;

  if (!jobsIsLoading) {
    content = <JobsList jobs={jobs}></JobsList>;
  }

  if (jobsIsLoading)
    content = (
      <h1 style={{ textAlign: "center" }}>Loading jobs, please wait...</h1>
    );

  /* the jsx code is using both buttons and a component named JobsList, inside of 
    JobsList I have a Job component which has each list inside of it */

  return (
    <div>
      <div className="mainDiv">
        {!jobsIsLoading && (
          <Button
            startIcon={<CheckIcon />}
            color="primary"
            variant="contained"
            onClick={handleByCompanyName}
          >
            Order by company name
          </Button>
        )}

        {!jobsIsLoading && (
          <Button
            startIcon={<AbcIcon />}
            style={{ marginLeft: "10px" }}
            color="success"
            variant="contained"
            onClick={handleLastJobs}
          >
            Select last 7 jobs
          </Button>
        )}
      </div>
      <div>{content}</div>
    </div>
  );
}

export default App;
