const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Tasks", function () {
  it("Should return new list of tasks and test the only owner" , async function () {
    const [signer, other] = await ethers.getSigners();
    const Main_contract = await ethers.getContractFactory(
      "MainContract",
      signer
    );
    const main_contract = await Main_contract.deploy();
    await main_contract.deployed();

    const set_task_tx = await main_contract.add_liste_de_tache("ab");
    await set_task_tx.wait();
    expect(await main_contract.get_liste_de_taches()).to.deep.equal(["ab"]);
    await expect(
      main_contract.connect(other).add_liste_de_tache("b")
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });
});

describe("Tasks", function () {
  it("Should return delete correctly", async function () {
    const [signer, other] = await ethers.getSigners();
    const Main_contract = await ethers.getContractFactory(
      "MainContract",
      signer
    );
    const main_contract = await Main_contract.deploy();
    await main_contract.deployed();

    const set_task_tx = await main_contract.add_liste_de_tache("ab");
    await set_task_tx.wait();
    const set_task_tx1 = await main_contract.add_liste_de_tache("ac");
    await set_task_tx1.wait();
    const set_task_tx2 = await main_contract.delete_liste_de_tache(0);
    await set_task_tx2.wait();
    expect(await main_contract.get_liste_de_taches()).to.deep.equal(["ac"]);
  });
});

describe("Tasks", function () {
  it("Should return delete correctly", async function () {
    const [signer, other] = await ethers.getSigners();
    const Main_contract = await ethers.getContractFactory(
      "MainContract",
      signer
    );
    const main_contract = await Main_contract.deploy();
    await main_contract.deployed();

    const set_task_tx = await main_contract.add_liste_de_tache("ab");
    await set_task_tx.wait();
    const set_task_tx1 = await main_contract.add_liste_de_tache("ac");
    await set_task_tx1.wait();
    const set_task_tx2 = await main_contract.modify_liste_taches("yassine",0);
    await set_task_tx2.wait();
    expect(await main_contract.get_liste_de_taches()).to.deep.equal(["yassine","ac"]);
  });
});
