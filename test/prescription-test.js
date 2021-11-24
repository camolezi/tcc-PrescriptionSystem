const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Prescription", function () {
  it("Happy Flow", async function () {
    const PrescriptionContract = await ethers.getContractFactory(
      "PrescriptionContract"
    );
    const RegistrationBase = await ethers.getContractFactory(
      "RegistrationBase"
    );

    const signers = await ethers.getSigners();

    const mediator = signers[0];
    const registrator = signers[1];
    const doctor = signers[2];
    const other = signers[3];
    const pharmacist = signers[4];

    const registration = await RegistrationBase.deploy(mediator.address);
    await registration.deployed();

    await registration.registerRegistrator(registrator.address);
    await registration.connect(registrator).registerDoctor(doctor.address);
    await registration
      .connect(registrator)
      .registerPharmacist(pharmacist.address);

    const prescription = await PrescriptionContract.deploy(
      registration.address
    );

    const createTransaciton = await prescription
      .connect(doctor)
      .createPrescription(other.address, {
        diagnosis: "test",
        medication: "test",
        dosage: "asda",
        additionalInformation: "more info",
      });

    const r = await createTransaciton.wait();

    const prescriptionHash = r.events[0].args.phash;

    await expect(createTransaciton).to.emit(prescription, "Created");

    await expect(
      prescription.connect(pharmacist).redeemPrescription(prescriptionHash)
    ).to.emit(prescription, "Redeemed");
  });
});
