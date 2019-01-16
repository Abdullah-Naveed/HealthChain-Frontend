function login(txt) {
    let username = txt.valueOf().toString();
    if(username !== "") {
        let result = "";
        fetch("http://localhost:8000/user/login?userName=" + username).then(function (response) {
            response.text().then(function (value) {
                result = value;
                if (result === "true") {
                    localStorage.setItem("user", username); //stores logged in user in local storage
                    location.href='../src/dashboard.html';
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
    location.href='/index.html';
}

function user() {
    $('#username').text(localStorage.getItem("user").toString());
}