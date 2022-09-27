const { Provider } = require('../models/provider');

const getProviderList = async (req, res) => {
  const providers = await Provider.find({ isDeleted: false });
  return res.json({
    message: providers.length > 0 ? 'Providers found' : 'Providers not found',
    data: providers,
    error: false
  });
};

const getProvider = async (req, res) => {
  const providerId = req.params.providerId;
  const provider = await Provider.findOne({ providerId });
  if (!provider) {
    return res.status(404).json({
      message: 'Provider not found!',
      data: undefined,
      error: true
    });
  }

  return res.json({
    message: 'Success',
    data: provider,
    error: false
  });
};

const createProvider = async (req, res) => {
  const provider = {
    providerId: req.body.providerId,
    name: req.body.name,
  };
  try {
    const newProvider = new Provider(provider);
    const result = await newProvider.save();
  
    return res.status(201).json({
      message: 'Provider created!',
      data: result,
      error: false
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: provider,
      error: true
    });
  }
};

const updateProvider = async (req, res) => {
  const providerId = req.params.providerId;
  const newData = {
    $set: {
      ...(req.body.providerId && { providerId: req.body.providerId }),
      ...(req.body.name && { name: req.body.name }),
    },
  };
  const provider = await Provider.findOne({ providerId });
  if (!provider) {
    return res.status(404).json({
      message: 'Provider not found!',
      data: undefined,
      error: true
    });
  }
  try {
    const result = await Provider.updateOne({ providerId }, newData);
  
    return res.json({
      message: 'Provider updated!',
      data: result,
      error: false
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: provider,
      error: true
    })
  }
};

const deleteProvider = async (req, res) => {
  const providerId = req.params.providerId;
  const provider = await Provider.findOne({ providerId });
  if (!provider) {
    return res.status(404).json({
      message: 'Provider not found!',
      data: undefined,
      error: true
    });
  }
  
  provider.isDeleted = true;
  try {
    const result = await provider.save();
    return res.status(204).json({
      message: 'Provider deleted!',
      data: result,
      error: false
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: provider,
      error: true
    })
  }
}

const activateProvider = async (req, res) => {
  const providerId = req.params.providerId;
  const provider = await Provider.findOne({ providerId });
  if (!provider) {
    return res.status(404).json({
      message: 'Provider not found!',
      data: undefined,
      error: true
    });
  }

  provider.isDeleted = false;
  try {
    const result = await provider.save();
    return res.json({
      message: 'Provider activated!',
      data: result,
      error: false
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: provider,
      error: true
    })
  }
}

module.exports = {
  getProviderList,
  getProvider,
  createProvider,
  updateProvider,
  deleteProvider,
  activateProvider
};