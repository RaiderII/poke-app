import nodemailer from 'nodemailer';

const sendEmail = async (options: Record<'email' | 'subject' | 'message', string>) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ramiroherrera.utn@gmail.com',
      pass: '37243400',
    },
  });

  await transporter.sendMail({
    from: '"Ramiro" <ramiroherrera@example.com>', // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.message, // plain text body
  });
};

export default sendEmail;
