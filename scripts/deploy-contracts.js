const hre = require("hardhat");
const util = require("util");
const { BigNumber } = require("ethers");

const TestPrescription = {
  diagnosis: "Lorem ipsum dolor sit amet,a",
  medication: "consectetuer adipiscing elit.",
  dosage: "BAenean.",
};
console.log(
  (
    TestPrescription.diagnosis +
    TestPrescription.medication +
    TestPrescription.dosage
  ).length
);

async function main() {
  const [mediator, registrator, doctor, pharmacist, pacient] =
    await ethers.getSigners();

  console.log("mediator", mediator.address);
  console.log("registrator", registrator.address);
  console.log("doctor", doctor.address);
  console.log("pharmacist", pharmacist.address);
  console.log("pacient,", pacient.address);

  console.log("\nDeploying contracts with the account:", mediator.address);
  console.log("This address will be the default mediator");

  const RegistrationBase = await ethers.getContractFactory("RegistrationBase");
  const registrationBase = await RegistrationBase.deploy(mediator.address);
  await registrationBase.deployed();
  console.log("\nRegistrationBase deployed to:", registrationBase.address);

  const PrescriptionContract = await hre.ethers.getContractFactory(
    "PrescriptionContract"
  );
  const prescriptionContract = await PrescriptionContract.deploy(
    registrationBase.address
  );
  await prescriptionContract.deployed();
  console.log(
    "\nPrescriptionContract deployed to:",
    prescriptionContract.address
  );

  const t1 = await registrationBase
    .connect(mediator)
    .registerRegistrator(registrator.address);

  const t2 = await registrationBase
    .connect(registrator)
    .registerDoctor(doctor.address);

  const t3 = await registrationBase
    .connect(registrator)
    .registerPharmacist(pharmacist.address);

  const t4 = await prescriptionContract
    .connect(doctor)
    .createPrescription(pacient.address, TestPrescription);

  const r = await t4.wait();

  const prescriptionHash = r.events[0].args.phash;
  const t5 = await prescriptionContract
    .connect(pharmacist)
    .redeemPrescription(prescriptionHash);

  await Promise.all([
    printTransaction(t1),
    printTransaction(t2),
    printTransaction(t3),
    printTransaction(t4),
    printTransaction(t5),
  ]);
}

async function printTransaction(transaction) {
  const r = await transaction.wait();
  //console.log(JSON.stringify(r, null, 4));
  const eventName = r.events[0].event;
  const gashex = r.gasUsed;

  console.log(eventName + "  " + gashex);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
