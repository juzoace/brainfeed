const dataRoutes = (app, fs) => {

    // Data path
    const datapath = "./data/front-end_data.json";

    // Read
    app.get("/data", (req, res) => {
        fs.readFile(datapath, "utf8", (err, data) => {
            if (err) {
                throw err;
                console.log("Nothing");
            }
            res.send(JSON.parse(data));
        });
    });
};

module.exports = dataRoutes;