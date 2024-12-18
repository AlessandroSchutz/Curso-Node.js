const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("structuremvc", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Conectamos ao MySql!");
} catch (error) {
  console.log(`Não foi possivel conectar: ${error}`);
}

module.exports = sequelize;