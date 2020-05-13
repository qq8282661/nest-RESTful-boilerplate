import { readFileSync } from 'fs';

console.log(__dirname);
export default () => ({
  appId: '2016123456789012',
  privateKey: readFileSync('./hs_alipk.txt', 'ascii'),

  database: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'test',
    synchronize: true,
    autoLoadEntities: true,
    logging: true,
    dropSchema: true,
  },
});