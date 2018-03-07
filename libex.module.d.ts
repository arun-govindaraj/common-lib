import { HelloService } from './hello.service';
export declare class LibexModule {
    static forRoot(): {
        ngModule: typeof LibexModule;
        providers: typeof HelloService[];
    };
}
