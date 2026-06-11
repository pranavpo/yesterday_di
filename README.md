# Yesterday Admin CMS

Production-ready static site. Upload the entire contents of this folder to your web host's public directory.

## Structure

```
yesterday-cms/
├── index.html                 Login (root entry)
├── forgot-password.html
├── verify-code.html
├── reset-password.html
├── dashboard.html
├── users.html
├── user-details.html
├── deliveries.html
├── delivery-details.html
├── subscription.html
├── categories.html
├── vehicles.html
├── messages.html
├── static.html
├── faqs.html
├── notifications.html
├── settings.html
├── 404.html
├── robots.txt
├── README.md
└── assets/
    ├── css/
    │   ├── style.css          Design system + components (~47 KB)
    │   └── responsive.css     Tablet + mobile breakpoints (~5 KB)
    ├── js/
    │   └── main.js            Vanilla JS interactions (~11 KB)
    └── images/
        ├── logo.svg           Y + "Yesterday" wordmark (login screens)
        ├── logo-mark.svg      Y icon (internal screens / sidebar)
        ├── avatar-mary.svg
        └── avatar-luke.svg
```

## Pages

All pages are at the root level, named for their section. Cross-page navigation uses plain filenames so the project is portable to any host.

| File | Section |
|---|---|
| index.html | Login |
| forgot-password.html | Forgot Password |
| verify-code.html | Verify Code (5-digit) |
| reset-password.html | Reset Password (+ success modal) |
| dashboard.html | Dashboard (stats, chart, recent deliveries) |
| users.html | User Manager (list) |
| user-details.html | User Detail (5 tabs + delete/block modals) |
| deliveries.html | Delivery Manager (filter pills + table) |
| delivery-details.html | Delivery Detail (timeline + map + photos) |
| subscription.html | Subscription & Billing (chart + donut + transactions) |
| categories.html | Category Manager (CRUD modals + toast) |
| vehicles.html | Vehicle Type Manager (CRUD + upload) |
| messages.html | Messages & Support (inbox + chat + Block flow) |
| static.html | Static Content (Terms + Privacy + edit) |
| faqs.html | FAQs (accordion + add form) |
| notifications.html | Broadcast Notifications |
| settings.html | Settings (profile + activity log + code modal) |

## Local preview

```sh
python3 -m http.server 8000
# or
npx serve .
```

Open http://localhost:8000.

## Deploy

- **Netlify / Vercel** — drag the folder onto the dashboard
- **cPanel / shared host** — upload contents to `public_html/` via FTP
- **AWS S3** — `aws s3 sync . s3://your-bucket/ --delete` then enable static-site hosting
- **Cloudflare Pages / GitHub Pages** — point the build output at this folder

## Best-practice notes baked in

- **Flat, named pages** — `dashboard.html`, `users.html`, etc.
- **Single source of truth** for CSS, JS and images.
- **Relative asset paths** — works at any sub-path.
- **Semantic HTML5** + ARIA labels on interactive controls.
- **Fully responsive** (desktop / tablet / mobile breakpoints).
- **404 page** + **robots.txt** included.
- **No build step** — pure HTML/CSS/JS, ready to upload as-is.
