import React, { useState,useContext } from 'react'
import AuthContext from '../context/AuthContext'
import '../styles/Modal.css'
import Button from '@mui/material/Button';



const Modal = ({dayData, handleClose,currentMonth,currentYear,currentDay}) => {
    const {authTokens} = useContext(AuthContext)

    const [title,setTitle] = useState(dayData.length != 0 ? dayData.title : "")
    const [description,setDescription] = useState(dayData.length != 0 ? dayData.description : "")
    const [StartTime,setStartTime] = useState(dayData.length != 0 ? dayData.event_start_time : "")
    const [EndTime,setEndTime] = useState(dayData.length != 0 ? dayData.event_end_time : "")
    
    const handleSubmit = async (e)=>{
        const startVal = e.target.start.value
        const x = startVal.split(":")
        const endVal = e.target.end.value
        const y = endVal.split(":")
        let startTime = new Date(currentYear,currentMonth,currentDay,parseInt(x[0]),parseInt(x[1]))
        let endTime = new Date(currentYear,currentMonth,currentDay,parseInt(y[0]),parseInt(y[1]))
        startTime = startTime.getTime()/1000;
        endTime = endTime.getTime()/1000;
        // const start_time = new Date(year,month,day,hours,minutes)
        // const end_time = new Date(year,month,day,hours,minutes)
        function isEmpty(obj) {
            return Object.keys(obj).length === 0;
        }
        const userInfo = {'title':e.target.title.value,'description':description,'start':startTime,'end':endTime,'year':currentYear,'month':currentMonth,'day':currentDay}
        if(isEmpty(dayData)){
            console.log("Ran")
            const response = await fetch("http://127.0.0.1:8000/event",{
                method:"POST",
                headers:{
                    'Content-type':"application/json",
                    'Authorization':'Bearer ' + String(authTokens.access)
                },
                body:JSON.stringify(userInfo)
            })
            const data = await response.json();
            console.log(data)
            if(response.status === 200){
            }
            else{
                console.log("Some error Occurred")
            }
        }
        else{
            const userInfo = {'title':title,'description':description,'start':startTime,'end':endTime,'eid':dayData.eid}
            const response = await fetch("http://127.0.0.1:8000/update",{
                method:"POST",
                headers:{
                    'Content-type':"application/json",
                    'Authorization':'Bearer ' + String(authTokens.access)
                },
                body:JSON.stringify(userInfo)
            })
            const data = await response;
            if(data.status === 200){

            }
            else{
                console.log("Some error Occurred")
            }
        }
    }
    return (
        <div onClick={handleClose} className="modal">
            <div onClick={(e)=>e.stopPropagation()} className="modal-content">
                <form onSubmit={handleSubmit} className="modal-form">
                    <label>
                        Enter the title of the meeting:- 
                        <br/>
                        <input value={title} onChange={(e)=>setTitle(e.target.value)} required name="title" type="text" />
                    </label>
                    <label>
                        Enter the Description for the meeting:-
                        <textarea className="description" value={description} onChange={(e)=>setDescription(e.target.value)} required name="description" form="usrform" ></textarea>
                    </label>
                    <label>
                        Enter the timings for the meeting:-
                        <br/>
                        <span className="timings">
                            <input value={StartTime} onChange={(e)=>setStartTime(e.target.value)} required name="start" type="time" id="appt" />
                            <input value={EndTime} onChange={(e)=>setEndTime(e.target.value)} required name="end" type="time" id="appt" />
                        </span>
                    </label>
                    <button type="submit">Submit</button>
                </form>
                <div className="modal-footer">
                <Button className="close-button" onClick={handleClose} variant="outlined" color="error">
                  Close
                </Button>
                </div>
            </div>
        </div>
    )
}

export default Modal