module.exports = (sequelize, DataTypes) => {

    const cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false

        },
        name: {
            type: DataTypes.STRING,
            allowNull: false

        }
    }
    const config = {
        tableName: 'categories',
        timestamps: false
    }
    const Category = sequelize.define("Category", cols, config);
    
    Category.associate = function(models) {
        Category.hasMany(models.Product, {
            as: "Products",
            foreignKey: "category_id",
            timestamps: true
        })
    }

    
    return Category;
}