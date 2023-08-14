const app = require("../server");

let server;

// Global before hook: Set up resources
before((done) => {
  server = app.listen(0, () => {
    console.log("Global setup: Server started");
    done();
  });
});

// Global after hook: Tear down resources
after((done) => {
  server.close(() => {
    console.log("Global teardown: Server closed");
    process.kill(process.pid, "SIGTERM");
    done();
  });
});
