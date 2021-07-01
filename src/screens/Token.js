import React from "react";
import "./token.css";
import image1 from "../assets/tokenimages/TokenReleaseSchedule.png";
import image6 from "../assets/tokenimages/Objetdynamiquevector_1.png";
import image7 from "../assets/tokenimages/CommunityRoundPublic.png";
import image11 from "../assets/tokenimages/FUNC.png";
import image42 from "../assets/tokenimages/Objetdynamiquevector_2.png";
import image43 from "../assets/tokenimages/Objetdynamiquevector_3.png";

const Token = () => {
  return (
    <div id="background">
      <div id="TokenReleaseSchedule">
        <img src={image1} alt="secondaryimage" />
      </div>
      <div id="TokenReleaseDistribu">
        <p style={{ fontSize: "21px", color: "#a821ff" }}>
          Token Release Distribution Details
        </p>
      </div>
      <div id="FUNCAllocationDistri">
        <p style={{ fontSize: "21px", color: "#a821ff" }}>
          FUNC Allocation Distribution
        </p>
      </div>
      <div id="Token75MTotalSupplyHARDCA">
        <span>
          75M TOTAL SUPPLY <br />
        </span>
        <span>
          HARD CAP $7.5M
          <br />
        </span>
      </div>
      <div id="SalesDetails">
        <p style={{ fontSize: "21px", color: "#a821ff" }}>Sales Details</p>
      </div>
      <div id="Objetdynamiquevector_1">
        <img src={image6} alt="secondaryimage" />
      </div>
      <div id="CommunityRoundPublic">
        <img src={image7} alt="secondaryimage" />
      </div>
      <div id="TypeSPLTOKENONBinanc">
        <span>
          Type: SPL TOKEN ON Binance Smart Chain <br />
        </span>
        <span>
          Ticket: FUNC
          <br />
        </span>
        <span>
          Total supply: 75 000 000 FUNC (fixed)
          <br />
        </span>
        <span>
          Token contrat: 0xa08a9bA3EaC7EC46FB2e6072A966219cD98D6D69
          <br />
        </span>
        <span>
          Initial circulating supply: 15 000 000 FUNC
          <br />
        </span>
        <span>
          Initial market cap: $ 7 500 000 USD
          <br />
        </span>

        <span>
          Community round price: $ 0,08 USD
          <br />
        </span>
        <span>
          Public sale price: $0,10 USD
          <br />
        </span>
        <span>
          Total raised goal: $1,875M
          <br />
        </span>
      </div>
      <div id="Bydistributingourpub">
        <span>
          By distributing our public sales, we aim to create the most fair
          distribution on launch possible. Since we did not need any external
          investor, there is no seed and private sale distribution to ensure no
          single entity holds larger quantities of the supply. First players
          will be rewarded by a community round sale. The FUNC distribution is
          dedicated to all players and small investors.
        </span>
      </div>
      <div id="Saleparticipantsmayc">
        <span>
          Sale participants may choose to purchase Fun Coupons tokens under the
          two different options below. Options may be combined. The allocation
          available will be as follows :
        </span>
      </div>
      <div id="FUNC">
        <img src={image11} alt="secondaryimage" />
      </div>
      <div id="Token25Supplyrasingatotal">
        <span>
          <span>
            25% Supply, rasing a total of $1 875 000:
            <br />
          </span>
          <span>
            <span style={{ color: "#f85100" }}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10%
              Community Round:
            </span>{" "}
            7 500 000 FUNC
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;at $0,08
            per token 100% locked for 4 months. <br />
            <br />
          </span>
          <span>
            <span style={{ color: "#d982a5" }}>
              {" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;15%
              Public Sale:
            </span>
            11,250,000 FUNC at 0,10 per
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;token
            100% locked for 3 months.
            <br />
            <br />
          </span>
          <span>
            <span style={{ color: "#02bc81" }}>15% Team:</span>100% locked for 6
            months, 10% unlocked each month.
            <br />
            <br />
          </span>
          <span>
            <span style={{ color: "#ff007c" }}>2% Advisors:</span> 100% locked
            for 6 months, 10% unlocked each month.
            <br />
            <br />
          </span>
          <span>
            <span style={{ color: "#310c6c" }}>20% Development:</span> fully
            unlocked.
            <br />
            <br />
          </span>
          <span>
            <span style={{ color: "#00ffe1" }}>
              13% Staking & Players Rewards:
            </span>{" "}
            60% unlocked, 10% unlocked each month. <br />
            <br />
          </span>
          <span>
            <span style={{ color: "#ffd200" }}>25 % Company Reserve:</span> 100%
            locked for 1 year Token Distribution Schedule. <br />
          </span>
        </span>
      </div>
      <div id="FUNCTokenResume">
        <p style={{ fontSize: "21px", color: "#a821ff" }}>FUNC Token Resume</p>
      </div>
      <div id="FUNCTokenDistributio">
        <p style={{ fontSize: "21px", color: "#a821ff" }}>
          FUNC Token Distribution
        </p>
      </div>
      <div id="Details">
        <span style={{ color: "white", fontSize: "12px" }}>Details</span>
      </div>
      <div id="Salesdates">
        <span style={{ color: "white", fontSize: "12px" }}>Sales Dates</span>
      </div>
      <div id="Lockup">
        <span style={{ color: "white", fontSize: "12px" }}>Lock Up</span>
      </div>
      <div id="Release">
        <span style={{ color: "white", fontSize: "12px" }}>Release</span>
      </div>
      <div id="PurchaseLimits">
        <span style={{ color: "white", fontSize: "12px" }}>
          Purchase Limits
        </span>
      </div>
      <div id="Acceptedcurrencies">
        <span style={{ color: "white", fontSize: "12px" }}>
          Accepted Currencies
        </span>
      </div>
      <div id="ofTotalSupply">
        <span style={{ color: "white", fontSize: "12px" }}>
          % of Total Supply
        </span>
      </div>
      <div id="NumofTokens">
        <span style={{ color: "white", fontSize: "12px" }}>Num of Tokens</span>
      </div>
      <div id="PriceperToken">
        <span style={{ color: "white", fontSize: "12px" }}>
          Price per Token
        </span>
      </div>
      <div id="CommunityRound">
        <span style={{ color: "white", fontSize: "12px" }}>
          Community Round
        </span>
      </div>
      <div id="Token1stJuly2021">
        <span style={{ color: "white", fontSize: "12px" }}>1st July 2021</span>
      </div>
      <div id="Token4months">
        <span style={{ color: "white", fontSize: "12px" }}>4 months</span>
      </div>
      <div id="Token1stNovember2021">
        <span style={{ color: "white", fontSize: "12px" }}>
          1st November 2021
        </span>
      </div>
      <div id="Token100min1000max">
        <span style={{ color: "white", fontSize: "12px" }}>
          $ 100 min <br />
        </span>
        <span style={{ color: "white", fontSize: "12px" }}>$ 1000 max</span>
      </div>
      <div id="BTCETHUSDC">
        <span style={{ color: "white", fontSize: "12px" }}>BTC, ETH ,USDC</span>
      </div>
      <div id="layer_10">
        <span style={{ color: "white", fontSize: "12px" }}>10 %</span>
      </div>
      <div id="Token75M">
        <span style={{ color: "white", fontSize: "12px" }}>7,5M</span>
      </div>
      <div id="layer_08">
        <span style={{ color: "white", fontSize: "12px" }}>$ 0,8</span>
      </div>
      <div id="PublicSale">
        <span style={{ color: "white", fontSize: "12px" }}>Public Sale</span>
      </div>
      <div id="Token1stAugust2021">
        <span style={{ color: "white", fontSize: "12px" }}>
          1st August 2021
        </span>
      </div>
      <div id="Token3months">
        <span style={{ color: "white", fontSize: "12px" }}>3 Months</span>
      </div>
      <div id="Token1stNovember2021_0">
        <span style={{ color: "white", fontSize: "12px" }}>
          1st November 2021
        </span>
      </div>
      <div id="Token100min1500max">
        <span style={{ color: "white", fontSize: "12px" }}>
          $ 100 Min <br />
        </span>
        <span style={{ color: "white", fontSize: "12px" }}>$ 1000 Max</span>
      </div>
      <div id="BTCETHUSDCcopie">
        <span style={{ color: "white", fontSize: "12px" }}>BTC,ETH,USDC</span>
      </div>
      <div id="layer_15">
        <span style={{ color: "white", fontSize: "12px" }}>15 %</span>
      </div>
      <div id="Token1125M">
        <span style={{ color: "white", fontSize: "12px" }}>11,25 M</span>
      </div>
      <div id="layer_012">
        <span style={{ color: "white", fontSize: "12px" }}>$ 0,12</span>
      </div>
      <div id="Objetdynamiquevector_2">
        <img src={image42} alt="secondaryimage" />
      </div>
      <div id="Objetdynamiquevector_3">
        <img src={image43} alt="secondaryimage" />
      </div>
      <div id="TokenSaleTheTokenSal">
        <span style={{ color: "#8f86e9" }}>
          Token Sale <br />
        </span>
        <span>
          The Token Sale includes all tokens allocated for Community Round &
          Public sales. This will be released all at once. <br />
          <br />
        </span>

        <span style={{ color: "#8f86e9" }}>
          Team & Advisors
          <br />
        </span>
        <span>
          The Team & Advisors is reserved as compensation for current and future
          Fun Coupons team members and advisors. The release are subject to a
          strict lockups schedule
          <br />
          <br />
        </span>

        <span style={{ color: "#8f86e9" }}>
          Staking & Players rewards
          <br />
        </span>
        <span>
          The Staking & Players rewards allocation is specifically reserved to
          fund all marketing events, to create a staking program. Also this
          reserve will allow us to develop extra awards for the most usual
          players. <br />
          <br />
        </span>

        <span style={{ color: "#8f86e9" }}>
          Liquidity
          <br />
        </span>
        <span>
          The Liduidity allocation will be reserved for fulfilling the needs of
          future platform, marketing events and other bounties. <br />
          <br />
        </span>

        <span style={{ color: "#8f86e9" }}>
          Company Reserve
          <br />
        </span>
        <span>
          The Company Reserve allocation will function as an emergency token
          pool for the futur of Fun Coupons. This is why it will only be release
          after the first year <br />
          <br />
        </span>
      </div>
    </div>
  );
};

export default Token;
