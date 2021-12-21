// Get the modal

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

var modal = document.getElementById("myModal");
var modal2 = document.getElementById("myModal2");

// Get the button that opens the modal
var btn = document.getElementById("addBtn");
var submitBtn = document.getElementById("submitBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var span2 = document.getElementsByClassName("close2")[0];

const mapOfElement = new Map();
const mapOfDrop = new Map();

// When the user clicks the button, open the modal 
btn.onclick = function () {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

span2.onclick = function () {
  modal2.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const addBtnmodel = document.getElementById("addBtnmodel");
const type_of_field = document.getElementById("type_of_field");
const addBtnmodel2 = document.getElementById("addBtnmodel2");
const parentDiv = document.getElementById("added");

const option_give = document.getElementById("option_give");
const myin = document.getElementById("fieldnametxt");

addBtnmodel.addEventListener('click', (e) => {
  e.preventDefault();

  console.log(type_of_field.value)
  if (type_of_field.value == "text") {

    console.error(myin.value);
    window.alert('row added successfully');
    // const parentDiv = document.getElementById("added");

    var newlabel = document.createElement("Label");
    newlabel.setAttribute("for", myin.value);
    newlabel.innerHTML = myin.value;
    parentDiv.appendChild(newlabel);

    var newin = document.createElement("INPUT");
    newin.setAttribute("type", "text");
    newin.id = myin.value;

    mapOfElement.set(myin.value, "text");

    parentDiv.appendChild(newin);
    modal.style.display = "none";
  
  }
  else if(type_of_field.value == "dropdown"){
    //window.alert('drop down selected');

   // console.log('drop down executed');
    modal2.style.display = "block";
  }
  else if(type_of_field.value == "document upload"){
    
    console.error(myin.value);
    window.alert('row added successfully');
    // const parentDiv = document.getElementById("added");

    var newlabel = document.createElement("Label");
    newlabel.setAttribute("for", myin.value);
    newlabel.innerHTML = myin.value;
    parentDiv.appendChild(newlabel);

    var newin = document.createElement("INPUT");
    newin.setAttribute("type", "file");
    newin.id = myin.value;

    mapOfElement.set(myin.value, "file");

    parentDiv.appendChild(newin);
    modal.style.display = "none";
  }

});

//add of dropdown

addBtnmodel2.addEventListener('click', (e) => {
  e.preventDefault();

  console.log('drop down executed');
  
  var option_in = option_give.value;
  var optionArr = option_in.split(',');
  //window.alert('clicked'+option_in);

  var newlabel = document.createElement("Label");
  newlabel.setAttribute("for", myin.value);
  newlabel.innerHTML = myin.value;
  // window.alert('clicked'+myin.value);

  parentDiv.appendChild(newlabel);

  var newOp = document.createElement("select");
  newOp.name = myin.value;
  newOp.id = myin.value;
  newOp.style = "display: inline;font-size: small;";

  mapOfDrop.set(myin.value, option_in);

  for (const val of optionArr) {
    var option = document.createElement("option");
    console.log(val);
    option.value = val;
    option.text = val;
    newOp.appendChild(option);
  }

  mapOfElement.set(myin.value, "dropdownn");

  parentDiv.appendChild(newOp);

  modal.style.display = "none";
  modal2.style.display = "none";

});

const form_name = document.getElementById("form_name");
const database = firebase.database();

//sub mission to fbase

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(mapOfElement);
  console.log(mapOfDrop);

  window.alert(form_name.value);
  console.log(""+form_name.value);
  const formRef = database.ref("forms").child(form_name.value);
  

  for (let [key, value] of mapOfElement) {

    if (value == "dropdownn") {
      op = mapOfDrop.get(key);
      for (const val of op) {
        console.log("this is: " + key + " " + val);
      }
      formRef.child(key).set(
        {
          type: value,
        }

      )
        .then(() => {
         // window.alert('row added successfully');
          // window.location.href = "/newStart/studentpatent.html";
        })
        .catch(error => {
          console.error(error);

        });

      formRef.child(key).set(
        {
          option: op,
        }
      )
        .then(() => {
       //   window.alert('row added successfully');
          // window.location.href = "/newStart/studentpatent.html";
        })
        .catch(error => {
          console.error(error);

        });


    }
    else if(value == "text") {
      formRef.child(key).set(
        {
          type: value,
        }
      )
        .then(() => {
         // window.alert('row added successfully');
          // window.location.href = "/newStart/studentpatent.html";
        })
        .catch(error => {
          console.error(error);

        });
    }
    else
    {
      formRef.child(key).set(
        {
          type: value,
        }
      )
        .then(() => {
         // window.alert('row added successfully');
          // window.location.href = "/newStart/studentpatent.html";
        })
        .catch(error => {
          console.error(error);

        });
    }
  }
});