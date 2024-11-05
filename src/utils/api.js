const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const fetchEmployees = async () => {
  const response = await fetch(`${API_BASE_URL}/employees/`);
  if (!response.ok) throw new Error('Failed to fetch employees');
  return response.json();
};

export const createEmployee = async (employeeData) => {
  const response = await fetch(`${API_BASE_URL}/employees/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employeeData),
  });
  if (!response.ok) throw new Error('Failed to create employee');
  return response.json();
};

export const updateEmployee = async (id, employeeData) => {
  const response = await fetch(`${API_BASE_URL}/employees/${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employeeData),
  });
  if (!response.ok) throw new Error('Failed to update employee');
  return response.json();
};

export const deleteEmployee = async (id) => {
  const response = await fetch(`${API_BASE_URL}/employees/${id}/`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete employee');
  return true;
};