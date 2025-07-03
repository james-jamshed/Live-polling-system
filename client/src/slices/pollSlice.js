import { createSlice } from '@reduxjs/toolkit';

const pollSlice = createSlice({
  name: 'poll',
  initialState: {
    question: null,
    answers: {},
    chat: [],
  },
  reducers: {
    setQuestion: (state, action) => {
      state.question = action.payload;
    },
    setAnswers: (state, action) => {
      state.answers = action.payload;
    },
    addChat: (state, action) => {
      state.chat.push(action.payload);
    },
  },
});

export const { setQuestion, setAnswers, addChat } = pollSlice.actions;
export default pollSlice.reducer;
