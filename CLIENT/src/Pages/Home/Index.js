import { Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { GetAllMovie } from '../../apicalls/movies';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../Redux/LoadersSlice';
import moment from "moment";
import { useNavigate } from 'react-router-dom';



function Home() {
  const [searchText, setSearchText] = useState("");
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getAllMovies = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllMovie();
      if (response.success) {
        setMovies(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (err) {
      dispatch(HideLoading());
      message.error(err.message);
    }
  }

  useEffect(() => {
    getAllMovies();
  }, []);

  return (
    <div>
      <div className="flex h-[15vh] border-4 border-gray-900 bg-gray-800">
        <div className="text-4xl font-bold w-[85vw] m-7 text-white">Book
          <span className="bg-orange-500 text-4xl italic border-2 border-white rounded-lg p-2">my</span>
          Show !!</div>
        <div className="w-[15vw] p-4">
          <img src='https://seeklogo.com/images/M/movie-time-cinema-logo-8B5BE91828-seeklogo.com.png' alt='poster' />
        </div>
      </div>
      <div className='h-[85vh] bg-gray-700'
      >

        <Input
          className='w-[1000px] h-[30px] border-2 border-gray-900 mx-3 my-4'
          placeholder='Search For Movies'
          prefix={<i class="ri-search-line"></i>}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <hr />
        <div className='flex justify-between my-2'>
          <span className='text-2xl text-orange-500 font-bold mx-2 underline'>Currently Showing Movies</span>
          <button type="button" className="text-white bg-orange-500
         hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300 font-medium rounded-full 
         text-sm px-5 py-2.5 text-center  mr-4 me-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
            onClick={() => navigate("/login")}
          >
            SignIn</button>
        </div>
        <div className='flex my-4 gap-3 justify-evenly'>
          {
            movies.filter
              ((movie) => movie.title.toLowerCase().includes(searchText.toLowerCase()))
              .map((movie) => (
                <div className="cursor-pointer hover:scale-110 duration-300"
                  onClick={() => navigate(`/movie/${movie._id}?date=${moment().format("YYYY-MM-DD")}`)}
                >
                  <img src={movie.poster} className='h-[250px] w-[200px] rounded-lg' />
                </div>
              )
              )
          }
        </div>


      </div>
    </div>
  )
}

export default Home;