'use strict';

const mongoose = require('mongoose');

const contactSchema = require('../schemas/contacts');

module.exports = mongoose.model('Contact', contactSchema);
