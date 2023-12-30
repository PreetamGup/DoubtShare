// AskDoubtForm.js

import React, { useContext, useState } from "react";
import axios from 'axios'
import { UserContext } from "../Context/userContext";

const AskDoubt = () => {
  const [subject, setSubject] = useState("");
  const [doubt, setDoubt] = useState("");
  const [topic , setTopic ] = useState("");
  const{user:{_id,language,classGrade}} = useContext(UserContext)

  const handleSubmit =async (e) => {
    e.preventDefault();
    const doubtContent={
      doubt,
      subject,
      topic,
      studentId:_id,
      language,
      classGrade
    }
    
    try {
      const response = await axios.post("/doubt/createdoubt", {...doubtContent}, {withCredentials:true});

      if(response.data.success){
        alert("Your Doubt Submited")
        setDoubt("")
        setSubject("")
        setTopic("")
      }else{
        alert(response.data.message)
      }

    } catch (error) {
      console.error(error);
      
    }

  };

  return (
    <div className="mx-auto w-full mt-2">
      <div className="w-5/6 mx-auto">
      <h1 className="text-2xl font-serif font-semibold text-center">Ask Your Doubt</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full my-8 p-6 bg-slate-100 bg-opacity-15 rounded-md shadow-lg"
      >
        <div className="mb-4">
          <label
            htmlFor="subject"
            className="block text-black text-sm font-bold mb-2"
          >
            Choose your subject:
          </label>
          <select
            id="subject"
            name="subject"
            value={subject}
            onChange={(e)=> setSubject(e.target.value)}
            className="w-full border p-2 rounded-md"
            required
          >
            <option value="">Select a subject</option>
            <option value="english">English</option>
            <option value="maths">Maths</option>
            <option value="science">Science</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="topic"
            className="block text-black text-sm font-bold mb-2"
          >
            Enter your topic:
          </label>
          <input
            id="topic"
            name="topic"
            value={topic}
            onChange={(e)=> setTopic(e.target.value)}
            className="w-full border p-2 rounded-md"
            required
          >
           
          </input>
        </div>

        <div className="mb-4">
          <label
            htmlFor="doubt"
            className="block text-black text-sm font-bold mb-2"
          >
            Write down your doubt below:
          </label>
          <textarea
            id="doubt"
            name="doubt"
            value={doubt}
            onChange={(e)=> setDoubt(e.target.value)}
            rows="5"
            className="w-full border p-2 rounded-md"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-700 text-white p-2 rounded-md hover:bg-blue-800"
        >
          Submit
        </button>
      </form>
      </div>
    </div>
  );
};

export default AskDoubt;
