import React from "react";
import { Form, Modal, Col, Row, message } from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";
import { AddMovie, UpdateMovie } from "../../apicalls/movies";
import { HideLoading, ShowLoading } from "../../Redux/LoadersSlice";

function MovieForm({
    showMovieFormModal,
    setShowMovieFormModal,
    selectedMovie,
    setSelectedMovie,
    getData,
    formType
}) {
    if (selectedMovie) {
        selectedMovie.releaseDate = moment(selectedMovie.releaseDate).format("YYYY-MM-DD");
    }
    const dispatch = useDispatch();
    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading());
            let response = null;
            if (formType === "add") {
                response = await AddMovie(values);
            } else {
                response = await UpdateMovie({
                    ...values, movieId: selectedMovie._id
                });
            }
            if (response.success) {
                getData();
                message.success(response.message);
                setShowMovieFormModal(false);
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (err) {
            dispatch(HideLoading());
            message.error(err.message);
        }
    }


    return (
        <Modal
            title={formType === "add" ? "ADD MOVIE" : "EDIT MOVIE"}
            open={showMovieFormModal}
            onCancel={() => {
                setShowMovieFormModal(false);
                setSelectedMovie(null);
            }}
            footer={null}
            width={800}
        >
            <Form layout="vertical" initialValues={selectedMovie} onFinish={onFinish}>  
            {/* onFinish is attribute from antD */}
                <Row gutter={16} >
                    <Col span={24} >
                        <Form.Item label="Movie Name" name="title">
                            <input type="text" className="border-2 border-orange-600 rounded-lg w-[100%]"/>
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item label="Movie Description" name="description">
                            <textarea type="text" className="border-2 border-orange-600 rounded-lg w-[100%]" />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item label="Movie Duration (Min)" name="duration">
                            <input type="text" className="border-2 border-orange-600 rounded-lg" />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item label="Language" name="language">
                            <select name="" id="" className="border-2 border-orange-600 rounded-lg">
                                <option value="">Select Language</option>
                                <option value="Telugu">Telugu</option>
                                <option value="English">English</option>
                                <option value="Hindi">Hindi</option>
                                <option value="Tamil">Tamil</option>
                            </select>
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item label="Movie Release Date" name="releaseDate">
                            <input type="date" className="border-2 border-orange-600 rounded-lg"/>
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item label="Genre" name="genre">
                            <select name="" id="" className="border-2 border-orange-600 rounded-lg">
                                <option value="">Select Genre</option>
                                <option value="Action">Action</option>
                                <option value="Comedy">Comedy</option>
                                <option value="Drama">Drama</option>
                                <option value="Romance">Romance</option>
                            </select>
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item label="Poster URL" name="poster">
                            <input type="text" className="border-2 border-orange-600 rounded-lg w-[100%]"/>
                        </Form.Item>
                    </Col>
                </Row>

                <div className="flex justify-end gap-1">
                    <button type="button" class="text-white bg-orange-400 hover:bg-orange-500 focus:outline-none 
        focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 
        text-center me-2 mb-2 dark:focus:ring-orange-900" onClick={() => {
                            setShowMovieFormModal(false);
                            setSelectedMovie(null);
                        }}>Cancel</button>
                    <button type="submit" class="text-white bg-orange-400 hover:bg-orange-500 focus:outline-none 
        focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 
        text-center me-2 mb-2 dark:focus:ring-orange-900">Save</button>
                </div>
            </Form>
        </Modal>
    )
}


export default MovieForm;