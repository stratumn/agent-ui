import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('segments-list', 'Integration | Component | segments list', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{segments-list}}`);

  assert.equal(this.$().text().trim(), 'Nothing to see here\n    No segments matched your request.');
});
