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
1. Drag and drop between tabs and windows

- Smooth drag and drop interaction
- Visual feedback during dragging
- Cross-tab and cross-window field movement

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


## State Management and Cross-Tab Communication
The application also implements a robust state synchronization system using Redux for local state management and the Browser's localStorage API for cross-tab communication. This enables real-time state synchronization across multiple browser tabs/windows.

### State Handlers

#### 1. Save and Broadcast Mechanism
```javascript
const saveAndBroadcastState = (newState) => {
  const stateToSave = {
    tab1: newState.tab1,
    tab2: newState.tab2,
    timestamp: Date.now()
  };
  // Persist to localStorage
  localStorage.setItem('fieldsState', JSON.stringify(stateToSave));
  // Broadcast to other tabs
  localStorage.setItem('stateUpdate', JSON.stringify({
    ...stateToSave,
    sourceWindow: window.name
  }));
};
```
**Purpose**: 
- Saves current state to localStorage
- Broadcasts state changes to other tabs
- Includes timestamp and window identifier for state tracking

#### 2. Move Handler
```javascript
const handleMove = (fromList, toList, dragIndex) => {
  // Update local Redux state
  dispatch(moveField({ fromList, toList, dragIndex }));
  
  // Prepare new state for broadcasting
  const currentState = {
    tab1: [...tab1],
    tab2: [...tab2]
  };
  
  // Update arrays based on move operation
  if (fromList === 'tab1') {
    currentState.tab1 = currentState.tab1.filter((_, index) => index !== dragIndex);
    currentState.tab2 = [...tab2, tab1[dragIndex]];
  } else {
    currentState.tab2 = currentState.tab2.filter((_, index) => index !== dragIndex);
    currentState.tab1 = [...tab1, tab2[dragIndex]];
  }
  
  // Save and broadcast new state
  saveAndBroadcastState(currentState);
};
```
**Purpose**:
- Handles field movement between tabs
- Updates local state via Redux
- Broadcasts state change to other tabs
- Maintains array integrity during moves

#### 3. Reorder Handler
```javascript
const handleReorder = (listId, dragIndex, hoverIndex) => {
  // Update local Redux state
  dispatch(reorderFields({ listId, dragIndex, hoverIndex }));
  
  // Prepare new state for broadcasting
  const currentState = {
    tab1: [...tab1],
    tab2: [...tab2]
  };
  
  // Perform reorder operation
  const list = currentState[listId];
  const [removed] = list.splice(dragIndex, 1);
  list.splice(hoverIndex, 0, removed);
  currentState[listId] = list;
  
  // Save and broadcast new state
  saveAndBroadcastState(currentState);
};
```
**Purpose**:
- Handles field reordering within tabs
- Updates local state
- Maintains array order
- Synchronizes reorder across tabs

#### 4. Update Handler
```javascript
const handleUpdate = (field) => {
  // Update local Redux state
  dispatch(updateField(field));
  
  // Prepare new state with updated field
  const currentState = {
    tab1: tab1.map(f => f.id === field.id ? field : f),
    tab2: tab2.map(f => f.id === field.id ? field : f)
  };
  
  // Save and broadcast new state
  saveAndBroadcastState(currentState);
};
```
**Purpose**:
- Handles field property updates
- Updates field in both tabs if present
- Maintains field consistency across tabs

### Storage Listener Implementation

#### 1. Initial State Loading
```javascript
useEffect(() => {
  // Set unique window identifier
  if (!window.name) {
    window.name = 'window' + Date.now();
  }

  // Load existing state
  const savedState = localStorage.getItem('fieldsState');
  if (savedState) {
    const parsedState = JSON.parse(savedState);
    dispatch(setAllFields(parsedState));
  }
}, [dispatch]);
```
**Purpose**:
- Initializes window identifier
- Loads persisted state on tab open
- Ensures state consistency on startup

#### 2. Storage Event Listener
```javascript
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
```
**Purpose**:
- Listens for state changes from other tabs
- Filters out self-triggered updates
- Updates local state based on external changes
- Handles error cases

### State Flow Diagram
```
┌─────────────────┐     ┌──────────────┐     ┌─────────────────┐
│   User Action   │ ──► │ Redux State  │ ──► │ Local Storage   │
└─────────────────┘     └──────────────┘     └─────────────────┘
                                                     │
                                                     ▼
┌─────────────────┐     ┌──────────────┐     ┌─────────────────┐
│  Other Tabs     │ ◄── │ Storage Event│ ◄── │ State Broadcast │
└─────────────────┘     └──────────────┘     └─────────────────┘
```