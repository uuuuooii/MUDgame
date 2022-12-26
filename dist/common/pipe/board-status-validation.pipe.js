"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardStatusValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const board_status_enum_1 = require("../../board/domain/board-status.enum");
class BoardStatusValidationPipe {
    constructor() {
        this.StatusOptions = [board_status_enum_1.BoardStatus.PRIVATE, board_status_enum_1.BoardStatus.PUBLIC];
    }
    transform(value, metadata) {
        value = value.toUpperCase();
        if (!this.isStatusValue(value)) {
            throw new common_1.BadRequestException('Bad Req');
        }
        return value;
    }
    isStatusValue(status) {
        const index = this.StatusOptions.indexOf(status);
        return index !== -1;
    }
}
exports.BoardStatusValidationPipe = BoardStatusValidationPipe;
//# sourceMappingURL=board-status-validation.pipe.js.map