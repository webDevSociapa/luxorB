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
import cors from 'cors'
import marker_router from './v1/markers/route.js'
import routeMiddleware from './global_middlwares/index.js'
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express()
initDb()
 
app.use(cors())
app.use(express.static(path.join(__dirname , "")))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
 
let public_path_asset = path.join(__dirname , "./../assets")

app.use("/v1", express.static(public_path_asset) )

routeMiddleware(app)

app.get('/' ,(req, res)=>{
    res.sendFile('index.html')
})

 
app.listen(config.port , ()=>{
     console.log(` serve connected to  ${dotenv.DB} db and started on port  `,config.port , )
})