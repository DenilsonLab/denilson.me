import { test } from 'node:test';
import assert from 'node:assert/strict';
import { projects } from '../src/data/projects.ts';

test('private project records cannot publish access URLs or application screenshots', () => {
  const privateProjects = projects.filter((project) => project.visibility === 'private');
  assert.ok(privateProjects.length > 0);
  for (const project of privateProjects) {
    assert.equal(project.url, undefined, project.id);
    assert.equal(project.image, undefined, project.id);
  }
});
