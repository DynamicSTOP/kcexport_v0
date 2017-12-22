import React, {Component} from 'react';
import Index from "./Index";
import ShipList from "./ShipList";
import NewTabParser from "./NewTabParser";
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import dp1 from "../datapacker/datapacker.v1";
import SavedList from "./SavedList";

class ContentContainer extends Component {
    parseShips(ships) {
        //can use a session storage here, but it won't work in incognito safari... fuck safari, man
        this.router.history.push("/ship-list/" + dp1.packShips(JSON.parse(ships)));
    }

    triggerSave() {
        if (this.contentBlock) {
            this.contentBlock.triggerSave();
        }
    }

    render() {
        return (
            <Router ref={router => this.router = router}>
                <div className="container-fluid">
                    <div className="row">
                        <Switch>
                            <Route path="/saved" component={SavedList} />}/>
                            <Route path="/ship-list/last" render={(props) => <ShipList lastShipList={true} {...props} />}/>
                            <Route path="/ship-list/[:shipData]" render={(props) => <ShipList {...props} />}/>
                            <Route path="/ship-list" component={ShipList}/>
                            <Route path="/newTab" render={(props) => <NewTabParser {...props} messageHandler={this.parseShips.bind(this)}/>}/>
                            <Route path="/ship-list-short/:shortLink" render={(props) => <ShipList shortLink={true} {...props} />}/>
                            <Route component={Index}/>
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default ContentContainer;