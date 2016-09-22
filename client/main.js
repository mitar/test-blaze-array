import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

const Collection = new Mongo.Collection(null);

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

Meteor.startup(() => {
  const observer = new MutationObserver((mutations) => {
    for (let mutation of mutations) {
      console.log(mutation);
    }
  });
 
  observer.observe(document.body, {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true
  });
});