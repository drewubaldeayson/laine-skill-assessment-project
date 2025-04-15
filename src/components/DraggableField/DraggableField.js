import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import './DraggableField.css';

const DraggableField = ({ field, index, listId, onEdit, onReorder }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'field',
    item: { index, id: field.id, listId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'field',
    hover: (dragItem, monitor) => {
      if (!ref.current) return;
      
      const dragIndex = dragItem.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex && dragItem.listId === listId) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
  
      const clientOffset = monitor.getClientOffset();
      
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      if (dragItem.listId === listId) {
        onReorder(listId, dragIndex, hoverIndex);
        dragItem.index = hoverIndex;
      }
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`field-item ${isDragging ? 'dragging' : ''}`}
      onClick={() => onEdit(field)}
    >
      {field.label} ({field.type})
    </div>
  );
};

export default DraggableField;