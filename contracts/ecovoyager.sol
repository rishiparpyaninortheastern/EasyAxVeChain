// SPDX-License-Identifier: GPL-3.0-only
// This is a PoC to use the staking precompile wrapper as a Solidity developer.
pragma solidity ^0.8.0;

contract EcoTraveler {

    address public owner;

    // Badge Levels
    enum BadgeLevel {None, Bronze, Silver, Gold, Platinum }
    
    // Structure for each listing
    struct ecoListing {
        uint256 ecoScore;
        address payable owner;
        bool isActive;
        uint256 price;
    }
    struct Brand {
        string name;
        bool exist;
    }
    struct MerchType {
        address payable brand;
        BadgeLevel level;
        uint256 price;
        string rawMaterial;
        uint256[] merchs;
        bool exist;
    }
    struct Merch{
        // MerchType mtype;
        string owner;
        address ownerAddress;
        bool exist;
        uint256 mtype;
    }
    
    
    // struct User {
    //     BadgeLevel badge;
    //     uint256 fund;
    //     bool exist;
    // }
    
    // Mapping of listingId to its attributes
    mapping(uint256 => ecoListing) public listings;
    mapping(uint256 => MerchType) public merch;
    mapping(uint256 => Merch) public merchOwned;
    mapping(address => Brand) public brands;
    // User's carbon-credit balance
    mapping(address => uint256) public ecoScore;

    // mapping (address => User) public users;


    // Events
    event Booking(address indexed user, uint256 indexed listingId, uint256 reward);
    event Bought(address indexed user, uint256 indexed merchId, uint256 amount);
    event Transferred(address indexed oldOwner, address indexed newOwner);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }
    modifier onlyBrand() {
        require(brands[msg.sender].exist, "Not an established Brand");
        _;
    }
    constructor() {
        owner = msg.sender;
    }

    // Owner can add or modify listings
    function addListing(uint256 _listingId, uint256 _ecoScore, address payable _owner, uint256 _price) external onlyOwner {
        listings[_listingId] = ecoListing(_ecoScore, _owner, true, _price);
    }
    function hideListing(uint256 _listingId) external onlyOwner {
        require(listings[_listingId].isActive, "listing is already inactive");
        listings[_listingId].isActive = false;
    }
    function addBrand(address brandAddress, string memory name) external onlyOwner {
        brands[brandAddress] = Brand(name, true);
    }
    function createMerchType(uint256 _merchTypeId, BadgeLevel level, string memory raw_material, uint256 price )external onlyBrand{
        merch[_merchTypeId] = MerchType(payable(msg.sender),level, price, raw_material, new uint256[](0), true);
    }
    function addMerch(uint256 _merchId, uint256 merchType )external onlyBrand{
        require(merch[merchType].exist, "Please create merch type first");
        merch[merchType].merchs.push(_merchId);
    }

    //Users functions here

    // function addFund() external payable {
    //     if (users[msg.sender].exist){
    //         users[msg.sender].fund += msg.value;
    //     }else {
    //         users[msg.sender] = User(BadgeLevel.Bronze, msg.value, true);
    //     }
    // }
    function myBadgeLevel(address _user) external view returns (BadgeLevel) {
        return whatBadgeLevel(_user);
        // Add conditions for other badge levels accordingly
    }
    // Users can book a listing
    function bookListing(uint256 _listingId) external payable{
        require(listings[_listingId].isActive, "Listing not active");
        require(msg.value == listings[_listingId].price, "Sorry you are sending wrong amount");
        listings[_listingId].owner.transfer(msg.value);
        // Calculate reward based on ecoScore
        uint256 reward = calculateReward(listings[_listingId].ecoScore, msg.value);
        ecoScore[msg.sender] += reward;

        emit Booking(msg.sender, _listingId, reward);
    }

   function buyMerch(uint256 _merchId, string memory name) external payable {
        require(merch[_merchId].exist, "Merchandise not available");
        require(merch[_merchId].merchs.length > 0, "Merchandise not available");
        require(msg.value == merch[_merchId].price, "Incorrect amount sent");
        require(whatBadgeLevel(msg.sender) == merch[_merchId].level, "Not eligible for this merchandise");

        // Set a default name if 'name' is not provided
        if (bytes(name).length == 0) {
            name = "anonymous";
        }

        // Transfer funds to the brand's address
        merch[_merchId].brand.transfer(msg.value);

        // Add the purchased merchandise to the caller's owned merch
        uint256 index = merch[_merchId].merchs.length - 1;
        uint256 purchasedMerchId = merch[_merchId].merchs[index];
        merchOwned[purchasedMerchId] = Merch(name, msg.sender, true, _merchId);

        // Remove the purchased merchandise from the available list
        merch[_merchId].merchs.pop();

        // Deduct ecoScore based on merchandise level
        uint256 amount = uint256(merch[_merchId].level) * 500;
        ecoScore[msg.sender] -= amount;
        emit Bought(msg.sender, purchasedMerchId, amount);
    }


    function transferOwner(uint256 _merchId, string memory newOwner, address newaddress) external {
        require(merchOwned[_merchId].exist, "unknown merch id");
        merchOwned[_merchId].owner = newOwner;
        merchOwned[_merchId].ownerAddress = newaddress;
        emit Transferred(msg.sender, newaddress);
    }

    // Calculate reward based on ecoScore (You can update the logic as required)
    function calculateReward(uint256 _ecoScore, uint money) internal pure returns (uint256) {
        return (_ecoScore * money) / 10; 
    }

    // Check and update the badge level based on carbonCredits
    function whatBadgeLevel(address _user) internal view returns (BadgeLevel){
        if (ecoScore[_user] >= 500) {
            return BadgeLevel.Bronze; // example for the next level
        }else if (ecoScore[_user] >= 1000) {
            return BadgeLevel.Silver; // example for the next level
        }else if (ecoScore[_user] >= 1500) {
            return BadgeLevel.Gold; // example for the next level
        }else if (ecoScore[_user] >= 2000) {
            return BadgeLevel.Platinum; // example for the next level
        }
        return BadgeLevel.None;
        // Add conditions for other badge levels accordingly
    }

}