import React from 'react';
import { Route, Switch } from 'react-router';
import HomePage from '../Containers/HomePage/HomePage';
import Faqs from '../Containers/Faqs/Faqs'
import Testimonials from '../Containers/Testimonials/Testimonials';
import Users from '../Containers/Users/Users';
import Partners from '../Containers/Partners/Partners';
const Routing = () => {
    return (
        <Switch>
            <Route path = '/' exact component = { HomePage }/>
            <Route path = '/faqs'  component = { Faqs }/>
            <Route path = '/testimonials'  component = { Testimonials }/>
            <Route path = '/partners'  component = { Partners }/>
            <Route path = '/users'  component = { Users }/>
        </Switch>
    )
};

export default Routing;