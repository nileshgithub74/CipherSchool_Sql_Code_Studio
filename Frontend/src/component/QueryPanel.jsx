import SQLEditor from './SQLEditor';
import ResultsDisplay from './ResultsDisplay';
import '../styles/QueryPanel.css';

const QueryPanel = ({ onExecute, results, validation, showResults, onToggleResults, resultsRef, editorRef }) => {
  const hasResults = results && (results.rows?.length > 0 || validation);

  return (
    <div className="query-panel">
      <div className={showResults ? "editor" : "editor full"} ref={editorRef}>
        <SQLEditor 
          onExecute={onExecute}
        />
      </div>

      {showResults && hasResults && (
        <div className="results" ref={resultsRef}>
          <div className="results-header">
            <h3>Query Results</h3>
            <button onClick={onToggleResults}>Hide</button>
          </div>
          <ResultsDisplay results={results} validation={validation} />
        </div>
      )}
    </div>
  );
};

export default QueryPanel;