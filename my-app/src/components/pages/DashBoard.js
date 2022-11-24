import React,{ useState,useEffect,useContext } from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import '../styles/DashBoard.css'
import { render } from '@testing-library/react';
import Sidebar from './Sidebar';
import AuthContext from '../context/AuthContext';

// modal currentMonth,currentYear,

const DashBoard = () => {
  const date = new Date();
  let day = date.getDate();
  let year = date.getFullYear();
  let month = date.getMonth();
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  const [currentMonth,setCurrentMonth] = useState(month)
  const [currentYear,setCurrentYear] = useState(year)
  const [showSideBar,setShowSideBar] = useState(false)
  const [currentDay, setCurrentDay] = useState(0)
  const [days,setDays] = useState([]);
  const {authTokens} = useContext(AuthContext)
  const handleClick = (index)=>{
    setCurrentDay(index)
    setShowSideBar(true)
  }

  
  const handleSwitch =(e,direction)=>{
      const now = new Date()
      
      if (direction === "right" && currentMonth === 11) {
        var current = new Date(currentYear + 1, 0, 1);
        let newMonth = current.getMonth();
        let newYear = current.getFullYear()
        setCurrentMonth(newMonth)
        setCurrentYear(newYear)
      }
      else if(direction === "left" && currentMonth === 0){
        var current = new Date(currentYear - 1, 11, 1);
        let newMonth = current.getMonth();
        let newYear = current.getFullYear()
        setCurrentMonth(newMonth)
        setCurrentYear(newYear)
      }
      else{
        if(direction === "left"){
          setCurrentMonth(currentMonth - 1)
        }
        else{
          setCurrentMonth(currentMonth+1)
        }
      }
  }

  const renderCalendar = async ()=>{
    const lastMonthDay = new Date(year,currentMonth,0).getDay()
    const lastMonthTotalDays = new Date(year,currentMonth,0).getDate()
    const lastDay = new Date(year,currentMonth+1,0).getDate()
    const currMonthLastDay = new Date(year,currentMonth+1,0).getDay()
    const dayss = [];

    const month_start = (new Date(currentYear,currentMonth,1)).getTime()/1000
    const month_end = (new Date(currentYear,currentMonth,lastDay)).getTime()/1000
    const response = await fetch("http://127.0.0.1:8000/getmonthlyevents",{
      method:"POST",
      headers:{
        'Content-type':"application/json",
        'Authorization':'Bearer ' + String(authTokens.access)
      },
      body:JSON.stringify({month_start:month_start,month_end:month_end})
    })
    const newdata = await response.json();
    if(response.status === 200){
      let cnt = 0;
      const data = newdata.data
      for(let i=lastMonthDay; i > 0;i--){
        const value = lastMonthTotalDays - i + 1
        dayss.push(<li id="day" key={cnt} className="inactive">{value}</li>)
        cnt++;
      }
      for(let i = 1; i <= lastDay;i++){
        const startTime = new Date(currentYear,currentMonth,i,0,0).getTime()/1000;
        const endTime = new Date(currentYear,currentMonth,i,23,59,59).getTime()/1000;
        let flag = false;
        for(let j = 0;j < data.length;j++){
          if(startTime <= data[j].event_start_time && data[j].event_start_time <= endTime){
            flag = true;
            break;
          }
        }
        if(flag){
          dayss.push(<li id="day"  key={cnt} className="active" onClick={()=>handleClick(i)}>{i}</li>)
        }
        else{
          dayss.push(<li id="day" key={cnt} onClick={()=>handleClick(i)}>{i}</li>)
        }
        cnt++;
      }
      for(let i = 1; i <= 7-currMonthLastDay;i++){
        dayss.push(<li id="day" key={cnt} className="inactive">{i}</li>)
        cnt++;
      }
      setDays(dayss)
    }
    else{
      alert("Some Error Occurred")
    }
  }
  
  useEffect(()=>{
    renderCalendar()
  },[currentMonth])

  return (
    <div className="ultra-wrap">
    <div className="wrapper">
      <header>
        <p className="date">{monthNames[currentMonth]} {currentYear}</p>
        <div className="icons">
          <span onClick={(e)=>handleSwitch(e,"left")} className="chevron-left"><ChevronLeftIcon /></span>
          <span onClick={(e)=>handleSwitch(e,"right")} className="chevron-right"><ChevronRightIcon /></span>
        </div>
      </header>
      <div className="calendar">
        <ul className="weeks">
          <li>Sun</li>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>  
          <li>Fri</li>
          <li>Sat</li>
        </ul>
        <ul className="days">
          {days}
          {showSideBar && <Sidebar currentMonth={currentMonth} currentYear={currentYear} currentDay={currentDay}  />}
        </ul>
      </div>
    </div>
    </div>
  )
}

export default DashBoard