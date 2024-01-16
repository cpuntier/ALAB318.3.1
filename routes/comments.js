const express = require("express");
const router = express.Router();
const error = require("../utilities/error");

const comments = require("../data/comments");

router.route("/")
    .get((req, res) => {
        const links = [
            {
                href: "posts/:id",
                rel: ":id",
                type: "GET",
            },
        ];

        res.json(comments,links)
    })


module.exports = router;
