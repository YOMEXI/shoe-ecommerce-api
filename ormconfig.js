const rootDir = process.env.NODE_ENV === "development" ? "src" : "build";

module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  url: process.env.DATABASE_URL,
  username: "test",
  password: "test",
  database: "test",
  synchronize: true,
  logging: false,
  entities: [rootDir + "src/entities/**/*{.ts,.js}"],
  migrations: [rootDir + "src/migrations/**/*{.ts,.js}"],
  subscribers: [rootDir + "src/subscriber/**/*{.ts,.js}"],
  cli: {
    entitiesDir: rootDir + "/entities",
    migrationsDir: rootDir + "/migrations",
    subscribersDir: rootDir + "/subscribers",
  },
};
