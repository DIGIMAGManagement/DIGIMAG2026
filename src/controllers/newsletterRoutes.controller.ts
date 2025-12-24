import { Request, Response } from "express";
import Newsletter from "../newsletter/newsletterModel";
import Subscriber from "../newsletter/subscriberModel";
import NewsletterEvent from "../models/newsletter_event";
import { newsletterQueue } from "../jobs/queue";

export default class NewsletterRoutesController {
  static async schedule(req: Request, res: Response) {
    const id = Number(req.params.id);
    const when = req.body.when ? new Date(req.body.when) : undefined;
    if (when) {
      await newsletterQueue.add(
        { newsletterId: id },
        { delay: Math.max(0, when.getTime() - Date.now()) }
      );
    } else {
      await newsletterQueue.add({ newsletterId: id });
    }
    return res.json({ ok: true });
  }

  static async trackOpen(req: Request, res: Response) {
    const newsletterId = Number(req.params.newsletterId);
    const subscriberId = Number(req.params.subscriberId);
    await NewsletterEvent.create({ newsletterId, subscriberId, type: "open" });
    // return 1x1 pixel
    res.setHeader("Content-Type", "image/png");
    res.send(Buffer.from("", "base64"));
  }

  static async trackClick(req: Request, res: Response) {
    const newsletterId = Number(req.params.newsletterId);
    const subscriberId = Number(req.params.subscriberId);
    const url = req.query.u as string | undefined;
    await NewsletterEvent.create({
      newsletterId,
      subscriberId,
      type: "click",
      meta: { url },
    });
    if (url) return res.redirect(url);
    return res.status(204).send();
  }
}
