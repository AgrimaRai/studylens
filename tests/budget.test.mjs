import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {RESERVE_SQL} from '../lib/budget.ts';
test('shared budget enforces minute/day caps and UTC rollovers',()=>{
 const db = new DatabaseSync(':memory:');
 db.exec('CREATE TABLE generation_budget (key TEXT PRIMARY KEY, day TEXT NOT NULL, day_count INTEGER NOT NULL, minute TEXT NOT NULL, minute_count INTEGER NOT NULL)');
 const reserve = (day,minute) => !!db.prepare(RESERVE_SQL).get(day,minute);
 assert.equal(reserve('2026-10-29','2026-10-29T01:00'),true);
 assert.equal(reserve('2026-10-29','2026-10-29T01:00'),true);
 assert.equal(reserve('2026-10-29','2026-10-29T01:00'),false);
 for(let n=1;n<=14;n++) for(let j=0;j<2;j++) assert.equal(reserve('2026-10-29',`2026-10-29T01:${String(n).padStart(2,'0')}`),true);
 assert.equal(reserve('2026-10-29','2026-10-29T02:00'),false);
 assert.equal(db.prepare('SELECT day_count FROM generation_budget').get().day_count,30);
 assert.equal(reserve('2026-10-30','2026-10-30T00:00'),true);
 assert.equal(db.prepare('SELECT day_count FROM generation_budget').get().day_count,1);
 db.close();
});
