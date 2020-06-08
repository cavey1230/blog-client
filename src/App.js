import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Home from "./pages/home/home";

class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" component={Home}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
