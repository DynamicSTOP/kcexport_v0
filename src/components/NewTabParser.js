import React, {Component} from 'react';

class NewTabParser extends Component {
    constructor(props) {
        super(props);
        this.listener = this.listenToMessages.bind(this);
    }

    listenToMessages(message) {
        try {
            if (typeof this.props.match === "undefined"
                || (this.props.match.params.secret.length > 0
                    && parseInt(message.data.secret) !== parseInt(this.props.match.params.secret))
            ) return;
            if (typeof(message.data.kc3assets) !== "undefined") {
                localStorage.setItem("kc3assets", message.data.kc3assets);
            }
            this.props.messageHandler(message.data.ships);
        } catch (e) {
            console.error(e);
            return;
        }
    }

    componentDidMount() {
        window.addEventListener("message", this.listener);
        window.opener.parent.postMessage("EXPORTER_STATE_READY", "*");
    }

    componentWillUnmount() {
        window.removeEventListener("message", this.listener);
    }


    render() {
        return (<div>waiting for tab message to come...</div>);
    }
}

export default NewTabParser;