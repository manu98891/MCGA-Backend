const express = require('express');
const employeesController = require('../controllers/employees')
const router = express.Router();
const RESOURCE_ROUTE = '/employees';

router.get(RESOURCE_ROUTE, employeesController.getEmployeeList);

router.get(`${RESOURCE_ROUTE}/:employeeId`, employeesController.getEmployee);

module.exports = router;