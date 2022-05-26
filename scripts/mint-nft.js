require("dotenv").config();

const {API_URL,PRIVATE_KEY,PUBLIC_KEY} = process.env;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/MyNFT.sol/myNFT.json");

const contractAddress = "0x75c1ae42Fa3Ba9bB91717f2d228762c96C553e24";

const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI){
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY,'latest');

    const tx = {
        'from': PUBLIC_KEY,
        'to': contractAddress,
        'nonce': nonce,
        'gas': 1000000,
        'maxPriorityFeePerGas':10999999997,
        'data': nftContract.methods.mintNFT(PUBLIC_KEY,tokenURI).encodeABI()
    };
    const signTX = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    const transcationReceipt = await web3.eth.sendSignedTransaction(signTX.rawTransaction);

    console.log(`Transaction receipt : ${JSON.stringify(transcationReceipt)}`);
};

mintNFT("https://gateway.pinata.cloud/ipfs/QmUFJEPPAqdxtyxT8hrKESLtfaNvy9CQMmdpm8RNiNHMmZ")
