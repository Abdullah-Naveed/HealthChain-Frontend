let MedicalRecordContract = artifacts.require("MedicalRecordContract");
// console.log(MedicalRecordContract);
module.exports = function(deployer){
    console.log("Now 'm Here");
    deployer.deploy(MedicalRecordContract)
        .then(() => console.log(MedicalRecordContract.address));
};
