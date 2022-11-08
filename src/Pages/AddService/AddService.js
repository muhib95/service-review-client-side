import React, { useState } from 'react';

const AddService = () => {
    const [service,setService]=useState({});
    const handleSubmit=(event)=>{
        event.preventDefault();
        fetch('http://localhost:5000/service', {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(service),
          })
          .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if(data.acknowledged){
            alert('Successful');
            event.target.reset();
    
        }
      })
    }

    const handleOnBlur=(event)=>{
        const field=event.target.name;
        const value=event.target.value;
        const newService={...service};
        newService[field]=value;
        setService(newService);
        
        }
        
    return (
        <div>
              
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-2 mt-6'>
            <input name='img' onBlur={handleOnBlur} type="text" placeholder="image" className="input input-bordered input-primary w-full " />
            <input name='name' onBlur={handleOnBlur} type="text" placeholder="title" className="input input-bordered input-primary w-full " />
            <input name='dis' onBlur={handleOnBlur} type="text" placeholder="discription" className="input input-bordered input-primary w-full " />
            <input name='price' onBlur={handleOnBlur} type="text" placeholder="price" className="input input-bordered input-primary w-full " />
            <input name='ratings' onBlur={handleOnBlur} type="text" placeholder="review" className="input input-bordered input-primary w-full" />
                </div>
          
               
            <button className="btn btn-primary mt-7" type="submit">add user</button>
            </form>
            
        </div>
    );
};

export default AddService;