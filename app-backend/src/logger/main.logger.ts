import { createLogger, format, transports, type Logform } from 'winston';
const { combine, label, printf } = format;
import moment from 'moment-timezone';
import { errorTransport, infoTransport } from './transports.logger';

const appendTimestamp = format((info, opts) => {
  info.timestamp = moment().tz(opts['tz']).format();
  return info;
});

function loggerFormat(): Logform.Format {
  return printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  });
}

const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'main' }),
    appendTimestamp({ tz: 'Asia/Kolkata' }),
    loggerFormat()
  ),
  transports: [new transports.Console(), infoTransport, errorTransport],
});

export { logger };
