import "./App.css";
import Sidebar from "./components/Sidebar";
import Web3 from "web3";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

import {
  FUN_LOTTERY_ABI,
  FUN_LOTTERY_ADDRESS,
} from "./smartcontract/funlottery";

import { FUN_COIN_ADDRESS, FUN_COIN_ABI } from "./smartcontract/funcoin";
import { provider } from "./smartcontract/networkid";

function App() {
  const [address, setAddress] = useState([]);
  const [approved, setApproved] = useState(false);
  const [userGainValue, setUserGainValue] = useState(0);

  const connectToMetaMask = async () => {
    if (address.length === 0) {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          updateAddress();
        } catch (err) {
          console.log(err);
        }
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        updateAddress();
      } else {
        alert(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
    } else {
      alert("Already Connected");
    }
  };

  const updateAddress = async () => {
    const web3 = window.web3;

    const web33 = new Web3(provider);

    const contractFunLottery = new web33.eth.Contract(
      FUN_LOTTERY_ABI,
      FUN_LOTTERY_ADDRESS
    );

    const accounts = await web3.eth.getAccounts();

    if (accounts !== undefined) {
      localStorage.setItem("accounts", accounts);
      setAddress(accounts);

      //user gain here

      if (accounts.length !== 0) {
        const userGainer = await contractFunLottery.methods
          .userGain(accounts[0])
          .call();
        setUserGainValue(userGainer / 100000000);
      }
    }
  };

  useEffect(() => {
    if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      updateAddress();
    }
  }, []);

  const approvefromWeb3 = async () => {
    console.log(Web3.givenProvider, "Web3.givenProvider");
    const web3 = new Web3(Web3.givenProvider);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      FUN_COIN_ADDRESS,
      FUN_COIN_ABI,
      signer
    );

    const accounts = await web3.eth.getAccounts();

    if (accounts.length > 0) {
      const balance = await contract.balanceOf(accounts[0]);

      if (balance.toNumber() === 0) {
        alert(
          "Fun Coupons Not Available, first you should get FUNC in the exchange to play"
        );
      } else {
        const transaction = await contract.approve(
          FUN_LOTTERY_ADDRESS,
          balance.toNumber()
        );
        if (!!transaction.hash) {
          setApproved(true);
        }
      }
    }
  };

  return (
    <div>
      <Sidebar
        onConnectWithMetamask={connectToMetaMask}
        approvefromWeb3={approvefromWeb3}
        address={address}
        approved={approved}
        userGainValue={userGainValue}
      />
    </div>
  );
}

export default App;
