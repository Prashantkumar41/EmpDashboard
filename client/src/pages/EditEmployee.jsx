import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import EmployeeForm from '../components/employees/EmployeeForm';
import { getEmployeeById, updateEmployee } from '../services/employeeService';

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await getEmployeeById(id);
        setEmployee(data);
      } catch (err) {
        setError('Failed to fetch employee details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEmployee();
  }, [id]);
  
  const handleSubmit = async (formData) => {
    return await updateEmployee(id, formData);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </main>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="bg-yellow-200 py-2 px-4 mb-6">
          <h1 className="text-xl font-bold">Edit Employee</h1>
        </div>
        
        {employee && (
          <EmployeeForm
            initialData={employee}
            onSubmit={handleSubmit}
            isEdit={true}
          />
        )}
      </main>
    </div>
  );
};

export default EditEmployee;