import React, {Component} from 'react';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {dropDown: false};
    }

    toggle() {
        this.setState({dropDown: !this.state.dropDown});
    }

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                onClick={this.toggle.bind(this)}
                                data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">KC Exporter (pre alpha build 1.0.1)</a>
                    </div>
                    <div className={`collapse navbar-collapse ${this.state.dropDown ? "in" : ""}`} id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right navbar-shown">
                            <li className="active"><a href="#">Home <span className="sr-only">(current)</span></a></li>
                            <li className={`dropdown ${this.state.dropDown ? "open" : ""}`}>
                                <a href="#" onClick={this.toggle.bind(this)}
                                   className="dropdown-toggle"
                                   data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown
                                    <span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><a href="#">Action</a></li>
                                    <li><a href="#">Another action</a></li>
                                    <li><a href="#">Something else here</a></li>
                                    <li role="separator" className="divider"></li>
                                    <li><a href="#">Separated link</a></li>
                                    <li role="separator" className="divider"></li>
                                    <li><a href="#">One more separated link</a></li>
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
