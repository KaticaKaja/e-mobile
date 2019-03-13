$(document).ready(function(){
    formValidation();
});
function formValidation(){
    var checker=0;
    var formInformationArray=[];
    document.getElementById("firstName").addEventListener("blur", function(){
        var fName = document.getElementById('firstName').value.trim();
        var rfName = /^[A-Z][a-z]{1,14}((\-|\s)[A-Z][a-z]{1,14})?$/;
        if(!rfName.test(fName)){
            
            document.querySelector("#firstName").style.border='2px solid #ff0000';
        }
        else{
            formInformationArray.push();
            document.querySelector("#firstName").style.border='none';
            checker=1;
        }
    });
    document.getElementById("lastName").addEventListener("blur", function(){
        var lName = document.getElementById('lastName').value.trim();
        var rlName = /^[A-Z][a-z]{1,20}$/;
        if(!rlName.test(lName)){
            
            document.querySelector("#lastName").style.border='2px solid #ff0000';
        }
        else{
            formInformationArray.push();
            document.querySelector("#lastName").style.border='none';
            checker=1;
        }
    });
    document.getElementById("email").addEventListener("blur", function(){
        var email = document.getElementById('email').value.trim();
        var rEmail = /^[a-z\d\_\-\.]{2,}@[a-z]{2,10}(\.[a-z]{2,5})+$/;
        if(!rEmail.test(email)){
            
            document.querySelector("#email").style.border='2px solid #ff0000';
        }
        else{
            formInformationArray.push();
            document.querySelector("#email").style.border='none';
            checker=1;
        }
    });
    document.getElementById("comment").addEventListener("blur", function(){
        var comment = document.getElementById('comment').value.trim();
        var rComment = /^[\w\s\.\,\-\!\?\#\%\$\:\;]{20,}$/;
        if(!rComment.test(comment)){
            
            document.querySelector("#comment").style.border='1px solid #ff0000';
        }
        else{
            formInformationArray.push();
            document.querySelector("#comment").style.border='none';
            checker=1;
        }
    });
    document.querySelector("#send").addEventListener("click",function(){
        if(checker==0){
            document.querySelector("#comment").style.border='1px solid #ff0000';
            document.querySelector("#email").style.border='1px solid #ff0000';
            document.querySelector("#firstName").style.border='1px solid #ff0000';
            document.querySelector("#lastName").style.border='1px solid #ff0000';
        }
    });
}