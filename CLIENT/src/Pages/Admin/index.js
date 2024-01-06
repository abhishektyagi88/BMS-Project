import React from "react";
import { Tabs } from "antd";
import MovieList from "./MovieList";
import TheatreList from "./TheatreList";

const items = [
    {
      key: '1',
      label: 'Movies',
      children: <MovieList/>,
    },
    {
      key: '2',
      label: 'Theatres',
      children: <TheatreList/> ,
    }
  ];
function Admin(){
    return(
        <div>
            <h1 className="text-2xl font-bold text-orange-500">ADMIN</h1>
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    )
}

export default Admin;