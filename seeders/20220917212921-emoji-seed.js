'use strict';
const axios = require('axios');

module.exports = {
  async up (queryInterface, Sequelize) {
    //==== EMOJI API =====

const emojisRes = await axios.get(`https://emoji-api.com/emojis?access_key=${process.env.APIKEY}`);
const emojisArray = [];
if (emojisRes.status === 200 && emojisRes?.data?.results) {
    emojisRes.data.results.forEach(emoji => {
      emojisArray.push({
        character: emoji.character,
        codePoint: emoji.codePoint,
        group: emoji.group,
        slug: emoji.slug,
        subgroup: emoji.subgroup,
        unicodeName: emoji.unicodeName
    });
  });
}
console.log(await queryInterface.bulkInsert('emojis', emojisArray, {}));

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
