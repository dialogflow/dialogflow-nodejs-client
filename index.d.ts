// Type definitions for apiai 3.0.4
// Project: https://github.com/api-ai/api-ai-node-js/
// Definitions by: Dmitry Kuragin <https://github.com/sstepashka>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="typescript" />
/// <reference types="node" />


/* =================== USAGE ===================
    import * as apiai from "apiai";
    const app = apiai("YOUR_ACCESS_TOKEN");
 =============================================== */

import * as events from "events";
import * as stream from "stream";

declare const apiai: apiai.ApiaiStatic;

export as namespace apiai;

export = apiai;

declare namespace apiai {
    interface ApiaiStatic {
        (clientAccessToken: string, options?: ApplicationOptions): Application;
    }

    /**
     * Base request options. Not uses directly, for inherits only.
     */
    interface RequestOptions {
        endpoint?: string;
    }

    /**
     * Base class or interface for all inherited requests.
     * Not uses directly, for inherits only.
     */
    interface Request extends events.EventEmitter {
        write(buffer: Buffer | string): void;
        end(): void;
    }

    /**
     * Base class or interface for all inherited requests.
     * Not uses directly, for inherits only.
     */
    interface JSONApiRequest extends Request {

    }

    /**
     * Base query request options.
     * See details at https://docs.api.ai/docs/query
     */
    interface QueryRequestOptions extends RequestOptions {
        timezone?: string;
        resetContexts?: boolean;
        sessionId: string;
        contexts?: [any];
        entities?: [any];
        version?: string;
        requestSource?: string;
        originalRequest?: any;
    }

    /**
     * Base query request.
     */
    interface QueryRequest extends JSONApiRequest {

    }

    /**
     * Text Request options.
     */
    interface TextRequestOptions extends QueryRequestOptions {

    }

    /**
     * Text Request.
     */
    interface TextRequest extends QueryRequest {
        query: string | [string];
    }

    /**
     * Event Request options.
     */
    interface EventRequestOptions extends QueryRequestOptions {

    }

    /**
     * Event model for setn event request.
     */
    interface Event {
        name: string;
        data?: { [key: string]: any; };
    }

    /**
     * Text Request.
     */
    interface EventRequest extends QueryRequest {
        event: Event;
    }

    /**
     * Contexts Request options.
     */
    interface ContextsRequestOptions extends RequestOptions {
        sessionId: string;
    }

    /**
     * Contexts Request.
     */
    interface ContextsRequest extends JSONApiRequest {
        contexts: [any];
    }

    /**
     * Delete Contexts Request options.
     */
    interface DeleteContextsRequestOptions extends RequestOptions {
        sessionId: string;
    }

    /**
     * Delete Contexts Request.
     */
    interface DeleteContextsRequest extends JSONApiRequest {

    }

    /**
     * UserEntityEntry model for user entities request.
     */
    interface UserEntityEntry {
        value: string;
        synonyms: [string];
    }

    /**
     * UserEntity model for user entities request.
     */
    interface UserEntity {
        name: string;
        extend: boolean;
        entries: [UserEntityEntry];
    }

    /**
     * UserEntity model for user entities request.
     */
    interface UserEntitiesBody {
        sessionId: string;
        entities: [UserEntity];
    }

    /**
     * UserEntities Request options.
     */
    interface UserEntitiesRequestOptions extends RequestOptions {

    }

    /**
     * UserEntities Request.
     */
    interface UserEntitiesRequest extends JSONApiRequest {
        user_entities_body: UserEntitiesBody;
    }

    /**
     * TTS Request options.
     */

    interface TTSRequestOptions extends RequestOptions {
        language?: string;
        writeStream: stream.Writable;
    }

    /**
     * TTS Request.
     */
    interface TTSRequest extends Request {

    }

    /**
     * Application options. This options uses for
     * default parameters for requests.
     */
    interface ApplicationOptions {
        language?: string;
        hostname?: string;
        version?: string;
        endpoint?: string;
        requestSource?: string;
        secure?: boolean;
    }

    /**
     * Application is factory for requests to api.ai service..
     */
    interface Application {
        textRequest(query: string | [string], options: TextRequestOptions): TextRequest;
        eventRequest(event: Event, options: EventRequestOptions): EventRequest;
        contextsRequest(contexts: [any], options: ContextsRequestOptions): ContextsRequest;
        deleteContextsRequest(options: DeleteContextsRequestOptions): DeleteContextsRequest;
        userEntitiesRequest(user_entities_body: UserEntitiesBody, options?: UserEntitiesRequestOptions): UserEntitiesRequest;
        ttsRequest(text: string, options: TTSRequestOptions): TTSRequest;
    }
}



