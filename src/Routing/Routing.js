import React from 'react';
import { Route, Switch } from 'react-router';
import HomePage from '../Containers/HomePage/HomePage';
import Faqs from '../Containers/Faqs/Faqs'
import Testimonials from '../Containers/Testimonials/Testimonials';
import Users from '../Containers/Users/Users';
import Partners from '../Containers/Partners/Partners';
import Login from '../Containers/LogIn/Login';
import FirstContainer from '../Containers/FirsContainer/FirstContainer';
import Benefits from '../Containers/Benefits/Benefits';
import Commission from '../Containers/Commission/Commision';
import MarketingTools from '../Containers/MarketinTools/MarketingTools';





const Routing = () => {
    return (
        <Switch>

            <Route path = '/' exact component = { Login }/>
            <Route path = '/home' exact component = { HomePage }/>
            <Route path = '/faqs'  component = { Faqs }/>
            <Route path = '/benefits'  component = { Benefits }/>
            <Route path = '/marketingTools'  component = { MarketingTools }/>
            <Route path = '/commission'  component = { Commission }/>
            <Route path = '/testimonials'  component = { Testimonials }/>
            <Route path = '/partners'  component = { Partners }/>
            <Route path = '/users'  component = { Users }/>
            <Route path = '/firstContainer'  component = { FirstContainer }/>
        </Switch>
    )
};

export default Routing;