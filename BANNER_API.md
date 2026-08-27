# Offer Banners API — backend contract

The homepage "offer banner" section (`src/components/home/OfferBanner.tsx`) and
the admin CRUD UI (`src/app/admin/offers/banners/`) are built and ready, but
the backend (`api.vylore.in`, FastAPI) has no `/banners` endpoint yet. Until
it exists, the admin list page shows "Offer banners aren't connected yet" and
the homepage section simply doesn't render. This is the contract the frontend
already expects — implement it as-is and both surfaces go live with no
frontend changes.

Image uploads already work today via the existing `/admin/media` endpoints
(`GET /admin/media/upload-auth` + `POST /admin/media`) — a banner record just
needs to reference the resulting `url`.

## Data model

| field       | type    | notes                                      |
|-------------|---------|---------------------------------------------|
| id          | int     |                                             |
| image_url   | string  | required                                   |
| title       | string? | internal reference only, not shown on-page |
| link_url    | string? | where the banner links when clicked        |
| sort_order  | int     | ascending display order, default 0         |
| is_active   | bool    | default true                               |
| created_at  | datetime|                                             |

## Admin endpoints (auth required)

- `GET /api/v1/admin/banners` → `BannerOut[]`, all banners, any active state.
- `POST /api/v1/admin/banners` — body: `{ image_url, title?, link_url?, sort_order?, is_active? }` → `BannerOut`, 201.
- `PATCH /api/v1/admin/banners/{id}` — same body, all fields optional → `BannerOut`.
- `DELETE /api/v1/admin/banners/{id}` → 204.

## Public endpoint (no auth)

- `GET /api/v1/banners` → `BannerOut[]` (only `id`, `image_url`, `title`, `link_url` needed), filtered to `is_active = true`, sorted by `sort_order` ascending.

## Frontend files already wired to this contract

- `src/services/admin/banner.service.ts` / `src/services/banner.service.ts` — request/response mapping.
- `src/lib/admin/api.ts` — `getBanners`, `createBanner`, `updateBanner`, `deleteBanner`.
- `src/app/admin/offers/banners/{page,add/page,edit/page}.tsx` — admin CRUD UI.
- `src/components/admin/{BannerForm,BannerImageUploader}.tsx`.
- `src/components/home/OfferBanner.tsx` — storefront section, rendered on `src/app/page.tsx` right after `CategoryGrid`.
