from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from flask_principal import Principal, Identity, UserNeed, RoleNeed, Permission, identity_loaded
from werkzeug.security import generate_password_hash, check_password_hash

from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
cors = CORS(app)
app.secret_key = 'your_secret_key'

login_manager = LoginManager()
login_manager.init_app(app)

principal = Principal(app)

# Define roles
admin_role = RoleNeed('admin')
employee_role = RoleNeed('employee')

# Define permissions
admin_permission = Permission(admin_role)
employee_permission = Permission(employee_role)


class User(UserMixin):
    def __init__(self, id, name, email, password, roles):
        self.id = id
        self.name = name
        self.email = email
        self.password = password
        self.roles = roles

    def check_password(self, password):
        return check_password_hash(self.password, password)


# Simulated user database (replace this with your actual user database)
hr_users = {
    "hr@example.com": User(1, "HR", "hr@example.com", generate_password_hash("password"), ["admin"])
}


# Flask-Login user loader
@login_manager.user_loader
def load_user(user_id):
    return hr_users.get(user_id)


# Login route
@app.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    user = hr_users.get(email)
    if user and user.check_password(password):
        login_user(user)
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401


# Logout route
@app.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logout successful'}), 200


# Identity loader function to load the current user's roles
@identity_loaded.connect
def on_identity_loaded(sender, identity):
    # Add the current user's roles to the identity
    if hasattr(current_user, 'roles'):
        for role in current_user.roles:
            identity.provides.add(RoleNeed(role))


# Restricted route accessible only to admin users
@app.route('/admin/dashboard')
@login_required
@admin_permission.require(http_exception=403)
def admin_dashboard():
    return jsonify({'message': 'Welcome to the admin dashboard'}), 200


# Sample data to simulate employee records
employees = [
    {
        "id": 1,
        "name": "John Doe",
        "position": "Software Engineer",
        "department": "Engineering",
        "contact": "john.doe@example.com",
        "profile_picture": "https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/"
    },
    {
        "id": 2,
        "name": "Jane Smith",
        "position": "HR Manager",
        "department": "Human Resources",
        "contact": "jane.smith@example.com",
        "profile_picture": "https://example.com/profiles/jane_smith.jpg"
    }
]

# Endpoint to get all employees
@app.route('/employees', methods=['GET'])
def get_employees():
    return jsonify(employees)

# Endpoint to add a new employee
@app.route('/employees', methods=['POST'])
def add_employee():
    new_employee = request.json
    employees.append(new_employee)
    return jsonify({"message": "Employee added successfully"})

# Endpoint to update an employee
@app.route('/employees/<int:employee_id>', methods=['PUT'])
def update_employee(employee_id):
    updated_employee = request.json
    for employee in employees:
        if employee['id'] == employee_id:
            employee.update(updated_employee)
            return jsonify({"message": "Employee updated successfully"})
    return jsonify({"message": "Employee not found"})

# Endpoint to delete an employee
@app.route('/employees/<int:employee_id>', methods=['DELETE'])
def delete_employee(employee_id):
    for index, employee in enumerate(employees):
        if employee['id'] == employee_id:
            del employees[index]
            return jsonify({"message": "Employee deleted successfully"})
    return jsonify({"message": "Employee not found"})

job_postings = []
applicants = []
interviews = []

# Endpoint to get all job postings
@app.route('/job-postings', methods=['GET'])
def get_job_postings():
    return jsonify(job_postings)

# Endpoint to add a new job posting
@app.route('/job-postings', methods=['POST'])
def add_job_posting():
    new_job_posting = request.json
    job_postings.append(new_job_posting)
    return jsonify({"message": "Job posting added successfully"})

# Endpoint to get all applicants
@app.route('/applicants', methods=['GET'])
def get_applicants():
    return jsonify(applicants)

# Endpoint to add a new applicant
@app.route('/applicants', methods=['POST'])
def add_applicant():
    new_applicant = request.json
    applicants.append(new_applicant)
    return jsonify({"message": "Applicant added successfully"})

# Endpoint to get all interviews
@app.route('/interviews', methods=['GET'])
def get_interviews():
    return jsonify(interviews)

# Endpoint to schedule a new interview
@app.route('/interviews', methods=['POST'])
def schedule_interview():
    new_interview = request.json
    interviews.append(new_interview)
    return jsonify({"message": "Interview scheduled successfully"})

