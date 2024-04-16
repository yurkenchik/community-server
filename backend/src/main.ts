import * as process from "process";
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function start() {
    const PORT = process.env.PORT || 8081
    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder()
        .setTitle("Advanced backend on nest.js course")
        .setDescription("Rest API documentation")
        .setVersion("1.0.0")
        .addTag("Yuriy")
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup("/api/docs", app, document)

    await app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`))
}

start()