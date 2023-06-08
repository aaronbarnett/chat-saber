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
import MenuIcon from '@mui/icons-material/Menu';


import TextField from '@mui/material/TextField';


import { EditableText } from "@blueprintjs/core";

import TopicStore from "../services/TopicStore";


import { ReactSortable } from "react-sortablejs";



import '../style/messages.css';


const MessageList = ({ topicID }) => {
  const topicStore = TopicStore();
  const [topics, setTopics] = useAtom(topicStore.atom);
  const topic = topics.find(topic => topic.id === topicID) || {};
  

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

  const updateMessage = (id, index, newRole) => {
    // topicStore.modifyMessage(topicID, id, {role: newRole});
    // refreshMessages();
  }

  const updateMessages = (messages) => {
    topicStore.modifyMessages(topicID, messages);
    // refreshMessages();
  }

  


  const boopMessage = (id, index) => {

  }

  
  const handleChange = (event, id) => {
    // setInput(event.target.value);
    // message.content = event.target.value;
    topicStore.modifyMessage(topicID, id, {content: event.target.value});
  };

  useEffect(() => {
    console.log('MessageList useEffect topic.messages', topic.messages);
  }, [topic.messages]);

  // useEffect(() => {
  //   console.log('MessageList useEffect topics', topics);
  // }, [topics]);


  
  if(topic.messages)
    return (
      <div className="flex-column messages">

        <ReactSortable 
          list={topic.messages}
          setList={updateMessages}
          handle='.handle'
        >
          
          {topic.messages.map((message, index) => (

            <div key={index} className={`message ${message.role}`}>

            <div className="modifiers handle">
              <nobr>
                {/* :{message.id}: */}
                
                {message.role !== "meow"  && <MenuIcon className="handle" fontSize="small"/>}
                {message.role !== "meow"  && <ScatterPlotIcon fontSize="small" onClick={()=>boopMessage(message.id, index)}/>}
                {message.role === "user" && <SwapVerticalCircleIcon fontSize="small" onClick={()=>convertMessage(message.id, index, "system")}/>}
                {message.role === "system" && <SwapVerticalCircleIcon fontSize="small" onClick={()=>convertMessage(message.id, index, "user")}/>}
                <CancelIcon fontSize="small" onClick={()=>removeMessage(message.id)}/>
              </nobr>
            </div>

            <TextField 
              multiline
              // label="Standard" 
              variant="standard" 
              value={message.content}
              onChange={(e)=>handleChange(e, message.id)}
            />

            </div>

          ))}

        </ReactSortable>

        <div ref={scrollToRef} />
      </div>
    );
  
  return <div className="flex-column messages"></div>;
};

export default MessageList;
