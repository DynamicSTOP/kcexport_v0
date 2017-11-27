import React, {Component} from 'react';
import './sass/ship_sprites.css';
import NavBar from './components/NavBar';
import ContentContainer from "./components/ContentContainer";

class App extends Component {
    constructor(){
        super();
    }

    render() {
        return ([
                <NavBar key={"nav"}/>,
                <ContentContainer key={"content"}/>
            ]
        );
    }
}

export default App;
