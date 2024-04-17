import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RecruitmentManagement() {
  const [jobPostings, setJobPostings] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    fetchJobPostings();
    fetchApplicants();
    fetchInterviews();
  }, []);

  const fetchJobPostings = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/job-postings');
      setJobPostings(response.data);
    } catch (error) {
      console.error('Error fetching job postings:', error);
    }
  };

  const fetchApplicants = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/applicants');
      setApplicants(response.data);
    } catch (error) {
      console.error('Error fetching applicants:', error);
    }
  };

  const fetchInterviews = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/interviews');
      setInterviews(response.data);
    } catch (error) {
      console.error('Error fetching interviews:', error);
    }
  };

  const handleAddJobPosting = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newJobPosting = {
      title: formData.get('title'),
      description: formData.get('description'),
      requirements: formData.get('requirements'),
      deadline: formData.get('deadline')
    };
    try {
      await axios.post('http://127.0.0.1:5000/job-postings', newJobPosting);
      fetchJobPostings();
    } catch (error) {
      console.error('Error adding job posting:', error);
    }
  };

  const handleAddApplicant = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newApplicant = {
      name: formData.get('name'),
      email: formData.get('email'),
      resume: formData.get('resume')
    };
    try {
      await axios.post('http://127.0.0.1:5000/applicants', newApplicant);
      fetchApplicants();
    } catch (error) {
      console.error('Error adding applicant:', error);
    }
  };

  const handleScheduleInterview = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newInterview = {
      applicant: formData.get('applicant'),
      dateTime: formData.get('dateTime')
    };
    try {
      await axios.post('http://127.0.0.1:5000/interviews', newInterview);
      fetchInterviews();
    } catch (error) {
      console.error('Error scheduling interview:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Recruitment Management</h2>

      {/* Job Postings */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-2">Job Postings</h3>
        <form onSubmit={handleAddJobPosting} className="flex flex-wrap gap-2">
          <input type="text" name="title" placeholder="Job Title" className="p-2 border rounded" />
          <input type="text" name="description" placeholder="Description" className="p-2 border rounded" />
          <input type="text" name="requirements" placeholder="Requirements" className="p-2 border rounded" />
          <input type="date" name="deadline" placeholder="Application Deadline" className="p-2 border rounded" />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add Job Posting</button>
        </form>
        <ul>
          {jobPostings.map((jobPosting) => (
            <li key={jobPosting.id} className="mt-4 p-4 border rounded">
              <h4 className="text-lg font-semibold">{jobPosting.title}</h4>
              <p className="text-gray-700">{jobPosting.description}</p>
              <p className="text-gray-700">Requirements: {jobPosting.requirements}</p>
              <p className="text-gray-700">Deadline: {jobPosting.deadline}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Applicants */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-2">Applicants</h3>
        <form onSubmit={handleAddApplicant} className="flex flex-wrap gap-2">
          <input type="text" name="name" placeholder="Name" className="p-2 border rounded" />
          <input type="text" name="email" placeholder="Email" className="p-2 border rounded" />
          <input type="file" name="resume" accept=".pdf,.doc,.docx" className="p-2 border rounded" />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add Applicant</button>
        </form>
        <ul>
          {applicants.map((applicant) => (
            <li key={applicant.id} className="mt-4 p-4 border rounded">
              <h4 className="text-lg font-semibold">{applicant.name}</h4>
              <p className="text-gray-700">Email: {applicant.email}</p>
              <p className="text-gray-700">Resume: {applicant.resume}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Recruitment Processes */}
      <div>
        <h3 className="text-2xl font-semibold mb-2">Recruitment Processes</h3>
        <form onSubmit={handleScheduleInterview} className="flex flex-wrap gap-2">
          <input type="text" name="applicant" placeholder="Applicant Name" className="p-2 border rounded" />
          <input type="datetime-local" name="dateTime" placeholder="Interview Date and Time" className="p-2 border rounded" />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Schedule Interview</button>
        </form>
        <ul>
          {interviews.map((interview) => (
            <li key={interview.id} className="mt-4 p-4 border rounded">
              <h4 className="text-lg font-semibold">Applicant: {interview.applicant}</h4>
              <p className="text-gray-700">Date and Time: {interview.dateTime}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RecruitmentManagement;
