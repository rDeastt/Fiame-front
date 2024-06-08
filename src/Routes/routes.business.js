import {BusinessRegister} from "../pages/business/register/BusinessRegister.jsx";
import InitialPageLayout from "../layouts/creadentials/InitialPageLayout.jsx";
import {NavBarBusiness} from "../layouts/business/navbar/NavBarBusiness.jsx";
import {MainPageBusiness} from "../pages/business/MainPage/MainPageBusiness.jsx";
import {CreatePaymentPlan} from "../pages/business/CreatePaymentPlan/CreatePaymentPlan.jsx";
import {ActiveClients} from "../pages/business/ActiveClients/ActiveClients.jsx";
import {DetailsClientPage} from "../pages/client/DetailsPage/DetailsClientPage.jsx";
import {BusinessProfile} from "../pages/business/Profile/BusinessProfile.jsx";
import {HistoryPaymentPlanBusiness} from "../pages/business/HistoryPaymentPlan/HistoryPaymentPlanBusiness.jsx";

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
    },
    {
        path: '/Business/CreatePaymentPlan',
        layout: NavBarBusiness,
        component: CreatePaymentPlan
    },
    {
        path: '/Business/ActiveClients',
        layout: NavBarBusiness,
        component:ActiveClients
    },
    {
        path: '/Business/Details/:id',
        layout: NavBarBusiness,
        component: DetailsClientPage
    },
    {
        path: '/Business/profile',
        layout: NavBarBusiness,
        component: BusinessProfile
    },
    {
        path: '/Business/history',
        layout: NavBarBusiness,
        component: HistoryPaymentPlanBusiness
    }
]

export default routesBusiness