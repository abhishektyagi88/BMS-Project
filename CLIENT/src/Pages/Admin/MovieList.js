import React ,{ useEffect, useState } from "react";
import { message, Table } from "antd";
import { useDispatch } from "react-redux";
import { GetAllMovie, DeleteMovie } from "../../apicalls/movies";
import { HideLoading, ShowLoading } from "../../Redux/LoadersSlice";
import moment  from "moment";
import MovieForm from "./MovieForm";
// import DisabledContext from "antd/es/config-provider/DisabledContext";
function MovieList() {
    const [movies, setmovies] = useState([]);
    const [showMovieFormModal, setShowMovieFormModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [formType, setFormType] = useState("add");
    const dispatch = useDispatch();


    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetAllMovie();
            if (response.success) {
                setmovies(response.data);
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }
    
    const handleDelete = async (movieId) => {
        try {
            dispatch(ShowLoading());
            const response = await DeleteMovie(movieId);
            if (response.success) {
                message.success(response.message);
                getData();
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (err) {
            dispatch(HideLoading());
            message.error(err);
        }
    }

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
        },
        {
            title: 'Language',
            dataIndex: 'language',
        },
        {
            title: 'ReleaseDate',
            dataIndex: 'releaseDate',
            render: (text, record) => {
                return moment(record.releaseDate).format("DD-MM-YYYY");
            }
        },
        {
            title: 'Poster',
            dataIndex: 'poster',
            render: (text, record) => {
                return (
                    <img
                        src={record.poster}
                        alt="poster"
                        height="60"
                        width="80"
                    />
                )
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => {
                return (
                    <div className="flex gap-3">
                        <i className="ri-pencil-line cursor-pointer text-xl hover:text-red-500" onClick={() => {
                            setSelectedMovie(record);
                            setFormType("edit");
                            setShowMovieFormModal(true);
                        }}></i>
                        <i className="ri-delete-bin-line cursor-pointer text-xl hover:text-red-500" onClick={() => { handleDelete(record._id) }}></i>
                    </div>
                )
            }
        },
    ];
    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <div className="flex justify-end p-1">
                <button type="button" className="text-gray-900 bg-gradient-to-r from-orange-400 via-orange-600 to-orange-700 
            hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 font-medium rounded-lg 
            text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => {
                        setShowMovieFormModal(true);
                        setFormType("add");
                    }}>
                    Add Movie
                </button>
            </div>
            <Table columns={columns} dataSource={movies} />

            {
                showMovieFormModal && (
                    <MovieForm
                        showMovieFormModal={showMovieFormModal}
                        setShowMovieFormModal={setShowMovieFormModal}
                        selectedMovie={selectedMovie}
                        setSelectedMovie={setSelectedMovie}
                        formType={formType}
                        getData={getData}
                    />
                )
            } 
        </div>
    )
}

export default MovieList;