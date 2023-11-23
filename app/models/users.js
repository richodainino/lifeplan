const users = (sequelize, Sequelize) => {
  const Users = sequelize.define('users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.STRING,
      defaultValue: 'free'
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  })

  return Users
}

module.exports = users