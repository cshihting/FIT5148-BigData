db.evaluation.drop()

db.evaluation.insertMany(
   [	
	{ results: [ {"item": "content", "score": 9}, {"item": "presentation", "score": 6}]},
	{ results: [ {"item": "content", "score": 8}, {"item": "presentation", "score": 8}]},
	{ results: [ {"item": "content", "score": 7}, {"item": "presentation", "score": 7}]},
	{ results: [ {"item": "content", "score": 9}, {"item": "presentation", "score": 8}]},
	{ results: [ {"item": "content", "score": 7}, {"item": "presentation", "score": 6}]},
	{ results: [ {"item": "content", "score": 7}, {"item": "presentation", "score": 9}]},
	{ results: [ {"item": "content", "score": null}, {"item": "presentation", "score": 9}]},
	{ results: [ {"item": "content", "score": 7}, {"item": "presentation", "score": null}]},
	{ results: [ {"item": "content", "score": 7}]}

   ]
)

db.evaluation.find({"results.score" : null})

db.evaluation.find({"results.item": {$exists:false}})

db.evalution.find({"results.item.1" : {$exists:false}})

# Implicit AND
db.evaluation.find({"results.item":"content","results.score":9})

# Explicit AND
db.evaluation.find({"$and":[{"results.item":"content"},{"results.score":9}])

# element match
db.evaluation.find({results: {$elemMatch:{"item":"content","score":9}}}).count()

#########################################################################################
db.item.drop()

db.item.insertMany(
   [	
	{ "name":"small_nail","qty":25,"size":2},
	{ "name":"medium_nail","qty":15,"size":4},	
	{ "name":"big_nail","qty":25,"size":6},
	{ "name":"hammer","qty":2},
	{ "name":"screw","qty":40},
	{ "name":"ladder","qty":1}  
    ]
)
# Implicit AND
db.item.find({"size":{"$exists":true}, "size":{"$lt":5}}).pretty()

db.item.find({"size":{"$exists":false}, "qty":{"$lt":5}}).pretty()

# produces incorrect result
db.item.find({"size":{"$exists":false}, "size":{"$lt":5}}).pretty()


# Explicit AND
db.item.find({"$and":[{"size":{"$exists":true}}, {"size":{"$lt":5}}]}).pretty()

db.item.find({"$and":[{"size":{"$exists":false}}, {"qty":{"$lt":5}}]}).pretty()

# produces correct result
db.item.find({"$and":[{"size":{"$exists":false}}, {"size":{"$lt":5}}]}).pretty()
#######################################################################################
db.pets.drop()
db.pets.insertMany([{name: "Mikey", species: "Gerbil"},
{name: "Davey Bungooligan", species: "Piranha"},
{name: "Suzy B", species: "Cat"},
{name: "Mikey", species: "Hotdog"},
{name: "Terrence", species: "Sausagedog"},
{name: "Philomena Jones", species: "Cat"}])


# match and project 
db.pets.aggregate([{"$match":{"species": "Cat"}}, {"$project": {"_id":0, "name":1}}])

# find and project
db.pets.find({"species": "Cat"}, {"_id":0, "name":1})

db.pets.updateOne({"name": "Mikey"}, {"$set":{"species": "Cat"}})

db.pets.updateMany({"species": "Cat"}, {"$set":{"species": "Dog"}})

db.pets.replaceOne({"name": "Mikey"},
{"name": "Mikey", "species": "Cat", "age": 2})

db.pets.deleteOne({"name": "Mikey"})

db.pets.deleteMany({"species": "Dog"})

db.pets.drop()

#########################################################################################
db.orders.drop()
db.orders.insert([
   { "_id" : 1, "item" : "almonds", "price" : 12, "quantity" : 2 },
   { "_id" : 2, "item" : "pecans", "price" : 20, "quantity" : 1 },
   { "_id" : 3  }])

db.inventory.drop()
db.inventory.insert([
   { "_id" : 1, "sku" : "almonds", description: "product 1", "instock" : 120 },
   { "_id" : 2, "sku" : "bread", description: "product 2", "instock" : 80 },
   { "_id" : 3, "sku" : "cashews", description: "product 3", "instock" : 60 },
   { "_id" : 4, "sku" : "pecans", description: "product 4", "instock" : 70 },
   { "_id" : 5, "sku": null, description: "Incomplete" },
   { "_id" : 6 }])

# join using $lookup operator
db.orders.aggregate([
   {
 	$lookup:
   	{
     	from: "inventory",
     	localField: "item",
     	foreignField: "sku",
     	as: "inventory_docs"
   	}
  }
]).pretty()

##############################################################################################


