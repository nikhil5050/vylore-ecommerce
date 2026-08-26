// Backend inventory rows carry no per-product low-stock threshold, so the
// admin UI applies one fixed threshold everywhere it needs to bucket stock
// levels (product list, inventory list).
export const LOW_STOCK_THRESHOLD = 5;
