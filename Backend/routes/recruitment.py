# backend/routes/recruitment.py

from flask import Blueprint, jsonify, request

recruitment_bp = Blueprint('recruitment', __name__)

# Mock job posting and applicant data (replace with database integration)
job_postings = []
applicants = []

# Routes for managing job postings

@recruitment_bp.route('/job_postings', methods=['GET'])
def get_job_postings():
    return jsonify(job_postings)

@recruitment_bp.route('/job_postings', methods=['POST'])
def create_job_posting():
    new_job_posting = request.json
    job_postings.append(new_job_posting)
    return jsonify({'message': 'Job posting created successfully', 'job_posting': new_job_posting}), 201

# Routes for managing applicants

@recruitment_bp.route('/applicants', methods=['GET'])
def get_applicants():
    return jsonify(applicants)

@recruitment_bp.route('/applicants', methods=['POST'])
def submit_application():
    new_applicant = request.json
    applicants.append(new_applicant)
    return jsonify({'message': 'Application submitted successfully', 'applicant': new_applicant}), 201

# Additional routes for managing interviews, application status, etc. can be added as needed

