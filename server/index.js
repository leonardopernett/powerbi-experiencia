import express from 'express';
import morgan  from 'morgan'
import cors    from 'cors';
import path    from 'node:path'
import appRouter from './router.js'
import {config} from 'dotenv'

config()

const app = express();

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use(appRouter)

app.use(express.static(path.join(process.cwd(), 'public')))

app.listen(process.env.PORT)
console.log('Server listening on port ' + process.env.PORT)