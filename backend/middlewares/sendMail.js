import { createTransport } from "nodemailer";

const sendMail = async (email, subject, data) => {
  console.log(process.env.Gmail)
  console.log(process.env.Pass)
  const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: process.env.Gmail,
        pass: process.env.Pass,
      },
    });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .container {
            background-color: lightblue;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        h1 {
            color: white;
            font-weight:bolder;
        }
        p {
            margin-bottom: 20px;
            color: white;
            text-decoration: underline;
            font-style: italic;
        }
        .otp {
            font-size: 36px;
            color: green;
            margin-bottom: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>OTP Verification</h1>
        <p>Hello ${data.name} ,  your OTP for your account verification is below ...</p>
        <p class="otp">${data.otp}</p> 
    </div>
</body>
</html>
`;

  await transport.sendMail({
    from: process.env.Gmail,
    to:email,
    subject,
    html,
  });
};

export default sendMail;