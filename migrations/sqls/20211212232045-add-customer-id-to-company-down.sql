ALTER TABLE companies
DROP COLUMN IF EXISTS customer_id,
DROP COLUMN IF EXISTS payment_set_date,
DROP COLUMN IF EXISTS payment_method;
