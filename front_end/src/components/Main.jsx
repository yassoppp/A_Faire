import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Input from "./Input";
import Todolist from "./Todolist";
import ModifyWindow from "./modifyWindow";
export default function Main() {
  const [modified, setModified] = useState(false);
  const [liste_movies, set_list_movies] = useState([]);
  const [id_modified, setIdModified] = useState(0);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  console.log(signer.address);
  const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
  const ABI = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_tache",
          type: "string",
        },
      ],
      name: "add_liste_de_tache",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_index",
          type: "uint256",
        },
      ],
      name: "delete_liste_de_tache",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "get_liste_de_taches",
      outputs: [
        {
          internalType: "string[]",
          name: "",
          type: "string[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "liste_de_taches",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_name",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
      ],
      name: "modify_liste_taches",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const contract = new ethers.Contract(contractAddress, ABI, signer);

  useEffect(() => {
    const requestAccounts = async () => {
      await provider.send("eth_requestAccounts", []);
    };

    const get_list_tache = async () => {
      const liste_tache = await contract.get_liste_de_taches();
      set_list_movies(liste_tache);
    };
    requestAccounts().catch(console.error);
    get_list_tache().catch(console.error);
  }, []);

  const handleDelete = async (id) => {
    const txdelete = await contract.delete_liste_de_tache(id);
    await txdelete.wait();
    const new_tab = await contract.get_liste_de_taches();
    set_list_movies(new_tab);
  };
  const handleModified = (id) => {
    setModified(true);
    setIdModified(id);
  };
  return modified === false ? (
    <div>
      <h1>Wachouganado ?</h1>
      <Input
        set_list_movies={set_list_movies}
        liste_movies={liste_movies}
        contract={contract}
      />
      <Todolist
        liste_movies={liste_movies}
        onDelete={handleDelete}
        onModified={handleModified}
      />
    </div>
  ) : (
    <ModifyWindow
      index={id_modified}
      setModified={setModified}
      liste_movies={liste_movies}
      set_list_movies={set_list_movies}
      contract={contract}
    />
  );
}
