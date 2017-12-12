import React, {Component} from 'react';
import Index from "./Index";
import ShipList from "./ShipList";
import NewTabParser from "./NewTabParser";
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import dp1 from "../datapacker/datapacker.v1";

class ContentContainer extends Component {
    parseShips(ships) {
        //can use a session storage here, but it won't work in incognito safari... fuck safari, man
        this.router.history.push("/ship-list/" + dp1.packShips(JSON.parse(ships)));
    }

    render() {
        return (
            <Router ref={router => this.router = router}>
                <div className="container-fluid">
                    <div className="row">
                        <Switch>
                            <Route path="/ship-list/[:shipData]" component={ShipList}/>
                            <Route path="/ship-list" render={(props) => <ShipList {...props} />}/>
                            <Route path="/newTab" render={(props) => <NewTabParser {...props}
                                                                                   messageHandler={this.parseShips.bind(this)}/>}/>
                            <Route component={Index}/>
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default ContentContainer;