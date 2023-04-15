import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Login from "./Login";
import TopicList from "./TopicList";
import Chat from "./Chat";
import Boop from "./Boop";

import TopicStore from "../services/TopicStore";
import useProfile from "../hooks/useProfile";

import artSaberLogo from "../art/saber.png";

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BlockIcon from '@mui/icons-material/Block';



const Home = () => {
  const profile = useProfile();
  
  // const [topicId, setSelectedTopic] = useState(null);
  const [topicId, setTopicId] = useState(null);
  const [deleteWarning, setDeleteWarning] = useState(false);
  
  const topicStore = TopicStore();

  const handleTopicSelect = (id) => {
    // setSelectedTopic(topic);
    setTopicId(id);
  };

  const handleResetSelect = () => {
    // setSelectedTopic(undefined);
    setTopicId(undefined);
  };

  const newTopic = () => {
    console.log('new topic');
    topicStore.addTopic();
  };

  const threatenDelete = () => {
    setDeleteWarning(true);
  };

  const cancelDelete = () => {
    setDeleteWarning(false);
  };

  const doDelete = (topic) => {
    console.log('TopicList doDelete', topicId);
    topicStore.removeTopic(topicId);
    // const newTopic = topics[0];
    setTopicId(undefined);
  };

  useEffect(() => {
    setDeleteWarning(false);
  }, [topicId]);

  return (
    <div className="flex-row home">
      <div className="flex-column topic-list">
        <div className="topic-list-header">
          <img src={artSaberLogo} alt="Chat Saber" onClick={handleResetSelect}/>
          <span onClick={handleResetSelect}>Chat Saber</span>
        </div>
        
        <TopicList onTopicSelect={handleTopicSelect} />

        <br/>
        <div style={{ "background-color": profile.theme.palette.background.default, color: profile.theme.palette.primary.dark }}>

        </div>

        <div className="topic-list-footer">
          <div className="topic-control">
            <AddCircleOutlineIcon onClick={newTopic}/>  
          </div>
          <div className="topic-control">
            <ArrowCircleDownIcon/>
          </div>
          { topicId 
          && (
            deleteWarning 
            ? <div className="topic-control phase">
                <BlockIcon
                  fontSize="small"
                  onClick={() => cancelDelete()}
                />
                <DeleteForeverIcon
                  onClick={() => doDelete()}
                />
              </div>
            : 
              <div className="topic-control">
                <DeleteOutlineIcon
                  onClick={() => threatenDelete()}
                /> 
              </div>
            )
          }
        </div>
      </div>

      {topicId ? (
        <Chat topicId={topicId} />
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
