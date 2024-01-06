const express = require("express");
const router = express.Router();
const Booking = require("../Models/BookingModel");
const Show = require("../Models/ShowsModel");

// const stripe = require("stripe")(process.env.stripe_key);
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51OT55ASGg2ld6SjfNhkpoSYYxUUWiTMwHPKhjhGpe3nRMFtQvh4soKDuaSPpjsu6LfFtRpWfFolUFGsm8Dnp1UPt00zA52YW8R');

router.post("/make-payment", async (req, res) => {
    try {
        const { token, amount } = req.body;

        // console.log("Token ===>", token);
        // console.log("Amount ===>", amount);
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "INR"
        })

        const transactionId = paymentIntent.client_secret;

        res.send({
            success: true,
            message: "Payment Successful",
            data: transactionId
        })
    } catch (err) {
        console.log("Unexpected Error ==>", err);
        res.status(500).send({
            success: false,
            message: err.message
        })
    }
})

router.post("/book-show", async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();

        const show = await Show.findById(req.body.show);

        await Show.findByIdAndUpdate(req.body.show, { bookedSeats: [...show.bookedSeats, ...req.body.seats] });

        res.send({
            success: true,
            message: "Show Booked Successfully",
            data: newBooking
        })
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        })
    }
})

router.get("/get-bookings", async (_, res) => {
    try {
        const AllBooking = await Booking.find().populate("show")
        .populate({
            path : "show",
            populate : {
                path : "movie",
                model : "movies"
            }
        });
        res.send({
            success: true,
            message: "Bookings Fetched Successfully",
            data : AllBooking
        })
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        })
    }
})





module.exports = router;