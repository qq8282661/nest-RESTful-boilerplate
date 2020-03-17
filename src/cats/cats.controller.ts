import { Body, Controller, Get, Param, Post, UseGuards, UseInterceptors, Inject } from '@nestjs/common';
import { WeChatNativePayService } from '@notadd/addon-pay';
import { ConfigService } from '@nestjs/config';

import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class CatsController {
    constructor(
        private readonly catsService: CatsService,
        private configService: ConfigService,
        @Inject(WeChatNativePayService) private readonly weChatNativePayService: WeChatNativePayService,
    ) {}

    @Post()
    @Roles('admin')
    async create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto);
        return createCatDto;
    }

    @Get()
    async findAll() {
        // await new Promise((resolve) => {
        //     setTimeout(() => {
        //         resolve();
        //     }, 1000);
        // });
        // const a = 1 / 0;
        // // console.log('a', a);
        // return this.catsService.findAll();
        // const result = await this.weChatNativePayService.pay({
        //     body: '支付一下',
        //     out_trade_no: '201811271512000001',
        //     total_fee: 301,
        //     spbill_create_ip: '127.0.0.1', // 支付请求方IP
        //     notify_url: 'your.domain.com/payment/wechat_order_notify', // 服务端支付通知地址
        //     trade_type: WeChatTradeType.NATIVE,
        // });
        const result: any = {};
        result.appId = this.configService.get('appId');
        result.privateKey = this.configService.get('privateKey');
        console.log(result);
        return result;
    }

    @Get(':id')
    findOne(
        @Param('id', new ParseIntPipe())
        id,
    ) {
        // logic
    }
}
