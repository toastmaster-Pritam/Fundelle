import React, { useEffect, useState } from "react";
import { useStateContext } from "../context";
import { search } from "../assets";

const Searchbar = () => {
  const [searchText, setSearchText] = useState("");
  const [campaigns, setCampaigns] = useState([]);
  const { address, contract, getCampaigns } = useStateContext();
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);

  const fetchdata = async () => {
    const data = await getCampaigns();
    setCampaigns(data);
  };
  useEffect(() => {
    if (contract) fetchdata();
  }, [contract, address, filteredCampaigns]);

  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());

    setFilteredCampaigns(
      campaigns.filter((campaign) =>
        campaign.title.toLowerCase().includes(searchText)
      )
    );
    console.log(filteredCampaigns);
  };
  return (
    <div className="lg:flex1 flex flex-row py-2 pl-4 pr-2 max-w-[458px] h-[52px] bg-[#1c1c24] rounded-[100px]">
      <input
        type="text"
        placeholder="search campaigns"
        className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
        onChange={handleSearch}
      />
      <div className="h-full w-[72px] rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer ">
        <img src={search} className="w-[15px] h-[15px] object-contain" />
      </div>
    </div>
  );
};

export default Searchbar;
