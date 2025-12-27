import '../styles/Problem.css';

const Problem = ({ assignment }) => {
  if (!assignment) return null;

  return (
    <section className="problem-section">
      <h2>Problem</h2>
      <div className="problem-content">
        {assignment.question}
      </div>
    </section>
  );
};

export default Problem;