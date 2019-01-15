$(document).ready(function() {

    // SUBMIT FORM
    $("#submitForm").submit(function(event) {
        // Prevent the form from submitting via the browser.
        event.preventDefault();

        const min = 1;
        const max = 1000;
        const rand = Math.floor(min + Math.random() * (max - min));
        // this.state.id = rand;
        fetch('http://localhost:8000/patients/addPatient', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: rand,
                name: $("#name").val(),
                age: $("#age").val(),
                gender : $("#gender").val(),
                address : $("#address").val(),
                nationality : $("#nationality").val(),
                pps :  $("#pps").val(),
                gpNumber : $("#gpNumber").val(),
                ethAddress : $("#ethAddress").val()
            })
        });

    });
});