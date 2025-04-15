import React from 'react';
import { useDrag } from 'react-dnd';
import './DraggableField.css';

const DraggableField = ({ field, index, listId, onEdit }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'field',
    item: { index, id: field.id, listId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`field-item ${isDragging ? 'dragging' : ''}`}
      onClick={() => onEdit(field)}
    >
      {field.label} ({field.type})
    </div>
  );
};

export default DraggableField;