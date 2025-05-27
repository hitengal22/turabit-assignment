import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Conversations } from '../../data/ConversationList'
import { ConversationMessages } from '../../data/ConversationMessages'
import type { ConversationList, ConversationSliceState } from '../../types'


const initialState: ConversationSliceState = {
  conversations: Conversations,
  conversationMessages: ConversationMessages,
  selectedConversation: null,
  selectedConversationMessages: []
}

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setSelectedConversation: (state, action: PayloadAction<ConversationList>) => {
        state.selectedConversation = action.payload;
        state.selectedConversationMessages = state.conversationMessages[action.payload.id];
    }
  },
})

// Action creators are generated for each case reducer function
export const { setSelectedConversation } = conversationSlice.actions

export default conversationSlice.reducer