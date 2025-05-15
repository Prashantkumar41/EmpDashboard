import React from 'react';
import Header from '../components/layout/Header';
import EmployeeForm from '../components/employees/EmployeeForm';
import { createEmployee } from '../services/employeeService';

const CreateEmployee = () => {
  const handleSubmit = async (formData) => {
    return await createEmployee(formData);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="bg-yellow-200 py-2 px-4 mb-6">
          <h1 className="text-xl font-bold">Create Employee</h1>
        </div>
        
        <EmployeeForm onSubmit={handleSubmit} />
      </main>
    </div>
  );
};

export default CreateEmployee;