
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


  // const getNextTopicId = () => {
  //   let max = 1;
  //   if(!max){
  //     max = Math.max.apply(Math, topics.map(function(o) { return o.id || 1; }))
  //   }
  //   max = max + 1;
  //   return max;
  // };



  const getTopic = (topicId) => {
    const topic = topics.find((c) => c.id === topicId);
    return topic;
  }

  const addTopic = () => {
    const allIds = [0].concat(topics.map(function(o) { return o.id || 0; }))
    const topicId = Math.max.apply(Math, allIds) + 1;
    const topic = {
      id: topicId,
      name: `New Topic ${topicId}`,
      icon: topicId % (assets.topic_icons.length - 1),
    };
    console.log('TopicStore.addTopic', topic);
    topics.push(topic);
    setTopics([...topics]);
    console.log('TopicStore.addMessage added', topic.id);
  }
  
  const modifyTopic = (topicId, delta) => {
    const index = topics.findIndex((c) => c.id === topicId);
    if (index >= 0) {
      // console.log('TopicStore.modifyTopic before', topicId);
      topics[index] = { ...topics[index], ...delta };
      setTopics([...topics]);    
    }
  }

  const removeTopic = (topicId) => {
    const index = topics.findIndex((c) => c.id === topicId);
    if (index >= 0) {
      console.log('TopicStore.removeTopic before', topicId);
      topics.splice(index,1);
      setTopics([...topics]);    
    }

  }



  const bumpMaxMessageId = (topic) => {
    let max = topic.maxId;
    // console.log('TopicStore.bumpMaxMessageId before', max);
    if(!max){
      max = Math.max.apply(Math, topic.messages.map(function(o) { return o.id || 1; }))
      // console.log('TopicStore.bumpMaxMessageId max', max);
      if(!max || max < 1){
        max = 0;
      }
      // console.log('TopicStore.bumpMaxMessageId after', max);
    }
    topic.maxId = max + 1;
    // console.log('TopicStore.bumpMaxMessageId maxId', topic.maxId);
    return topic.maxId;
  };


  const addMessage = (topicId, message) => {
    const topic = topics.find((c) => c.id === topicId);
    // console.log('TopicStore.addMessage', topicId, message, topic);
    if (topic) {
      if(!topic.messages){
        topic.messages = [];
      }
      message.id = bumpMaxMessageId(topic);
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

  
  const modifyMessages = (topicId, messages) => {
    const topic = topics.find((c) => c.id === topicId);
    // console.log('TopicStore.modifyMessage', topicId, messageId);
    if (topic) {
      topic.messages = messages;
      setTopics([...topics]);
      console.log('TopicStore.modifyMessage pushed', topicId, messages);
    }
    return topic.messages;
  };






  return {
    atom: topicsAtom,

    topic: getTopic,

    addTopic: addTopic,
    modifyTopic: modifyTopic,
    removeTopic: removeTopic,

    addMessage: addMessage,
    modifyMessage: modifyMessage,
    removeMessage: removeMessage,

    modifyMessages: modifyMessages,
  };

}

export default TopicStore;


