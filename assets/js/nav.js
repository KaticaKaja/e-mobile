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

function renderNav(links){
    let html = "";
    let location = window.location.pathname.split('/')[window.location.pathname.split('/').length-1];
    links.forEach(link=>{
        if(location==""){
            html+=`
            <li class="nav-item active">
                <a class="nav-link" href="index.html">Home</a>
            </li>`;
        }
        if(location==link.href){
            html+=`
                <li class="nav-item active">
                    <a class="nav-link" href="${link.href}">${link.content}</a>
                </li>`;
        }
        else{
            html+=`
                <li class="nav-item">
                    <a class="nav-link" href="${link.href}">${link.content}</a>
                </li>`;
        }
        
        document.getElementById("nav").innerHTML = html;
    })
}