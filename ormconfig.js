export default {
  type: 'sqlite',
  synchronize: true,
  logging: true,
  logger: 'simple-console',
  database: 'database.sqlite',
  entities: ['src/shared/model/*.ts'],
};
