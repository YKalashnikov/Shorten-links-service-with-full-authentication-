import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import { Details, Links, Create, Auth } from './pages/index';


export const useRoutes = isAuthenticated => {
    if (isAuthenticated) 
    return (
     <Switch>
         <Route path="/links" exact>
             <Links/>
         </Route>
         <Route path="/create" exact>
             <Create/>
         </Route>
         <Route path="/details/:id">
             <Details/>
         </Route>
         <Redirect to="/create"/>
     </Switch>
    )
    return (
        <Switch>
             <Route path="/" exact>
                 <Auth/>
             </Route>
             <Redirect to="/"/>
        </Switch>
       )
}
