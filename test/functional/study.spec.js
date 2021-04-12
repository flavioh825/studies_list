const { test, trait, after } = use('Test/Suite')('Study');

trait('Test/ApiClient');
trait('Auth/Client')

const Database = use('Database');

const User = use('App/Models/User');
const Study = use('App/Models/Study');

after(async () => {
  User.query().delete();
  Study.query().delete();
});

test('Teste listagem visível para outros usuários', async ({ client, assert }) => {

  const user = await User.find(1);

  await Study.create({
    name: "SOLID",
    description: "Estudo de funcionalidade da ferramenta",
    display_in_status: true,
    visible: true,
    user_id: user.id
  });

  await Study.create({
    name: "Javascript",
    description: "Estudo de funcionalidade da ferramenta",
    display_in_status: true,
    visible: false,
    user_id: user.id
  });

  const response = await client.get('api/v1/user/studies/' + user.id)
    .loginVia(user, 'jwt').end();

  response.assertStatus(200);
  assert.isArray(response.body);
  assert.equal(response.body.length, 1);
});

test('Teste listagem visível somente para o dono da lista', async ({ client, assert }) => {

  const user = await User.find(1);

  const response = await client.get('api/v1/studies')
    .loginVia(user, 'jwt').end();

  response.assertStatus(200);
  assert.isArray(response.body);
  assert.equal(response.body.length, 2);
});

test('Teste de retorno de um item (show)', async ({ client, assert }) => {

  const user = await User.find(1);

  const response = await client.get('api/v1/studies/1')
    .loginVia(user, 'jwt').end();

  response.assertStatus(200);
  response.assertJSONSubset({
    name: "SOLID",
    description: "Estudo de funcionalidade da ferramenta",
    display_in_status: true,
    visible: true,
    user_id: user.id
  });
  assert.isObject(response.body);
});

test('Teste de inserção', async ({ client, assert }) => {

  const user = await User.find(1);

  const response = await client.post('api/v1/studies').send({
    name: "Ruby",
    description: "Estudo de funcionalidade da ferramenta",
    display_in_status: true,
    visible: true,
    user_id: user.id
  })
  .loginVia(user, 'jwt').end();

  response.assertStatus(201);
  response.assertJSONSubset({
    name: "Ruby",
    description: "Estudo de funcionalidade da ferramenta",
    display_in_status: true,
    visible: true,
    user_id: user.id
  });
  assert.isObject(response.body);

  const study = await Study.find(response.body.id);

  assert.equal(study.name, "Ruby");
});

test('Teste de atualização', async ({ client, assert }) => {

  const user = await User.find(1);
  let study = await Study.find(3);

  const response = await client.put('api/v1/studies/' + study.id).send({
    name: "Ruby On Rails",
    description: "Estudo de funcionalidade da ferramenta",
    display_in_status: true,
    visible: true,
    user_id: user.id
  })
  .loginVia(user, 'jwt').end();

  response.assertStatus(200);
  response.assertJSONSubset({ updated: true });

  study = await Study.find(study.id);
  
  assert.equal(study.name, "Ruby On Rails");
});

test('Teste de exclusão', async ({ client, assert }) => {

  const user = await User.find(1);

  const response = await client.delete('api/v1/studies/3')
    .loginVia(user, 'jwt').end();

  response.assertStatus(200);
  response.assertJSONSubset({deleted: true});

  const study = await Study.find(3);
  
  assert.isNull(study);
});