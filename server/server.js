const express = require("express");
const connection = require("./connect");
const app = express();
const corsOptions = {
    origin: ["https://aquarob.netlify.app"],
    credentials: true,
};
const cors = require("cors");

app.use(cors({credentials: true}));

app.options("*", cors());
//app.use("/", cors());

// id 1 => current day, id 2 => current week, id 3 => current month, id 4 => current year
let sql = "";
app.get("/api/fetchTemp/:id/:deviceID", (req, res) => {
    const {id, deviceID} = req.params;
    switch (id) {
        case "1":
            // get the temp of the current day by interval of 1 hour
            sql = `SELECT device_Id, HOUR (time) as hour, AVG (temperature) as temperature
                   FROM aquaRob2
                   WHERE date = DATE (now()) and device_id = ${deviceID}
                   GROUP BY HOUR (time);`;
            var temperature = new Array(24).fill(0);
            var indice = "hour";
            break;
        case "2":
            // get the avg temp on each day of the current week
            sql = `SELECT device_Id, DAYOFWEEK(date) AS day, AVG(temperature) AS temperature
                   FROM aquaRob2
                   WHERE YEARWEEK(date) = YEARWEEK(NOW()) and device_id = ${deviceID}
                   GROUP BY DAYOFWEEK(date)
                   ORDER BY DAYOFWEEK(date);`;
            var temperature = new Array(7).fill(0);
            var indice = "day";
            break;
        case "3":
            sql = `SELECT device_Id, FLOOR((DAY(date) - 1) / 7) + 1 as week_number, AVG(temperature) as temperature
                   FROM aquaRob2
                   WHERE MONTH (date) = MONTH (CURDATE()) and device_id = ${deviceID}
                   GROUP BY week_number
                   HAVING week_number BETWEEN 1 AND 4`;
            var temperature = new Array(4).fill(0);
            var indice = "week_number";
            break;
        // year case
        case "4":
            sql = `SELECT device_Id, DATE_FORMAT(date, '%m') as month, AVG(temperature) as temperature
                   FROM aquaRob2
                   WHERE YEAR (date) = YEAR (CURDATE()) and device_id = ${deviceID}
                   GROUP BY month`;
            var temperature = new Array(12).fill(0);
            var indice = "month";
            break;
        default:
            break;
    }
    const Data = new Promise((resolve, rejects) => {
        connection.query(sql, (err, result) => {
            if (err) rejects(err);
            else resolve(result);
        });
    });
    const fetch = async () => {
        const data = await Data;
        if (data) {
            data.forEach((obj) => {
                if (obj[indice][0] == "0") {
                    temperature[obj[indice][1]] = obj.temperature; //+ `x${obj.device_Id}`;
                }
                temperature[obj[indice]] = obj.temperature; //+ `x${obj.device_Id}`;
            });
            // filter by divice id
            // const filteredArray = temperature
            //   .filter((item) => {
            //     if (typeof item === "string") {
            //       const parts = item.split("x");
            //       if (parts.length === 2 && parts[1] === deviceID) {
            //         return !isNaN(parts[0]);
            //       } else {
            //         return false;
            //       }
            //     }
            //     return item === 0;
            //   })
            //   .map((item) => {
            //     if (typeof item === "string") {
            //       const number = parseFloat(item.split("x")[0]);
            //       return !isNaN(number) ? number : 0;
            //     } else {
            //       return item;
            //     }
            //   });

            if (id === "2") {
                return res.status(200).json({
                    success: true,
                    data: temperature.slice(1).concat(temperature[0]),
                });
            } else return res.status(200).json({success: true, data: temperature});
        }
    };
    fetch();
});

