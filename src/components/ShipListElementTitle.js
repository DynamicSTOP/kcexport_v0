import React, {Component} from 'react';
import "../sass/ships.css";
import "../sass/ship_sprites.css";

class ShipListElementTitle extends Component {
    render() {
        return (
            <li className="kce-ship-element kce-title-bar">
                <div className="kce-title-name">{this.props.shipClassName}</div>
                <div className="kce-ship-count">{this.props.shipCount}</div>
                <div className={`kce-right-icon kce-toggle-visible glyphicon `+(this.props.collapsed?"glyphicon-chevron-up":"glyphicon-chevron-down")}
                    onClick={()=>this.props.collapseHandler(this.props.shipClassName)}
                ></div>
            </li>
        );
    }
}

export default ShipListElementTitle;


