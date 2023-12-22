import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    development: {
      HOST: process.env.HOST,
      PORT_DATABASE: parseInt(process.env.PORT_DATABASE),
      USER_DATABASE: process.env.USER_DATABASE,
      PASSWORD_DATABASE: process.env.PASSWORD_DATABASE,
      NAME_DATABASE: process.env.NAME_DATABASE,
    }, //se obtienen las variables de entrono directamente con register de nest y no con dotenv de express
    apiKey: process.env.KEY,
    jwtSecret: process.env.JWT_SECRET,
  }; //ejemplo de variables de entrono comunes
});
