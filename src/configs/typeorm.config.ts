import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 8082,
  username: 'sa',
  password: '',
  database: 'test',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
}