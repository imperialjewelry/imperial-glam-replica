-- Fix the incorrect price ID in the Exotic Cross Link Chain lengths_and_prices
UPDATE chain_products 
SET lengths_and_prices = '[{"price": 220000, "length": "22\"", "stripe_price_id": "price_1S0rQIHbDyHkNBUCQv6V0uKV"}]'::jsonb
WHERE name LIKE '%Exotic Cross Link Chain%' 
AND lengths_and_prices::text LIKE '%price_1S0rQIHbDyHkNBUCQv6VouKV%';