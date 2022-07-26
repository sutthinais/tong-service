"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDbPool = void 0;
const mysql_1 = require("mysql");
function createDbPool() {
    return (0, mysql_1.createPool)({
        connectionLimit: 10,
        host: `203.114.108.46`,
        user: `root`,
        password: ``,
        database: `tong_dev`,
        port: 8080
    });
}
exports.createDbPool = createDbPool;
