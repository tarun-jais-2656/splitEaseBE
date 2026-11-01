import 'dotenv/config';
import { z } from 'zod';

const environmentSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  MONGODB_URI: z.string().min(1),
});

const result = environmentSchema.safeParse(process.env);

if (!result.success) {
  console.error('Invalid environment configuration:');
  console.error(z.treeifyError(result.error));
  process.exit(1);
}

export const configuration = result.data;