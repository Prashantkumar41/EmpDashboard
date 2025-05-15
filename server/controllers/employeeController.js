const Employee = require('../models/Employee');

// Get all employees with pagination, sorting and filtering
exports.getAllEmployees = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';
    const sortField = req.query.sortField || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

    const searchQuery = search
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    const employees = await Employee.find(searchQuery)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit);

    const total = await Employee.countDocuments(searchQuery);

    res.json({
      employees,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }
    
    res.json(employee);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Employee not found' });
    }
    res.status(500).send('Server error');
  }
};

// Create employee
exports.createEmployee = async (req, res) => {
  const { name, email, mobile, designation, gender, course } = req.body;
  
  try {
    // Check if email already exists
    let employee = await Employee.findOne({ email });
    
    if (employee) {
      return res.status(400).json({ msg: 'Email already exists' });
    }
    
    // Create new employee
    employee = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      image: req.file ? req.file.filename : 'default.jpg'
    });
    
    await employee.save();
    
    res.json(employee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update employee
exports.updateEmployee = async (req, res) => {
  const { name, email, mobile, designation, gender, course } = req.body;
  
  try {
    let employee = await Employee.findById(req.params.id);
    
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }
    
    // Check if email exists and belongs to another employee
    const emailExists = await Employee.findOne({ email, _id: { $ne: req.params.id } });
    
    if (emailExists) {
      return res.status(400).json({ msg: 'Email already exists' });
    }
    
    // Update employee
    const employeeFields = {
      name,
      email,
      mobile,
      designation,
      gender,
      course
    };
    
    // Update image if provided
    if (req.file) {
      employeeFields.image = req.file.filename;
    }
    
    employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { $set: employeeFields },
      { new: true }
    );
    
    res.json(employee);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Employee not found' });
    }
    res.status(500).send('Server error');
  }
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }
    
    await Employee.deleteOne({ _id: req.params.id });
    
    res.json({ msg: 'Employee removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Employee not found' });
    }
    res.status(500).send('Server error');
  }
};

// Toggle employee active status
exports.toggleEmployeeStatus = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }
    
    employee.isActive = !employee.isActive;
    await employee.save();
    
    res.json(employee);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Employee not found' });
    }
    res.status(500).send('Server error');
  }
};