import { CACHE_MANAGER, Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { Cache } from 'cache-manager';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get()
  async getHello(): Promise<string[]> {
    const keys = await this.cacheManager.store.keys();
    return keys;
  }

  @Get('/hello')
  async setHello(): Promise<string[]> {
    await this.cacheManager.set('hello', 'world', 60000);
    const keys = await this.cacheManager.store.keys();
    return keys;
  }
}
