import React, {Component} from 'react';
import './sass/ship_sprites.css';
import NavBar from './components/NavBar';
import ContentContainer from "./components/ContentContainer";

class App extends Component {
    saveHandler() {
        if(this.contentContainer){
            this.contentContainer.triggerSave();
        }
    }

    render() {
        return ([
                <NavBar saveHandler={this.saveHandler.bind(this)} key={"nav"}/>,
                <ContentContainer key={"content"} ref={(contentContainer) => {
                    this.contentContainer = contentContainer;
                }}/>
            ]
        );
    }
}

export default App;
