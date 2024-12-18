module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Article', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    menu: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {message: "Le menu ne peut pas être vide"},
        notNull: {message: "Le menu est obligatoire"},
      },
      isIn : [['Menu Burger','Menu Kebab','Menu Tacos', 'Menu Pizza', 'Menu Salade']]
    },
    modification: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {message: "La modification ne peut pas être vide"},
        notNull: {message: "La modification est obligatoire"},
      },
      isIn : [['Complet','Sans sauce','Sans tomate','Sans oignon', 'Sans cornichon', 'Sans fromage', 'Sans salade']]
    },
    supplément: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {message: "Le supplément ne peut pas être vide"},
        notNull: {message: "Le supplément est obligatoire"},
      },
      isIn : [['Frites','Boisson','Dessert','Sauce', 'Fromage', 'Salade']]
    },
    statut: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {message: "Le statut ne peut pas être vide"},
        notNull: {message: "Le statut est obligatoire"},
      },
      isIn : [['En préparation','Prêt','Finie']]
    },
    paiement: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notEmpty: {message: "Le paiement ne peut pas être vide"},
        notNull: {message: "Le paiement est obligatoire"},
      }
    }
  }, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: false
  });
}

      