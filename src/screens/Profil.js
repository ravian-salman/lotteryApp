import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";

import LotteryTicket from "../components/generic/lotteryticket";

import downarrows from "../assets/downarrows.png";
import information from "../assets/information.png";
import sideticket from "../assets/sideticket.png";

import "./screens.css";
import { CircularProgress, Container } from "@material-ui/core";
import Web3 from "web3";

import {
  FUN_LOTTERY_ABI,
  FUN_LOTTERY_ADDRESS,
} from "../smartcontract/funlottery";

import { ethers } from "ethers";
import { networkid, provider } from "../smartcontract/networkid";

// import { FUN_COIN_ADDRESS, FUN_COIN_ABI } from "../smartcontract/funcoin";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: "#060656",
//     color: "white",
//     textTransform: "none",
//   },
// }));

export default function Profile() {
  // const classes = useStyles();

  var numberofRows = 4;
  const web3 = new Web3(provider);

  const contractFunLottery = new web3.eth.Contract(
    FUN_LOTTERY_ABI,
    FUN_LOTTERY_ADDRESS
  );

  const getLatestId = async (size) => {
    var latestid = await contractFunLottery.methods.getLottoId(size).call();
    return latestid;
  };

  const [sizes1, setSizes1] = React.useState([]);
  const [sizes2, setSizes2] = React.useState([]);
  const [sizes3, setSizes3] = React.useState([]);
  const [sizes4, setSizes4] = React.useState([]);

  const [lotteryIDs1, setlotteryIDs1] = React.useState([]);
  const [lotteryIDs2, setlotteryIDs2] = React.useState([]);
  const [lotteryIDs3, setlotteryIDs3] = React.useState([]);
  const [lotteryIDs4, setlotteryIDs4] = React.useState([]);

  const [ticketNum1, setticketNum1] = React.useState([]);
  const [ticketNum2, setticketNum2] = React.useState([]);
  const [ticketNum3, setticketNum3] = React.useState([]);
  const [ticketNum4, setticketNum4] = React.useState([]);

  const [rewardPrevValue1, setRewardPrevValue1] = React.useState([0]);
  const [rewardPrevValue2, setRewardPrevValue2] = React.useState([0]);
  const [rewardPrevValue3, setRewardPrevValue3] = React.useState([0]);
  const [rewardPrevValue4, setRewardPrevValue4] = React.useState([0]);

  const [loading, setLoading] = React.useState(true);
  var rows = [];

  const updateSizes = (val, rowNum) => {
    if (rowNum === -1) {
      return;
    }
    if (rowNum === 1) {
      setSizes1((oldArray) => [...oldArray, val]);
    } else if (rowNum === 2) {
      setSizes2((oldArray) => [...oldArray, val]);
    } else if (rowNum === 3) {
      setSizes3((oldArray) => [...oldArray, val]);
    } else {
      setSizes4((oldArray) => [...oldArray, val]);
    }
  };

  const updateLotteryIDs = (val, rowNum) => {
    if (rowNum === -1) {
      return;
    }
    if (rowNum === 1) {
      setlotteryIDs1((oldArray) => [...oldArray, val]);
    } else if (rowNum === 2) {
      setlotteryIDs2((oldArray) => [...oldArray, val]);
    } else if (rowNum === 3) {
      setlotteryIDs3((oldArray) => [...oldArray, val]);
    } else {
      setlotteryIDs4((oldArray) => [...oldArray, val]);
    }
  };

  const updateRewardValues = (rowNum, len, currentVal, res) => {
    let newReward = res / 100000000;
    if (rowNum === -1) {
      return;
    }
    if (rowNum === 1) {
      setRewardPrevValue1((oldArray) => [...oldArray, newReward]);
    } else if (rowNum === 2) {
      setRewardPrevValue2((oldArray) => [...oldArray, newReward]);
    } else if (rowNum === 3) {
      setRewardPrevValue3((oldArray) => [...oldArray, newReward]);
    } else {
      setRewardPrevValue4((oldArray) => [...oldArray, newReward]);
    }
  };

  const updateTicketNum = (val, rowNum) => {
    if (rowNum === -1) {
      return;
    }
    if (rowNum === 1) {
      setticketNum1((oldArray) => [...oldArray, val]);
    } else if (rowNum === 2) {
      setticketNum2((oldArray) => [...oldArray, val]);
    } else if (rowNum === 3) {
      setticketNum3((oldArray) => [...oldArray, val]);
    } else {
      setticketNum4((oldArray) => [...oldArray, val]);
    }
  };

  const [network, setNetwork] = React.useState();

  const [latestIDforrows, setlatestIDforrows] = React.useState([]);

  React.useEffect(async () => {
    const web3 = new Web3(Web3.givenProvider);
    if (Web3.givenProvider !== null) {
      const network = await web3.eth.net.getId();
      if (network === networkid) {
        setNetwork(network);
      }
    }

    getLatestId(100).then((res) => {
      setlatestIDforrows((oldArray) => [...oldArray, res]);
      getLatestId(1000).then((res) => {
        setlatestIDforrows((oldArray) => [...oldArray, res]);
        getLatestId(10000).then((res) => {
          setlatestIDforrows((oldArray) => [...oldArray, res]);
          getLatestId(100000).then((res) => {
            setlatestIDforrows((oldArray) => [...oldArray, res]);
            setLoading(false);
          });
        });
      });
    });
  }, []);

  // row to claim
  const claim = async (rowNum) => {
    if (network) {
      web3.eth.handleRevert = true;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        FUN_LOTTERY_ADDRESS,
        FUN_LOTTERY_ABI,
        signer
      );

      if (rowNum === 1) {
        const transaction = await contract.claimMultiple(
          sizes1,
          lotteryIDs1,
          ticketNum1
        );
        console.log(transaction, "transaction1");
      } else if (rowNum === 2) {
        const transaction = await contract.claimMultiple(
          sizes2,
          lotteryIDs2,
          ticketNum2
        );
        console.log(transaction, "transaction2");
      } else if (rowNum === 3) {
        const transaction = await contract.claimMultiple(
          sizes3,
          lotteryIDs3,
          ticketNum3
        );
        console.log(transaction, "transaction3");
      } else {
        const transaction = await contract.claimMultiple(
          sizes4,
          lotteryIDs4,
          ticketNum4
        );
        console.log(transaction, "transaction4");
      }
    } else {
      alert("Cannot Claim with current Network");
    }
  };

  const makeLotteries = (loopTill, price, rowNum) => {
    const lotteries = [];

    if (loopTill !== 0) {
      for (let i = loopTill - 1; i > 0; i--) {
        lotteries.push(
          <Grid item xs={12} md={3}>
            <LotteryTicket
              price={price}
              latestId={i}
              updateSizes={updateSizes}
              updateLotteryIDs={updateLotteryIDs}
              updateTicketNum={updateTicketNum}
              rowNum={rowNum}
              updateRewardValues={updateRewardValues}
            />
          </Grid>
        );
      }
    }

    // })
    // .catch((error) => {
    //   console.log(error);
    // });

    return lotteries;
  };

  var displayStyle = {};
  var rowStyle = { display: "flex" };

  const getRewardValue = (rewarddd) => {
    let sum = rewarddd.reduce((a, b) => a + b);

    if (sum === 0) {
      return 0;
    } else return sum.toFixed(2);
  };
  const makeRows = () => {
    const prices = [100, 1000, 10000, 100000];
    for (let i = 0; i < numberofRows; i++) {
      if (i === 0) {
        const sum1 = getRewardValue(rewardPrevValue1);
        // if (sum1 > 0) {
        rows.push(
          <>
            <Grid item xs={12} style={sum1 === 0 ? { display: "none" } : {}}>
              <div style={rowStyle}>
                <img
                  src={information}
                  style={{
                    height: "40px",
                    width: "auto",
                    marginLeft: "100px",
                    marginTop: "52px",
                  }}
                />
                {/* </Tooltip> */}
                <div className="rewardprice">
                  <span className="rewardpricetext">
                    {sum1}
                    &nbsp;
                    <span>
                      <img
                        src={sideticket}
                        alt="sideticket"
                        style={{ width: "40px", height: "auto" }}
                      />
                    </span>
                  </span>
                </div>
              </div>
            </Grid>

            <Grid item xs={12}>
              <div className="rewardcenter">
                <button
                  className="claim"
                  onClick={(claimMultiple) => claim(i + 1)}
                  style={sum1 === 0 ? { display: "none" } : {}}
                >
                  Claim
                </button>
              </div>
            </Grid>
            <Grid item xs={12}>
              <p
                className="headtext"
                style={
                  sum1 === 0 && latestIDforrows[i] <= 1
                    ? { display: "none" }
                    : {}
                }
              >
                Past Draws
              </p>
            </Grid>

            {makeLotteries(latestIDforrows[i], prices[i], i + 1)}
          </>
        );
        // }
      } else if (i === 1) {
        const sum2 = getRewardValue(rewardPrevValue2);
        console.log(latestIDforrows[i], "latestIDforrows[i]");
        rows.push(
          <>
            <Grid item xs={12} style={sum2 === 0 ? { display: "none" } : {}}>
              <div style={rowStyle}>
                {/* <Tooltip
                  title={
                    <Grid
                      container
                      spacing={1}
                      style={{ fontFamily: "ITCAvantMedium", fontSize: "12px" }}
                    >
                      <Grid item xs={12}>
                        Lottery # 1
                      </Grid>
                      <Grid item xs={12}>
                        Ticket 17 earned you 6 $
                      </Grid>
                      <Grid item xs={12}>
                        Lottery # 9
                      </Grid>
                      <Grid item xs={12}>
                        <div>Ticket 56 earned you 124 $</div>
                        <div>Ticket 139 earned you 520 $</div>
                        <div>Ticket 2654 earned you 1 730 $</div>
                      </Grid>
                      <Grid item xs={12}>
                        Lottery # 12
                      </Grid>
                      <Grid item xs={12}>
                        <div>Ticket 1687 earned you 4 120 $</div>
                        <div>Ticket 603 earned you 2 000 $</div>
                        <div>Ticket 12785 earned you 250 $</div>
                      </Grid>
                    </Grid>
                  }
                > */}
                <img
                  src={information}
                  style={{
                    height: "40px",
                    width: "auto",
                    marginLeft: "100px",
                    marginTop: "52px",
                  }}
                />
                {/* </Tooltip> */}
                <div className="rewardprice">
                  <span className="rewardpricetext">
                    {sum2}
                    &nbsp;
                    <span>
                      <img
                        src={sideticket}
                        alt="sideticket"
                        style={{ width: "40px", height: "auto" }}
                      />
                    </span>
                  </span>
                </div>
              </div>
            </Grid>

            <Grid item xs={12} style={sum2 === 0 ? { display: "none" } : {}}>
              <div className="rewardcenter">
                <button
                  className="claim"
                  onClick={(claimMultiple) => claim(i + 1)}
                  style={displayStyle}
                >
                  Claim
                </button>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              style={
                sum2 === 0 && latestIDforrows[i] <= 1 ? { display: "none" } : {}
              }
            >
              <p className="headtext" style={displayStyle}>
                Past Draws
              </p>
            </Grid>

            {makeLotteries(latestIDforrows[i], prices[i], i + 1)}
          </>
        );
      } else if (i === 2) {
        const sum3 = getRewardValue(rewardPrevValue3);
        rows.push(
          <>
            <Grid item xs={12} style={sum3 === 0 ? { display: "none" } : {}}>
              <div style={rowStyle}>
                {/* <Tooltip
                  title={
                    <Grid
                      container
                      spacing={1}
                      style={{ fontFamily: "ITCAvantMedium", fontSize: "12px" }}
                    >
                      <Grid item xs={12}>
                        Lottery # 1
                      </Grid>
                      <Grid item xs={12}>
                        Ticket 17 earned you 6 $
                      </Grid>
                      <Grid item xs={12}>
                        Lottery # 9
                      </Grid>
                      <Grid item xs={12}>
                        <div>Ticket 56 earned you 124 $</div>
                        <div>Ticket 139 earned you 520 $</div>
                        <div>Ticket 2654 earned you 1 730 $</div>
                      </Grid>
                      <Grid item xs={12}>
                        Lottery # 12
                      </Grid>
                      <Grid item xs={12}>
                        <div>Ticket 1687 earned you 4 120 $</div>
                        <div>Ticket 603 earned you 2 000 $</div>
                        <div>Ticket 12785 earned you 250 $</div>
                      </Grid>
                    </Grid>
                  }
                > */}
                <img
                  src={information}
                  style={{
                    height: "40px",
                    width: "auto",
                    marginLeft: "100px",
                    marginTop: "52px",
                  }}
                />
                {/* </Tooltip> */}
                <div className="rewardprice">
                  <span className="rewardpricetext">
                    {sum3}
                    &nbsp;
                    <span>
                      <img
                        src={sideticket}
                        alt="sideticket"
                        style={{ width: "40px", height: "auto" }}
                      />
                    </span>
                  </span>
                </div>
              </div>
            </Grid>

            <Grid item xs={12} style={sum3 === 0 ? { display: "none" } : {}}>
              <div className="rewardcenter">
                <button
                  className="claim"
                  onClick={(claimMultiple) => claim(i + 1)}
                  style={displayStyle}
                >
                  Claim
                </button>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              style={
                sum3 === 0 && latestIDforrows[i] <= 1 ? { display: "none" } : {}
              }
            >
              <p className="headtext" style={displayStyle}>
                Past Draws
              </p>
            </Grid>

            {makeLotteries(latestIDforrows[i], prices[i], i + 1)}
          </>
        );
      } else {
        const sum4 = getRewardValue(rewardPrevValue3);
        rows.push(
          <>
            <Grid
              item
              xs={12}
              style={
                sum4 === 0 && latestIDforrows[i] <= 1 ? { display: "none" } : {}
              }
            >
              <div style={rowStyle}>
                {/* <Tooltip
                  title={
                    <Grid
                      container
                      spacing={1}
                      style={{ fontFamily: "ITCAvantMedium", fontSize: "12px" }}
                    >
                      <Grid item xs={12}>
                        Lottery # 1
                      </Grid>
                      <Grid item xs={12}>
                        Ticket 17 earned you 6 $
                      </Grid>
                      <Grid item xs={12}>
                        Lottery # 9
                      </Grid>
                      <Grid item xs={12}>
                        <div>Ticket 56 earned you 124 $</div>
                        <div>Ticket 139 earned you 520 $</div>
                        <div>Ticket 2654 earned you 1 730 $</div>
                      </Grid>
                      <Grid item xs={12}>
                        Lottery # 12
                      </Grid>
                      <Grid item xs={12}>
                        <div>Ticket 1687 earned you 4 120 $</div>
                        <div>Ticket 603 earned you 2 000 $</div>
                        <div>Ticket 12785 earned you 250 $</div>
                      </Grid>
                    </Grid>
                  }
                > */}
                <img
                  src={information}
                  style={{
                    height: "40px",
                    width: "auto",
                    marginLeft: "100px",
                    marginTop: "52px",
                  }}
                />
                {/* </Tooltip> */}
                <div className="rewardprice">
                  <span className="rewardpricetext">
                    {sum4}
                    &nbsp;
                    <span>
                      <img
                        src={sideticket}
                        alt="sideticket"
                        style={{ width: "40px", height: "auto" }}
                      />
                    </span>
                  </span>
                </div>
              </div>
            </Grid>

            <Grid item xs={12} style={sum4 === 0 ? { display: "none" } : {}}>
              <div className="rewardcenter">
                <button
                  className="claim"
                  onClick={(claimMultiple) => claim(i + 1)}
                  style={displayStyle}
                >
                  Claim
                </button>
              </div>
            </Grid>
            <Grid item xs={12} style={sum4 === 0 ? { display: "none" } : {}}>
              <p className="headtext" style={displayStyle}>
                Past Draws
              </p>
            </Grid>

            {makeLotteries(latestIDforrows[i], prices[i], i + 1)}
          </>
        );
      }
    }
    return rows;
  };

  return (
    <Container style={{ minHeight: "90vh" }}>
      <Grid container spacing={6}>
        <Grid container item spacing={3}>
          <Grid item xs={12}>
            <div style={{ display: "flex" }}>
              <div>
                {/* <Tooltip
                title={
                  <Grid
                    container
                    spacing={1}
                    style={{ fontFamily: "ITCAvantMedium", fontSize: "12px" }}
                  >
                    <Grid item xs={12}>
                      Lottery # 1
                    </Grid>
                    <Grid item xs={12}>
                      Ticket 17 earned you 6 $
                    </Grid>
                    <Grid item xs={12}>
                      Lottery # 9
                    </Grid>
                    <Grid item xs={12}>
                      <div>Ticket 56 earned you 124 $</div>
                      <div>Ticket 139 earned you 520 $</div>
                      <div>Ticket 2654 earned you 1 730 $</div>
                    </Grid>
                    <Grid item xs={12}>
                      Lottery # 12
                    </Grid>
                    <Grid item xs={12}>
                      <div>Ticket 1687 earned you 4 120 $</div>
                      <div>Ticket 603 earned you 2 000 $</div>
                      <div>Ticket 12785 earned you 250 $</div>
                    </Grid>
                  </Grid>
                }
                > */}
                <img
                  src={information}
                  style={{
                    height: "40px",
                    width: "auto",
                    marginLeft: "100px",
                    marginTop: "52px",
                  }}
                />
                {/* </Tooltip> */}
              </div>
              <div className="rewardimage">
                <p className="rewardtext">REWARD</p>
              </div>
            </div>
          </Grid>

          {/* <Grid item xs={12}>
            <div className="rewardcenter">
              <button className="claim">Claim</button>
            </div>
          </Grid>
          <Grid item xs={12}>
            <p className="headtext">Tirages en Course</p>
          </Grid> */}
          {!loading && latestIDforrows.length !== 0 ? (
            [100, 1000, 10000, 100000].map((price, index) => {
              return (
                <Grid item xs={12} md={3} key={price}>
                  <LotteryTicket
                    price={price}
                    latestId={latestIDforrows[index]}
                    updateSizes={updateSizes}
                    updateLotteryIDs={updateLotteryIDs}
                    updateTicketNum={updateTicketNum}
                    rowNum={-1}
                    updateRewardValues={updateRewardValues}
                  />
                </Grid>
              );
            })
          ) : (
            <div
              style={{
                height: "100vh",
              }}
            >
              <CircularProgress />
            </div>
          )}
          <Grid item xs={12}>
            <div className="downarrows">
              <img src={downarrows} alt="downarrows" />
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={3} item>
          {!loading && latestIDforrows.length !== 0 ? makeRows() : <div></div>}
        </Grid>
      </Grid>
    </Container>
  );
}
