import {BASE_URL,API_VERSION} from './config';

export async function getKitsDerrameApi(userId){
const url = `${BASE_URL}/${API_VERSION}/get-kitsDerrame/${userId}`;

return fetch(url).then(response => {
    return response.json();
}).then(result => {
    return result;
}).catch(err => {
    return err;
})
}

export async function addKitDerrameApi(userId,kitData){
const url = `${BASE_URL}/${API_VERSION}/add-kitDerrame/${userId}`;
const params = {
    method:'POST',
    body:JSON.stringify(kitData),
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

export async function updateKitDerrameApi(kitId,kitData){
    const url = `${BASE_URL}/${API_VERSION}/update-kitDerrame/${kitId}`;
    const params = {
        method:'PUT',
        body:JSON.stringify(kitData),
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

export function removeKitDerrameApi(kitDerrameId){
    const url = `${BASE_URL}/${API_VERSION}/remove-kitDerrame/${kitDerrameId}`;
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