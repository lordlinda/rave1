const express = require("express");
const cors = require("cors");
require("dotenv").config();
var bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
//connect to mongodb
const connectDB = require("./db.js");

const app = express();
/**middlewares */
/**cors allows cross site requests */
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
/**parse req.body */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

//For routes
app.use("/users", require("./routes/users.js"));
app.use("/payments", require("./routes/payments.js"));
app.use("/transactions", require("./routes/transactions.js"));
app.use("/plans", require("./routes/plans"));
app.use("/transfers", require("./routes/transfers"));
app.use("/subscriptions", require("./routes/subscriptions"));
//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use("/uploads", express.static("uploads"));
/**serve static files */
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is listening on port ${port}`));
