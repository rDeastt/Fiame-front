import {ClientRegister} from "../pages/client/register/ClientRegister.jsx";
import InitialPageLayout from "../layouts/creadentials/InitialPageLayout.jsx";
const routesClient = [
    {
        path:'/Client/register',
        layout: InitialPageLayout,
        component: ClientRegister
    }
]

export default routesClient