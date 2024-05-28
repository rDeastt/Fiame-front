import {ClientRegister} from "../pages/client/register/ClientRegister.jsx";
import InitialPageLayout from "../layouts/creadentials/InitialPageLayout.jsx";
import {NavBarClient} from "../layouts/client/navbar/NavBarClient.jsx";
import {MainPageClient} from "../pages/client/MainPage/MainPageClient.jsx";
import {DetailsClientPage} from "../pages/client/DetailsPage/DetailsClientPage.jsx";
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
    }

]

export default routesClient