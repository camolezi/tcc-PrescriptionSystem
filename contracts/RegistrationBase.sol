// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract RegistrationBase is AccessControl {
    bytes32 public constant DOCTOR = keccak256("DoctorRole");
    bytes32 public constant PHARMACIST = keccak256("PharmacistRole");
    bytes32 public constant REGISTRATOR = keccak256("RegistratorRole");
    bytes32 public constant MEDIATOR = keccak256("MediatorRole");

    constructor(address mediator) {
        _setupRole(MEDIATOR, mediator);
        _setRoleAdmin(MEDIATOR, MEDIATOR);

        _setRoleAdmin(REGISTRATOR, MEDIATOR);

        _setRoleAdmin(DOCTOR, REGISTRATOR);
        _setRoleAdmin(PHARMACIST, REGISTRATOR);
    }

    function isDoctor(address account) public view returns (bool) {
        return hasRole(DOCTOR, account);
    }

    function isPharmacist(address account) public view returns (bool) {
        return hasRole(PHARMACIST, account);
    }

    function isRegistrator(address account) public view returns (bool) {
        return hasRole(REGISTRATOR, account);
    }

    function isMediator(address account) public view returns (bool) {
        return hasRole(MEDIATOR, account);
    }

    function registerDoctor(address account) public {
        grantRole(DOCTOR, account);
    }

    function registerMediator(address account) public {
        grantRole(MEDIATOR, account);
    }

    function registerRegistrator(address account) public {
        grantRole(REGISTRATOR, account);
    }

    function registerPharmacist(address account) public {
        grantRole(PHARMACIST, account);
    }
}
