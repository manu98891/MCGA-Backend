const getCompanyList = (req, res) => {
    const companies = require('./../data/companies.json');
    return res.send(companies);
  };
  
  const getCompany = async (req, res) => {
    const { companyId } = req.params;
    const companies = await getCompanyList();
    const company = companies.find((c) => c.companyId == companyId);
    if (!company) {
      throw new Error('Company not found!');
    }
  
    return company;
  };
  
  module.exports = {
    getCompanyList,
    getCompany,
  };