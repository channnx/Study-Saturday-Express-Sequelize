const router = require('express').Router();
const { test } = require('mocha');
const Student = require('../db/models/student');
const Tests = require('../db/models/test');

router.get('/', async(req, res, next) => {
    try {
        const tests = await Tests.findAll();
        res.send(tests);
    }catch (err) {
        next(err)
    }
})

router.get('/:id', async(req, res, next) => {
    try {
        const test = await Tests.findByPk(req.params.id);
        if (test) {
            res.send(test);
        } else {
            res.status(404).send('Not Found')
        }      
    }catch (err) {
        next(err)
    }
})

router.post('/student/:studentId', async(req, res, next)=> {
    try {
        let student = await Student.findByPk(req.params.studentId);
        let test = await Tests.create(req.body)
        let studentTest = await test.setStudent(student)
        res.status(201).send(studentTest)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', async(req, res, next) =>{
    try {
        await Tests.destroy({where: {
            id: req.params.id, 
        }})  
        res.status(204).send()
    }
    catch (err) {
        next(err)}
})
module.exports = router;
