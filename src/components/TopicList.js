import React, { useState } from "react";

import assets from "../services/assets";

const TopicList = ({ topics, onTopicSelect }) => {
  const [selectedTopicId, setSelectedTopicId] = useState(null);

  const handleTopicClick = (topic) => {
    onTopicSelect(topic);
    setSelectedTopicId(topic.id);
  };

  // console.log(topics);

  return (
    <>
    {topics.map((topic) => (
      <div
        key={topic.id}
        className={`flex-row topic ${
          selectedTopicId === topic.id ? "active" : ""
        }`}
        onClick={() => handleTopicClick(topic)}
      >
        <div
          className={`topic-picture-wrap ${
            selectedTopicId === topic.id ? "active" : ""
          }`}
        >
          <span className={`topic-picture ${
              selectedTopicId === topic.id ? "active" : ""
            }`}
          >
            { topic.icon ? assets.converstaion_icons[topic.icon] : "" }
          </span>
        </div>
        <div className="flex-column topic-details">
          <div className="topic-name">{topic.name}</div>
          <div className="topic-summary">{topic.summary}</div>
        </div>
      </div>
    ))}
    </>
  );
};

export default TopicList;
