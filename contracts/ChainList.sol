pragma solidity >=0.4.21 <0.6.0;

contract ChainList {
    // state variables
    address seller;
    string name;
    string description;
    uint256 price;

    // constructor
    constructor() public {
        sellArticle("Default article", "This is an article set by default", 1000000000000000000);
    }

    // sell an article
    function sellArticle(string memory _name, string memory _description, uint256 _price) public {
        seller = msg.sender;
        name = _name;
        description = _description;
        price = _price;
    }

    // get an article
    function getArticle() public view returns (
        address _seller,
        string memory _name,
        string memory _description,
        uint256 _price
    ) {
        return(seller, name, description, price);
    }
}