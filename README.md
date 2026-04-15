# TYPO — Blog App

A Medium-inspired blogging platform built with React, TypeScript, and Tailwind CSS. Supports Markdown in blog posts, JWT authentication with token refresh, and a clean light-mode UI.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — build tool
- **Tailwind CSS v4** + **DaisyUI v5** — styling
- **react-markdown** + **remark-gfm** — Markdown rendering
- **React Router v7** — client-side routing
- **Lucide React** — icons

## Features

- Browse, create, update, and delete blog posts
- Markdown support in post body (headings, code blocks, tables, blockquotes, etc.)
- JWT authentication with automatic token refresh
- Protected routes (create/update/delete require login)
- Image upload for post covers
- Pagination
- User profile page with personal posts
- Medium-style light UI — Charter serif for content, clean sans-serif for UI

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Run

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/         # Shared components
├── context/            # Auth context
├── features/
│   ├── auth/           # Login & Register
│   ├── blog/           # BlogList, BlogCard, BolgPage, CreateBlog, UpdateBlog
│   ├── comments/       # Comment component
│   └── profile/        # User profile page
├── layout/             # Header, NotFound
├── lib/                # apiClient (fetch wrapper with auth & token refresh)
└── types/              # TypeScript interfaces
```

## API

Backed by a Go + MongoDB REST API deployed on Render.

Base URL: `https://go-mongo-api.onrender.com/api/v1`

Key endpoints:

| Method | Endpoint               | Auth | Description            |
| ------ | ---------------------- | ---- | ---------------------- |
| GET    | `/blogs`               | No   | List blogs (paginated) |
| GET    | `/blogs/:id`           | No   | Get single blog        |
| POST   | `/blogs`               | Yes  | Create blog            |
| PUT    | `/blogs/:id`           | Yes  | Update blog            |
| DELETE | `/blogs/:id`           | Yes  | Delete blog            |
| GET    | `/blogs/my`            | Yes  | Current user's blogs   |
| POST   | `/auth/login`          | No   | Login                  |
| POST   | `/auth/register`       | No   | Register               |
| POST   | `/auth/refresh-tokens` | No   | Refresh JWT            |
