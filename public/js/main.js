const express = require('express');
const router = express.Router();
const db = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');
const axios = require('axios');
const { where } = require('sequelize');

const SECRET_SESSION = process.env.SECRET_SESSION;




//=== add selected emoji
function addEmoji(emoji) {
    let inputEle = document.getElementById('input');
    inputEle.width = '100px';
    inputEle.height = '100px';
    
    inputEle.value += emoji;
  };
  
  function toggleEmojiDrawer() {
    let drawer = document.getElementById('drawer');
    
    if (drawer.classList.contains('hidden')) {
      drawer.classList.remove('hidden');
    } else {
      drawer.classList.add('hidden');
    }
  };


