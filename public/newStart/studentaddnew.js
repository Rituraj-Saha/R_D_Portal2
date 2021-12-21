const studentname = document.getElementById("studentname");
const coauthername= document.getElementById("coauthername");
const dept= document.getElementById("dept");
const faccoauthors= document.getElementById("faccoauthors");
const title= document.getElementById("title");
const types= document.getElementById("types");
const name_of_journal= document.getElementById("name_of_journal");
const month_of_publication= document.getElementById("month_of_publication");
const year_of_publication= document.getElementById("year_of_publication");
const topic_of_relevance= document.getElementById("topic_of_relevance");
const impact_factor= document.getElementById("impact_factor");
const Citation_index= document.getElementById("Citation_index");
const h_index= document.getElementById("h_index");
const indexed_in= document.getElementById("indexed_in");
const issn_issbn= document.getElementById("issn_issbn");
const url= document.getElementById("url");
const log_out = document.getElementById("log_out");

const addBtn =document.getElementById("addBtn");

if(localStorage.getItem('eid')==null)
{
    window.alert("Sorry session expired");
    window.location.href = "/newStart/login.html";
}
const database = firebase.database();
const userRef = database.ref(localStorage.getItem('eid'))



addBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    userRef.child('student').child(Date.now()).set(
        {
            studentname : studentname.value,
            coauthername : coauthername.value,
            dept : dept.value,
            faccoauthors : faccoauthors.value,
            title : title.value,
            types : types.value,
            name_of_journal : name_of_journal.value,
            month_of_publication : month_of_publication.value,
            year_of_publication : year_of_publication.value,
            topic_of_relevance : topic_of_relevance.value,
            impact_factor : impact_factor.value,
            Citation_index : Citation_index.value,
            h_index : h_index.value,
            indexed_in : indexed_in.value,
            issn_issbn : issn_issbn.value,
            url : url.value,
        }
        
    )
    .then(() => {
        window.alert('row added successfully');
        window.location.href = "/newStart/studentpatent.html";
    })
    .catch(error=> {
        console.error(error);
    
    });
    
    });
    log_out.addEventListener('click',(e)=>{
        e.preventDefault();
        window.localStorage.clear();
        window.location.href = "/newStart/login.html";
    });