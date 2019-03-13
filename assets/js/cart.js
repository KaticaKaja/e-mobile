$(document).ready(function(){
    getFromLocalStorage();
    
});

function getFromLocalStorage(){
    const phoneItems = {...localStorage};
    const phoneKeys = Object.keys(phoneItems);
    let allPhonesInLS = [];
    if(phoneKeys.length !==0){

        phoneKeys.forEach(key=>{
            allPhonesInLS.push(JSON.parse(phoneItems[key]));
        });
    }
    if(allPhonesInLS.length){
        let html="";
        allPhonesInLS.forEach(phone=>{
            html+=
            `
            <tr>
                <th scope="row" class="text-center align-middle">${phone.id}</th>
                <td class="text-center"><img src="${phone.img}" alt="${phone.name}"/></td>
                <td class="text-center align-middle">${phone.name}</td>`;
                if(phone.price.sale){
                    html+=`<td class="text-center align-middle">${phone.price.new}</td>`;
                }
                else{
                    html+=`<td class="text-center align-middle">${phone.price.old}</td>`;    
                }
                html+=`
                <td class="text-center align-middle"><span id="${phone.id}" class="fas fa-trash-alt trash"></span></td>
            </tr>
            `;
         })

        document.getElementById("fromLocalStorage").innerHTML = html;
        document.querySelectorAll(".trash").forEach(tr=>{
            tr.addEventListener("click",function(e){
                deletePhone(e);
                getFromLocalStorage();
            });
        });
    }
    else{
        document.getElementById("fromLocalStorage").innerHTML = `
            <tr><td colspan="5">No products in the cart.</td></tr>
        `;
    }
    
    function deletePhone(e){
        allPhonesInLS.forEach(phone=>{
            if(phone.id==e.target.id){
                localStorage.removeItem(phone.id);
            }
        })
        
    }
}

