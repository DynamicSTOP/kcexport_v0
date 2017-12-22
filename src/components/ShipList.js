import React, {Component} from 'react';
import ShipListBlock from "./ShipListBlock";
import shipParser from "./../objects/ShipParser";
import listStorage from "./../objects/ListStorage";

class ShipList extends Component {
    constructor(props) {
        super(props);
        this.order = ["DE", "DD", "CL", "CLT", "CA", "CAV",
            "SS", "SSV", "FBB", "BB", "BBV", "CVL", "CV", "CVB",
            "AV", "AS", "AO", "LHA", "AR", "CT"];

        this.state = {shipsData: shipParser.stype.map((t) => Object.assign({hidden: false}, {name: t, ships: []}))};

        if (props.lastShipList === true) {
            window.location.hash = "#/ship-list";
            let ships = listStorage.getLastShips();
            if (ships !== null && ships.length)
                this.state.shipsData = ships;
        }
        this._save = this.triggerSave.bind(this);
    }

    triggerSave(){
        listStorage.saveLS(this.state.shipsData);
    }

    updateShips(ships = []) {
        if (ships !== null && ships.length && JSON.stringify(this.state.shipsData) !== JSON.stringify(ships)) {
            this.setState({shipsData: ships});
        }
    }

    componentWillUpdate(newPros, newState) {
        listStorage.saveShipsData(newState.shipsData);
    }

    componentDidMount() {
        if(this.props.shortLink===true){
            fetch(`https://api.kc-db.info/list/ships/${this.props.match.params.shortLink}`)
                .then((data) => data.json())
                .then((json) => {
                    if(json.error){
                        return alert(json.error);
                    }
                    this.updateShips(shipParser.unpackShipList(json.data));
                })
                .catch((e) => {
                    console.error("error", e);
                    alert("Some error happened while performing request!");
                });
        } else {
            let hash = window.location.hash.substring("#/ship-list/".length);
            if (hash.length > 0) {
                this.updateShips(shipParser.unpackShipList(hash));
                window.location.hash = "#/ship-list";
                return;
            }

            let ships = listStorage.getLastShips();
            if (ships !== null && ships.length)
                this.setState({shipsData: ships});
        }
        listStorage.on('saveEvent',this._save);
    }

    componentWillUnmount(){
        listStorage.removeListener('saveEvent',this._save);
    }

    render() {
        const ShipsByClassBlocks = this.order.map((s) => {
            const shipGroup = this.state.shipsData[shipParser.getSType().indexOf(s)];
            return <ShipListBlock key={`shiplist_${s}`} ships={shipGroup.ships} name={shipGroup.name}/>;
        });

        return (
            <ul className="kce-ship-list">
                {ShipsByClassBlocks}
            </ul>
        );
    }
}

export default ShipList;
