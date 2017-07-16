import {constants} from '../constants';

export const filterItemList = (filterType) => {
    var actionType = constants.action.SELECT_ALL_FILTER;
    switch(filterType){
        case 'Active':
            actionType = constants.action.SELECT_ACTIVE_FILTER;
            break;
        case 'Completed':
            actionType = constants.action.SELECT_COMPLETED_FILTER;
            break;
    }

    return {
        type: actionType,
    };
};