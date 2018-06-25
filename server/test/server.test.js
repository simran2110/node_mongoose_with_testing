const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const{ObjectID} = require('mongodb');

beforeEach((done) => {
  Todo.remove({}).then(() => {
      return Todo.insertMany(todos);
  }).then(() => done()); 
});
const todos = [
   {
       _id : new ObjectID(),
       text : 'First test todo'
   },
   {
       _id : new ObjectID(),
       text : 'Second test todo'
   },
   {
       _id : new ObjectID(),
       text : 'Third test todo'
   }
];

describe('POST/todos',()=>{
// it('should create new todo',(done)=>{
// var text = 'Test todo text';
// request(app)
// .post('/todos')
// .send({text}) // it will convert object to json by itself
// .expect(200)
// .expect((res)=>{
// expect(res.body.text).toBe(text);
// })
// .end((err,res)=>{
// if(err){
// return done(err);
// }
// Todo.find({text}).then((todos)=>{
// expect(todos.length).toBe(1);
// expect(todos[0].text).toBe(text);
// done();
// }).catch((e)=>done(e));
// });
// });
});

describe('GET /todos',() => {
   it('should get all todos',(done) => {
       request(app)
       .get('/todos')
       .expect(200)
       .expect((res) => {
           expect(res.body.todos.length).toBe(3);
       })
       .end(done)
   });
});

describe('GET /todos/:id',() => {
   it('should return todo doc',(done) => {
       request(app)
       .get(`/todos/${todos[0]._id.toHexString()}`)
       .expect(200)
       .expect((res) => {
           console.log("BODYYY");
           console.log(res.body);
           console.log(res.body.todo);
        // expect(res.body.todo.text).toBe(todo[0].text);
       })
       .end(done)
        
   });
});