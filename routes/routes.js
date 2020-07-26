const dataRoutes = require("./data")

const appRouter = (app, fs) => {


    app.get("/", (req, res) => {
        res.send("Welcome to the development api-server");
    });

    // run our user route module hereto complete the wire up
    dataRoutes(app, fs);
};

module.exports = appRouter;