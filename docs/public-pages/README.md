# Publishing footer documents

The mobile and web footer fetch Privacy, Terms, Legal, and Security from the backend. A document is available only when its `PublicContent` record has `published: true`.

Save your approved text as UTF-8 files in this folder:

- `privacy.txt`
- `terms.txt`
- `legal.txt`
- `security.txt`

Use plain text with blank lines between paragraphs; the document viewer does not render Markdown or HTML. Each file must contain 1–50000 characters. Titles are assigned automatically.

From the repository root, preview and validate all four files:

```powershell
npm run content:publish --prefix backend -- --dir ../docs/public-pages
```

Then save and publish them:

```powershell
npm run content:publish --prefix backend -- --dir ../docs/public-pages --apply
```

The preview does not connect to MongoDB or write anything. `--apply` uses `MONGO_URI` from `backend/.env` (or the environment) and creates or updates the four documents in MongoDB's `publiccontents` collection. This is a trusted local administration command, so it does not need a Firebase sign-in token. It needs database write access and a replica set, as the app's other transactional operations do. All four documents publish in one transaction; rerunning replaces their text.

After publication, reopen a footer link or press **Try again** in an already open document. To check directly:

```powershell
Invoke-RestMethod http://localhost:5001/api/public/pages/privacy
```

The existing HTTP publishing API remains available as `PUT /api/public/pages/:slug`, with a Firebase ID token whose custom claims include `admin: true`. Its JSON body accepts `title`, `content`, and `published`. A workspace Admin role alone does not grant this publishing permission.
