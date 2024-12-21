import { Model, DataTypes, Sequelize, Optional } from 'sequelize';


interface CommandeAttributes {
    id: number;
    menu: string;
    modification: string;
    supplement: string;
    statut: string;
    paiement: boolean;
    createdAt: Date;
}


interface CommandeCreationAttributes extends Optional<CommandeAttributes, 'id' | 'createdAt'> {}


export class Commande extends Model<CommandeAttributes, CommandeCreationAttributes> implements CommandeAttributes {
    public id!: number;
    public menu!: string;
    public modification!: string;
    public supplement!: string;
    public statut!: string;
    public paiement!: boolean; 
    public createdAt!: Date;
}


export const initCommandModel = (sequelize: Sequelize): void => {
    Commande.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            menu: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: "Le menu ne peut pas être vide" },
                    notNull: { msg: "Le menu est obligatoire" },
                    isIn: {
                        args: [['Menu Burger', 'Menu Kebab', 'Menu Tacos', 'Menu Pizza', 'Menu Salade']],
                        msg: "Le menu doit être parmi les options disponibles",
                    },
                },
            },
            modification: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: "La modification ne peut pas être vide" },
                    notNull: { msg: "La modification est obligatoire" },
                    isIn: {
                        args: [['Complet', 'Sans sauce', 'Sans tomate', 'Sans oignon', 'Sans cornichon', 'Sans fromage', 'Sans salade']],
                        msg: "La modification doit être parmi les options disponibles",
                    },
                },
            },
            supplement: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: "Le supplément ne peut pas être vide" },
                    notNull: { msg: "Le supplément est obligatoire" },
                    isIn: {
                        args: [['Frites', 'Boisson', 'Dessert', 'Sauce', 'Fromage', 'Salade']],
                        msg: "Le supplément doit être parmi les options disponibles",
                    },
                },
            },
            statut: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: "Le statut ne peut pas être vide" },
                    notNull: { msg: "Le statut est obligatoire" },
                    isIn: {
                        args: [['En attente','En préparation', 'Prêt', 'Finie']],
                        msg: "Le statut doit être parmi les options disponibles",
                    },
                },
            },
            paiement: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
                validate: {
                    notEmpty: { msg: "Le paiement ne peut pas être vide" },
                    notNull: { msg: "Le paiement est obligatoire" },
                },
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize, // Instance Sequelize
            tableName: 'commandes', // Nom de la table
            timestamps: true, // Gestion des timestamps
            createdAt: 'createdAt',
            updatedAt: false,
        }
    );
};
