
import { atom, useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import assets from './assets';

const topicsAtom = atomWithStorage('topics', assets.defaultTopics); //[]);

function TopicStore() {
  const [topics, setTopics] = useAtom(topicsAtom);

  const getTopic = (topicId) => {
    const topic = topics.find((c) => c.id === topicId);
    return topic;
  }

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
    console.log('TopicStore.addMessage', topicId, message, topic);
    if (topic) {
      message.id = bumpMaxId(topic);
      topic.messages.push(message);
      setTopics(topics);
      console.log('TopicStore.addMessage added', message);
    }
    return topic.messages;
  };

  const modifyMessage = (topicId, messageId, delta) => {
    const topic = topics.find((c) => c.id === topicId);
    console.log('TopicStore.modifyMessage', topicId, messageId);
    if (topic) {
      const index = topic.messages.findIndex((c) => c.id === messageId);
      console.log('TopicStore.modifyMessage', topicId, messageId, index);
      const message = topic.messages[index];
      topic.messages[index]= { ...message, ...delta };
      setTopics(topics);
      console.log('TopicStore.modifyMessage pushed');
    }
    return topic.messages;
  };

  const removeMessage = (topicId, messageId) => {
    const topic = topics.find((c) => c.id === topicId);
    console.log('TopicStore.removeMessage', topicId, messageId);
    if (topic) {
      const index = topic.messages.findIndex((c) => c.id === messageId);
      console.log('TopicStore.removeMessage', topicId, messageId, index);
      topic.messages.splice(index,1);
      setTopics(topics);
      console.log('TopicStore.removeMessage pushed');
    }
    return topic.messages;
  };

  return {
    topic: getTopic,
    topics: topics, 
    setTopics: setTopics,
    addMessage: addMessage,
    modifyMessage: modifyMessage,
    removeMessage: removeMessage,
  };

}

export default TopicStore;


