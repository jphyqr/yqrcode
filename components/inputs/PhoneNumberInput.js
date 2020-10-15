import React, { useEffect, useState, useRef } from "react";
import VerticalSpacer from "../spacers/VerticalSpacer";
const PhoneNumberInput = ({
  id,
  updateParent,
  value,

  onSuccess,
  onFail,
  onEdit,
  setRef,

  nextRef,
}) => {
  const updateIfMatchesPhonePattern = async (value) => {
    console.log("UPDATEIFMATCHES", value);
    if (value) {
      var numericReg = /^[0-9\b]+$/;
      if (numericReg.test(value)) {
        validatePhone(value);
      }
    } else {
      validatePhone(value);
    }
  };
  const [_phoneSuccess, phoneSuccess] = useState(false);
  const [_phoneFail, phoneFail] = useState(false);
  const [_showSuccess, showSuccess] = useState(false);
  const [errorText, phoneErrorText] = useState(false);
  const [error, phoneError] = useState(false);
  const [_checkingPhone, checkingPhone] = useState(false);
  const [_validating, validating] = useState(false);

  useEffect(() => {
    if (_phoneSuccess) {
      showSuccess(true);
      const timer = setTimeout(() => {
        showSuccess(false);
      }, 3 * 1000);
    }
  }, [_phoneSuccess]);

  const checkIfPhoneExists = async (phone) => {
    console.log("CHECKING IF PHONE EXISTS", phone);
    try {
      const res = await fetch(
        "https://us-central1-poker-cf130.cloudfunctions.net/checkIfUserExistsByPhone",
        {
          method: "post",
          body: JSON.stringify({ phone: phone }),
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      const data = await res.json();

      const { data: userExists } = data;
      console.log({ userExists });
      if (userExists) {
        return true;
      } else {
        return false;
      }
    } catch {
      (error) => {
        console.log({ error });
        return false;
      };
    }
  };

  const validatePhone = async (value) => {
    onEdit();
    phoneError(false);
    phoneErrorText("");
    console.log(value);
    if (value.length === 10) {
      await updateParent(value);
      var phoneno = /^\d{10}$/;

      console.log("MATCHES PHONE REGEX");
      validating(true);
      let phoneExists = await checkIfPhoneExists(value);
      validating(false);
      console.log({ phoneExists });

      if (phoneExists) {
        phoneSuccess(false);
        phoneFail(true);
        onFail();
        phoneError(true);
        phoneErrorText("user exists");
        // phoneRef.current.focus();
      } else {
        phoneSuccess(true);
        onSuccess();
        phoneFail(false);
        phoneError(false);
        phoneErrorText("");
        // passwordRef.current.focus();
      }
    } else {
      updateParent(value);
    }
  };

  return (
    <div className="container">
      <div className="compound">
        {_validating && <div className="loader"></div>}
        <div className="row">
          <div className="pair">
            {" "}
            <label for="phone" className="phone">
              Mobile#
            </label>
            <label className="success">✔</label>
          </div>
          {error && <label className="error">{errorText}</label>}
        </div>
        <VerticalSpacer height={5} />
        <input
          id={id}
          ref={setRef}
          type={"tel"}
          onChange={(e) => updateIfMatchesPhonePattern(e.target.value)} //{(e) => matchNumber(e.target.value)}
          onBlur={
            value.length === 10
              ? () => nextRef.current.focus()
              : () => {
                  phoneError(true);
                  phoneErrorText("Phone#s are 10 digits");
                  phoneFail(true);

                  //  phoneRef.current.focus();
                }
          }
          value={value}
          maxlength={10}
        />
      </div>
      <style jsx>
        {`
          .container {
          }

  


.success{
    opacity: ${_showSuccess ? 1 : 0};
    transition: .5s ease-out;
}
          .error {
            color: red;
            font-size: 14px;
            font-weight: bold;
          }
          .row {
           position: relative;
           display:flex;
           justify-content: space-between;
          }

          .loader{
              position:absolute;
              background-color:lightgrey;
              width:100%;
              transform: translateY(22px);
              height 27px;
              opacity: 0.6;
          }


          .loader:after, .loader:before{
            content:"";
            background-color: grey;
            width: 100%;
            height: 27px;
            position:absolute;
            bottom:0;
            left:0;
            z-index: 10
            opacity: 0.6;
            transform: translateX(-100%);
            animation: shimmy 1s infinite linear;
        }

        
       .loader:before{
background-color: silver;
           animation-delay: .5s;
       }

        @keyframes shimmy {
            0% {
                transform: translateX(-100%);
            }
            100%{
                transform: translateX(100%);
            }
        }


          .compound{
              position:relative;
              overflow:hidden;
          }
          .pair{
              display: flex;
          }
          .compound:before{
              content:"";
              background-color: silver;
              width: 100%;
              height: 27px;
              position:absolute;
              bottom:0
              left:0;
              z-index: ${_validating ? 2 : -1};
              transform: translateY(22px);
              opacity: ${_validating ? 0.4 : 0};
          }

       
        
       

          }
          
          input:focus {
            color: darkred;
            border: ;
          }
        `}
      </style>
    </div>
  );
};

export default PhoneNumberInput;
