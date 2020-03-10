const Request = require('request');

describe("Server", () => {
    var server;
    beforeAll(() => {
        server = require("E:/Amrita University/Academics/3rd year 2019-20/6th Semester/Software Engineering/Project/unit-test/app");
    });

    afterAll(() => {
        server.close();
    });

    describe("POST /download faculty report", () => {
        it("A 0 0 0", () => {
            let data = {};
            let input = {
                "email":"srishilesh@gmail.com"
            }
            Request.post("http://localhost:8081/download_faculty_report", {
                form: input
            }, (error, response, body) => {
                data.body = JSON.parse(body);
                expect(data.body.message).toBe("success");
            });
        });

        it("A 0 0 1", () => {
            let data = {};
            let input = {
                "email":"egayu3@gmail.com"
            }
            Request.post("http://localhost:8081/download_faculty_report", {
                form: input
            }, (error, response, body) => {
                data.body = JSON.parse(body);
                expect(data.body.message).toBe("success");
            });
        });

        it("A 0 1 0", () => {
            let data = {};
            let input = {
                "email":"hello"
            }
            Request.post("http://localhost:8081/download_faculty_report", {
                form: input
            }, (error, response, body) => {
                data.body = JSON.parse(body);
                expect(data.body.message).toBe("Invalid entry");
            });
        });

        it("A 0 1 1", () => {
            let data = {};
            let input = {
                "email":123
            }
            Request.post("http://localhost:8081/download_faculty_report", {
                form: input
            }, (error, response, body) => {
                data.body = JSON.parse(body);
                expect(data.body.message).toBe("Invalid entry");
            });
        });
        


    });
    describe("POST /download class report", () => {
        it("B 0 0 0", () => {
            let data = {};
            let input = {
                "email":"srishilesh@gmail.com",
                "date":"01/12/2020",
                "ccode":"15cse381",
                "dept":"cse",
                "section":"e",
                "semester":"6",
                "batch":"2017"
            }
            Request.post("http://localhost:8081/download_student_report", {
                form: input
            }, (error, response, body) => {
                data.body = JSON.parse(body);
                expect(data.body.message).toBe("success");
            });
        });

        it("B 0 0 1", () => {
            let data = {};
            let input = {
                "email":"sanjay311999@gmail.com",
                "date":"12/29/2019",
                "ccode":"15cse312",
                "dept":"cse",
                "section":"e",
                "semester":"6",
                "batch":"2017"
            }
            Request.post("http://localhost:8081/download_student_report", {
                form: input
            }, (error, response, body) => {
                data.body = JSON.parse(body);
                expect(data.body.message).toBe("success");
            });
        });

        it("B 0 1 0", () => {
            let data = {};
            let input = {
                "email":"hello",
                "date":"01/07/2020",
                "ccode":"15cse311",
                "dept":"cse",
                "section":"e",
                "semester":"6",
                "batch":"2017"
            }
            Request.post("http://localhost:8081/download_student_report", {
                form: input
            }, (error, response, body) => {
                data.body = JSON.parse(body);
                expect(data.body.message).toBe("Invalid entry");
            });
        });

        it("B 0 1 1", () => {
            let data = {};
            let input = {
                "email":"saibalsu@gmail.com",
                "date":"01/10/2020",
                "ccode":"15cse313",
                "dept":"ece",
                "section":"e",
                "semester":"6",
                "batch":"2017"
            }
            Request.post("http://localhost:8081/download_student_report", {
                form: input
            }, (error, response, body) => {
                data.body = JSON.parse(body);
                expect(data.body.message).toBe("success");
            });
        });


    });
});