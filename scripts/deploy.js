const { ethers } = require("hardhat");

async function main(){
    const MyNFT = await ethers.getContractFactory("myNFT");

    const myNFT = await MyNFT.deploy();

    console.log("Contract Deployed to address : ", myNFT.address);
}

main()
    .then(()=> process.exit(0))
    .catch( err => {
        console.error(err);
        process.exit(1);
    });