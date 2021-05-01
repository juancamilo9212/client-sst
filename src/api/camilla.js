import {BASE_URL,API_VERSION} from './config';

export async function getCamillasApi(userId){
const url = `${BASE_URL}/${API_VERSION}/get-camillas/${userId}`;
return await fetch(url).then(response => {
    return response.json();
}).then(result => {
    return result;
}).catch(err => {
    return err;
})
}

export async function addCamillaApi(userId,camillaData) {
const url = `${BASE_URL}/${API_VERSION}/add-camilla/${userId}`;
const params = {
method:'POST',
body:JSON.stringify(camillaData),
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

export async function updateCamillaApi(camillaId,camillaData) {
    const url = `${BASE_URL}/${API_VERSION}/update-camilla/${camillaId}`;
    const params = {
    method:'PUT',
    body:JSON.stringify(camillaData),
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

export async function removeCamillaApi(camillaId){
    const url = `${BASE_URL}/${API_VERSION}/remove-camilla/${camillaId}`;
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