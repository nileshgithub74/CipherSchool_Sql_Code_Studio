# CipherSQL Studio - Frontend

A React-based SQL learning platform where students can practice SQL queries with real-time execution and intelligent hints.

## Features

- **Interactive SQL Editor**: Write and execute SQL queries with syntax highlighting
- **Real-time Results**: View query results in a formatted table
- **Assignment System**: Progressive learning with structured assignments
- **Intelligent Hints**: Get AI-powered hints when stuck
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
src/
├── component/
│   ├── Navbar.jsx          # Navigation bar
│   ├── SQLEditor.jsx       # SQL query editor with execution
│   └── ResultsDisplay.jsx  # Query results display
├── pages/
│   ├── Home.jsx           # Landing page with hero section
│   ├── AssignmentList.jsx # List of available assignments
│   └── Assignment.jsx     # Individual assignment page
├── App.jsx               # Main app component with routing
└── main.jsx             # App entry point
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open http://localhost:5173 in your browser

## Key Components

### SQLEditor
- Syntax highlighting for SQL
- Execute queries with Ctrl+Enter
- Format and clear query functions
- Loading states during execution

### ResultsDisplay
- Tabular display of query results
- Error handling and display
- Execution time tracking
- Empty state handling

### Assignment System
- Progressive difficulty levels
- Database schema visualization
- Hint system for learning assistance
- Mock data for development

## Tech Stack

- **React 19** - UI framework
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling and responsive design
- **Vite** - Build tool and dev server

## Next Steps

To complete the full application:

1. **Backend Integration**: Connect to Express.js API
2. **Monaco Editor**: Replace textarea with Monaco Editor for better SQL editing
3. **Authentication**: Add user login and progress tracking
4. **Real Database**: Connect to PostgreSQL for query execution
5. **AI Hints**: Integrate with LLM API for intelligent hints

## API Integration Points

The frontend is ready to integrate with these backend endpoints:

- `GET /api/assignments` - Fetch assignment list
- `GET /api/assignments/:id` - Fetch specific assignment
- `POST /api/execute` - Execute SQL query
- `POST /api/hint` - Request AI-generated hint
- `POST /api/progress` - Save user progress