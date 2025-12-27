import '../styles/Schema.css';

const Schema = ({ tables }) => {
  if (!tables || tables.length === 0) return null;

  return (
    <section className="schema-section">
      <h2>Database Schema</h2>
      {tables.map((table) => (
        <div key={table.tableName} className="table-card">
          <h3>{table.tableName}</h3>
          
          <div className="columns">
            <h4>Columns:</h4>
            {table.columns.map((col, i) => (
              <div key={i} className="column">
                <span className="name">{col.columnName}</span>
                <span className="type">{col.dataType}</span>
              </div>
            ))}
          </div>

          {table.rows && table.rows.length > 0 && (
            <div className="sample-data">
              <h4>Sample Data:</h4>
              <table>
                <thead>
                  <tr>
                    {table.columns.map((col, i) => (
                      <th key={i}>{col.columnName}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row, i) => (
                    <tr key={i}>
                      {table.columns.map((col, j) => (
                        <td key={j}>{row[col.columnName]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default Schema;