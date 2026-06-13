# Portfolio Project

A professional, pixel-perfect, modern dark-themed portfolio website.

## Tech Stack

| Tool                    | Purpose                     |
| ----------------------- | --------------------------- |
| Next.js 16 (App Router) | Framework                   |
| React 19                | UI library                  |
| TypeScript 5            | Type safety                 |
| Tailwind CSS v4         | Styling                     |
| shadcn/ui               | Component library           |
| Framer Motion           | Animations                  |
| next-themes             | Dark/light theme management |
| lucide-react            | Icons                       |

## Architecture

- Pages live in `src/modules/<page-name>/` as self-contained modules
- Each module has its own `index.tsx` as the page component, plus co-located `components/` and `data/`
- The `app/` folder only re-exports from modules: `export { default } from "@/modules/<page-name>"`
- Example: Home page → `src/modules/home/index.tsx`, wired via `src/app/page.tsx`

## Code Standards

- Follow best practices from [javascript.info](https://javascript.info/)
- Write clean, modular code with separation of concerns
- Build reusable, component-based architecture
- File naming: **kebab-case**

## Workflow

- **Plan before executing** — think through the approach before writing code
- If there is a better or more professional way to accomplish a task, recommend it before proceeding
