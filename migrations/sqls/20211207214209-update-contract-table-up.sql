ALTER TABLE legal_contacts
RENAME TO legal_contracts;

ALTER TABLE legal_contracts
ADD COLUMN contract_key VARCHAR(32),
ADD COLUMN subtitle VARCHAR(512);

INSERT INTO legal_contracts (body, created_date, title, subtitle, version, contract_key)
VALUES (
	'I AGREE TO PAY 10% STARTING SALARY AT TIME OF HIRE. By clicking Confirm you are agreeing to Rysolv''s Terms of Service, Privacy Policy, and agree to reach out to candidates you see on Rysolv only through the Rysolv platform.',
	'2021-12-07 12:00:00.000',
	'Startup agreement',
  'Create positions and match with candidates for free. You''ll only pay after a successful hire.',
	0,
	'startup'
);

INSERT INTO legal_contracts (body, created_date, title, subtitle, version, contract_key)
VALUES (
	'I AGREE TO PAY 10% STARTING SALARY AT TIME OF HIRE. By clicking Confirm you are agreeing to Rysolv''s Terms of Service, Privacy Policy, and agree to reach out to candidates you see on Rysolv only through the Rysolv platform.',
	'2021-12-07 12:00:00.000',
	'Standard agreement',
  '0% placement fees. Full access to candidates.',
	0,
	'standard'
);

INSERT INTO legal_contracts (body, created_date, title, subtitle, version, contract_key)
VALUES (
	'I AGREE TO PAY 10% STARTING SALARY AT TIME OF HIRE. By clicking Confirm you are agreeing to Rysolv''s Terms of Service, Privacy Policy, and agree to reach out to candidates you see on Rysolv only through the Rysolv platform.',
	'2021-12-07 12:00:00.000',
	'Enterprise agreement',
  '0% placement fees. Unlimited hires.',
	0,
	'enterprise'
);
