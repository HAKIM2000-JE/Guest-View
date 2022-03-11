import {Injectable} from '@angular/core';
import {BugsnagErrorHandler} from '@bugsnag/plugin-angular';

@Injectable()
export class ChunkLoadErrorHandler extends BugsnagErrorHandler {
  handleError(error: any): void {
    console.log('error', error);
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;
    if (chunkFailedMessage.test(error.message)) {
      console.log('Chunk load error - reload.');
      window.location.reload();
    } else {
      super.handleError(error);
    }
  }
}
