import React, {Component} from 'react';
import WCTFships from './../generated/ships';
import dp1 from "../datapacker/datapacker.v1";
import ShipListBlock from "./ShipListBlock";

class ShipList extends Component {
    constructor(props) {
        super(props);
        this.stype = ["", "DE", "DD", "CL", "CLT",
            "CA", "CAV", "CVL", "FBB", "BB", "BBV",
            "CV", "XBB", "SS", "SSV", "AP", "AV",
            "LHA", "CVB", "AR", "AS", "CT", "AO"
        ];
        this.order = ["DE", "DD", "CL", "CLT", "CA", "CAV",
            "SS", "SSV", "FBB", "BB", "BBV", "CVL", "CV", "CVB",
            "AV", "AS", "AO", "LHA", "AR", "CT"];

        this.state = {shipsData: this.stype.map((t) => Object.assign({hidden: false}, {name: t, ships: []}))};
    }

    updateShips(ships = []) {
        let tempShipsData = this.stype.map((t) => Object.assign({}, {name: t, ships: []}));
        ships.map((s) => {
                const type = this.stype.indexOf(WCTFships[s[1]].api_typen);
                const master = WCTFships[s[1]];

                tempShipsData[type].ships.push({
                    // WCTF: master,
                    id: s[0],
                    masterId: s[1],
                    lvl: s[2],
                    sally: s[3],
                    // TODO shouldn't you move this into datapacker ?
                    // tp ar fp aa lk comes as remaining points
                    tp: [master.stat.torpedo_max - s[4], master.stat.torpedo_max],
                    ar: [master.stat.armor_max - s[5], master.stat.armor_max],
                    fp: [master.stat.fire_max - s[6], master.stat.fire_max],
                    aa: [master.stat.aa_max - s[7], master.stat.aa_max],
                    lk: [master.stat.luck_max - s[8], master.stat.luck_max],
                    // hp and as comes as mod value
                    hp: [master.stat.hp + s[9], master.stat.hp_max, s[9]],
                    // asw grows by itself so i am not sure if i should just subtract current from max
                    as: [master.stat.asw + s[10], master.stat.asw_max, s[10]],
                    name: master.name.ja_romaji !== "" ? master.name.ja_romaji : master.name.ja_jp,
                    speed: master.speed,
                    suffix: master.name.suffix_rj || null,
                    stype: master.type,
                    sortno: master.no
                });
                return true;
            }
        );
        tempShipsData = tempShipsData.map(
            (g) => {
                g.ships.sort((a, b) => {
                    if (a.lvl === b.lvl) {
                        if (a.sortno === b.sortno) {
                            return a.id - b.id;
                        } else {
                            return a.sortno - b.sortno;
                        }
                    } else {
                        return b.lvl - a.lvl;
                    }
                });
                return g;
            }
        );

        if (JSON.stringify(this.state.shipsData) !== JSON.stringify(tempShipsData)) {
            this.setState({shipsData: tempShipsData});
        }
    }

    parseShips(hash) {
        this.updateShips(dp1.unpackShips(hash));
    }

    componentDidMount() {
        let hash = window.location.hash.substring("#/ship-list/".length);
        if (hash.length > 0) {
            this.parseShips(hash);
            sessionStorage.ships = JSON.stringify(dp1.unpackShips(hash));
            window.location.hash = "#/ship-list";
            return;
        }

        if (typeof sessionStorage.ships !== "undefined") {
            try {
                const ships = JSON.parse(sessionStorage.ships);
                this.updateShips(ships);
            } catch (Error) {
                console.error(Error);
            }
        }
    }

    render() {
        const ShipsByClassBlocks = this.order.map((s) => {
            const shipGroup = this.state.shipsData[this.stype.indexOf(s)];
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
