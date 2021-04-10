'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

const APIV1 = 'api/v1';

// Auth routes
Route.post(`${APIV1}/register`, 'AuthController.store');
Route.post(`${APIV1}/auth`, 'AuthController.create');

// Route.resource('auth', 'PropertyController')
//   .apiOnly()
//   .middleware('auth')
