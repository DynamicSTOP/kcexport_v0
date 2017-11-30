import React, {Component} from 'react';
import "../sass/ships.css";
import "../sass/ship_sprites.css";
import "../sass/ship_locks.css";

class ShipListElement extends Component {
    constructor(props) {
        super(props);
        this.state = {hidden: props.hidden};
    }

    componentWillReceiveProps(newProps) {
        this.setState({hidden: newProps.hidden});
    }


    render() {
        //console.log(localStorage.getItem("kc3ExtensionPath"));
        const modBoxes = [];
        ["tp", "ar", "fp", "aa", "lk", "hp", "as"].map((modParam, i) => {
            let maxed = "";
            if (i < 4) {
                if (this.props.ship[modParam][0] >= this.props.ship[modParam][1]) maxed = " max";
            } else if (i === 4) {
                if (this.props.ship[modParam][0] >= 50) maxed = " max";
                else if (this.props.ship[modParam][0] >= 40) maxed = " half";
            } else {
                if (this.props.ship[modParam][3] > 0) maxed = " max";
            }
            const params = {
                className: "kce-ship-" + modParam + (maxed),
                key: this.props.ship.id + modParam,
                title: `${modParam.toUpperCase()} ${this.props.ship[modParam][0]}/${this.props.ship[modParam][1]}`
            };
            return modBoxes.push(React.createElement("div", params));
        });
        const shipFullName = this.props.ship.name + (this.props.ship.suffix !== null ? ` ${this.props.ship.suffix}` : ``);
        const shipLockName = ["", "lockFall2017GreenTag", "lockFall2017GreyTag", "lockFall2017YellowTag"][this.props.ship.sally];
        let icon;
        if (typeof localStorage.kc3assets !== "undefined") {
            icon = React.createElement("img", {
                className: `kce-ship-icon`,
                src: `${localStorage.kc3assets}/${this.props.ship.masterId}.png`
            });
        } else {
            icon = React.createElement("div", {className: `kce-ship-icon ship${this.props.ship.masterId}`});
        }
        return (
            <li className={`kce-ship-element kce-ship ${this.state.hidden ? "hidden" : ""}`}>
                {icon}
                <div className={`kce-ship-lock ${shipLockName}`}
                     title={this.props.ship.sally > 0 ? `lock ${this.props.ship.sally}` : ``}></div>
                <div className="kce-ship-text">
                    <div className="kce-ship-level">LVL <span>{this.props.ship.lvl}</span></div>
                    <div className="kce-ship-name" title={shipFullName}>{shipFullName}</div>
                </div>
                <div className="kce-ship-stats-box">
                    {modBoxes}
                </div>
                <div className="kce-right-icon kce-toggle-details glyphicon glyphicon-list-alt"></div>
            </li>
        );
    }
}

export default ShipListElement;


