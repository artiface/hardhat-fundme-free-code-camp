const { getNamedAccounts, ethers, network } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");
const { assert, expect } = require("chai");

developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", async function () {
          let fundMe;
          let deployer;
          const sendValue = ethers.utils.parseEther("0.1"); //1 ETH

          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer;
              fundMe = await ethers.getContract("FundMe", deployer);
          });

          it("allows people to fund and withdraw", async function () {
              await fundMe.fund({ value: sendValue });

              const withdrawTx = await fundMe.withdraw();
              await withdrawTx.wait(2);

              const endingBal = await fundMe.provider.getBalance(
                  fundMe.address
              );

              assert.equal(endingBal.toString(), "0");
          });
      });
