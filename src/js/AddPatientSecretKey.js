function addSecretKey(){

    let user = localStorage.getItem("user");
    if(user.startsWith("Dr")){

    }else{
        let result = "";
        fetch("http://localhost:8000/patients/getSecret?userName=" + user).then(function (response) {
            response.text().then(function (value) {
                result = value;
                if (result === "") {
                    //open a modal dialog asking for secret key.. then fetch and store
                    $("#secretKeyModal").modal(); //modal dialog opens
                    document.getElementById("saveBtnKey").onclick = function () {
                        let secretKey =  $("#secretKey").val();
                        let obj = {};
                        obj.userName = user;
                        obj.secret = secretKey;

                        fetch("http://localhost:8000/patients/setSecret", {
                            method: 'POST',
                            mode: 'cors',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(obj)
                        }).then(function (response) {
                            console.log("here: " + response);
                            alert("Secret key successfully added.")
                        }).catch(err => {
                            // Do something for an error here
                            alert("An error has occurred. Please try again!");
                            console.log(err)
                        });

                    }

                }else{
                    //do nothing...
                }
            });
        });
    }


}