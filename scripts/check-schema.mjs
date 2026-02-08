const SUPABASE_URL = 'https://dpewhfmgipjympxlxwij.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwZXdoZm1naXBqeW1weGx4d2lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5Njk5OTYsImV4cCI6MjA4NTU0NTk5Nn0.ZGGpi4Rp_-RmMRRra9Kt0n_iI9h21aEYECK8FXYfr9M';
const h = { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY };

async function check() {
  const spec = await fetch(SUPABASE_URL + '/rest/v1/', { headers: h });
  const data = await spec.json();
  for (const t of ['countries', 'cities', 'destinations', 'procedures']) {
    const def = data.definitions[t];
    console.log('\n=== ' + t.toUpperCase() + ' ===');
    const req = def.required || [];
    for (const [col, info] of Object.entries(def.properties)) {
      const type = info.type || info.format || 'unknown';
      const required = req.includes(col) ? ' [REQ]' : '';
      const hasDef = (info.default !== undefined && info.default !== null) ? ' def=' + JSON.stringify(info.default) : '';
      console.log('  ' + col + ': ' + type + required + hasDef);
    }
  }
}
check();
