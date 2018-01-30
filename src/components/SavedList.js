import React, {Component} from 'react';
import listStorage from "./../objects/ListStorage";
import "./../sass/savedLists.css";


class SavedList extends Component {
    constructor(props) {
        super(props);
        this.state = {savedShipLists: []};
    }

    componentDidMount() {
        this.setState({savedShipLists: listStorage.getSavedShipLists()});
    }

    componentWillUnmount() {

    }

    shareLink(key, data, proxy) {
        let button = proxy.target;
        if(button.disabled) return;
        button.disabled = true;
        fetch('https://api.kc-db.info/v1/list/ships', {
            method: 'put',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: data
            })
        })
        .then((data) => data.json())
        .then((json) => {
            if(json.error){
                return alert(json.error +`\n${json.description}`);
            }
            if(json.listId){
                listStorage.saveShortLink(key,json.listId);
                let a = document.createElement("A");
                a.href=`/#/ship-list-short/${json.listId}`;
                a.textContent="Short Link";
                button.parentElement.replaceChild(a,button);
            }
        })
        .catch((e) => {
            console.error("error", e);
            alert("Some error happened while performing request!");
        });
    }

    render() {
        return (
            <div className={`container`}>
                <table className={`table savedLists`}>
                    <tbody>
                    {
                        this.state.savedShipLists.map((l, k) =>
                            <tr key={`saved_sl_${k + 1}`}>
                                <td className={"number"}>{k + 1}</td>
                                <td className={"fullLink"}>
                                    <a href={`/#/ship-list/${l.list}`}>Full Link</a>
                                </td>
                                <td className={"shortlink"}>
                                {typeof l.shortlink!=="undefined"?
                                    <a href={`/#/ship-list-short/${l.shortlink}`}>Short Link</a>
                                    :
                                    <button onClick={this.shareLink.bind(this, l.key, l.list)} type="button"
                                    className={"btn btn-info"}>Shortify</button>
                                }
                                </td>


                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SavedList;