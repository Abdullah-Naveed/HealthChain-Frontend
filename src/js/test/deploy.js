const compiledCreator = require("./build/CampaignCreator.json");
const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');
const provider = new HDWalletProvider(
    'bounce payment sound original arrest stairs ecology vacant prosper broken appear spice',
    'https://ropsten.infura.io/v3/7777dae91b0642888389c02a139b1baf'
);

const web3 = new Web3(provider);

const deploy = async () => { //async can only be used in a function - Only reason for this function to be created

    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from', accounts[0]);

    const contract = await new web3.eth.Contract(JSON.parse(compiledCreator.interface)) //interface is ABI passed in as JS object
        .deploy({data: '0x' + compiledCreator.bytecode})
        .send({gas: '4000000',from: accounts[0]});


    console.log('Contract deployed to ', contract.options.address);

};

deploy();
