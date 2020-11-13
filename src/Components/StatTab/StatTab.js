import Capsule from '../Capsule/Capsule';
import './StatTab.css'

const StatTab = ({selection, setSelection}) => {
  const stats = [
    {name: "Confirmed"}, 
    {name: "Recovered"}, 
    {name: "Active"},
    {name: "Deaths"},
  ]

  const onSelectStat = stat => {
    setSelection(stat)
  }

  const statsCapsules = stats.map((stat =>
    <Capsule 
      key={stat.name} 
      styling={selection === stat.name ? "capsule-container active" : 'capsule-container'}
      selection={stat.name} 
      onSelection={onSelectStat}
    />
  ))

  return(
    <div className="map-stat-tab">
      {statsCapsules}
    </div>
  )
}

export default StatTab