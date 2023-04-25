import { DataSource } from 'typeorm';
import path from 'path';
import { Patient } from './model/Patient';
import { AppDataDir } from '../config/registerConfigApi';
import Logger from '../Logger';
import { Report } from './model/Report';
import { Image } from './model/Image';

const _dataSource: DataSource = new DataSource({
  type: 'sqlite',
  synchronize: true,
  logging: true,
  logger: 'simple-console',
  database: path.join(AppDataDir, 'database.sqlite'),
  entities: [Image, Patient, Report],
});

export function initializeDatabase() {
  // to initialize initial connection with the database, register all entities
  // and "synchronize" database schema, call "initialize()" method of a newly created database
  // once in your application bootstrap
  // todo handle error
  return _dataSource
    .initialize()
    .then(() => {
      Logger.info('Db initialized');
      // here you can start to work with your database
    })
    .catch((error) => Logger.error('error initializing the db', error));
}

export default _dataSource;
