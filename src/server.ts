import mongoose from 'mongoose'
import app from './app'
import config from './config/config'
import { logger, errorLogger } from './shared/Logger'

;(async function main() {
  try {
    await mongoose.connect(config.db_url as string)
    logger.info(`Database connected successfully.`)

    app.listen(config.port, () => {
      logger.info(`Application listen on ${config.port} port.`)
    })
  } catch (err) {
    errorLogger.error(`Database disconnected. `, err)
  }
})()
