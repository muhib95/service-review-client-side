import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import useTitle from '../../hook/useTitle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateReview = () => {
    const review=useLoaderData();
    useTitle('Update review');
    const [update,setUpdate]=useState(review);
    const notify = () =>  toast.success("Review update !", {
        position: toast.POSITION.TOP_CENTER
      });
    //   Update Myreview here...
    const handleSubmit=(event)=>{
        event.preventDefault();
        fetch(`https://b6a11-service-review-server-side-muhib95.vercel.app/reviews/${review._id}`,{
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(update),

        })
        .then(res=>res.json())
        .then(data=>{
            if(data.modifiedCount>=0){
                notify()
            }
           
        })
       
    
    }
        
    
    const handleChange=(event)=>{
        const value=event.target.value;
        const field=event.target.name;
        const newUpdate={...update};
        newUpdate[field]=value;
        setUpdate(newUpdate);
    
    }
    return (
        <div>
             <form onSubmit={handleSubmit}>
           
            <label htmlFor="review">Your review<input onChange={handleChange} className="input input-bordered input-primary w-full mt-3"  type="text" name="review" id="" placeholder='review update'/></label><br/>
            <button className="btn btn-secondary mt-2" type="submit">Add update</button>
           </form>
           <ToastContainer />
        </div>
    );
};

export default UpdateReview;