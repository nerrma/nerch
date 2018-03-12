const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(date, info, prevHash = ''){
        this.date = date;
        this.info = info;
        this.prevHash = prevHash;
        this.hash = this.calculateHash();
    }
    calculateHash(){
        return SHA256(this.date + this.info + this.prevHash).toString();
    }
}
class Blockchain{
    constructor(){
        this.chain = [this.createGensisBlock()];
    }
    createGensisBlock(){
        return new Block(Date.now(), "First block", null);
    }
    addBlock(info){
        this.info = info;
        this.chain.push(new Block(Date.now(), info, this.chain[this.chain.length - 1].calculateHash()));
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
coin.generateBlock(5);
console.log(coin.chain);