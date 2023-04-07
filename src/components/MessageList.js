import React, { useState, useEffect, useRef } from "react";

import { useAtom } from 'jotai'

// import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CancelIcon from '@mui/icons-material/Cancel';
// import BuildCircleIcon from '@mui/icons-material/BuildCircle';
// import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';  // choices
// import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
// import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';

import TopicStore from "../services/TopicStore";


const MessageList = ({ topicID }) => {
  const topicStore = TopicStore();
  const [topics, setTopics] = useAtom(topicStore.atom);
  const topic = topics.find(topic => topic.id === topicID);

  // const [messages, setMessages] = useState([ ...topicStore.topic(topicID).messages]);

  const scrollToRef = useRef(null);

  // const refreshMessages = () => {
  //   setMessages([ ...topicStore.topic(topicID).messages]);
  // }
  
  useEffect(() => {
    scrollToRef.current && scrollToRef.current.scrollIntoView({ behavior: "smooth" });
  }, [topic.messages]);



  const removeMessage = (id, index) => {
    topicStore.removeMessage(topicID, id);
    // refreshMessages();
  }

  const convertMessage = (id, index, newRole) => {
    topicStore.modifyMessage(topicID, id, {role: newRole});
    // refreshMessages();
  }

  const boopMessage = (id, index) => {

  }


  useEffect(() => {
    console.log('MessageList useEffect topic.messages', topic.messages);
  }, [topic.messages]);

  useEffect(() => {
    console.log('MessageList useEffect topics', topics);
  }, [topics]);


  return (
    <div className="flex-column messages">
      {topic.messages.map((message, index) => (
        <div key={index} className={`message ${message.role}`}>

          <div className="modifiers">
            <nobr>
              :{message.id}:
              {message.role !== "meow"  && <ScatterPlotIcon fontSize="small" onClick={()=>boopMessage(message.id, index)}/>}
              {message.role === "user" && <SwapVerticalCircleIcon fontSize="small" onClick={()=>convertMessage(message.id, index, "system")}/>}
              {message.role === "system" && <SwapVerticalCircleIcon fontSize="small" onClick={()=>convertMessage(message.id, index, "user")}/>}
              <CancelIcon fontSize="small" onClick={()=>removeMessage(message.id, index)}/>
            </nobr>
          </div>

          {message.content.split("\n").map((line, index) => {
            return (
              <span key={index}>{line}</span>
            );
          })}
        </div>
      ))}
      <div ref={scrollToRef} />
    </div>
  );
};

export default MessageList;
