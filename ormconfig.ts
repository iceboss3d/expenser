module.exports = {
  type: process.env.CONNECTION,
  url: process.env.DATABASE_URL,
  synchronize: process.env.SYNCHRONIZE,
  entities: [process.env.ENTITIES],
  // ssl: process.env.SSL,
  // extra: {
  //   ssl: {
  //     rejectUnauthorized: false,
  //   },
  // },
};
