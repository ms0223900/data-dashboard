---
name: develop-lead-collector
description: Implements the customer lead collector with Next.js, Supabase (leads and events), and admin Dashboard. Use when building or modifying project features.
---

# Develop Lead Collector

## Development Flow

1. Check `docs/spec.md` before changing behavior.
2. Implement validation first: email must be in a valid format; required fields must not be empty.
3. Fetch dashboard metrics by executing SQL queries / aggregations on `analytics_events` and `leads` in Supabase; do not use static mock statistics in production.
4. Track visitor events (`page_view`, `cta_click`, `form_submit_success`, `form_submit_error`) securely, passing a client-generated `session_id` and associating `lead_id` on submission success.
5. Keep sensitive keys like `SUPABASE_SERVICE_ROLE_KEY` strictly on the server-side.
6. Run the available package scripts after changes and report any missing environment variables.

## MVP Boundaries

- Do not add true AI API integrations, automatic email sending, payment gateways, GA4/GTM integrations, or complex multi-tenant admin dashboards without an explicit request.
- Ensure the waitlist form handles errors gracefully by displaying clear, red, Traditional Chinese messages.
- Always perform analytics event logging asynchronously and gracefully, ensuring a tracking error does not break the core user experience or block form submission.
