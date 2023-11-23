import prdRouter from "./../v1/products/route.js";
import xl from "./../excel/readxl.js";
import marker_router from "./../v1/markers/route.js";
import pen from "./../v1/pen/routes.js";
import contact_router from "./../v1/contact/route.js";

export default function routeMiddleware(app) {
  app.use("/v2", xl);
  app.use("/v1", prdRouter);
  app.use("/v1", marker_router);
  app.use("/v1", pen);
  app.use("/v1", contact_router);
}
