## design decisions

### database:

1. i have taken name column data type as varchar not text because product
name is generally short.
2. price column data type is numeric since we want to store exact price.
2. i have used timestampz data type for created_at and updated at fileds
because it will save all time in common utc format.

