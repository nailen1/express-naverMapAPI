let express = require("express");
let app = express();
let axios = require("axios");
const { response } = require("express");

let port = process.env.PORT || 80;

app.use(express.static("htmls"));
app.listen(port, function () {
    console.log("server active.")
})

app.get("/pharmacies", (req, res) => {
    let api = async () => {
        let pharmsList = null;
        try {
            pharmsList = await axios.get("http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire", {
                params: {
                    "serviceKey": "Cz0rd49xRteWV5q+ots7NOiHQ01u8v08aYXhrSZJcGVGEDs5Lo+tQXwyMKngjuU7qSlY71ljACrB0DO6AUIYow==",
                    "Q0": req.query.Q0,
                    "Q1": req.query.Q1,
                    "QT": req.query.QT,
                    "QN": req.query.QN,
                    "ORD": req.query.ORD,
                    "pageNo": req.query.pageNo,
                    "numOfRows": req.query.numOfRows,
                }
            });
        }
        catch (e) {
            console.log(e);
        }
        return pharmsList
    }
    api().then((x) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(x.data.response.body.items.item);
    })
})
