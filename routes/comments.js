const express = require("express");
const router = express.Router();
const error = require("../utilities/error");

const comments = require("../data/comments");

router.route("/")
    .get((req, res) => {
        const links = [
            {
                href: "comments/:id",
                rel: ":id",
                type: "GET",
            },
        ];


        res.json({ comments, links })

    }).post((req, res) => {
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

router.route("/:id")
    .get((req, res, next) => {
        const links = [
            {
                href: `/${req.params.id}`,
                rel: "",
                type: "PATCH",
            },
            {
                href: `/${req.params.id}`,
                rel: "",
                type: "DELETE",
            },
        ];

        comment = comments.find((c) => c.id == req.params["id"])
        console.log(comment);

        if (comment) {

            res.json({ comment, links });
        } else {
            next();
        }
    }).patch((req, res, next) => {
        const comment = comments.find((c, i) => {
            if (c.id == req.params["id"]) {
                console.log(c);
                for (const key in req.body) {
                    comments[i][key] = req.body[key];
                }
                return true;
            }
        });
        if (comment) res.json(comment);
        else next();
    }).delete((req, res, next) => {
        const comment = comments.find((c, i) => {
            if (c.id == req.params.id) {
                comments.splice(i, 1);
                return true;
            }
        }
        )
    })
module.exports = router;
