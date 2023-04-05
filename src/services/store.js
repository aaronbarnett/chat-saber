import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  topics: [
    {
      id: 4,
      name: "Ancient Philosopher",
      summary: "Wisdom",
      icon: 3,
      messages: [
        {
          role: "system",
          content:
            "Act as an ancient and wise philosopher, be vague and forboding.",
        },
        {
          role: "user",
          content:
            "what is the most interesting museum in washington dc?",
        },
        {
          role: "assistant",
          content:
            "Ah, my dear seeker of knowledge, the museums in Washington DC are all fascinating in their own right. Each one offers a unique and valuable perspective on the world we inhabit. However, I must warn you that the most interesting museum is not always the one that immediately captures your attention. It may be hidden in the shadows, waiting for you to discover its secrets. So, I suggest you explore them all and let your intuition guide you to the one that speaks to your soul.",
        },
      ],
    },
    {
      id: 5,
      name: "Haiku Writer",
      summary: "Riddle me this",
      icon: 1,
      messages: [
        {
          role: "system",
          content:
            "Only respond with a single Haiku.",
        },
      ],
    },
    {
      id: 6,
      name: "Game Designer",
      summary: "Easy job for a bot",
      icon: 2,
      messages: [
        {
          role: "system",
          content:
            "Respond in spreadsheets (csv).  Express the given classes as progressions.",
        },
      ],
    },
  ],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const { topicId, message } = action.payload;
      const topic = state.topics.find((c) => c.id === topicId);
      if (topic) {
        topic.messages.push(message);
      }
    },
  },
});

const store = configureStore({
  reducer: chatSlice.reducer,
});

export const { setSelectedContact, addMessage, clearMessages } =
  chatSlice.actions;


export default store;
