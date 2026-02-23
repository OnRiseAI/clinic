
# RalfyIndex Integration

Integration with the [RalfyIndex API](https://api.ralfyindex.com) for URL indexing.

## Configuration

Add the following to your `.env.local`:

```bash
RALFYINDEX_API_KEY="your-api-key"
RALFYINDEX_SUBMIT_TOKEN="your-internal-token"
```

## Internal API Endpoints

All endpoints are `POST`.

### 1. Status Check
Returns the current API status.

**Endpoint:** `/api/ralfyindex/status`

**Example:**
```bash
curl -X POST http://localhost:3000/api/ralfyindex/status
```

### 2. Balance
Returns your current credit balance. Protected by `RALFYINDEX_SUBMIT_TOKEN`.

**Endpoint:** `/api/ralfyindex/balance`

**Example:**
```bash
curl -X POST http://localhost:3000/api/ralfyindex/balance \
  -H "Authorization: Bearer your-internal-token"
```

### 3. Create Project
Submits URLs for indexing. Protected by `RALFYINDEX_SUBMIT_TOKEN`.

**Endpoint:** `/api/ralfyindex/project`

**Payload:**
```json
{
  "projectName": "My Project",
  "urls": ["https://example.com/page1", "https://example.com/page2"]
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/ralfyindex/project \
  -H "Authorization: Bearer your-internal-token" \
  -H "Content-Type: application/json" \
  -d '{
    "projectName": "Daily Indexing",
    "urls": ["https://meetyourclinic.com/tr/procedures/rhinoplasty"]
  }'
```

## Error Handling

The API returns standard error codes:
- `401 Unauthorized`: Missing or incorrect submit token.
- `400 Invalid request`: Validation errors (missing URLs, malformed URLs).
- `520 Bad Gateway`: Errors returned from the RalfyIndex provider.
