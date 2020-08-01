const dataRoutes = (app, fs) => {

    // Data path
    const datapath = "./data/front-end_data.json";

    // Read
    app.get("/data", (req, res) => {
        fs.readFile(datapath, "utf8", (err, data) => {
            if (err) {
                // throw err;
                res.status(401).json({ success: false, msg: `Couldn't fetch data` });
                
                throw err;
            }
            const datafield = JSON.parse(data);
            console.log('connected to backend')
            console.log()
            //  console.group(datafield);
            //  console.log(res.json({ success: true, datafield}))
            // res.json({ success: true, datafield});
            return res.json({success: true, datafield});
            //  { success: true, datafield};
            
            
        });
    });
};

module.exports = dataRoutes;