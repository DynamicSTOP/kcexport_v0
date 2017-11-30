import React, {Component} from 'react';

class Index extends Component {
    render() {
        return (
            <div className={`container`}>

                <h1>Welcome!</h1>
                <div>
                    This site is designed for sharing KC ship lists and equip(work in progress) info.
                </div>

                <div>
                    <h3>Instructions</h3>
                    <h4>KC3</h4>
                    <div>Note: Right now the only way would be manual. Later the would be buttons in SR#showcase.</div>
                    <div>Open Strategy Room. Open devtools(F12 or Ctrl+Shift+I). CopyPaste code from <a target="_blank" href={`https://gist.github.com/DynamicSTOP/e68c68e6de4d5464aeafcdfa92dae1cd`}>here</a> into
                        console. New tab should open with your ship list.
                    </div>
                    <h4>Other</h4>
                    <div>
                        Other viewers should be able to export using url hash. See <strong>datapacker.v1.js</strong>.
                    </div>
                </div>


                <div>
                    <h3>Github links</h3>
                    <div><a href={`https://github.com/DynamicSTOP/kcexport`}>Website</a> for reporting issues</div>
                    <div><a href={`https://github.com/KC3Kai/KC3Kai`}>KC3</a></div>
                    <div><a href={`https://github.com/TeamFleet/WhoCallsTheFleet`}>WhoCallsTheFleet DB</a></div>
                </div>

            </div>

        );
    }
}

export default Index;
