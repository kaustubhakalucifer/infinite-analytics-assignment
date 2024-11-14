import { transports } from 'winston';
import path from 'path';

const infoTransport = new transports.File({
  filename: path.join(process.cwd(), 'logs', 'info.log'),
  level: 'info',
});

const errorTransport = new transports.File({
  filename: path.join(process.cwd(), 'logs', 'error.log'),
  level: 'error',
});

export { infoTransport, errorTransport };
