import {BASE_URL,API_VERSION} from './config';

export async function getBotiquinesApi(userId){
const url = `${BASE_URL}/${API_VERSION}/get-botiquines/${userId}`;
return await fetch(url).then(response => {
    return response.json();
}).then(result => {
    return result;
}).catch(err => {
    return err;
})
}

export async function addBotiquinesApi(userId,botiquinData) {
    const url = `${BASE_URL}/${API_VERSION}/add-botiquin/${userId}`;
    const params = {
    method:'POST',
    body:JSON.stringify(botiquinData),
    headers:{
        "Content-Type":"application/json"
    }
    }

    return await fetch(url,params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    }) 
}

export async function updateBotiquinesApi(botiquinId,botiquinData) {
    const url = `${BASE_URL}/${API_VERSION}/update-botiquin/${botiquinId}`;
    const params = {
    method:'PUT',
    body:JSON.stringify(botiquinData),
    headers:{
        "Content-Type":"application/json"
    }
    }

    return await fetch(url,params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    }) 
}

export async function removeBotiquinApi(botiquinId){
    const url = `${BASE_URL}/${API_VERSION}/remove-botiquin/${botiquinId}`;
    const params = {
        method:'DELETE',
        headers:{
            "Content-Type":"application/json"
        }
    }

    return await fetch(url,params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    });
}