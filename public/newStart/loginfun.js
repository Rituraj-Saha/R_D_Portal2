const updateBtn = document.getElementById("updateBtn");

const database = firebase.database();
const userRef = database.ref('users')
const eid = document.getElementById("eid");
const password = document.getElementById("password");




updateBtn.addEventListener('click',(e) =>{

    e.preventDefault();
    //window.location.href = "/newStart/login.html";

    userRef.child(eid.value).once("value",snapshot =>
   {
        if (snapshot.exists()){
           // console.log("exists!");
           // snapshot.child("password").once('value', (snap)=>{
          
            const pass = password.value;
            if(pass == snapshot.val().password)
            {
                // var temp = eid.value
                // globalVariable.x = temp;
                // console.log(globalVariable.x);
                var empid=eid.value;
                console.log("this is from login:"+empid);
                
                localStorage.setItem('eid',eid.value);
                localStorage.setItem('ename',snapshot.val().name);

                window.alert("welcome On board");
                window.location.href = "/newStart/patenttype.html";
               
               
            }
            else{
                window.alert("wrong password");
            }
           
            // snapshot.once("value",snapshot=>{
            //     if(snapshot.exists)
            //     {
            //         console.log("exists!!!!");
            //     }
            // })
        // });
       
        }
        else{
            window.alert("sign up first");
        }
   });
    // const newdata ={
    // name: fname.value,
    // eid: eid.value,
    // password: password.value,
    // type: "Employee"

    // }
    // const updates = {};
    // updates['/users/'+eid.value] = newdata;
    // updates[eid.value] = newdata;

    // database.ref().update(updates);


})