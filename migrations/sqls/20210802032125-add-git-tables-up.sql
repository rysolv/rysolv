CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS git_languages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    language VARCHAR(64),
    line_count INT
);

CREATE TABLE IF NOT EXISTS git_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    github_id VARCHAR(32) UNIQUE,
    github_token VARCHAR(64) UNIQUE,
    user_id UUID REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS git_repos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    github_id VARCHAR(32) UNIQUE,
    github_url VARCHAR(256),
    repo_path VARCHAR(256)
);

CREATE TABLE IF NOT EXISTS git_commits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_email VARCHAR(128),
    author_name VARCHAR(128),
    body TEXT,
    commit_date TIMESTAMP,
    commit_hash VARCHAR(128) UNIQUE,
    committer_email VARCHAR(128),
    committer_name VARCHAR(128),
    created_date TIMESTAMP,
    repo_id UUID REFERENCES git_repos(id),
    signer VARCHAR(128),
    signer_key VARCHAR(128),
    subject TEXT,
    user_id UUID REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS git_files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    commit_id UUID REFERENCES git_commits(id),
    additions INT,
    deletions INT,
    file_extension VARCHAR(64),
    file_name VARCHAR(256),
    language VARCHAR(64),
    weight SMALLINT DEFAULT 1
);

CREATE UNIQUE INDEX file_hash on git_files (commit_id, file_name);
CREATE UNIQUE INDEX user_language on git_languages (user_id, language);
