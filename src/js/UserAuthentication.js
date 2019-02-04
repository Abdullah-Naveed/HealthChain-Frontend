function login(userName, passWord) {
    App.displayAccountInfo();
    let username = userName.valueOf().toString();
    let password = passWord.valueOf().toString();
    if(username !== "") {
        let result = "";
        fetch("http://localhost:8000/user/login?userName=" + username + "&password=" + password).then(function (response) {
            response.text().then(function (value) {
                result = value;
                if (result === "true") {
                    localStorage.setItem("user", username); //stores logged in user in local storage
                    metamaskCheck(username)
                }else{
                    alert("Error! Please enter a valid username/password.");
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

function loggedIn() {
    let userName;
    fetch("http://localhost:8000/user/loggedIn").then(user =>{
        userName = user;
    });
    return userName;
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