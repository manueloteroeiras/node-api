# Scholas Citizenship API

Api rest with NodeJS and MongoDb

# Models

  - User
  - Post
  - Community
  - Comments
  - Images
  
> clone the project
> npm install or yarn install
> Set up your `.env` file with MONGODB_URI and PORT
> npm start
> Test your API `curl -d http://localhost:8080/version`


## Methods

### User

`GET   --> '/api/users'`
Devuelve listados de usuarios registrados en la base de datos
#### Response
```
    users : []    
```

`POST  --> '/api/users/changepsw/:id' methods.changepsw`
Cambia la password del usuario. (id --> ID del usuario en cuestion)
#### Body
```
    { 
        password: 'String'
    }
```

#### Response
```
    { 
        ok : true / false 
    }
```

`GET   --> '/api/users/:id'`
Devuelve un usuario especifico (id --> ID de usuario)
#### Response
```
    user : {}    
```
`POST  --> '/api/users'`
Se utiliza para crear un usuario nuevo
#### Body (obligatorio)
```
    { 
        email: 'String',
        lastName : 'String'
        firstName: 'String'
        password: 'String'
    }
```

#### Response
```
{
  "results": [
    {
      "_id": "5902368fc2e89772ccb64d47",
      "email": "student@bitflowlabs.com",
      "hashedPassword": "vl7JFngvBOV4fg9l1Jvt+eiccYXYzwl24TE+t+Xk OsS5YjPZbt1GuiA+g==",
      "salt": "4hNh/jZezstI7RmOeH0zmg==",
      "firstName": "Demo",
      "lastName": "Bitflowlabs",
      "__v": 0,
      "facebook": null,
      "community": null,
      "createdOn": "2017-04-27T18:21:03.296Z",
      "role": "user"
    },
 ],
  "totalItems": 1,
  "totalPages": 1
}
```

`PUT   --> '/api/users/:id'`
Actualizaar informacion del usuario (nombre, apellido, comunidad, etc..)
#### Body -- Datos que se actualizaran
```
    { 
        email: 'String',
        lastName : 'String'
        firstName: 'String'
    }
```
#### Response (datos actualizados)
```
    {
      "_id": "5902368fc2e89772ccb64d47",
      "email": "student@bitflowlabs.com",
      "hashedPassword": "vl7JFngvBOV4fg9l1Jvt+eiccYXYzwl24TE+t+Xk OsS5YjPZbt1GuiA+g==",
      "salt": "4hNh/jZezstI7RmOeH0zmg==",
      "firstName": "Demo",
      "lastName": "Bitflowlabs",
      "__v": 0,
      "facebook": null,
      "community": null,
      "createdOn": "2017-04-27T18:21:03.296Z",
      "role": "user"
    },
```

`POST  --> '/api/users/delete/:id'`
Elimina un usuario en particular. quien ejecute este metodo debe ser Role `Admin`
#### Response
```
    { 
        ok : true / false 
    }
```
`PUT   --> '/api/users/resetpsw/:email'`
Inicia el proceso para resetear la password. 
#### Response
```
    { 
        ok : true / false 
    }
```
***
***
***

# Posts

`GET   --> '/api/posts'`
Devuelve listados de posts registrados en la base de datos
#### Response
```
    posts : []    
```

`GET  --> '/api/posts/:id'`
Devuelve todos los posts pertenecientes a una comunidad

#### Response
```
    { 
        posts : []
    }
```


`POST --> '/api/posts'`
Para crear un post nuevo
#### Body
```
    { 
        text : 'Texto del post',
        images: [ "Array de imagenes que el usuario cargo" ],
        community: ID de la comunidad del usuario,
        likes: 0,
        comments: [],
    }
```
#### Response
devuelve el post cargado recientemente
```
    { 
        text : 'Texto del post',
        images: [ "Array de imagenes que el usuario cargo" ],
        community: ID de la comunidad del usuario,
        likes: 0,
        comments: [],
    }
```

`PUT  --> '/api/posts/:id'`
Para modificar un post existente (id --> ID del post)
#### Body
```
    { 
        text : 'Nuevo texto del post',
        images: [ "Array de imagenes que el usuario cargo" ],
        community: ID de la comunidad del usuario,
        likes: 0,
        comments: [],
    }
```
#### Response
devuelve el post cargado recientemente
```
    { 
        text : 'Nuevo texto del post',
        images: [ "Array de imagenes que el usuario cargo" ],
        community: ID de la comunidad del usuario,
        likes: 0,
        comments: [],
    }
```

`POST --> '/api/posts/delete/:id'`
Elimina un post, que pertenzca al usuario que lo esta borrando
#### Body
```
    { 
        userId : userID
    }
```
#### Response
```
    { 
        ok : true / false
    }
```

