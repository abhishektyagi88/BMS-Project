import React, { useEffect } from 'react';
import {Form,Input,Checkbox, message} from 'antd';
import { Link,useNavigate } from 'react-router-dom';
import { RegisterUser } from '../../apicalls/users';

function Register() {
  const navigate = useNavigate();
    const onFinish = async(value) => {
      try{
      const response = await RegisterUser(value);
      if(response.success){
        message.success(response.message);
        navigate("/login");
        console.log(response.message);
      }else{
        message.error(response.message);
        console.log(response.message);
      }
    }catch(err){
      message.error(err.message || "An error occured");
    }
    }

    useEffect(() => {
      if(localStorage.getItem("token")){
        navigate("/");
      }
    },[])
    return(
        <div style = {{backgroundImage : "url('https://png.pngtree.com/background/20210711/original/pngtree-new-film-premiere-theater-poster-picture-image_1092341.jpg')"}} 
        className=' flex w-[100%] h-[100vh] bg-cover bg-top'>
        <div className="flex flex-col mx-[400px] my-[130px] w-[750px] h-[500px] bg-fuchsia-300 justify-center rounded-xl">
            <span className='text-4xl font-bold text-center'>Welcome To <span className = "text-cyan-600">TheBookShows !!🎬</span></span>
        <Form className="my-10" onFinish={onFinish}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="E-Mail"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your E-Mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>
    
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
    
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
    
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <button className = "bg-cyan-400 w-[400px] hover:bg-fuchsia-500 h-[35px] rounded-md hover:scale-105 duration-200" type="primary" htmlType="submit">
            Register
          </button>
        </Form.Item>
      </Form>
      <div className='flex'>
      <span className='text-xl text-red-500 p-4'>Already have an account ?</span>
      <Link to = "/login" className='text-xl text-red-500 p-4 hover:text-cyan-700 cursor-pointer'>| Login</Link>
      </div>
      </div>
      </div>
    )
}

export default Register;