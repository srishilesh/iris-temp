const Request = require('request');

describe("Server", () => {
    var server;
    beforeAll(() => {
        server = require("D:\\SE-project\\testing\\unitTesting\\EFD-233\\app");
    });

    afterAll(() => {
        server.close();
    });

    describe("POST /check student marks", () => {
        it("0 0 0", () => {
            let data = {};
            let input = {
                "P1": -34,
                "P2": -34,
            }
            Request.post("http://localhost:8081/update_marks", {
                form: input
            }, (error, response, body) => {
                data.body = JSON.parse(body);
                expect(data.body.message).toBe("Invalid marks");
            });
        });

        it("0 0 1", () => {
            let data = {};
            let input = {
                "P1": -34,
                "P2": 0,
            }
            Request.post("http://localhost:8081/update_marks", {
                form: input
            }, (error, response, body) => {
                data.body = JSON.parse(body);
                expect(data.body.message).toBe("Invalid marks");
            });
        });

        it("0 1 0", () => {
            let data = {};
            let input = {
                "P1": -34,
                "P2": 45,
            }
            Request.post("http://localhost:8081/update_marks", {
                form: input
            }, (error, response, body) => {
                data.body = JSON.parse(body);
                expect(data.body.message).toBe("Invalid marks");
            });
        });

        it("0 1 1", () => {
            let data = {};
            let input = {
                "P1": -34,
                "P2": 56,
            }
            Request.post("http://localhost:8081/update_marks", {
                form: input
            }, (error, response, body) => {
                data.body = JSON.parse(body);
                expect(data.body.message).toBe("Invalid marks");
            });
        });

        it("1 0 0", () => {
            let data = {};
            let input = {
                "P1": 0,
                "P2": -344,
            }
            Request.post("http://localhost:8081/update_marks", {
                form: input
            }, (error, response, body) => {
                data.body = JSON.parse(body);
                expect(data.body.message).toBe("Invalid marks");
            });
        });

        it("1 0 1", () => {
            let data = {};
            let input = {
                "P1": 0,
                "P2": 0,
            }
            Request.post("http://localhost:8081/update_marks", {
                form: input
            }, (error, response, body) => {
                data.body = JSON.parse(body);
                expect(data.body.message).toBe("success");
            });
        });

        it("1 1 0", () => {
            let data = {};
            let input = {
                "P1": 0,
                "P2": 44,
            }
            Request.post("http://localhost:8081/update_marks", {
                form: input
            }, (error, response, body) => {
                data.body = JSON.parse(body);
                expect(data.body.message).toBe("success");
            });
        });

        it("1 1 1", () => {
            let data = {};
            let input = {
                "P1": 0,
                "P2": 344,
            }
            Request.post("http://localhost:8081/update_marks", {
                form: input
            }, (error, response, body) => {
                data.body = JSON.parse(body);
                expect(data.body.message).toBe("Invalid marks");
            });
        });

        it("1 2 3", () => {
            let data = {};
            let input = {
                "P1": 10,
                "P2": -344,
            }
            Request.post("http://localhost:8081/update_marks", {
                form: input
            }, (error, response, body) => {
                data.body = JSON.parse(body);
                expect(data.body.message).toBe("Invalid marks");
            });
        });

        it("1 3 2", () => {
            let data = {};
            let input = {
                "P1": 10,
                "P2": 0,
            }
            Request.post("http://localhost:8081/update_marks", {
                form: input
            }, (error, response, body) => {
                data.body = JSON.parse(body);
                expect(data.body.message).toBe("success");
            });
        });

        it("2 3 1", () => {
            let data = {};
            let input = {
                "P1": 10,
                "P2": 4,
            }
            Request.post("http://localhost:8081/update_marks", {
                form: input
            }, (error, response, body) => {
                data.body = JSON.parse(body);
                expect(data.body.message).toBe("success");
            });
        });

        it("2 1 3", () => {
            let data = {};
            let input = {
                "P1": 10,
                "P2": 64,
            }
            Request.post("http://localhost:8081/update_marks", {
                form: input
            }, (error, response, body) => {
                data.body = JSON.parse(body);
                expect(data.body.message).toBe("Invalid marks");
            });
        });

        it("3 1 2", () => {
            let data = {};
            let input = {
                "P1": 110,
                "P2": -64,
            }
            Request.post("http://localhost:8081/update_marks", {
                form: input
            }, (error, response, body) => {
                data.body = JSON.parse(body);
                expect(data.body.message).toBe("Invalid marks");
            });
        });
        
        it("3 2 1", () => {
            let data = {};
            let input = {
                "P1": 110,
                "P2": 0,
            }
            Request.post("http://localhost:8081/update_marks", {
                form: input
            }, (error, response, body) => {
                data.body = JSON.parse(body);
                expect(data.body.message).toBe("Invalid marks");
            });
        });
        it("4 5 6", () => {
            let data = {};
            let input = {
                "P1": 110,
                "P2": 34,
            }
            Request.post("http://localhost:8081/update_marks", {
                form: input
            }, (error, response, body) => {
                data.body = JSON.parse(body);
                expect(data.body.message).toBe("Invalid marks");
            });
        });
        it("4 6 5", () => {
            let data = {};
            let input = {
                "P1": 110,
                "P2": 120,
            }
            Request.post("http://localhost:8081/update_marks", {
                form: input
            }, (error, response, body) => {
                data.body = JSON.parse(body);
                expect(data.body.message).toBe("Invalid marks");
            });
        });
    });
});