// Fetch Rssi
app.get("/api/fetchRssi/:id/:deviceID", (req, res) => {
    const {id, deviceID} = req.params;
    switch (id) {
        case "1":
            // get the rssi of the current day by interval of 1 hour
            sql = `SELECT device_id, HOUR (time) as hour, AVG (rssi) as rssi
                   FROM aquaRob2
                   WHERE date = DATE (now()) and device_id = ${deviceID}
                   GROUP BY HOUR (time)`;
            var rssi = new Array(24).fill(0);
            var indice = "hour";
            break;
        case "2":
            // get the avg rssi on each day of the current week
            sql = `SELECT device_id, DAYOFWEEK(date) AS day, AVG(rssi) AS rssi
                   FROM aquaRob2
                   WHERE YEARWEEK(date) = YEARWEEK(NOW()) and device_id = ${deviceID}
                   GROUP BY DAYOFWEEK(date)
                   ORDER BY DAYOFWEEK(date);`;
            var rssi = new Array(7).fill(0);
            var indice = "day";
            break;
        case "3":
            sql = `SELECT device_id, FLOOR((DAY(date) - 1) / 7) + 1 as week_number, AVG(rssi) as rssi
                   FROM aquaRob2
                   WHERE MONTH (date) = MONTH (CURDATE()) and device_id = ${deviceID}
                   GROUP BY week_number
                   HAVING week_number BETWEEN 1 AND 4`;
            var rssi = new Array(4).fill(0);
            var indice = "week_number";
            break;
        // year case
        case "4":
            sql = `SELECT device_id, DATE_FORMAT(date, '%m') as month, AVG(rssi) as rssi
                   FROM aquaRob2
                   WHERE YEAR (date) = YEAR (CURDATE()) and device_id = ${deviceID}
                   GROUP BY month`;
            var rssi = new Array(12).fill(0);
            var indice = "month";
            break;
        default:
            break;
    }
    const Data = new Promise((resolve, rejects) => {
        connection.query(sql, (err, result) => {
            if (err) rejects(err);
            else resolve(result);
        });
    });
    const fetch = async () => {
        const data = await Data;
        if (data) {
            data.forEach((obj) => {
                if (obj[indice][0] == "0") {
                    rssi[obj[indice][1]] = obj.rssi; //+ `x${obj.device_Id}`;
                }
                rssi[obj[indice]] = obj.rssi; //+ `x${obj.device_Id}`;
            });
            // filter by divice id
            // const filteredArray = rssi
            //   .filter((item) => {
            //     if (typeof item === "string") {
            //       const parts = item.split("x");
            //       if (parts.length === 2 && parts[1] === deviceID) {
            //         return !isNaN(parts[0]);
            //       } else {
            //         return false;
            //       }
            //     }
            //     return item === 0;
            //   })
            //   .map((item) => {
            //     if (typeof item === "string") {
            //       const number = parseFloat(item.split("x")[0]);
            //       return !isNaN(number) ? number : 0;
            //     } else {
            //       return item;
            //     }
            //   });
            if (id === "2")
                return res.status(200).json({
                    success: true,
                    data: rssi.slice(1).concat(rssi[0]),
                });
            else return res.status(200).json({success: true, data: rssi});
        } else res.status(404).send("not found");
    };
    fetch();
});
// Fetch Snr
app.get("/api/fetchSnr/:id/:deviceID", (req, res) => {
    let snr;
    let indice;
    const {id, deviceID} = req.params;
    switch (id) {
        case "1":
            // get the snr of the current day by interval of 1 hour
            sql = `SELECT device_id, HOUR (time) as hour, AVG (snr) as snr
                   FROM aquaRob2
                   WHERE date = DATE (now()) and device_id = ${deviceID}
                   GROUP BY HOUR (time)`;
            snr = new Array(24).fill(0);
            indice = "hour";
            break;
        case "2":
            // get the avg snr on each day of the current week
            sql = `SELECT device_id, DAYOFWEEK(date) AS day, AVG(snr) AS snr
                   FROM aquaRob2
                   WHERE YEARWEEK(date) = YEARWEEK(NOW()) and device_id = ${deviceID}
                   GROUP BY DAYOFWEEK(date)
                   ORDER BY DAYOFWEEK(date);`;
            snr = new Array(7).fill(0);
            indice = "day";
            break;
        case "3":
            sql = `SELECT device_id, FLOOR((DAY(date) - 1) / 7) + 1 as week_number, AVG(snr) as snr
                   FROM aquaRob2
                   WHERE MONTH (date) = MONTH (CURDATE()) and device_id = ${deviceID}
                   GROUP BY week_number
                   HAVING week_number BETWEEN 1 AND 4`;
            snr = new Array(4).fill(0);
            indice = "week_number";
            break;
        // year case
        case "4":
            sql = `SELECT device_id, DATE_FORMAT(date, '%m') as month, AVG(snr) as snr
                   FROM aquaRob2
                   WHERE YEAR (date) = YEAR (CURDATE()) and device_id = ${deviceID}
                   GROUP BY month`;
            snr = new Array(12).fill(0);
            indice = "month";
            break;
        default:
            break;
    }
    const Data = new Promise((resolve, rejects) => {
        connection.query(sql, (err, result) => {
            if (err) rejects(err);
            else resolve(result);
        });
    });
    const fetch = async () => {
        const data = await Data;
        if (data) {
            data.forEach((obj) => {
                if (obj[indice][0] == "0") {
                    snr[obj[indice][1]] = obj.snr; //+ `x${obj.device_id}`;
                }
                snr[obj[indice]] = obj.snr; //+ `x${obj.device_id}`;
            });
            // filter by divice id
            // const filteredArray = snr
            //   .filter((item) => {
            //     if (typeof item === "string") {
            //       const parts = item.split("x");
            //       if (parts.length === 2 && parts[1] === deviceID) {
            //         return !isNaN(parts[0]);
            //       } else {
            //         return false;
            //       }
            //     }
            //     return item === 0;
            //   })
            //   .map((item) => {
            //     if (typeof item === "string") {
            //       const number = parseFloat(item.split("x")[0]);
            //       return !isNaN(number) ? number : 0;
            //     } else {
            //       return item;
            //     }
            //   });

            if (id === "2")
                return res.status(200).json({
                    success: true,
                    data: snr.slice(1).concat(snr[0]),
                });
            else return res.status(200).json({success: true, data: snr});
        } else res.status(404).send("not found");
    };
    fetch();
});

