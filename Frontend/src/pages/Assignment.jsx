import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import AssignmentHeader from "../component/AssignmentHeader";
import Sidebar from "../component/Sidebar";
import QueryPanel from "../component/QueryPanel";
import axios from "axios";
import API_CONFIG from "../config/api";
import '../styles/Assignment.css';

const Assignment = () => {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [results, setResults] = useState(null);
  const [validation, setValidation] = useState(null);
  const [schemaId, setSchemaId] = useState(null);
  const [tables, setTables] = useState([]);
  const [showResults, setShowResults] = useState(false);
  
  // Refs for scrolling
  const resultsRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    loadAssignment();
  }, [id]);

  // Auto-scroll when results are shown/hidden
  useEffect(() => {
    if (showResults && resultsRef.current) {
      // Scroll to results with smooth animation
      setTimeout(() => {
        resultsRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    } else if (!showResults && editorRef.current) {
      // Scroll back to editor with smooth animation
      setTimeout(() => {
        editorRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
  }, [showResults]);

  const loadAssignment = async () => {
    const response = await axios.post(`${API_CONFIG.BASE_URL}/sql/assignment/load`, {
      assignmentId: id,
      sessionId: `session_${Date.now()}`
    });
    
    setAssignment(response.data.data.assignment);
    setSchemaId(response.data.data.schemaId);
    setTables(response.data.data.tables || []);
  };

  const executeQuery = async (query) => {
    const executeResponse = await axios.post(`${API_CONFIG.BASE_URL}/sql/query/execute`, {
      query,
      schemaId
    });
    setResults(executeResponse.data.data);
    
    const validateResponse = await axios.post(`${API_CONFIG.BASE_URL}/sql/query/validate`, {
      query,
      assignmentId: assignment._id,
      schemaId: schemaId
    });
    setValidation(validateResponse.data.data);
    
    // Automatically show results after running query
    setShowResults(true);
  };

  const toggleResults = () => {
    setShowResults(!showResults);
  };

  return (
    <div className="assignment">
      {assignment && (
        <>
          <AssignmentHeader assignment={assignment} />
          
          <div className="content">
            <Sidebar assignment={assignment} tables={tables} />
            <QueryPanel 
              onExecute={executeQuery}
              results={results}
              validation={validation}
              showResults={showResults}
              onToggleResults={toggleResults}
              resultsRef={resultsRef}
              editorRef={editorRef}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Assignment;