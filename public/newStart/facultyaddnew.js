const studentname = document.getElementById("studentname");
const coauthername= document.getElementById("coauthername");
const dept= document.getElementById("dept");
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

const orcid_id = document.getElementById("orcid_id");
const wos_id = document.getElementById("wos_id");
const soopus_id = document.getElementById("soopus_id");
const google_id = document.getElementById("google_id");
const link = document.getElementById("link");;
const type_other_publications_index = document.getElementById("type_other_publications_index");

const addBtn =document.getElementById("addBtn");


const database = firebase.database();
const userRef = database.ref(localStorage.getItem('eid'))

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

addBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    userRef.child('faculty').child(Date.now()).set(
        {
            name : studentname.value,
            coauthername : coauthername.value,
            dept : dept.value,
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
            orcid_id : orcid_id.value,
            wos_id : wos_id.value,
            soopus_id : soopus_id.value,
            google_id : google_id.value,
            link : link.value,
            type_other_publications_index: type_other_publications_index.value,

        }
        
    )
    .then(() => {
        window.alert('row added successfully');
        window.location.href = "/newStart/facultypatent.html";
    })
    .catch(error=> {
        console.error(error);
    
    });
    
    });