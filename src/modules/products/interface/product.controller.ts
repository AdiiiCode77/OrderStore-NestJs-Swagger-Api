import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/application/jwt-auth.guard';
import { ProductsService } from '../application/product.service';
import { CreateProductDto } from '../domain/dto/product.dto';

@ApiTags('Products Management')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly products: ProductsService) {}
  @Post('create')
  @ApiOperation({ summary: 'Create a new Product' })
  createpProduct(@Req() req: any, @Body() dto: CreateProductDto) {
    return this.products.create(req.user.userId, dto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get All Products Listings' })
  GetAllProducts() {
    return this.products.GetAllProducts();
  }
  @Get('adminListings')
  @ApiOperation({
    summary: 'Get All Products Listings with Owner Details (Admin Only)',
  })
  getmyproducts(@Req() req: any) {
    return this.products.GetOnlyProductsForAdmin(req.user.userId);
  }

  @Get('search/:type')
  @ApiOperation({summary: 'Search Products by Type'})
  searchByType(@Param('type') type: string) {
    return this.products.SearchProductBytype(type);
  }
}
