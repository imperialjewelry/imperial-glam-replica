
-- Update grillz products with the provided Stripe price IDs
-- Assuming we want to distribute these 3 price IDs across the existing grillz products
UPDATE grillz_products 
SET stripe_price_id = CASE 
  WHEN ROW_NUMBER() OVER (ORDER BY created_at) % 3 = 1 THEN 'price_1RnLvLHbDyHkNBUCQlSWOc4O'
  WHEN ROW_NUMBER() OVER (ORDER BY created_at) % 3 = 2 THEN 'price_1RnLtuHbDyHkNBUCxs3vmyfL'
  ELSE 'price_1RnLvLHbDyHkNBUCQlSWOc4O'
END
WHERE stripe_price_id IS NULL OR stripe_price_id = '';

-- If you want to assign specific price IDs to specific products, you can replace the above with:
-- UPDATE grillz_products SET stripe_price_id = 'price_1RnLvLHbDyHkNBUCQlSWOc4O' WHERE name LIKE '%specific product name%';
-- UPDATE grillz_products SET stripe_price_id = 'price_1RnLtuHbDyHkNBUCxs3vmyfL' WHERE name LIKE '%another product name%';
-- etc.
