import express from 'express'
import 'dotenv/config'
import dotenv from './dotenv.js'
import config from './config.js'
import { initDb } from './connection/connect.js' 
import prdRouter from './v1/products/route.js'
import bodyParser from 'body-parser'
import path ,{ dirname } from 'path'
import { fileURLToPath } from 'url';
import pen from './v1/pen/routes.js'
import xl from './excel/readxl.js'
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express()
initDb()
app.use(express.static(path.join(__dirname , "")))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/v2', xl )
app.use('/v1', prdRouter )
app.use('/v1', pen )

app.get('/' ,(req, res)=>{
    res.send({ msg:"hi"})
})

app.listen(config.port , ()=>{
     console.log(` serve connected to  ${dotenv.DB} db and started on port  `,config.port , )
})