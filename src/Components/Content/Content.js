import GlobalStats from '../GlobalStats/GlobalStats';
import Table from '../Table/Table';
import './Content.css';

function Content() {
  return (
    <div className="wrapper">
        <GlobalStats />
        <Table />
    </div>
  );
}

export default Content;
