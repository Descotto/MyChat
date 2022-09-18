'use strict';
const axios = require('axios');
require('dotenv').config();

module.exports = {
  async up (queryInterface, Sequelize) {
    const emojisRes = await axios.get(`https://emoji-api.com/emojis?access_key=${process.env.APIKEY}`);
    console.log(emojisRes.data[1])
    const emojisArray = [];
    if (emojisRes.status === 200 && emojisRes?.data) {
      await emojisRes.data.forEach(emoji => {
        emojisArray.push({
          character: emoji.character,
          codePoint: emoji.codePoint,
          group: emoji.group,
          slug: emoji.slug,
          subgroup: emoji.subGroup,
          unicodeName: emoji.unicodeName,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      });
      console.log('emojisArray: ', emojisArray)
      await queryInterface.bulkInsert('emojis', emojisArray, {}) 
    }
    
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('emojis', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};




