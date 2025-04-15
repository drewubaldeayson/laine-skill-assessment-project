import React, { useState } from 'react';
import './EditModal.css';

const EditModal = ({ field, onUpdate, onClose }) => {
  const [editedField, setEditedField] = useState(field);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedField((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Edit Field</h3>
        <div className="form-group">
          <label>Label:</label>
          <input
            type="text"
            name="label"
            value={editedField.label}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Type:</label>
          <select
            name="type"
            value={editedField.type}
            onChange={handleChange}
          >
            <option value="text">Text</option>
            <option value="checkbox">Checkbox</option>
            <option value="date">Date</option>
          </select>
        </div>
        <div className="button-group">
          <button className="save-button" onClick={() => onUpdate(editedField)}>
            Save
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;