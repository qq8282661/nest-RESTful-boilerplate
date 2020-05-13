import { readFileSync } from 'fs';

export default () => ({
  appId: '2016123456789012',
  privateKey: readFileSync('./hs_alipk.txt', 'ascii'),
  database: {
    type: 'mysql',
    host: 'mysql',
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
