$(document).ready(function(){
    ajaxNav();
});

function ajaxNav(){
    $.ajax({
        url: "data/nav.json",
        method: 'GET',
        dataType: 'json',
        success: function(links){
            renderNav(links);
            
        },
        error: function(err) {
        console.error(err);
        }
    });
}
 // SHOW NAV
function renderNav(links){
    let html = "";
    let currentLocation = window.location.pathname.split('/')[window.location.pathname.split('/').length-1];
    links.forEach(link=>{
        if(currentLocation == "" && link.href=="index.html"){
            html+=`
                <li class="nav-item active">
                    <a class="nav-link" href="${link.href}">${link.content}</a>
                </li>`;
        }
        else if(currentLocation == "" && link.href!="index.html"){
            html+=`
                <li class="nav-item">
                    <a class="nav-link" href="${link.href}">${link.content}</a>
                </li>`;
        }
        if(currentLocation==link.href && currentLocation!=""){
            html+=`
                <li class="nav-item active">
                    <a class="nav-link" href="${link.href}">${link.content}</a>
                </li>`;
        }
        else if(currentLocation!=""){
            html+=`
                <li class="nav-item">
                    <a class="nav-link" href="${link.href}">${link.content}</a>
                </li>`;
        }
        
        document.getElementById("nav").innerHTML = html;
    })
}