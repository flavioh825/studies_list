const User = require("../../app/Models/User");

const { test, trait, after } = use('Test/Suite')('Auth registration');

trait('Test/ApiClient');

const user = use('App/Models/User');

after(async () => {
  await User.query().delete();
});

test('Registrar Usuário', async ({ client, assert }) => {
  const response = await client.post('api/v1/register').send({
    username: "flavioh825",
    name: "Flávio",
    lastname: "Henrique",
    email: "flavioh825@gmail.com",
    password: "123456"
  }).end();

  response.assertStatus(201);
  response.assertJSONSubset({
    username: "flavioh825",
    name: "Flávio",
    lastname: "Henrique",
    email: "flavioh825@gmail.com"
  });

  const user = await User.find(1);
  assert.equal(user.toJSON().email, 'flavioh825@gmail.com');

});

test('Inserir o mesmo usuário', async ({ client }) => {
  const response = await client.post('api/v1/register').send({
    username: "flavioh825",
    name: "Flávio",
    lastname: "Henrique",
    email: "flavioh825@gmail.com",
    password: "123456"
  }).end();

  response.assertStatus(400);
  response.assertJSONSubset({
    message: {
      error: 'Usuário já cadastrado'
    }
  });
});

test('Logar no sistema', async ({ client, assert }) => {
  const response = await client.post('api/v1/auth').send({
    email: "flavioh825@gmail.com",
    password: "123456"
  }).end();

  response.assertStatus(201);
  assert.isDefined(response.body.type);
  assert.isDefined(response.body.token);
});

test('Logar com o email errado', async ({client}) => {
  const response = await client.post('api/v1/auth').send({
    email: "lavioh825@gmail.com",
    password: "123456"
  }).end();

  response.assertStatus(400);
  response.assertJSONSubset({
    message: {
      error: 'Usuário não cadastrado'
    }
  });
});

test('Logar com o password errado', async ({client}) => {
  const response = await client.post('api/v1/auth').send({
    email: "flavioh825@gmail.com",
    password: "12345"
  }).end();

  response.assertStatus(401);
  response.assertJSONSubset({
    passwordField: "password",
    authScheme: "jwt"
  });
});