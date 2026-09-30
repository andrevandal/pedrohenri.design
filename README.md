# pedrohenri.design

![Pedro Henri Design Logo](https://files.vandal.services/pedrohenri.design/images/horizontal-dark-logo.png)

## Sobre

Neste repositório é mantido o site [pedrohenri.design](https://pedrohenri.design/) desenvolvido por [André Vandal](https://andrevandal.dev/) junto com o [pedrohenri.design](https://pedrohenri.design/).

## Objetivo

O objetivo do site é ser um espaço para exposição dos trabalhos realizado por pedro (portifólio).

## Stack

- [Astro 7](https://astro.build/) com renderização no servidor.
  - Por padrão usa o adapter Node (`@astrojs/node`), local ou em qualquer servidor Node.
  - No deploy, `DEPLOY_TARGET=cloudflare` (ou o ambiente do Workers Builds) troca para o adapter da Cloudflare e gera um Worker.
- [EmDash](https://emdashcms.com/) como CMS, com painel em `/_emdash/admin`.
- Tailwind CSS 4.

## Conteúdo

Todo o conteúdo é editado no painel do EmDash (`/_emdash/admin`); nada fica no repositório.

| No painel                     | No site                                                                                             |
| :---------------------------- | :-------------------------------------------------------------------------------------------------- |
| Páginas → `home`              | Página inicial, montada com blocos (destaque, texto com imagem, vitrine de categorias, texto livre) |
| Páginas → outras              | Novas páginas em `/{slug}/` com os mesmos blocos                                                    |
| Categorias / Posts            | `/categorias/{slug}/` e `/posts/{slug}/`                                                            |
| Menus → `primary`             | Navegação do topo; itens com a classe CSS `cta` viram o botão de contato                            |
| Widgets → `footer_cta`        | Cartão escuro acima do rodapé (título, texto, botão e imagem)                                       |
| Settings                      | Nome e slogan do site, logo, favicon, Instagram/LinkedIn do rodapé                                  |
| Settings → SEO                | Separador do título, imagem padrão de compartilhamento, `robots.txt`, verificação Google/Bing       |
| Painel de SEO de cada entrada | Título, descrição, imagem, canonical e `noindex` (têm prioridade sobre os campos da entrada)        |
| Redirects                     | Redirecionamentos (ex.: `/admin` → `/_emdash/admin`)                                                |

- O sitemap (`/sitemap.xml`) e o `robots.txt` são gerados pelo EmDash; entradas com `noindex` saem do sitemap. `src/pages/sitemap-pages.xml.ts` só existe para publicar a página `home` em `/`.
- `seed/seed.json` define o schema e o conteúdo inicial (migrado dos antigos arquivos Markdown) e é aplicado uma única vez, no setup de um banco vazio.
- `emdash-env.d.ts` contém os tipos gerados a partir do schema. O servidor de desenvolvimento o regenera; também é possível rodar `pnpm exec emdash types`.
- Blocos de cor dos estudos de caso usam o tipo Portable Text `colorPanel`, renderizado por `src/components/portable-text/ColorPanel.astro`.

## Imagens

Nenhuma imagem fica no repositório ou no servidor. Tudo está no bucket `files.vandal.services/pedrohenri.design`, redimensionado por `images.vandal.services`:

- O conteúdo migrado aponta para os arquivos existentes do bucket (provedor de mídia **files.vandal.services**, `src/lib/emdash/vandal-media.ts`), sem cópias. No seletor de mídia do painel é possível navegar e buscar qualquer imagem do bucket, sem credenciais.
- Uploads novos pela biblioteca do EmDash vão para o mesmo bucket via S3 e exigem `S3_ACCESS_KEY_ID` e `S3_SECRET_ACCESS_KEY`.

## Serviços

O banco e o e-mail usam a infraestrutura real quando suas variáveis estão definidas (no shell ou em `.env`), tanto localmente quanto em produção:

| Serviço | Com variáveis         | Sem variáveis (só Node)                    |
| :------ | :-------------------- | :----------------------------------------- |
| Banco   | libSQL (`LIBSQL_URL`) | SQLite em `data/emdash.db`                 |
| E-mail  | SMTP (`SMTP_HOST`)    | console do terminal (apenas em `pnpm dev`) |

O build para a Cloudflare exige `LIBSQL_URL`.

| Variável                                       | Descrição                                                                            |
| :--------------------------------------------- | :----------------------------------------------------------------------------------- |
| `SITE_URL`                                     | URL pública, ex. `https://pedrohenri.design` (build e runtime)                       |
| `LIBSQL_URL`                                   | `libsql://…` (Turso), `https://…` (`sqld`) ou `file:` (Node)                         |
| `LIBSQL_AUTH_TOKEN`                            | Token do banco (segredo; omitir para `sqld` sem autenticação)                        |
| `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`     | Credenciais do bucket para uploads (segredos)                                        |
| `S3_ENDPOINT`, `S3_BUCKET`, `S3_REGION`        | Opcional: outro bucket (padrão `https://files.vandal.services`, `pedrohenri.design`) |
| `S3_PUBLIC_URL`                                | Opcional: URL pública do bucket (padrão `{S3_ENDPOINT}/{S3_BUCKET}`)                 |
| `SMTP_HOST`, `SMTP_PORT`                       | Servidor SMTP (porta padrão 587, ou 465 com `SMTP_SECURE=true`)                      |
| `SMTP_SECURE`                                  | `true` para TLS implícito; caso contrário usa STARTTLS                               |
| `SMTP_USERNAME`, `SMTP_PASSWORD`               | Credenciais SMTP (segredos; omitir ambos para relay sem autenticação)                |
| `SMTP_FROM`, `SMTP_FROM_NAME`, `SMTP_REPLY_TO` | Remetente e resposta padrão                                                          |

Os segredos são lidos em runtime e nunca entram no bundle. Com `SMTP_HOST` definido, ative **smtp-email** em Admin → Extensions e selecione-o em Settings → Email.

## 🧞 Comandos

Todos os comandos devem ser executados da pasta raiz do projeto via terminal:

| Command                  | Action                                                  |
| :----------------------- | :------------------------------------------------------ |
| `pnpm install`           | Instala dependências                                    |
| `pnpm dev`               | Servidor local (Node) em `localhost:4321`               |
| `pnpm build`             | Verifica os tipos e builda para Node em `./dist/`       |
| `pnpm preview`           | Previsualiza o build Node                               |
| `pnpm build:cloudflare`  | Verifica os tipos e builda o Worker da Cloudflare       |
| `pnpm preview:wrangler`  | Builda e roda o Worker com `wrangler dev`               |
| `pnpm deploy:cloudflare` | Builda e publica o Worker com `wrangler deploy`         |
| `pnpm test`              | Roda os testes (Vitest)                                 |
| `pnpm lint`              | Roda o ESLint                                           |
| `pnpm astro ...`         | Executa comandos do CLI como `astro add`, `astro check` |

## Desenvolvimento local

1. `pnpm dev`.
2. Acesse `/_emdash/api/setup/dev-bypass?redirect=/_emdash/admin` para aplicar o seed e entrar como administrador de desenvolvimento.

Para zerar o conteúdo local (sem libSQL), pare o servidor e apague `data/`.

## Deploy na Cloudflare

1. Configure as variáveis acima no Worker (painel ou `wrangler secret put <NOME>` para os segredos). O `wrangler.jsonc` usa `keep_vars`, então o deploy não as apaga.
2. `SITE_URL=https://pedrohenri.design LIBSQL_URL=… SMTP_HOST=… pnpm deploy:cloudflare` (no Workers Builds, defina as mesmas variáveis de build). O Wrangler provisiona o KV de sessão e o binding `IMAGES`.
3. Acesse `/_emdash/admin` e conclua o setup com "incluir conteúdo". O seed não baixa imagens, então é aplicado em poucos passos; as migrações do banco rodam automaticamente.
4. Ative o **smtp-email** (Admin → Extensions) e selecione-o em Settings → Email.
