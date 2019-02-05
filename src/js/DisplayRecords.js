function displayRecords(medRecord, ulName){

    let user = localStorage.getItem('user');
    let record = JSON.parse(medRecord);

    // if(document.getElementById(ulName).getElementsByTagName('li').length < 1){

        let list = document.getElementById(ulName);
        let entry = document.createElement('li');
        let name = document.createElement('a');

        name.appendChild(document.createTextNode(record.date));
        entry.appendChild(name);
        list.appendChild(entry);

        name.onclick = function() {
            if(user.startsWith("Dr")){
                displayMedicalRecordsGP(record)
            }else{
                displayMedicalRecordsPatient(record);
            }
        };

        document.getElementById("closeBtn").onclick = function () {
            let myNode = list;
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }
        };


    // }else{
    //     // let list = document.getElementById(ulName);
    //     // alert("here");
    // }


}

function displayMedicalRecordsPatient(medicalRecord) {

    //opens the modal and displays the data
    $("#recordsModal").modal();
    $("#interaction").text(medicalRecord.interactionType);
    $("#date").text(medicalRecord.date);
    $("#notes").text(medicalRecord.notes);
    $("#outcome").text(medicalRecord.outcome);
    $("#prescription").text(medicalRecord.prescription);

}

function displayMedicalRecordsGP(medicalRecord) {

    //opens the modal and displays the data
    $("#patientsRecordsPerDate").modal();
    $("#interactionGP").text(medicalRecord.interactionType);
    $("#dateGP").text(medicalRecord.date);
    $("#notesGP").text(medicalRecord.notes);
    $("#outcomeGP").text(medicalRecord.outcome);
    $("#prescriptionGP").text(medicalRecord.prescription);

}