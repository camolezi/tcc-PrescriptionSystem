const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Registration", function () {
  const shouldNotHaveRoles = async (contract, address) => {
    expect(await contract.isMediator(address)).equal(false);
    expect(await contract.isDoctor(address)).equal(false);
    expect(await contract.isRegistrator(address)).equal(false);
    expect(await contract.isPharmacist(address)).equal(false);
  };

  const shouldBeMediator = async (contract, address) => {
    expect(await contract.isMediator(address)).equal(true);
    expect(await contract.isDoctor(address)).equal(false);
    expect(await contract.isRegistrator(address)).equal(false);
    expect(await contract.isPharmacist(address)).equal(false);
  };

  const shouldBeDoctor = async (contract, address) => {
    expect(await contract.isMediator(address)).equal(false);
    expect(await contract.isDoctor(address)).equal(true);
    expect(await contract.isRegistrator(address)).equal(false);
    expect(await contract.isPharmacist(address)).equal(false);
  };

  const shouldBePharmacist = async (contract, address) => {
    expect(await contract.isMediator(address)).equal(false);
    expect(await contract.isDoctor(address)).equal(false);
    expect(await contract.isRegistrator(address)).equal(false);
    expect(await contract.isPharmacist(address)).equal(true);
  };

  const shouldBeRegistrator = async (contract, address) => {
    expect(await contract.isMediator(address)).equal(false);
    expect(await contract.isDoctor(address)).equal(false);
    expect(await contract.isRegistrator(address)).equal(true);
    expect(await contract.isPharmacist(address)).equal(false);
  };

  it("Happy Flow", async function () {
    const RegistrationBase = await ethers.getContractFactory(
      "RegistrationBase"
    );

    const signers = await ethers.getSigners();

    const mediator = signers[0];
    const registrator = signers[1];
    const doctor = signers[2];
    const pharmacist = signers[3];

    const contract = await RegistrationBase.deploy(mediator.address);
    await contract.deployed();

    await shouldBeMediator(contract, mediator.address);
    await shouldNotHaveRoles(contract, registrator.address);
    await shouldNotHaveRoles(contract, doctor.address);
    await shouldNotHaveRoles(contract, pharmacist.address);

    await contract.registerRegistrator(registrator.address);
    await shouldBeRegistrator(contract, registrator.address);

    await contract.connect(registrator).registerDoctor(doctor.address);
    await shouldBeDoctor(contract, doctor.address);

    await contract.connect(registrator).registerPharmacist(pharmacist.address);
    await shouldBePharmacist(contract, pharmacist.address);
  });
});
