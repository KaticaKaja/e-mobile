window.onload = function(){
    
    ajaxAllPhones();
    ajaxRAMSTORAGE();
    onScrollChangeBgColor();
    document.getElementById("search").addEventListener("keyup",searchPhones);

}
// SHOW ALL PHONES ---
function ajaxAllPhones(){
    $.ajax({
        url: "data/phones.json",
        method: "GET",
        dataType: "json",
        success: function(data){
            renderPhones(data);
        },
        error: function(status, error){
            console.log(status);
        } 
        
    });
}
// RENDER ALL PHONES
function renderPhones(data){
    let html = "";
    data.forEach(phone => {
    html += `<div class="col-lg-4 col-md-6 overflow-hidden mb-5">
                <img class="w-100" src="${phone.img}" alt="${phone.name}"/>
                <div class="d-flex justify-content-center mt-3 price"><p>${phone.name}</p></div>`;
            if(phone.price.sale){
                html+=`
                <div class="d-flex justify-content-around price"><p>${phone.price.new}$ </p><del>${phone.price.old}$</del></div>
                <span class="ribbon">SALE</span>`;
                
            }
            else{
                html+=`<div class="d-flex justify-content-center price"><p>${phone.price.old}$ </p></div>`;
            }
            html+=`<div class="d-flex justify-content-center mt-3">
            <button type="button" data-phone="${phone.id}" class="btn btn-primary config">View configuration</button></div></div>`; 
    });
    document.querySelector("#products").innerHTML = html;
    document.querySelectorAll(".config").forEach(button=>{
        button.addEventListener("click", ajaxPhone);
    });
    
}

// RENDER ONE PHONE
function renderPhone(phone){

    let html = "";
    html+=`
    <div class="row mt-5 mb-5 fade-in">
        <div class="col-md-6">
            <div class="main-img w-100 d-flex justify-content-center"><img id="current" src="${phone.img}" alt="${phone.name}"/></div>
            <div class="row imgs mt-3">`
            phone.imgs.forEach(img=>{
                html+=`<img class="col-4 h-50 " src="${img}" alt="${phone.name}">`;
            })
                
           html+= `</div>
        </div>
        <div class="col-md-6 mt-4 d-flex flex-column justify-content-between">
            <ul class="list-group list-group-flush phoneConfigList">
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <span class="fa fa-mobile-alt configItem"></span>${phone.disp}px
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <span class="fa fa-hdd configItem color"></span>${phone.storage} Gb
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <span class="fa fa-memory configItem"></span>${phone.RAM} Gb
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <span class="fa fa-camera configItem color"></span>
                    Selfie: ${phone.selfie}px ; Main-camera: ${phone.cameraR}px
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <span class="fa fa-microchip configItem"></span>
                    <span class="w-75 text-right">${phone.cpu}</span>
                </li>
            </ul>
            <div class="d-flex justify-content-around mt-5">
            <button type="button" class="btn btn-lg w-50 btn-primary" id="back">Go back</button>
            <button type="button" class="btn btn-lg w-50 btn-success" id="buy">Buy now</button>
            </div></div>
        </div>
    </div>`;
    
    document.getElementById("singlePhone").innerHTML = html;
    addNumByCart();
    $("#allPhones").toggleClass("d-none").toggleClass("d-block");
    $("#singlePhone").toggleClass("d-block").toggleClass("d-none");
    gallery();
    document.getElementById("back").addEventListener("click",function(){
        $("#allPhones").toggleClass("d-block").toggleClass("d-none");
        $("#singlePhone").toggleClass("d-block").toggleClass("d-none");
    });
    document.getElementById("buy").addEventListener("click",function(){

        sendInCart(phone);
        addNumByCart();
    });
    
}

// RENDER CHECKBOXES
function renderRAMSTORAGE(data){
    let html = "";
    data.forEach(category => {
        if(category.id=="ram1"){
            html+=`<div class="text-lg-left text-md-center"><h4>RAM memory</h4>`;
        }
        else if(category.id=="storage1"){
            html+=`<div class="text-lg-left text-md-center mt-lg-2"><h4>Storage memory</h4>`
        }
        html += `
        <div class="custom-control custom-checkbox border-top-primary my-3">
            <input type="checkbox" class="custom-control-input" name="${category.name}" value="${category.value}" id="${category.id}">
            <label class="custom-control-label" for="${category.id}">${category.labelContent}</label>
        </div>`;
        if(category.id=="ram4" || category.id=="storage4"){
            html+=`</div>`;
        }
    });
    document.querySelector("#categories").innerHTML = html;

    document.querySelectorAll("input[type='checkbox']").forEach(box => {
        box.addEventListener("change",()=>{
            filterRAMSTORAGE();
        });
    });
}
// SHOW - AJAX
function ajaxPhone(){
    const buttonId = this.dataset.phone;
    $.ajax({
        url: "data/phones.json",
        method: "GET",
        dataType: "json",
        success: function(data){
            const singlePhone = data.filter(phone=> phone.id == buttonId);
            renderPhone(singlePhone[0]);
        },
        error: function(status, error){
            console.log(status);
        } 
        
    });
    
}
// show checkboxes
function ajaxRAMSTORAGE(){
    $.ajax({
        url: "data/categories.json",
        method: "GET",
        dataType: "json",
        success: function(data){
            renderRAMSTORAGE(data);
            
        },
        error: function(status, error){
            console.log(status);
        } 
        
    });
}

