import React, { useEffect, useState } from "react";
import { Col, Divider, Form, Modal, Row, Table, message } from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../Redux/LoadersSlice";
import { GetAllMovie } from "../../apicalls/movies";
import { AddShows, DeleteShow, GetAllShowsByTheatre } from "../../apicalls/shows";

function Shows({
    setOpenShowsModal,
    selectedTheatre
}) {
    const [view, setView] = useState("table");
    const [movies, setMovies] = useState([]);
    const [shows, setShows] = useState([]);
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const movieResponse = await GetAllMovie();
            if (movieResponse.success) {
                setMovies(movieResponse.data);
            } else {
                message.error(movieResponse.message);
            }

            const showResponse = await GetAllShowsByTheatre({
                theatreId: selectedTheatre._id
            });
            if (showResponse.success) {
                setShows(showResponse.data);
            } else {
                message.error(showResponse.message);
            }
            dispatch(HideLoading());
        } catch (err) {
            dispatch(HideLoading());
            message.error(err.message);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Do You Really Want To Delete ?");
        if (confirmed) {
            try {
                dispatch(ShowLoading());
                const response = await DeleteShow(id);
                if (response.success) {
                    getData();
                    message.success(response.message);
                } else {
                    message.error(response.message);
                }
                dispatch(HideLoading());
            } catch (err) {
                dispatch(HideLoading());
                message.error(err.message);
            }
        }
    }

    const handleAddShow = async (showData) => {
        try {
            dispatch(ShowLoading());
            const response = await AddShows({
                ...showData,
                theatre : selectedTheatre._id
            });
            if (response.success) {
                message.success(response.message);
                getData();
                setView("table");
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (err) {
            dispatch(HideLoading());
            message.error(err.message);
        }
    }


    const columns = [
        {
            title: "Show Name",
            dataIndex: "name",
        },
        {
            title: "Date",
            dataIndex: "date",
            render: (date) => {
                return moment(date).format("DD-MM-YYYY")
            }
        },
        {
            title: "Time",
            dataIndex: "time",
        },
        {
            title: "Movie",
            dataIndex: "movie",
            render: (_, rowData) => {
                return rowData.movie.title;
            }
        },
        {
            title: "Total Seats",
            dataIndex: "totalSeats"
        },
        {
            title: "Available Seats",
            dataIndex: "availableSeats",
            render: (_, rowData) => {
                return <div className="text-green-500">{rowData.totalSeats - rowData.bookedSeats.length}</div>;
            }
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (_, rowData) => {
                return (
                    <div>
                        {rowData.bookedSeats.length === 0 && (
                            <i className="ri-delete-bin-line cursor-pointer text-xl hover:text-red-500"
                                onClick={() => { handleDelete(rowData._id) }}
                            >
                            </i>
                        )}
                    </div>
                )
            }
        }
    ]


    return (
        <Modal
            open
            onCancel={() => setOpenShowsModal(false)}
            width={1400}
            footer={null}
        >
            <h1 className="text-2xl">
                Theatre: <span className="font-extrabold text-orange-500">{selectedTheatre.name}</span>
            </h1>
            <hr />
            <div className="flex justify-between">
                <h2 className="text-xl font-bold text-orange-500">
                    {view === "table" ? "Shows" : "Add Show"}
                </h2>
                {
                    view === "table" && (
                        <button type="button" class="text-white bg-orange-400 hover:bg-orange-500 focus:outline-none 
                    focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 
                    text-center me-2 mb-2 dark:focus:ring-orange-900 m-3"
                            onClick={() => { setView("form") }}
                        >
                            Add Show
                        </button>
                    )
                }
            </div>
            {view === "table" && <Table columns={columns} dataSource={shows} />}
            {view === "form" && (
                <Form layout="vertical"
                    onFinish={handleAddShow}
                >
                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <Form.Item
                                label="Show Name"
                                name="name"
                                rules={[{ required: true, message: "Please input show name!" }]}
                            >
                                <input className="w=[100%] border-2 border-orange-500 rounded-md"/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Date"
                                name="date"
                                rules={[{ required: true, message: "Please input show date!" }]}
                            >
                                <input type="date" min={new Date()} className="w=[100%] border-2 border-orange-500 rounded-md"/>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                label="Time"
                                name="time"
                                rules={[{ required: true, message: "Please input show time!" }]}
                            >
                                <input type="time" className="w=[100%] border-2 border-orange-500 rounded-md"/>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                label="Movie"
                                name="movie"
                                rules={[{ required: true, message: "Please select movie!" }]}
                            >
                                <select className="w=[100%] border-2 border-orange-500 rounded-md">
                                    <option value="">Select Movie</option>
                                    {movies.map((movie) => (
                                        <option value={movie._id}>{movie.title}</option>
                                    ))}
                                </select>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                label="Ticket Price"
                                name="ticketPrice"
                                rules={[
                                    { required: true, message: "Please input ticket price!" },
                                ]}
                            >
                                <input type="number" className="w=[100%] border-2 border-orange-500 rounded-md"/>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                label="Total Seats"
                                name="totalSeats"
                                rules={[
                                    { required: true, message: "Please input total seats!" },
                                ]}
                            >
                                <input type="number" className="w=[100%] border-2 border-orange-500 rounded-md"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <div>
                        <div className="flex justify-end gap-1">
                            <button type="button" class="text-white bg-orange-400 hover:bg-orange-500 focus:outline-none 
                    focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 
                    text-center me-2 mb-2 dark:focus:ring-orange-900" onClick={() => { setView("table") }}>Cancel</button>
                            <button type="submit" class="text-white bg-orange-400 hover:bg-orange-500 focus:outline-none 
                    focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 
                    text-center me-2 mb-2 dark:focus:ring-orange-900">Save</button>
                        </div>
                    </div>
                </Form>
            )}
        </Modal>
    )
}

export default Shows;