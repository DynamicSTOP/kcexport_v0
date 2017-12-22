import WCTFships from './../generated/ships';
import dp1 from "../datapacker/datapacker.v1";

class ShipParser {
    constructor() {
        this.stype = ["", "DE", "DD", "CL", "CLT",
            "CA", "CAV", "CVL", "FBB", "BB", "BBV",
            "CV", "XBB", "SS", "SSV", "AP", "AV",
            "LHA", "CVB", "AR", "AS", "CT", "AO"
        ];
    }

    static makeShipsData(shipList) {
        return [].concat.apply([], shipList.map(l =>
            l.ships.map(s => [
                s.id, s.masterId, s.lvl, s.sally,
                s.tp[1] - s.tp[0],
                s.ar[1] - s.ar[0],
                s.fp[1] - s.fp[0],
                s.aa[1] - s.aa[0],
                s.lk[1] - s.lk[0],
                s.hp[2],
                s.as[2]
            ])
        )).sort((a, b) => a[0] - b[0]);
    }

    packShipList(shipList){
        return dp1.packShips(this.makeShipsData(shipList));
    }

    unpackShipList(hash){
        return this.parseShipsData(dp1.unpackShips(hash));
    }

    parseShipsData(ships = []) {
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
        return tempShipsData;
    }

    getSType(){
        return this.stype.slice();
    }
}

const shipParser = new ShipParser();

export default shipParser;