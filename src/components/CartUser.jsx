

import React, { useEffect, useState } from 'react'
import { Col, Row, Table, Button, Space } from 'antd'
import { EditFilled, DeleteFilled, SaveOutlined, CloseCircleOutlined } from '@ant-design/icons'


function CartUser({dataList, setDataList}) {
  const [ dataSource, setDataSource ] = useState([])
  const [editKey, setEditKey] = useState('')
  const [data,  setData]=useState({
    name : '',
    price : '',
    count : '',
    discount : '',
    }
    )
  const isEditing = (record) => record.key === editKey
  const handleChange = (key, value) =>
   {
    setData(prev=>({...prev, [key]:value}))
   }
   const handleEdit = (key) => {
    setData(dataSource[key])
    setEditKey(key)
   }
   const handleCancel = (key) => {
    setEditKey('')
   }  
   const handleSave = (key) => {
    const newData =  {key, ...data}
    const newDataSource = [...dataSource]
      newDataSource.splice(key, 1, {
         ...newData
      })
      setDataSource(newDataSource);
      setEditKey('');
   }
   const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  }
  const columns = [
    {
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render : (_, record) => {
    
        const editable = isEditing(record)
        return (
        editable ? (
          <input type='text'   value={data.name}  placeholder='name'  onChange={(e)=>handleChange("name", e.target.value)} />
        ) : (
          record.name
        )
       
      )}
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render : (_, record) => {
        const editable = isEditing(record)
        return (
        editable ? (
          <input type='number'   value={data.price}  placeholder='price' onChange={(e)=>handleChange("price", e.target.value)} />
        ) : (
          record.price
        )
     
     ) }
    },
    {
      title: 'Count',
      dataIndex: 'count',
      key: 'count',
      render : (_, record) => {
       const editable = isEditing(record)
        return (
        editable ? (
          <input type='number'   value={data.count}  placeholder='count'  onChange={(e)=>handleChange("count", e.target.value)} />
        ) : (
          record.count
        )
        
      )}
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
      render : (_, record) => {
        const editable = isEditing(record)
        return (
        editable ? (
          <input type='range'  value={data.discount}  placeholder='discount'  onChange={(e)=>handleChange("discount", e.target.value)} />
        ) : (
          record.discount
        ) 
      
     ) }
    },
    {
      title: 'FinalPrice',
      dataIndex: 'finalPrice',
      key: 'finalPrice',
      render : (_, record) => {
        const editable = isEditing(record)
        return (
        editable ? (
          <p>  {`${Math.round(data.price * data.count *(1-data.discount/100))} $`} </p>
        ) : (
          record.finalPrice
        )
        
     ) }
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render : (_, record) =>  
        {
        const editable = isEditing(record)
        return editable ? (
          <Space>
             <Button type="dashed"  onClick={ () => handleSave(record.key)} >   <SaveOutlined />   </Button>
             <Button type="dashed"  onClick={ () => handleCancel(record.key)} > <CloseCircleOutlined />  </Button>
          </Space>
         
        ) : (
          <Space >
             <Button type="dashed"  onClick={ () => handleEdit(record.key)} >   <EditFilled />   </Button>
             <Button type="dashed"  onClick={ () => handleDelete(record.key)} > <DeleteFilled />  </Button>
          </Space>
        );
        }
  }]
  const totalPrice = () => {
    let a=0
    dataSource.map((item)=>{
      a +=  (item.price * item.count)
    })
    return a
  }
  const totalPayment = () => {
    let a = 0
    dataSource.map((item)=>{
      a +=  (parseFloat(item.finalPrice))
    })
    return a
  }
  const totalDiscount = () => {
    let a = 0
    dataSource.map(()=>{
      a = ((totalPrice()-totalPayment())/totalPrice()*100)
    })
    return a
  }
  const handleTable = () => {
    dataList.map((item, index) => {
      const newData = {
          key : `${index}` ,
          name :  `${item.name}` ,
          price : `${item.price}`,
          count : `${item.count}`,
          discount : `${item.discount}%`,
          finalPrice : `${Math.round((item.price * item.count * ((100-item.discount)/100)))}  $` 
      }
      setDataSource([...dataSource, newData])
    }
  )}
  useEffect(()=> {
    handleTable()
  }, [dataList])
  
  return (
  <>
    <Table dataSource={dataSource} columns={columns}  bordered />
    <Row className='font-extrabold'>
       <Col span={8}> Total Price : </Col>
       <Col span={8}> Total discount : </Col>
       <Col span={8}> Total Payment : </Col>
     </Row>
     <Row className='font-bold text-blue-800'>
       <Col span={8}> {Math.round(totalPrice())} </Col>
       <Col span={8}> {Math.round(totalDiscount())} % </Col>
       <Col span={8}> {Math.round(totalPayment())} </Col>
     </Row>
  </>    
  )
}

export default CartUser