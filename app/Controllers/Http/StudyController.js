'use strict'

const User = use("App/Models/User");
const Study = use("App/Models/Study");

class StudyController {

  async index({ auth, response }) {
    const user = await auth.getUser();
    const studies = await user.studies().fetch();
    return response.status(200).send(studies);
  }

  async getStudiesByUser({ response, params}) {
    const user = await User.find(params.id);
    const studies = await user.studies().where('visible', true).fetch();
    return response.status(200).send(studies);
  }

  async store({ auth, request, response }) {
    try {
      const user = await auth.getUser();
      let data = request.only(['name', 'description', 'display_in_status', 'visible']);
      
      const study = await Study.create({...data, user_id: user.id});
      return response.status(201).send(study);
    }catch(err) {
      return response.status(err.status).send(err);
    }
  }

  async show({ auth, params, response }) {
    try {
      const user = await auth.getUser();
      const study = await Study.find(params.id);

      if(study.user_id !== user.id && !study.visible) {
        return response.status(400)
          .send({ message: { error: 'Você não tem autorização para fazer esta ação' } });
      }

      return response.status(200).send(study);
    }catch(err) {
      return response.status(400).send(err);
    }
  }

  async update ({ auth, params, request, response }) {
    try {
      const study = await Study.find(params.id);
      const user = await auth.getUser();

      if(study.user_id !== user.id) {
        return response.status(400)
          .send({ message: { error: 'Você não tem autorização para fazer esta ação' } });
      }

      let data = request.only(['name', 'description', 'display_in_status', 'visible']);

      study.name = data.name;
      study.description = data.description;
      study.display_in_status = data.display_in_status;
      study.visible = data.visible;

      let updated = await study.save();
      return response.status(200).send({updated});
    }catch(err) {
      return response.status(400).send(err);
    }
  }

  async destroy ({ auth, params, response }) {
    try {
      const study = await Study.find(params.id);
      const user = await auth.getUser();

      if(study.user_id !== user.id) {
        return response.status(400)
          .send({ message: { error: 'Você não tem autorização para fazer esta ação' } });
      }

      let deleted = await study.delete();

      return response.status(200).send({deleted});
    }catch(err) {
      return response.status(400).send(err);
    }
  }
}

module.exports = StudyController
