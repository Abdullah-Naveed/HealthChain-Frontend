let MedicalRecordContract = artifacts.require("./MedicalRecordContract.sol");

module.exports = function(deployer){
    deployer.deploy(MedicalRecordContract)
        .then(() => console.log(MedicalRecordContract.address));
};
