import React, { useState, useEffect } from "react";

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';

import useProfile from "../hooks/useProfile";
import assets from "../services/assets";
import chatgpt from "../services/chatgpt";

import MessageList from "./MessageList";
import TopicStore from "../services/TopicStore";


const Chat = ({ selectedTopic }) => {
  const profile = useProfile();
  const topicStore = TopicStore();

  // let messages = selectedTopic.messages;
  const [messages, setMessages] = useState([ ...topicStore.topic(selectedTopic.id).messages]);
  const refreshMessages = () => {
    setMessages([ ...topicStore.topic(selectedTopic.id).messages]);
  }

  useEffect(() => {
    console.log('chat.useEffect.messages:', topicStore.topics);
  }, [topicStore.topics]);



  const [input, setInput] = useState("");
  const [messageWaiting, setMessageWaiting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const sendMessage = () => {
    const userMessage = {
      role: "user",
      content: input,
    };

    /* messages = */ topicStore.addMessage(selectedTopic.id, userMessage)
    refreshMessages();

    setInput("");
    setMessageWaiting(true);

    (async () => {
      try{
        setIsLoading(true);
  
        const json = await chatgpt.completions(profile.apiKey, messages);
  
        let message = {};
        if(json.choices){
          message.role ="assistant";
          message.choices =json.choices[0];
          message.content =json.choices[0].message.content.trim();
        }else{
          message.role = "error";
          message.content = json.error.message;
        }
        /* messages = */ topicStore.addMessage(selectedTopic.id, message)
        refreshMessages();
  
        setMessageWaiting(false);
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
            { selectedTopic.icon ? assets.converstaion_icons[selectedTopic.icon] : "" }
          </span>
        </div>
        <div className="flex-column topic-details">
          <div className="topic-name">{selectedTopic.name} ({messages.length})</div>
          <div className="topic-summary">{selectedTopic.summary}</div>
        </div>
      </div>

      <MessageList topicID={selectedTopic.id} messages={messages} />

      {isLoading && (
        <div className="flex-row message assistant loading-message">
          <div className="message-bubble">
            <p>...</p>
            <div className="loader"></div>
          </div>
        </div>
      )}


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
        <button className="button-primary" onClick={sendMessage}>
          <span /*SendIcon*/ className="send-icon">►</span>
        </button>
      </div>

    </div>
  );
};

export default Chat;
