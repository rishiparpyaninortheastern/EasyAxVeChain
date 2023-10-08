// SPDX-License-Identifier: UNLICENSED

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
}
struct Merch{
// MerchType mtype;
string owner;
address ownerAddress;
string rawMaterial;
bool isOwned;
bool exist;
uint256 price;
address payable brand;
BadgeLevel level;
}
// struct User {
// BadgeLevel badge;
// uint256 fund;
// bool exist;
// }
// Mapping of listingId to its attributes
mapping(uint256 => ecoListing) public listings;
mapping(uint256 => Merch) public merch;
mapping(address => Brand) public brands;
// User's carbon-credit balance
mapping(address => uint256) public ecoScore;


// mapping (address => User) public users;


// Mapping of user's badge level
mapping(address => BadgeLevel) public userBadgeLevel;


// Events
event Booking(address indexed user, uint256 indexed listingId, uint256 reward);
event Redeemed(address indexed user, BadgeLevel level, uint256 amount);


modifier onlyOwner() {
require(msg.sender == owner, "Not the contract owner");
_;
}
// modifier onlyOwner() {
// require(brands[msg.sender].exist, "Not a established Brand");
// _;
// }
constructor() {
owner = msg.sender;
}


// Owner can add or modify listings
function addListing(uint256 _listingId, uint256 _ecoScore, address payable _owner, uint256 _price) external onlyOwner {
listings[_listingId] = ecoListing(_ecoScore, _owner, true, _price);
}


function addMerch(uint256 _merchId, BadgeLevel level, string memory raw, uint256 price )external {
merch[_merchId] = Merch("", msg.sender, raw, false, true, price, payable(msg.sender), level);
}


//Users functions here


// function addFund() external payable {
// if (users[msg.sender].exist){
// users[msg.sender].fund += msg.value;
// }else {
// users[msg.sender] = User(BadgeLevel.Bronze, msg.value, true);
// }
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


// Check for badge upgrade
// updateBadgeLevel(msg.sender);


emit Booking(msg.sender, _listingId, reward);
}


function buyMerch(uint256 _merchId, string memory name) external payable {
require(merch[_merchId].isOwned == false, "merch not available");
require(msg.value == merch[_merchId].price, "Sorry you are sending wrong amount");
require(whatBadgeLevel(msg.sender)==merch[_merchId].level, "");
merch[_merchId].isOwned = true;
if (bytes(name).length == 0){
name = "anynomyous";
}
merch[_merchId].brand.transfer(msg.value);
merch[_merchId].owner = name;
merch[_merchId].ownerAddress = msg.sender;
ecoScore[msg.sender] -= (uint256(merch[_merchId].level)) * 500;
}


function transferOwner(uint256 _merchId, string memory newOwner, address newaddress) external {
require(merch[_merchId].exist, "unknown merch id");
merch[_merchId].owner = newOwner;
merch[_merchId].ownerAddress = newaddress;
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


// Redeem tokens for sustainable products. Amount varies per badge level.
function redeemTokens(uint256 amount) external {
require(ecoScore[msg.sender] >= amount, "Insufficient carbon credits");
// For simplicity, we assume Silver level is needed to redeem
require(userBadgeLevel[msg.sender] >= BadgeLevel.Silver, "Insufficient badge level");


ecoScore[msg.sender] -= amount;
emit Redeemed(msg.sender, userBadgeLevel[msg.sender], amount);
}
}

