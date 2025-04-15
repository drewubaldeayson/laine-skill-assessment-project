import React from 'react';
import { useDrop } from 'react-dnd';
import DraggableField from '../DraggableField/DraggableField';
import './DroppableList.css';

const DroppableList = ({ listId, fields, onMove, onEdit, onReorder }) => {
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
    <div ref={drop} className={`drop-area ${isOver ? 'active' : ''}`}>
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