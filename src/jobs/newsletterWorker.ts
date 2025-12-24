import nodemailer from "nodemailer";
import Newsletter from "../newsletter/newsletterModel";
import Subscriber from "../newsletter/subscriberModel";
import NewsletterEvent from "../models/newsletter_event";
import { newsletterQueue } from "./queue";
import logger from "../config/logger";

const SMTP_HOST = process.env.SMTP_HOST || "localhost";
const SMTP_PORT = Number(process.env.SMTP_PORT) || 1025;
const SMTP_USER = process.env.SMTP_USER || undefined;
const SMTP_PASS = process.env.SMTP_PASS || undefined;
const BASE_URL = process.env.BASE_URL || "http://localhost:4000";

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,
  auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
});

newsletterQueue.process(async (job) => {
  const { newsletterId } = job.data as { newsletterId: number };
  const nl = await Newsletter.findByPk(newsletterId);
  if (!nl) {
    logger.error({ newsletterId }, "Newsletter not found for sending");
    return;
  }

  const subs = await Subscriber.findAll({ where: { subscribed: true } });

  for (const s of subs) {
    try {
      const openUrl = `${BASE_URL}/api/v1/newsletters/track/open/${nl.id}/${s.id}`;
      const clickRedirect = `${BASE_URL}/api/v1/newsletters/track/click/${nl.id}/${s.id}`; // expects ?u=...

      const html = `
        <div>${nl.content}</div>
        <img src="${openUrl}" alt="" style="width:1px;height:1px;" />
        <p><a href="${clickRedirect}?u=${encodeURIComponent(
        BASE_URL
      )}">Read on site</a></p>
      `;

      await transporter.sendMail({
        from: process.env.FROM_EMAIL || "no-reply@example.com",
        to: s.email,
        subject: nl.title,
        html,
      });

      await NewsletterEvent.create({
        newsletterId: nl.id,
        subscriberId: s.id,
        type: "open",
        meta: { note: "sent" },
      });
    } catch (err) {
      logger.error(
        { err, subscriber: s.email },
        "Failed to send newsletter to subscriber"
      );
    }
  }

  nl.status = "sent" as any;
  await nl.save();
  logger.info({ newsletterId }, "Newsletter send job completed");
});

export default newsletterQueue;
