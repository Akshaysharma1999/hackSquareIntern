# hackSquareIntern

## Mongo Setup
* create folder name ```data```
* run command ```mongod --dbpath=./data```

## Run App on localhost
* In a new terminal run command ```node server.js```

## Insert(POST) 
Sample Data
``` 
{
        "category": "shoes",
        "name": "AirMax",
        "brand": "nike",
        "price": "15000",
        "discount": "20%",
        "inStock": "yes",
        "img": "img.jpg"
}

```

## Update(POST)

```
{
	"name": "AirMax",
	"brand": "NIKE"
}
```

## Delete
```
{
	"name":"AirMax"
}
```
## Query
* ```GET``` request on ```http://localhost:3000/query``` to get products array
* ```GET``` request on ```http://localhost:3000/query/recoverProducts``` to get recoverProducts array
