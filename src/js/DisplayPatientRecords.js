function displayPatientRecords(patient){

    // alert("worked " + patient.name);
    $('#patientsRecordsModal').modal();
    //could remove trusted gp... or something else...

    let user = localStorage.getItem("user");

    fetch("http://localhost:8000/patients/getTrustedGPs?userName=" + patient.name).then(response => {
        return response.json();
    }).then(data => {
        // Work with JSON data here
        data.forEach(function (gp){
            let keys = Object.keys(gp);
            keys.forEach(function (gpName){
                if(user === gpName){
                    //display records...
                    App.retrieveRecord(patient.ppsNumber);
                }
            });
        });

    }).catch(err => {
        // Do something for an error here
        console.log(err)
    });

}