const app = require('../server'),
    chai = require('chai'), chaiHttp = require('chai-http'),
    expect = chai.expect //to solve error when using done(): “ReferenceError: expect is not defined”
    ;
chai.use(chaiHttp);
//chai.use(chaiSubset);
describe('Testing Faculty Backend Website', function () {
    after(() => {});
    var url = 'http://localhost:3000';
    var requester = chai.request.agent(url);//to keep the same session; without requester agent the get or post will act as opening a new window
    
    //When done is passed in, Mocha will wait until the call to done(), or until the timeout expires. done also accepts an error parameter when signaling completion.
    it('should read the todolist.txt file successfully', function (done) { // <= Pass in done callback
        requester
            .get('/')
            .end(function (err, res) {
                const item='Go shopping';
                expect(res).to.have.status(200);
                expect(res.text).to.contain(item);
                console.log(res.body);
                done(); // <= Call done to signal callback end
            });
    });
    const todo = {data:'Post a blog at '+new Date()};
    it('should add a new todo item to the todo list successfully', function (done) { // <= Pass in done callback
        requester
            .post('/')
            .send(todo)
            .then(function (res) {
                console.log('then post');
                expect(res).to.have.status(201);
                done();
            });
    });

    it('correct marks', function(done) {
        var input = {
            'P1': 45,
            'P2': 23
        }
        requester
            .post('/update_marks')
            .send(input)
            .then(function(res) {
                console.log('then post my 1');
                expect(res.body.message).to.equal('success');
                done();
            })
    })
    it('incorrect marks', function(done) {
        var input = {
            'P1': -45,
            'P2': 23
        }
        requester
            .post('/update_marks')
            .send(input)
            .then(function(res) {
                console.log('then post my 2');
                expect(res.body.message).to.equal('Invalid marks');
                done();
            })
    })
    
    it('username pass mismatch', function(done) {
        var input = {
            'email': 'abcxyz@gmail.com',
            'pswrd': 'qwe123',
            'rem': '0'
        }
        requester
            .post('/login')
            .send(input)
            .then(function(res) {
                console.log('then post my 3');
                expect(res.body.message).to.equal('user name and password mismatch');
                done();
            })
    });
    it('username pass failure', function(done) {
        var input = {
            'email': 'srishilesh@gmail.com',
            'pswrd': 'qwe123',
            'rem': '0'
        }
        requester
            .post('/login')
            .send(input)
            .then(function(res) {
                console.log('then post my 4');
                expect(res.body.message).to.equal('failure');
                done();
            })
    });
    it('username pass mismatch', function(done) {
        var input = {
            'email': 'srishilesh@gmail.com',
            'pswrd': 'pass',
            'rem': '0'
        }
        requester
            .post('/login')
            .send(input)
            .then(function(res) {
                console.log('then post my 5');
                expect(res.body.message).to.equal('success');
                done();
            })
    });
    it("download faculty report - success", () => {
        var input = {
            "email":"srishilesh@gmail.com"
        }
        requester
            .post('/download_faculty_report')
            .send(input)
            .then(function(res) {
                console.log('then post my 6');
                expect(res.body.message).to.equal('success');
                done();
            })
    });
    it("download faculty report - invalid", () => {
        var input = {
            "email":"srishilesh@gmail.com"
        }
        requester
            .post('/download_faculty_report')
            .send(input)
            .then(function(res) {
                console.log('then post my 7');
                expect(res.body.message).to.equal('Invalid entry');
                done();
            })
    });
    it("download class report - success", () => {
        var input = {
            "email":"srishilesh@gmail.com",
            "date":"01/12/2020",
            "ccode":"15cse381",
            "dept":"cse",
            "section":"e",
            "semester":"6",
            "batch":"2017"
        }
        requester
            .post('/download_student_report')
            .send(input)
            .then(function(res) {
                console.log('then post my 7');
                expect(res.body.message).to.equal('success');
                done();
            })
    });

    it("download class report - invalid", () => {
        var input = {
            "email":"hello",
            "date":"01/07/2020",
            "ccode":"15cse311",
            "dept":"cse",
            "section":"e",
            "semester":"6",
            "batch":"2017"
        }
        requester
            .post('/download_student_report')
            .send(input)
            .then(function(res) {
                console.log('then post my 8');
                expect(res.body.message).to.equal('Invalid entry');
                done();
            })
    });

    it("generate FA report - success", () => {
        var input = {
            'email': 'srrishilesh@gmail.com', //faculty email id
            'ccode': '15cse381',
            'dept': 'cse',
            'section': 'e',
            'semester': '6',
            'batch': '2017',
        }
        requester
            .post('/generate_fa_list')
            .send(input)
            .then(function(res) {
                console.log('then post my 9');
                expect(res.body.message).to.equal('FA report generated');
                done();
            })
    });

    
    
});