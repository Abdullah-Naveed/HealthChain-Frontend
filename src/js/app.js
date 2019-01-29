//for sample medical record contract
App = {
  web3Provider: null,
  contracts: {},
  account: 0x0,
  // loading: false,

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // initialize web3
    if(typeof web3 !== 'undefined') {
      console.log("hi");
      //reuse the provider of the Web3 object injected by Metamask
      App.web3Provider = web3.eth.currentProvider;
    } else {
      console.log("bye");
      //if metamask is not enabled..
      //create a new provider and plug it directly into our local node
      // App.web3Provider = new Web3('http://localhost:8545');
      App.web3Provider = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
      console.log(App.web3Provider);

    }
    web3 = new Web3(App.web3Provider);

    App.displayAccountInfo();

    return App.initContract();
  },

  displayAccountInfo: function() {
    web3.eth.getCoinbase(function(err, account) {
      if(err === null) {
        App.account = account;
        $('#account').text(account);
        localStorage.setItem("ethAddress", account);
        web3.eth.getBalance(account, function(err, balance) {
          if(err === null) {
            localStorage.setItem("ethBalance", web3.fromWei(balance, "ether"));
            $('#accountBalance').text(web3.fromWei(balance, "ether") + " ETH");
          }
        })
      }
    });
  },

  initContract: function() {
    $.getJSON('/build/contracts/MedicalRecordContract.json', function(medicalRecordContractArtifact) {
      // get the contract artifact file and use it to instantiate a truffle contract abstraction
      App.contracts.MedicalRecordContract = TruffleContract(medicalRecordContractArtifact);
      // set the provider for our contracts
      App.contracts.MedicalRecordContract.setProvider(App.web3Provider);
      // App.contracts.MedicalRecordContract.setProvider(Web3.givenProvider || 'ws://localhost:8546');
      // retrieve the article from the contract
      // return App.reloadArticles();
      return App.displayAccountInfo();
    });
  },

  setValue: function(pps, encryptedRecord){
    App.contracts.MedicalRecordContract.deployed().then(function(instance) {
      console.log(instance);
      //contract sends patient pps, checks wallet of gp
      //patient trust controller needed.. need to add trust and one to delete trust.. get the trusted
      return instance.storeMedicalRecord(pps, encryptedRecord, { //calling function and passing my arguments
        from: App.account,
        gas: 500000
      });
    }).then(function(result) {

    }).catch(function(err) {
      console.error(err);
    });
  },

  getValue: function(){
    let obj = {};
    let results = [];
    let numberOfRecords=0;
    let instanceOfContract;

    App.contracts.MedicalRecordContract.deployed().then(function(instance) {
      //when retrieving the record.. need pass the ethereum address of user and use that in the query to the trust server to check whether that user has access....
      //its a key distribution service ... put key in the service, and says who can have access.. if u request and have access then give the secret key...
      //this ensures theres a trust between the gp and patient.
      instanceOfContract = instance;
      return instanceOfContract.getNumberOfRecords();
    }).then(function(result) {
      numberOfRecords = result;
      console.log("num of records: "+numberOfRecords);
    }).then(function () {

      for(let i=1; i<=numberOfRecords; i++){
        //get each individual record, create obj and store in results array.
        instanceOfContract.retrieveMedicalRecord(i, "06451992Q", "0x8e9f81EFC1C9abF590ABafB6b99910B0B5c133F2").then(function (record) {
          console.log(record);
          obj.id = record[0];
          obj.patientPPS = record[1];
          obj.encryptedRecord = record[2];
          console.log("id: " + obj.id + ", pps: "+ obj.patientPPS + ", record: " + obj.encryptedRecord);
          results.push(obj);
          console.log("results array: "+results);
        });
      }

    }).catch(function(err) {
      console.error(err);
    });

  }

};

$(function() {
  $(window).on('load', function() {
  // $(window).load(function() {
    App.init();
  });
});
