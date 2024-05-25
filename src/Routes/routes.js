import routesBusiness from "./routes.business.js";
import routesClient from "./routes.client.js";
import BasicLayout from "../layouts/BasicLayout.jsx";
import Error404 from "../pages/Error404.jsx";

const routes =[
    ...routesBusiness,
    ...routesClient,
    {
        path: '*',
        layout: BasicLayout,
        component: Error404,
    },
]

export default routes;