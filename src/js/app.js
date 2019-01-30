//for sample medical record contract
App = {
  web3Provider: null,
  contracts: {},
  account: 0x0,

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // initialize web3
    if(typeof web3 !== 'undefined') {
      //reuse the provider of the Web3 object injected by Metamask
      App.web3Provider = web3.currentProvider;
    } else {
      console.log("bye");
      //if metamask is not enabled..
      //create a new provider and plug it directly into our local node
      // App.web3Provider = new Web3('http://localhost:8545');
      //https://ropsten.infura.io/v3/7777dae91b0642888389c02a139b1baf
      App.web3Provider = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/7777dae91b0642888389c02a139b1baf'));

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
    // console.log(typeof App.contracts.MedicalRecordContract);
    App.contracts.MedicalRecordContract.deployed().then(function(instance) {
      // console.log("worked: " + instance);
      //contract sends patient pps, checks wallet of gp
      //patient trust controller needed.. need to add trust and one to delete trust.. get the trusted
      return instance.storeMedicalRecord(pps, encryptedRecord, { //calling function and passing my arguments
        from: App.account,
        gas: 5000000
      });
    }).then(function(result) {
      console.log(result);
    }).catch(function(err) {
      console.error(err);
    });
  },

  getValue: function(){
    let obj = {};
    let results = [];
    let numberOfRecords=0;
    let instanceOfContract = null;

    App.contracts.MedicalRecordContract.deployed().then(function(instance) {
      //when retrieving the record.. need pass the ethereum address of user and use that in the query to the trust server to check whether that user has access....
      //its a key distribution service ... put key in the service, and says who can have access.. if u request and have access then give the secret key...
      //this ensures theres a trust between the gp and patient.
      instanceOfContract = instance;
      instanceOfContract.getNumberOfRecords().then(function(result){
        numberOfRecords = result;
        console.log("num of records: "+numberOfRecords);
      }).catch(function(err){
        console.log(err);
      });

      return instanceOfContract.retrieveMedicalRecord(1);
    }).then(function(result) {
      console.log("result: "+result[1]);
    }).then(function() {
      console.log("in here m8");
    }).catch(function(err) {
      console.error(err);
    });



    // App.contracts.MedicalRecordContract.deployed().then(function(instance) {
    //   for(let i=1; i<=numberOfRecords; i++){
    //     //get each individual record, create obj and store in results array.
    //     instance.retrieveMedicalRecord(i).then(function (record) {
    //       console.log(record);
    //       obj.id = record[0];
    //       obj.patientPPS = record[1];
    //       obj.encryptedRecord = record[2];
    //       console.log("id: " + obj.id + ", pps: "+ obj.patientPPS + ", record: " + obj.encryptedRecord);
    //       results.push(obj);
    //       console.log("results array: "+results);
    //     });
    //   }
    // }).then(function(result){
    //   console.log(result)
    // }).catch(function(error){
    //   console.log(error)
    // });

  }

};

$(function() {
  $(window).on('load', function() {
  // $(window).load(function() {
    App.init();
  });
});
