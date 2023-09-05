import tenant_router from './../v1/tenant_api/auth/routes.js'

export function tennatRouteMiddleware(app){
         app.use("/v1",tenant_router)
} 
 