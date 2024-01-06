import React, { useEffect, useState } from "react";
import { message, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DeleteTheatre, GetAllTheatresByOwner } from "../../apicalls/theatres";
import { HideLoading, ShowLoading } from "../../Redux/LoadersSlice";
import TheatreForm from "./TheatreForm";
import Shows from "./Shows";
function TheatreList() {
    const [showTheatreFormModal, setShowTheatreFormModal] = useState(false);
    const [selectedTheatre, setSelectedTheatre] = useState(null);
    const [theatres, setTheatres] = useState([]);
    const [formType = "add", setFormType] = useState("add");
    const [openShowsModal, setOpenShowsModal] = useState(false);
    const { user } = useSelector((state => state.users));
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetAllTheatresByOwner({
                owner: user._id,
            })
            if (response.success) {
                setTheatres(response.data);
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }

    const handleDelete = async (theatreId) => {
        const confirmed = window.confirm("Do You Really Want To Delete ?");
        if(confirmed){
        try {
            dispatch(ShowLoading());
            const response = await DeleteTheatre(theatreId);
            if (response.success) {
                message.success(response.message);
                getData();
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }
    }

    useEffect(() => {
        getData();
    }, []);
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
            title: "Status",
            dataIndex: "isActive",
            render: (isActive) => {
                if (isActive) {
                    return <div className="text-green-500 font-medium">Approved</div>;
                } else {
                    return <div className="text-red-500 font-medium">Pending / Blocked</div>;
                }
            }
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (_, rowData) => {
                return (
                    <div className="flex gap-3">
                        <i className="ri-pencil-line cursor-pointer text-xl hover:text-red-500" onClick={() => {
                            setSelectedTheatre(rowData);
                            setFormType("edit");
                            setShowTheatreFormModal(true);
                        }}></i>
                        <i className="ri-delete-bin-line cursor-pointer text-xl hover:text-red-500" onClick={() => { handleDelete(rowData._id) }}>
                        </i>
                        {rowData.isActive && (
                            <span className="underline font-medium text-orange-500 cursor-pointer"
                                onClick={() => {
                                    setSelectedTheatre(rowData)
                                    setOpenShowsModal(true)
                                }}>
                                Shows
                            </span>
                        )

                        }
                    </div>
                )
            }
        }
    ]
    return (
        <div>
            <div className="flex justify-end p-1">
                <button type="button" className="text-gray-900 bg-gradient-to-r from-orange-400 via-orange-600 to-orange-700 
            hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 font-medium rounded-lg 
            text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => {
                        setFormType("add");
                        setShowTheatreFormModal(true);
                    }}>
                    Add Theatre
                </button>
            </div>
            <Table columns={columns} dataSource={theatres} />

            {
                showTheatreFormModal && (
                    <TheatreForm
                        showTheatreFormModal={showTheatreFormModal}
                        setShowTheatreFormModal={setShowTheatreFormModal}
                        selectedTheatre={selectedTheatre}
                        setSelectedTheatre={setSelectedTheatre}
                        formType={formType}
                        setFormType={setFormType}
                        getData={getData}
                    />
                )
            }

            {openShowsModal && (
                <Shows
                    setOpenShowsModal={setOpenShowsModal}
                    selectedTheatre={selectedTheatre}
                />
            )}
        </div>
    )
}

export default TheatreList;