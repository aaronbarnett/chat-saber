import React, { useState, useEffect } from "react";

import { useAtom } from 'jotai'

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';

import useProfile from "../hooks/useProfile";
import assets from "../services/assets";
import chatgpt from "../services/chatgpt";

import MessageList from "./MessageList";
import TopicStore from "../services/TopicStore";


const Chat = ({ topicId }) => {
  const profile = useProfile();

  const topicStore = TopicStore();
  const [topics, setTopics] = useAtom(topicStore.atom);
  const topic = topics.find(topic => topic.id === topicId) || {};

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const sendMessage = () => {
    setIsLoading(true);

    const userMessage = {
      role: "user",
      content: input,
    };

    topicStore.addMessage(topicId, userMessage)
    
    setInput("");

    (async () => {
      try{
  
        const json = await chatgpt.completions(profile.apiKey, topic.messages);
  
        let message = {};
        if(json.choices){
          message.role ="assistant";
          message.choices =json.choices[0];
          message.content =json.choices[0].message.content.trim();
        }else{
          message.role = "error";
          message.content = json.error.message;
        }
        topicStore.addMessage(topicId, message)
        
        setIsLoading(false);
      }catch(e){
        console.log('Chat.sendMessage error:', e);
      }
    })();

  };

  return (
    <div className="flex-column chatbot">
      <div className="flex-row topic-header">
        <div className="topic-picture-wrap active">
          <span className="topic-picture active">
            { topic.icon ? assets.topic_icons[topic.icon] : "" }
          </span>
        </div>
        <div className="flex-column topic-details">
          <TextField
            hiddenLabel
            id="outlined-basic"
            label="Topic"
            variant="outlined"
            size="small"
            value={topic.name}
            onChange={(e)=>{topicStore.modifyTopic(topicId, {name: e.target.value})}}     
            />
          {/* <div className="topic-name">{topic.name} ({topics.length}, {topic.messages.length})</div>
          <div className="topic-summary">{topic.summary}</div> */}
        </div>
      </div>

      <MessageList topicID={topicId} messages={topic.messages} />

      <div className="flex-column input-container">
        <div className="flex-row">
          <Select
            value="gpt-3.5-turbo"
            size="small"
          >
            <MenuItem key={-1} value="gpt-3.5-turbo">gpt-3.5-turbo</MenuItem>
            {profile.models.data ? profile.models.data.map((model, index) => {
              return <MenuItem key={index} value="{model.id}">{model.id}</MenuItem>;
            }) : ""}
            
          </Select>
          <div className="flex-column chat-temp">
            <span>Temperature</span>
            <Slider
              min={0}
              max={1}
              step={0.01}
              size="small"
            ></Slider>
          </div>
        </div>

        <textarea
          className="message-input"
          type="text"
          placeholder="Add user message"
          value={input}
          onChange={handleChange}
        />
        { !isLoading && (
          <button className="button-primary" onClick={sendMessage}>
            <span /*SendIcon*/ className="send-icon">►</span>
          </button>
        )}
      </div>

    </div>
  );
};

export default Chat;
