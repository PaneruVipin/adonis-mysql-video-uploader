/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";
import Application from "@ioc:Adonis/Core/Application";
// import { extname } from 'path'
/**
 *
 */
Route.get("/", async () => {
  return { hello: "world" };
});

Route.post("post/*", async ({ request }) => {
  const BASE_URL = request.protocol() + "://" + request.host();
  const path = request.url();
  const file = request.file("file");
  const name = new Date().getTime() + "." + file?.extname;
  await file?.move(Application.tmpPath(path), {
    name,
    overwrite: true,
  });
  return {
    URL: BASE_URL + path+"/" + name,
  };
});

// Route.post("download", async ({ params, response }) => {
//   const filePath = `uploads`;
//   const isExist = await Drive.exists(filePath);
//   // if (isExist) {
//     return response.download(Application.tmpPath(filePath));
//   // }
//   // console.log(Application.tmpPath());
//   // return "File does not exist";
// });
