# Portfolio Backend Setup Guide

This guide will help you set up MongoDB and Sanity.io for your portfolio.

## 📋 Prerequisites

- Node.js installed
- npm or yarn installed
- Git installed

---

## 🗄️ Step 1: MongoDB Atlas Setup

### 1.1 Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Verify your email

### 1.2 Create a Cluster

1. Click "Build a Database"
2. Choose **FREE** tier (M0 Sandbox)
3. Select a cloud provider and region (choose closest to you)
4. Click "Create Cluster"

### 1.3 Create Database User

1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Set username and password (save these!)
5. Set privileges to "Read and write to any database"
6. Click "Add User"

### 1.4 Whitelist IP Address

1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Click "Confirm"

### 1.5 Get Connection String

1. Go to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `portfolio_db`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfolio_db?retryWrites=true&w=majority
```

---

## 🎨 Step 2: Sanity.io Setup

### 2.1 Create Sanity Account

1. Go to [Sanity.io](https://www.sanity.io/)
2. Click "Get Started"
3. Sign up with GitHub, Google, or email

### 2.2 Create New Project

1. After logging in, click "Create Project"
2. Give your project a name (e.g., "Portfolio Blog")
3. Choose "Production" dataset
4. Click "Create Project"

### 2.3 Get Project ID

1. After creating the project, you'll see your Project ID
2. Copy this ID (you'll need it for .env.local)

### 2.4 Create API Token

1. Go to your project settings
2. Click on "API" tab
3. Click "Add API Token"
4. Give it a name (e.g., "Portfolio Token")
5. Set permissions to "Editor"
6. Click "Save"
7. Copy the token (you won't see it again!)

---

## ⚙️ Step 3: Configure Environment Variables

Update your `.env.local` file with the values you collected:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfolio_db?retryWrites=true&w=majority

# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here
```

---

## 🌱 Step 4: Seed MongoDB Database

Run the seed script to populate your MongoDB with existing data:

```bash
npm run seed
```

You should see output like:
```
✅ Connected to MongoDB
🗑️  Clearing existing data...
📝 Seeding Hero data...
📝 Seeding About data...
📝 Seeding Projects data...
📝 Seeding Skills data...
📝 Seeding Experiences data...
✅ Database seeded successfully!
```

---

## 📝 Step 5: Deploy Sanity Studio

### 5.1 Install Sanity CLI globally (if not already installed)

```bash
npm install -g @sanity/cli
```

### 5.2 Login to Sanity

```bash
sanity login
```

### 5.3 Initialize Sanity Studio

```bash
sanity init
```

When prompted:
- Select your existing project
- Use default dataset (production)
- Use default project path

### 5.4 Deploy Sanity Studio

```bash
sanity deploy
```

Choose a studio hostname (e.g., `your-portfolio-blog`)

Your Sanity Studio will be available at:
```
https://your-portfolio-blog.sanity.studio
```

---

## 🧪 Step 6: Test the Setup

### 6.1 Test MongoDB Connection

Start your development server:

```bash
npm run dev
```

Visit these URLs to test:
- http://localhost:3000/api/hero
- http://localhost:3000/api/projects
- http://localhost:3000/api/skills
- http://localhost:3000/api/experiences
- http://localhost:3000/api/about

You should see JSON data returned.

### 6.2 Test Sanity Studio

1. Go to your Sanity Studio URL
2. Create a test author
3. Create a test blog post
4. Publish it

---

## 📚 Step 7: Create Your First Blog Post in Sanity

1. Go to your Sanity Studio
2. Click "Author" and create an author profile
3. Click "Blog Post" and create a new post
4. Fill in all required fields:
   - Title
   - Slug (auto-generated from title)
   - Excerpt
   - Cover Image (upload an image)
   - Author (select the author you created)
   - Tags (add some tags)
   - Reading Time (estimate in minutes)
   - Published At (select date/time)
   - Body (write your blog content with rich text)
5. Click "Publish"

---

## 🚀 Step 8: Verify Everything Works

1. Start your dev server: `npm run dev`
2. Visit your portfolio: http://localhost:3000
3. Check that all sections load correctly:
   - Hero section
   - About section
   - Projects section
   - Skills section
   - Experience section
   - Blog section (should show Sanity posts)

---

## 🔧 Troubleshooting

### MongoDB Connection Issues

**Error: "MongoServerError: bad auth"**
- Check your username and password in the connection string
- Make sure you're using the database user credentials, not your Atlas account credentials

**Error: "MongooseServerSelectionError"**
- Check your IP is whitelisted in Network Access
- Verify your connection string is correct

### Sanity Issues

**Error: "Missing environment variable"**
- Make sure all Sanity env variables are set in `.env.local`
- Restart your dev server after updating env variables

**Can't access Sanity Studio**
- Make sure you ran `sanity deploy`
- Check the studio URL is correct

---

## 📖 Next Steps

### For MongoDB Data Management

You can manage your MongoDB data in several ways:

1. **MongoDB Atlas Dashboard**
   - Go to your cluster
   - Click "Browse Collections"
   - View and edit data directly

2. **MongoDB Compass** (Desktop App)
   - Download from mongodb.com
   - Connect using your connection string
   - Visual interface for data management

3. **API Routes** (Recommended for production)
   - Use the API routes we created
   - Build an admin panel (optional)

### For Blog Management

Use your Sanity Studio to:
- Create, edit, and delete blog posts
- Upload images
- Manage authors
- Preview content before publishing

---

## 🎉 You're All Set!

Your portfolio now has:
- ✅ Dynamic content management with MongoDB
- ✅ Blog management with Sanity.io
- ✅ API routes for all data
- ✅ Seeded with your existing data

You can now update your portfolio content without touching code!

---

## 📞 Need Help?

If you encounter any issues:
1. Check the error messages carefully
2. Verify all environment variables are set correctly
3. Make sure MongoDB and Sanity services are running
4. Check the console for detailed error logs
