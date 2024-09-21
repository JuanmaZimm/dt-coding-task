import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountriesController } from './countries/countries.controller';
import { CountriesModule } from './countries/countries.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [CountriesModule, HttpModule],
  controllers: [AppController, CountriesController],
  providers: [AppService],
})
export class AppModule {}
