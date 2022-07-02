import "dotenv/config";
import express from "express";
const app = express();
import fetch from "node-fetch";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import rateLimit from "express-rate-limit";
import proxy from "express-http-proxy";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const PORT = 3000;

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, 
  max: 30,
  message: 'Too many requests. ',
  standardHeaders: true, 
  legacyHeaders: false, 
});

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "*.github.com"],
      "connect-src": ["'self'", "*.github.com"],
      "style-src": ["'self'", "'report-sample'"],
      "worker": ["'none'"],
    },
  })
);
app.set("trust proxy", 2);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/src/router", express.static(path.join(__dirname, "src/router")));
app.use("/src/pages", express.static(path.join(__dirname, "src/pages")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE" // what matters here is that OPTIONS is present
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
    "Access-Control-Allow-Origin"
  );
  next();
});
app.use(function(req, res, next) {

  res.setHeader("content-security-policy-report-only", "default-src 'self'; script-src 'report-sample' 'self'; style-src 'report-sample' 'self'; object-src 'none'; base-uri 'self'; connect-src 'self'; font-src 'self'; frame-src 'self'; img-src 'self'; manifest-src 'self'; media-src 'self'; report-uri https://62bff9ff9bc141b6c5371965.endpoint.csper.io/?v=1; worker-src 'none';")
  next();
}
);

  app.post("/api/contact", limiter, async (req, res) => {
    const { name, company, email, message } = req.body;
    const url = "https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send";

    let body = {
      personalizations: [
        {
        to: [],
        subject: "",
      }
    ],
      from: {},
      content: [],
    };
    body.personalizations[0].to.push({ email: "grgsalamanca@gmail.com" });
    body.personalizations[0].subject = `${name} from ${company} has sent you a message through your portfolio.`;
    body.from = { email: email };
    body.content = [{ type: "text/plain", value: message || "no message" }];
    console.log(req.body);
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": process.env.RAPID_API_KEY,
        "X-RapidAPI-Host": "rapidprod-sendgrid-v1.p.rapidapi.com",
      },
      body: JSON.stringify(body),
    };
    try {
      const response = await fetch(url, options);
      console.log(response);
      if (response.status >= 200 && response.status < 400) {
        return res.status(200).json("The message is on its way. Thanks for contacting me");
      }
      res.status(401).json(response.statusText)
    } catch (error) {
      res.status(500).send(error.message);
    }
  })

  app.use("*", proxy(process.env.BASE_URL));

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
