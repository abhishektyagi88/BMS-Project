import React, { useEffect, useState } from "react";
import { Table, message } from "antd";
import { useDispatch } from "react-redux";
import { GetAllTheatres, UpdateTheatre } from "../../apicalls/theatres";
import { HideLoading, ShowLoading } from "../../Redux/LoadersSlice";

function TheatreList() {
    const [theatres, setTheatres] = useState([]);
    const dispatch = useDispatch();
    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetAllTheatres();
            if (response.success) {
                setTheatres(response.data);
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (err) {
            dispatch(HideLoading());
            message.error(err.message);
        }
    }

    const handleChange = async (theatre) => {
        try {
            dispatch(ShowLoading());
            const response = await UpdateTheatre({
                theatreId: theatre._id,
                // ...theatre,
                isActive: !theatre.isActive
            })
            if (response.success) {
                message.success(response.message);
                getData();
            } else {
                message.error(response.message);
            }
        } catch (err) {
            dispatch(HideLoading());
            message.error(err.message);
        }
    }

    useEffect(() => {
        getData();
    }, [])
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Address",
            dataIndex: "address",
        },
        {
            title: "Phone",
            dataIndex: "phone",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Owner",
            dataIndex: "owner",
            render: (owner, rowData) => {
                console.log("===>", rowData)
                return owner.name;
            }
        },
        {
            title: "Status",
            dataIndex: "isActive",
            render: (isActive) => {
                if (isActive) {
                    return <div className="text-green-500 font-medium">Approved</div>;
                } else {
                    return <div className="text-red-500 font-medium">Pending / Blocked </div>;
                }
            }
        },
        {
            title: "Actions",
            dataIndex: "action",
            render: (_, rowData) => {
                return (<div>
                    {rowData.isActive ? (
                        <span className="text-red-500 underline font-medium cursor-pointer" onClick={() => handleChange(rowData)}>
                            Block
                        </span>
                    ) : (
                        <span className="text-green-500 underline font-medium cursor-pointer" onClick={() => handleChange(rowData)}>
                            Approve
                        </span>
                    )
                    }
                </div>)
            }
        }
    ]
    console.log("++++=========>", theatres);
    return (
        <div>
            <Table columns={columns} dataSource={theatres} />  
        </div>
    )
}

export default TheatreList;