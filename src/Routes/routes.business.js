import {BusinessRegister} from "../pages/business/register/BusinessRegister.jsx";
import InitialPageLayout from "../layouts/creadentials/InitialPageLayout.jsx";

const routesBusiness = [
    {
        path:'/Business/register',
        layout: InitialPageLayout,
        component: BusinessRegister
    }
]

export default routesBusiness