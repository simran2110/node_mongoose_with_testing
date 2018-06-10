var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
  console.log("post todos");
  console.log(req.body.text);
  console.log(req.body);
  var todo = new Todo({
    text : req.body.text
  });
  
  todo.save().then((doc)=>{
    res.send(doc);
  },(err)=>{
    res.status(400).send(err);
  });
});

app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
    res.send({todos})
  },(e)=>{
    res.status(400).send(e);
  })
});

app.get('/todos/:id',(req,res)=>{
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    console.log("id is", id);
    console.log('invalid id');
    return res.status(404).send('Invalid Id');
  }
  Todo.findById(id).then((todos)=>{
    if(todos){
      console.log("Found document by Id",id);
      console.log(todos);
      res.send(todos);
    }
    else{
      console.log("no todo found");
      res.status(404).send("No todo found");
    }
  }).catch((e)=>{
    res.status(404).send("Error in finding todo");
  });
});

app.listen(3000,()=>{
  console.log("started on port 3000");
})

module.exports = {app};

//save new something


// var newTodo = new Todo({
//   text: 'Save me',
//   completed: false,
//   completedAt: 123,
// })

// newTodo.save().then((doc)=>{
//   console.log("Saved Todo" , doc);
// },(e)=>{
//   console.log("error");
// });


// var newUser = new User({
//   Email : ' simran@gmail.com '
// });

// newUser.save().then((doc)=>{
//   console.log("user document created",doc);

// },(err)=>{
//   console.log("error",err);
// })