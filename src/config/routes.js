//Layout
import LayOutBasic from '../layouts/LayOutBasic';

//Page
import Laws from '../pages/Session/Laws';
import SignIn from '../pages/Session/SignIn/SignIn';
import Accidents from '../pages/Session/Accidents';
import Resources from '../pages/Session/Resources';

//Error
import Error404 from '../pages/Error404';

const routes = [
    {
        path:"/",
        component:LayOutBasic,
        exact:false,
        routes: [
            {
                path:"/accidentes",
                component:Accidents,
                exact:true
            },
            {
                path:"/leyes",
                component:Laws,
                exact:true
            },
            {
                path:"/inicio-sesion",
                component:SignIn,
                exact:true
            },
            {
                path:"/recursos",
                component:Resources,
                exact:true
            },
            {
                component:Error404
            }
        ]
    }
]

export default routes;
