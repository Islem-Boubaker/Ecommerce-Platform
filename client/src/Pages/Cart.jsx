import React from "react";

const CardForm = () => {
  return (
    <div className="max-w-[450px] mx-auto bg-white rounded-[26px] shadow-[0_187px_75px_rgba(0,0,0,0.01),0_105px_63px_rgba(0,0,0,0.05),0_47px_47px_rgba(0,0,0,0.09),0_12px_26px_rgba(0,0,0,0.1)]">
      <form className="flex flex-col gap-5 p-5">
        <div className="flex flex-col gap-4">
          {/* Cardholder Name */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-[#8b8e98]">
              Card holder full name
            </label>
            <input
              placeholder="Enter your full name"
              type="text"
              className="h-10 rounded-[9px] bg-[#f2f2f2] px-4 outline-none focus:bg-transparent focus:ring-2 focus:ring-[#242424] transition-all"
            />
          </div>

          {/* Card Number */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-[#8b8e98]">
              Card Number
            </label>
            <input
              placeholder="0000 0000 0000 0000"
              type="number"
              className="h-10 rounded-[9px] bg-[#f2f2f2] px-4 outline-none focus:bg-transparent focus:ring-2 focus:ring-[#242424] transition-all"
            />
          </div>

          {/* Expiry + CVV */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-[#8b8e98]">
              Expiry Date / CVV
            </label>
            <div className="grid grid-cols-[4fr_2fr] gap-4">
              <input
                placeholder="01/23"
                type="text"
                className="h-10 rounded-[9px] bg-[#f2f2f2] px-4 outline-none focus:bg-transparent focus:ring-2 focus:ring-[#242424] transition-all"
              />
              <input
                placeholder="CVV"
                type="number"
                className="h-10 rounded-[9px] bg-[#f2f2f2] px-4 outline-none focus:bg-transparent focus:ring-2 focus:ring-[#242424] transition-all"
              />
            </div>
          </div>

          {/* Checkout Button */}
          <button
            type="button"
            className="h-[55px] rounded-[11px] bg-gradient-to-b from-[#363636] via-[#1b1b1b] to-[#000000] text-white font-bold text-[15px] transition-all hover:ring-4 hover:ring-[#0000003a] hover:ring-offset-2"
          >
            Checkout
          </button>

          {/* Separator */}
          <div className="grid grid-cols-[1fr_2fr_1fr] gap-2 text-[#8b8e98] mx-2">
            <hr className="w-full h-[1px] bg-[#e8e8e8] border-0 my-auto" />
            <p className="text-[11px] font-semibold text-center my-auto">
              or pay using e-wallet
            </p>
            <hr className="w-full h-[1px] bg-[#e8e8e8] border-0 my-auto" />
          </div>

          {/* Payment options */}
          <div className="grid grid-cols-3 gap-4 p-2">
            <button
              type="button"
              name="paypal"
              className="h-[55px] rounded-[11px] bg-[#f2f2f2] flex justify-center items-center"
            >
              {/* PayPal SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="124px"
                height="33px"
                viewBox="0 0 124 33"
              >
                {/* Your PayPal paths here */}
              </svg>
            </button>

            <button
              type="button"
              name="apple-pay"
              className="h-[55px] rounded-[11px] bg-[#f2f2f2] flex justify-center items-center"
            >
              {/* Apple Pay SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 210.2"
                className="h-5"
              >
                {/* Your Apple Pay paths here */}
              </svg>
            </button>

            <button
              type="button"
              name="google-pay"
              className="h-[55px] rounded-[11px] bg-[#f2f2f2] flex justify-center items-center"
            >
              {/* Google Pay SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={80}
                height={39}
                viewBox="0 0 80 39"
                fill="none"
                className="h-6"
              >
                {/* Your Google Pay paths here */}
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CardForm;
