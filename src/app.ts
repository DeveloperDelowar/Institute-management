import express, { Application } from 'express'
import cors from 'cors'

import globalErrorHandler from './middlewares/globalErrorHandler'
import userRoutes from './modules/user/user.routes'

const app: Application = express()

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// use router
app.use('/api/v1/user', userRoutes)

// Global error handler
app.use(globalErrorHandler)

export default app
