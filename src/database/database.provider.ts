import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from '@nestjs/config';
import { Environment } from "src/common/enum";
import { ConnectionOptions } from "typeorm";
import { DynamicModule } from "@nestjs/common";

export const DatabaseProvider: DynamicModule = TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
        const isDevelopmentEnv = config.get('NODE_ENV') !== Environment.Production;

        const dbConfig = {
            type: 'mysql',
            host: config.get('DB_HOST'),
            port: +config.get('DB_PORT'),
            username: config.get('DB_USER'),
            password: config.get('DB_PASSWORD'),
            logging: config.get('DB_LOGGING'),
            database: config.get('DB_Name'),
            autoLoadEntities: true,
            synchronize: isDevelopmentEnv,
        } as ConnectionOptions;

        return dbConfig;
    }
})