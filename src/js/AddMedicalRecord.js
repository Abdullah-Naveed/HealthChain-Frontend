function addMedRecord(patient){

    $("#myModal").modal(); //modal dialog opens

    document.getElementById("saveBtn").onclick = function () {

        /**
         private String patientsPPS;
         private String interactionType;
         private LocalDate issueDate;
         private String gpNumber;
         private String notes;
         private String prescription;
         private String outcome;
         **/

        //create a medical record object.. then convert to json string and send..
        const record = {};
        record.interactionType = $("#interactionType").val();
        record.date = $("#date").val();
        record.gpNumber = patient.gpNumber;
        record.notes = $("#notes").val();
        record.prescription = $("#prescription").val();
        record.outcome = $("#outcome").val();

        let obj = {};
        obj.userName = patient.name;
        obj.record = JSON.stringify(record);


        //test
        App.setValue(patient.ppsNumber, "encryptedRecord");

        // // encrypt medical record
        // fetch('http://localhost:8000/patients/encryptRecord', {
        //     method: 'POST',
        //     mode: 'cors',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(obj)
        // }).then(function (response) {
        //     response.text().then(function (encryptedRecord) {
        //         let pps = patient.ppsNumber;
        //         App.setValue(pps, encryptedRecord);
        //     }).catch(err => {
        //         console.log(err);
        //     });
        // }).catch(err => {
        //     console.log(err)
        // });

    }


}