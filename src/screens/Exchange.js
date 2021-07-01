import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Select from "../components/Select";

import settings from "../assets/settings.png";
import refresh from "../assets/refresh.png";
import exchangearrow from "../assets/exchangearrow.png";
import {
  EXCHANGE_ABI,
  EXCHANGE_ADDRESS,
} from "../smartcontract/exchangelottery";

import {
  USD_CONTRACT_ABI,
  USD_CONTRACT_ADDRESS,
} from "../smartcontract/usdcontract";

import { ethers } from "ethers";

import Web3 from "web3";

import "./screens.css";
import { provider } from "../smartcontract/networkid";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 500,
    background: "#323159",
    borderRadius: "10px",
    color: "#a2ffe2",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard() {
  const classes = useStyles();

  const [timer, setTimer] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const [fromExchange, setfromExchange] = useState("BNB");
  const [toExchange, settoExchange] = useState("FUNC");
  const [usdRate, setusdRate] = useState(0);
  const [bnbRate, setbnbRate] = useState(0);
  const [inputValue, setinputValue] = useState(0);
  const [outputValue, setoutputValue] = useState(0);
  const [showValue, setshowValue] = useState(false);

  const filterChangeHandler = (selectedValue) => {
    setfromExchange(selectedValue);
    if (fromExchange == "BNB") {
      setshowValue(true);
      setinputValue(0);
      setoutputValue(0);
    } else if (fromExchange == "USD") {
      setshowValue(false);
      setinputValue(0);
      setoutputValue(0);
    }
  };

  const handleChange = (e) => {
    // setinputValue(e.target.value);
    if (fromExchange == "BNB") {
      setinputValue(e.target.value);
      setoutputValue(e.target.value * bnbRate);
    } else if (fromExchange == "USD") {
      setinputValue(e.target.value);
      setoutputValue(e.target.value * usdRate);
    }
  };

  const onBuy = async () => {
    const web3 = new Web3(Web3.givenProvider);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      EXCHANGE_ADDRESS,
      EXCHANGE_ABI,
      signer
    );
    // const network = await web3.eth.net.getId();

    // if (network === 97) {
    //     alert("Cannot Approve with Current Network");
    //   }

    const accounts = await web3.eth.getAccounts();

    if (accounts[0].len !== 0) {
      if (inputValue == 0) {
        alert("Value Cannot be zero", accounts);
      } else {
        if (fromExchange == "BNB") {
          var amount = "" + inputValue * 1000000000000000000;
          const gaslimit = await web3.eth.getBlock("latest").gasLimit;
          let send = web3.eth.sendTransaction({
            from: accounts[0],
            to: EXCHANGE_ADDRESS,
            value: amount,
            gas: gaslimit,
          }); //40002
          console.log("transaction:", send);
        } else if (fromExchange == "USD") {
          var amount = "" + inputValue * 1000000000000000000;
          const transaction = await contract.buyWithUsdc(amount);
          console.log("transaction:", transaction);
        }
      }
    } else {
      alert("Please connect your metamask wallet", accounts);
    }
    // TODO
    // const transaction = await contract.buyWithBnb({ from: accounts[0], to: EXCHANGE_ADDRESS, value:'12'});
    // let send = web3.eth.sendTransaction({from:accounts[0],to:EXCHANGE_ADDRESS, value: web3.utils.toWei('0.5', 'ether'),gas:40002
    // });

    // const transaction = await contract.buyWithBnb();
  };

  const onApprove = async () => {
    const web3 = new Web3(Web3.givenProvider);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      USD_CONTRACT_ADDRESS,
      USD_CONTRACT_ABI,
      signer
    );

    const accounts = await web3.eth.getAccounts();

    if (accounts[0].len !== 0) {
      const balance = await contract.balanceOf(accounts[0]);
      const transaction = await contract.approve(
        EXCHANGE_ADDRESS,
        "" + balance
      );

      console.log("transaction:", transaction);
    }
    ///
  };

  useEffect(() => {
    const getExchangeValuefromEth = async () => {
      const web3 = new Web3(provider);
      const todoList = new web3.eth.Contract(EXCHANGE_ABI, EXCHANGE_ADDRESS);

      const USDRate = await todoList.methods.usdRate().call();

      setusdRate(USDRate);
      const BNBRate = await todoList.methods.bnbRate().call();

      setbnbRate(BNBRate);
      setoutputValue(0);
      setinputValue(0);
    };
    getExchangeValuefromEth();
    //timer logic
    var countDownDate = new Date("Jul 5, 2021 15:37:25").getTime();
    const startTimer = () => {
      // Find the distance between now and the count down date
      var distance = countDownDate - new Date().getTime();
      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimer({
        days,
        hours,
        minutes,
        seconds,
      });
    };
    var set = setInterval(() => {
      startTimer();
    }, 1000);

    return () => {
      clearInterval(set);
    };
  }, []);

  return (
    <div style={{ minHeight: "84.5vh" }}>
      <div className="timer">
        <div>
          <span>{timer.days < 10 ? `0${timer.days}` : timer.days}</span>
          <p>Days</p>
        </div>
        <div>
          <span>{timer.hours < 10 ? `0${timer.hours}` : timer.hours}</span>
          <p>Hours</p>
        </div>
        <div>
          <span>
            {timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes}
          </span>
          <p>Minutes</p>
        </div>
        <div>
          <span>
            {timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}
          </span>
          <p>Seconds</p>
        </div>
      </div>

      <div className="exchangeCard">
        <Card className={classes.root}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={10} spacing={1} container>
                <Grid item xs={12}>
                  <span className="exchangeTitle">
                    Buy FUNC and get ready to play
                  </span>
                </Grid>
                <Grid item xs={12}>
                  <span style={{ fontFamily: "ITCAvant" }}>
                    Trade Tokens in an Instant
                  </span>
                </Grid>
              </Grid>
              <Grid item xs={2} container>
                <Grid item xs={6}>
                  {/* <img src={settings} /> */}
                </Grid>
                <Grid item xs={3}>
                  {/* <img alt="settings" className="exchangeIcon" src={settings} /> */}
                </Grid>
                <Grid item xs={3}>
                  {/* <img alt="refresh" className="exchangeIcon" src={refresh} /> */}
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <div className="fromCard">
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      From
                    </Grid>
                    <Grid item xs={5}>
                      <input
                        value={inputValue}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        className="fromInput"
                        placeholder="0.0"
                      />
                    </Grid>
                    <Grid item xs={7} container spacing={4}>
                      {/* <Grid item xs={2}>
                        <span>
                          <img
                            alt="sideticket"
                            style={{ marginTop: "5px", width: "30px" }}
                            src={sideticket}
                          />
                        </span>
                      </Grid> */}
                      <Grid
                        item
                        xs={12}
                        style={{ marginLeft: "40px", marginTop: "-11px" }}
                      >
                        <div style={{ marginLeft: "60px" }}>
                          <Select
                            options={[{ name: "BNB" }, { name: "USD" }]}
                            selected={fromExchange}
                            onChangeFilter={filterChangeHandler}
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid item xs={12} container justify="center" spacing={0}>
                <img
                  alt="exchangeIconarrow"
                  src={exchangearrow}
                  className="exchangeIconarrow"
                />
              </Grid>
              <Grid item xs={12}>
                <div className="fromCard">
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      To
                    </Grid>
                    <Grid item xs={5}>
                      <input
                        readOnly
                        value={outputValue}
                        className="fromInput"
                        placeholder="0.0"
                      />
                    </Grid>
                    <Grid item xs={7} container spacing={4}>
                      {/* <Grid item xs={2}>
                        <span>
                          <img
                            alt="sideticket"
                            style={{ marginTop: "5px", width: "30px" }}
                            src={sideticket}
                          />
                        </span>
                      </Grid> */}
                      <Grid
                        item
                        xs={12}
                        style={{ marginLeft: "40px", marginTop: "-11px" }}
                      >
                        <div style={{ marginLeft: "60px" }}>
                          <Select
                            options={[{ name: "FUNC" }]}
                            selected={toExchange}
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <button
              style={{ display: showValue ? "block" : "none" }}
              onClick={onApprove}
              className="unlockButton"
            >
              Approve
            </button>
          </CardActions>
          <CardActions>
            <button onClick={onBuy} className="unlockButton">
              Buy
            </button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}
