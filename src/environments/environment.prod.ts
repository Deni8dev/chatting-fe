import env from '@env/.env';

export const environment = {
  production: true,
  version: env.app_version,
  default_language: 'en-US',
  supported_languages: ['en-US'],
  socket_endpoint: 'http://localhost:3100'
};
