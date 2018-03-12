const SHA256 = require('crypto-js/sha256');
class Address{
    constructor(pk){
        let block = new Block();
        this.addressChain = [];
        this.public = this.addressHash();
    }
    createNewAddress(){
        this.addressChain.push(new Address(this.addressChain.length));
    }
    addressHash(){
        return SHA256(this.pk).toString();
    }
}

class Transaction{
    constructor(to, from, amount){
        this.to = to;
        this.from = from;
        this.amount = amount;
    }
}
class Block{
    constructor(date, info, prevHash = ''){
        this.date = date;
        this.info = info;
        this.prevHash = prevHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    calculateHash(){
            return SHA256(this.date + this.info + this.prevHash + this.nonce).toString();
    }
    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
    console.log("Block mined: " + this.hash);
    console.log("Info: " + this.info);
    }
}
class Blockchain{
    constructor(){
        this.chain = [this.createGensisBlock()];
        this.pendingtrans = [];
        this.difficulty = 2;
    }
    createGensisBlock(){
        return new Block(Date.now(), "First block", null);
    }
    addBlock(info){
        this.info = info;
        let block = new Block(Date.now(), info, this.chain[this.chain.length - 1].calculateHash());
        block.mineBlock(this.difficulty);
        this.chain.push(block);
    }
    createTransaction(Transaction){
        this.pendingtrans.push(Transaction);
    }
    generateBlock(blockno){
        this.blockno = blockno;
        this.int = 1;
        while(this.int <= blockno){
            this.int++;
            this.addBlock();
        }
    }
}

let coin = new Blockchain();
let address = new Address();
coin.addBlock(3);
console.log();
