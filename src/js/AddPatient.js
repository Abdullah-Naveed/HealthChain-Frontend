$(document).ready(function() {
    //fetch to gp controller and and get gp back as json string and
    //then set his gp number to patient before posting to patients controller

    let user = localStorage.getItem("user");
    let gpNumb = "";
    fetch("http://localhost:8000/gp/getGp?userName=" + user).then(response => {
        return response.json();
    }).then(data => {
        // Work with JSON data here
        console.log(data.gpNumber);
        gpNumb = data.gpNumber;
    }).catch(err => {
        console.log(err)
    });

    // SUBMIT FORM
    $("#submitForm").submit(function (event) {
        // Prevent the form from submitting via the browser.
        event.preventDefault();

        const min = 1;
        const max = 1000;
        const rand = Math.floor(min + Math.random() * (max - min));

        fetch("http://localhost:8000/gp/getEthAddress?userName=" + user).then(function (response) {

            response.text().then(function (data) {
                //create patient object to send to server
                const patient = {};
                patient.id = rand;
                patient.name = $("#name").val();
                patient.age = $("#age").val();
                patient.gender = $("#gender").val();
                patient.address = $("#address").val();
                patient.nationality = $("#nationality").val();
                patient.pps = $("#pps").val();
                patient.ethAddress = $("#ethAddress").val();
                patient.gpNumber = gpNumb;
                patient.gpName = user;
                patient.gpEthAddress = data;
                patient.secretKey = $("#secretKey").val();

                // add patient
                fetch('http://localhost:8000/user/addPatient', {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(patient)
                }).catch(err => {
                    console.log(err)
                });

                // save patient to gp list
                fetch('http://localhost:8000/gp/savePatient', {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(patient)
                }).then(() => {
                    alert("Patient created!");
                    location.href = '../dashboard.html';
                }).catch(err => {
                    console.log(err)
                });


            }).catch(err => {
                console.log(err)
            });
        });
    });
});