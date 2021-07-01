import React from "react";
import {
  // makeStyles,
  withStyles,
} from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import sideticket from "../../assets/sideticket.png";
import equal from "../../assets/equal.png";
import goldcrown from "../../assets/goldcrown.svg";
import silvercrown from "../../assets/silvercrown.svg";
import bronzecrown from "../../assets/bronzecrown.svg";
import information from "../../assets/information.png";
import Web3 from "web3";
// import ticket from "../../assets/ticket.png";
import "./genericcomponents.css";

const BorderLinearProgress = withStyles({
  root: {
    height: 35,
    backgroundColor: "#444165",
    borderRadius: 30,
  },
  bar: {
    borderRadius: 35,
    // background: "rgb(144,38,255)",
    background:
      "linear-gradient(90deg, rgba(144,38,255,1) 41%, rgba(95,255,226,1) 100%)",
  },
})(LinearProgress);

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
// }));

const TokenProgress = (props) => {
  // const classes = useStyles();

  const { progressValue, total, network } = props;

  const [ticketsToBuy, setTicketsToBuy] = React.useState(1);

  const ticketsToBuyHandler = (e) => {
    setTicketsToBuy(parseInt(e.target.value));
  };

  const getPercentage = (val) => {
    return ((parseInt(val) / parseInt(total)) * 100).toFixed(2);
  };

  const buyTicket = async () => {
    if (ticketsToBuy < 1) {
      alert("Tickets cannot be less than 1");
      setTicketsToBuy(1);
    } else if (ticketsToBuy > total - progressValue) {
      alert("Total tickets available are " + (total - progressValue));
    } else if (ticketsToBuy > 100) {
      alert("Tickets cannot be greater than 100");
      setTicketsToBuy(100);
    } else {
      if (network) {
        let tempAddress;
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
        const accounts = await web3.eth.getAccounts();
        tempAddress = accounts[0];

        //buy ticket
        if (tempAddress === undefined) {
          //alert connect first
          alert("Please connect your metamask wallet");
        } else {
          props.buyLotteryfromWeb3(props.lotteryAmount.value, ticketsToBuy);
        }
      } else {
        alert("Cannot Buy with Current Network");
      }
    }
  };

  const getValuewithSpaces = (tpVal) => {
    if (tpVal === 1000) {
      return "1 000";
    }
    if (tpVal === 10000) {
      return "10 000";
    }
    if (tpVal === 100000) {
      return "100 000";
    }
    if (tpVal === 1000000) {
      return "1 000 000";
    }
  };
  return (
    <Grid
      container
      className="tokenprogress"
      direction="row"
      justifyContent="center"
      alignItems="center"
      alignContent="center"
      spacing={1}
      style={{ margin: "15px", width: "75%" }}
    >
      <Grid item xs={2} md={12}>
        <span style={{ color: "#9026ff", fontSize: "1.5rem", fontWeight: 700 }}>
          # {props.latestValues[props.keys - 1]}
        </span>
      </Grid>
      <Grid item xs={10} md={12} container direction="row">
        <Grid item xs={1} md={6}></Grid>
        <Grid item md={6} container justify="flex-end" alignContent="flex-end">
          <Grid
            item
            xs={3}
            md={4}
            container
            justify="center"
            alignItems="center"
            alignContent="center"
          >
            <span
              className="fcPrice"
              style={{ fontFamily: "ITCAvant", fontSize: "24px" }}
            >
              {getValuewithSpaces(10 * props.lotteryAmount.value)} $
            </span>
          </Grid>
          <Grid item xs={3} md={2}>
            <img src={sideticket} alt="sideticket" style={{ width: "40px" }} />
          </Grid>
          <Grid
            item
            xs={2}
            md={2}
            container
            justify="center"
            alignItems="center"
            alignContent="center"
          >
            <img alt="equal" src={equal} />
          </Grid>
          <Grid item xs={6} md={4}>
            <span className="ticketPrice">$ {props.lotteryAmount.show}</span>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12}>
        <div style={{ position: "relative" }}>
          <BorderLinearProgress
            variant="determinate"
            color="secondary"
            value={getPercentage(progressValue)}
          />
          <Typography
            style={{
              position: "absolute",
              color: progressValue < 50 ? "#a2ffe2" : "white",
              left: "47%",
              top: "10%",
              fontWeight: 600,
              // transform: "translateX(-50%)",
            }}
          >
            {getPercentage(progressValue)}&nbsp;%
          </Typography>
          {/* <Typography
            style={{
              position: "absolute",
              color: "white",
              top: 0,
              left: "95%",
              transform: "translateX(-50%)",
            }}
          >
            50
          </Typography> */}
        </div>
      </Grid>
      <Grid item container xs={12} md={12} lg={2}>
        <Grid item xs={12}>
          <img src={goldcrown} alt="goldcrown" style={{ width: "20px" }} /> :
          <span style={{ fontFamily: "ITCAvantMedium", fontSize: "medium" }}>
            {props.position1} $
          </span>
        </Grid>
        <Grid item xs={12}>
          <img src={silvercrown} alt="silvercrown" style={{ width: "20px" }} />{" "}
          :
          <span style={{ fontFamily: "ITCAvantMedium", fontSize: "medium" }}>
            {props.position2} $
          </span>
        </Grid>
        <Grid item xs={12}>
          <img src={bronzecrown} alt="bronzecrown" style={{ width: "20px" }} />{" "}
          :
          <span style={{ fontFamily: "ITCAvantMedium", fontSize: "medium" }}>
            {props.position3} $
          </span>
        </Grid>
      </Grid>

      <Grid
        item
        container
        xs={12}
        md={12}
        lg={4}
        style={{ fontFamily: "ITCAvantMedium", fontSize: "medium" }}
      >
        <Grid item xs={12}>
          {props.position4.name} : {props.position4.price} $ to share
        </Grid>
        <Grid item xs={12}>
          {props.position5.name} : {props.position5.price} $ to share
        </Grid>
        <Grid item xs={12}>
          {props.position6.name} : {props.position6.price} $ to share
        </Grid>
        <Grid item xs={12}>
          {props.position7.name} : {props.position7.price} $ to share
        </Grid>
      </Grid>

      <Grid item xs={4} md={6} lg={1}>
        {/* <div
          style={{
            background: "#b4ffa4",
            borderRadius: "50px",
            padding: "10px",
            margin: "10px",
            width: "50px",
            color: "black",
            fontSize: "20px",
            fontWeight: 600,
            textAlign: "center",
            cursor: "pointer",
          }}
        > */}
        <Tooltip
          title="Buy tickets in
order to play and try to win FUNC ! More tickets you buy, more chances you have to be the king
The lottery will run right after all the tickets are sold, you can check your winning in the profile
page"
        >
          <img src={information} style={{ cursor: "pointer" }} />
        </Tooltip>
        {/* </div> */}
      </Grid>
      <Grid item xs={4} md={6} lg={1}></Grid>
      <Grid item xs={8} md={6} lg={3}>
        {/* <img src={ticket} alt="ticket" /> */}
        <div
          style={{
            background: "#b4ffa4",
            color: "black",
            borderRadius: "5px",
            padding: "10px",
            margin: "10px",
            cursor: "pointer",
            fontFamily: "ITCAvant",
            textAlign: "center",
          }}
          onClick={buyTicket}
        >
          Buy Tickets
        </div>
      </Grid>
      <Grid item xs={8} md={6} lg={1}>
        <input
          type="number"
          className="buyInput"
          value={ticketsToBuy}
          onChange={ticketsToBuyHandler}
        />
      </Grid>
    </Grid>
  );
};

export default TokenProgress;
