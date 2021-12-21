const database = firebase.database();
const userRef = database.ref(localStorage.getItem('eid'));
const studenttable = document.getElementById("studenttable");

const addBtn =document.getElementById("addBtn");

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
// var student = new Array();
// student.push(["name"]);

// var table = document.createElement("TABLE");
//         table.border = "1";

//         var columnCount = 2;

//         var row = table.insertRow(-1);
//         for (var i = 0; i < columnCount; i++) {
//             var headerCell = document.createElement("TH");
//             headerCell.innerHTML = student[0][i];
//             row.appendChild(headerCell);
//         }

// userRef.once('value',   function(snapshot) {
//     snapshot.forEach(function(childSnapshot) {
//       var childKey = childSnapshot.key;
//       var childData = childSnapshot.val();
//       student.push([childSnapshot.val().studentname])
//       console.log(childKey+childSnapshot.val().studentname)


//       // ...
//     });
//   });

//   for (var i = 1; i < student.length; i++) {
//     row = table.insertRow(-1);
//     for (var j = 0; j < columnCount; j++) {
//         var cell = row.insertCell(-1);
//         cell.innerHTML = student[i][j];
//     }

//     studenttable.innerHTML = "";
//     studenttable.appendChild(table);}

var customers = new Array();
        customers.push(["Name of Author", "Name of coauther", "Department","ORCID id of the Author","WoS Reseach Id Author"
        ,"Soopus Id of Author","Google Scholar ID","Title of Publication"
      ,"Types of Publication","Name of the journal","Month of publication","Year of publication","Topic of relevanve",
    "Impact factor","Citation Index","h Index","Indexd in (Scopus/web of Science/Thomson)","Link of the Publication","ISSBN/ISBN","Url of the publication","Type of other publications indexing"]);
        //  customers.push([1, "John Hammond", "United States"]);
        //  customers.push([2, "Mudassar Khan", "India"]);
        //  customers.push([3, "Suzanne Mathews", "France"]);
        //  customers.push([4, "Robert Schidner", "Russia"]);
        //  console.log("real customer is: "+customers);

        userRef.child('faculty').once('value',   function(snapshot) {
              snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                customers.push([childSnapshot.val().name,
                    childSnapshot.val().coauthername,
                    childSnapshot.val().dept,
                    childSnapshot.val().orcid_id,
                    childSnapshot.val().wos_id,
                    childSnapshot.val().soopus_id,
                    childSnapshot.val().google_id,
                    childSnapshot.val().title,
                    childSnapshot.val().types,
                    childSnapshot.val().name_of_journal,
                    childSnapshot.val().month_of_publication,
                    childSnapshot.val().year_of_publication,
                    childSnapshot.val().topic_of_relevance,
                    childSnapshot.val().impact_factor,
                    childSnapshot.val().Citation_index,
                    childSnapshot.val().h_index,
                    childSnapshot.val().indexed_in,
                    childSnapshot.val().link,
                    childSnapshot.val().issn_issbn,
                    childSnapshot.val().url,
                    childSnapshot.val().type_other_publications_index]);
                // childKey+childSnapshot.val().studentname+
                
              });
              console.log("customer is: "+customers);
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
              for (var i = 1; i < customers.length; i++) {
                  row = table.insertRow(-1);
                  for (var j = 0; j < columnCount; j++) {
                      var cell = row.insertCell(-1);
                      cell.innerHTML = customers[i][j];
                  }
              }
       
              var dvTable = document.getElementById("studenttable");
              dvTable.innerHTML = "";
              dvTable.appendChild(table);
            });
         //   console.log("customer is: "+customers);
       // var table = document.createElement("TABLE");
       // table.border = "1";

        // var columnCount = customers[0].length;
 
        // //Add the header row.
        // var row = table.insertRow(-1);
        // for (var i = 0; i < columnCount; i++) {
        //     var headerCell = document.createElement("TH");
        //     headerCell.innerHTML = customers[0][i];
        //     row.appendChild(headerCell);
        // }
 
        // //Add the data rows.
        // for (var i = 1; i < customers.length; i++) {
        //     row = table.insertRow(-1);
        //     for (var j = 0; j < columnCount; j++) {
        //         var cell = row.insertCell(-1);
        //         cell.innerHTML = customers[i][j];
        //     }
        // }
 
        // var dvTable = document.getElementById("studenttable");
        // dvTable.innerHTML = "";
        // dvTable.appendChild(table);




