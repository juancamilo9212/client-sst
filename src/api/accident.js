import {BASE_URL,API_VERSION} from './config';

export async function getAccidentsApi(userId,filter,value){
const url = `${BASE_URL}/${API_VERSION}/get-accidents/${userId}?filter=${filter}&value=${value}`;
return await fetch(url).then(response => {
    return response.json();
}).then(result => {
    return result;
}).catch(err => {
    return err;
})
}

export async function addAccidentApi(userId,accidentData){
    const url = `${BASE_URL}/${API_VERSION}/add-accident/${userId}`;
    const params = {
        method:'POST',
        body:JSON.stringify(accidentData),
        headers:{
            "Content-Type":"application/json"
        }
    }

    return await fetch(url,params).then(response => {
        return response;
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    })
}

export  async function updateAccidentApi(accidentId,accidentData){
    const url = `${BASE_URL}/${API_VERSION}/update-accident/${accidentId}`;
    const params = {
        method:'PUT',
        body:JSON.stringify(accidentData),
        headers:{
            "Content-Type":"application/json"
        }
    }

    return await fetch(url,params).then(response => {
        return response;
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    })
}

export async function deleteAccidentApi(accidentId){
    const url = `${BASE_URL}/${API_VERSION}/remove-accident/${accidentId}`;
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
    })
}

export async function uploadEventFilesApi(eventFiles){
    const url = `${BASE_URL}/${API_VERSION}/upload-event-files`;
    
    const formData = new FormData();
    eventFiles.map(event => {
        formData.append("eventFiles",event,event.name);
    });
    const params = {
        method:"POST",
        body:formData
    }
    return await fetch(url,params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    })
}

export async function deleteEventFilesApi(eventFileName){
    const url = `${BASE_URL}/${API_VERSION}/delete-event-file/${eventFileName}`;
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
    })
}

export async function getEventFilesApi(eventFileName){
    const url = `${BASE_URL}/${API_VERSION}/get-event-file/${eventFileName}`;
    const params = {
        method:'GET',
        headers:{
            "Content-Type":"application/json"
        }
    }
    return await fetch(url,params).then(response => {
    console.log(response);
    
    return response;
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    })
}

export async function getAccidentReportApi(accidentId){
    const url = `${BASE_URL}/${API_VERSION}/accident-report/${accidentId}`;
    const params = {
        method:'GET',
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