const getEmployeeList = (req, res) => {
    const employees = require(path.join(__dirname + './../data/people.json'));
    return res.send(employees);
  };
  
  const getEmployee = async (req, res) => {
    const { employeeId } = req.params;
    const employees = await getEmployeeList()
    const employee = employees.find(e => e.userId == employeeId)
    if (!employee) {
      throw new Error('Employee not found!');
    }
    
    return res.send(employee);
  }
  
  module.exports = {
    getEmployeeList,
    getEmployee
  };