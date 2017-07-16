import React, {Component} from 'react';
const remote = require('electron').remote;
const {ipcRenderer} = require('electron');

class UserDetail extends Component {

    renderData(){
        var value = remote.getGlobal('listData');
        var listData = value.list;

        return listData.map((list) => {
            return(
                <li key={list.id}>{list.value}</li>
            );
        });
    }

    refreshWindow(){
        ipcRenderer.on('refresh-render',(event, arg) => {
            console.log("need to refresh renderer now");
            this.forceUpdate();
        });
    }

    render() {
        return(
            <div>
                <ul>
                    {this.renderData()}

                </ul>
                {this.refreshWindow()}
            </div>
        );
    }
}

export default UserDetail;

