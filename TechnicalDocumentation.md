# Drag and Drop Admin UI - Technical Documentation

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


