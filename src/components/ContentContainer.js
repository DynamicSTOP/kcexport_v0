import React, {Component} from 'react';
import Index from "./Index";
import ShipList from "./ShipList";
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'

class ContentContainer extends Component {
    constructor(){
        super();
        console.log("ContentContainer");
    }

    render() {
        return (
            <Router>
                <div className="container-fluid">
                    <div className="row">
                        <Switch>
                            <Route path="/ship-list/[:shipData]" component={ShipList} />
                            <Route path="/ship-list" component={ShipList} />

                            <Route component={Index} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default ContentContainer;