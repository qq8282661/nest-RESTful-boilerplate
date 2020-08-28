export default () => ({
  database: {
    type: 'mysql',
    host: 'localhost',
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
