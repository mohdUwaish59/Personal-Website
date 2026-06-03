# 🏗️ Portfolio Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     YOUR PORTFOLIO                          │
│                    (Next.js 13 App)                         │
└─────────────────────────────────────────────────────────────┘
                            │
                            │
        ┌───────────────────┴───────────────────┐
        │                                       │
        ▼                                       ▼
┌──────────────────┐                  ┌──────────────────┐
│   MongoDB Atlas  │                  │   Sanity.io      │
│   (Free Tier)    │                  │   (Free Tier)    │
├──────────────────┤                  ├──────────────────┤
│ • Hero           │                  │ • Blog Posts     │
│ • About          │                  │ • Authors        │
│ • Projects       │                  │ • Images         │
│ • Skills         │                  │ • Rich Content   │
│ • Experiences    │                  │                  │
└──────────────────┘                  └──────────────────┘
```

---

## Data Flow

### 1. MongoDB Data Flow (Projects, Skills, Experience, etc.)

```
User visits page
      │
      ▼
Next.js Server Component
      │
      ▼
API Route (/api/projects)
      │
      ▼
MongoDB Connection (lib/mongodb.ts)
      │
      ▼
Mongoose Model (lib/models/Project.ts)
      │
      ▼
MongoDB Atlas Database
      │
      ▼
JSON Response
      │
      ▼
Component renders data
```

### 2. Sanity Data Flow (Blog Posts)

```
User visits blog
      │
      ▼
Next.js Server Component
      │
      ▼
Sanity Client (lib/sanity.ts)
      │
      ▼
Sanity API (GROQ Query)
      │
      ▼
Sanity.io Database
      │
      ▼
JSON Response with content
      │
      ▼
Component renders blog posts
```

---

## File Structure

```
project/
│
├── app/
│   ├── api/                      # API Routes
│   │   ├── hero/route.ts         # GET, PUT hero data
│   │   ├── about/route.ts        # GET, PUT about data
│   │   ├── projects/route.ts     # GET, POST projects
│   │   ├── skills/route.ts       # GET, POST skills
│   │   ├── experiences/route.ts  # GET, POST experiences
│   │   └── blog/route.ts         # GET blog posts (existing)
│   │
│   ├── page.tsx                  # Home page
│   └── layout.tsx                # Root layout
│
├── components/
│   ├── hero-section.tsx          # Will fetch from /api/hero
│   ├── about-section.tsx         # Will fetch from /api/about
│   ├── projects-section.tsx      # Will fetch from /api/projects
│   ├── skills-section.tsx        # Will fetch from /api/skills
│   ├── WorkExperience.tsx        # Will fetch from /api/experiences
│   └── blog-section.tsx          # Will fetch from Sanity
│
├── lib/
│   ├── mongodb.ts                # MongoDB connection utility
│   ├── sanity.ts                 # Sanity client utility
│   ├── api-client.ts             # API fetching functions
│   │
│   └── models/                   # Mongoose schemas
│       ├── Hero.ts
│       ├── About.ts
│       ├── Project.ts
│       ├── Skill.ts
│       └── Experience.ts
│
├── sanity/
│   ├── schema.ts                 # Sanity content schemas
│   └── env.ts                    # Sanity environment config
│
├── scripts/
│   └── seed-database.ts          # Populate MongoDB with data
│
└── .env.local                    # Environment variables
```

---

## API Endpoints

### MongoDB Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/hero` | GET | Get hero section data |
| `/api/hero` | PUT | Update hero section |
| `/api/about` | GET | Get about section data |
| `/api/about` | PUT | Update about section |
| `/api/projects` | GET | Get all projects |
| `/api/projects` | POST | Create new project |
| `/api/skills` | GET | Get all skills |
| `/api/skills?category=frontend` | GET | Get skills by category |
| `/api/skills` | POST | Create new skill |
| `/api/experiences` | GET | Get all experiences |
| `/api/experiences` | POST | Create new experience |