//FUNCTIONALITY OF CHECKBOXES AND SEARCH

function filterRAMSTORAGE(){
    document.getElementById("search").value="";
    const ramCheckboxes = document.querySelectorAll("input[name='ram']");
    const storageCheckboxes = document.querySelectorAll("input[name='storage']");
    let boxes = [];
    ramCheckboxes.forEach(box=>{
        boxes.push({
            ramValue: box.value,
            checked: box.checked,
            name : box.name
        });
    });
    storageCheckboxes.forEach(box=>{
        boxes.push({
            storageValue: box.value,
            checked: box.checked,
            name : box.name
        });
    })

    $.ajax({
        url: "data/phones.json",
        method: "GET",
        dataType: "json",
        success: function(data){
            let parsedData = [];
            let res = [];
            let boxesChecked = [];
            boxes.forEach(box => {
                if(box.checked) {
                    boxesChecked.push(box);
                  data.forEach(phone => {
                        if((phone.RAM == box.ramValue) || (phone.storage ==box.storageValue)){
                            res.push(phone);
                        }
                    });
                }
            });
            let ram = [];
            let storage = [];
            let res2 = [];
            boxesChecked.forEach(box=>{
                if(box.name == 'ram'){
                    ram.push(box);
                }
                else if(box.name == 'storage'){
                    storage.push(box);
                }
            });
            if(ram.length && storage.length){
                res = [];
                ram.forEach(ra=>{
                    storage.forEach(ro=>{
                        data.forEach(phone=>{
                            if(ra.ramValue==phone.RAM && ro.storageValue==phone.storage){
                                res2.push(phone);
                            }
                        });
                    
                    });
                });
            }
            // prevent same phone from showing more than once
            let count = 0;
            let found = false;
            res.forEach(phone => {
                parsedData.forEach(unique=>{
                    if(phone.id==unique.id){
                        found = true;
                    }
                });
                count++;
                if(count==1 && found ==false){
                    parsedData.push(phone);
                }
                count = 0;
                found = false;
              });
            
            
            if(res2.length){
                parsedData = [];
                res2.forEach(el=>{
                    parsedData.push(el);
                });
            }
            
            if (boxesChecked.length) {
                renderPhones(parsedData);
                
            }
            else{
                renderPhones(data);
            }
            if(parsedData.length==0 && boxesChecked.length > 0){
                noProducts();
            }
        },
        error: function(status, error){
            console.log(status);
        }
    });
    
}

function noProducts(){
    let html = `<div class="my-auto mx-auto"><h3 class='color2'>No products.</h3></div>`;
    document.getElementById("products").innerHTML = html;
}


function searchPhones() {
    const userInput = this.value;
    document.querySelectorAll("input[type='checkbox']").forEach(check=>{
        check.checked = false;
    });
    $.ajax({
      url: 'data/phones.json',
      method: 'GET',
      dataType: 'json',
      success: function (phones) {
        let filteredPhones = phones.filter(phone => {
          if (phone.name.toLowerCase().indexOf(userInput.toLowerCase()) !== -1) {
            return true;
          }
        });
        renderPhones(filteredPhones);
      },
      error: function (err) {
        console.error(err);
      }
    });
  }

function sendInCart(phone){
    
    const inCart = JSON.stringify(phone);
    localStorage.setItem(phone.id,inCart);

}

function addNumByCart(){
    let num = 0;
    if(localStorage.length){
        num = localStorage.length;
    }

    document.querySelectorAll(".num").forEach(item=>{
        item.innerHTML = num;
    });
}

//NAVBAR BACKGROUND SCROLL CHANGE
function onScrollChangeBgColor(){
var iScrollPos = 0;

    $(window).scroll(function(){
        var iCurScrollPos = $(this).scrollTop();
        if (iCurScrollPos > 200+iScrollPos){
            $("#menu").css("background-color","#000");
        }
        else{
            $("#menu").css("background-color","transparent");
        }
    });
}
// GALLERY - ONE PHONE
function gallery(){
    const current = document.querySelector('#current');
    const imgs = document.querySelector('.imgs');
    const img = document.querySelectorAll('.imgs img');
    const opacity = 0.6;


    img[0].style.opacity = opacity;

    imgs.addEventListener('click', imgClick);

    function imgClick(e) {
        
        img.forEach(img => (img.style.opacity = 1));

        current.src = e.target.src;
        current.classList.add('fade-in');
        setTimeout(() => current.classList.remove('fade-in'), 500);
        e.target.style.opacity = opacity;
    }
}

