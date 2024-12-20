INSERT INTO notifications ("type", is_read, person_name, release_number, created_at) 
VALUES
  -- Platform updates
  ('platform_update', false, NULL, '2.1.0', NOW() - INTERVAL '1 hour'),
  ('platform_update', true, NULL, '2.0.0', NOW() - INTERVAL '2 days'),
  
  -- Comment tags
  ('comment_tag', false, 'Sarah Wilson', NULL, NOW() - INTERVAL '30 minutes'),
  ('comment_tag', true, 'John Smith', NULL, NOW() - INTERVAL '1 day'),
  ('comment_tag', false, 'Mike Johnson', NULL, NOW() - INTERVAL '2 hours'),
  
  -- Access granted
  ('access_granted', false, 'Emma Davis', NULL, NOW() - INTERVAL '45 minutes'),
  ('access_granted', true, 'Alex Brown', NULL, NOW() - INTERVAL '3 days'),
  
  -- Workspace joins
  ('join_workspace', false, 'David Lee', NULL, NOW() - INTERVAL '15 minutes'),
  ('join_workspace', true, 'Rachel Green', NULL, NOW() - INTERVAL '4 days'),
  ('join_workspace', false, 'Chris Taylor', NULL, NOW() - INTERVAL '1 hour'); 