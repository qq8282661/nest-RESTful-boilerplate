export default () => ({
  database: {
    type: 'mysql',
    host: '127.0.0.1',
    // host: 'mysql',
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
