window.onload = function(){
    
    
    ajaxAllPhones();

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
    html += `<div class="col-lg-4 text-center overflow-hidden" id="product">
                <div><img class="m-3" src="${phone.img}" alt="${phone.name}"/></div>`;
            if(phone.price.sale){
                html+=`
                <p>SALE : ${phone.price.new}$ </p><del>${phone.price.old}$</del><p>
                <span class="ribbon">SALE</span>`;
                
            }
            else{
                html+=`<p>PRICE : ${phone.price.old}$ </p>`;
            }
            html+=`</div>`; 
    });
    document.querySelector("#products").innerHTML = html;
    
    
}

document.querySelectorAll("input[name='ram']").forEach(box => {
    box.addEventListener("change",()=>{
        filterRAM();
    });
});
document.querySelectorAll("input[name='storage']").forEach(box => {
    box.addEventListener("change",()=>{
        filterRAM();
    });
});


function filterRAM(){
    const ramCheckboxes = document.querySelectorAll("input[type='checkbox']");
    let ramsFiltered = [];
    ramCheckboxes.forEach(box=>{
        ramsFiltered.push({
            ramValue: box.value,
            checked: box.checked
        })
    });
    ramCheckboxes.forEach(box=>{
        const ramFiltered = ramsFiltered.filter(ramFiltered => box.value === ramFiltered.ramValue);
        ramFiltered.checked = !ramFiltered.checked;
    });
    $.ajax({
        url: "data/phones.json",
        method: "GET",
        dataType: "json",
        success: function(data){
            let parsedData = [];
            ramsFiltered.forEach(ramFiltered => {
                
                if (ramFiltered.checked) {
                  let res = [];
                  data.filter(phone => {
                        if((phone.RAM == ramFiltered.ramValue)||(phone.ROM == ramFiltered.ramValue)){
                           
                            res.push(phone);
                            
                            
                        }
                    });
                // const unique = [...new Set(res.map(phone => phone.id))];
                  res.forEach(phone => {
        
                    parsedData.push(phone);   
                  });
                  
                }
            });
            let checkedBoxes = ramsFiltered.filter(ramFiltered => ramFiltered.checked)
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

//NAVBAR BACKGROUND SCROLL CHANGE
var iScrollPos = 0;

    $(window).scroll(function(){
        var iCurScrollPos = $(this).scrollTop();
        if (iCurScrollPos > 400+iScrollPos){
            $("#menu").css("background-color","#ADB6B5");
        }
        else{
            $("#menu").css("background-color","transparent");
        }
    })
}