import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import QA from './QA';
import Resources from './Resources';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/dashboard" component={Dashboard} />
                        <Route path="/qa" component={QA} />
                        <Route path="/resources" component={Resources} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
