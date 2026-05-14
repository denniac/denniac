import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
  sendEmail: defineAction({
    accept: "json",

    input: z.object({
      name: z.string(),
      email: z.email(),
      message: z.string(),
    }),

    handler: async ({ name, email, message }) => {

      const { error } = await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["danachuryc@gmail.com"],
        subject: `Message from ${name}`,
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>New Contact Message</title>
          </head>
          <body style="margin:0;padding:0;background-color:#10141E;font-family:'Segoe UI',sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#10141E;padding:40px 0;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

                    <!-- Header -->
                    <tr>
                      <td style="padding:0 0 24px 0;">
                        <span style="display:inline-block;background-color:rgba(41,190,67,0.1);border:1px solid rgba(41,190,67,0.3);color:#29BE43;font-size:12px;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;padding:6px 16px;border-radius:999px;">
                          Portfolio Contact
                        </span>
                      </td>
                    </tr>

                    <!-- Card -->
                    <tr>
                      <td style="background-color:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:24px;padding:40px;">

                        <h1 style="margin:0 0 8px 0;font-size:28px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;">
                          New message from ${name}
                        </h1>
                        <p style="margin:0 0 32px 0;font-size:15px;color:#9ca3af;">
                          Someone reached out through your portfolio contact form.
                        </p>

                        <!-- Divider -->
                        <div style="height:1px;background-color:rgba(255,255,255,0.08);margin-bottom:32px;"></div>

                        <!-- Name -->
                        <div style="margin-bottom:20px;">
                          <p style="margin:0 0 4px 0;font-size:11px;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;color:#29BE43;">Name</p>
                          <p style="margin:0;font-size:15px;color:#e5e7eb;">${name}</p>
                        </div>

                        <!-- Email -->
                        <div style="margin-bottom:20px;">
                          <p style="margin:0 0 4px 0;font-size:11px;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;color:#29BE43;">Email</p>
                          <a href="mailto:${email}" style="margin:0;font-size:15px;color:#e5e7eb;text-decoration:none;">${email}</a>
                        </div>

                        <!-- Message -->
                        <div style="margin-bottom:32px;">
                          <p style="margin:0 0 8px 0;font-size:11px;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;color:#29BE43;">Message</p>
                          <div style="background-color:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:16px 20px;">
                            <p style="margin:0;font-size:15px;color:#e5e7eb;line-height:1.6;white-space:pre-wrap;">${message}</p>
                          </div>
                        </div>

                        <!-- CTA -->
                        <a href="mailto:${email}" style="display:inline-block;background-color:#29BE43;color:#000000;font-size:14px;font-weight:600;text-decoration:none;padding:12px 24px;border-radius:12px;">
                          Reply to ${name}
                        </a>

                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="padding:24px 0 0 0;text-align:center;">
                        <p style="margin:0;font-size:12px;color:#4b5563;">
                          Sent from your <span style="color:#29BE43;">denniac.dev</span> portfolio
                        </p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `,
      });

      if (error) {
        throw new Error(error.message);
      }

      return {
        success: true,
      };
    },
  }),
};
