import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { PayAddon } from '@huazai5m/nt-addon-pay';
import { readFileSync } from 'fs';
import { WechatApiAddon } from '@jianghohwason/nt-addon-wechatapi';

@Module({
    imports: [
        WechatApiAddon.forRoot(),
        PayAddon.forRoot({
            wechatConfig: {
                appid: 'wx795c1d4619223d94', // 公众号appi/应用appid/小程序appid
                mch_id: '1574968031', // 商户号
                secretKey: 'c994a3ac0cb9df132ab3c6724c0f0370', // 商户交易秘钥
                sign_type: 'MD5', // 微信支付签名类型('MD5' | 'HMAC-SHA256')，默认MD5，配置后，所有接口参数均会使用这个签名类型
                pfx: readFileSync('path_to_p12_file'), // p12文件
                sandbox: false, // 是否启用沙箱环境，默认不启用，用于商户支付验收测试
            },
            aliConfig: {
                appId: '2021001145608062',
                // alipayPublicKey: 'a',
                privateKey: readFileSync('./hs_alipk.txt', 'ascii'),
            },
        }),
    ],
    controllers: [CatsController],
    providers: [CatsService],
})
export class CatsModule {}
