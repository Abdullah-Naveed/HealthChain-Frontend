pragma solidity >=0.4.21 <0.6.0;

//the migration file is used by truffle to track which migration
//scripts have already been executed on each blotching instance.

//the migration folder contains the logic for the deployment process the
//one initial migration the js file deploys the migration contract that truffle interacts with.

contract Migrations {
  address public owner;
  uint public last_completed_migration;

  constructor() public {
    owner = msg.sender;
  }

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }

  function upgrade(address new_address) public restricted {
    Migrations upgraded = Migrations(new_address);
    upgraded.setCompleted(last_completed_migration);
  }
}
