let express = require('express')
let db = require('../models')
let Student = db.Student
//will match request to function
let router = express.Router()
// rout for getting all students, convert to json and return
router.get('/students', function(req,res,next){
    Student.findAll({order:['present','name']}).then( students =>{
        return res.json(students)
    }).catch(err => next (err) )
})
//post will create data
 router.post('/students', function (req, res, next){
     Student.create(req.body).then( (data) => {
         return res.status(201).send('created')
     }).catch(err=>{
         //handle user errors, ex missing starID or name
         if (err instanceof db.Sequelize.ValidationError) {
             // respond with 400 bad request error code, include error messafe
             let messages = err.errors.map(e => e.message)
             return res.status(400).json(messages)
         }
             // otherwise, something else has gone wrong
             return next(err)

     })
 })
//edit a student
router.patch('/students/:id', function (req,res,next){
    //ex if request is to /students/18
    //studentID will be at 18
   let studentID = req.params.id
    let updatedStudent = req.body
    Student.update(updatedStudent,{ where: { id: studentID}})
        .then((rowsModified)=>{
            let numberOfRowsModified = rowsModified[0] //number of rows changed

            if (numberOfRowsModified == 1){ //exactly one row
                return res.send('ok')
            }
                //no rows- student not found- return 404
                //what about a modification that violated the constraints
            //ex, modifying a student to have no name
            else{
                return res.status(404).json(['Student with that id not found'])

            }
        })
        .catch(err =>{
            // if validation error, tell user bad request
            if(err instanceof db.Sequlize.ValidationError){
                let messages = err.errors.map(e=> e.message)
                return res.status(400).json(messages)
            }else{
                //unexpected error
                return next(err)
            }
        })
})
//delete student
//router.delete
router.delete('/students/:id', function (req, res, next){
    let studentID = req.params.id
    Student.destroy( {where: {id: studentID}})
        .then((rowsDeleted) =>{
            if (rowsDeleted == 1) {
                return res.send('ok')
            }else{
                return res.status(404).json(['Not found'])
            }
        })
        .catch(err => next(err) ) // for unexpected errors.
})

//  make router available to rest of project
module.exports = router