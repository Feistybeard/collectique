interface Config {
  API_BASE_URL: string;
}

const config: Config = {
  API_BASE_URL: import.meta.env.API_BASE_URL || 'http://localhost:3000/api/v1/',
};

export default config;
