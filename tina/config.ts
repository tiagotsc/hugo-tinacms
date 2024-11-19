import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

  export default defineConfig({
    branch: process.env.GITHUB_BRANCH || "", // Branch github que será manibulada
  
    // Get this from tina.io
    clientId: process.env.TINA_CLIENT_ID || "", // Pegue no Tina Cloud, no seu projeto em "Overview"
    // Get this from tina.io
    token: process.env.TINA_TOKEN || "", // Pegue no Tina Cloud, no seu projeto em "Token > Content (Readonly)"
  
    build: {
      outputFolder: "admin",
      publicFolder: "static",
    },
    media: {
      tina: {
        mediaRoot: "",
        publicFolder: "static",
      },
    },
    // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
    schema: {
      collections: [
        {
          name: "post",
          label: "Postagens",
          path: "content/posts",
          fields: [
            {
              type: "string",
              name: "title",
              label: "Título",
              isTitle: true,
              required: true,
            },
            {
              type: 'boolean',
              name: 'draft',
              label: 'É rascunho'
            },
            {
              type: "rich-text",
              name: "body",
              label: "Conteúdo",
              isBody: true,
            },
          ],
        },
      ],
    },
    search: { // Configuração de campo de busca
      tina: {
        indexerToken: process.env.TINA_TOKEN_SEARCH, // Pegue no Tina Cloud, no seu projeto em "Token > search"
        stopwordLanguages: ['eng'],
      },
      indexBatchSize: 100,
      maxSearchIndexFieldLength: 100,
    },
  });
