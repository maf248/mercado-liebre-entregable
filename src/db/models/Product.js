module.exports = (sequelize, DataTypes) => {

    const cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false

        },
        title: {
            type: DataTypes.STRING,
            allowNull: false

        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true

        },
        photo: {
            type: DataTypes.STRING,
            allowNull: false

        },
        price: {
            type: DataTypes.DECIMAL(10,2).UNSIGNED,
            allowNull: false

        },
        // stock: {
        //     type: DataTypes.INTEGER.UNSIGNED,
        //     allowNull: false

        // },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false

        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true

        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }
    const config = {
        tableName: 'products',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        paranoid: true
    }
    const Product = sequelize.define("Product", cols, config);
    
    Product.associate = function(models) {
        Product.belongsTo(models.Category, {
            as: "Categories",
            foreignKey: "category_id",
            timestamps: false
        })
        Product.belongsTo(models.Brand, {
            as: "Brands",
            foreignKey: "brand_id",
            timestamps: false
        })
    }

    
    return Product;
}