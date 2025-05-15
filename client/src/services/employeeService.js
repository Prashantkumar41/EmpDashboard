import axios from 'axios';

const API_URL = 'http://localhost:5000/api/employees';

// Get all employees with pagination and search
export const getEmployees = async (page = 1, limit = 10, search = '', sortField = 'createdAt', sortOrder = 'desc') => {
  try {
    const response = await axios.get(
      `${API_URL}?page=${page}&limit=${limit}&search=${search}&sortField=${sortField}&sortOrder=${sortOrder}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get employee by ID
export const getEmployeeById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Create new employee
export const createEmployee = async (employeeData) => {
  try {
    const formData = new FormData();
    
    // Append all employee data to formData
    Object.keys(employeeData).forEach(key => {
      if (key === 'image' && employeeData[key] instanceof File) {
        formData.append(key, employeeData[key]);
      } else if (key !== 'image') {
        formData.append(key, employeeData[key]);
      }
    });
    
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update employee
export const updateEmployee = async (id, employeeData) => {
  try {
    const formData = new FormData();
    
    // Append all employee data to formData
    Object.keys(employeeData).forEach(key => {
      if (key === 'image' && employeeData[key] instanceof File) {
        formData.append(key, employeeData[key]);
      } else if (key !== 'image' || employeeData[key]) {
        formData.append(key, employeeData[key]);
      }
    });
    
    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete employee
export const deleteEmployee = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Toggle employee status
export const toggleEmployeeStatus = async (id) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}/toggle-status`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};