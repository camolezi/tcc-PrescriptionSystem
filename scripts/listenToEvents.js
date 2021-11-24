const { ethers, BigNumber } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:30990");
// provider.on("block", (blockNumber) => {
//   console.log(blockNumber);
// });

// provider.on({}, (blockNumber) => {
//   console.log(blockNumber);
// });
async function main() {
  const logs = await provider.getLogs({ fromBlock: 0 });

  console.log(JSON.stringify(logs, null, 4));

  //   logs.forEach(async ({ transactionHash }) => {
  //     const transacitonLog = await provider.getTransaction(transactionHash);
  //     console.log(JSON.stringify(transacitonLog, null, 4));
  //   });
}

//main();

["0xbc56", "0xbc2a", "0xbc40", "0x02c65c", "0x6c5e"].forEach((value, index) => {
  console.log(value, BigNumber.from(value).toString());
});
