

## Plan: Admin Email Notifications + Registration-Gated Purchases

### Overview
Two features: (1) send an email to the admin when a new installation booking is submitted, and (2) require customers to register/login before they can purchase products (checkout).

---

### Feature 1: Email Notification to Admin on New Booking

**Approach:** Set up Lovable's built-in email infrastructure and create a transactional email template that notifies the admin when a booking is submitted.

**Steps:**
1. **Set up email domain** — check if one exists; if not, show the email domain setup dialog for you to configure your sender domain.
2. **Set up email infrastructure** — create the queue, tables, and cron job needed for email sending.
3. **Scaffold transactional email** — create the Edge Functions for sending emails.
4. **Create a "new-booking-admin-notification" template** — a branded React Email template showing booking details (customer name, service type, date, address, phone).
5. **Wire up the trigger** — in `BookInstallation.tsx`, after the booking is inserted, call `send-transactional-email` with the admin's email (`admin@premiumsolar.com`) and the booking details.
6. **Deploy Edge Functions** and create the unsubscribe page.

---

### Feature 2: Require Registration Before Purchasing

**Approach:** Gate the checkout and cart actions behind authentication. Unauthenticated users can browse products but must log in or register to add to cart / checkout.

**Steps:**
1. **Protect the Checkout page** — in `Checkout.tsx`, check for an active session on mount. If no user is logged in, redirect to `/login` with a return URL so they come back after login.
2. **Protect "Add to Cart" actions** — in `ProductCard.tsx` and `ProductDetail.tsx`, check auth before adding to cart. If not logged in, show a toast prompting login and redirect to `/login`.
3. **Protect the CartSheet checkout button** — disable or redirect if not authenticated.
4. **Update Login/Register pages** — support a `redirectTo` query param so users return to their intended page after authenticating.

---

### Technical Details

- **Email template** will use the project's brand colors (primary: deep blue `hsl(220,70%,18%)`, accent: orange `hsl(36,100%,50%)`) on a white background.
- **Auth gating** uses `supabase.auth.getUser()` checks — no new database tables needed.
- **No RLS changes needed** — existing policies already handle bookings (public insert) and products (client-side data).

### Files to Create/Modify
- `supabase/functions/_shared/transactional-email-templates/new-booking-notification.tsx` — new template
- `supabase/functions/_shared/transactional-email-templates/registry.ts` — register template
- `src/pages/BookInstallation.tsx` — add email trigger after booking insert
- `src/pages/Checkout.tsx` — add auth check, redirect if not logged in
- `src/components/ProductCard.tsx` — auth check on "Add to Cart"
- `src/pages/ProductDetail.tsx` — auth check on "Add to Cart"
- `src/components/CartSheet.tsx` — auth check on checkout button
- `src/pages/Login.tsx` — support `redirectTo` query param
- `src/pages/Register.tsx` — support `redirectTo` query param
- `src/pages/Unsubscribe.tsx` — new unsubscribe page (required by email system)
- `src/App.tsx` — add unsubscribe route

