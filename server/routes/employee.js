const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Set up multer storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// File filter for images
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Only JPG and PNG files are allowed'), false);
  }
};

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB
  },
  fileFilter: fileFilter
});


router.get('/', auth, employeeController.getAllEmployees);


router.get('/:id', auth, employeeController.getEmployeeById);


router.post('/', auth, upload.single('image'), employeeController.createEmployee);


router.put('/:id', auth, upload.single('image'), employeeController.updateEmployee);


router.delete('/:id', auth, employeeController.deleteEmployee);


router.patch('/:id/toggle-status', auth, employeeController.toggleEmployeeStatus);

module.exports = router;