import { z } from "zod";
import { createEventBus } from "@journals/lib-service-bus";

const schemas = {
  "mf-document-upload:DocumentUpload:submit": z.object({
    uploaded: z.boolean(),
  }),
};

export type EventSchemas = typeof schemas;

export const { publish } = createEventBus(schemas);
