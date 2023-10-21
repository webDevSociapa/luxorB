import express from 'express'
import 'dotenv/config'
import config from './config.js'
import { initDb } from './connection/connect.js' 
import prdRouter from './v1/products/route.js'
import bodyParser from 'body-parser'
import path ,{ dirname } from 'path'
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express()
initDb()
app.use(express.static(path.join(__dirname , "")))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/v1', prdRouter )

app.get('/' ,(req, res)=>{
    res.send({ msg:"hi"})
})

app.listen(config.port , ()=>{
     console.log("serve started at ",config.port )
})