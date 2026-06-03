import { client } from "@/generated/api/client.gen";

client.setConfig({
  baseUrl: "/api/proxy",
});

export { client };
