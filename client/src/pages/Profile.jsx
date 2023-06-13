import React, { useEffect, useState } from "react";
import { useStateContext } from "../context";
import DisplayCampaigns from "../components/DisplayCampaigns";
const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, myCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);

    const data = await myCampaigns();
    setIsLoading(false);
    setCampaigns(data);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);
  return (
    <DisplayCampaigns
      title={"All Campaigns"}
      isLoading={isLoading}
      campaigns={campaigns}
    
    />
  );
};

export default Profile;