app.get("/api/fetchAll", (req, res) => {
    const query = "Select * from aquaRob2";
    const Data = new Promise((resolve, rejects) => {
        connection.query(query, (err, result) => {
            if (err) rejects(err);
            else resolve(result);
        });
    });
    const fetch = async () => {
        const data = await Data;
        if (data) return res.status(200).json({success: true, data: data});
    };
    fetch();
});

// Users
app.get("/api/fetchUsers", (req, res) => {
    const {username, password} = req.query;
    const query =
        "Select * from users where username = '" +
        username +
        "' and password = '" +
        password +
        "';";
    connection.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error");
        } else {
            if (result.length > 0) {
                res.status(200).json({success: true});
            } else {
                res.status(403).json({success: false});
            }
        }
    });
});

app.get("/api/updatePass", (req, res) => {
    const {password, oldpass} = req.query;
    if (password && oldpass) {
        const query =
            "UPDATE users set password='" +
            password +
            "' where username = 'admin' and password = '" +
            oldpass +
            "'";
        connection.query(query, (err, result) => {
            if (err) res.status(500).json({success: false, query: query});
            else res.status(200).json({success: true, query: query});
        });
    } else res.status(403).send("error");
});
// fetch devices
app.get("/api/fetchDevices", (req, res) => {
    const query = "select * from devices";
    const Data = new Promise((resolve, rejects) => {
        connection.query(query, (err, result) => {
            if (err) rejects(err);
            else resolve(result);
        });
    });
    const fetch = async () => {
        const data = await Data;
        if (data) return res.status(200).json({success: true, data: data});
        else return res.status(404).send();
    };
    fetch();
});
// insert device
app.get("/api/addDevice/", (req, res) => {
    const {opt, id, country, state, city} = req.query;
    let query = "";
    if (opt === "0") {
        query = `INSERT INTO devices(country, state, city)
                 VALUES ("${country}", "${state}", "${city}")`;
    } else if (opt === "1") {
        query = `DELETE
                 FROM devices
                 WHERE device_id = ${id};`;
    } else if (opt === "2") {
        query = `DELETE
                 FROM devices; `;
    }
    connection.query(query, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
    const sql =
        "SET @num := 0; UPDATE devices SET device_id = @num := (@num+1); ALTER TABLE devices AUTO_INCREMENT = 1";
    //connection.query(sql, (err, result) => {
    //   if (err) {
    //     console.log(err);
    //   }
    // });
});

app.listen(8000);
