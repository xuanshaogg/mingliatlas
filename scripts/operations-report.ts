import { config } from "dotenv";
import { getPrisma } from "@/lib/prisma";

config({ path: ".env.local", quiet: true });
config({ path: ".env", quiet: true });

const windowDays = Number(process.argv[2] ?? 7);
const since = new Date(Date.now() - Math.max(1, Math.min(windowDays, 90)) * 86_400_000);
const prisma = getPrisma();

async function main(): Promise<void> {
  const [activeSubscribers, unsubscribedSubscribers, newSubscribers, newContacts, openContacts, latestContacts] = await Promise.all([
    prisma.subscriber.count({ where: { unsubscribedAt: null } }),
    prisma.subscriber.count({ where: { unsubscribedAt: { not: null } } }),
    prisma.subscriber.count({ where: { subscribedAt: { gte: since }, unsubscribedAt: null } }),
    prisma.contactMessage.count({ where: { createdAt: { gte: since } } }),
    prisma.contactMessage.count({ where: { status: "new" } }),
    prisma.contactMessage.findMany({
      select: { createdAt: true, status: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  console.log(
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        windowDays,
        subscribers: {
          active: activeSubscribers,
          unsubscribed: unsubscribedSubscribers,
          newInWindow: newSubscribers,
        },
        contactMessages: {
          open: openContacts,
          newInWindow: newContacts,
          latest: latestContacts.map((message) => ({ createdAt: message.createdAt.toISOString(), status: message.status })),
        },
      },
      null,
      2,
    ),
  );
}

main().finally(async () => {
  await prisma.$disconnect();
});
