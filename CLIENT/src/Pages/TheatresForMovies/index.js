import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { GetMovieById } from "../../apicalls/movies";
import { message } from 'antd';
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../Redux/LoadersSlice";
import { GetAllTheatresByMovie } from "../../apicalls/theatres";

function TheatresForMovies() {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();

    const queryDate = new URLSearchParams(location.search).get("date");
    const [movie, setMovie] = useState({});
    const [date, setDate] = useState(queryDate || moment().format("YYYY-MM-DD"));
    const [theatres, setTheatres] = useState([]);

    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetMovieById(params.id);
            if (response.success) {
                setMovie(response.data)
            } else {
                message.error("Movie Not Found");
                navigate("/");
            }
            dispatch(HideLoading());
        } catch (err) {
            dispatch(HideLoading());
            message.error(err.message);
            navigate("/");
        }
    }

    const getTheatres = async() => {
        try{
            dispatch(ShowLoading());
            const response = await GetAllTheatresByMovie({
                date,
                movieId : params.id
            });
            if(response.success){
                setTheatres(response.data);
            }else{
                message.error(response.message);
            }
            dispatch(HideLoading());
        }catch(err){
            dispatch(HideLoading());
            message.error(err.message);
        }
    }
    
    useEffect(() => {
        if(!movie?._id){
        getData();
        }
        getTheatres();
    }, [queryDate]);

    console.log(theatres);
    return (
        <div>
            <div className="flex h-[15vh] border-4 border-gray-900 bg-gray-800">
                <div className="text-4xl font-bold w-[85vw] m-7 text-white">Book
                    <span className="bg-cyan-500 text-4xl italic border-2 border-white rounded-lg p-2">my</span>
                    Show !!</div>
                <div className="w-[15vw] p-4">
                </div>
            </div>
            <div className="h-[85vh]">
                {movie?._id && (
                    <div>
                        <div className=" flex justify-between">
                            <span className="text-3xl font-bold text-cyan-500 my-2 ml-4">{movie.title} ({movie.language})</span>

                            <div className="my-2 mr-3">
                                <span className="text-lg text-cyan-500 font-medium p-3">Select Date</span>
                                <input
                                    className="border-2 border-cyan-500 rounded-lg cursor-pointer"
                                    type="date"
                                    value={date}
                                    min={moment().format("YYYY-MM-DD")}
                                    onChange={(e) => {
                                        setDate(e.target.value);
                                        navigate(`/movie/${params.id}?date=${e.target.value}`)
                                    }}
                                />
                            </div>
                        </div>
                        <img src={movie.poster} alt="Poster" className='h-[150px] w-[100px] rounded-lg mb-3 ml-4' />
                        <hr />
                        <div className="text-3xl font-medium text-cyan-500 ml-4">Theatres</div>
                        
                        {
                            (theatres || []).length === 0 ? (
                                <div className="text-orange-500 font-medium ml-4">No Shows Available !! Try Some Other Date</div>
                            ) : (
                            <div className="flex flex-col gap-2 my-2 p-2">
                                
                                    {(theatres || []).map((theatre) => (
                                        <div className=" flex flex-col border-2 rounded-lg border-gray-400">
                                            <span className="text-lg font-bold ml-4">{theatre.name}</span>
                                            <span className="text-lg font-bold ml-4">{theatre.address}</span>

                                            
                                            <div className="flex gap-3 ml-4">
                                                {
                                                    theatre.Shows.sort((a, b) => moment(a.time, "HH:mm") - moment(b.time, "HH:mm"))
                                                        .map((show) => (
                                                            <div className="border-2 border-green-500 font-bold text-green-500 cursor-pointer 
                                                            p-1 rounded-lg m-2 hover:scale-110 hover:text-orange-500 duration-300"
                                                            onClick={() => navigate(`/book-show/${show._id}`)}
                                                            >
                                                                {moment(show.time, "HH:mm").format("hh.mm A")}
                                                            </div>
                                                        ))
                                                }
                                            </div>
                                        </div>
                                    ))}
                                
                            </div>
                            )
                        }
                    </div>
                )}
            </div>
        </div>
    )
}

export default TheatresForMovies;