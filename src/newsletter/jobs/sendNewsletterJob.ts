import Newsletter from "../newsletterModel";

export async function sendNewsletterJob(newsletterId: number) {
  const newsletter = await Newsletter.findByPk(newsletterId);
  if (!newsletter || newsletter.status !== "scheduled") return;
  // TODO: Implement queue-based email sending
  newsletter.status = "sent";
  newsletter.sentAt = new Date();
  await newsletter.save();
  // TODO: Track open/click events
}
