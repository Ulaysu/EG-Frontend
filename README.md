# Explore Gambia Frontend

Vue 3 + Vite frontend for Explore Gambia, a tour discovery and booking platform for travelers, local guides, and administrators.

The app has moved beyond the default Vite starter and now includes public tour browsing, authentication, protected user workflows, guide tour management, booking/payment flows, and API integration with the Explore Gambia backend.

## Tech Stack

- Vue 3 with the Composition API
- Vite
- Vue Router
- Pinia
- Tailwind CSS 4
- Axios/fetch-based API services
- Lucide Vue icons

## What Is Built So Far

- Public marketing/home experience for Explore Gambia.
- Public tour catalog with loading, empty, error, filtering, sorting, availability, location, and pagination states.
- Tour details pages for travelers.
- Login and signup screens connected to the backend auth API.
- Session restoration through Pinia before the app mounts.
- Route guards for authenticated pages and guest-only login/signup pages.
- Protected user area with dashboard, profile, bookings, and payment return pages.
- Profile editing for user account details and guide-specific profile fields.
- Booking list with booking status, totals, tour links, and Stripe checkout launch for pending bookings.
- Stripe payment success and cancellation routes, including backwards-compatible redirect routes.
- Guide area for managing tours:
  - View guide-owned tours.
  - Create tours.
  - Edit tours.
  - Upload tour cover images.
  - View tour participants.
  - View guide-specific tour details.
- Admin layout with a protected dashboard route.
- Shared API service layer with JSON requests, bearer-token attachment, timeouts, request errors, and refresh-token retry handling.
- Centralized token helpers for access and refresh tokens.
- Vercel SPA rewrite configuration.

## Main Routes

### Public

- `/home` - public landing/home page
- `/tours` - tour catalog
- `/tours/:id` - public tour details
- `/login` - login
- `/signup` - registration

### Authenticated User

- `/profile` - account and guide profile details
- `/dashboard` - user dashboard
- `/bookings` - user's bookings and payment actions
- `/payment/success` - Stripe success return page
- `/payment/cancel` - Stripe cancellation return page

### Guide

Guide routes require authentication and the guide role.

- `/guide/tours` - guide's tours
- `/guide/tours/create` - create a tour
- `/guide/tours/edit/:id` - edit a tour
- `/guide/tours/:tourId/participants` - view participants
- `/guide/tours/guidedetails/:id` - guide tour details

### Admin

Admin routes require authentication and the `Admin` role.

- `/admin/dashboard` - admin dashboard

## API Configuration

Create a local `.env` file with the backend base URL:

```sh
VITE_API_BASE_URL=http://localhost:5000
```

Use the backend URL for your environment. The frontend trims trailing slashes automatically.

The current API services use these backend areas:

- `/auth/login`
- `/auth/register`
- `/auth/me`
- `/auth/refresh-token`
- `/tour-guides/me`
- `/tours`
- `/tours/my`
- `/tours/:id`
- `/tours/:id/availability`
- `/tours/:tourId/participants`
- `/media/upload`
- `/api/v1/bookings`
- `/api/v1/payments/bookings/:bookingId/stripe/checkout`

## Project Setup

Install dependencies:

```sh
npm install
```

Run the development server:

```sh
npm run dev
```

Build for production:

```sh
npm run build
```

Preview the production build locally:

```sh
npm run preview
```

## Project Structure

```text
src/
  components/       Shared and page-level Vue components
  components/tours/ Tour catalog UI states, filters, cards, and list pieces
  composables/      Reusable Composition API logic
  config/           Environment configuration
  Layouts/          Public, user, guide, and admin layouts
  Pages/            Larger routed guide/tour pages
  router/           Route definitions and navigation guards
  services/         Backend API clients and token helpers
  stores/           Pinia stores
  assets/           Images and global styles
```

## Deployment Notes

The app is configured as a single-page app. `vercel.json` rewrites all routes to `index.html` so direct navigation to nested routes works after deployment.
