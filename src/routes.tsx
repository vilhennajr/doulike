import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Company from './pages/company';
import Unit from './pages/unit';
import Sensor from './pages/sensor';

export default function Routes() {
    return (
      <BrowserRouter>
        <Switch>
          
          <Route path="/company" exact component={ Company } />
          <Route path="/unit" exact component={ Unit } />
          <Route path="/sensors" exact component={ Sensor } />

        </Switch>
      </BrowserRouter>
    );
}
