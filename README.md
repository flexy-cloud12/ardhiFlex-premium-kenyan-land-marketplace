# Ardhi Haven

[cloudflarebutton]

A modern full-stack web application built with React, Convex, and Cloudflare Workers. Features user authentication (email/password + anonymous), secure file upload/storage, and a responsive UI with dark mode support.

## 🚀 Features

- **Authentication**: Email/password signup/signin with OTP verification, password reset, and anonymous login powered by Convex Auth.
- **File Management**: Upload, list, preview, and delete user files with Convex Storage and database indexing.
- **Responsive UI**: Beautiful, accessible design using Tailwind CSS, shadcn/ui components, and animations.
- **Real-time Sync**: Convex backend provides reactive queries and mutations.
- **Edge Deployment**: Cloudflare Workers for API routing with Hono, Vite for fast builds.
- **Dark Mode**: Automatic theme detection with manual toggle.
- **Error Handling**: Comprehensive client/server error reporting.
- **TypeScript**: Fully type-safe across frontend, backend, and Workers.

## 🛠 Tech Stack

- **Frontend**: React 18, React Router, TanStack Query, shadcn/ui, Tailwind CSS, Lucide Icons, Sonner (toasts)
- **Backend**: Convex (schema, auth, storage, queries/mutations)
- **API**: Cloudflare Workers, Hono routing
- **Build Tools**: Vite, Bun, Wrangler
- **Other**: Immer (state), Framer Motion (animations), Zod (validation)

## ⚡ Quick Start

1. **Clone & Install**:
   ```bash
   git clone <your-repo-url>
   cd ardhi-haven-qm4nwv07satp0-5uyw2vs
   bun install
   ```

2. **Environment Setup**:
   - Create a Convex project: `bunx convex dev`
   - Add your Convex URL to `.env` as `VITE_CONVEX_URL=https://your-project.convex.cloud`
   - Configure email (Andromo SMTP): Set `ANDROMO_SMTP_URL` and `ANDROMO_SMTP_API_KEY` in Convex dashboard secrets.

3. **Development**:
   ```bash
   bun dev
   ```
   Opens at `http://localhost:3000` (or `$PORT`).

## 🧪 Development Workflow

- **Local Dev**: `bun dev` (runs Convex sync + Vite dev server).
- **Backend Only**: `bunx convex dev`.
- **Type Generation**: `bun run cf-typegen` (Cloudflare Workers types).
- **Lint**: `bun lint`.
- **Preview Build**: `bun preview`.
- **Custom Routes**: Add to `worker/userRoutes.ts` (Hono app).
- **UI Components**: Use shadcn/ui via `components.json` aliases (`@/components/ui/*`).

### File Upload Example (Client-side)
```tsx
// Example using Convex file APIs
const files = useQuery(api.files.listFiles);
const { mutate: upload } = useMutation(api.files.generateUploadUrl);

const handleUpload = async (file: File) => {
  const url = await upload();
  await fetch(url, { method: 'POST', body: file });
  // Metadata saved automatically
};
```

### Custom Worker Route Example
```ts
// worker/userRoutes.ts
app.post('/api/custom', async (c) => {
  const data = await c.req.json();
  return c.json({ success: true, data });
});
```

## ☁️ Deployment

Deploy to Cloudflare Pages/Workers in minutes:

1. **Push to GitHub**.
2. **Backend**:
   ```bash
   bun run backend:deploy  # Deploys Convex
   ```
3. **Frontend**:
   ```bash
   bun build
   bun run deploy         # wrangler deploy
   ```

Or use the one-click deploy:

[cloudflarebutton]

**Custom Domain**: Update `wrangler.jsonc` and run `wrangler deploy`.

**Environment Variables**:
- Convex: Set `VITE_CONVEX_URL` in Cloudflare dashboard.
- Secrets: Add SMTP vars to Convex project.

## 📚 Project Structure

```
├── convex/          # Backend: Schema, auth, file APIs
├── src/             # React frontend
│   ├── components/  # shadcn/ui + custom
│   ├── pages/       # Routes: Home, About, Files (add more)
│   └── lib/         # Convex client, utils
├── worker/          # Cloudflare Workers API
└── shared/          # Shared types/utils
```

## 🤝 Contributing

1. Fork & clone.
2. `bun install`.
3. Create feature branch: `git checkout -b feature/xyz`.
4. Commit: `git commit -m "feat: add xyz"`.
5. Push & PR.

## 🔒 License

MIT. See [LICENSE](LICENSE) for details.

## 🙌 Support

Built with ❤️ by Andromo. Questions? Open an issue.

---

⭐ Star on GitHub if useful!