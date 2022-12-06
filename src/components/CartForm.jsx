

import React, { useState }  from 'react'

function CartForm({dataList, setDataList}) {
    const[data,  setData]=useState({
        name : '',
        price : '',
        count : '',
        discount : ''
    })
    const handleChange = (key, value) =>
    {
       setData(prev=>({...prev, [key]:value}))
    }
    const handleClick = () =>
    {
      setDataList([...dataList , data])
    }
  
  return (
   <div className='flex flex-col'>
    <input type='text'   value={data.name}     className='text-center	mx-2	my-2 p-0.5	rounded-md border border-current'   placeholder='name'     onChange={(e)=>handleChange("name", e.target.value)}/>
    <input type='number' value={data.price}    className='text-center	mx-2	my-2 p-0.5	rounded-md border border-current'   placeholder='price'    onChange={(e)=>handleChange("price", e.target.value)}/>
    <input type='number' value={data.count}    className='text-center	mx-2	my-2 p-0.5	rounded-md border border-current'   placeholder='count'    onChange={(e)=>handleChange("count", e.target.value)}/>
    <label className='ml-6 align-top  text-white'> {data.discount} % </label>
    <input type='range'  value={data.discount} className='mx-4	my-2 p-0.5	rounded-md'    placeholder='discount'      onChange={(e)=>handleChange("discount", e.target.value)} /> 
     <p className='font-semibold ml-2  text-white'>  {`Final Price : ${Math.round(data.price * data.count *(1-data.discount/100))} $`} </p>
    <button className='text-center	mx-2	my-2 p-0.5	rounded-md	bg-blue-700	 text-white' onClick={handleClick} >ADD</button>
   </div> 
  )
}

export default CartForm