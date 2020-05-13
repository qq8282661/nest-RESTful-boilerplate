import { readFileSync } from 'fs';

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
    entities: [__dirname + '/**/*.entity.ts'],
    autoLoadEntities: true,
    logging: true,
    dropSchema: true,
  },
});
