ALTER TABLE legal_contracts
RENAME TO legal_contacts;

ALTER TABLE legal_contacts
DROP COLUMN contract_key,
DROP COLUMN subtitle;
