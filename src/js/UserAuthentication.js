function login(txt) {
    App.displayAccountInfo();
    let username = txt.valueOf().toString();
    if(username !== "") {
        let result = "";
        fetch("http://localhost:8000/user/login?userName=" + username).then(function (response) {
            response.text().then(function (value) {
                result = value;
                if (result === "true") {
                    localStorage.setItem("user", username); //stores logged in user in local storage
                    metamaskCheck(username)
                }else{
                    alert("Error! Please enter a valid username.");
                }
            });
        });
    }
}

function logout() {
    fetch("http://localhost:8000/user/logout").then();
    localStorage.removeItem("user"); //removes the user when logged out
    localStorage.removeItem("ethAddress"); //removes the address when logged out
    location.href='/index.html';
}

function user() {
    $('#username').text(localStorage.getItem("user").toString());
}

function metamaskCheck(username) {
    let localEthAddress = localStorage.getItem("ethAddress");
    let ethAddress = "";
    fetch("http://localhost:8000/user/getUserEthAddress?userName=" + username).then(function (response) {
        response.text().then(function (value) {
            ethAddress = value;

            if(ethAddress.toLowerCase() === localEthAddress){
                location.href='../src/dashboard.html';
            }else{
                alert("Wrong metamask account. Either switch to correct metamask account or login as different user.");
            }

        });
    });
}