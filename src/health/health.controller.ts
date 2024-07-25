import { Controller, Get } from '@nestjs/common';
import { DiskHealthIndicator, HealthCheck, HealthCheckService, HttpHealthIndicator, MemoryHealthIndicator, TypeOrmHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private http: HttpHealthIndicator,
        private db: TypeOrmHealthIndicator,
        private readonly disk: DiskHealthIndicator,
        private memory: MemoryHealthIndicator,
      ) {}
    
    @Get()
    @HealthCheck()
    check() {
    return this.health.check([
        () => this.db.pingCheck('database'),
        () => this.disk.checkStorage('storage', {  path: '/', threshold: 250 * 1024 * 1024 * 1024, }),
        () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
    ]);
    }
    
}
