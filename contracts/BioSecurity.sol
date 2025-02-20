// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BioSecurity {
    mapping(string => string) public bioHashes; // Store hashes

    function storeBioHash(string memory userId, string memory hash) public {
        bioHashes[userId] = hash;
    }

    function getBioHash(string memory userId) public view returns (string memory) {
        return bioHashes[userId];
    }
}
