import {BASE_URL,API_VERSION} from './config';

export function getAccidentsApi(userId){
const url = `${BASE_URL}/${API_VERSION}/get-accidents/${userId}`;
return fetch(url).then(response => {
    return response.json();
}).then(result => {
    return result;
}).catch(err => {
    return err;
})
}