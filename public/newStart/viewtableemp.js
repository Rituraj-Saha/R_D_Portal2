var form_name = localStorage.getItem('formName');
const database = firebase.database();
const formRef = database.ref("forms").child(form_name);
const userRef = database.ref(localStorage.getItem('eid'));

const log_out = document.getElementById("log_out");

if (localStorage.getItem('eid') == null) {
    window.alert("Sorry session expired");
    window.location.href = "/newStart/login.html";
}

log_out.addEventListener('click', (e) => {
    e.preventDefault();
    window.localStorage.clear();
    window.location.href = "/newStart/login.html";
});


var customers = new Array();
var count = 0;

var no_row = 0;
userRef.child(form_name).once('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
     if(count == 0)
     {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

      //  console.log("child key: " + childKey + "child data: " + childData);

        var top = new Array();

        for (i in childData) {
            console.log("\n" + i);
            console.log(childData[i])
            top.push(i);   
        }
        top.push("Action")
        console.log("top is: " + top);
        customers.push(top);
        count++;
     } 
    })

    var map = new Map();
    userRef.child(form_name).once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
           
            // console.log("child key: "+childKey+"child data: "+childData);

            // var top= new Array();
            // for (i in childData){
            //     console.log("\n" + i);
            //           console.log( childData[i]) 
            //             top.push(i);

            // }
            // console.log("top is: "+top);
            // customers.push(top);

            var field = new Array();
            for (i in childData) {
                console.log("\n" + i);
                
                field.push(childData[i])

            }
            map.set(no_row,childKey);
            customers.push(field);
            no_row++;
        });
        console.log("customer is: " + customers);
        var table = document.createElement("TABLE");
        table.border = "1";

        var columnCount = customers[0].length;

        //Add the header row.
        var row = table.insertRow(-1);
        for (var i = 0; i < columnCount; i++) {
            var headerCell = document.createElement("TH");
            headerCell.innerHTML = customers[0][i];
            row.appendChild(headerCell);
        }

        //Add the data rows.
        var deletecell;
        for (var i = 1; i < customers.length; i++) {
            row = table.insertRow(-1);
            for (var j = 0; j < columnCount; j++) {
                var cell = row.insertCell(-1);
                cell.innerHTML = customers[i][j];

                if(j==columnCount-1)
                {
                    
                     console.log("map is: "+map.get(2));
                    
                    cell.innerHTML = "";
                    deletecell= document.createElement("TD");
                    deletecell.id = i;
                    deletecell.name = i;
                    deletecell.inputMode = "button";
                    deletecell.innerHTML = "Delete";
                    cell.appendChild(deletecell);
                   
                   
                }
            }
        }

        var dvTable = document.getElementById("studenttable");
        dvTable.innerHTML = "";
        dvTable.appendChild(table);
      
         for (var i = 1; i < customers.length; i++) {
            deletecell.onclick = getId(i);
        }

        function  getId(c) {
           // alert("row " + element.parentNode.parentNode.rowIndex);
           var y = document.getElementById(c)
           y.addEventListener('click', (e) => {
              console.log(map.get(y.getAttribute("id")-1));
              userRef.child(form_name).child(map.get(y.getAttribute("id")-1)).remove();
              window.location.href = "/newStart/viewtableemp.html";

           });
        }
           
        
       
    });

});
