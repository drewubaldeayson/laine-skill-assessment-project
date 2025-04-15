import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tab1: [
    { id: '1', type: 'text', label: 'Text Input', placeholder: 'Enter text' },
    { id: '2', type: 'checkbox', label: 'Checkbox Field', checked: false },
    { id: '3', type: 'date', label: 'Date Picker', value: '' },
  ],
  tab2: [],
  editingField: null,
};

const fieldsSlice = createSlice({
  name: 'fields',
  initialState,
  reducers: {
    moveField: (state, action) => {
      const { fromList, toList, dragIndex } = action.payload;
      const [movedItem] = state[fromList].splice(dragIndex, 1);
      state[toList].push(movedItem);
    },
    reorderFields: (state, action) => {
      const { listId, dragIndex, hoverIndex } = action.payload;
      const list = state[listId];
      const [removed] = list.splice(dragIndex, 1);
      list.splice(hoverIndex, 0, removed);
    },
    setEditingField: (state, action) => {
      state.editingField = action.payload;
    },
    updateField: (state, action) => {
      const field = action.payload;
      ['tab1', 'tab2'].forEach((tab) => {
        state[tab] = state[tab].map((f) =>
          f.id === field.id ? field : f
        );
      });
      state.editingField = null;
    },
  },
});

export const { moveField, reorderFields, setEditingField, updateField } = fieldsSlice.actions;
export default fieldsSlice.reducer;