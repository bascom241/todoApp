import React, { useState, useEffect } from 'react';
import { todoLists } from '../Content/data';
import profile1 from '../images/blogbulb.png';
import profile2 from '../images/blog fruits.png';
import './Task.css';
import { FaPlus } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';
import Popup from './Popup';

const Task = () => {


  
    const [items, setItems] = useState(() => {
        const savedItems = localStorage.getItem('shoppinglist');
        return savedItems ? JSON.parse(savedItems) : todoLists;
    });

    
    
    const [SearchTasks, setSearchTasks] = useState('');
    const handleChangeSearch = (e)=> {
        setSearchTasks(e.target.value);
    }

    const currentDate = new Date();
    const formatedDate = currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const handleChange = (id) => {
        const listItems = items.map(item => item.id === id ? { ...item, checked: !item.checked } : item);
        setItems(listItems);
        localStorage.setItem('shoppinglist', JSON.stringify(listItems));

    };

    const filterItems = items.filter((item)=> item.todo.toLowerCase().includes(SearchTasks.toLowerCase()))

    const handleDelete = (id) => {
        const filteredItems = items.filter(item => item.id !== id);
        setItems(filteredItems);
        localStorage.setItem('shoppinglist', JSON.stringify(filteredItems));

    };
    // useEffect(() => {
    //     const savedItems = localStorage.getItem('shoppinglist');
    //     if (savedItems) {
    //         setItems(JSON.parse(savedItems));
    //     }
    // }, []);


    const [buttonPopup, setButtonPopup] = useState(false)
    return (
        <section className='section-container'>
            <div className='content-section-container'>
                <div className='section-header'>
                    <div className='taskName'>

                        <h1>Today's Task</h1>
                        <p>{formatedDate}</p>
                     
                    </div>
                    <input 
                        className='search-input'
                            type='text'
                            placeholder='Search for tasks'
                            value={SearchTasks}
                            onChange={handleChangeSearch}
                        />
                    <div className='add-btn'>
                        <button className='btn-primary' onClick={() => setButtonPopup(true)} ><FaPlus /> New Task</button>
                    </div>
                </div>

                <div className='section2-header'>
                    <p className='active2'>All <span className='message-span'>35</span></p>
                    <p>Open <span className='message-span2'>14</span></p>
                    <p>Closed<span className='message-span2'>19</span></p>
                    <p>Achived<span className='message-span2'>2</span></p>
                </div>
                {items.length ? (
                    <div className='section-content'>


                        {filterItems.map((item) => {
                            const shortDescription = item.todo.length > 20
                                ? item.todo.substring(0, 20) + '...' 
                                : item.todo;
                    return(

                        
                            <div key={item.id} className='todoTask-cotainer'>
                                <div className='todoTask'>
                                    <div className='todoQ'>
                                        <h4 style={{ textDecoration: item.checked ? 'line-through' : '' }}>{shortDescription}</h4>
                                        <label>{shortDescription}</label>
                                    </div>
                              
                                    <div className='checkbox'>

                                    <input
                                        className='checkbox'
                                        type='checkbox'
                                        checked={item.checked}
                                        onChange={() => handleChange(item.id)}
                                    />
                                        <FaTrashAlt className='deleteIcon' onClick={() => handleDelete(item.id)} />
                                    </div>
                                </div>
                                <div className='line'></div>
                                <div className='profile'>
                                    <p>Today {formatedDate}</p>
                                    <div className='profile-container'>
                                        <img src={profile1} alt="Profile 1" />
                                        <img className='img2' src={profile2} alt="Profile 2" />
                                    </div>
                                </div>
                            </div>

                        );
                    })}
                    </div>
                ) : (<p style={{ 'textAlign': 'center', 'margin': '8rem 0' }}>Todo List is Empty </p>)
                }
            </div>
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup} items={items} setItems={setItems} >
                <h3>My PopUp</h3>
            </Popup>
        </section>
    );
};

export default Task;
