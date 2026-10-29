// One atomic UPSERT protects the shared allowance across Worker instances.
// Only aggregate counters are stored, never user identifiers or PDF text.
export const RESERVE_SQL = `INSERT INTO generation_budget
 (key, day, day_count, minute, minute_count) VALUES ('global', ?, 1, ?, 1)
 ON CONFLICT(key) DO UPDATE SET
 day_count = CASE WHEN day = excluded.day THEN day_count + 1 ELSE 1 END,
 minute_count = CASE WHEN minute = excluded.minute THEN minute_count + 1 ELSE 1 END,
 day = excluded.day, minute = excluded.minute
 WHERE (day != excluded.day OR day_count < 30)
 AND (minute != excluded.minute OR minute_count < 2)
 RETURNING key`;
export async function reserveGeneration(db:D1Database, now = new Date()) {
 const utc = now.toISOString();
 return !!await db.prepare(RESERVE_SQL).bind(utc.slice(0,10),utc.slice(0,16)).first();
}
