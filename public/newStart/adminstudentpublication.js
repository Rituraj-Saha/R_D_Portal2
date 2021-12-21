// const studentpatent = document.getElementById("student");
// const facultypatent = document.getElementById("faculty");
const welcomep = document.getElementById("welcomep");
const log_out = document.getElementById("log_out");

const database = firebase.database();
const userRef = database.ref('users');
const view = document.getElementById("updateBtn");
const facultyRef = database.ref();

const viewall = document.getElementById("viewall");


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
welcomep.innerHTML ="welcome "+localStorage.getItem('ename')+" in student publication report, please select the eid to view respective employee publication";


var values = new Array();
var select = document.createElement("select");
select.name = "eid";
select.id = "eid";
//select.style="display: inline;font-size: small; margin-top: 0px;";
select.style = "display: inline;font-size: small; margin-top: 0px;width: fit-content;margin-left: 280px;"

           

    userRef.once('value',   function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                console.log(childKey);
                values.push(childKey);
                console.log("value is"+values)
            });

            for (const val of values)
                {
                    var option = document.createElement("option");
                    option.value = val;
                    console.log("value of val: "+val)
                    option.text = val.charAt(0).toUpperCase() + val.slice(1);
                    console.log("value of text: "+val.charAt(0).toUpperCase() + val.slice(1));
                    select.appendChild(option);
                }
            document.getElementById("container").appendChild(select);
            console.log("select is:"+select);
         //  document.getElementById("eid").innerHTML = select;
        });

        var label = document.createElement("p");
        label.id = "seleted_name";
        label.style = "margin-left: 80px;"
        document.getElementById("container").appendChild(label);


        view.addEventListener('click',(e)=>{
            e.preventDefault();
            var customers = new Array();

            customers.push(["Name of the Student Author",
             "Name of Student coauther", 
             "Department of student",
             "Name Of Faculty Co Authors",
             "Title of Publication",
             "Types of Publication",
             "Name of the journal",
             "Month of publication",
             "Year of publication",
             "Topic of relevanve",
             "Impact factor",
             "Citation Index",
             "h Index",
             "Indexd in (Scop us/web of Science/Thomson)",
             "ISSN/ISBN",
             "Url of the publication"]);
            //  customers.push([1, "John Hammond", "United States"]);
            //  customers.push([2, "Mudassar Khan", "India"]);
            //  customers.push([3, "Suzanne Mathews", "France"]);
            //  customers.push([4, "Robert Schidner", "Russia"]);
            //  console.log("real customer is: "+customers);

            userRef.child(select.value).once('value',function(snapshot){
              // document.getElementById("selected_name").remove().
                label.innerHTML = "name of employee: "+snapshot.val().name;
                document.getElementById("container").replaceChild(label,label);
            });
            
            facultyRef.child(select.value).child('student').once('value',   function(snapshot) {
                  snapshot.forEach(function(childSnapshot) {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    customers.push([childSnapshot.val().studentname,
                    childSnapshot.val().coauthername,
                    childSnapshot.val().dept,
                    childSnapshot.val().faccoauthors,
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
                    childSnapshot.val().issn_issbn,
                    childSnapshot.val().url]);
                       
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
    

        });

        function exportTableToExcel(tableID, filename = ''){
            var downloadLink;
            var dataType = 'application/vnd.ms-excel';
            var tableSelect = document.getElementById(tableID);
            var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
            
            // Specify file name
            filename = filename?filename+'.xls':'excel_data.xls';
            
            // Create download link element
            downloadLink = document.createElement("a");
            
            document.body.appendChild(downloadLink);
            
            if(navigator.msSaveOrOpenBlob){
                var blob = new Blob(['\ufeff', tableHTML], {
                    type: dataType
                });
                navigator.msSaveOrOpenBlob( blob, filename);
            }else{
                // Create a link to the file
                downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
            
                // Setting the file name
                downloadLink.download = filename;
                
                //triggering the function
                downloadLink.click();
            }
        }


    viewall.addEventListener('click',(e)=>{
        e.preventDefault();
        
        window.location.href = "/newStart/adminviewallstudentpublication.html";
    });