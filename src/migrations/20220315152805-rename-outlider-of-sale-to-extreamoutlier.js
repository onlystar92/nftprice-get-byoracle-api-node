'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Sales', 'outlier', 'extreamOutlier');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Sales', 'extreamOutlier', 'outlier');
  },
};
