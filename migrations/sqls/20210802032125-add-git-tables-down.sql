DROP TABLE IF EXISTS git_commits CASCADE;
DROP TABLE IF EXISTS git_files CASCADE;
DROP TABLE IF EXISTS git_languages CASCADE;
DROP TABLE IF EXISTS git_organizations CASCADE;
DROP TABLE IF EXISTS git_repos CASCADE;
DROP TABLE IF EXISTS git_users CASCADE;

DROP EXTENSION IF EXISTS "uuid-ossp";
DROP INDEX IF EXISTS file_hash;
DROP INDEX IF EXISTS user_language;
