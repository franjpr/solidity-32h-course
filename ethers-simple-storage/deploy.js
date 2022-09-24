const ethers = require("ethers");
const fs = require("fs-extra");
const dotenv = require("dotenv");
dotenv.config(); // NEVER STORE REAL PRIVATE KEYS IN .env file

const ganacheLocalRPCUrl = process.env.NODE_URL;
const ganacheAcc01PrivateKey = process.env.PRIVATE_KEY;

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(ganacheLocalRPCUrl);
  const wallet = new ethers.Wallet(ganacheAcc01PrivateKey, provider);
  // const wallet = new ethers.Wallet.fromEncryptedJsonSync('./encryptedkey.json', proces.env.PW)
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
  const bin = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf-8");
  const contractFactory = new ethers.ContractFactory(abi, bin, wallet); // Deployer code
  console.log("Deploying contract...");
  const contract = await contractFactory.deploy();
  console.log("🚀 ~ contract", contract);
  // const txReceipt = await contract.deployTransaction.wait(1); // Wait for 1 block confirmation
  // console.log("🚀 ~ txReceipt", txReceipt);

  // Deploying a raw tx with data
  // const tx = {
  //   nonce: 1, // Its the number that increases with every tx. Its associated with an unique tx (talking about wallet). If we talk about blockchain mining the nonce is the number used that solve a problem.
  //   // nonce means a number used once
  //   gasPrice: 20000000000,
  //   gasLimit: 1000000,
  //   to: null,
  //   value: 0,
  //   // binary goes here in data
  //   data: "0x608060405234801561001057600080fd5b5061077e806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80632e64cec11461004657806357322f09146100645780636057361d14610080575b600080fd5b61004e61009c565b60405161005b919061017f565b60405180910390f35b61007e6004803603810190610079919061032d565b6100a5565b005b61009a600480360381019061009591906103b5565b61015c565b005b60008054905090565b600160405180604001604052808360ff16815260200184815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000160006101000a81548160ff021916908360ff160217905550602082015181600101908161011e91906105f9565b505050806002836040516101329190610731565b908152602001604051809103902060006101000a81548160ff021916908360ff1602179055505050565b8060008190555050565b6000819050919050565b61017981610166565b82525050565b60006020820190506101946000830184610170565b92915050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610201826101b8565b810181811067ffffffffffffffff821117156102205761021f6101c9565b5b80604052505050565b600061023361019a565b905061023f82826101f8565b919050565b600067ffffffffffffffff82111561025f5761025e6101c9565b5b610268826101b8565b9050602081019050919050565b82818337600083830152505050565b600061029761029284610244565b610229565b9050828152602081018484840111156102b3576102b26101b3565b5b6102be848285610275565b509392505050565b600082601f8301126102db576102da6101ae565b5b81356102eb848260208601610284565b91505092915050565b600060ff82169050919050565b61030a816102f4565b811461031557600080fd5b50565b60008135905061032781610301565b92915050565b60008060408385031215610344576103436101a4565b5b600083013567ffffffffffffffff811115610362576103616101a9565b5b61036e858286016102c6565b925050602061037f85828601610318565b9150509250929050565b61039281610166565b811461039d57600080fd5b50565b6000813590506103af81610389565b92915050565b6000602082840312156103cb576103ca6101a4565b5b60006103d9848285016103a0565b91505092915050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061043457607f821691505b602082108103610447576104466103ed565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026104af7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82610472565b6104b98683610472565b95508019841693508086168417925050509392505050565b6000819050919050565b60006104f66104f16104ec84610166565b6104d1565b610166565b9050919050565b6000819050919050565b610510836104db565b61052461051c826104fd565b84845461047f565b825550505050565b600090565b61053961052c565b610544818484610507565b505050565b5b818110156105685761055d600082610531565b60018101905061054a565b5050565b601f8211156105ad5761057e8161044d565b61058784610462565b81016020851015610596578190505b6105aa6105a285610462565b830182610549565b50505b505050565b600082821c905092915050565b60006105d0600019846008026105b2565b1980831691505092915050565b60006105e983836105bf565b9150826002028217905092915050565b610602826103e2565b67ffffffffffffffff81111561061b5761061a6101c9565b5b610625825461041c565b61063082828561056c565b600060209050601f8311600181146106635760008415610651578287015190505b61065b85826105dd565b8655506106c3565b601f1984166106718661044d565b60005b8281101561069957848901518255600182019150602085019450602081019050610674565b868310156106b657848901516106b2601f8916826105bf565b8355505b6001600288020188555050505b505050505050565b600081905092915050565b60005b838110156106f45780820151818401526020810190506106d9565b60008484015250505050565b600061070b826103e2565b61071581856106cb565b93506107258185602086016106d6565b80840191505092915050565b600061073d8284610700565b91508190509291505056fea264697066735822122050ef60fe93d1e2d73770593182ad4e8104d29d54569b4ee52cb97d191f9a6e7564736f6c63430008110033",
  //   chainId: 1337, // given by ganache
  // };
  // // Signed tx
  // // const signedTxResponse = await wallet.signTransaction(tx);
  // // console.log("🚀 ~ signedTxResponse", signedTxResponse);
  // // send tx
  // const sentTxResponse = await wallet.sendTransaction(tx);
  // await sentTxResponse.wait(1);
  // console.log("🚀 ~ signedTxResponse", sentTxResponse);

  const favNum = await contract.retrieve();
  console.log("🚀 ~ favNum", favNum.toString());
  // 🚀 ~ favNum BigNumber { _hex: '0x00', _isBigNumber: true }
  // Ether deals with big number as strings because js is not safe to operate with very large numbers
  // Details here: https://docs.ethers.io/ethers.js/v3.0/html/notes.html#ieee754
  const txResponse = await contract.store("97");
  const txReceipt = await txResponse.wait(1);
  const updatedFavNum = await contract.retrieve();
  console.log("🚀 ~ updatedFavNum", updatedFavNum.toString());
}

main();