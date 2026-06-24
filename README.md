# ShopHub

ShopHub is a modern React e-commerce landing and product browsing experience built with Vite, React Router, and Supabase. The app showcases a polished home page, category-based product filtering, and paginated product listings.

## Features

- Responsive landing page with hero and feature sections
- Product catalog page with category filters
- Paginated product browsing
- Supabase-backed product data
- Clean UI built with React and Tailwind-style design tokens

## Tech Stack

- React
- Vite
- React Router
- Supabase
- ESLint

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file in the project root and add your Supabase credentials:
   ```env
   VITE_PROJECT_URL=your_supabase_project_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the local URL shown by Vite in your browser.

## Scripts

- `npm run dev` - start the development server
- `npm run build` - build the app for production
- `npm run preview` - preview the production build
- `npm run lint` - run ESLint

## Project Structure

- `src/pages` - page components such as Home and Products
- `src/components` - reusable UI components
- `src/config` - Supabase client configuration
- `supabase/seed.sql` - sample database seed data

## Notes

The app expects a Supabase table named `products` with the following fields:
- `id`
- `name`
- `category`
- `price`
- `created_at`
- `updated_at`

# Design Decisions

## Dummy Data Generation

To create a table with **200,000 rows**, I used PostgreSQL's `generate_series()` function instead of a loop-based approach.

### Why not use a loop?

A loop-based approach has several drawbacks:

* It executes **200,000 individual INSERT operations**, which is inefficient.
* It involves repeated context switching between the application code and the database.

### Why `generate_series()`?

Using `generate_series()` offers several advantages:

* It generates a set of rows directly inside PostgreSQL, allowing the database to perform bulk inserts efficiently.
* It minimizes context switching because the entire operation is executed within the database.
* It reduces CPU overhead and improves overall performance compared to inserting rows one at a time.

---

## Pagination Strategy

For product pagination, I chose **cursor-based pagination** instead of offset-based pagination.

### Why not offset-based pagination?

Offset-based pagination relies on row positions. If products are inserted or deleted between requests:

* Some products may be skipped.
* Some products may appear more than once across different pages.

### Why cursor-based pagination?

Cursor-based pagination uses the last fetched record's ID as the cursor. To fetch the next page, the query retrieves the next *N* records where the ID is less than the cursor value.

This approach:

* Remains consistent even when records are inserted or deleted.
* Avoids duplicate or missing records.
* Performs better for large datasets because it doesn't require scanning and skipping a large number of rows.

---

# Possible Improvements

1. **Infinite Scrolling**

   Currently, users must click the **Next** button to load additional products. This can be improved by implementing infinite scrolling using the **Intersection Observer API**, which automatically loads more data as the user reaches the bottom of the page.

2. **Frontend Caching**

   The frontend can cache previously fetched pages to avoid making repeated API requests for the same data, resulting in a faster and smoother user experience.

---

# What I Learned

* Learned how PostgreSQL's `generate_series()` can efficiently generate large amounts of dummy data compared to loop-based insertion.
* Gained an understanding of cursor-based pagination and why it is more reliable and scalable than offset-based pagination for large datasets.
* Used Supabase for the first time to host a PostgreSQL database and learned how to:

  * Connect and query the database using Supabase APIs.
  * Configure Row Level Security (RLS) policies.
  * Fetch data efficiently from a hosted PostgreSQL instance.


