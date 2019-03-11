window.onload = function(){
    
    ajaxPosts();

function ajaxPosts(){
    $.ajax({
        url: "data/blogPosts.json",
        method: 'GET',
        dataType: 'json',
        success: function (posts) {
            renderPosts(posts);
            
        },
        error: function(err) {
        console.error(err);
        }
    });
  }
  
  function renderPosts(posts){
    var months = ["January", "February", "March", "April", "May", "Jun", "July", "August", "September", "October", "November", "December"];
    var postDate = "";
    
    let html = "";
    posts.forEach(post=>{
        postDate=`${months[post.date.monthP-1]} ${post.date.dayP} ${post.date.yearP}`;
        html+=`
        <div class="col-lg-4 col-md-6 mb-5">
            <div class="card">
                <img class="card-img-top" src="${post.img.src}" alt="${post.img.src}">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${post.content}</p>
                </div>
                <div class="card-footer">
                    <small class="text-muted">${postDate}</small>
                </div>
            </div>
        </div>
        `;
    })
    document.getElementById("blogPosts").innerHTML = html;
    document.getElementById("dateSort").addEventListener("change",(e)=>{
        filterPosts(e);
    });
    
  }

  function filterPosts(e){
    $.ajax({
        url: 'data/blogPosts.json',
        method: 'GET',
        dataType: 'json',
        success: function (posts) {
          
            posts.forEach(post=>{
                post.postDate = new Date(`${post.date.monthP}-${post.date.dayP}-${post.date.yearP}`);
            });
                if(e.target.value == 1){
                    posts.sort((a,b)=>b.postDate-a.postDate);
                    //posts = posts.slice(0,3);
                }
                else if(e.target.value == 2){
                    posts.sort((a,b)=>a.postDate-b.postDate);
                }
             
            renderPosts(posts);
            
        },
        error: function(err) {
        console.error(err);
        }
    });
    
  }
  
}