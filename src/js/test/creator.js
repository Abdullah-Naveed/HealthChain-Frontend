import web3 from "/web3";
import CampaignFactory from "/build/MedicalRecordContract.json";

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    "0x1277c1934f2A284F5e609B7E762608caA47C51C2"
);

export default instance;

//exports instance of already deployed creator contract