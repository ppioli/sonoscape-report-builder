import winston from 'winston';
import util from 'util';
import isDev from 'electron-is-dev';
import { app } from 'electron';
import { join } from 'path';

// https://github.com/winstonjs/winston/issues/1427
const combineMessageAndSplat = () => ({
  transform(info: any) {
    const { [Symbol.for('splat')]: args = [], message } = info;
    // eslint-disable-next-line no-param-reassign
    info.message = util.format(message, ...args);
    return info;
  },
});

const createLogger = () =>
  winston.createLogger({
    format: winston.format.combine(
      winston.format.timestamp(),
      combineMessageAndSplat(),
      winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
      )
    ),
  });

const logDirPath = isDev ? '.' : app.getPath('userData');

const logger = createLogger();
logger.add(
  new winston.transports.File({
    level: 'debug',
    filename: join(logDirPath, 'app.log'),
    options: { flags: 'a' },
  })
);
if (isDev) logger.add(new winston.transports.Console());

export default logger;
