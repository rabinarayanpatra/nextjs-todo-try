import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

/**
 * The Prisma client instance, reused across imports in development,
 * and created once in production for best performance.
 */
export const prisma: PrismaClient =
  global.prisma ||
  new PrismaClient({
    // Optional logging in development
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "info", "warn", "error"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
