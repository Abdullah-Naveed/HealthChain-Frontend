function manage(txt) {

    let username = txt.valueOf().toString();
    if(username !== "") {
        let result = "";
        fetch("http://localhost:8000/gp/userInfo?userName=" + username).then(function (response) {
            response.text().then(function (value) {
                result = value;
                if (result === "true") {
                    location.href='../src/dashboard.html';
                }
            });
        });
    }

}