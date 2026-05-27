import { defineManifest } from "@journals/mf-contract";

export const manifest = defineManifest({
  name: "mf-document-upload",
  version: "0.0.1",
  framework: "angular",
  port: 3004,
  components: [
    {
      name: "DocumentUpload",
      description: "Subida de documentos de respaldo",
      props: [
        {
          name: "emit",
          type: "function",
          required: true,
          description: "Event emitter del Shell",
        },
      ],
    },
  ],
  events: [
    {
      event: "mf:document-upload:submit",
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
