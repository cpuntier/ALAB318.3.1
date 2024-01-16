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


        res.json({comments,links})

    }).post((req,res) => {
        if (req.body.userId && req.body.postId && req.body.body) {
            const comment = {
              id: comments[comments.length - 1].id + 1,
              userId: req.body.userId,
              postId: req.body.postId,
              body: req.body.body,
            };
            comments.push(comment);
            res.json(comments[comments.length - 1]);
          } else next(error(400, "Insufficient Data"));
        });

module.exports = router;
