import React, {Component} from 'react';
const remote = require('electron').remote;
const {ipcRenderer} = require('electron');

class AddEntry extends Component {

    addNewEntry(){
        /*
         sharedData.addEntry({
         id: 3,
         age: 35,
         });



         console.log("clicking the button");
         console.log("data now:");
         console.log(sharedData.data);
         */
        var value = remote.getGlobal('listData');
        console.log("clicking");
        console.log(value);

        var itemList = value.list;
        itemList.push({id:123,value:123});


        remote.getGlobal('listData').list = itemList;

        ipcRenderer.send('data-update');
    }

    render() {
        return(
            <button className="btn btn-primary" onClick={this.addNewEntry}>Click me</button>
        );
    }
}

export default AddEntry;

