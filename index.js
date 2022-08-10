require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = process.env.PORT;
const router = require('./routes/routes');


// BODY PARSER
app.use(bodyParser.json());
//  PARSE APPLICATION/X-WWW-FORM
app.use(bodyParser.urlencoded({ extended: true }));


// ROUTES
// app.use("/",controllers);
// app.use("/",database);


app.use("/", router);




app.listen(port,()  => {console.log(`Server is running on port: ${port}!`);})
    


