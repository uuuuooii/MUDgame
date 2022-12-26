"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeORMconfig = void 0;
require("dotenv/config");
exports.typeORMconfig = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
};
//# sourceMappingURL=typeorm.config.js.map