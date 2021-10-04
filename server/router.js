const express = require('express');
const router = express.Router();
const Post = require('./product');
const admindata = require('./admindata');
const adminSchool = require('./adminSchool');
const adminCity = require('./adminCity');
const authController = require('./authController');
const { Aggregate } = require('mongoose');
router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);
router.post('/adminsignup', authController.signup_admin);
router.post('/adminlogin', authController.login_admin);
router.get('/logout', authController.logout_get);
router.get('/getSchool', (req, res) => {
    adminSchool.find().select({ school: 1 }).then(a => res.json(a)).catch(err => console.log(err))
});
router.get('/info', (req, res) => {
    adminSchool.find({ school: req.body.data.school }).then(
        function (data) {
            return res.json(data)
        }).catch(function (err) {
            console.log(err)
        })
});
router.post('/getRegion', (req, res) => {
    admindata.find().then(
        function (data) {
            return res.json(data)
        }).catch(function (err) {
            console.log(err)
        })
});
router.post('/getarea', (req, res) => {
    adminCity.find({ city: req.body.data.city }).then(
        function (data) {
            return res.json(data)
        }).catch(function (err) {
            console.log(err)
        })
});
router.get('/city', (req, res) => {
    admindata.find().select({ city: 1 }).then(a => res.json(a)).catch(err => console.log(err));
});
router.post('/getCity', (req, res) => {
    admindata.find({ region: req.body.data.region }).then(
        function (data) {
            return res.json(data)
        }).catch(function (err) {
            console.log(err)
        })
});
router.get('/showSchool', (req, res) => {
    adminSchool.find().then(a => res.json(a)).catch(err => console.log(err));
});
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
    }).catch(err=>{
        console.log(err)
    })

});
router.post('/myposts', (req, res) => {
    if (!(req.body.name))
        res.send('please fill the fields');

    else {
        Post.aggregate([
            { $match: { "school": req.body.name } },
            { $sort: { "cgpa": -1 } },
            { $limit: 3 }
        ]).then(data => {
            res.json(data)
        }).catch(err => {
            res.sendStatus(404);
        })
    }
});
router.post('/topindia', (req, res) => {

    Post.aggregate([
        { $sort: { cgpa: -1 } },
        { $limit: 3 }
    ]).then(data => {
        res.json(data)
    }).catch(err => {
        res.sendStatus(404);
    })

});
router.post('/topcity', (req, res) => {
    if (!(req.body.name))
        res.send('please fill the fields');

    else {
        Post.aggregate([
            { $match: { "city": req.body.name } },
            { $sort: { cgpa: -1 } },
            { $limit: 3 }
        ]).then(data => {
            res.json(data)
        }).catch(err => {
            res.sendStatus(404);
        })
    }
});
router.post('/create', (req, res) => {
    var schoolname = req.body.school;
    const name=req.body.name, maths=Number(req.body.maths), english=Number(req.body.english), hindi=Number(req.body.hindi), science=Number(req.body.science), french=Number(req.body.french), school=req.body.school, cgpa = Number(req.body.cgpa)
    adminSchool.aggregate(
        [
            { $match: { school: schoolname } }
        ]
    ).then(function (data) {
        const city = data[0].city;
        if (!(name && maths && english && hindi && science && french && school && cgpa))
            res.send('please fill all the fields');
        const bulk = Post.collection.initializeUnorderedBulkOp();
        bulk.find({ name: name }).upsert().updateOne(
            {
                $setOnInsert: {
                    name,
                    maths,
                    english,
                    hindi,
                    science,
                    french,
                    school,
                    cgpa,
                    city
                }
            })
        bulk.execute().then(response => {
            res.json(response.result.nMatched);
            res.status(200);
        }).catch(err => {
            res.status(404).send('Operation failed ' + err)
        })

    }).catch(err=>{
        console.log(err)
    })

});
router.post('/send', (req, res) => {
    const { city, region, area } = req.body
    if (!(city && region && area))
        res.send('please fill all the fields');
    const bulk = admindata.collection.initializeUnorderedBulkOp();
    bulk.find({ city: city }).upsert().updateOne(
        {
            $setOnInsert: {
                city, region
            }
        })
    bulk.execute().then(response => {
        res.json(response.result.nMatched);
        res.status(200);
    }).catch(err => {
        res.status(404).send('Operation failed ' + err)
    })
    const bulk2 = adminCity.collection.initializeUnorderedBulkOp();
    bulk2.find({ area: area }).upsert().updateOne(
        {
            $setOnInsert: {
                area, city
            }
        })
    bulk2.execute().then(response => {
        res.json(response.result.nMatched);
        res.status(200);
    }).catch(err => {
        res.status(404).send('Operation failed ' + err)
    })

});
router.post('/sendSchool', (req, res) => {
    const { school, city, region, area } = req.body
    if (!(school && city && region && area))
        res.send('please fill all the fields');
    const bulk = adminSchool.collection.initializeUnorderedBulkOp();
    bulk.find({ school: school }).upsert().updateOne(
        {
            $setOnInsert: {
                school, city, region, area
            }
        })
    bulk.execute().then(response => {
        res.json(response.result.nMatched);
        res.status(200);
    }).catch(err => {
        res.status(404).send('Operation failed ' + err)
    })

});
module.exports = router;