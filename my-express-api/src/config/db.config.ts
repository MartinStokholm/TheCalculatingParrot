import { Service } from "typedi";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

@Service()
export class PrismaService extends PrismaClient {
  constructor() {
    super({ adapter });
  }
}
