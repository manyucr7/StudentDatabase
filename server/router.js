const express = require('express');
const router = express.Router();
const Post = require('./product');
const authController = require('./authController');

router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get)

router.post("/", (req, res) => {
    const pageOptions = {
        page: parseInt(req.body.page, 10) || 0,
        limit: parseInt(req.body.limit, 10) || 0
    };
    Post.find()
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
        .exec(function (err, doc) {
            if (err) {
                res.status(500).json(err);
                return;
            };
            res.status(200).json(doc);
        });
});
router.get('/totalpages', (req, res) => {

    Post.find().then(data => {
        res.json(data);
        res.status(200);
    })

    // cursorData.on("data", (data) => {
    //     console.log("pages calculated")
    //     list.push(data);
    // });
    // cursorData.on("end", () => {
    //     res.status(200).json(list);
    // });
    // cursorData.on("error", (error) => {
    //     return res.status(500).json({
    //         error: error,
    //         message: error.message
    //     })
    // })
})

router.post('/myposts', (req, res) => {
    if (!(req.body.name))
        res.send('please fill the fields');

    else {
        Post.aggregate([
            { $match: { "branch": req.body.name } },
            { $sort: { "marks": -1 } },
            { $limit: 3 }
        ]).then(data => {
            res.json(data)
        }).catch(err => {
            res.sendStatus(404);
        })
    }
})
router.post('/place', (req, res) => {
    if (!(req.body.name))
        res.send('please fill the fields');

    Post.aggregate([
        { $match: { "place": req.body.name } },
        { $sort: { "marks": -1 } },
        { $limit: 3 }
    ]).then(data => {
        res.json(data)
        res.status(200);
    })
        .catch(err => {
            res.sendStatus(404);
        })
})
router.post('/seed', (req, res) => {
    const { name, branch, marks, school, place } = req.body
    const bulk = Post.collection.initializeUnorderedBulkOp();
    bulk.insert({
        name: name,
        branch: branch,
        marks: marks,
        school: school,
        place: place
    })
    bulk.execute();

})
router.post('/create', (req, res) => {
    const { name, branch, marks, school, place } = req.body
    if (!(name && branch && marks && school && place))
        res.send('please fill all the fields');
    const bulk = Post.collection.initializeUnorderedBulkOp();
    bulk.find({ name: name }).upsert().updateOne(
        {
            $setOnInsert: {
                name,
                branch,
                marks,
                school,
                place
            }
        })
    bulk.execute().then(response => {
        res.json(response.result.nMatched);
        res.status(200);
    }).catch(err => {
        res.status(404).send('Operation failed ' + err)
    })

})

module.exports = router;