// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "contracts/RegistrationBase.sol";
import "hardhat/console.sol";

contract PrescriptionContract {
    RegistrationBase register;

    struct Prescription {
        string diagnosis;
        string medication;
        string dosage;
    }

    constructor(address registerAddress) {
        register = RegistrationBase(registerAddress);
    }

    event Created(
        bytes32 indexed phash,
        address indexed patient,
        address indexed doctor,
        Prescription prescription
    );

    event Redeemed(bytes32 indexed phash);

    /// Your address does not have the required role
    error NotAuthorized();

    modifier isDoctor(address incomingAddress) {
        if (!register.isDoctor(incomingAddress)) revert NotAuthorized();
        _;
    }

    modifier isPharmacist(address incomingAddress) {
        if (!register.isPharmacist(incomingAddress)) revert NotAuthorized();
        _;
    }

    function createPrescription(
        address patientAddress,
        Prescription calldata prescription
    ) public isDoctor(msg.sender) {
        bytes32 prescriptionHash = keccak256(
            abi.encode(
                prescription,
                patientAddress,
                msg.sender,
                block.timestamp
            )
        );
        emit Created(
            prescriptionHash,
            patientAddress,
            msg.sender,
            prescription
        );
    }

    function redeemPrescription(bytes32 prescriptionHash)
        public
        isPharmacist(msg.sender)
    {
        emit Redeemed(prescriptionHash);
    }
}
