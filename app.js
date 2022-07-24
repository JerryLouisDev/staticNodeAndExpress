//Adding variables to require the necessary dependencies
const path = require('path');
const express = require('express');
const { projects } = require('./data.json');
const app = express();

//Setting up view engine for Pug
app.set('view engine', 'pug');

// adding use method to app so we can use the public folder
app.use('/static', express.static('public'));

//This is the main route
app.get('/', (req, res) => {
    res.render('index', {projects});
});
// Route for about page
app.get('/about', (req, res) => {
    res.render('about');
});
// Route for project id
app.get('/project/:id', (req, res, next) => {
    const id = req.params.id;
    const project = projects[id];
    
    if (project) {
        res.locals.data = projects;
        return res.render('project', {project});
    }  else {
        const err = new Error();
        err.status = 404;
        err.message = "Sorry the page is not found"
        res.render('page-not-found');
        next(err);
    }
    });

//Errors section
    app.use((req, res) => {
        const err = new Error();
        err.status = 404;
        err.message = "Sorry the page is not found";
        res.status(404);
        res.render('page-not-found', {err});
    });

    //handles condition for 404 and 500 errors
    app.use((err, req, res, next) => {
      
        if (err.status === 404) {
            err.message = "Sorry the page is not found";
            res.status(404);
            res.render('page-not-found', {err});
        } 
       
        else {
            err.message = "Error with Server";
            res.status(err.status || 500);
            res.render('error', {err});
            }
        });
       

//Starting server
app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});