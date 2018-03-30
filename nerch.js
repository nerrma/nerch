const SHA256 = require('crypto-js/sha256');
class Address{
    constructor(username, index){
        this.publicKey = this.hash(username);
        this.privateKey = this.hash(this.publickey); 
        this.index = index;
    }
    hash(obj){
        return SHA256(obj).toString();
    }
}
class Addresses{
    constructor(){
        this.chain = [];
        this.i = 0; 
    }
    hash(obj){
        return SHA256(obj).toString();
    }
    newAddress(name){
        this.chain.push(new Address(name, this.i));
        this.i++;
    }
    search(publickey){
        for(this.i = 0; this.i < this.chain.length; this.i++){
            if(this.chain[this.i].publicKey == publickey){
                return this.chain[this.i].index; 
            }
        }
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
        this.blocksize = 5;
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
        if(this.getBalanceOfAddress(Transaction.from.publicKey) <= 0){
            return false;
        }
        else if(this.getBalanceOfAddress(Transaction.from.publicKey) < 0){
            if(this.pendingtrans.length < this.blocksize){
                this.pendingtrans.push(Transaction);
            }
            else{
                this.hold.push(Transaction);
            }
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
let address = new Addresses();

address.newAddress('men');
address.newAddress('mmm');
// console.log(address.chain);
coin.createTransaction(new Transaction('08e3c4c91ca5c58e479ea699df7b1a7e3743831ac17b27e1e967c7d74f41df23', '8b7293f6dd93853c83bf8c87ec5349a41789fa166a9431f108edb538e6fd82fd', 6));
coin.minePendingTransactions('miner');
console.log(coin.getBalanceOfAddress('8b7293f6dd93853c83bf8c87ec5349a41789fa166a9431f108edb538e6fd82fd'));
