export const contract = {
  owner: null,
  listings: {},
  merch: {},
  merchOwned: {},
  brands: {},
  ecoScore: {},

  BadgeLevel: {
    None: 0,
    Bronze: 1,
    Silver: 2,
    Gold: 3,
    Platinum: 4,
  },

  initialize: function () {
    this.owner = null;
  },

  addListing: function (_listingId, _ecoScore, _owner, _price) {
    this.listings[_listingId] = {
      ecoScore: _ecoScore,
      owner: _owner,
      isActive: true,
      price: _price,
    };
  },

  hideListing: function (_listingId) {
    if (this.listings[_listingId] && this.listings[_listingId].isActive) {
      this.listings[_listingId].isActive = false;
    }
  },

  addBrand: function (brandAddress, name) {
    this.brands[brandAddress] = {
      name: name,
      exist: true,
    };
  },

  createMerchType: function (_merchTypeId, level, raw_material, price) {
    this.merch[_merchTypeId] = {
      brand: null, // To be set by the brand
      level: level,
      price: price,
      rawMaterial: raw_material,
      merchs: [],
      exist: true,
    };
  },

  addMerch: function (_merchId, merchType) {
    if (this.merch[merchType] && this.merch[merchType].exist) {
      this.merch[merchType].merchs.push(_merchId);
    }
  },

  myBadgeLevel: function (_user) {
    return this.whatBadgeLevel(_user);
    // Add conditions for other badge levels accordingly
  },

  bookListing: function (_listingId,user ,msgValue) {
    if (this.listings[_listingId] && this.listings[_listingId].isActive) {
      if (msgValue === this.listings[_listingId].price) {
        this.listings[_listingId].owner = user; // Assuming msg.sender is used
        const reward = this.calculateReward(
          this.listings[_listingId].ecoScore,
          msgValue
        );
        this.ecoScore[user] += reward;
        return reward;
      }
    }
    return 0; // Return 0 if booking failed
  },

  buyMerch: function (_merchId, name, user,msgValue) {
    if (this.merch[_merchId] && this.merch[_merchId].exist) {
      if (
        this.merch[_merchId].merchs.length > 0 &&
        msgValue === this.merch[_merchId].price
      ) {
        if (this.whatBadgeLevel(user) >= this.merch[_merchId].level) {
          if (!name) {
            name = "anonymous";
          }
          this.merch[_merchId].brand = user; // Assuming msg.sender is used
          const index = this.merch[_merchId].merchs.length - 1;
          const purchasedMerchId = this.merch[_merchId].merchs[index];
          this.merchOwned[purchasedMerchId] = {
            owner: name,
            ownerAddress: user,
            exist: true,
            mtype: _merchId,
          };
          this.merch[_merchId].merchs.pop();
          const amount = this.merch[_merchId].level * 500;
          this.ecoScore[user] -= amount;
          return amount;
        }
      }
    }
    return 0; // Return 0 if purchase failed
  },

  transferOwner: function (_merchId, newOwner, newAddress) {
    if (this.merchOwned[_merchId] && this.merchOwned[_merchId].exist) {
      this.merchOwned[_merchId].owner = newOwner;
      this.merchOwned[_merchId].ownerAddress = newAddress;
      return true; // Transfer successful
    }
    return false; // Transfer failed
  },

  calculateReward: function (_ecoScore, money) {
    return (_ecoScore * money) / 10;
  },

  whatBadgeLevel: function (_user) {
    if (this.ecoScore[_user] >= 500) {
      return this.BadgeLevel.Bronze; // example for the next level
    } else if (this.ecoScore[_user] >= 1000) {
      return this.BadgeLevel.Silver; // example for the next level
    } else if (this.ecoScore[_user] >= 1500) {
      return this.BadgeLevel.Gold; // example for the next level
    } else if (this.ecoScore[_user] >= 2000) {
      return this.BadgeLevel.Platinum; // example for the next level
    }
    return this.BadgeLevel.None;
    // Add conditions for other badge levels accordingly
  },
};

 // Initialize the contract

// Example usage:
// EcoTravelerContract.addListing(1, 100, "0xAddress", 10);
// const
