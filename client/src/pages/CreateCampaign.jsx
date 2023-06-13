import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { money } from "../assets";
import Button from "../components/Button";
import { checkIfImage } from "../utils";
import { useStateContext } from "../context";

import FormInput from "../components/FormInput";
import Loader from "../components/Loader";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {createCampaign}=useStateContext()
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: '',
  });

  const handleFormInputChange = (fieldname, e) => {
    setForm({ ...form, [fieldname]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    checkIfImage(form.image, async (exists)=>{
      if(exists) {
        setIsLoading(true)
        await createCampaign({...form,target:ethers.utils.parseUnits(form.target,18)})
        setIsLoading(false)
        navigate('/')
      }
      else{
        alert('Provide valid image URL');
        setForm({...form,image:''})
      }
     
    })
    
    console.log(form);

  };
  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader/>}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Start a Campaign
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px] "
      >
        <div className="flex flex-wrap gap-[40px] ">
          <FormInput
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormInputChange("name", e)}
          />

          <FormInput
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormInputChange("title", e)}
          />
        </div>

        <FormInput
          labelName="Story *"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormInputChange("description", e)}
        />
        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img
            src={money}
            alt=""
            className="w-[40px] h-[40px] object-contain"
          />
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px] ">
            100% of raised amount will be given to you!
          </h4>
        </div>

        <div className="flex flex-wrap gap-[40px] ">
          <FormInput
            labelName="Goal *"
            placeholder="ETH 2.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormInputChange("target", e)}
          />

          <FormInput
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormInputChange("deadline", e)}
          />
        </div>

        <FormInput
          labelName="Campaign Image *"
          placeholder="Image URL of Campaign"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormInputChange("image", e)}
        />

        <div className="flex justify-center items-center mt-[40px]">
          <Button
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
