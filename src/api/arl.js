import {ARL_URL} from './config';

export async function getLawApi(category){
const url=`${ARL_URL}cat=${category}`;

return await fetch(url).then(response => {
    return response.json();
}).then(result => {
    return result;
}).catch(err => {
    return err;
})
}