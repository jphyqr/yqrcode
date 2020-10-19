import React from "react";
import QRCode from "react-qr-code/lib/components/QRCode";

const Fridge = ({ cityKey }) => {
  return (
    <div className="fridge-magnet">
      <button className="cta">Get Kit</button>
      <div className="middle">
        <QRCode
          value={`http://yqrcode.com/${cityKey}/FRIDGE`}
          size={100}
        ></QRCode>
      </div>

      <div className="emoji">👶</div>
      <div className="emoji">👃</div>
      <div className="emoji">🦷</div>
      <div className="emoji">👀</div>
      <div className="emoji">🍔</div>
      <div className="emoji">🍕</div>
      <div className="emoji"></div>
      <div className="emoji"></div>
      <div className="emoji"></div>
      <div className="emoji">🚗</div>
      <div className="emoji">🔨</div>
      <div className="emoji"></div>
      <div className="emoji"></div>
      <div className="emoji"></div>
      <div className="emoji">💈</div>
      <div className="emoji">🎉</div>
      <div className="emoji">🍺</div>
      <div className="emoji">✈️</div>
      <div className="emoji">✏️</div>
      <div className="emoji">💛</div>

      <style jsx>
        {`
          .middle {
            position: absolute;
            bottom: 50%;
            left: 50%;
            transform: translate(-50%, 50%);
          }

          .top,
          .bottom {
            width: 100%;
            height: 100%;

            grid-area: top;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .emoji {
            font-size: 20px;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: ${200 / 4}px;
            width: ${200 / 5}px;
          }

          .emoji:nth-child(odd) {
          }

          .bottom {
            grid-area: bottom;
          }

          .left,
          .right {
            height: 100%;

            grid-area: left;
            display: flex;

            flex-direction: column;
            justify-content: space-between;
          }

          .right {
            grid-area: right;
            align-items: flex-end;
          }

          .fridge-magnet {
            height: 200px;
            width: 200px;
            background-color: lightgreen;
            border-radius: 10px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            position: relative;
          }

          .cta {
            content: "Get Kit";
            background-color: blue;
            position: absolute;
            font-size: 30px;

            left: -20px;
            bottom: -20px;
            padding: 5px 10px 5px 10px;
            border-radius: 10px;
            color: white;
          }
          .cta:hover {
            background-color: red;
          }
        `}
      </style>
    </div>
  );
};

export default Fridge;
