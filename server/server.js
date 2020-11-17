const express = require("express");
const routes = require("./routes/pets.routes");
const cors = require("cors");
const PORT = 8000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

require("./config/mongoose.config");
routes(app);
app.listen(PORT, () => {
    console.log("Connection to server has been established!");
})