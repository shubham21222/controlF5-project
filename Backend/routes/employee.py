# backend/routes/employee.py

from flask import Blueprint, request, jsonify

employee_bp = Blueprint('employee', __name__)

# Mock employee data (replace with database integration)
employees = [
    {
        'id': 1,
        'name': 'John Doe',
        'position': 'Software Engineer',
        'department': 'Engineering',
        'contact': 'john@example.com',
        'profile_picture': 'john.jpg'
    },
    {
        'id': 2,
        'name': 'Jane Smith',
        'position': 'HR Manager',
        'department': 'Human Resources',
        'contact': 'jane@example.com',
        'profile_picture': 'jane.jpg'
    },
    # Add more employee records as needed
]

# Route to fetch all employees
@employee_bp.route('/employees', methods=['GET'])
def get_employees():
    return jsonify(employees)

# Route to fetch a specific employee by ID
@employee_bp.route('/employees/<int:employee_id>', methods=['GET'])
def get_employee(employee_id):
    employee = next((emp for emp in employees if emp['id'] == employee_id), None)
    if employee:
        return jsonify(employee)
    else:
        return jsonify({'error': 'Employee not found'}), 404

# Route to add a new employee
@employee_bp.route('/employees', methods=['POST'])
def add_employee():
    new_employee = request.json
    new_employee['id'] = len(employees) + 1  # Assign a new ID
    employees.append(new_employee)
    return jsonify({'message': 'Employee added successfully', 'employee': new_employee}), 201

# Route to update an existing employee
@employee_bp.route('/employees/<int:employee_id>', methods=['PUT'])
def update_employee(employee_id):
    employee_index = next((index for index, emp in enumerate(employees) if emp['id'] == employee_id), None)
    if employee_index is not None:
        employees[employee_index] = request.json
        employees[employee_index]['id'] = employee_id  # Ensure the ID remains the same
        return jsonify({'message': 'Employee updated successfully', 'employee': employees[employee_index]})
    else:
        return jsonify({'error': 'Employee not found'}), 404

# Route to delete an employee
@employee_bp.route('/employees/<int:employee_id>', methods=['DELETE'])
def delete_employee(employee_id):
    global employees
    employees = [emp for emp in employees if emp['id'] != employee_id]
    return jsonify({'message': 'Employee deleted successfully'}), 200
