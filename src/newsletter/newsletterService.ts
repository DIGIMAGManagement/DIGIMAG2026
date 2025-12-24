import Newsletter from "./newsletterModel";
import Subscriber from "./subscriberModel";
import { newsletterQueue } from "../jobs/queue";

export default class NewsletterService {
  static async create(payload: any) {
    return Newsletter.create(payload);
  }

  static async scheduleSend(newsletterId: number, when?: Date) {
    if (when) {
      await newsletterQueue.add(
        { newsletterId },
        { delay: Math.max(0, when.getTime() - Date.now()) }
      );
    } else {
      await newsletterQueue.add({ newsletterId });
    }
  }

  static async subscribe(email: string, name?: string) {
    return Subscriber.upsert({ email, name, subscribed: true });
  }

  static async unsubscribe(email: string) {
    return Subscriber.update({ subscribed: false }, { where: { email } });
  }
}

export async function createNewsletter(data: any) {
  return Newsletter.create(data);
}

export async function getNewsletters() {
  return Newsletter.findAll();
}

export async function scheduleNewsletter(id: number, scheduledAt: Date) {
  const newsletter = await Newsletter.findByPk(id);
  if (!newsletter) throw new Error("Newsletter not found");
  newsletter.scheduledAt = scheduledAt;
  newsletter.status = "scheduled";
  await newsletter.save();
  return newsletter;
}
