import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function databaseConnectionString(): string {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is required for database-backed routes.");

  const url = new URL(connectionString);
  if (url.hostname.endsWith("supabase.com")) {
    url.searchParams.set("sslmode", "require");
    url.searchParams.set("uselibpqcompat", "true");
  }
  return url.toString();
}

function createPrismaClient(): PrismaClient {
  const adapter = new PrismaPg({ connectionString: databaseConnectionString() });
  return new PrismaClient({ adapter });
}

export function getPrisma(): PrismaClient {
  const client = globalForPrisma.prisma ?? createPrismaClient();
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client;
  return client;
}
