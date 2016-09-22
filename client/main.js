import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

const Collection = new Mongo.Collection(null);

window.Collection = Collection;

for (let i = 0; i < 10; i++) {
  if (i === 5) continue;
  Collection.insert({value: i});
}

Template.collection.helpers({
  collection() {
    return Collection.find({}, {sort: {value: 1}});
  },
});

Template.collection.events({
  'click button'(event, instance) {
    Collection.insert({value: 5});
  },
});

Template.item.helpers({
  something(value) {
    return 'a' + value;
  },
});