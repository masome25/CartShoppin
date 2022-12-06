

import React, { useState } from 'react'
import CartForm from './CartForm'
import CartUser from './CartUser'
import { Layout, Menu } from 'antd'


function Cart() {
  const [ dataList, setDataList ] = useState([])
  const { Header, Content, Footer, Sider } = Layout

  // const item2=[{
  //   label : 'sdfdsf',
  //   key : 'mdb',
  //     render : () =>   <CartForm  dataList={dataList} setDataList={setDataList} /> 
  // }]
  const items1 = [
    { label: 'CARTSHOPPING'}
   ]

  return (
       <Layout>
         <Header className='mx-10 rounded-md'>
        <Menu theme="dark" mode="horizontal"  items={items1} />
      </Header> 
      <Content  className='px-12'>
        <Layout  className='py-6'>
          <Sider className='bg-white'>
           <CartForm  dataList={dataList} setDataList={setDataList} /> 
             {/* <Menu
              mode="inline"
              style={{
                height: '100%',
              }}
              items={item2}
            />  */}
          </Sider>
          <Content className='px-6'>
              <CartUser  dataList={dataList} setDataList={setDataList} />
          </Content>
        </Layout>
      </Content>
      <Footer className='bg-white text-center h-20'>
        Ant Design ©2018 Created by Ant UED
      </Footer> 
    </Layout>
  )
}

export default Cart


