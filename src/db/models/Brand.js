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
        tableName: 'brands'
    }
    const Brand = sequelize.define("Brand", cols, config);
    
    Brand.associate = function(models) {
        Brand.hasMany(models.Product, {
            as: "Products",
            foreignKey: "brand_id",
            timestamps: true
        })
    }

    
    return Brand;
}