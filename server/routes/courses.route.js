const express = require('express'),
    sequelize = require('../db/connect'),
    models = require('../db/models')(sequelize)
config = require('../config'),
    course_helpers = require('../courses-helpers');


module.exports = (function () {
    'use strict';

    let coursesroute = express.Router();

    // Adds course {name, number} to the database
    coursesroute.post('/courses', (req, res) => {

        // Validates input
        course_helpers.validateCourse(req.body.course)
            .then(({errors, isValid}) => {
                if (isValid) {
                    const {name, number} = req.body.course;
                    var username = req.body.user.username;
                    models.User.findOne({ where: { username: username } })
                        .then(user => {
                            // Create course
                            models.Course.create({
                                name: name,
                                number: number,
                            })
                                .then(course => {
                                    //Add the course to the class table
                                    user.addCourses(course);
                                    // Returns course object as json
                                    res.json(course);
                                })
                                .catch(err => res.status(500).json({ error: err }));
                        })
                } else {
                    res.status(400).json(errors);
                }
            })
    })


    coursesroute.get('/courses', (req, res) => {
        var username = req.get('username');
        models.User.findOne({ where: { username: username } })
            .then(user => {
                user.getCourses()
                    .then(courses => {
                        res.json(courses);
                    })
            })
    })

    return coursesroute;

})();
