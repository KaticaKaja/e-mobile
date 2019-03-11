$(document).ready(function(){
    getFromLocalStorage();
});

function getFromLocalStorage(){
    const phoneItems = {...localStorage};
    const phoneKeys = Object.keys(phoneItems);
    if(phoneKeys==0){
        console.log("nema");
    }
    else{
        let currentPhone;
        phoneKeys.forEach(key=>{
            currentPhone=JSON.parse(phoneItems[key]);
        })
    }

    let html="";
    currentPhone.forEach(prop=>{
        
    })
}