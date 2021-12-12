DROP TABLE IF EXISTS signed_contracts;

ALTER TABLE companies ADD COLUMN contract_accepted_date TIMESTAMP;

