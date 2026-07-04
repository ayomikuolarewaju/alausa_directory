import { NextRequest, NextResponse } from "next/server";
import * as nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email to you (the admin)
    await transporter.sendMail({
      from: `"Lagos Directory" <${process.env.GMAIL_USER}>`,
      to: "alausadirectory@gmail.com",
      replyTo: email,
      subject: `[Lagos Directory] ${subject || "New Contact Message"} — from ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; border: 2px solid #0D0D0D; border-radius: 12px; overflow: hidden;">
          <div style="background: #1A3A8F; padding: 24px 32px;">
            <h2 style="color: #F5C518; margin: 0; font-size: 20px;">New Contact Form Submission</h2>
            <p style="color: #fff; margin: 4px 0 0; font-size: 13px;">Lagos State Government Directory</p>
          </div>
          <div style="padding: 32px; background: #fff;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #555; width: 100px;">Name</td>
                <td style="padding: 8px 0; color: #0D0D0D;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #555;">Email</td>
                <td style="padding: 8px 0; color: #0D0D0D;"><a href="mailto:${email}" style="color: #1A3A8F;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #555;">Subject</td>
                <td style="padding: 8px 0; color: #0D0D0D;">${subject || "—"}</td>
              </tr>
            </table>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-weight: 600; color: #555; font-size: 14px; margin: 0 0 8px;">Message</p>
            <p style="color: #0D0D0D; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
          </div>
          <div style="background: #F5C518; padding: 12px 32px; font-size: 12px; color: #0D0D0D;">
            Sent via Lagos State Government Directory Contact Form
          </div>
        </div>
      `,
    });

    // Auto-reply to the sender
    await transporter.sendMail({
      from: `"Lagos State Directory" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "We received your message — Lagos State Directory",
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; border: 2px solid #0D0D0D; border-radius: 12px; overflow: hidden;">
          <div style="background: #1A3A8F; padding: 24px 32px;">
            <h2 style="color: #F5C518; margin: 0; font-size: 20px;">Thank you, ${name}!</h2>
            <p style="color: #fff; margin: 4px 0 0; font-size: 13px;">Lagos State Government Directory</p>
          </div>
          <div style="padding: 32px; background: #fff;">
            <p style="font-size: 14px; color: #0D0D0D; line-height: 1.7;">
              We have received your message and will get back to you as soon as possible.
            </p>
            <div style="background: #FAFAF5; border: 1px solid #eee; border-radius: 8px; padding: 16px; margin: 20px 0; font-size: 13px; color: #555;">
              <strong>Your message:</strong><br /><br />
              <span style="white-space: pre-wrap;">${message}</span>
            </div>
            <p style="font-size: 13px; color: #888;">
              If you did not send this message, please ignore this email.
            </p>
          </div>
          <div style="background: #F5C518; padding: 12px 32px; font-size: 12px; color: #0D0D0D;">
            Lagos State Government Directory &mdash; Official Information Portal
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Mail error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