# Sample data to simulate evaluation forms and evaluations
evaluation_forms = []
evaluations = []

# Endpoint to create an evaluation form
@app.route('/evaluation-forms', methods=['POST'])
def create_evaluation_form():
    new_form = request.json
    evaluation_forms.append(new_form)
    return jsonify({"message": "Evaluation form created successfully"})

# Endpoint to assign an evaluation to an employeefront 
@app.route('/evaluations', methods=['POST'])
def assign_evaluation():
    new_evaluation = request.json
    evaluations.append(new_evaluation)
    return jsonify({"message": "Evaluation assigned successfully"})

# Endpoint to track completion status of evaluations
@app.route('/evaluations/<int:evaluation_id>', methods=['PUT'])
def update_evaluation_status(evaluation_id):
    updated_evaluation = request.json
    for evaluation in evaluations:
        if evaluation['id'] == evaluation_id:
            evaluation.update(updated_evaluation)
            return jsonify({"message": "Evaluation status updated successfully"})
    return jsonify({"message": "Evaluation not found"})

# Endpoint to provide feedback for an evaluation
@app.route('/evaluations/<int:evaluation_id>/feedback', methods=['POST'])
def provide_feedback(evaluation_id):
    feedback_data = request.json
    # Add code to store feedback for the given evaluation
    return jsonify({"message": "Feedback provided successfully"})

leave_requests = [
    {
        "id": 1,
        "employee_id": 1,
        "leave_type": "Vacation",
        "start_date": "2024-04-20",
        "end_date": "2024-04-25",
        "reason": "Family vacation"
    },
    {
        "id": 2,
        "employee_id": 2,
        "leave_type": "Sick",
        "start_date": "2024-05-10",
        "end_date": "2024-05-11",
        "reason": "Flu"
    }
]

# Endpoint to get all leave requests
@app.route('/leave-requests', methods=['GET'])
def get_leave_requests():
    return jsonify(leave_requests)

# Endpoint to add a new leave request
@app.route('/leave-requests', methods=['POST'])
def add_leave_request():
    new_leave_request = request.json
    leave_requests.append(new_leave_request)
    return jsonify({"message": "Leave request added successfully"})

# Endpoint to update the status of a leave request
@app.route('/leave-requests/<int:leave_id>', methods=['PUT'])
def update_leave_request_status(leave_id):
    updated_status = request.json.get('status')
    for leave_request in leave_requests:
        if leave_request['id'] == leave_id:
            leave_request['status'] = updated_status
            return jsonify({"message": "Leave request updated successfully"})
    return jsonify({"message": "Leave request not found"})

employee_demographics = [
    {"gender": "Male", "age_group": "20-30", "count": 150},
    {"gender": "Female", "age_group": "20-30", "count": 200},
    {"gender": "Male", "age_group": "30-40", "count": 180},
    {"gender": "Female", "age_group": "30-40", "count": 220},
    # Add more data as needed
]

recruitment_metrics = [
    {"month": "January", "applications": 100, "hires": 50},
    {"month": "February", "applications": 120, "hires": 60},
    # Add more data as needed
]

performance_evaluation = [
    {"year": 2023, "average_rating": 4.5},
    {"year": 2024, "average_rating": 4.6},
    # Add more data as needed
]

leave_trends = [
    {"month": "January", "total_leave_days": 100},
    {"month": "February", "total_leave_days": 120},
    # Add more data as needed
]

# Endpoint to fetch employee demographics data
@app.route('/analytics/employee-demographics', methods=['GET'])
def get_employee_demographics():
    return jsonify(employee_demographics)

# Endpoint to fetch recruitment metrics data
@app.route('/analytics/recruitment-metrics', methods=['GET'])
def get_recruitment_metrics():
    return jsonify(recruitment_metrics)

# Endpoint to fetch performance evaluation data
@app.route('/analytics/performance-evaluation', methods=['GET'])
def get_performance_evaluation():
    return jsonify(performance_evaluation)

# Endpoint to fetch leave trends data
@app.route('/analytics/leave-trends', methods=['GET'])
def get_leave_trends():
    return jsonify(leave_trends)



if __name__ == '__main__':
    app.run(debug=True)
