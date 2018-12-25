var HeroAsset = artifacts.require('token/mycryptoheroAssetes/HeroAsset')
var Bazaaar = artifacts.require('Bazaaar')

contract('Test Hero', async function(accounts) {
  
    const PRICE = 1000000000;

    const HEROID1 = 40090001;
    const HEROID2 = 40090002;
    var heroAsset;

    it('Mint initial token', async function() {
      heroAsset = await HeroAsset.new();   
      await heroAsset.mint(accounts[0], HEROID1);
      await heroAsset.mint(accounts[0], HEROID2);
      assert.equal(await heroAsset.balanceOf(accounts[0]), 2);
      assert.equal(await heroAsset.ownerOf(HEROID1), accounts[0]);
    })

    it('whitelist', async function() {
        bazaaar = await Bazaaar.deployed();       
        console.log("Address:" + bazaaar.address) 
        await bazaaar.whitelist(heroAsset.address, true);
        assert.equal(await bazaaar.whitelisted(heroAsset.address), true);                
    })

    /*
    it('sell', async function() {
        bazaaar = await Bazaaar.deployed();
        await heroAsset.approve(bazaaar.address, HEROID1);
        await bazaaar.sell(heroAsset.address, HEROID1, PRICE);
        items =  await bazaaar.items(heroAsset.address, HEROID1)
        assert.equal(await heroAsset.ownerOf(HEROID1), bazaaar.address);        
        assert.equal(items[0], accounts[0]);
        assert.equal(items[1], PRICE);
        assert.equal(items[2], true);
    })    

    it('purchase', async function() {
        bazaaar = await Bazaaar.deployed();
        await bazaaar.purchase(heroAsset.address, HEROID1, {from: accounts[1], value: PRICE});
        assert.equal(await heroAsset.ownerOf(HEROID1), accounts[1]);
    })    

    it('cancel', async function() {
        bazaaar = await Bazaaar.deployed();
        await heroAsset.approve(bazaaar.address, HEROID1, {from: accounts[1]});
        await bazaaar.sell(heroAsset.address, HEROID1, PRICE, {from: accounts[1]});
        await bazaaar.cancel(heroAsset.address, HEROID1, {from: accounts[1]});
        assert.equal(await heroAsset.ownerOf(HEROID1), accounts[1]);        
    })  
    */     

})