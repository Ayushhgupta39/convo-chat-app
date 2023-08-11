"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      const response = await axios.get("http://localhost:8080/api/chats");
      setChats(response.data);
    };
    fetchChats();
  }, []);

  return (
    <div>
      Chats
    </div>
  );
};

export default page;
