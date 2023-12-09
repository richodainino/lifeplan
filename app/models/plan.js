const plans = (sequelize, Sequelize) => {
  const Plans = sequelize.define('plans', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
    },
    life_impact: {
      type: Sequelize.SMALLINT,
      allowNull: false,
    },
    people_impact: {
      type: Sequelize.SMALLINT,
      allowNull: false,
    },
    activity_impact: {
      type: Sequelize.SMALLINT,
      allowNull: false,
    },
    difficulty: {
      type: Sequelize.SMALLINT,
      allowNull: false,
    },
    duration: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    deadline: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    priority_points: {
      type: Sequelize.FLOAT,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    deletedAt: Sequelize.DATE
  }, {
    paranoid: true
  })

  return Plans
}

module.exports = plans