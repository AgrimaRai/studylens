import assert from 'node:assert/strict';
import test from 'node:test';
import {evidenceMatches,demo} from '../lib/study.ts';
test('citation checks require matching page and quote',()=>{
 const pages=[{number:2,text:'A transaction groups several database operations.'}];
 assert.equal(evidenceMatches([{page:2,quote:'A transaction groups several database operations.'}],pages),true);
 assert.equal(evidenceMatches([{page:1,quote:'A transaction groups several database operations.'}],pages),false);
 assert.equal(evidenceMatches([{page:2,quote:'An unsupported invented sentence.'}],pages),false);
 assert.equal(evidenceMatches([],pages),false);
});
test('example quiz has four unique choices and bounded answer indices',()=>{
 for(const q of demo.questions){assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert.ok(q.correct>=0&&q.correct<4);assert.ok(q.evidence.length);}
});
