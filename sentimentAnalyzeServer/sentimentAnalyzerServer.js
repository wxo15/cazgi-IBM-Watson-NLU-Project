const express = require('express');
const app = new express();
const dotenv = require('dotenv');
dotenv.config();


function getNLUInstance(){
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1");
    const { IamAuthenticator } = require("ibm-watson/auth");

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: "2020-08-01",
        authenticator: new IamAuthenticator({
          apikey: api_key,
        }),
        serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;
}


app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/", (req, res) => {
    res.render("index.html");
    console.log(api_key);
    console.log(api_url);
});

app.get("/url/emotion", (req, res) => {
    getNLUInstance()
      .analyze({
        features: {
          emotion: {
            document: true,
          },
        },
        url: req.query.url,
        language: "en"
      })
      .then((analysisResults) => {
        res.send(analysisResults);
      })
      .catch((err) => {
        console.log("error:", err);
      });
  });
  
  app.get("/url/sentiment", (req, res) => {
    getNLUInstance()
      .analyze({
        features: {
          sentiment: {
            document: true,
          },
        },
        url: req.query.url,
        language: "en"
      })
      .then((analysisResults) => {
        res.send(analysisResults);
      })
      .catch((err) => {
        console.log("error:", err);
      });
  });
  
  app.get("/text/emotion", (req, res) => {
    //console.log(req.query);
    getNLUInstance()
      .analyze({
        features: {
          emotion: {
            document: true,
          },
        },
        text: req.query.text,
        language: "en"
      })
      .then((analysisResults) => {
        res.send(analysisResults);
      })
      .catch((err) => {
        console.log("error:", err);
      });
  });
  
  app.get("/text/sentiment", (req, res) => {
    getNLUInstance()
      .analyze({
        features: {
          sentiment: {
            document: true,
          },
        },
        text: req.query.text,
        language: "en"
      })
      .then((analysisResults) => {
        console.log("Here");
        //console.log(analysisResults.result.sentiment.document.label);
        res.send(analysisResults.result.sentiment.document.label);
      })
      .catch((err) => {
        console.log("error:", err);
      });
  });

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

