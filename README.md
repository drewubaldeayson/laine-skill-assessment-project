# Drag and Drop Admin UI - Laine Neural Network Assessment

A React-based admin interface featuring drag-and-drop functionality for managing form fields across different tabs.

## Features

- Drag and drop fields between tabs
- Edit field properties in real-time
- Responsive design
- Multiple field types support
- State management with Redux
- Clean and intuitive UI

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd drag-drop-admin
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```
or
```bash
npm install --force
```

## Running the Application

1. Start the development server:
```bash
npm start
```

2. Open your browser and navigate to:
```
http://localhost:3000
```

## Project Structure

```plaintext
src/
├── components/
│   ├── DraggableField/
│   │   ├── DraggableField.js
│   │   └── DraggableField.css
│   ├── DroppableList/
│   │   ├── DroppableList.js
│   │   └── DroppableList.css
│   └── EditModal/
│       ├── EditModal.js
│       └── EditModal.css
├── store/
│   └── fieldsSlice.js
├── App.js
├── App.css
└── index.js
```

## Usage

### Basic Field Operations

1. **Drag and Drop**
   - Click and hold any field
   - Drag it to another tab
   - Release to drop

2. **Edit Fields**
   - Click on any field to open edit modal
   - Modify field properties
   - Click 'Save' to apply changes

3. **Field Types**
   - Text Input
   - Checkbox
   - Date Picker

## Dependencies

- react
- react-dom
- @reduxjs/toolkit
- react-redux
- react-dnd
- react-dnd-html5-backend

## Contributing

1. Fork the repository
2. Create your feature branch:
```bash
git checkout -b feature/YourFeature
```
3. Commit your changes:
```bash
git commit -m 'Add some feature'
```
4. Push to the branch:
```bash
git push origin feature/YourFeature
```
5. Submit a pull request

## Troubleshooting

### Common Issues

1. **Installation Errors**
   ```bash
   npm install --legacy-peer-deps
   ```
   or
   ```bash
   npm install --force
   ```

2. **Drag and Drop Not Working**
   - Check DndProvider setup
   - Verify HTML5Backend implementation

3. **State Updates Not Reflecting**
   - Check Redux DevTools
   - Verify action dispatches

## Scripts

```json
{
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}
```

## Building for Production

1. Create a production build:
```bash
npm run build
```

2. The build files will be in the `build/` directory

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Contact

Andrew Ayson - drewubaldeayson@example.com