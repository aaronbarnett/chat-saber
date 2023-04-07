
import { atom, useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import assets from './assets';

const topicsAtom = atomWithStorage('topics', assets.defaultTopics); //[]);


window.topics = function() {
  return JSON.parse(localStorage.getItem('topics'));
};

window.reset_topics = function() {
  localStorage.removeItem('topics')
};



function TopicStore() {
  const [topics, setTopics] = useAtom(topicsAtom);

  const getTopic = (topicId) => {
    const topic = topics.find((c) => c.id === topicId);
    return topic;
  }

  
  const modifyTopic = (topicId, delta) => {
    const index = topics.findIndex((c) => c.id === topicId);
    if (index >= 0) {
      // console.log('TopicStore.modifyTopic before', topicId);
      topics[index] = { ...topics[index], ...delta };
      setTopics([...topics]);    
    }
  };



  const bumpMaxId = (topic) => {
    let max = topic.maxId;
    if(!max){
      max = Math.max.apply(Math, topic.messages.map(function(o) { return o.id || 1; }))
    }
    topic.maxId = max + 1;
    return topic.maxId;
  };


  const addMessage = (topicId, message) => {
    const topic = topics.find((c) => c.id === topicId);
    // console.log('TopicStore.addMessage', topicId, message, topic);
    if (topic) {
      message.id = bumpMaxId(topic);
      topic.messages.push(message);
      setTopics([...topics]);
      console.log('TopicStore.addMessage added', topicId, message);
    }
    return topic.messages;
  };

  const modifyMessage = (topicId, messageId, delta) => {
    const topic = topics.find((c) => c.id === topicId);
    // console.log('TopicStore.modifyMessage', topicId, messageId);
    if (topic) {
      const index = topic.messages.findIndex((c) => c.id === messageId);
      if(index >= 0){
        // console.log('TopicStore.modifyMessage', topicId, messageId, index);
        const message = topic.messages[index];
        topic.messages[index]= { ...message, ...delta };
        setTopics([...topics]);
        console.log('TopicStore.modifyMessage pushed', topicId, messageId);
      }
    }
    return topic.messages;
  };

  const removeMessage = (topicId, messageId) => {
    const topic = topics.find((c) => c.id === topicId);
    // console.log('TopicStore.removeMessage', topicId, messageId);
    if (topic) {
      const index = topic.messages.findIndex((c) => c.id === messageId);
      if(index >= 0){
        // console.log('TopicStore.removeMessage', topicId, messageId, index);
        topic.messages.splice(index,1);
        setTopics([...topics]);
        console.log('TopicStore.removeMessage removed', topicId, messageId);
      }
    }
    return topic.messages;
  };







  return {
    atom: topicsAtom,

    topic: getTopic,

    modifyTopic: modifyTopic,

    addMessage: addMessage,
    modifyMessage: modifyMessage,
    removeMessage: removeMessage,
  };

}

export default TopicStore;


