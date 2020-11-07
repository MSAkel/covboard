import {useState, useEffect} from 'react'
import './Capsule.css';

function Capsule({region, onSelectRegion}) {
  const [active, setActive] = useState(false)

  const handleClick = ev => {
    onSelectRegion(ev.currentTarget.name, setActive)
  }

  useEffect(() => {
  }, [active])

  return (
    <button 
      name={region} 
      className={active ? 'capsule-container active' : 'capsule-container '} 
      onClick={ev => handleClick(ev)}
    >
      <div className="capsule-content">
        <h4>{region}</h4>
      </div>
    </button>
  );
}

export default Capsule;
