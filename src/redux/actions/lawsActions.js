import {lawsActionsTypes} from '../constants/lawsActionsTypes';
import {getLawApi} from '../../api/arl';

export const startGettingLaws = () =>{
    return{
        type : lawsActionsTypes.START_GET_LAWS,
        error : false
    }
}
export const getLaws = (laws) => {
    return {
        type: lawsActionsTypes.GET_LAWS_SUCCESSFULLY,
        payload : laws
    }
}

export const errorGettingLaws = (error) => {
    return{
        type:lawsActionsTypes.ERROR_GETTING_LAWS,
        payload : error,
        error: true
    }
}

export const setCategory = (category) => {
    return{
        type:lawsActionsTypes.SET_CATEGORY,
        payload : category
    }
}

export const fetchLaws = (category) => 
    async (dispatch) => {
        dispatch(startGettingLaws());
        try {
            const laws = await getLawApi(category);
            dispatch(getLaws(laws));
        } catch (error) {
            dispatch(errorGettingLaws());
        }
        
    }