const studentpatent = document.getElementById("student");
const facultypatent = document.getElementById("faculty");
const TestingOrder = document.getElementById("TestingOrder");
const welcomep = document.getElementById("welcomep");
const log_out = document.getElementById("log_out");

if(localStorage.getItem('eid')==null)
{
    window.alert("Sorry session expired");
    window.location.href = "/newStart/login.html";
}
studentpatent.addEventListener('click',(e) =>{
    e.preventDefault();
    window.location.href = "/newStart/studentpatent.html";
});
welcomep.innerHTML ="welcome "+localStorage.getItem('ename');

facultypatent.addEventListener('click', (e)=>{
    e.preventDefault();
    window.location.href = "/newStart/facultypatent.html";
});

// TestingOrder.addEventListener('click', (e)=>{
//     e.preventDefault();
//     window.location.href = "/newStart/dynamicformfillup.html";
// });

log_out.addEventListener('click',(e)=>{
    e.preventDefault();
    window.localStorage.clear();
    window.location.href = "/newStart/login.html";
});
//console.log(empid);


var form_name = "";
const database = firebase.database();
const formRef = database.ref();

formRef.child("forms").once('value', function(snapshot){
    var top2= new Array();
  snapshot.forEach(function (childSnapshot){
    console.log("upper "+childSnapshot.key);
    childData =childSnapshot.key;

            top2.push(childData);
            
  });
  for (const val of top2) {
    var select2 = document.createElement("button");
    select2.name = "form_name";
    select2.id = val;
    select2.style = " margin-top: 10px;width: fit-content;margin-left: 20px;"
    select2.className = "btn waves-effect waves-light"
    select2.innerHTML = val;

    //var option = document.createElement("option");
   // option.value = val;
   // console.log("value of val: " + val)
   // option.text = val.charAt(0).toUpperCase() + val.slice(1);
    //console.log("value of text: " + val.charAt(0).toUpperCase() + val.slice(1));
    document.getElementById("container2").appendChild(select2);
   // select2.appendChild(option);

   document.getElementById("container2").appendChild(select2);
console.log("select is:" + select2);
const x = document.getElementById(val);
x.addEventListener('click',(e) =>{
    e.preventDefault();
    window.localStorage.setItem("formName",x.id)
  //  alert("formName"+x.id)
    window.location.href = "/newStart/empoptionselction.html";
});

}

});