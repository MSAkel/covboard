import {useState, useEffect} from 'react'
import './Capsule.css';

function Capsule({selection, onSelection, styling}) {
  const [active, setActive] = useState(false)

  const handleClick = ev => {
    onSelection(ev.currentTarget.name, setActive)
  }

  useEffect(() => {
  }, [active])

  return (
    <button 
      name={selection} 
      className={styling} 
      onClick={ev => handleClick(ev)}
    >
      <div className="capsule-content">
        <h4>{selection}</h4>
      </div>
    </button>
  );
}

export default Capsule;
