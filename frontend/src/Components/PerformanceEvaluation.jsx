import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PerformanceEvaluation() {
  const [evaluationForms, setEvaluationForms] = useState([]);
  const [evaluations, setEvaluations] = useState([]);

  useEffect(() => {
    fetchEvaluationForms();
    fetchEvaluations();
  }, []);

  const fetchEvaluationForms = async () => {
    try {
      const response = await axios.get('http://13.60.3.73:5000/evaluation-forms');
      setEvaluationForms(response.data);
    } catch (error) {
      console.error('Error fetching evaluation forms:', error);
    }
  };

  const fetchEvaluations = async () => {
    try {
      const response = await axios.get('http://13.60.3.73:5000/evaluations');
      setEvaluations(response.data);
    } catch (error) {
      console.error('Error fetching evaluations:', error);
    }
  };

  const handleCreateEvaluationForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newEvaluationForm = {
      criteria: formData.get('criteria'),
      ratingScale: formData.get('ratingScale')
    };
    try {
      await axios.post('http://13.60.3.73:5000/evaluation-forms', newEvaluationForm);
      fetchEvaluationForms();
    } catch (error) {
      console.error('Error creating evaluation form:', error);
    }
  };

  const handleAssignEvaluation = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newEvaluation = {
      employeeId: formData.get('employeeId'),
      formId: formData.get('formId'),
      status: 'Pending'
    };
    try {
      await axios.post('http://13.60.3.73:5000/evaluations', newEvaluation);
      fetchEvaluations();
    } catch (error) {
      console.error('Error assigning evaluation:', error);
    }
  };

  const handleUpdateEvaluationStatus = async (evaluationId, status) => {
    try {
      await axios.put(`http://13.60.3.73:5000/evaluations/${evaluationId}`, { status });
      fetchEvaluations();
    } catch (error) {
      console.error('Error updating evaluation status:', error);
    }
  };

  const handleProvideFeedback = async (evaluationId, feedback) => {
    try {
      await axios.post(`http://13.60.3.73:5000/evaluations/${evaluationId}/feedback`, { feedback });
      fetchEvaluations();
    } catch (error) {
      console.error('Error providing feedback:', error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8">Performance Evaluation</h2>

      {/* Create Evaluation Form */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Create Evaluation Form</h3>
        <form onSubmit={handleCreateEvaluationForm} className="flex flex-col space-y-4">
          <input type="text" name="criteria" placeholder="Criteria" className="border rounded-md p-2" />
          <input type="text" name="ratingScale" placeholder="Rating Scale" className="border rounded-md p-2" />
          <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md">Create Evaluation Form</button>
        </form>
      </div>

      {/* Assign Evaluation */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Assign Evaluation</h3>
        <form onSubmit={handleAssignEvaluation} className="flex flex-col space-y-4">
          <input type="text" name="employeeId" placeholder="Employee ID" className="border rounded-md p-2" />
          <select name="formId" className="border rounded-md p-2">
            {evaluationForms.map((form) => (
              <option key={form.id} value={form.id}>{form.criteria}</option>
            ))}
          </select>
          <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md">Assign Evaluation</button>
        </form>
      </div>

      {/* Evaluations */}
      <div>
        <h3 className="text-xl font-bold mb-4">Evaluations</h3>
        <ul>
          {evaluations.map((evaluation) => (
            <li key={evaluation.id} className="border rounded-md p-4 mb-4">
              <p>Employee ID: {evaluation.employeeId}</p>
              <p>Form: {evaluation.formId}</p>
              <p>Status: {evaluation.status}</p>
              {evaluation.status === 'Pending' && (
                <button onClick={() => handleUpdateEvaluationStatus(evaluation.id, 'Completed')} className="bg-green-500 text-white font-bold py-2 px-4 rounded-md mt-2">Complete Evaluation</button>
              )}
              {evaluation.status === 'Completed' && (
                <div className="mt-2">
                  <textarea name="feedback" placeholder="Provide Feedback" className="border rounded-md p-2"></textarea>
                  <button onClick={() => handleProvideFeedback(evaluation.id, feedback)} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md mt-2">Submit Feedback</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PerformanceEvaluation;
