import { defineManifest } from "@journals/lib-manifest";

export const manifest = defineManifest({
  name: "mf-document-upload",
  version: "0.0.1",
  framework: "angular",
  port: 3004,
  components: [
    {
      name: "DocumentUpload",
      description: "Subida de documentos de respaldo",
      props: [],
    },
  ],
  events: [
    {
      event: "mf-document-upload:DocumentUpload:submit",
      description: "Usuario subio todos los documentos requeridos",
      direction: "emits",
      payload: {
        uploaded: {
          type: "boolean",
          description: "Indica si todos los documentos fueron subidos",
        },
      },
    },
  ],
});

export type Manifest = typeof manifest;
