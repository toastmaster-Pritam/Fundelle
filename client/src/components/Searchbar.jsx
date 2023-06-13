import React, { useEffect, useState } from "react";
import { useStateContext } from "../context";


const Searchbar = () => {
  const [searchText, setSearchText] = useState("");
  const [campaigns,setCampaigns]=useState([])
  const { address, contract, getCampaigns } = useStateContext();
  const [filteredCampaigns,setFilteredCampaigns]=useState([])

  const fetchdata = async () => {
    
    const data = await getCampaigns();
    setCampaigns(data)
  };
  useEffect(() => {
    if (contract) fetchdata();
   
  }, [contract, address,filteredCampaigns]);

  const handleSearch = (e) => {
    
    setSearchText(e.target.value.toLowerCase());

    setFilteredCampaigns(campaigns.filter((campaign)=>campaign.title.toLowerCase().includes(searchText)))
    console.log(filteredCampaigns)

  };
  return (
    
    <input
      type="text"
      placeholder="search campaigns"
      className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
      onChange={handleSearch}
    />
   
    
   
    
  );
};

export default Searchbar;
