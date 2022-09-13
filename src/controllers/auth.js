const login = (req, res) => {
    const credentials = {
      username: req.body.username,
      password: req.body.password
    };
    const status = true;
    return res.send(status)
  }
  
  module.exports = {
    login
  }