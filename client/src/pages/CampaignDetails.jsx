import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useStateContext } from "../context";
import Button from "../components/Button";
import { calculateBarPercentage, daysLeft } from "../utils";
import { thirdweb } from "../assets";
import { useLocation, useNavigate } from "react-router-dom";
import CountBox from "../components/CountBox";
import Loader from "../components/Loader";

const CampaignDetails = () => {
  const { state } = useLocation();
  const { getDonations, contract, address, donate } = useStateContext();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);

  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.pid);
    setDonators(data);
  };

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);

  const handleDonate = async () => {
    setIsLoading(true);
    await donate(state.pid, amount);
    navigate("/");
    setIsLoading(false);
  };

  // console.log(state);
  return (
    <div>
      {isLoading && <Loader />}
      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img
            src={state.image}
            alt="campaign-img"
            className="w-full h-[400px] object-cover rounded-xl"
          />
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div
              className="absolute h-full bg-[#4acd8d]"
              style={{
                width: `${calculateBarPercentage(
                  state.target,
                  state.amountCollected
                )}%`,
                maxWidth: "100%",
              }}
            ></div>
          </div>
        </div>
        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title={"Days Left"} value={parseInt(remainingDays)>0?remainingDays:"expired"} />
          <CountBox
            title={`Raised of ${state.target}`}
            value={state.amountCollected}
          />
          <CountBox title={"Total Backers"} value={donators.length} />
        </div>
      </div>
      <div className="flex lg:flex-row flex-col gap-5 mt-[60px]">
        <div className="flex flex-col flex-[2] gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white  uppercase">
              Creator
            </h4>
            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img
                  src={thirdweb}
                  alt="user"
                  className="w-[60%] h-[60%] object-contain"
                />
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">
                  {state.owner}
                </h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">
                  10 Campaigns
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Story
            </h4>
            <div className="mt-[20px]">
              <p className=" font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                {state.description}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Donators
            </h4>
            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? (
                donators.map((item, index) => (
                  <div
                    key={`${item.donator}-${index}`}
                    className="flex justify-between items-center gap-4"
                  >
                    <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-11">
                      {index + 1}. {item.donator}
                    </p>
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-11">
                      {item.donation}
                    </p>
                  </div>
                ))
              ) : (
                <p className=" font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                  No donators yet. Be the first one!
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
            Fund
          </h4>

          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-epilogue font-medium text-center text-[20px] leading-[30px] text-[#808191] ">
              Fund the campaign
            </p>

            <div className="mt-[30px]">
              <input
                type="number"
                name=""
                id=""
                placeholder="ETH 0.1"
                step={"0.01"}
                min={"0.0"}
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px] "
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                  Back it because you believe in it.
                </h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                  Support our moto for no rewards, just because it speaks to
                  you.
                </p>
              </div>
              <Button
                btnType={"button"}
                title={"Fund Campaign"}
                styles={"w-full bg-[#8c6dfd]"}
                handleClick={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
