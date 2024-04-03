import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';
import type { SendMailOptions } from 'nodemailer';
import { createTransport } from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

const Oauth2Client = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.GOOGLE_OAUTH2_REDIRECT_URI,
});

Oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_GMAIL_API_REFRESH_TOKEN,
});

export async function POST(req:NextRequest,res:NextResponse){
    try{
        const accessToken = await Oauth2Client.getAccessToken();
        const {email} = await req.json()
        const transporter = createTransport({
            service: 'gmail',
            auth: {
              type: 'OAuth2',
              user: 'brainloxeducation@gmail.com',
              clientId: process.env.GOOGLE_CLIENT_ID,
              clientSecret: process.env.GOOGLE_CLIENT_SECRET,
              refreshToken: process.env.GOOGLE_GMAIL_API_REFRESH_TOKEN,
              accessToken,
            },
            tls: {
              rejectUnauthorized: true,
            },
          } as SMTPTransport.Options);
          const mailOptions1: SendMailOptions = {
            from: {
              name: 'Debales Charity Page',
              address: 'brainloxeducation@gmail.com',
            },
            to: 'tilak@debales.ai',
            subject: 'Debales Charity Page Demo Request',
            html: `<h3>A new User has Request for Demo of Debales Charity Page</h3><ol><li>Email: ${email} </li></ol>`,
          };
          
          const mailOptions2: SendMailOptions = {
            from: {
              name: 'Debales Charity Page',
              address: 'brainloxeducation@gmail.com',
            },
            to: 'aryan.pillai@debales.ai',
            subject: 'Debales Charity Page Demo Request',
            html: `<h3>A new User has Request for Demo of Debales Charity Page</h3><ol><li>Email: ${email} </li></ol>`,
          };
    
          transporter.sendMail(mailOptions1, (error:any, d:any) => {
            if (error) {
              return NextResponse.json({
                status: false,
                message: 'Email cannot be sent',
                error,
                status_code:401
              });
            }
          });
          console.log("Email send to Tilak Sir")
          transporter.sendMail(mailOptions2, (error:any, d:any) => {
            if (error) {
              return NextResponse.json({
                status: false,
                message: 'Email cannot be sent',
                error,
                status_code:401
              });
            }
          });
          console.log("Email send to Aryan Sir")
          return NextResponse.json({
            status: true,
            message: 'Email sent',
            status_code:200
          });
    }catch(err){
        return NextResponse.json({message:"Error occured",status:false})
    }
}