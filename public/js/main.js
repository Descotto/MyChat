const express = require('express');
const router = express.Router();
const db = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');
const axios = require('axios');
const { where } = require('sequelize');

const SECRET_SESSION = process.env.SECRET_SESSION;

const emojiTable = document.querySelector('#emojiTable');

