import React, {Component} from 'react';
import ShipListElement from "./ShipListElement";
import ShipListElementTitle from "./ShipListElementTitle";

class ShipListBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {ships: props.ships, name: props.name, hidden: false};
    }

    collapseCategory() {
        this.setState({hidden: !this.state.hidden});
    }

    componentWillReceiveProps(newProps) {
        this.setState({name: newProps.name, ships: newProps.ships});
    }

    render() {
        let blocks = [<ShipListElementTitle key={`shiplist_${this.state.name}_title`}
                                            shipClassName={this.state.name}
                                            collapseHandler={this.collapseCategory.bind(this)}
                                            collapsed={this.state.hidden}
                                            shipCount={this.state.ships.length}/>];
        this.state.ships.map((ship) => blocks.push(<ShipListElement key={`ship_${ship.id}`} ship={ship}
                                                                    hidden={this.state.hidden}/>));

        return ([blocks]);
    }
}

export default ShipListBlock;
