//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MainContract is Ownable {
    string[] public liste_de_taches;

    function get_liste_de_taches() public view onlyOwner returns (string[] memory) {
        return liste_de_taches;
    }

    function add_liste_de_tache(string memory _tache)onlyOwner public {
        liste_de_taches.push(_tache);
    }

   function delete_liste_de_tache(uint256 _index) public {
        if(_index==liste_de_taches.length){
            liste_de_taches.pop();
        }else{
        for(uint256 i=_index; i<(liste_de_taches.length)-1;i++){
            liste_de_taches[i]=liste_de_taches[i+1];
        }
        liste_de_taches.pop();
        }
    }
}
