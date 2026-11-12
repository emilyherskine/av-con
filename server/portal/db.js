const fs = require("fs");
const path = require("path");
const Database = require("better-sqlite3");

function openDatabase(directory) {
  fs.mkdirSync(directory, { recursive: true, mode: 0o700 });
  const db = new Database(path.join(directory, "portal.sqlite"));
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  // Execute migrations first
  try {
    db.exec(`
      ALTER TABLE listings ADD COLUMN paused_at text;
      ALTER TABLE listings ADD COLUMN last_paused_reason text;
      ALTER TABLE listings ADD COLUMN renewed_count integer not null default 0;
      ALTER TABLE listings ADD COLUMN view_count integer not null default 0;
      ALTER TABLE listings ADD COLUMN last_viewed_at text;
    `);
  } catch (e) {
    // Columns may already exist, ignore errors
  }

  db.exec(`
    create table if not exists organisations (
      id text primary key, email text not null unique, name text not null,
      password_hash text, admin integer not null default 0,
      logo_id text, contact_name text, contact_phone text
    );
    create table if not exists sessions (
      token_hash text primary key, user_id text not null references organisations(id) on delete cascade,
      expires_at integer not null
    );
    create table if not exists login_tokens (
      token_hash text primary key, organisation_id text not null references organisations(id) on delete cascade,
      expires_at integer not null
    );
    create table if not exists listings (
      id text primary key, owner_id text not null references organisations(id) on delete cascade,
      title text not null, description text not null, category text not null, sector text not null,
      location text not null, application_url text not null, expires_on text,
      status text not null check (status in ('draft','pending','approved','rejected','paused')),
      paused_at text, last_paused_reason text,
      renewed_count integer not null default 0, view_count integer not null default 0, last_viewed_at text,
      created_at text not null, updated_at text not null
    );
    create table if not exists listing_history (
      id text primary key, listing_id text not null references listings(id) on delete cascade,
      action text not null check (action in ('created','edited','approved','rejected','paused','resumed','renewed','deleted','viewed')),
      changed_by text not null, old_value text, new_value text,
      created_at text not null
    );
    create table if not exists listing_metrics (
      id text primary key, listing_id text not null references listings(id) on delete cascade,
      metric_type text not null check (metric_type in ('view','click','inquiry')),
      user_country text, created_at text not null
    );
    create table if not exists files (
      id text primary key, owner_id text not null references organisations(id) on delete cascade,
      kind text not null check (kind in ('logo','photo','document')),
      file_name text not null, mime_type text not null
    );
    create table if not exists listing_files (
      listing_id text not null references listings(id) on delete cascade,
      file_id text not null references files(id) on delete cascade,
      primary key (listing_id, file_id)
    );
    create table if not exists email_logs (
      id text primary key, organisation_id text not null references organisations(id) on delete cascade,
      listing_id text references listings(id) on delete set null,
      email_type text not null check (email_type in ('magic_link','approval','rejection','expiry_reminder','weekly_digest')),
      recipient_email text not null,
      subject text not null,
      status text not null check (status in ('sent','failed','bounced')),
      error_message text,
      created_at text not null
    );
    create index if not exists idx_email_logs_org on email_logs(organisation_id);
    create index if not exists idx_email_logs_type on email_logs(email_type);
    create index if not exists idx_email_logs_created on email_logs(created_at);
    create index if not exists idx_listing_history_listing on listing_history(listing_id);
    create index if not exists idx_listing_history_action on listing_history(action);
    create index if not exists idx_listing_metrics_listing on listing_metrics(listing_id);
    create index if not exists idx_listing_metrics_created on listing_metrics(created_at);
    create index if not exists idx_listings_owner on listings(owner_id);
    create index if not exists idx_listings_status on listings(status);
    create index if not exists idx_listings_expires on listings(expires_on);
    create table if not exists locations (
      id text primary key, name text not null unique, region text, country text,
      latitude real, longitude real, listing_count integer not null default 0,
      created_at text not null
    );
    create table if not exists saved_searches (
      id text primary key, organisation_id text not null references organisations(id) on delete cascade,
      name text not null, filters text not null, sort_by text,
      created_at text not null, last_used_at text
    );
    create table if not exists search_history (
      id text primary key, query text, filters text, result_count integer,
      user_id text, created_at text not null
    );
    create index if not exists idx_locations_name on locations(name);
    create index if not exists idx_locations_region on locations(region);
    create index if not exists idx_saved_searches_org on saved_searches(organisation_id);
    create index if not exists idx_saved_searches_created on saved_searches(created_at);
    create index if not exists idx_search_history_query on search_history(query);
    create index if not exists idx_search_history_created on search_history(created_at);
  `);

  // Phase 5: Migrations for search features
  try {
    db.exec(`
      ALTER TABLE locations ADD COLUMN listing_count integer not null default 0;
      ALTER TABLE saved_searches ADD COLUMN sort_by text;
    `);
  } catch (e) {
    // Columns may already exist
  }

  // Phase 6: Analytics tables
  try {
    db.exec(`
      create table if not exists listing_analytics (
        id text primary key, 
        listing_id text not null unique references listings(id) on delete cascade,
        view_count integer not null default 0,
        click_count integer not null default 0,
        search_impressions integer not null default 0,
        conversion_rate real default 0.0,
        last_viewed_at text,
        created_at text not null,
        updated_at text not null
      );
      
      create table if not exists engagement_metrics (
        id text primary key,
        listing_id text not null references listings(id) on delete cascade,
        metric_date text not null,
        views integer default 0,
        clicks integer default 0,
        search_impressions integer default 0,
        avg_time_spent_ms integer,
        created_at text default current_timestamp,
        unique(listing_id, metric_date)
      );
      
      create table if not exists analytics_cache (
        id text primary key,
        cache_key text not null unique,
        cache_type text not null,
        cache_data text not null,
        calculated_at text not null,
        expires_at text not null,
        created_at text default current_timestamp
      );
      
      create index if not exists idx_listing_analytics_listing on listing_analytics(listing_id);
      create index if not exists idx_listing_analytics_views on listing_analytics(view_count desc);
      create index if not exists idx_listing_analytics_conversion on listing_analytics(conversion_rate desc);
      create index if not exists idx_listing_analytics_updated on listing_analytics(updated_at desc);
      create index if not exists idx_engagement_metrics_listing_date on engagement_metrics(listing_id, metric_date desc);
      create index if not exists idx_engagement_metrics_date on engagement_metrics(metric_date desc);
      create index if not exists idx_engagement_metrics_views on engagement_metrics(views desc);
      create index if not exists idx_analytics_cache_expires on analytics_cache(expires_at);
      create index if not exists idx_analytics_cache_key on analytics_cache(cache_key);
    `);
  } catch (e) {
    // Tables may already exist
  }

  // Phase 6: Update search_history with better tracking columns
  try {
    db.exec(`
      ALTER TABLE search_history ADD COLUMN organisation_id text;
      ALTER TABLE search_history ADD COLUMN results_count integer;
      ALTER TABLE search_history ADD COLUMN search_time_ms integer;
    `);
  } catch (e) {
    // Columns may already exist
  }

  // Phase 7: Featured listings
  try {
    db.exec(`
      ALTER TABLE listings ADD COLUMN is_featured integer not null default 0;
      ALTER TABLE listings ADD COLUMN featured_at text;
      ALTER TABLE listings ADD COLUMN featured_until text;
    `);
  } catch (e) {
    // Columns may already exist
  }

  try {
    db.exec(`
      create table if not exists featured_listings (
        id text primary key,
        listing_id text not null unique references listings(id) on delete cascade,
        featured_by text not null references organisations(id),
        featured_at text not null,
        featured_until text,
        reason text,
        created_at text not null
      );
      
      create index if not exists idx_featured_listings_listing on featured_listings(listing_id);
      create index if not exists idx_featured_listings_featured_by on featured_listings(featured_by);
      create index if not exists idx_featured_listings_featured_until on featured_listings(featured_until);
      create index if not exists idx_listings_is_featured on listings(is_featured);
      create index if not exists idx_listings_featured_until on listings(featured_until);
    `);
  } catch (e) {
    // Table may already exist
  }

  return db;
}

module.exports = { openDatabase };
