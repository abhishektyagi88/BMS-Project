import React, {useEffect} from 'react';
import { Form, Input, Checkbox, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { LoginUser } from '../../apicalls/users';
import { useSelector } from 'react-redux';

function Login() {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();

  const onFinish = async (value) => {
    try {
      const response = await LoginUser(value);
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        // navigate("/");
        if(user.isAdmin){
          navigate("/admin");
        }else{
          navigate("/profile");
        }
      } else {
        message.error(response.message);
        console.log(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      // navigate("/");
      if ("token") {
        if (user && user.isAdmin) {
          navigate("/admin");
        } else {
          navigate("/profile");
        }
      }
    } 
  }, []);

  return (
    <div style={{ backgroundImage: "url('https://previews.123rf.com/images/9dreamstudio/9dreamstudio1802/9dreamstudio180203976/96443516-cinema-background-film-watching-popcorn-and-clapperboard-on-yellow-background-top-view.jpg')" }}
      className=' flex w-[100%] h-[100vh] bg-cover bg-top'>
      <div className="flex flex-col mx-[400px] my-[130px] w-[750px] h-[430px] bg-lime-200 justify-center rounded-2xl">
        <span className='text-4xl font-bold text-center'><span className="text-pink-600">TheBookShows !!🎬</span></span>
        <Form className="my-10" onFinish={onFinish}  // onFinish is an attribute that comes from antdesign and is similar to onSubmit
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
            <button className="bg-lime-400 w-[400px] hover:bg-lime-500 h-[35px] rounded-md hover:scale-105 duration-200" type="primary" htmlType="submit">
              Sign In
            </button>
          </Form.Item>
        </Form>
        <div className='flex justify-start'>
          <span className='text-xl text-red-500 p-4'>New User?</span>
          <Link to="/register" className='text-xl text-red-500 p-4'><span className='hover:text-cyan-800 cursor-pointer'>| Register</span></Link>
        </div>
      </div>
    </div>
  )
}

export default Login;