import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [],
  exports: [], // ✅ Export it for use in other modules
})
export class CommonModule {}
