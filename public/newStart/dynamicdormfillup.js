var form_name = window.localStorage.getItem('formName');
const database = firebase.database();
const formRef = database.ref("forms").child(form_name);
const parentDiv = document.getElementById("added");

const addBtn = document.getElementById("submitBtn");

var arr_id = [];
var arr_f = [];

if (localStorage.getItem('eid') == null) {
    window.alert("Sorry session expired");
    window.location.href = "/newStart/login.html";
}
const database2 = firebase.database();
const userRef = database2.ref(localStorage.getItem('eid'));
var files = [];
var reader;
var ImgName, ImgeUrl;

document.querySelector(
    "#loader").style.display = "none";
//   document.querySelector(
//     "body").style.visibility = "visible";

formRef.once('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {

        console.log(childSnapshot.val());

        if (childSnapshot.val().type == 'text') {
            console.log("inside text" + childSnapshot.val().key);
            var newlabel = document.createElement("Label");
            newlabel.setAttribute("for", childSnapshot.key);
            newlabel.innerHTML = childSnapshot.key;
            parentDiv.appendChild(newlabel);

            var newin = document.createElement("INPUT");
            newin.setAttribute("type", "text");
            newin.id = childSnapshot.key;
            arr_id.push(childSnapshot.key);
            parentDiv.appendChild(newin);
        }

        else if (childSnapshot.val().type == 'file') {
            console.log("inside text" + childSnapshot.val().key);
            var newlabel = document.createElement("Label");
            newlabel.setAttribute("for", childSnapshot.key);
            newlabel.innerHTML = childSnapshot.key;
            parentDiv.appendChild(newlabel);

            var newin = document.createElement("INPUT");
            newin.setAttribute("type", "file");

            newin.id = childSnapshot.key;
            arr_id.push(childSnapshot.key);

            arr_f.push(childSnapshot.key);

            parentDiv.appendChild(newin);
            newin.onchange = e => {
                files = e.target.files;
                reader = new FileReader();
                // reader.onload = function(){
                // }
                reader.readAsDataURL(files[0]);
            }

            //newin.click();
        }

        else {
            var option_in = childSnapshot.val().option;
            var optionArr = option_in.split(',');
            var newlabel = document.createElement("Label");
            newlabel.setAttribute("for", childSnapshot.key);
            newlabel.innerHTML = childSnapshot.key;
            // window.alert('clicked'+myin.value);

            parentDiv.appendChild(newlabel);

            var newOp = document.createElement("select");
            newOp.name = childSnapshot.key;
            newOp.id = childSnapshot.key;
            newOp.style = "display: inline;font-size: small;";
            arr_id.push(childSnapshot.key);

            for (const val of optionArr) {
                var option = document.createElement("option");
                console.log(val);
                option.value = val;
                option.text = val;
                newOp.appendChild(option);
            }

            parentDiv.appendChild(newOp);

        }

        console.log(childSnapshot.key);

    });
});


addBtn.addEventListener('click', (e) => {
    e.preventDefault();

      document.querySelector(
        "#loader").style.visibility = "visible";

    const mapOfId = new Map();
    mdate = Date.now();
    for (var i of arr_id) {

        if (arr_f.indexOf(i) == -1) {
            mapOfId.set(i, document.getElementById(i).value);
            console.log(i);
            x = i;
        }
        else {
            console.log("executed 1st");
            mapOfId.set(i, document.getElementById(files[0]));
            console.log("upload" + i);
            x = i;
        }
    }
    // formRef.once('value', function (snapshot2) {
    //     snapshot2.forEach(function (childSnapshot2) {

    //     });
    // });


    for (let [key, value] of mapOfId) {
        x = key;
        if (arr_f.indexOf(key) == -1) {
            console.log("executed 2nd if");
            userRef.child(form_name).child(mdate).update(
                {
                    [key]: value
                }

            )
                .then(() => {

                    //window.location.href = "/newStart/studentpatent.html";
                })
                .catch(error => {
                    console.error(error);
                });
        }

        else {
            console.log("executed 2nd" + files[0]);
            const ref = firebase.storage().ref();
            const file = files[0]
            const name = mdate+file.type;
            console.log("name of file"+name);
            const metadata = {
                contentType: file.type
            };
            const task = ref.child(name).put(file, metadata);
            task
            .then(snapshot => snapshot.ref.getDownloadURL())
              .then((url) => {
                console.log(url);
               // document.querySelector('#someImageTagID').src = url;
               userRef.child(form_name).child(mdate).update(
                {
                    [key]: url
                }

                )
                .then(() => {

                    //window.location.href = "/newStart/studentpatent.html";
                })
                .catch(error => {
                    console.error(error);
                });
              
              })
              .catch((error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                  case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    console.log(error.message);
                    break;
                  case 'storage/canceled':
                    // User canceled the upload
                    console.log(error.message)
                    break;
                  case 'storage/unknown':
                    console.log(error.message)
                    // Unknown error occurred, inspect error.serverResponse
                    break;
                }
              });

          
            // ImgName = form_name + localStorage.getItem('eid');
            // var uploadTask = firebase.storage().ref().child(ImgName).put(files[0]);

            // uploadTask.on('state_changed',
            //     // function (snapshot) {
            //     //     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            //     //     var newlabel = document.createElement("Label");
            //     //     newlabel.innerHTML = 'Upload' + progress + '%';
            //     // },

            //     // function (error) {
            //     //     alert('error in saving the image ' + error.message);
            //     // },

            //     function () {
            //         uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
            //             ImgeUrl = url;
            //             userRef.child(form_name).child(mdate).update(
            //                 {
            //                     [key]: ImgeUrl
            //                 });
            //             console.log("image url is" + [key] + " " + ImgeUrl)
            //         });


            //     }

            // );
        }
    }
    // window.alert('row added successfully');
    // window.location.href = "/newStart/dynamicformfillup.html";
    var delayInMilliseconds = 5000; //5 second

setTimeout(function() {
  //your code to be executed after 1 second
  document.querySelector(
    "#loader").style.display = "none";
  window.alert('row added successfully');
 window.location.href = "/newStart/dynamicformfillup.html";
}, delayInMilliseconds);

});

log_out.addEventListener('click', (e) => {
    e.preventDefault();
    window.localStorage.clear();
    window.location.href = "/newStart/login.html";
});

