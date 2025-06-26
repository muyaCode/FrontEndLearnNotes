# Nest项目开发流程

[NestJS学习之优秀项目分析与最佳实践 - 掘金 (juejin.cn)](https://juejin.cn/post/7281570246111576120)

## 使用工具

- 浏览器
- 编辑器
- 命令行工具
- 请求工具
- 代码版本管理工具

## 执行顺序

```bash
客户端请求 ---> 中间件 ---> 守卫 ---> 拦截器之前 ---> 管道 ---> 控制器处理并响应 ---> 拦截器之后 ---> 过滤器
```

## nest装饰器

|        nest装饰器        |           express 对象           |
| :----------------------: | :------------------------------: |
|        @Request()        |               req                |
|       @Response()        |               res                |
|         @Next()          |               next               |
|        @Session()        |           req.session            |
|  @Param(param?: string)  |  req.params / req.params[param]  |
|  @Body(param?: string)   |    req.body / req.body[param]    |
|  @Query(param?: string)  |   req.query / req.query[param]   |
| @Headers(param?: string) | req.headers / req.headers[param] |

## 数据库操作

@nestjs/mongoose库

```bash
npm install mongoose @nestjs/mongoose --save
```

typeorm 库

```bash
npm install --save @nestjs/typeorm typeorm mysql
```

## 配置Fastify

### 集成步骤

#### 1.安装依赖@nestjs/platform-fastify

```bash
npm i --save @nestjs/platform-fastify
```

#### 2.配置适配器

安装 fastify 后，我们可以使用 FastifyAdapter，修改src/main.ts文件

```js
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ApplicationModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(ApplicationModule, new FastifyAdapter());
  // 默认情况下，`Fastify`仅在 `localhost 127.0.0.1` 接口上监听
  // 改成 0.0.0.0 接受其他主机上的连接
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
```

## src下的文件夹目录

### 配置路径别名

tsconfig.json

```js
// 配置路径别名
"paths": {
    "@/*": [
        "src/*"
    ],
},
```

### 服务里的目录module或server

#### dto

客户端传输数据到服务端，数据传输对象

#### classes

swagger传输示例文件夹

#### interfaces

待定

#### schema或者model

数据库模型定义的文件夹

### 公用目录common

#### filters

- 异常过滤器目录
- http-exception.filter.ts

#### guards

##### 角色控制守卫

roles.guard.ts

```js
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 通过reflector反射， 从decorators反射器，获取roles
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const { user } = request.query;
    // const hasRole = () =>
    //   user.roles.some(role => !!roles.find(item => item === role));

    // return user && user.roles && hasRole();
    return !!roles.find(role => role === user);
  }
}
```

##### 局部在模块中使用

```js
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { RoleGuardService } from './role-guard.service';

@ApiBearerAuth()
@ApiTags('role-guard')
// 角色守卫
@UseGuards(RolesGuard)
@Controller('/role-guard')
export class RoleGuardController {
  constructor(private readonly roleGuardService: RoleGuardService) {}

  // 查询
  @Get()
  // 反射器使用
  @Roles('admin')
  fetch(@Query() { id }): string {
    return this.roleGuardService.fetch(id);
  }
}
```

##### 全局在main.ts使用

```js
// 全局角色控制守卫
// app.useGlobalGuards(new RolesGuard());
```

#### decorators

##### 反射器目录

roles.decorator.ts

```js
import { SetMetadata } from '@nestjs/common';
//  导出反射器：通过SetMetadata 将传入的roles 设置到roles里到roles.guard.ts
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
```

##### 和guards在模块中使用

```js
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { RoleGuardService } from './role-guard.service';

@ApiBearerAuth()
@ApiTags('role-guard')
// 角色守卫
@UseGuards(RolesGuard)
@Controller('/role-guard')
export class RoleGuardController {
  constructor(private readonly roleGuardService: RoleGuardService) {}

  // 查询
  @Get()
  // decorators反射器使用
  @Roles('admin')
  fetch(@Query() { id }): string {
    return this.roleGuardService.fetch(id);
  }
}
```

#### interceptors

待定

#### middleware

中间件目录

logger.middleware.ts

#### pipes

管道目录：转换和验证前端传来的参数数据

##### parse-int.pipe.ts

```js
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string> {
  async transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}
```

##### validation.pipe.ts

```js
import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
  Type,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    // tslint:disable-next-line
    console.log(value);
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const errObj = {};
      errors.forEach(err => {
        const {
          property,
          constraints,
        } = err;
        errObj[property] = Object.values(constraints);
      });
      throw new HttpException(
        { message: 'Request params validation failed', error: errObj },
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }

  private toValidate(metatype: Type<any>): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type);
  }
}
```

### 项目配置集中管理config

#### 数据库配置

database.ts

```js
import { join } from 'path';
export default {
  type: 'mysql',
  // host: 'localhost',
  socketPath: '/tmp/mysql.sock',
  port: 3306,
  username: 'root',
  password: 'xiaoerxiaoer',
  database: 'nest',
  entities: [join(__dirname, '../', '**/**.entity{.ts,.js}')],
  synchronize: true,
};
```

#### 邮件发送配置

email.ts

```js
import { join } from 'path';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

export default {
  transport: 'smtps://1255968521@qq.com:tsjjzmqcmhmoheje@smtp.qq.com',
  defaults: {
    from: '"nest-modules" <modules@nestjs.com>',
  },
  template: {
    dir: join(__dirname, '../templates/email/'),
    adapter: new PugAdapter(),
    options: {
      strict: true,
    },
  },
};
```

#### 任务队列配置

Redis

#### 定时任务配置

待定

#### 服务请求的监控

两个依赖包

- nest-status-monitor
- @nestjs/platform-socket.io

statusMonitor.ts

```js

```

### core

待定

## MongoDB-mongoose索引、内置CRUD方法扩展

### 网站

- GitHub：<https://github.com/Automattic/mongoose>
- 官网：<https://mongoosejs.com/>
- 中文网：<http://www.mongoosejs.net/>
- 模型API：<https://mongoosejs.com/docs/api/model.html>

## MongoDB数据库的windows系统安装

### 相关网站

- 官网：<https://www.mongodb.com/>
- 安装教程(菜鸟教程)：<https://www.runoob.com/mongodb/mongodb-window-install.html>
- 中文网：<https://www.mongodb.org.cn/>

## 使用redis

- 微服务教程：<https://docs.nestjs.cn/8/microservices?id=redis>
- windows本地使用redis：<https://github.com/MicrosoftArchive/redis/releases>
- 除了windows的redis：<https://redis.io/download/>
- 安装 @liaoliaots/nestjs-redis ioredis 包
  - <https://www.npmjs.com/package/@liaoliaots/nestjs-redis#usage>
  - <https://github.com/liaoliaots/nestjs-redis>

### 客户端使用文档

- 菜鸟教程-redis客户端命令：<https://www.runoob.com/redis/redis-keys.html>
- 官网文档：<https://redis.io/commands/>
- 在node中使用的库文档：<https://www.npmjs.com/package/redis>
