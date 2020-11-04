import {BASE_URL, API_VERSION} from './config';

export function addUserApi(userData){
const url = `${BASE_URL}/${API_VERSION}/sign-up`;
const params ={
    method:'POST',
    body:JSON.stringify(userData),
    headers:{
        "Content-Type":"application/json"
    }
}

return fetch(url,params).then(response => {
    return response.json();
}).then(result => {
    return result;
}).catch(err => {
    return err
})
}

export function signInApi(userData){
    const url = `${BASE_URL}/${API_VERSION}/sign-in`;
    const params ={
        method:'POST',
        body:JSON.stringify(userData),
        headers:{
            "Content-Type":"application/json"
        }
    }
    
    return fetch(url,params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err
    })
    }

