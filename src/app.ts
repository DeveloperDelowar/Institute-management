import express, { Application } from 'express'
import cors from 'cors'

// import routes
import userRoutes from './modules/user/user.routes'

const app: Application = express()

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// use router
app.use('/api/v1/user', userRoutes)

export default app
