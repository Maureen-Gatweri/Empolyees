import React, { useState, useEffect } from 'react';
import { fetchEmployees, createEmployee, updateEmployee, deleteEmployee } from './utils/api';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const data = await fetchEmployees();
      setEmployees(data);
    } catch (err) {
      setError('Failed to load employees');
      console.error(err);
    }
  };

  const handleCreateEmployee = async (employeeData) => {
    try {
      await createEmployee(employeeData);
      await loadEmployees();
      setIsFormVisible(false);
    } catch (err) {
      setError('Failed to create employee');
      console.error(err);
    }
  };

  const handleUpdateEmployee = async (employeeData) => {
    try {
      await updateEmployee(selectedEmployee.id, employeeData);
      await loadEmployees();
      setSelectedEmployee(null);
      setIsFormVisible(false);
    } catch (err) {
      setError('Failed to update employee');
      console.error(err);
    }
  };

  const handleDeleteEmployee = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(id);
        await loadEmployees();
      } catch (err) {
        setError('Failed to delete employee');
        console.error(err);
      }
    }
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setIsFormVisible(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Employee Management System</h1>
        <button
          onClick={() => {
            setSelectedEmployee(null);
            setIsFormVisible(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Employee
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {isFormVisible ? (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {selectedEmployee ? 'Edit Employee' : 'Add New Employee'}
          </h2>
          <EmployeeForm
            employee={selectedEmployee}
            onSubmit={selectedEmployee ? handleUpdateEmployee : handleCreateEmployee}
            onCancel={() => {
              setIsFormVisible(false);
              setSelectedEmployee(null);
            }}
          />
        </div>
      ) : (
        <EmployeeList
          employees={employees}
          onEdit={handleEdit}
          onDelete={handleDeleteEmployee}
        />
      )}
    </div>
  );
};

export default App;