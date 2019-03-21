process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let List = require('../models');
let server = require('../server');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

setTimeout(() => {
  // let uri = 'mongodb://paspam:smashingBoxes9@ds117866.mlab.com:17866/sb-todo-app';
  // var options = {
  //   keepAlive: 300000,
  //   connectTimeoutMS: 30000,
  //   useNewUrlParser: true
  // };

  // mongoose.connect(uri, options);
  // var db = mongoose.connection;
  // db.on('error', console.error.bind(console, 'connection error:'));

  describe('Task Routes ', () => {
    beforeEach(done => {
      //Empty the databse before each test
      List.deleteMany({}, err => {
        done();
      });
    });
    describe('GET /tasks/:id', () => {
      it('should return a task object with property title: correct task', done => {
        // tasksController.getTasks();

        const testList = new List({
          title: 'mocha test !!! ',
          completed: { status: 'pending' },
          incomplete_count: { tasks: 0, subTasks: 0 },
          previousState: ''
        });

        testList.tasks = [
          {
            title: 'correct task',
            description: 'test description',
            completed: {
              status: 'pending'
            }
          },
          {
            title: 'wrong task',
            description: 'test description',
            completed: {
              status: 'pending'
            }
          }
        ];

        testList.save().then(list => {
          chai
            .request(server)
            //TODO: use a test schema/collection here
            // I know this ID ahead of time, but ideally I would create a testList schema
            // set the objectID manually, then retreive it
            // this is hacky here; just matching up the first index
            .get('/tasks/' + list.tasks[0].id)
            .query({ listID: list.id })
            .end((err, res) => {
              res.should.have.status(200);
              // console.log(res.body);
              res.body.should.be.a('object');
              res.body.should.have.property('title').eql('correct task');
              done();
            });
        });
      });
    });

    describe('GET /tasks', () => {
      it('should return an array with two task objects', done => {
        const testList = new List({
          title: 'mocha test',
          completed: { status: 'pending' },
          incomplete_count: { tasks: 0, subTasks: 0 },
          previousState: ''
        });

        testList.tasks = [
          {
            title: 'correct task',
            description: 'test description',
            completed: {
              status: 'pending'
            }
          },
          {
            title: 'wrong task',
            description: 'test description',
            completed: {
              status: 'pending'
            }
          }
        ];

        testList.save().then(list => {
          chai
            .request(server)
            //TODO: use a test schema/collection here
            // I know this ID ahead of time, but ideally I would create a testList schema
            // set the objectID manually, then retreive it
            // this is hacky here; just matching up the first index
            .get('/tasks')
            .query({ listID: list.id })
            .end((err, res) => {
              res.should.have.status(200);
              // console.log(res.body);
              res.body.should.be.a('array');
              res.body.length.should.be.eql(2);
              // res.body.should.have.property('title').eql('correct task');
              done();
            });
        });
      });
    });

    describe('POST /tasks', () => {
      it('should add a task to a specific list', done => {
        const testList = new List({
          title: 'mocha test',
          completed: { status: 'pending' },
          incomplete_count: { tasks: 0, subTasks: 0 },
          previousState: ''
        });

        testList.save().then(list => {
          chai
            .request(server)
            .post('/tasks')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
              listID: list.id,
              taskTitle: ' TEST'
            })
            .end((err, res) => {
              if (err) {
                done(error);
              } else {
                res.should.have.status(200);
                console.log(res.body);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(2);
                res.body.should.have.property('title').eql('latest task');
                done();
              }
            });
        });
      });
    });

    describe('PUT /tasks/:id/toggle_completion', () => {
      it('should toggle the compltion tatus of the correct task and its associated tasks', done => {
        const testList = new List({
          title: 'mocha test',
          completed: { status: 'pending' },
          incomplete_count: { tasks: 0, subTasks: 0 },
          previousState: ''
        });

        testList.tasks = [
          {
            title: 'correct task',
            description: 'test description',
            completed: {
              status: 'pending'
            }
          },
          {
            title: 'wrong task',
            description: 'test description',
            completed: {
              status: 'pending'
            }
          }
        ];

        testList.save().then(list => {
          let id = list.tasks[1].id;

          chai
            .request(server)
            .put(`/tasks/${id}/toggle_completion`)
            // .set('content-type', 'application/json')
            .type('form')
            .send({
              listID: list.id
            })
            .end((err, res) => {
              // res.should.have.status(200);
              // let result = JSON.stringify(res.text);
              // console.log(JSON.parse(result));
              console.log(res.body);
              done();
            });
        });
      });
    });
  });
  run();
}, 5000);
