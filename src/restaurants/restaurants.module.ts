import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurants.entity';
import { CategoryResolver, RestaurantResolver } from './restaurants.resolver';
import { RestaurantService } from './restaurants.service';
import { CategoryRepository } from './repositories/category.repository';
import { TypeOrmCustomModule } from 'src/db/typeorm.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurant]),
    TypeOrmCustomModule.forCustomRepository([CategoryRepository]),
  ],
  providers: [RestaurantResolver, CategoryResolver, RestaurantService],
})
export class RestaurantsModule {}
