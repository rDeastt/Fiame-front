import {ClientRegister} from "../pages/client/register/ClientRegister.jsx";
import InitialPageLayout from "../layouts/creadentials/InitialPageLayout.jsx";
import {NavBarClient} from "../layouts/client/navbar/NavBarClient.jsx";
import {MainPageClient} from "../pages/client/MainPage/MainPageClient.jsx";
import {DetailsClientPage} from "../pages/client/DetailsPage/DetailsClientPage.jsx";
import {ClientProfile} from "../pages/client/Profile/ClientProfile.jsx";
import {PaymentBagDetails} from "../components/client/DetailsPaymentBag/PaymentBagDetails.jsx";
import {HistoryPaymentClient} from "../pages/client/HistoryPayment/HistoryPaymentClient.jsx";
import {PaymentBagDetailsBusiness} from "../components/business/DetailsPaymentBagWithPayFunction/PaymentBagWP.jsx";
import {PaymentReport} from "../pages/client/Reports/PaymentReport.jsx";
import {ConsumeReport} from "../pages/client/Reports/ConsumeReport.jsx";
const routesClient = [
    {
        path:'/Client/register',
        layout: InitialPageLayout,
        component: ClientRegister
    },
    {
        path:'/Client',
        layout: NavBarClient,
        component: MainPageClient
    },
    {
        path: '/Client/Details/:id',
        layout: NavBarClient,
        component: DetailsClientPage
    },
    {
        path: '/Client/DetailsBag/:clientId/:businessId', // Modifica la ruta para aceptar ambos IDs
        layout: NavBarClient,
        component: PaymentBagDetails
    },
    {
        path: '/Client/DetailsBagHistory/:clientId/:businessId', // Modifica la ruta para aceptar ambos IDs
        layout: NavBarClient,
        component: PaymentBagDetails
    },
    {
        path: '/Client/profile',
        layout: NavBarClient,
        component: ClientProfile
    },
    {
        path: '/Client/history',
        layout: NavBarClient,
        component: HistoryPaymentClient
    },
    {
        path: '/Client/reportPayment/:id',
        layout: NavBarClient,
        component: PaymentReport
    },
    {
        path: '/Client/reportConsume/:id',
        layout: NavBarClient,
        component: ConsumeReport
    }
]

export default routesClient