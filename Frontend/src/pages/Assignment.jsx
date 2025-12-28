import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_CONFIG from "../config/api";
import Editor from '@monaco-editor/react';
import '../styles/Assignment.css';

const Assignment = () => {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [results, setResults] = useState(null);
  const [validation, setValidation] = useState(null);
  const [schemaId, setSchemaId] = useState(null);
  const [tables, setTables] = useState([]);
  const [query, setQuery] = useState("");
  const [executionTime, setExecutionTime] = useState(null);

  useEffect(() => {
    loadAssignment();
  }, [id]);

  const loadAssignment = async () => {
    try {
      console.log('Loading assignment with ID:', id);
      console.log('API URL:', API_CONFIG.BASE_URL);
      
      const response = await axios.post(`${API_CONFIG.BASE_URL}/sql/assignment/load`, {
        assignmentId: id,
        sessionId: `session_${Date.now()}`
      });
      
      console.log('Assignment loaded:', response.data);
      
      const { assignment, schemaId, tables = [] } = response.data.data;
      
      setAssignment(assignment);
      setSchemaId(schemaId);
      setTables(tables);
      
      // Set initial query based on assignment
      if (assignment.title.toLowerCase().includes('select')) {
        setQuery('SELECT * FROM Employees;');
      }
    } catch (error) {
      console.error('Error loading assignment:', error);
      console.error('Error details:', error.response?.data || error.message);
    }
  };

  const executeQuery = async () => {
    if (!query.trim()) return;
    
    try {
      console.log('Executing query:', query);
      console.log('Schema ID:', schemaId);
      
      const executeResponse = await axios.post(`${API_CONFIG.BASE_URL}/sql/query/execute`, {
        query,
        schemaId
      });
      
      console.log('Query results:', executeResponse.data);
      const { data: queryResults } = executeResponse.data;
      setResults(queryResults);
      setExecutionTime(queryResults.executionTime);
      
      const validateResponse = await axios.post(`${API_CONFIG.BASE_URL}/sql/query/validate`, {
        query,
        assignmentId: assignment._id,
        schemaId
      });
      
      console.log('Validation results:', validateResponse.data);
      const { data: validationResults } = validateResponse.data;
      setValidation(validationResults);
    } catch (error) {
      console.error('Error executing query:', error);
      console.error('Error details:', error.response?.data || error.message);
    }
  };

  const resetQuery = () => {
    setQuery('');
    setResults(null);
    setValidation(null);
    setExecutionTime(null);
  };

  if (!assignment) return null;

  return (
    <div className="assignment-page">
      {/* Top Navigation */}
      <div className="top-nav">
        <div className="nav-left">
          <button className="back-btn">← Problems</button>
          <h2 className="assignment-title">{assignment.title}</h2>
          <span className={`difficulty ${assignment.difficulty.toLowerCase()}`}>
            {assignment.difficulty.toUpperCase()}
          </span>
        </div>
        <div className="nav-right">
          <button className="reset-btn" onClick={resetQuery}>Reset</button>
          <button className="run-btn" onClick={executeQuery}>▶ Run Code</button>
        </div>
      </div>

      <div className="main-content">
        {/* Left Sidebar */}
        <div className="left-sidebar">
          <div className="description-section">
            <h3>DESCRIPTION</h3>
            <p>{assignment.question}</p>
          </div>

          <div className="schema-section">
            <h3>TABLE SCHEMA</h3>
            {tables.map((table) => (
              <div key={table.tableName} className="table-info">
                <h4>{table.tableName}</h4>
                <table className="schema-table">
                  <thead>
                    <tr>
                      <th>Column</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {table.columns.map((col, idx) => (
                      <tr key={idx}>
                        <td>{col.columnName}</td>
                        <td>{col.dataType.toUpperCase()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          <div className="sample-data-section">
            <h3>SAMPLE DATA</h3>
            {tables.map((table) => (
              <div key={table.tableName} className="sample-table">
                <h4>{table.tableName}</h4>
                <table className="data-table">
                  <thead>
                    <tr>
                      {table.columns.map((col, idx) => (
                        <th key={idx}>{col.columnName}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.slice(0, 5).map((row, idx) => (
                      <tr key={idx}>
                        {table.columns.map((col, colIdx) => (
                          <td key={colIdx}>{row[col.columnName]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content Area */}
        <div className="right-content">
          {/* SQL Editor */}
          <div className="editor-section">
            <h3>SQL EDITOR</h3>
            <div className="editor-container">
              <Editor
                height="200px"
                defaultLanguage="sql"
                value={query}
                onChange={(value) => setQuery(value || "")}
                onMount={(editor, monaco) => {
                  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
                    executeQuery();
                  });
                }}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  automaticLayout: true,
                  wordWrap: 'on',
                }}
                theme="vs-dark"
              />
            </div>
          </div>

          {/* Results Section */}
          {results && (
            <div className="results-section">
              <div className="results-header">
                <h3>RESULTS</h3>
                {executionTime && (
                  <span className="execution-time">⏱ {executionTime}ms</span>
                )}
              </div>
              
              {validation && (
                <div className={`validation ${validation.isCorrect ? 'success' : 'error'}`}>
                  {validation.isCorrect ? '✅ Correct!' : '❌ Incorrect'}
                  <p>{validation.message}</p>
                </div>
              )}

              <div className="results-table-container">
                <table className="results-table">
                  <thead>
                    <tr>
                      {results.fields?.map((field, index) => (
                        <th key={index}>{field.name.toUpperCase()}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {results.rows?.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {results.fields?.map((field, colIndex) => (
                          <td key={colIndex}>
                            {row[field.name] !== null && row[field.name] !== undefined 
                              ? String(row[field.name]) 
                              : 'NULL'
                            }
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assignment;