import {lawsActionsTypes} from '../constants/lawsActionsTypes'

const initialState = {
    isLoading:true,
    laws : [],
    error : false,
    category:5
}

export const lawReducer = (state = initialState,{type,payload}) => {
    switch (type) {

        case lawsActionsTypes.START_GET_LAWS:
            return {
                ...state,
                isLoading:true,
                error:null,
                laws:[]
            };
        case lawsActionsTypes.GET_LAWS_SUCCESSFULLY:
            return {
                ...state,
                isLoading:false,
                laws:payload
            };
        case lawsActionsTypes.ERROR_GETTING_LAWS:
            return {
                ...state,
                isLoading:false,
                error:payload
            };
        case lawsActionsTypes.SET_CATEGORY:
            return {
                ...state,
                category:payload
                };
        default:
        return state;
    }
}