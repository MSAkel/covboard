import './StatContainer.css';

function StatContainer({title, total}) {
  return (
    <div className="stat-container">
        <div>
            <h2>{title}</h2>
            <h3>{total}</h3>
        </div>
    </div>
  );
}

export default StatContainer;
