const { Resend } = require("resend");
const instanceResend = new Resend('re_YHiycZfK_GQyeq6hPiMzPyKiPB821mUcS');

async function sendEmail (to, subject,text)  {
  try {
    const data = await instanceResend.emails.send({
      from:'Acme <onboarding@resend.dev>',
      to: to,
      subject: subject,
      text: text,
      headers: {
        "X-Entity-Ref-ID": process.env.KEY_RESEND,
      },
      tags: [
        {
          name: "category",
          value: "reset_password",
        },
      ],
    });
    console.log("Email data: ", data);
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};


module.exports = {
  sendEmail
};