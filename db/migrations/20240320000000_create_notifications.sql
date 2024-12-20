CREATE TYPE notification_type AS ENUM (
  'platform_update',
  'comment_tag',
  'access_granted',
  'join_workspace'
);

CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  "type" notification_type NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  person_name VARCHAR(255), -- nullable for platform_update
  release_number VARCHAR(255), -- nullable for non-platform_update
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  -- Ensure either person_name or release_number is set based on type
  CONSTRAINT valid_notification_data CHECK (
    ("type" = 'platform_update' AND release_number IS NOT NULL AND person_name IS NULL) OR
    ("type" != 'platform_update' AND person_name IS NOT NULL AND release_number IS NULL)
  )
); 