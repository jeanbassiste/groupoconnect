module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "L3M02pass",
    DB: "projet7",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
};