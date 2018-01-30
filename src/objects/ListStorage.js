import shipParser from "./ShipParser";
import {EventEmitter} from "events";


class ListStorage extends EventEmitter{
    constructor(params) {
        super(params);
        this.number = 0;
        this.shortLinks={};
        try {
            if (typeof localStorage.listStorage !== "undefined")
                Object.assign(this, JSON.parse(localStorage.listStorage) || {});
        } catch (e) {
            console.error(e);
        }
    }

    saveShipsData(shipsData) {
        this.saveSDInLS(shipsData);
        this.saveSDInSS(shipsData);
    }

    saveSDInSS(shipList) {
        try {
            sessionStorage.setItem("ships", shipParser.packShipList(shipList));
        } catch (e) {
            //safari is stupid enough to show that storage available and throw errors on save
        }
    }

    saveSDInLS(shipList) {
        try {
            localStorage.setItem("lastList", shipParser.packShipList(shipList));
        } catch (e) {
            //safari is stupid enough to show that storage available and throw errors on save
        }
    }

    getLastShips() {
        if (typeof sessionStorage.ships !== "undefined") {
            try {
                return shipParser.unpackShipList(sessionStorage.ships);
            } catch (Error) {
                console.error(Error);
            }
        }

        if (typeof localStorage.lastList !== "undefined") {
            try {
                return shipParser.unpackShipList(localStorage.lastList);
            } catch (Error) {
                console.error(Error);
            }
        }
        return null;
    }

    saveMe() {
        try {
            let tempObject = Object.assign({},this);
            delete tempObject._events;
            localStorage.setItem("listStorage", JSON.stringify(tempObject));
        } catch (e) {
            //safari is stupid enough to show that storage available and throw errors on save
        }
    }

    checkSavedShips(packed) {
        try {
            for (let i = 0; i <= this.number; i++) {
                if (localStorage.getItem("shipList" + i) === packed) {
                    return `shipList${i}`;
                }
            }
        } catch (e) {
        }
        return false;
    }

    saveLS(shipList) {
        if (shipList.length === 0){
            return false;
        }
        try {
            const packed = shipParser.packShipList(shipList);
            let check = this.checkSavedShips(packed);
            if (check === false) {
                localStorage.setItem("shipList" + ++this.number, packed);
                this.saveMe();
                return `shipList${this.number}`;
            }
            return check;
        } catch (e) {
            return false;
        }
    }

    triggerSave(){
        this.emit("saveEvent");
    }

    getSavedShipLists(){
        const savedShipLists=[];
        for(let i =0;i<=this.number;i++){
            if(localStorage.getItem(`shipList${i}`)!==null){
                const element = {key:`shipList${i}`,list:localStorage.getItem(`shipList${i}`)};
                if (typeof this.shortLinks[element.key] !== "undefined")
                    element.shortlink = this.shortLinks[element.key];
                savedShipLists.push(element);
            }
        }
        return savedShipLists;
    }

    saveShortLink(key,listId){
        this.shortLinks[key] = listId;
        this.saveMe();
    }
}

const listStorage = new ListStorage();

export default listStorage;