// require from the express 
// set the router 
const router = require('express').Router();
// require the student models file, because this is 
// a route for the student, it needs to interact with 
// student modle
const Student = require('../db/models/student')

// use async is to let other code hold on, after this  
// code ran, then run the next code block
// the code is going from top to the bottom
// Q: when you will know to use async
// A: when you need to go though the files, and you
//    need other code to wait unstill you find the 
//    thing you need in the file
router.get('/', async (req, res, next) => {
    try {
        // await here is to tell all the codes wait
        // till the data is found from the file,
        // and returned to the variable. 
        // Q: What is findall() used for?
        // A: to find all the students that in 
        // the Student models 
      const students = await Student.findAll()
      res.send(students)
    } catch (error) {
        //Q: what this line means? How to use it?
        //A: because we used when we defined the function?
        //   it is means it will send the error next??
      next(error)
    }
  })

router.get('/:id', async (req, res, next) => {
    // try and catch is to get the error 
    try {  
        // wait till the find the id for the student in the file
        // find the student by the pk from the url
        // req.params will return an object with all the properties
        // req.params.id will return the student's id
      let student = await Student.findByPk(req.params.id)
      // if the student is exist
      if (student) {
          //return the student
        res.send(student)
      } else { // if not, return the error
        // use res.status to return the error
        res.status(404).send('Student not found')
      }
    } catch (error) {
      next(error)
    }
  })

  // post is to create, use create() to create
  router.post('/', async (req, res, next) => {
    try {
        // to create is to use the create()
        // Q: what is req.body??
        // The req.body object allows you to access data in a string
        // or JSON object from the client side. You generally use 
        // the req.body object to receive data through POST and PUT 
        // requests in the Express server.
      let student = await Student.create(req.body)
      // code 201 : CREATED, return the student from the line above
      res.status(201).send(student)
    } catch (err) {
      next(err)
    }
  })
  
  // put is to update, use update() with it
  // req.body is to get info from the client side
  router.put('/:id', async (req, res, next) => {
    try {
        // update the obj, and function is to find which id to update
        let updateStudent = await Student.update(req.body, {
            where: {id: req.params.id},
            // Q: What are those two properties means?
            // those is with sequalize documents,
            // when you update thing, need to add those two 
            //https://sequelizedocs.fullstackacademy.com/inserting-updating-destroying/
            returning: true,
            plain: true,
        })
        // Q: WHY is update[1]
        // it will return a array, the first one will be info we dont need 
        // we have to get the index 1
        // that will be the anwer
        // could console.log to see what updateStudent
        res.send(updateStudent[1])
    }
    catch(error) {
        next(error)
    }
   })

   router.delete('/:id', async (req, res, next) => {
    try {
        // use destroy to delete
        // use req.params.id to find the id
      await Student.destroy({ where: { id: req.params.id } })
      res.status(204).send()
    } catch (err) {
      next(err)
    }
  })


module.exports = router;
