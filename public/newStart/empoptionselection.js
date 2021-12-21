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
    
    window.location.href = "/newStart/dynamicformfillup.html";
});
viewtable.addEventListener('click',(e) =>{
    e.preventDefault();
    window.location.href = "/newStart/viewtableemp.html";
});
welcome.innerHTML ="welcome "+localStorage.getItem('ename')+" int the "+localStorage.getItem('formName')+" table, select what you want";