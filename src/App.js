import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import DroppableList from './components/DroppableList/DroppableList';
import EditModal from './components/EditModal/EditModal';
import { moveField, reorderFields, setEditingField, updateField, setAllFields } from './store/fieldsSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { tab1, tab2, editingField } = useSelector((state) => state.fields);

  useEffect(() => {
    if (!window.name) {
      window.name = 'window' + Date.now();
    }

    // Load initial state
    const savedState = localStorage.getItem('fieldsState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      dispatch(setAllFields(parsedState));
    }
  }, [dispatch]);

  const saveAndBroadcastState = (newState) => {
    const stateToSave = {
      tab1: newState.tab1,
      tab2: newState.tab2,
      timestamp: Date.now()
    };
    localStorage.setItem('fieldsState', JSON.stringify(stateToSave));
    // Broadcast the change
    localStorage.setItem('stateUpdate', JSON.stringify({
      ...stateToSave,
      sourceWindow: window.name
    }));
  };

  const handleMove = (fromList, toList, dragIndex) => {
    dispatch(moveField({ fromList, toList, dragIndex }));
    const currentState = {
      tab1: [...tab1],
      tab2: [...tab2]
    };
    if (fromList === 'tab1') {
      currentState.tab1 = currentState.tab1.filter((_, index) => index !== dragIndex);
      currentState.tab2 = [...tab2, tab1[dragIndex]];
    } else {
      currentState.tab2 = currentState.tab2.filter((_, index) => index !== dragIndex);
      currentState.tab1 = [...tab1, tab2[dragIndex]];
    }
    saveAndBroadcastState(currentState);
  };

  const handleReorder = (listId, dragIndex, hoverIndex) => {
    dispatch(reorderFields({ listId, dragIndex, hoverIndex }));
    const currentState = {
      tab1: [...tab1],
      tab2: [...tab2]
    };
    const list = currentState[listId];
    const [removed] = list.splice(dragIndex, 1);
    list.splice(hoverIndex, 0, removed);
    currentState[listId] = list;
    saveAndBroadcastState(currentState);
  };

  const handleUpdate = (field) => {
    dispatch(updateField(field));
    const currentState = {
      tab1: tab1.map(f => f.id === field.id ? field : f),
      tab2: tab2.map(f => f.id === field.id ? field : f)
    };
    saveAndBroadcastState(currentState);
  };

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'stateUpdate') {
        try {
          const update = JSON.parse(e.newValue);
          // Only process updates from other windows
          if (update.sourceWindow !== window.name) {
            dispatch(setAllFields({
              tab1: update.tab1,
              tab2: update.tab2
            }));
          }
        } catch (error) {
          console.error('Error processing state update:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <div className="tabs-container">
          <div className="tab">
            <h2>Tab 1</h2>
            <DroppableList
              listId="tab1"
              fields={tab1}
              onMove={handleMove}
              onReorder={handleReorder}
              onEdit={(field) => dispatch(setEditingField(field))}
            />
          </div>
          <div className="tab">
            <h2>Tab 2</h2>
            <DroppableList
              listId="tab2"
              fields={tab2}
              onMove={handleMove}
              onReorder={handleReorder}
              onEdit={(field) => dispatch(setEditingField(field))}
            />
          </div>
        </div>

        {editingField && (
          <EditModal
            field={editingField}
            onUpdate={handleUpdate}
            onClose={() => dispatch(setEditingField(null))}
          />
        )}
      </div>
    </DndProvider>
  );
}

export default App;