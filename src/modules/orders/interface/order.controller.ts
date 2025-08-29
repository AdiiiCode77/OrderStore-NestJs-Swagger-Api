import { Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/modules/auth/application/jwt-auth.guard";
import { OrderService } from "../application/order.service";

@ApiTags('Orders Management')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrderController{
 constructor(private readonly orderService: OrderService ){}
@Post("Create-Order/:id")
@ApiOperation({summary:"Create Order By User With Order Id (For Swagger)"})
createOrder(@Req() req: any, @Param('id') id: number){
    return this.orderService.createOrder(id, req.user.userId);
}

@Get('get-my-orders')
@ApiOperation({summary: "Get All the Users Orders"})
getOrders(@Req() req: any){
    return this.orderService.getOrders(req.user.userId);
}

@Get('All-orders-admin-only')
@ApiOperation({summary: "Get All the Orders (Admin Only)"})
getAllOrders(@Req() req: any){
    const usertype = req.user.type;
    return this.orderService.getAllOrders(usertype);
}
}