import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import DroppableList from './components/DroppableList/DroppableList';
import EditModal from './components/EditModal/EditModal';
import { moveField, reorderFields, setEditingField, updateField } from './store/fieldsSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { tab1, tab2, editingField } = useSelector((state) => state.fields);

  const handleMove = (fromList, toList, dragIndex) => {
    dispatch(moveField({ fromList, toList, dragIndex }));
  };

  const handleReorder = (listId, dragIndex, hoverIndex) => {
    dispatch(reorderFields({ listId, dragIndex, hoverIndex }));
  };

  const handleEdit = (field) => {
    dispatch(setEditingField(field));
  };

  const handleUpdate = (field) => {
    dispatch(updateField(field));
  };

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
              onEdit={handleEdit}
            />
          </div>
          <div className="tab">
            <h2>Tab 2</h2>
            <DroppableList
              listId="tab2"
              fields={tab2}
              onMove={handleMove}
              onReorder={handleReorder}
              onEdit={handleEdit}
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