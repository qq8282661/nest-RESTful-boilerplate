import { Body, Controller, Get, Param, Post, UseGuards, UseInterceptors, Inject, Logger } from '@nestjs/common';
import { WeChatNativePayService, AliPayService } from '@huazai5m/nt-addon-pay';
import { ConfigService } from '@nestjs/config';
// import AlipaySdk from 'alipay-sdk';

import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';
import { WeChatUtil } from '@jianghohwason/nt-addon-wechatapi';

@Controller('cats')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class CatsController {
    constructor(
        private readonly catsService: CatsService,
        private configService: ConfigService,
        @Inject(WeChatNativePayService) private readonly weChatNativePayService: WeChatNativePayService,
        @Inject(AliPayService) private readonly aliPayService: AliPayService,
        @Inject(WeChatUtil) private readonly wechatUser: WeChatUtil,
    ) {}

    @Post()
    @Roles('admin')
    async create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto);
        return createCatDto;
    }

    @Get()
    async findAll() {
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
        // const a = 1 / 0;
        // console.log('a', a);
        return this.catsService.findAll();
        // const result = await this.weChatNativePayService.pay({
        //     body: '支付一下',
        //     out_trade_no: '201811271512000001',
        //     total_fee: 301,
        //     spbill_create_ip: '127.0.0.1', // 支付请求方IP
        //     notify_url: 'your.domain.com/payment/wechat_order_notify', // 服务端支付通知地址
        //     trade_type: WeChatTradeType.NATIVE,
        // });
        // const params: any = {};
        // params.appId = this.configService.get('appId');
        // params.privateKey = this.configService.get('privateKey');
        // // console.log(params);
        // try {
        //     const result = await this.aliPayService.exec('alipay.system.oauth.token', {
        //         grantType: 'authorization_code',
        //         code: 'code',
        //         refreshToken: 'token',
        //     });
        //     return result;
        // } catch (error) {
        //     // console.log(error);
        //     throw new HttpException(JSON.parse(error.serverResult.data).error_response, 401);
        // }
        // const appId = 'wx795c1d4619223d94';
        // const appsecret = 'c994a3ac0cb9df132ab3c6724c0f0370';
        // return this.wechatUser.weChatGetAccountToken(appId, appsecret);
    }

    @Get(':id')
    findOne(
        @Param('id', new ParseIntPipe())
        id,
    ) {
        // logic
    }
}
