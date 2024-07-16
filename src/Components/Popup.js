import React from 'react'
import { useState } from 'react'
import './Popup.css'
import { FaTimes } from 'react-icons/fa'
const Popup = ({trigger,setTrigger,items,setItems}) => {
    const [formState,setFormState] = useState('')

    const handleChange = (e) => {
      setFormState(e.target.value)

    }

    const addItems = (todo)=>{
        const id = items.length? items[items.length-1].id + 1: 1;
        const newItem = {id, checked: false, todo};
        const listItems = [...items,newItem];
        setItems(listItems);
        localStorage.setItem('shoppinglist', JSON.stringify(listItems));
    }


    const handleSubmit = (e)=> {
        e.preventDefault()
        if (!formState) return;
        console.log(formState)
        addItems(formState)
        setFormState('')
        setTrigger(false)
    }
    return (trigger)? (

        <form onSubmit={handleSubmit}>
        <div className='submit-container'>

      
            <h2>Submit Task </h2>
            <input
                type='text'
                placeholder='Add Task'
                value={formState}
                onChange={handleChange} 
            />
            <FaTimes onClick={()=> setTrigger(false)} className='trash'/>

            <button className='btn-submit' type='submit'>Submit Task</button>
            
            {trigger}
           

            </div>
        </form>
    ):''
}

export default Popup
