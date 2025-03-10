// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BioSecurity {
    struct User {
        bool isRegistered;
        bytes32 bioHash;
    }

    mapping(address => User) private users;
    address[] private userAddresses; // Store registered users' addresses

    event UserRegistered(address indexed user);
    event BioHashStored(address indexed user, bytes32 bioHash);

    function registerUser() external {
        require(!users[msg.sender].isRegistered, "User already registered");
        users[msg.sender].isRegistered = true;
        userAddresses.push(msg.sender); // Store the new user's address
        emit UserRegistered(msg.sender);
    }

    function storeBioHash(bytes32 _bioHash) external {
        require(users[msg.sender].isRegistered, "User not registered");
        users[msg.sender].bioHash = _bioHash;
        emit BioHashStored(msg.sender, _bioHash);
    }

    function getBioHash(address _user) external view returns (bytes32) {
        require(users[_user].isRegistered, "User not registered");
        return users[_user].bioHash;
    }

    function isUserRegistered(address _user) external view returns (bool) {
        return users[_user].isRegistered;
    }

    function getAllUsers() external view returns (address[] memory) {
        return userAddresses;
    }
}
