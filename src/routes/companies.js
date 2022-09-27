const express = require('express');
const companiesController = require('../controllers/companies');
const router = express.Router();
const RESOURCE_ROUTE = '/companies';

router.get(RESOURCE_ROUTE, companiesController.getCompanyList);

router.get(`${RESOURCE_ROUTE}/:companyId`, companiesController.getCompany);

module.exports = router;