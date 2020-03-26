// Stock Market Portfolio App by Nitish Parihar
const express = require('express');
const exphbs  = require('express-handlebars');
const app = express();
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

// use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));

// API KEY pk_00f375e7147b4b56aa436baac030725f
// Create call_api function
function call_api(finishedAPI, ticker) {
request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_00f375e7147b4b56aa436baac030725f', {json: true}, (err, res, body) => {
  if (err) {return console.log(err);}
  if (res.statusCode === 200){
  	  //console.log(body);
  	  finishedAPI(body);
  	};
  });
};





// Set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Set Handlebars Index GET Route
app.get('/', function (req, res) {
	call_api(function(doneAPI) {
            res.render('home', {
    	    stock: doneAPI
        });
    }, "fb");
});

// Set Handlebars Index POST Route
app.post('/', function (req, res) {
	call_api(function(doneAPI) {
		   //posted_stuff = req.body.stock_ticker;
            res.render('home', {
    	    stock: doneAPI,
        });
    }, req.body.stock_ticker);
});

// Create about page route
app.get('/about.html', function (req, res) {
    res.render('about');
});



// Set static folder
app.use(express.static(path.join(__dirname, 'public')));



app.listen(PORT, () => console.log('Server is Listening on port' + PORT));


//This is a comment