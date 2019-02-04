App = {
  web3Provider: null,
  contracts: {},
  account: 0x0,
  metamaskCounter: 0,

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

  storeRecord: function(pps, encryptedRecord){
    // console.log(typeof App.contracts.MedicalRecordContract);
    App.contracts.MedicalRecordContract.deployed().then(function(instance) {
      return instance.storeMedicalRecord(pps, encryptedRecord, {
        from: App.account,
        gas: 5000000
      });
    }).then(function(result) {

      console.log(result);
      console.log("hi");
    }).catch(function(err) {
      console.error(err);
    });
  },

   retrieveRecord: function(pps){
    let numberOfRecords=0;
    let instanceOfContract = null;
    let decryptedRecords = [];
    let obj = {};
    let record = {};

    App.contracts.MedicalRecordContract.deployed().then((instance) => {
      //when retrieving the record.. need pass the ethereum address of user and use that in the query to the trust server to check whether that user has access....
      //its a key distribution service ... put key in the service, and says who can have access.. if u request and have access then give the secret key...
      //this ensures theres a trust between the gp and patient.
      instanceOfContract = instance;
      instanceOfContract.getNumberOfRecords().then((result) => {
        numberOfRecords = result.c[0];
      }).then(() => {
        let testArr = [];
        for(let i=1; i<=numberOfRecords;i++) {
          testArr[i] = instanceOfContract.retrieveMedicalRecord(i);
        }
        return testArr
      }).then(async (result) => {
        result.shift();
        for (let i = 0; i < result.length; i++) {
          result[i].then((result) => {
            result.shift();
            return result
          }).then((medicalRecord) => {
            obj.ppsNumber = pps;

            //only decrypt the records if the pps is the same
            if (pps === medicalRecord[0]) {
              obj.encryptedRecord = medicalRecord[1];

              // decrypt medical record
              fetch('http://localhost:8000/patients/decryptRecord', {
                method: 'POST',
                mode: 'cors',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj)
              }).then((response) => {
                response.json().then((record) => {


                  let list = document.getElementById("recordsUL");
                  // each record is a decrypted record
                  let entry = document.createElement('li');
                  let name = document.createElement('a');

                  name.appendChild(document.createTextNode(record.date));
                  entry.appendChild(name);
                  list.appendChild(entry);


                  console.log(record);
                  // decryptedRecords.push(record);
                })
              }).catch(err => {
                console.log(err)
              });
            }
          });
        }

        // console.log(await record);

      })
    }).catch((err) => {
      console.error(err);
    });

    // return decryptedRecords;
  }

};

$(function() {
  $(window).on('load', function() {
  // $(window).load(function() {
    App.init();
  });
});
