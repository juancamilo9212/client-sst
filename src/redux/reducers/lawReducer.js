import {lawsActionsTypes} from '../constants/lawsActionsTypes'

const initialState = {
    laws : []
}

export const lawReducer = (state = initialState,{type,payload}) => {
    switch (type) {
        case lawsActionsTypes.GET_LAWS:
            return {
                ...state,
                laws:payload
            };
        default:
        return state;
    }
}