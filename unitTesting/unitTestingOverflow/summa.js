const Request = require('request');

describe("Server", () => {
    //var server;
    //beforeAll(() => {
    //    server = require("D:\\SE-project\\testing\\unitTesting\\EFD-188\\app");
    //});
    //
    //afterAll(() => {
    //    server.close();
    //});

    describe("POST /login", () => {
        /*
        1 - valid field
        0 - invalid field
        email pswrd rem
        */
        it("0 0 0", () => {
            let data = {};
            let input = {
                "email": "abcxyz@gmail.com",
                "pswrd": "qwe123",
                "rem": "0"
            }
            Request.post("http://localhost:8009/login", {
                form: input
            }, (error, response, body) => {
                data.body = JSON.parse(body);
                expect(data.body.message).toBe("user name and password mismatch");
            });
        });

        it("0 0 1", () => {
            let data = {};
            let input = {
                "email": "abcxyz@gmail.com",
                "pswrd": "qwe123",
                "rem": "1"
            }
            Request.post("http://localhost:8009/login", {
                form: input
            }, (error, response, body) => {
                data.body = JSON.parse(body);
                expect(data.body.message).toBe("user name and password mismatch");
            });
        });

        it("0 1 0", () => {
            let data = {};
            let input = {
                "email": "abcxyz@gmail.com",
                "pswrd": "pass",
                "rem": "0"
            }
            Request.post("http://localhost:8009/login", {
                form: input
            }, (error, response, body) => {
                data.body = JSON.parse(body);
                expect(data.body.message).toBe("user name and password mismatch");
            });

        });

        it("0 1 1", () => {
            let data = {};
            let input = {
                "email": "abcxyz@gmail.com",
                "pswrd": "pass",
                "rem": "1"
            }
            Request.post("http://localhost:8009/login", {
                form: input
            }, (error, response, body) => {
                data.body = JSON.parse(body);
                expect(data.body.message).toBe("user name and password mismatch");
            });

        });

        it("1 0 0", () => {
            let data = {};
            let input = {
                "email": "srishilesh@gmail.com",
                "pswrd": "qwe123",
                "rem": "0"
            }
            Request.post("http://localhost:8009/login", {
                form: input
            }, (error, response, body) => {
                data.body = JSON.parse(body);
                expect(data.body.message).toBe("failure");
            });

        });

        it("1 0 1", () => {
            let data = {};
            let input = {
                "email": "srishilesh@gmail.com",
                "pswrd": "qwe123",
                "rem": "1"
            }
            Request.post("http://localhost:8009/login", {
                form: input
            }, (error, response, body) => {
                data.body = JSON.parse(body);
                expect(data.body.message).toBe("failure");
            });

        });

        it("1 1 0", () => {
            let data = {};
            let input = {
                "email": "srishilesh@gmail.com",
                "pswrd": "pass",
                "rem": "0"
            }
            Request.post("http://localhost:8009/login", {
                form: input
            }, (error, response, body) => {
                data.body = JSON.parse(body);
                expect(data.body.message).toBe("success");
            });

        });

        it("1 1 1", () => {
            let data = {};
            let input = {
                "email": "srishilesh@gmail.com",
                "pswrd": "pass",
                "rem": "1"
            }
            Request.post("http://localhost:8009/login", {
                form: input
            }, (error, response, body) => {
                data.body = JSON.parse(body);
                expect(data.body.message).toBe("success");
            });

        });

        it("empty email", () => {
            let data = {};
            let input = {
                "email": "",
                "pswrd": "pass",
                "rem": "1"
            }
            Request.post("http://localhost:8009/login", {
                form: input
            }, (error, response, body) => {
                data.body = JSON.parse(body);
                expect(data.body.message).toBe("user name and password mismatch");
            });

        });

        it("empty password (password not remembered)", () => {
            let data = {};
            let input = {
                "email": "name@gmail.com",
                "pswrd": "",
                "rem": "0"
            }
            Request.post("http://localhost:8009/login", {
                form: input
            }, (error, response, body) => {
                data.body = JSON.parse(body);
                expect(data.body.message).toBe("failure");
            });

        });

        it("empty password (password remembered)", () => {
            let data = {};
            let input = {
                "email": "egayu3@gmail.com",
                "pswrd": "",
                "rem": "0"
            }
            Request.post("http://localhost:8009/login", {
                form: input
            }, (error, response, body) => {
                data.body = JSON.parse(body);
                expect(data.body.message).toBe("success");
            });

        });
    });
});