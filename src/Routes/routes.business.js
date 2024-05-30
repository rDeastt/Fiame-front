import {BusinessRegister} from "../pages/business/register/BusinessRegister.jsx";
import InitialPageLayout from "../layouts/creadentials/InitialPageLayout.jsx";
import {NavBarBusiness} from "../layouts/business/navbar/NavBarBusiness.jsx";
import {MainPageBusiness} from "../pages/business/MainPage/MainPageBusiness.jsx";

const routesBusiness = [
    {
        path:'/Business/register',
        layout: InitialPageLayout,
        component: BusinessRegister
    },
    {
        path:'/Business',
        layout: NavBarBusiness,
        component: MainPageBusiness
    }
]

export default routesBusiness