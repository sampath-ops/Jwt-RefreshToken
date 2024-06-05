// UNCAUGHT_EXCEPTION
process.on('unhandledException', (err) => {
    console.log('uncaughtException! Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

// START SERVER
const app = require('./app');
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});

// UNHANDLED_REJECTION
process.on('unhandledRejection', (err) => {
    server.close(() => {
      process.exit(1);
    });
});