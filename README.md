# NextJS | Shopi Me

1. Crear Base de Datos.

Es necesario crear una base de datos, en este caso se hará uso de Docker para crearla en local.

```text
docker compose up -d
```

* '-d' hace referencia a la propiedad __"detached"__ 

2. MongoDB URL

Para la conexión con la herramienta MongoDB compass se utilizara la URI de mongo, si es cloud se utilizara la URI proporcionada por mongo.

En local se hace uso de la siguiente URI:

```bash
mongodb://localhost:27017/shopimeDB
```
3. Reconstrucción de módulos.

```text
yarn install
yarn dev
```

4. Variables de entorno

Cambiar el nombre del archivo __.env.template__ a __.env__

5. Data generation

Call ```http://localhost:3000/api/seed``` to insert data in your Mongoose Database.

6. Cloudinary || AWS S3 Bucket || Firebase Storage