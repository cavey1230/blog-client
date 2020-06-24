import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Home from "./pages/home/home";
import RouterGuard from "./highOrder/routerGuard";
import PageCreateCenter from "./pages/create/create_center";
import PageCreateEdit from "./pages/create/create_edit";
import PageCreateNewGuide from "./pages/create/create_new_guide"
import PageCreateNewMarkDown from "./pages/create/create_new_markdown";
import Admin from "./pages/admin/admin";

class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <RouterGuard exact path="/create" component={PageCreateCenter}/>
                        <RouterGuard exact path="/create/edit" component={PageCreateEdit}/>
                        <RouterGuard exact path="/create/new/guide" component={PageCreateNewGuide}/>
                        <RouterGuard exact path="/create/new" component={PageCreateNewMarkDown}/>
                        <Route exact path="/llzs1997/admin" component={Admin}/>
                        <Route path="/" component={Home}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
