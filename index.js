const express = require('express');
const app = express();
const main = require('./db')
app.use(express.json());
const courses = require('./courses');

const port = process.env.PORT || 3000;
app.listen(port , ()=> console.log(`Listening on ${port}`));
main();

/*courses = [
    {id:1 , name:'course 1'},
    {id:2 , name:'course 2'},
    {id:3 , name:'course 3'},
    {id:4 , name:'course 4'},
];*/

// Fetch all courses

app.get('/api/courses' , async (req,res)=>{
    let course = await courses.find()
    res.send(course);
});


// Create new courses

app.post('/api/newcourse' , (req,res) =>{
    const newcourse = {
        name: req.body.name
    };
    courses.create(newcourse);
    res.send(newcourse)
});

// Update a course

app.put('/api/update/:id' ,  async (req,res) => {
    const {name} = req.body;
   
    try{
        const newCourse = {};
        {newCourse.name = name};
        let course = await courses.findById(req.params.id);
    if(!course){return res.status(400).send("Not there")}
    course = await courses.findByIdAndUpdate(req.params.id ,{ $set: newCourse }, { new: true });
    res.json({course});
    } catch(error){
        res.status(400).send('Cant');

    }
    
});

//Delete a course

app.delete('/api/delete/:id',  async (req,res) => {
    try{
    let course = await courses.findById(req.params.id);
    if(!course){return res.status(400).send("Not there")}
    course = await courses.findByIdAndDelete(req.params.id);
    res.json({course});
}
catch(error) {
    res.status(500).send('Error');
}
    
});


