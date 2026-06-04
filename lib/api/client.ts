import { client } from "@/generated/api/client.gen";

client.setConfig({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3009",
});

export { client };
