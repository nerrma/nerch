const SHA256 = require('crypto-js/sha256');
class Address{
    constructor(){
        this.addressChain = [];
        this.number = this.addressChain.length;
        this.hash = this.publicHash();
    }
    createNewAddress(){
        this.addressChain.push(new Address(this.number));
    }
    publicHash(){
        return SHA256(this.number).toString();
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
    }
}
class Blockchain{
    constructor(){
        this.chain = [this.createGensisBlock()];
        this.pendingtrans = [];
        this.difficulty = 2;
        this.minereward = 10;
    }
    createGensisBlock(){
        return new Block(Date.now(), "First block", null);
    }
    minePendingTransactions(mineaddress){
        let block = new Block(Date.now(), this.pendingtrans);
        block.mineBlock(this.difficulty);
        this.chain.push(block);
        this.pendingtrans[new Transaction(null, mineaddress, this.minereward)];
    }

    getBalanceOfAddress(address){
        let balance = 0;
        
        for(const block of this.chain){
            for(const trans of block.info){
                if(trans.from === address){
                    balance -= trans.amount;
                }
                if(trans.to === address){
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }
    createTransaction(Transaction){
        this.pendingtrans.push(Transaction);
    }
    getLastestBlock(){
        return this.chain[this.chain.length - 1];
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

coin.createTransaction(new Transaction('address1', 'address2', 3));
coin.minePendingTransactions('mine');
console.log(coin.getBalanceOfAddress('mine'));

