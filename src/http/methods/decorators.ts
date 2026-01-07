import { createHttpMethod } from './create-method-decorator';

export const Get = createHttpMethod('get');
export const Post = createHttpMethod('post');
export const Put = createHttpMethod('put');
export const Patch = createHttpMethod('patch');
export const Delete = createHttpMethod('delete');