### Sanity Endpoints

| Endpoint | Description |
|----------|-------------|
| Sanity Client | Fetches blog posts via GROQ queries |
| Sanity Studio | Web interface for managing blog content |

---

## Database Schemas

### MongoDB Collections

#### Hero Collection
```javascript
{
  name: String,
  title: String,
  subtitle: String,
  description: String,
  typingTexts: [String],
  githubUrl: String,
  linkedinUrl: String,
  email: String
}
```

#### Projects Collection
```javascript
{
  title: String,
  description: String,
  image: String,
  tags: [String],
  liveUrl: String,
  githubUrl: String,
  order: Number,
  featured: Boolean
}
```

#### Skills Collection
```javascript
{
  name: String,
  level: Number (0-100),
  category: String (frontend|backend|database|rag|other),
  icon: String,
  order: Number
}
```

#### Experiences Collection
```javascript
{
  title: String,
  company: String,
  location: String,
  period: String,
  description: String,
  achievements: [String],
  skills: [String],
  logo: String,
  order: Number
}
```

### Sanity Schema

#### Blog Post
```javascript
{
  title: String,
  slug: Slug,
  excerpt: Text,
  coverImage: Image,
  author: Reference,
  tags: [String],
  readingTime: Number,
  publishedAt: DateTime,
  body: [Block] // Rich text content
}
```

---

## Technology Stack

### Frontend
- **Next.js 13** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations

### Backend
- **Next.js API Routes** - Serverless functions
- **MongoDB Atlas** - NoSQL database (free tier)
- **Mongoose** - MongoDB ODM
- **Sanity.io** - Headless CMS (free tier)

### Development
- **tsx** - TypeScript execution
- **dotenv** - Environment variables

---

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Vercel / Netlify                     │
│                  (Next.js Deployment)                   │
└─────────────────────────────────────────────────────────┘
                            │
                            │
        ┌───────────────────┴───────────────────┐
        │                                       │
        ▼                                       ▼
┌──────────────────┐                  ┌──────────────────┐
│  MongoDB Atlas   │                  │   Sanity.io      │
│   (Cloud DB)     │                  │  (Cloud CMS)     │
└──────────────────┘                  └──────────────────┘
```

### Environment Variables Needed for Deployment

```env
MONGODB_URI=mongodb+srv://...
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=...
```

---

## Benefits of This Architecture

### ✅ Scalability
- MongoDB can handle millions of documents
- Sanity CDN for fast content delivery
- Next.js serverless functions scale automatically

### ✅ Performance
- Server-side rendering for SEO
- Data caching with revalidation
- Optimized image delivery from Sanity

### ✅ Developer Experience
- Type-safe with TypeScript
- Easy to extend with new features
- Clear separation of concerns

### ✅ Content Management
- Sanity Studio for blog management
- MongoDB Atlas UI for data management
- No code changes needed for content updates

### ✅ Cost
- **FREE** for your use case!
- MongoDB Atlas: Free tier (512MB)
- Sanity.io: Free tier (generous limits)
- Vercel/Netlify: Free tier for personal projects

---

## Security Considerations

### ✅ Implemented
- Environment variables for sensitive data
- MongoDB connection with authentication
- Sanity API tokens for secure access

### 🔄 To Implement (Optional)
- Admin authentication for write operations
- Rate limiting on API routes
- Input validation and sanitization

---

## Monitoring & Maintenance

### MongoDB Atlas
- Monitor database usage in Atlas dashboard
- Set up alerts for storage limits
- Regular backups (automatic in Atlas)

### Sanity.io
- Monitor API usage in Sanity dashboard
- Track content changes
- Version history for blog posts

### Next.js
- Monitor API route performance
- Check error logs in deployment platform
- Set up error tracking (Sentry, etc.)

---

This architecture provides a solid foundation for your portfolio with room to grow! 🚀
