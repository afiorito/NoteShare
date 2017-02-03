const sequelize = require('./connect');
const models = require('./models')(sequelize);

module.exports = function(force) {
    sequelize.sync({force: force}).then(() => {
        // initialize default items here
    });
}