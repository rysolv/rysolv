ALTER TABLE companies
ADD COLUMN customer_id VARCHAR(64) UNIQUE,
ADD COLUMN payment_set_date TIMESTAMP,
ADD COLUMN payment_method VARCHAR(128);
