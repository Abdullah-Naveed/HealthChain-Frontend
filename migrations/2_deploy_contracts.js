let MedicalRecordContract = artifacts.require("MedicalRecordContract");

module.exports = function(deployer){
    deployer.deploy(MedicalRecordContract)
        .then(() => console.log(MedicalRecordContract.address));
};
