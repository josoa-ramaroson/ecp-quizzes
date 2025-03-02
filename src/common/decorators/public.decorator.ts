import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_ROUTE } from '../constants';

export const PublicRoutes = () => SetMetadata(IS_PUBLIC_ROUTE, true);
