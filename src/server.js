var express = require("express");
var app = express();
var cors = require("cors");

var HTTP_PORT = 8000;

var indexRouter = require("./router.js");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
    cors({
        methods: "*",
        origin: "*",
    })
);

const swaggerUi = require("swagger-ui-express");
swaggerDocument = require("../swagger_output.json");

app.use("/api", indexRouter);

// Root path
app.get("/", (req, res, next) => {
    res.json({ message: "Please use an /api route" });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Start server
app.listen(HTTP_PORT, () => {
    console.log(
        "Server running on port http://localhost:%PORT%/api".replace(
            "%PORT%",
            HTTP_PORT
        )
    );
});
