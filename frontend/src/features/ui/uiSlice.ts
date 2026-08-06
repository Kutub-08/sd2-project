import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type UiState = {
  filterPanelOpen: boolean
}

const initialState: UiState = {
  filterPanelOpen: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleFilterPanel(state) {
      state.filterPanelOpen = !state.filterPanelOpen
    },
    setFilterPanelOpen(state, action: PayloadAction<boolean>) {
      state.filterPanelOpen = action.payload
    },
  },
})

export const { toggleFilterPanel, setFilterPanelOpen } = uiSlice.actions
export default uiSlice.reducer
