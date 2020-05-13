import { Observable } from 'rxjs';

/**
 * Namespace nt_module_test.
 * @exports nt_module_test
 * @namespace
 */
export namespace nt_module_test {

    /**
     * Contains all the RPC service clients.
     * @exports nt_module_test.ClientFactory
     * @interface
     */
    export interface ClientFactory {

        /**
         * Returns the CatService service client.
         * @returns {nt_module_test.CatService}
         */
        getCatService(): nt_module_test.CatService;
    }

    /**
     * Builder for an RPC service server.
     * @exports nt_module_test.ServerBuilder
     * @interface
     */
    export interface ServerBuilder {

        /**
         * Adds a CatService service implementation.
         * @param {nt_module_test.CatService} impl CatService service implementation
         * @returns {nt_module_test.ServerBuilder}
         */
        addCatService(impl: nt_module_test.CatService): nt_module_test.ServerBuilder;
    }

    /**
     * Constructs a new PlaceholderRequest.
     * @exports nt_module_test.PlaceholderRequest
     * @interface
     */
    export interface PlaceholderRequest {
    }

    /**
     * Constructs a new StringDataResponse.
     * @exports nt_module_test.StringDataResponse
     * @interface
     */
    export interface StringDataResponse {

        /**
         * StringDataResponse code.
         * @type {number|undefined}
         */
        code?: number;

        /**
         * StringDataResponse message.
         * @type {string|undefined}
         */
        message?: string;

        /**
         * StringDataResponse data.
         * @type {string|undefined}
         */
        data?: string;
    }

    /**
     * Constructs a new CatService service.
     * @exports nt_module_test.CatService
     * @interface
     */
    export interface CatService {

        /**
         * Calls HelloRpc.
         * @param {nt_module_test.SayHelloRequest} request SayHelloRequest message or plain object
         * @returns {Observable<nt_module_test.StringDataResponse>}
         */
        helloRpc(request: nt_module_test.SayHelloRequest): Observable<nt_module_test.StringDataResponse>;
    }

    /**
     * Constructs a new SayHelloRequest.
     * @exports nt_module_test.SayHelloRequest
     * @interface
     */
    export interface SayHelloRequest {

        /**
         * SayHelloRequest name.
         * @type {string|undefined}
         */
        name?: string;
    }
}
