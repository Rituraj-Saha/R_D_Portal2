// const studentpatent = document.getElementById("student");
// const facultypatent = document.getElementById("faculty");
const welcomep = document.getElementById("welcomep");
const log_out = document.getElementById("log_out");

const database = firebase.database();
const userRef = database.ref('users');
const view = document.getElementById("updateBtn");
const facultyRef = database.ref();

const viewall = document.getElementById("viewall");


if (localStorage.getItem('eid') == null) {
    window.alert("Sorry session expired");
    window.location.href = "/newStart/login.html";
}
log_out.addEventListener('click', (e) => {
    e.preventDefault();
    window.localStorage.clear();
    window.location.href = "/newStart/login.html";
});
welcomep.innerHTML = "welcome " + localStorage.getItem('ename') + " in all faculty publication report,";


var label = document.createElement("p");
label.id = "seleted_name";
label.style = "margin-left: 80px;"
document.getElementById("container").appendChild(label);


// view.addEventListener('click',(e)=>{
//     e.preventDefault();
var customers = new Array();

customers.push([
    "Employee Id",
    "Employee Name",
    "Name of Author",
    "Name of coauther",
    "Department",
    "ORCID id of the Author",
    "WoS Reseach Id Author",
    "Soopus Id of Author",
    "Google Scholar ID",
    "Title of Publication",
    "Types of Publication",
    "Name of the journal",
    "Month of publication",
    "Year of publication",
    "Topic of relevanve",
    "Impact factor",
    "Citation Index",
    "h Index",
    "Indexd in (Scopus/web of Science/Thomson)",
    "Link of the Publication",
    "ISSBN/ISBN",
    "Url of the publication",
    "Type of other publications indexing"]);


userRef.once('value', function (snapshot) {

    snapshot.forEach(function (childSnapshot1) {
        console.log("key are " + childSnapshot1.key)

        facultyRef.child(childSnapshot1.key).child('faculty').once('value', function (snapshot1) {
            snapshot1.forEach(function (childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                let emloyeeId = "";
                let employeeName = ""
                console.log("d key is", childSnapshot.key)
               
                customers.push([
                    childSnapshot1.key,
                    childSnapshot1.val().name,
                    childSnapshot.val().name,
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


            });
          

            var table = document.createElement("TABLE");
            table.border = "1";

            var columnCount = customers[0].length;

           
            var row = table.insertRow(-1);
            for (var i = 0; i < columnCount; i++) {
                var headerCell = document.createElement("TH");
                headerCell.innerHTML = customers[0][i];
                row.appendChild(headerCell);
            }

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
});



function exportTableToExcel(tableID, filename = '') {
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

    // Specify file name
    filename = filename ? filename + '.xls' : 'excel_data.xls';

    // Create download link element
    downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
    }
}


        