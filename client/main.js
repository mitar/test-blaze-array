import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

const Collection = new Mongo.Collection(null);

window.Collection = Collection;

for (let i = 0; i < 10; i++) {
  if (i === 5) continue;
  Collection.insert({value: {a: i}});
}

Template.collection.helpers({
  collection() {
    return Collection.find({}, {sort: {'value.a': 1}, fields: {value: 1, test: 1}});
  },
});

Template.collection.events({
  'click button'(event, instance) {
    Collection.insert({value: {a: 5}});
  },
});

Template.item.helpers({
  something(value) {
    return 'a' + value;
  },
});