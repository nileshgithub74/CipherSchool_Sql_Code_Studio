import Problem from './Problem';
import Schema from './Schema';
import '../styles/Sidebar.css';

const Sidebar = ({ assignment, tables }) => {
  return (
    <div className="sidebar">
      <Problem assignment={assignment} />
      <Schema tables={tables} />
    </div>
  );
};

export default Sidebar;