Joys = new Mongo.Collection ('joys');

Joys.allow ({
  insert: function ( userId, doc ) {
    return !! userId;
  }
})

