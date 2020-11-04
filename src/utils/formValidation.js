
export function minLengthValidation(minLength, inputData){
const {value} = inputData;
removeClassErrorSuccess(inputData);
if(value.length >= minLength){
    inputData.classList.add("success");
    return true;
}else{
    inputData.classList.add("error");
    return false;
}
}

export function emailValidation(inputData){
    // eslint-disable-next-line no-useless-escape
    const validEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const {value} = inputData;
    removeClassErrorSuccess(inputData)
    const validationResult = validEmail.test(value);
    if(validationResult){
        inputData.classList.add("success");
        return true;
    }else{
        inputData.classList.add("error")
        return false;
    } 

    
}

function removeClassErrorSuccess(inputData){
inputData.classList.remove("success");
inputData.classList.remove("error");
}