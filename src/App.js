import React from 'react';

import { Switch, Route, Redirect, HashRouter } from 'react-router-dom';

import routes from './routes';
import Layout from './components/Layout';

function App() {

    return (
        <Layout>
            <HashRouter>
                <React.Suspense fallback={"Loading..."}>
                    <Switch>
                        {routes.map((route, idx) => {
                            return route.component ? (
                                <Route
                                    key={idx}
                                    path={route.path}
                                    exact={true}
                                    name={route.name}
                                    render={props => <route.component {...props} />}
                                />
                            ) : null;
                        })}
                        <Redirect from="/" to="/home" />
                    </Switch>
                </React.Suspense>
            </HashRouter>
        </Layout>
    );
}

export default App;
