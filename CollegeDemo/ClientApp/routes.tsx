import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Colleges } from './components/Colleges';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/colleges' component={ Colleges } />
</Layout>;
