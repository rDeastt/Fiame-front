import {ClientRegister} from "../layouts/register/ClientRegister.jsx";
import InitialPage from "../layouts/login/InitialPage.jsx";
const routesClient = [
    {
        path:'/Client',
        layout: InitialPage,
        component: ClientRegister
    }
]

export default routesClient