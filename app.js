//Adding variables to require the necessary dependencies
const path = require('path');
const express = require('express');
const {
    projects
} = require('./data.json');
const app = express();

//Setting up view engine for Pug
app.set('view engine', 'pug');

// adding use method to app so we can use the public folder
app.use('/static', express.static('public'));

//This is the main route
app.get('/', (req, res) => {
    res.render('index', {
        projects
    });
});
// Route to the about page
app.get('/about', (req, res) => {
    res.render('about');
});
// Route to the project id
app.get('/project/:id', (req, res) => {
    let project = projects.find(function (project){
        return project.id == req.params.id
    }) 
    if (project) {
        res.render('project', {id:req.params.id, project})
    } else {
        const err = new Error();
        err.status = 404;
        err.message =  'This project does not exist!';
        throw err;
    }
});

// 404 Error Handler  
//this is handling if the url does not exist
app.use((req,res, next)=>{
    const err = new Error();
    err.status = 404;
    err.message = 'OHH NOO! URL entered seems to incorrect! Check URL path!!';
    console.log(err.message);
    next(err);
});

// Global Error Handler
//send the error.status that was thrown
app.use((err,req,res,next)=>{
    err.status = err.status||500;
    err.message = err.message|| "The server is giving an error ";
    res.status(err.status);
    res.send(`Error Code: ${err.status}: ${err.message}`);
    console.log(err)
});


//Starting Server
app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});