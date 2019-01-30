pragma solidity >=0.4.21 <0.6.0;

contract MedicalRecordContract {

    struct MedicalRecord {
        uint id; //if needed...
        string patientPPS; //or something to indicate what patients record it is...
        string encryptedRecord; //the medical record encrypted...
    }

    mapping (uint => MedicalRecord) public medicalRecords; //stores all the encrypted medical records
    uint recordsCounter; //counter

    function storeMedicalRecord(string memory  _patientPPS, string memory  _encryptedRecord) public {
        recordsCounter++;
        medicalRecords[recordsCounter] = MedicalRecord(recordsCounter, _patientPPS, _encryptedRecord);
    }

    function getNumberOfRecords() public view returns (uint){
        return recordsCounter;
    }

    function retrieveMedicalRecord(uint counter) public view returns (uint, string memory, string memory){
        return (medicalRecords[counter].id, medicalRecords[counter].patientPPS, medicalRecords[counter].encryptedRecord);
    }

//    function retrieveMedicalRecord(uint counter, string memory  _patientPPS, string memory gpEthAddress) public view returns (uint, string memory, string memory){
//        address from = msg.sender;
//
//        string memory gpAddress = toString(from);
//
//        if(stringsEqual(gpAddress, gpEthAddress)){
//            if(stringsEqual(medicalRecords[counter].patientPPS, _patientPPS)){
//                return (medicalRecords[counter].id, medicalRecords[counter].patientPPS, medicalRecords[counter].encryptedRecord);
//            }
//        }
//
//    }
//
//    function toString(address x) internal pure returns (string memory) {
//        bytes memory b = new bytes(20);
//        for (uint i = 0; i < 20; i++)
//            b[i] = byte(uint8(uint(x) / (2**(8*(19 - i)))));
//        return string(b);
//    }
//
//    function stringsEqual(string memory _a, string memory _b) internal pure returns (bool) {
//        bytes memory a = bytes(_a);
//        bytes memory b = bytes(_b);
//
//        // Compare two strings quickly by length to try to avoid detailed loop comparison
//        if (a.length != b.length)
//            return false;
//
//        // Compare two strings in detail Bit-by-Bit
//        for (uint i = 0; i < a.length; i++)
//            if (a[i] != b[i])
//                return false;
//
//        // Byte values of string are the same
//        return true;
//    }
}
