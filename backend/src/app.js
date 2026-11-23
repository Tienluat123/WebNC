import express from 'express';
import { createPlacesService, Problem } from './places.js';

export function createApp(options) {
  const listPlaces = createPlacesService(options);
  const app = express();
  app.disable('x-powered-by');
  app.enable('case sensitive routing');
  app.enable('strict routing');
  app.get('/places', async (req, res) => {
    // URLSearchParams preserves duplicate names and does not interpret bracket notation.
    const params = new URL(req.originalUrl, 'http://localhost').searchParams;
    res.set('Cache-Control', 'no-store').status(201).json(await listPlaces(params));
  });
  app.use((err, req, res, next) => {
    if (res.headersSent) return next(err);
    const problem =
      err instanceof Problem
        ? err.body
        : {
            type: '/problems/internal',
            title: 'Internal error',
            status: 500,
            detail: 'The request could not be completed.',
          };
    res
      .set('Cache-Control', 'no-store')
      .status(problem.status)
      .type('application/problem+json')
      .json(problem);
  });
  return app;
}
