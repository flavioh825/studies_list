'use strict'

const User = use("App/Models/User");

class AuthController {

  async store({ request, response }) {
    try {
      const data = request.only(['username', 'name', 'lastname', 'email', 'password']);
      
      const userExists = await User.findBy('email', data.email);

      if (userExists) {
        return response.status(400)
          .send({ message: { error: 'Usuário já cadastrado' } });
      }

      const user = await User.create(data);
      return response.status(201).send(user);

    }catch(err) {
      return response.status(err.status).send(err);
    }
  }

  async create({auth, request, response}) {
    try {
      const { email, password } = request.all();

      const userExists = await User.findBy('email', email);

      if (!userExists) {
        return response.status(400)
          .send({ message: { error: 'Usuário não cadastrado' } });
      }

      const token = await auth.attempt(email, password);
      return response.status(201).send(token);
    }catch(err) {
      return response.status(err.status).send(err);
    }
  }
}

module.exports = AuthController
