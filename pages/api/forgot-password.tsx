import db from '../../lib/db';
import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import sendEmail from '../../lib/email';

export default async function forgotPassword(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = (await db.query('SELECT * FROM users WHERE email = $1', [req.body.email])).rows[0];
    console.log('forgot password user', user);

    if (!user) {
      console.log('user not found');
      throw { message: '⚠ Invalid email' };
    }

    const resetToken = crypto.randomBytes(32).toString('hex');

    const hash = crypto.createHash('sha256').update(resetToken).digest('hex');

    console.log('forgot password', hash);

    const expiresIn = Date.now() + 10 * 60 * 1000;

    console.log('expires in', expiresIn);

    await db.query(
      'UPDATE users SET password_reset_token = $1, password_reset_expires = $2 WHERE email = $3',
      [hash, expiresIn, user.email]
    );

    const resetURL = `https://localhost:3000/reset-password?token=${hash}`;

    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    });

    console.log('mail sent');

    res.status(200).json({ message: 'Recovery link sent to your email' });
  } catch (userErr) {
    res.status(401).json(userErr);
  }
}
