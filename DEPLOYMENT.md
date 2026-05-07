# Deployment Guide

This guide explains how to deploy the portfolio to Vercel with automatic deployments.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. A GitHub repository for your portfolio
3. Node.js 18+ installed locally

## Initial Setup

### 1. Connect Repository to Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Vercel will auto-detect Next.js and configure build settings
4. Click "Deploy"

### 2. Configure Environment Variables (if needed)

If you have environment variables in `.env.example`, add them in Vercel:

1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add each variable from `.env.example`
4. Make sure to add them for all environments (Production, Preview, Development)

### 3. Set Up Automatic Deployments

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request

To customize this behavior, the `vercel.json` file is already configured.

### 4. GitHub Actions (Optional)

For additional CI/CD control, GitHub Actions workflow is included at `.github/workflows/vercel-deploy.yml`.

To enable it:

1. Get your Vercel token from https://vercel.com/account/tokens
2. Add these secrets to your GitHub repository (Settings > Secrets and variables > Actions):
   - `VERCEL_TOKEN`: Your Vercel token
   - `VERCEL_ORG_ID`: Found in Vercel project settings
   - `VERCEL_PROJECT_ID`: Found in Vercel project settings

## Deployment Configuration

### Build Settings

The following settings are configured in `vercel.json`:

- **Build Command**: `npm run build`
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

### Caching Strategy

Static assets are cached with the following headers:

- Service Worker (`/sw.js`): No cache, always fresh
- Static files (`/static/*`): 1 year cache, immutable
- Next.js static files (`/_next/static/*`): 1 year cache, immutable

### Security Headers

The following security headers are automatically added:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`

## Deployment Workflow

### Production Deployment

1. Make changes to your code
2. Commit and push to `main` branch:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```
3. Vercel automatically builds and deploys
4. Check deployment status at https://vercel.com/dashboard

### Preview Deployment

1. Create a new branch:
   ```bash
   git checkout -b feature/my-feature
   ```
2. Make changes and commit
3. Push branch and create pull request:
   ```bash
   git push origin feature/my-feature
   ```
4. Vercel automatically creates a preview deployment
5. Preview URL is posted as a comment on the PR

## Monitoring

### Performance

- Vercel Analytics: Enable in project settings for Core Web Vitals tracking
- Lighthouse: Run audits on deployed URLs
- Performance Monitor: Built-in FPS and metrics tracking (dev mode)

### Logs

View deployment logs:
1. Go to Vercel dashboard
2. Select your project
3. Click on a deployment
4. View "Build Logs" and "Function Logs"

## Troubleshooting

### Build Fails

1. Check build logs in Vercel dashboard
2. Verify all dependencies are in `package.json`
3. Test build locally: `npm run build`
4. Check for TypeScript errors: `npm run type-check`

### Environment Variables

If features aren't working:
1. Verify environment variables are set in Vercel
2. Check variable names match `.env.example`
3. Redeploy after adding variables

### PWA Not Working

1. PWA is disabled in development mode
2. Test on production deployment
3. Check service worker registration in browser DevTools
4. Verify `manifest.json` is accessible

## Custom Domain

To add a custom domain:

1. Go to project settings in Vercel
2. Navigate to "Domains"
3. Add your domain
4. Follow DNS configuration instructions
5. Wait for DNS propagation (up to 48 hours)

## Rollback

To rollback to a previous deployment:

1. Go to Vercel dashboard
2. Select your project
3. Click "Deployments"
4. Find the deployment you want to rollback to
5. Click "..." menu and select "Promote to Production"

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel CLI](https://vercel.com/docs/cli)
