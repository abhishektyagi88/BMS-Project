const express = require("express");

const router = express.Router();

const Show = require("../Models/ShowsModel");

router.post("/add-shows", async (req, res) => {
    try {
        const newShow = new Show(req.body);
        await newShow.save();
        res.status(200).send({
            success: true,
            message: "Shows Added Successfully"
        })
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        })
    }
})

router.post("/get-all-shows-by-theatre", async (req, res) => {
    try {
        const shows = await Show.find({ theatre: req.body.theatreId }).populate("movie");
        res.send({
            success: true,
            message: "Shows Fetched Successfully",
            data: shows
        })
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        })
    }
})

router.delete("/delete-shows", async (req, res) => {
    try {
        await Show.findByIdAndDelete(req.query.showId);
        res.send({
            success: true,
            message: "Show Deleted Successfully"
        })
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        })
    }
})

router.post("/get-all-theatres-by-movie", async (req, res) => {
    try {
        const { movieId, date } = req.body;

        const Shows = await Show.find({ movie: movieId, date }).populate("theatre").sort({ createdAt: -1 });

        let uniqueTheatres = [];
        Shows.forEach((show) => {
            const theatre = uniqueTheatres.find((theatre) => theatre._id == show.theatre._id);
            if (!theatre) {
                const ShowsForThisTheatre = Shows.filter((showObj) => showObj.theatre._id == show.theatre._id);
                uniqueTheatres.push({
                    ...show.theatre._doc,
                    Shows: ShowsForThisTheatre
                })
            }
        })
        res.send({
            success: true,
            message: " Shows Fetched Successfully",
            data: uniqueTheatres
        })
    } catch (err) {
        re.status(500).send({
            success: false,
            message: err.message
        })
    }
})

router.post("/get-show-by-id", async(req,res) => {
    try{
        const show = await Show.findById(req.body.showId)
        .populate("movie")
        .populate("theatre");

        res.send({
            success : true,
            message : "Show Fetched Successfully",
            data : show
        })
    }catch(err){
        res.status(500).send({
            success : false,
            message : err.message
        })
    }
})
module.exports = router;