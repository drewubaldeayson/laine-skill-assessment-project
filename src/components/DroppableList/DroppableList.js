import React, { useEffect } from 'react';
import { useDrop } from 'react-dnd';
import DraggableField from '../DraggableField/DraggableField';
import './DroppableList.css';

const DroppableList = ({ listId, fields, onMove, onEdit, onReorder }) => {
  const handleDrop = (e) => {
    e.preventDefault();
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      const sourceWindow = data.sourceWindow;
      const currentWindow = window.name || 'window1';

      if (sourceWindow !== currentWindow) {
        onMove(data.listId, listId, data.index);
        // Notify other windows about the change
        localStorage.setItem('lastDragOperation', JSON.stringify({
          sourceWindow,
          targetWindow: currentWindow,
          sourceList: data.listId,
          targetList: listId,
          fieldIndex: data.index,
          timestamp: Date.now()
        }));
      }
    } catch (error) {
      console.error('Error handling drop:', error);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'lastDragOperation') {
        try {
          const operation = JSON.parse(e.newValue);
          const currentWindow = window.name || 'window1';
          
          if (operation.sourceWindow === currentWindow || 
              operation.targetWindow === currentWindow) {
          }
        } catch (error) {
          console.error('Error processing storage event:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const [{ isOver }, drop] = useDrop({
    accept: 'field',
    drop: (item) => {
      if (item.listId !== listId) {
        onMove(item.listId, listId, item.index);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={`drop-area ${isOver ? 'active' : ''}`}
    >
      {fields.map((field, index) => (
        <DraggableField
          key={field.id}
          field={field}
          index={index}
          listId={listId}
          onEdit={onEdit}
          onReorder={onReorder}
        />
      ))}
    </div>
  );
};

export default DroppableList;