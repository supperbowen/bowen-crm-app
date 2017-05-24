import {BaseLogic} from '/src/common/logic';
import {hooks} from '/src/common/utils';

export default class DesktopService extends BaseLogic {
    constructor() {
        super({
            uri: 'desktop',
            listUri: 'desktop/list',
            enablePaging: true,
            enableSearch: true,
            pageSize: 10
        });
    }
}
