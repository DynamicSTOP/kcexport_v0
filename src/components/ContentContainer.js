import React, {Component} from 'react';
import Index from "./Index";
import ShipList from "./ShipList";
import NewTabParser from "./NewTabParser";
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'

class ContentContainer extends Component {
    constructor(props){
        super(props);
    }

    parseShips(ships){
        sessionStorage.ships=ships;
        this.router.history.push("/ship-list")
    }

    render() {
        return (
            <Router ref={router => this.router=router}>
                <div className="container-fluid">
                    <div className="row">
                        <Switch>
                            <Route path="/ship-list/[:shipData]" component={ShipList} />
                            <Route path="/ship-list" render={(props)=><ShipList {...props} />} />
                            <Route path="/newTab/:secret" render={(props)=><NewTabParser {...props} messageHandler={this.parseShips.bind(this)}/>} />
                            <Route component={Index} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default ContentContainer;