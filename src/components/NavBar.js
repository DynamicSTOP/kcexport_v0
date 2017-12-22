import React, {Component} from 'react';
import './../sass/navbar.css';
import listStorage from './../objects/ListStorage';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {dropDown: false, dropDownLinks: false};
    }

    toggle(params) {
        if (params.both)
            this.setState({dropDown: !this.state.dropDown, dropDownLinks: !this.state.dropDown});
        else if (params.links)
            this.setState({dropDownLinks: !this.state.dropDownLinks, dropDown: false});
        else
            this.setState({dropDown: !this.state.dropDown, dropDownLinks: false});
    }

    closeDropDowns() {
        this.setState({dropDown: false, dropDownLinks: false});
    }

    callSave(){
        listStorage.triggerSave();
    }

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                onClick={this.toggle.bind(this, {both: true})}
                                data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/#/">KC Exporter (alpha 0.4)</a>
                    </div>
                    <div className={`collapse navbar-collapse ${this.state.dropDown ? "in" : ""}`}
                         id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right navbar-shown">
                            <li><a href="/#/">Home</a></li>
                            <li><a onClick={this.callSave.bind(this)}>Save</a></li>

                            <li className={`dropdown ${this.state.dropDown ? "open" : ""}`}>
                                <a onClick={this.toggle.bind(this, {})}
                                   className="dropdown-toggle"
                                   data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Lists
                                    <span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><a href="/#/ship-list/last" onClick={this.closeDropDowns.bind(this)}>Last ship
                                        list</a></li>
                                    <li><a href="/#/saved">Saved lists</a></li>
                                </ul>
                            </li>

                            <li className={`dropdown ${this.state.dropDownLinks ? "open" : ""}`}>
                                <a onClick={this.toggle.bind(this, {links: true})}
                                   className="dropdown-toggle"
                                   data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Share
                                    <span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><a href="/#/">Make ShortLink</a></li>
                                    <li role="separator" className="divider"></li>
                                    <li><a href="/#/">Full Link</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavBar;
