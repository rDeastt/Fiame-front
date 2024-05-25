import BusinessRegister from "../layouts/register/BusinessRegister.jsx";
import businessRegister from "../layouts/register/BusinessRegister.jsx";
import InitialPage from "../layouts/login/InitialPage.jsx";

const routesBusiness = [
    {
        path:'/Business',
        layout: InitialPage,
        component: businessRegister
    }
]

export default routesBusiness