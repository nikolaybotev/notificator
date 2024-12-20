-- Index for filtering unread notifications
CREATE INDEX idx_notifications_is_read ON notifications(is_read) WHERE NOT is_read;

-- Index for ordering notifications by creation date
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC); 