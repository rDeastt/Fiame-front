import routesBusiness from "./routes.business.js";
import routesClient from "./routes.client.js";
import BasicLayout from "../layouts/BasicLayout.jsx";
import Error404 from "../pages/Error404.jsx";
import initialPageLayout from "../layouts/creadentials/InitialPageLayout.jsx";
import {MainPage} from "../pages/credentials/MainPage.jsx";
import {Login} from "../pages/credentials/Login.jsx";

const routes =[
    ...routesBusiness,
    ...routesClient,
    {
        path: '/',
        layout: initialPageLayout,
        component: MainPage
    },
    {
        path: '/login',
        layout: initialPageLayout,
        component: Login
    },
    {
        path: '*',
        layout: BasicLayout,
        component: Error404,
    },
]

export default routes;