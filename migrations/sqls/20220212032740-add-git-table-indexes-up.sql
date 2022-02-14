CREATE INDEX user_commit_index ON git_commits (user_id);

CREATE INDEX commit_id_index ON git_files (commit_id);
