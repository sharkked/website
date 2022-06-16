import { createLogger, format, transports } from 'winston'
import morgan from 'morgan'

const printf = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] : ${message}`
})

const logger = createLogger({
  level: 'debug',
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    printf
  ),
  transports: [
    new transports.Console()
  ]
})

export const httpLogger = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  {
    stream: { 
      write: (message) => logger.http(message.trim()) 
    }
  }
)

export default logger