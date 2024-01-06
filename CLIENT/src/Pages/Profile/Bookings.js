import React, { useEffect, useState } from 'react';
import { GetBookings } from '../../apicalls/booking';
import { message } from 'antd';
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../Redux/LoadersSlice";
import moment from 'moment';

function Booking() {
    const [booking, setBooking] = useState([]);
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetBookings();
            if (response.success) {
                message.success(response.message);
                setBooking(response.data);
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
        getData();
    }, [])

    console.log(booking);
    return (
        <div className='flex gap-3 justify-around flex-wrap'>
            {booking.map((book) => (
                <div>
                    <div className='border-2 border-black 
                        rounded-lg w-[450px] h-[200px] bg-orange-300 flex justify-between hover:scale-110 duration-300'>
                        <div>
                            <p className='pl-2 pt-2 text-lg font-bold underline'>Movie-Ticket</p>
                            <hr class="w-84 h-1 mx-auto my-2 bg-gray-800 border-0 rounded md:my-2 dark:bg-gray-700" />
                            <p className='pl-2 text-2xl font-bold'>{book.show.movie.title} {" "} ({book.show.movie.language}) </p>
                            <p className='pl-2 text-lg font-bold'>Date & Time : {moment(book.show.date).format("DD-MM-YYYY")} {" ,"} {moment(book.show.time, "HH:mm").format("hh:mm A")}</p>
                            <p className='pl-2 text-lg font-bold'>Seats : {book.seats.join(",")} </p>
                            <p className='pl-2 text-lg font-bold'>Amount : Rs.{book.show.ticketPrice * book.seats.length}/-</p>
                            <p className='pl-2 text-md font-bold'>BookingId : {book._id}</p>
                        </div>
                        <img src={book.show.movie.poster}
                            className='h-[125px] w-[100px] mr-2 mt-12'
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}


export default Booking;