const express = require("express");
const request =require("request");
var convert = require('xml-js');

const app = express();

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("/search/item", (req, res) => {
  const param = req.query.q;
  if (!param) {
    res.json({
      error: "Missing required parameter `q`"
    });
    return;
  }

    string = 'https://suggestqueries.google.com/complete/search?output=toolbar&hl=en&q=' + param;
    request.get(string, function(error, response, body){

      var result_string = convert.xml2json(body, {compact: false, spaces: 4});


      var result_arr =[]
  
      let result_obj = JSON.parse(result_string)

    if(result_obj.elements[0].elements !=undefined){
       result_obj.elements[0].elements.forEach(function (value, i) {

             result_arr.push(value.elements[0].attributes);
    }); 
  }
     return  res.json(result_arr);
    });
    

});


app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
