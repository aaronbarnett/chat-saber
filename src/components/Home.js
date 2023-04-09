import React, { useState } from "react";
import { useSelector } from "react-redux";

import Login from "./Login";
import TopicList from "./TopicList";
import Chat from "./Chat";
import Boop from "./Boop";

import TopicStore from "../services/TopicStore";

import artSaberLogo from "../art/saber.png";

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

const Home = () => {
  
  const [selectedTopic, setSelectedTopic] = useState(null);
  // const topics = useSelector((state) => state.topics);
  const topicStore = TopicStore();

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };

  const handleResetSelect = () => {
    setSelectedTopic(undefined);
  };

  const newTopic = () => {
    console.log('new topic');
  };

  return (
    <div className="flex-row home">
      <div className="flex-column topic-list">
        <div className="topic-list-header">
          <img src={artSaberLogo} alt="Chat Saber" onClick={handleResetSelect}/>
          <span onClick={handleResetSelect}>Chat Saber</span>
        </div>
        <TopicList onTopicSelect={handleTopicSelect} />
        <div className="topic-list-footer" onClick={newTopic}>
          <AddCircleOutlineIcon/>
          <span>New Topic</span>
          
          <ArrowCircleDownIcon/>
          <span>Import Topic</span>
        </div>
      </div>

      {selectedTopic ? (
        <Chat topicId={selectedTopic.id} />
      ) : (
        <div className="flex-column home-base placeholder">
          <span>Chat Saber is about curating prompt sets</span>
          <br/>
          <span>Edit, reorder, reprioritize</span>
          <br/>
          <span>Drive consistent output</span>
          <br/>
          {/* <Boop/> */}
        </div>
      )}
      <Login/>
    </div>
  );
};

export default Home;
