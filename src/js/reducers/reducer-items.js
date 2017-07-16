import {constants} from '../constants';
const remote = require('electron').remote;

export default function (state = null, action) {
    var sharedData = remote.getGlobal('sharedData');
    state = sharedData.itemList;

    switch(action.type) {
        case constants.action.SELECT_ALL_FILTER:
            return state;
            break;
        case constants.action.SELECT_ACTIVE_FILTER:
            return state.filter((item) => {
                return !item.isCompleted;
            });
            break;
        case constants.action.SELECT_COMPLETED_FILTER:
            return state.filter((item) => {
                return item.isCompleted;
            });

    }

    return state;
}
