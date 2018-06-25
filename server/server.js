const _ = require('loadash');
const express = require('express');
const bodyParser = require('body-parser');
var app = express();

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
const {ObjectID} = require('mongodb');
app.use(bodyParser.json());

app.get('/todo',(req,res)=>{
    res.status(200).send({text : 'qwerty'});
});
app.post('/todos',(req,res)=> {
    
    var todo = new Todo(
        {
            text : req.body.text
        }
    );
    todo.save().then((docs)=>{
        console.log(docs);
    },(err)=> {
        console.log('Error in insertion');
        res.status(400).send(err);
    });
});
    app.get('/todos',(req,res) => {
        Todo.find().then((todos) => {
            res.send({todos});
        },(e) => {
            res.status(400).send(e);
        });
    });

    app.get('/todos/:id',(req,res) => {
        var id = req.params.id;
        if(!ObjectID.isValid(id)) {
            console.log('id is' + id);
            console.log('Id is Invalid');
            return res.status(404).send();
        }
        console.log('Id is Valid');
        Todo.findById(id).then((todo) => {
            if(todo) {
                console.log("Found document by Id",id);
                console.log(todo);
                res.send(todo); 
            }
            else{
                console.log("no todo found");
                res.status(404).send("No todo found");
                }
           }).catch((e) => {
            res.status(400).send();
        });
    });

    app.patch('/todos/:id',(req,res)=>{
       var id = req.params.id;
       var body = _.pick(req.body, ['text'],['completed']);
       if(!ObjectID.isValid(id)){
           return res.status(400).send();
       } 
       if(_.isBoolean(body.completed) && body.completed){
           body.completedAt = new Date().getTime();
       }
       else{
           body.completed = false;
           body.completedAt = null;
       }
       Todo.findByIdAndUpdate(id, {$set : body}, {new : true}).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
       res.send({todo});        
      
    }).catch((e)=>{
      res.status(404).send("in catch error");  
    });
});
app.listen(3000,()=>{
    console.log('App Listen On Port Number 3000');
})

module.exports = {app};