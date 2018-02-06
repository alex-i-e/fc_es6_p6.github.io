const config = require('../config/config.json');
const mongoose = require('mongoose');

mongoose.connect(config.mongoose.uri, config.mongoose.options);

module.exports = mongoose;