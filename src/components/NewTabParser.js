import React, {Component} from 'react';

class NewTabParser extends Component {
    constructor(props) {
        super(props);
        this.listener = this.listenToMessages.bind(this);
        this.messageChannels = null;
    }

    listenToMessages(message) {
        try {
            if (typeof(message.data.kc3assets) !== "undefined") {
                localStorage.setItem("kc3assets", message.data.kc3assets);
            }
            if (message.data.type==="KC3_SHIPS")
                this.props.messageHandler(message.data.ships);
        } catch (e) {
            return console.error(e);
        }
    }

    componentDidMount() {
        if(this.messageChannels === null){
            this.messageChannels = new MessageChannel();
            this.messageChannels.port1.onmessage = this.listener;
        }
        window.opener.parent.postMessage("EXPORTER_STATE_READY", "*", [this.messageChannels.port2]);
    }

    componentWillUnmount() {
        window.removeEventListener("message", this.listener);
    }

    render() {
        return (<div>waiting for tab message to come...</div>);
    }
}

export default NewTabParser;