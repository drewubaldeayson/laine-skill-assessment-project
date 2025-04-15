# Drag and Drop UI - Technical Documentation for Laine Neural Network Assessment

## Overview
This application is a React-based admin interface that implements drag-and-drop functionality for managing form fields across different tabs. It allows users to reorder fields, move them between tabs, and edit their properties.

## Technical Stack
- **React**: Frontend library for building user interfaces
- **Redux Toolkit**: State management
- **React DnD**: Drag and drop functionality
- **CSS Modules**: Styling solution

## Project Structure
```plaintext
src/
├── components/
│   ├── DraggableField/     # Draggable field component
│   ├── DroppableList/      # Container for draggable fields
│   └── EditModal/          # Modal for editing field properties
├── store/
│   └── fieldsSlice.js      # Redux state management
├── App.js                  # Main application component
└── index.js               # Application entry point
```

## Components Technical Documentation

### Component Overview

#### 1. DraggableField
**Purpose**: Represents an individual draggable field item.

##### Key Features:
- Implements drag functionality using useDrag hook
- Displays field label and type
- Handles click events for editing
- Visual feedback during drag operations

```js
// Key Props
{
  field: Object,        // Field data
  index: Number,        // Position in list
  listId: String,       // Parent list identifier
  onEdit: Function     // Edit handler
}
```

#### 2. DroppableList
**Purpose**: Container that accepts draggable fields.

##### Key Features:
- Implements drop functionality using useDrop hook
- Manages list of draggable fields
- Handles drop events for field reordering

```js
// Key Props
{
  listId: String,       // List identifier
  fields: Array,        // Array of field objects
  onMove: Function,     // Move handler
  onEdit: Function     // Edit handler
}
```

#### 3. EditModal
**Purpose**: Modal interface for editing field properties.

Key Features:
- Form for editing field properties
- Manages local state for field editing
- Handles save and cancel operations
- Responsive design


## State Management
### Redux Store Structure

```js
{
  fields: {
    tab1: Array,         // Fields in first tab
    tab2: Array,         // Fields in second tab
    editingField: Object // Currently edited field
  }
}
```

### Actions
1. `moveField`: Moves a field between tabs
2. `setEditingField`: Sets the current field being edited
3. `updateField`: Updates field properties

### Field Data Structure

```js
{
  id: String,           // Unique identifier
  type: String,         // 'text' | 'checkbox' | 'date'
  label: String,        // Display label
  placeholder?: String, // Optional placeholder
  checked?: Boolean,    // For checkbox type
  value?: String       // Field value
}
```

### Styling
- Each component has its own CSS module
- Responsive design using flexbox
- Transition animations for smooth user experience
- Consistent color scheme and spacing


### Key Features
1. Drag and drop between tabs

- Smooth drag and drop interaction
- Visual feedback during dragging
- Cross-tab field movement

2. Field property editing

- Modal-based editing interface
- Real-time preview
- Form validation

3. Visual feedback

- Drag state indication
- Drop zone highlighting
- Transition animations

4. Responsive design

- Flexbox-based layout
- Mobile-friendly interface
- Adaptive spacing

5. State persistence

- Redux-based state management
- Predictable state updates
- Action/reducer pattern

6. Modular component structure

- Separated concerns
- Reusable components
- Clean component hierarchy