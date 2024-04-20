
const express=require('express')
const Model = require('./model')
const router = express.Router();


//Post Method
router.post('/post', async (req, res) => {
    console.log("Pushing data to mongo DB",req.body);
    //res.send(req.body)
    const data = new Model({
        status: req.body.status,
        message: req.body.message,
        testDuration: req.body.testDuration,
        TotalSuites: req.body.TotalSuites,
        Totaltests: req.body.Totaltests,
        TotalPassed: req.body.TotalPassed,
        TotalFailed: req.body.TotalFailed,
        TotalPending: req.body.TotalPending,
        TotalSkipped: req.body.TotalSkipped,
        Component: req.body.Component,
        uuid: req.body.uuid
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Get all Method
router.get('/getAll', async (req, res) => {
    try {
        const data = await Model.find()
        res.send({ status: "ok !!", data: data });
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id)
        res.status(200).json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get first record
router.get('/getFirstRecord', async (req, res) => {
    try {
        const firstRecord = await Model.findOne().sort({ _id: 1 }).exec();
        res.status(200).json(firstRecord)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get component record
///api/getComponentRecord?Component=@sanity
router.get('/getComponentRecord', async (req, res) => {
    console.log(req.query)
    try {
        const componentRecord = await Model.find(req.query).sort({ createdAt: -1 }).exec();
        res.status(200).json(componentRecord)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//get the latest record for a component
router.get('/getLatestComponentRecord', async (req, res) => {
    console.log(req.query)
    // try {
    //         const {component}=req.query;
    //         const query={};
    //         if(component)
    //         {
    //             query.component=component
    //         }
      //  const componentRecord = await Model.find(req.query).sort({ createdAt: -1 }).limit(1).exec();
      const data = await Model.find(req.query).sort({ createdAt: -1 }).limit(1).exec();
        res.status(200).json(data)
    //}
    // catch (error) {
    //     res.status(500).json({ message: error.message })
    // }
})

//Update by ID Method
router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})

module.exports = router;