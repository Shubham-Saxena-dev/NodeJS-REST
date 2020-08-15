# NodeJS-REST
NodeJS-Express-Joi-REST

# Rest Api designed using NodeJs, Express and Joi libraries

Run on http://localhost:8030

#GET REQUEST

/getAllUsers => will get all users in userDetails.json

/getUser/:id => will get user matching the params id

#POST REQUEST

/add => will add a new user

request body =:  
{
       "name" : "userName",
       "password" : "userPass",
       "profession": "userProfession"
}

all these attributes are required

#PUT REQUEST

/updateUser/:id => will update user based on params id

request body =:  
{
       "name" : "userName",
       "password" : "userPass",
       "profession": "userProfession"
}

all these attributes are optional

#DELETE REQUEST

/deleteUser/:id => will delete the user matching the params id

Basic refactoring is yet to be done. However, all aforementioned requests works fine.
