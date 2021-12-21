const addnew = document.getElementById("addnew");
const viewtable = document.getElementById("viewtable");
const welcomep = document.getElementById("welcomep");
const log_out = document.getElementById("log_out");

if(localStorage.getItem('eid')==null)
{
    window.alert("Sorry session expired");
    window.location.href = "/newStart/login.html";
}

log_out.addEventListener('click',(e)=>{
    e.preventDefault();
    window.localStorage.clear();
    window.location.href = "/newStart/login.html";
});
addnew.addEventListener('click',(e) =>{
    e.preventDefault();
    
    window.location.href = "/newStart/studentaddnew.html";
});
viewtable.addEventListener('click',(e) =>{
    e.preventDefault();
    window.location.href = "/newStart/studentviewtable.html";
});
welcome.innerHTML ="welcome "+localStorage.getItem('ename')+" to student publication portal";