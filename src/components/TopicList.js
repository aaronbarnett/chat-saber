import React, { useEffect, useState, useMemo } from "react";

import { useAtom } from 'jotai'

import assets from "../services/assets";
import TopicStore from "../services/TopicStore";
import useProfile from "../hooks/useProfile";


const TopicList = ({ onTopicSelect }) => {
  const profile = useProfile();

  const topicStore = TopicStore();
  const [topics, setTopics] = useAtom(topicStore.atom);

  const [topicId, setTopicId] = useState(null);
  


  const handleTopicClick = (topic) => {
    onTopicSelect(topic.id);
    setTopicId(topic.id);
  };


  
  // console.log(topics);
  

  const styleBase = useMemo(()=>{ return {
    "background-color": profile.theme.palette.background.default, 
    color: profile.theme.palette.primary.dark,
  }}, [profile.theme]);

  const styleActive = useMemo(()=>{ return {
    "background-color": profile.theme.palette.primary.dark, 
    color: profile.theme.palette.common.white,
  }}, [profile.theme]);


  return (
    <>
    {topics.map((topic) => (
      <div
        key={topic.id}
        className={`flex-row topic ${(topicId === topic.id) ? "active" : ""}`}
        onClick={() => handleTopicClick(topic)}
      >
        <div className={`topic-picture-wrap`}>
          <span className={`topic-picture`}
          >
            { topic.icon ? assets.topic_icons[topic.icon] : "" }
          </span>
        </div>
        <div className="flex-column topic-details">
          <div className="topic-name">{topic.name}</div>
          <div className="topic-summary">{topic.model}</div>
        </div>
      </div>
    ))}
    </>
  );
};



export default TopicList;

