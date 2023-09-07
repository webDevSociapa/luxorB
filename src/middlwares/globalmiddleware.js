import owner_router from '../v2/owner/auth/routes.js'
import tenant_router from './../v1/tenant_api/auth/routes.js'

 
export function tennatRouteMiddleware(app){
         app.use("/v1",tenant_router)
} 
  

export function ownerRouteMiddleware(app){
    app.use("/v2",owner_router)
} 
