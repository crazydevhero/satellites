var express = require('express');
var bodyParser = require('body-parser');
const router = express.Router();
const axios = require('axios')
var url = require('url');
const admin = require('firebase-admin');
var serviceAccount = require('../.serviceAccountKey.json');

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io"));

const contractAddress = "0x273f7f8e6489682df756151f5525576e322d51a3"
const contractABI = [{"constant":true,"inputs":[{"name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"mintingFinished","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"isPauser","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"HERO_TYPE_OFFSET","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"mintHeroAsset","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"},{"name":"tokenURI","type":"string"}],"name":"mintWithTokenURI","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renouncePauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_contractType","type":"uint16"},{"name":"_supplyLimit","type":"uint16"}],"name":"setSupplyLimit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"finishMinting","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"addPauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_contractType","type":"uint16"}],"name":"getSupplyLimit","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"addMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenURIPrefix","type":"string"}],"name":"setTokenURIPrefix","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"isMinter","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"tokenURIPrefix","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"PauserAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"PauserRemoved","type":"event"},{"anonymous":false,"inputs":[],"name":"MintingFinished","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"MinterAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"MinterRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":true,"name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"approved","type":"address"},{"indexed":true,"name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"operator","type":"address"},{"indexed":false,"name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"}]
const tokenURIPrefix = "https://www.mycryptoheroes.net/metadata/hero/"
const contract = new web3.eth.Contract(contractABI, contractAddress);

var bazaaarAddress = "0xaA64dd8e189b067A82Ea66C523CdDA19F6f0E9e3"
var bazaaarABI = [{"constant": true,"inputs": [{"name": "","type": "address"},{"name": "","type": "uint256"}],"name": "items","outputs": [{"name": "seller","type": "address"},{"name": "price","type": "uint256"},{"name": "exist","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "account","type": "address"}],"name": "isSigner","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "whitelisted","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "renounceSigner","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "account","type": "address"}],"name": "addSigner","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"anonymous": false,"inputs": [{"indexed": true,"name": "_contract","type": "address"},{"indexed": false,"name": "_status","type": "bool"}],"name": "WhiteList","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "_contract","type": "address"},{"indexed": false,"name": "_tokenId","type": "uint256"},{"indexed": false,"name": "_price","type": "uint256"}],"name": "Sell","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "_contract","type": "address"},{"indexed": false,"name": "_tokenId","type": "uint256"}],"name": "Cancel","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "_contract","type": "address"},{"indexed": false,"name": "_tokenId","type": "uint256"},{"indexed": false,"name": "_price","type": "uint256"}],"name": "Purchase","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "account","type": "address"}],"name": "SignerAdded","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "account","type": "address"}],"name": "SignerRemoved","type": "event"},{"constant": false,"inputs": [{"name": "_contract","type": "address"},{"name": "_status","type": "bool"}],"name": "whitelist","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_contract","type": "address"},{"name": "_tokenId","type": "uint256"},{"name": "_price","type": "uint256"}],"name": "sell","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_contract","type": "address"},{"name": "_tokenId","type": "uint256"}],"name": "cancel","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_contract","type": "address"},{"name": "_tokenId","type": "uint256"}],"name": "purchase","outputs": [],"payable": true,"stateMutability": "payable","type": "function"}]
const bazaaar = new web3.eth.Contract(bazaaarABI, bazaaarAddress);


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

router.post('/set', async function(req, res) {
  
  const param = req.body;
  console.log(param)

  // var owner = await contract.methods.ownerOf(param.id).call()
  // var approved = await contract.methods.getApproved(param.id).call()
  if(true){
  // if(owner == param.maker || approved == bazaaarAddress){
    console.log("test")
    var uri = tokenURIPrefix + param.id
    var response = await axios.get(uri)
    var metadata = response.data;
    var date = new Date();
    var time = date.getTime();

    var data = {
      orderid: param.data,
      maker: param.maker,
      feeRecipient: param.feeRecipient,
      id: param.id,
      price: param.price,
      salt: param.salt,
      data: param.data,
      sig: param.sig,
      metadata: metadata,
      flag: 1,
      timestamp: time,
    };

    orderid = String(param.data)
    var setDoc = db.collection('order').doc(orderid).set(data);
    res.json({status: true})
  }else{
    res.json({status: false})
    console.log(err)
  }
  

});

router.get('/get', async function(req, res) {
  
    var urlParts = url.parse(req.url, true);
    var parameters = urlParts.query;
    console.log(parameters)
    var id = parameters.id;
    id = String(id)

    var cityRef = db.collection('order').doc(id);
    var getDoc = cityRef.get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          console.log('Document data:', doc.data());
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
});

router.get('/getAll', async function(req, res) {
  
  var urlParts = url.parse(req.url, true);
  var parameters = urlParts.query;
  var id = parameters.id;

  db.collection('order').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });

});



module.exports = router;