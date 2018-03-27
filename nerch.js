const SHA256 = require('crypto-js/sha256');
class Address{
    constructor(username){
        this.chain = [];
        this.publicKey = this.hash(username);
        this.privateKey = this.hash(this.publickey); 
    }
    hash(obj){
        return SHA256(obj).toString();
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
    console.log("\nBlock mined: " + this.hash);
    console.log(this.info);
    }
}
class Blockchain{
    constructor(){
        this.chain = [this.createGensisBlock()];
        this.pendingtrans = [];
        this.hold = [];
        this.difficulty = 2;
        this.minereward = 10;
        this.i = 0;
        this.blocksize = 1;
    }
    createGensisBlock(){
        return new Block(Date.now(), "First block", null);
    }
    minePendingTransactions(mineaddress){
            let block = new Block(Date.now(), this.pendingtrans);
            block.mineBlock(this.difficulty);
            this.chain.push(block);
            this.pendingtrans = [new Transaction(mineaddress, null, this.minereward)];
            if(this.checkHold() == true){
               while(this.i < this.hold.length){
                    this.pendingtrans.push(this.hold[this.i]);
                    this.i++;
               }
                this.hold = [];
            }
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
        return ("The balance of " + address + " is " + balance);
    }
    createTransaction(Transaction){
        if(this.pendingtrans.length < this.blocksize){
            this.pendingtrans.push(Transaction);
        }
        else{
            this.hold.push(Transaction);
        }
    }
    getLastestBlock(){
        return this.chain[this.chain.length - 1];
    }
    checkHold(){
        if(this.hold.length > 0){
            return true;
        }
    }
}

let coin = new Blockchain();
let address = new Address();

coin.createTransaction(new Transaction('address1', 'address2', 3));
coin.createTransaction(new Transaction('address1', 'address3', 6));
console.log(coin.hold);
coin.minePendingTransactions('mine');
coin.minePendingTransactions('mine');
