import env from '@env/.env';

export const environment = {
  production: true,
  version: env.npm_package_version,
  serverUrl: '',
  defaultLanguage: 'en-US',
  supportedLanguages: ['en-US'],
  SOCKET_ENDPOINT: 'http://localhost:3000'
};
