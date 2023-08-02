import path from 'path'
import DailyRotateFile from 'winston-daily-rotate-file'
import { createLogger, format, transports } from 'winston'
const { combine, timestamp, label, printf } = format

// Print log format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const localTime = date.toLocaleString()

  return `${localTime} [${label}] ${level}: ${message}`
})

// daily rotatefile transporter;
const dailyRotateFileTransporter = (
  fileAndFolderName: string,
): DailyRotateFile => {
  const transport: DailyRotateFile = new DailyRotateFile({
    filename: path.join(
      process.cwd(),
      'logs',
      'winston',
      `${fileAndFolderName}`,
      `UM-%DATE%-${fileAndFolderName}.log`,
    ),
    datePattern: 'DD-MM-YYYY-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '10d',
  })

  return transport
}

// create successfull logs
const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'UM' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),

    dailyRotateFileTransporter('successes'),
  ],
})

// create errors logs.
const errorLogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'UM' }), timestamp(), myFormat),
  transports: [new transports.Console(), dailyRotateFileTransporter('errors')],
})

export { logger, errorLogger }
