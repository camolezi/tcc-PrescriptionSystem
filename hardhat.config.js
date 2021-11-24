require("@nomiclabs/hardhat-waffle");
require("@openzeppelin/hardhat-upgrades");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

// ---------------------- FOR LOCAL TESTING ONLY ----------------------

//0x1Bd1b7Aee3c6560Bd5236570eA6C1BF7688997E8
const mediator =
  "16821e926768845a696b46082bfc9801c2a36a9384e1303423f995f48cc0bf3a";

//0x521E09F956154f39f0A702c40B1CdD39A94404b5
const registrator =
  "2839c8ceebc2ac2dc13cada79917c1b2c790a6c43080419d28af5e91cdb593c3";

//0x287e938fDB785424850Ccf707C60078BB9F090B3
const doctor =
  "2868d855aa03c5c8b2136758a428c01a1394dba4c4876d3afa0042800aacaf74";

//0xCdbfEb1893765d229C4E90e74c442c25986336B0
const pharmacist =
  "2be7dcc42e25453555dfd1d03f6dff194b2f0838066df19ad898f53acb0126ab";

//0x7dBAa0A032eB42ECddA737AD1672b8e65d97bcC0
const pacient =
  "9c19c8a45fde69e3be16514f22d01bf7d2b2ad6b5f44bd349268b7c1f722f16f";
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    localeth: {
      url: `http://127.0.0.1:30990`,
      accounts: [mediator, registrator, doctor, pharmacist, pacient],
      gasPrice: 0,
    },
    optimism: {
      url: "https://kovan.optimism.io",
      accounts: [mediator, registrator, doctor, pharmacist, pacient],
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com/",
      accounts: [mediator, registrator, doctor, pharmacist, pacient],
    },
  },
};
