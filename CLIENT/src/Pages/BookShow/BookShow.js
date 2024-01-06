import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { GetShowById } from "../../apicalls/shows";
import { message } from "antd";
import { BookShowTickets, MakePayment } from "../../apicalls/booking";
import { HideLoading, ShowLoading } from "../../Redux/LoadersSlice";
import StripeCheckout from "react-stripe-checkout";

const STRIPE_KEY = "pk_test_51OT55ASGg2ld6Sjfb2t08ADWEicR0l8kyGkzn2DtJoGoMTiClLacmpn8SG1mLVl28Eb3LuBUmdsp40c61nUyrRfR00cfAFxlJc";


function BookShow() {
    const [show, setShow] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetShowById({
                showId: params.id,
            });
            if (response.success) {
                setShow(response.data);
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (err) {
            dispatch(HideLoading());
            message.error(err.message);
        }
    }




    const getSeats = () => {
        const columns = 12;
        const rows = Math.ceil(show.totalSeats / columns);

        return (
            <div>
                <p className="text-lg font-bold text-gray-800 italic text-center mt-7">Screen This Side</p>
                <hr class="w-72 h-2 mx-auto my-2 bg-gray-500 border-0 rounded md:my-2 dark:bg-gray-700" />
                <div className="my-5 border-2 border-gray-700 m-16">
                    {Array.from(Array(rows).keys()).map((seat, index) => {
                        return (
                            <div className="flex justify-center gap-5 my-3">
                                {Array.from(Array(columns).keys()).map((column, index) => {
                                    const seatNumber = seat * columns + column + 1;
                                    let seatClass = "seat";

                                    if (selectedSeats.includes(seatNumber)) {
                                        seatClass = seatClass + " selected-seat";
                                    }
                                    if (show.bookedSeats.includes(seatNumber)) {
                                        seatClass = seatClass + " booked-seat";
                                    }
                                    return (
                                        seatNumber <= show.totalSeats && (
                                            <div
                                                className={seatClass}
                                                onClick={() => {
                                                    if (selectedSeats.includes(seatNumber)) {  // toggle functionality
                                                        setSelectedSeats(
                                                            selectedSeats.filter((item) => item !== seatNumber)
                                                        )
                                                    } else {
                                                        setSelectedSeats([...selectedSeats, seatNumber]);
                                                    }
                                                }}
                                            >
                                                <h1 className="border-2 w-[70px] h-[32px] text-center 
                                                cursor-pointer hover:scale-110 hover:text-green-500 duration-300
                                                font-bold"
                                                >{seatNumber}</h1>
                                            </div>
                                        )
                                    )
                                })
                                }
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        )
    }

    const book = async (transactionId) => {
        try {
            dispatch(ShowLoading());
            const response = await BookShowTickets({
                show: params.id,
                seats: selectedSeats,
                transactionId,
            })
            if (response.success) {
                message.success(response.message);
                navigate("/");
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (err) {
            dispatch(HideLoading());
            message.error(err.message);

        }
    }
    const onToken = async (token) => {
        try {
            console.log(show.ticketPrice);
            console.log(token);
            dispatch(ShowLoading());
            const response = await MakePayment(
                token,
                selectedSeats.length * show.ticketPrice * 100
            );
            if (response.success) {
                message.success(response.message);
                book(response.data);
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
    }, []);

    return (
        show && (
            <div>
                <div className="flex justify-between h-[15vh] border-4 border-gray-900 bg-gray-800">
                    <div className="text-4xl font-bold w-[85vw] m-7 text-white">Book
                        <span className="bg-lime-400 text-4xl italic border-2 border-white rounded-lg p-2">my</span>
                        Show !!</div>
                    <div className="text-xl text-lime-400 font-bold my-4 p-1">Hey,You Are Almost There! Kindly Pick Seats😊 </div>
                </div>
                <div className="flex justify-between p-2 border-2 border-gray-400 rounded-sm m-1">
                    <div className="text-lg font-bold">
                        <h1>{show.theatre.name}</h1>
                        <h1>{show.theatre.address}</h1>
                    </div>
                    <div className="text-2xl font-bold">
                        <h1>{show.movie.title} ({show.movie.language})</h1>
                    </div>
                    <div className="font-bold">
                        <h1>
                            {moment(show.date).format("MMM Do YYYY")} -{" "}
                            {moment(show.time, "HH:mm").format("hh:mm A")}
                        </h1>
                    </div>
                </div>

                <div>{getSeats()}</div>

                {selectedSeats.length > 0 && (
                    <div className=" border-2 border-gray-800 ml-[600px] mr-[600px] rounded-md font-bold">
                        <div className="flex justify-center">
                            <h1>Selected Seats:</h1>{selectedSeats.join(" , ")}
                        </div>
                        <div className="flex justify-center text-red-700">
                            <h1>Amount :</h1> Rs.{Math.ceil(selectedSeats.length * show.ticketPrice)}/-
                        </div>
                        <div className="ml-[100px]">
                            <StripeCheckout
                                billingAddress
                                token={onToken}
                                stripeKey={STRIPE_KEY}
                                currency="INR"
                                amount={selectedSeats.length * show.ticketPrice * 100}
                            >
                                <button type="button" class="text-gray-900 bg-gradient-to-r from-lime-400 to-lime-500 hover:bg-gradient-to-l hover:from-lime-500
                                   hover:to-lime-500 focus:ring-
                                   focus:outline-none focus:ring-lime-500 dark:focus:ring-lime-700 
                                   font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Pay To Book</button>
                            </StripeCheckout>
                        </div>
                    </div>
                )}


            </div>

        ))
}
export default BookShow;