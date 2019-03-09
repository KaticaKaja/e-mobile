window.onload = function(){
    
    ajaxAllPhones();
    ajaxRAMROM();
    
// SHOW ALL PHONES
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
    html += `<div class="col-lg-4 col-md-6 text-center overflow-hidden mt-2">
                <img class="w-100" src="${phone.img}" alt="${phone.name}"/>`;
            if(phone.price.sale){
                html+=`
                <div class="d-flex justify-content-around mt-3"><p>SALE : ${phone.price.new}$ </p><del>${phone.price.old}$</del></div>
                <p><span class="ribbon">SALE</span>`;
                
            }
            else{
                html+=`<div class="d-flex justify-content-center mt-3"><p>PRICE : ${phone.price.old}$ </p></div>`;
            }
            html+=`<div class="d-flex justify-content-between mt-3"><button type="button" class="btn btn-success">Buy now</button>
            <button type="button" data-phone="${phone.id}" class="btn btn-outline-primary config">Configuration</button></div></div>`; 
    });
    document.querySelector("#products").innerHTML = html;
    document.querySelectorAll(".config").forEach(button=>{
        button.addEventListener("click", ajaxPhone);
    });
    
}
function renderPhone(phone){

    let html = "";
    html+=`
    <div class="row mt-5 mb-5">
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
                <li class="list-group-item d-flex justify-content-between align-items-center"><span class="fa fa-mobile-alt configItem"></span>${phone.disp}px</li>
                <li class="list-group-item d-flex justify-content-between align-items-center"><span class="fa fa-hdd configItem color"></span>${phone.ROM} Gb</li>
                <li class="list-group-item d-flex justify-content-between align-items-center"><span class="fa fa-memory configItem"></span>${phone.RAM} Gb</li>
                <li class="list-group-item d-flex justify-content-between align-items-center"><span class="fa fa-camera configItem color"></span>Selfie: ${phone.selfie}px ; Main-camera: ${phone.cameraR}px</li>
                <li class="list-group-item d-flex justify-content-between align-items-center"><span class="fa fa-microchip configItem"></span><span class="w-75 text-right">${phone.cpu}</span></li>
            </ul>
            <div class="d-flex justify-content-around mt-5">
            <button type="button" class="btn btn-lg w-50 btn-outline-primary" id="back">Go back</button>
            <button type="button" class="btn btn-lg w-50 btn-success">Buy now</button>
            </div></div>
        </div>
    </div>`;
    
    document.getElementById("singlePhone").innerHTML = html;
    $("#allPhones").toggleClass("d-none").toggleClass("d-block");
    $("#singlePhone").toggleClass("d-block").toggleClass("d-none");
    gallery();
    document.getElementById("back").addEventListener("click",function(){
        $("#allPhones").toggleClass("d-block").toggleClass("d-none");
        $("#singlePhone").toggleClass("d-block").toggleClass("d-none");
    });
    
}


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

function ajaxRAMROM(){
    $.ajax({
        url: "data/categories.json",
        method: "GET",
        dataType: "json",
        success: function(data){
            renderRAMROM(data);
            
        },
        error: function(status, error){
            console.log(status);
        } 
        
    });
}
function renderRAMROM(data){
    let html = "";
    data.forEach(category => {
        if(category.name=="ram" && category.id=="ram1"){
            html+=`<h4>RAM memory</h4>`;
        }
        else if(category.name=="storage" && category.id=="storage1"){
            html+=`<h4>Storage</h4>`
        }
        html += `
        <div class="custom-control custom-checkbox border-top-primary pt-2">
            <input type="checkbox" class="custom-control-input" name="${category.name}" value="${category.value}" id="${category.id}">
            <label class="custom-control-label" for="${category.id}">${category.labelContent}</label>
        </div>`;
    });
    document.querySelector("#categories").innerHTML = html;

    document.querySelectorAll("input[type='checkbox']").forEach(box => {
        box.addEventListener("change",()=>{
            filterRAMROM();
        });
    });
}



function filterRAMROM(){
    document.getElementById("search").value="";
    const ramCheckboxes = document.querySelectorAll("input[name='ram']");
    const storageCheckboxes = document.querySelectorAll("input[name='storage']");
    let ramsFiltered = [];
    ramCheckboxes.forEach(box=>{
        ramsFiltered.push({
            ramValue: box.value,
            checked: box.checked,
            name : box.name
        })
    });
    storageCheckboxes.forEach(box=>{
        ramsFiltered.push({
            storageValue: box.value,
            checked: box.checked,
            name : box.name
        })
    })

    $.ajax({
        url: "data/phones.json",
        method: "GET",
        dataType: "json",
        success: function(data){
            let parsedData = [];
            let res = [];
            ramsFiltered.forEach(ramFiltered => {
                if (ramFiltered.checked) {
                  data.filter(phone => {
                        if((phone.RAM == ramFiltered.ramValue) || (phone.ROM ==ramFiltered.storageValue)){
                            res.push(phone);
                        }
                    });
                }
            });
            let count = 0;
            let found = false;
            res.forEach(phone => {
                parsedData.forEach(unique=>{
                    if(phone.id==unique.id){
                        found = true;
                    }
                })
                count++;
                if(count==1 && found ==false){
                    parsedData.push(phone);
                }
                count = 0;
                found = false;
              });
        
            let checkedBoxes = ramsFiltered.filter(ramFiltered => ramFiltered.checked)
            //console.log(checkedBoxes);
            if (checkedBoxes.length) {
                renderPhones(parsedData);
                
            }
            else{
                renderPhones(data);
            }
        },
        error: function(status, error){
            console.log(status);
        }
    });
    
}


document.getElementById("search").addEventListener("keyup",searchPhones);
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
//NAVBAR BACKGROUND SCROLL CHANGE
var iScrollPos = 0;

    $(window).scroll(function(){
        var iCurScrollPos = $(this).scrollTop();
        if (iCurScrollPos > 200+iScrollPos){
            $("#menu").css("background-color","#000");
        }
        else{
            $("#menu").css("background-color","transparent");
        }
    })
    function gallery(){
        const current = document.querySelector('#current');
        const imgs = document.querySelector('.imgs');
        const img = document.querySelectorAll('.imgs img');
        const opacity = 0.6;

        // Set first img opacity
        img[0].style.opacity = opacity;

        imgs.addEventListener('click', imgClick);

        function imgClick(e) {
            // Reset the opacity
            img.forEach(img => (img.style.opacity = 1));

            // Change current image to src of clicked image
            current.src = e.target.src;
            
            // Add fade in class
            current.classList.add('fade-in');

            // Remove fade-in class after .5 seconds
            setTimeout(() => current.classList.remove('fade-in'), 500);

            // Change the opacity to opacity var
            e.target.style.opacity = opacity;
        }
    }
}