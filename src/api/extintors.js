import {BASE_URL,API_VERSION} from './config';

export function getExtintorsApi(userId){
const url = `${BASE_URL}/${API_VERSION}/get-extintors/${userId}`;

return fetch(url).then(response => {
    return response.json();
}).then(result => {
    return result;
}).catch(err => {
    return err;
})
}

export function addExtintorApi(userId,extintorData){
    const url = `${BASE_URL}/${API_VERSION}/add-extintor/${userId}`;
    const params = {
        method:'POST',
        body:JSON.stringify(extintorData),
        headers:{
            "Content-Type":"application/json"
        }
    }

    return fetch(url,params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    })
}

export function updateExtintorApi(extintorId,extintorData){
    const url = `${BASE_URL}/${API_VERSION}/update-extintor/${extintorId}`;
    const params = {
        method:'PUT',
        body:JSON.stringify(extintorData),
        headers:{
            "Content-Type":"application/json"
        }
    }

    return fetch(url,params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    })
}

export function removeExtintorApi(accidentId){
    const url = `${BASE_URL}/${API_VERSION}/remove-extintor/${accidentId}`;
    const params = {
        method:'DELETE',
        headers:{
            "Content-Type":"application/json"
        }
    }

    return fetch(url,params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    })
}