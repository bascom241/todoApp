import React from 'react'
import './Content.css'
import { useState } from 'react';
import Task from '../Components/Task';
import Activity from '../Components/Activity';
import Message from '../Components/Message';


const Cotent = () => {
  const [navStyle, setNavStyle] = useState("Today's Task");
  const renderContent = () => {
    switch (navStyle) {
      case 'Messages':
        return <Message/>
      case "Today's Task":
        return <Task/> 
      case "Last Activity":
        return <Activity/>
      default:
        return <div>This s is the default Pasge</div>
    }
  }
  return (
    <main className='container'>
      <div className='content-container'>
        <div>
          <nav className='nav-container'>
            <ul>
              <li onClick={() => setNavStyle('Messages')} className={navStyle === 'Messages' ? 'active' : ''}>Messages</li>
              <li onClick={() => setNavStyle("Today's Task")} className={navStyle === "Today's Task" ? 'active' : ''}>Today's Task</li>
              <li onClick={() => setNavStyle('Last Activity')} className={navStyle === "Last Activity" ? 'active' : ''}>Last Activity</li>
            </ul>
          </nav>
          {renderContent()}
        </div>
      </div>
    </main>
  )
}

export default Cotent
