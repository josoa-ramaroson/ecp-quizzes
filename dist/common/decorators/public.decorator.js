"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicRoutes = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
const PublicRoutes = () => (0, common_1.SetMetadata)(constants_1.IS_PUBLIC_ROUTE, true);
exports.PublicRoutes = PublicRoutes;
//# sourceMappingURL=public.decorator.js.map