-- Get form data for specific user
SELECT fva.*
FROM form_voice_agent fva
JOIN auth.users u ON fva.user_id = u.id
WHERE u.email = 'fddf36907@gmail.com';