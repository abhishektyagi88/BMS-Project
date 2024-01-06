import React from "react";
import { Tabs } from "antd";
import TheatreList from "./TheatreList";
import Booking from "./Bookings";


const items = [
    {
      key: '1',
      label: 'Bookings',
      children: <Booking />
    },
    {
      key: '2',
      label: 'Theatres',
      children:<TheatreList/>,
    }
  ];
function Profile(){
    return(
        <div>
            <h1 className="text-2xl font-bold text-orange-500">Profile</h1>
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    )
}

export default Profile;