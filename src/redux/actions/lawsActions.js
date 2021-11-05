import {lawsActionsTypes} from '../constants/lawsActionsTypes';

export const getLaws = (laws) => {
    return {
        type: lawsActionsTypes.GET_LAWS,
        payload : laws
    }
}