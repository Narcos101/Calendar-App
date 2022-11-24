import React,{ useEffect, useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import "../styles/Sidebar.css"
import Modal from './Modal'
import Button from '@mui/material/Button';

const Sidebar = ({currentMonth,currentYear,currentDay}) => {
    const [showModal,setShowModal] = useState(false)
    const [dayData,setDayData] = useState({})
    const [dailyData,setDailyData] = useState([])
    const {authTokens} = useContext(AuthContext)
    const handleClose = ()=>{
        setShowModal(false)
    }
    const handleClick = (data)=>{
        let start_time = data.event_start_time;
        let end_time = data.event_end_time;
        start_time = String(new Date(start_time * 1000))
        end_time = String(new Date(end_time * 1000))
        data.event_start_time = start_time.split(' ')[4].split(':')[0] + ":" + start_time.split(' ')[4].split(':')[1]
        data.event_end_time = end_time.split(' ')[4].split(':')[0] + ":" + end_time.split(' ')[4].split(':')[1]
        setShowModal(true)
        setDayData(data)   
    }
    const handleDelete = async (eventId)=>{
        const response = await fetch("http://127.0.0.1:8000/remove",{
            method:"POST",
            headers:{
                'Content-type':"application/json",
                'Authorization':'Bearer ' + String(authTokens.access)
            },
            body:JSON.stringify({"eid":eventId})
        })
        const data = await response;
        window.location.reload();
    }
    const [dailyEvents,setDailyEvents] = useState([])
    
    useEffect( ()=>{
        const startTime = new Date(currentYear,currentMonth,currentDay,0,0).getTime()/1000;
        const endTime = new Date(currentYear,currentMonth,currentDay,23,59,59).getTime()/1000;

        const fetchdata = async ()=>{
            const response = await fetch("http://127.0.0.1:8000/getdailyevents",{
                method:"POST",
                headers:{
                    'Content-type':"application/json",
                    'Authorization':'Bearer ' + String(authTokens.access)
                },
                body:JSON.stringify({day_start:startTime,day_end:endTime})
            })
            let dailyDatas = await response.json();
            setDailyData(dailyDatas.data)
        }
        fetchdata()
    },[currentMonth,currentDay,currentYear])

    useEffect(()=>{
        const allEvents = []
        dailyData.map((data,index)=>{
            allEvents.push(
            <div id="event">
                <Button id="update_event" key={index} onClick={()=>handleClick(data)} variant="contained" color="success">
                    {data.title}
                </Button>
                <Button id="delete_event" onClick={()=>handleDelete(data.eid)} variant="outlined" color="error">
                    Delete
                </Button>
            </div>
            )
        })
        setDailyEvents(allEvents)        
    },[dailyData])


    return (
        <div className="sidebar">
            <div className="sidebar-main">
                <Button id="create-button" onClick={()=>setShowModal(true)} variant="outlined">Create</Button>
                {dailyEvents}
            </div>
            {showModal && <Modal dayData={dayData} currentMonth={currentMonth} currentYear={currentYear} currentDay={currentDay} handleClose={handleClose} />}
        </div>
    )
}

export default Sidebar