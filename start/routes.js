'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

const APIV1 = 'api/v1';

// Auth routes
Route.post(`${APIV1}/register`, 'AuthController.store');
Route.post(`${APIV1}/auth`, 'AuthController.create');

// Studies routes
Route.get(`${APIV1}/studies`, 'StudyController.index').middleware('auth');
Route.get(`${APIV1}/user/studies/:id`, 'StudyController.getStudiesByUser').middleware('auth');
Route.get(`${APIV1}/studies/:id`, 'StudyController.show').middleware('auth');
Route.post(`${APIV1}/studies`, 'StudyController.store').middleware('auth');
Route.put(`${APIV1}/studies/:id`, 'StudyController.update').middleware('auth');
Route.delete(`${APIV1}/studies/:id`, 'StudyController.destroy').middleware('auth');

// Route.resource('auth', 'PropertyController')
//   .apiOnly()
//   .middleware('auth')
