import express from 'express'
import 'dotenv/config'
import config from './config.js'
import { initDb } from './connection/db_connect.js'
import tenant_model from './models/tenant.js'
import path , { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import { tennatRouteMiddleware } from './middlwares/globalmiddleware.js'
let app = express()

app.use(express.static(path.join(__dirname , "")))
let port = process.env.PORT || config.port 

initDb()
tennatRouteMiddleware(app)


app.get('/' , (req, res )=>{
     res.render('index.html')
})
 
app.listen(port , ()=>{
     console.log(`server started at ${port}`)
})