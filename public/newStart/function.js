// const userId = document.getElementById("userId");
const fname = document.getElementById("fname");
const eid = document.getElementById("eid");
const password = document.getElementById("password");
const addBtn = document.getElementById("addBtn");
// const removeBtn = document.getElementById("removeBtn");
const updateBtn = document.getElementById("updateBtn");

const database = firebase.database();
const userRef = database.ref('users')

addBtn.addEventListener('click', (e) =>{
e.preventDefault();
userRef.child(eid.value).set(
    {
        name: fname.value,
        eid: eid.value,
        password: password.value,
        type: "Employee"
    }
    
)
.then(() => {
    window.alert('employee added');
})
.catch(error=> {
    console.error(error);

});

});

updateBtn.addEventListener('click',(e) =>{

        e.preventDefault();
        window.location.href = "/newStart/login.html";
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

// removeBtn.addEventListener('click',(e) =>{
//     e.preventDefault();

//     userRef.child(eid.value).remove()
//     .then(() => {
//         window.alert('employee removed');
//     })
//     .catch(error=> {
//         console.error(error);

//     });
// }
// )

