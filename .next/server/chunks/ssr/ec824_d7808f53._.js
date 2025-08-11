module.exports = {

"[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}}),
"[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
module.exports = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}}),
"[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
module.exports = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}}),
"[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/contexts/app-router-context.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
module.exports = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['contexts'].AppRouterContext; //# sourceMappingURL=app-router-context.js.map
}}),
"[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/contexts/hooks-client-context.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
module.exports = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['contexts'].HooksClientContext; //# sourceMappingURL=hooks-client-context.js.map
}}),
"[project]/p2p-react/node_modules/next/dist/client/components/router-reducer/reducers/get-segment-value.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getSegmentValue", {
    enumerable: true,
    get: function() {
        return getSegmentValue;
    }
});
function getSegmentValue(segment) {
    return Array.isArray(segment) ? segment[1] : segment;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=get-segment-value.js.map
}}),
"[project]/p2p-react/node_modules/next/dist/shared/lib/segment.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    DEFAULT_SEGMENT_KEY: null,
    PAGE_SEGMENT_KEY: null,
    addSearchParamsIfPageSegment: null,
    isGroupSegment: null,
    isParallelRouteSegment: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DEFAULT_SEGMENT_KEY: function() {
        return DEFAULT_SEGMENT_KEY;
    },
    PAGE_SEGMENT_KEY: function() {
        return PAGE_SEGMENT_KEY;
    },
    addSearchParamsIfPageSegment: function() {
        return addSearchParamsIfPageSegment;
    },
    isGroupSegment: function() {
        return isGroupSegment;
    },
    isParallelRouteSegment: function() {
        return isParallelRouteSegment;
    }
});
function isGroupSegment(segment) {
    // Use array[0] for performant purpose
    return segment[0] === '(' && segment.endsWith(')');
}
function isParallelRouteSegment(segment) {
    return segment.startsWith('@') && segment !== '@children';
}
function addSearchParamsIfPageSegment(segment, searchParams) {
    const isPageSegment = segment.includes(PAGE_SEGMENT_KEY);
    if (isPageSegment) {
        const stringifiedQuery = JSON.stringify(searchParams);
        return stringifiedQuery !== '{}' ? PAGE_SEGMENT_KEY + '?' + stringifiedQuery : PAGE_SEGMENT_KEY;
    }
    return segment;
}
const PAGE_SEGMENT_KEY = '__PAGE__';
const DEFAULT_SEGMENT_KEY = '__DEFAULT__'; //# sourceMappingURL=segment.js.map
}}),
"[project]/p2p-react/node_modules/next/dist/client/components/redirect-status-code.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RedirectStatusCode", {
    enumerable: true,
    get: function() {
        return RedirectStatusCode;
    }
});
var RedirectStatusCode = /*#__PURE__*/ function(RedirectStatusCode) {
    RedirectStatusCode[RedirectStatusCode["SeeOther"] = 303] = "SeeOther";
    RedirectStatusCode[RedirectStatusCode["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    RedirectStatusCode[RedirectStatusCode["PermanentRedirect"] = 308] = "PermanentRedirect";
    return RedirectStatusCode;
}({});
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=redirect-status-code.js.map
}}),
"[project]/p2p-react/node_modules/next/dist/client/components/redirect-error.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    REDIRECT_ERROR_CODE: null,
    RedirectType: null,
    isRedirectError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    REDIRECT_ERROR_CODE: function() {
        return REDIRECT_ERROR_CODE;
    },
    RedirectType: function() {
        return RedirectType;
    },
    isRedirectError: function() {
        return isRedirectError;
    }
});
const _redirectstatuscode = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/client/components/redirect-status-code.js [app-ssr] (ecmascript)");
const REDIRECT_ERROR_CODE = 'NEXT_REDIRECT';
var RedirectType = /*#__PURE__*/ function(RedirectType) {
    RedirectType["push"] = "push";
    RedirectType["replace"] = "replace";
    return RedirectType;
}({});
function isRedirectError(error) {
    if (typeof error !== 'object' || error === null || !('digest' in error) || typeof error.digest !== 'string') {
        return false;
    }
    const digest = error.digest.split(';');
    const [errorCode, type] = digest;
    const destination = digest.slice(2, -2).join(';');
    const status = digest.at(-2);
    const statusCode = Number(status);
    return errorCode === REDIRECT_ERROR_CODE && (type === 'replace' || type === 'push') && typeof destination === 'string' && !isNaN(statusCode) && statusCode in _redirectstatuscode.RedirectStatusCode;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=redirect-error.js.map
}}),
"[project]/p2p-react/node_modules/next/dist/client/components/redirect.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    getRedirectError: null,
    getRedirectStatusCodeFromError: null,
    getRedirectTypeFromError: null,
    getURLFromRedirectError: null,
    permanentRedirect: null,
    redirect: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getRedirectError: function() {
        return getRedirectError;
    },
    getRedirectStatusCodeFromError: function() {
        return getRedirectStatusCodeFromError;
    },
    getRedirectTypeFromError: function() {
        return getRedirectTypeFromError;
    },
    getURLFromRedirectError: function() {
        return getURLFromRedirectError;
    },
    permanentRedirect: function() {
        return permanentRedirect;
    },
    redirect: function() {
        return redirect;
    }
});
const _redirectstatuscode = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/client/components/redirect-status-code.js [app-ssr] (ecmascript)");
const _redirecterror = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/client/components/redirect-error.js [app-ssr] (ecmascript)");
const actionAsyncStorage = ("TURBOPACK compile-time truthy", 1) ? __turbopack_context__.r("[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)").actionAsyncStorage : "TURBOPACK unreachable";
function getRedirectError(url, type, statusCode) {
    if (statusCode === void 0) statusCode = _redirectstatuscode.RedirectStatusCode.TemporaryRedirect;
    const error = Object.defineProperty(new Error(_redirecterror.REDIRECT_ERROR_CODE), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.digest = _redirecterror.REDIRECT_ERROR_CODE + ";" + type + ";" + url + ";" + statusCode + ";";
    return error;
}
function redirect(/** The URL to redirect to */ url, type) {
    var _actionAsyncStorage_getStore;
    type != null ? type : type = (actionAsyncStorage == null ? void 0 : (_actionAsyncStorage_getStore = actionAsyncStorage.getStore()) == null ? void 0 : _actionAsyncStorage_getStore.isAction) ? _redirecterror.RedirectType.push : _redirecterror.RedirectType.replace;
    throw getRedirectError(url, type, _redirectstatuscode.RedirectStatusCode.TemporaryRedirect);
}
function permanentRedirect(/** The URL to redirect to */ url, type) {
    if (type === void 0) type = _redirecterror.RedirectType.replace;
    throw getRedirectError(url, type, _redirectstatuscode.RedirectStatusCode.PermanentRedirect);
}
function getURLFromRedirectError(error) {
    if (!(0, _redirecterror.isRedirectError)(error)) return null;
    // Slices off the beginning of the digest that contains the code and the
    // separating ';'.
    return error.digest.split(';').slice(2, -2).join(';');
}
function getRedirectTypeFromError(error) {
    if (!(0, _redirecterror.isRedirectError)(error)) {
        throw Object.defineProperty(new Error('Not a redirect error'), "__NEXT_ERROR_CODE", {
            value: "E260",
            enumerable: false,
            configurable: true
        });
    }
    return error.digest.split(';', 2)[1];
}
function getRedirectStatusCodeFromError(error) {
    if (!(0, _redirecterror.isRedirectError)(error)) {
        throw Object.defineProperty(new Error('Not a redirect error'), "__NEXT_ERROR_CODE", {
            value: "E260",
            enumerable: false,
            configurable: true
        });
    }
    return Number(error.digest.split(';').at(-2));
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=redirect.js.map
}}),
"[project]/p2p-react/node_modules/next/dist/client/components/http-access-fallback/http-access-fallback.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    HTTPAccessErrorStatus: null,
    HTTP_ERROR_FALLBACK_ERROR_CODE: null,
    getAccessFallbackErrorTypeByStatus: null,
    getAccessFallbackHTTPStatus: null,
    isHTTPAccessFallbackError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    HTTPAccessErrorStatus: function() {
        return HTTPAccessErrorStatus;
    },
    HTTP_ERROR_FALLBACK_ERROR_CODE: function() {
        return HTTP_ERROR_FALLBACK_ERROR_CODE;
    },
    getAccessFallbackErrorTypeByStatus: function() {
        return getAccessFallbackErrorTypeByStatus;
    },
    getAccessFallbackHTTPStatus: function() {
        return getAccessFallbackHTTPStatus;
    },
    isHTTPAccessFallbackError: function() {
        return isHTTPAccessFallbackError;
    }
});
const HTTPAccessErrorStatus = {
    NOT_FOUND: 404,
    FORBIDDEN: 403,
    UNAUTHORIZED: 401
};
const ALLOWED_CODES = new Set(Object.values(HTTPAccessErrorStatus));
const HTTP_ERROR_FALLBACK_ERROR_CODE = 'NEXT_HTTP_ERROR_FALLBACK';
function isHTTPAccessFallbackError(error) {
    if (typeof error !== 'object' || error === null || !('digest' in error) || typeof error.digest !== 'string') {
        return false;
    }
    const [prefix, httpStatus] = error.digest.split(';');
    return prefix === HTTP_ERROR_FALLBACK_ERROR_CODE && ALLOWED_CODES.has(Number(httpStatus));
}
function getAccessFallbackHTTPStatus(error) {
    const httpStatus = error.digest.split(';')[1];
    return Number(httpStatus);
}
function getAccessFallbackErrorTypeByStatus(status) {
    switch(status){
        case 401:
            return 'unauthorized';
        case 403:
            return 'forbidden';
        case 404:
            return 'not-found';
        default:
            return;
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=http-access-fallback.js.map
}}),
"[project]/p2p-react/node_modules/next/dist/client/components/not-found.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "notFound", {
    enumerable: true,
    get: function() {
        return notFound;
    }
});
const _httpaccessfallback = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/client/components/http-access-fallback/http-access-fallback.js [app-ssr] (ecmascript)");
/**
 * This function allows you to render the [not-found.js file](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)
 * within a route segment as well as inject a tag.
 *
 * `notFound()` can be used in
 * [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components),
 * [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), and
 * [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).
 *
 * - In a Server Component, this will insert a `<meta name="robots" content="noindex" />` meta tag and set the status code to 404.
 * - In a Route Handler or Server Action, it will serve a 404 to the caller.
 *
 * Read more: [Next.js Docs: `notFound`](https://nextjs.org/docs/app/api-reference/functions/not-found)
 */ const DIGEST = "" + _httpaccessfallback.HTTP_ERROR_FALLBACK_ERROR_CODE + ";404";
function notFound() {
    // eslint-disable-next-line no-throw-literal
    const error = Object.defineProperty(new Error(DIGEST), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.digest = DIGEST;
    throw error;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=not-found.js.map
}}),
"[project]/p2p-react/node_modules/next/dist/client/components/forbidden.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "forbidden", {
    enumerable: true,
    get: function() {
        return forbidden;
    }
});
const _httpaccessfallback = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/client/components/http-access-fallback/http-access-fallback.js [app-ssr] (ecmascript)");
// TODO: Add `forbidden` docs
/**
 * @experimental
 * This function allows you to render the [forbidden.js file](https://nextjs.org/docs/app/api-reference/file-conventions/forbidden)
 * within a route segment as well as inject a tag.
 *
 * `forbidden()` can be used in
 * [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components),
 * [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), and
 * [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).
 *
 * Read more: [Next.js Docs: `forbidden`](https://nextjs.org/docs/app/api-reference/functions/forbidden)
 */ const DIGEST = "" + _httpaccessfallback.HTTP_ERROR_FALLBACK_ERROR_CODE + ";403";
function forbidden() {
    if ("TURBOPACK compile-time truthy", 1) {
        throw Object.defineProperty(new Error("`forbidden()` is experimental and only allowed to be enabled when `experimental.authInterrupts` is enabled."), "__NEXT_ERROR_CODE", {
            value: "E488",
            enumerable: false,
            configurable: true
        });
    }
    // eslint-disable-next-line no-throw-literal
    const error = Object.defineProperty(new Error(DIGEST), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.digest = DIGEST;
    throw error;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=forbidden.js.map
}}),
"[project]/p2p-react/node_modules/next/dist/client/components/unauthorized.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "unauthorized", {
    enumerable: true,
    get: function() {
        return unauthorized;
    }
});
const _httpaccessfallback = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/client/components/http-access-fallback/http-access-fallback.js [app-ssr] (ecmascript)");
// TODO: Add `unauthorized` docs
/**
 * @experimental
 * This function allows you to render the [unauthorized.js file](https://nextjs.org/docs/app/api-reference/file-conventions/unauthorized)
 * within a route segment as well as inject a tag.
 *
 * `unauthorized()` can be used in
 * [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components),
 * [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), and
 * [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).
 *
 *
 * Read more: [Next.js Docs: `unauthorized`](https://nextjs.org/docs/app/api-reference/functions/unauthorized)
 */ const DIGEST = "" + _httpaccessfallback.HTTP_ERROR_FALLBACK_ERROR_CODE + ";401";
function unauthorized() {
    if ("TURBOPACK compile-time truthy", 1) {
        throw Object.defineProperty(new Error("`unauthorized()` is experimental and only allowed to be used when `experimental.authInterrupts` is enabled."), "__NEXT_ERROR_CODE", {
            value: "E411",
            enumerable: false,
            configurable: true
        });
    }
    // eslint-disable-next-line no-throw-literal
    const error = Object.defineProperty(new Error(DIGEST), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.digest = DIGEST;
    throw error;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=unauthorized.js.map
}}),
"[project]/p2p-react/node_modules/next/dist/server/dynamic-rendering-utils.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    isHangingPromiseRejectionError: null,
    makeHangingPromise: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    isHangingPromiseRejectionError: function() {
        return isHangingPromiseRejectionError;
    },
    makeHangingPromise: function() {
        return makeHangingPromise;
    }
});
function isHangingPromiseRejectionError(err) {
    if (typeof err !== 'object' || err === null || !('digest' in err)) {
        return false;
    }
    return err.digest === HANGING_PROMISE_REJECTION;
}
const HANGING_PROMISE_REJECTION = 'HANGING_PROMISE_REJECTION';
class HangingPromiseRejectionError extends Error {
    constructor(expression){
        super(`During prerendering, ${expression} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${expression} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context.`), this.expression = expression, this.digest = HANGING_PROMISE_REJECTION;
    }
}
const abortListenersBySignal = new WeakMap();
function makeHangingPromise(signal, expression) {
    if (signal.aborted) {
        return Promise.reject(new HangingPromiseRejectionError(expression));
    } else {
        const hangingPromise = new Promise((_, reject)=>{
            const boundRejection = reject.bind(null, new HangingPromiseRejectionError(expression));
            let currentListeners = abortListenersBySignal.get(signal);
            if (currentListeners) {
                currentListeners.push(boundRejection);
            } else {
                const listeners = [
                    boundRejection
                ];
                abortListenersBySignal.set(signal, listeners);
                signal.addEventListener('abort', ()=>{
                    for(let i = 0; i < listeners.length; i++){
                        listeners[i]();
                    }
                }, {
                    once: true
                });
            }
        });
        // We are fine if no one actually awaits this promise. We shouldn't consider this an unhandled rejection so
        // we attach a noop catch handler here to suppress this warning. If you actually await somewhere or construct
        // your own promise out of it you'll need to ensure you handle the error when it rejects.
        hangingPromise.catch(ignoreReject);
        return hangingPromise;
    }
}
function ignoreReject() {} //# sourceMappingURL=dynamic-rendering-utils.js.map
}}),
"[project]/p2p-react/node_modules/next/dist/server/lib/router-utils/is-postpone.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isPostpone", {
    enumerable: true,
    get: function() {
        return isPostpone;
    }
});
const REACT_POSTPONE_TYPE = Symbol.for('react.postpone');
function isPostpone(error) {
    return typeof error === 'object' && error !== null && error.$$typeof === REACT_POSTPONE_TYPE;
} //# sourceMappingURL=is-postpone.js.map
}}),
"[project]/p2p-react/node_modules/next/dist/shared/lib/lazy-dynamic/bailout-to-csr.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
// This has to be a shared module which is shared between client component error boundary and dynamic component
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    BailoutToCSRError: null,
    isBailoutToCSRError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    BailoutToCSRError: function() {
        return BailoutToCSRError;
    },
    isBailoutToCSRError: function() {
        return isBailoutToCSRError;
    }
});
const BAILOUT_TO_CSR = 'BAILOUT_TO_CLIENT_SIDE_RENDERING';
class BailoutToCSRError extends Error {
    constructor(reason){
        super("Bail out to client-side rendering: " + reason), this.reason = reason, this.digest = BAILOUT_TO_CSR;
    }
}
function isBailoutToCSRError(err) {
    if (typeof err !== 'object' || err === null || !('digest' in err)) {
        return false;
    }
    return err.digest === BAILOUT_TO_CSR;
} //# sourceMappingURL=bailout-to-csr.js.map
}}),
"[project]/p2p-react/node_modules/next/dist/client/components/is-next-router-error.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isNextRouterError", {
    enumerable: true,
    get: function() {
        return isNextRouterError;
    }
});
const _httpaccessfallback = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/client/components/http-access-fallback/http-access-fallback.js [app-ssr] (ecmascript)");
const _redirecterror = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/client/components/redirect-error.js [app-ssr] (ecmascript)");
function isNextRouterError(error) {
    return (0, _redirecterror.isRedirectError)(error) || (0, _httpaccessfallback.isHTTPAccessFallbackError)(error);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=is-next-router-error.js.map
}}),
"[project]/p2p-react/node_modules/next/dist/client/components/hooks-server-context.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    DynamicServerError: null,
    isDynamicServerError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DynamicServerError: function() {
        return DynamicServerError;
    },
    isDynamicServerError: function() {
        return isDynamicServerError;
    }
});
const DYNAMIC_ERROR_CODE = 'DYNAMIC_SERVER_USAGE';
class DynamicServerError extends Error {
    constructor(description){
        super("Dynamic server usage: " + description), this.description = description, this.digest = DYNAMIC_ERROR_CODE;
    }
}
function isDynamicServerError(err) {
    if (typeof err !== 'object' || err === null || !('digest' in err) || typeof err.digest !== 'string') {
        return false;
    }
    return err.digest === DYNAMIC_ERROR_CODE;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=hooks-server-context.js.map
}}),
"[project]/p2p-react/node_modules/next/dist/client/components/static-generation-bailout.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    StaticGenBailoutError: null,
    isStaticGenBailoutError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    StaticGenBailoutError: function() {
        return StaticGenBailoutError;
    },
    isStaticGenBailoutError: function() {
        return isStaticGenBailoutError;
    }
});
const NEXT_STATIC_GEN_BAILOUT = 'NEXT_STATIC_GEN_BAILOUT';
class StaticGenBailoutError extends Error {
    constructor(...args){
        super(...args), this.code = NEXT_STATIC_GEN_BAILOUT;
    }
}
function isStaticGenBailoutError(error) {
    if (typeof error !== 'object' || error === null || !('code' in error)) {
        return false;
    }
    return error.code === NEXT_STATIC_GEN_BAILOUT;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=static-generation-bailout.js.map
}}),
"[project]/p2p-react/node_modules/next/dist/lib/metadata/metadata-constants.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    METADATA_BOUNDARY_NAME: null,
    OUTLET_BOUNDARY_NAME: null,
    VIEWPORT_BOUNDARY_NAME: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    METADATA_BOUNDARY_NAME: function() {
        return METADATA_BOUNDARY_NAME;
    },
    OUTLET_BOUNDARY_NAME: function() {
        return OUTLET_BOUNDARY_NAME;
    },
    VIEWPORT_BOUNDARY_NAME: function() {
        return VIEWPORT_BOUNDARY_NAME;
    }
});
const METADATA_BOUNDARY_NAME = '__next_metadata_boundary__';
const VIEWPORT_BOUNDARY_NAME = '__next_viewport_boundary__';
const OUTLET_BOUNDARY_NAME = '__next_outlet_boundary__'; //# sourceMappingURL=metadata-constants.js.map
}}),
"[project]/p2p-react/node_modules/next/dist/lib/scheduler.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    atLeastOneTask: null,
    scheduleImmediate: null,
    scheduleOnNextTick: null,
    waitAtLeastOneReactRenderTask: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    atLeastOneTask: function() {
        return atLeastOneTask;
    },
    scheduleImmediate: function() {
        return scheduleImmediate;
    },
    scheduleOnNextTick: function() {
        return scheduleOnNextTick;
    },
    waitAtLeastOneReactRenderTask: function() {
        return waitAtLeastOneReactRenderTask;
    }
});
const scheduleOnNextTick = (cb)=>{
    // We use Promise.resolve().then() here so that the operation is scheduled at
    // the end of the promise job queue, we then add it to the next process tick
    // to ensure it's evaluated afterwards.
    //
    // This was inspired by the implementation of the DataLoader interface: https://github.com/graphql/dataloader/blob/d336bd15282664e0be4b4a657cb796f09bafbc6b/src/index.js#L213-L255
    //
    Promise.resolve().then(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        else {
            process.nextTick(cb);
        }
    });
};
const scheduleImmediate = (cb)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        setImmediate(cb);
    }
};
function atLeastOneTask() {
    return new Promise((resolve)=>scheduleImmediate(resolve));
}
function waitAtLeastOneReactRenderTask() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        return new Promise((r)=>setImmediate(r));
    }
} //# sourceMappingURL=scheduler.js.map
}}),
"[project]/p2p-react/node_modules/next/dist/server/app-render/dynamic-rendering.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
/**
 * The functions provided by this module are used to communicate certain properties
 * about the currently running code so that Next.js can make decisions on how to handle
 * the current execution in different rendering modes such as pre-rendering, resuming, and SSR.
 *
 * Today Next.js treats all code as potentially static. Certain APIs may only make sense when dynamically rendering.
 * Traditionally this meant deopting the entire render to dynamic however with PPR we can now deopt parts
 * of a React tree as dynamic while still keeping other parts static. There are really two different kinds of
 * Dynamic indications.
 *
 * The first is simply an intention to be dynamic. unstable_noStore is an example of this where
 * the currently executing code simply declares that the current scope is dynamic but if you use it
 * inside unstable_cache it can still be cached. This type of indication can be removed if we ever
 * make the default dynamic to begin with because the only way you would ever be static is inside
 * a cache scope which this indication does not affect.
 *
 * The second is an indication that a dynamic data source was read. This is a stronger form of dynamic
 * because it means that it is inappropriate to cache this at all. using a dynamic data source inside
 * unstable_cache should error. If you want to use some dynamic data inside unstable_cache you should
 * read that data outside the cache and pass it in as an argument to the cached function.
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    Postpone: null,
    PreludeState: null,
    abortAndThrowOnSynchronousRequestDataAccess: null,
    abortOnSynchronousPlatformIOAccess: null,
    accessedDynamicData: null,
    annotateDynamicAccess: null,
    consumeDynamicAccess: null,
    createDynamicTrackingState: null,
    createDynamicValidationState: null,
    createHangingInputAbortSignal: null,
    createPostponedAbortSignal: null,
    formatDynamicAPIAccesses: null,
    getFirstDynamicReason: null,
    isDynamicPostpone: null,
    isPrerenderInterruptedError: null,
    markCurrentScopeAsDynamic: null,
    postponeWithTracking: null,
    throwIfDisallowedDynamic: null,
    throwToInterruptStaticGeneration: null,
    trackAllowedDynamicAccess: null,
    trackDynamicDataInDynamicRender: null,
    trackFallbackParamAccessed: null,
    trackSynchronousPlatformIOAccessInDev: null,
    trackSynchronousRequestDataAccessInDev: null,
    useDynamicRouteParams: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    Postpone: function() {
        return Postpone;
    },
    PreludeState: function() {
        return PreludeState;
    },
    abortAndThrowOnSynchronousRequestDataAccess: function() {
        return abortAndThrowOnSynchronousRequestDataAccess;
    },
    abortOnSynchronousPlatformIOAccess: function() {
        return abortOnSynchronousPlatformIOAccess;
    },
    accessedDynamicData: function() {
        return accessedDynamicData;
    },
    annotateDynamicAccess: function() {
        return annotateDynamicAccess;
    },
    consumeDynamicAccess: function() {
        return consumeDynamicAccess;
    },
    createDynamicTrackingState: function() {
        return createDynamicTrackingState;
    },
    createDynamicValidationState: function() {
        return createDynamicValidationState;
    },
    createHangingInputAbortSignal: function() {
        return createHangingInputAbortSignal;
    },
    createPostponedAbortSignal: function() {
        return createPostponedAbortSignal;
    },
    formatDynamicAPIAccesses: function() {
        return formatDynamicAPIAccesses;
    },
    getFirstDynamicReason: function() {
        return getFirstDynamicReason;
    },
    isDynamicPostpone: function() {
        return isDynamicPostpone;
    },
    isPrerenderInterruptedError: function() {
        return isPrerenderInterruptedError;
    },
    markCurrentScopeAsDynamic: function() {
        return markCurrentScopeAsDynamic;
    },
    postponeWithTracking: function() {
        return postponeWithTracking;
    },
    throwIfDisallowedDynamic: function() {
        return throwIfDisallowedDynamic;
    },
    throwToInterruptStaticGeneration: function() {
        return throwToInterruptStaticGeneration;
    },
    trackAllowedDynamicAccess: function() {
        return trackAllowedDynamicAccess;
    },
    trackDynamicDataInDynamicRender: function() {
        return trackDynamicDataInDynamicRender;
    },
    trackFallbackParamAccessed: function() {
        return trackFallbackParamAccessed;
    },
    trackSynchronousPlatformIOAccessInDev: function() {
        return trackSynchronousPlatformIOAccessInDev;
    },
    trackSynchronousRequestDataAccessInDev: function() {
        return trackSynchronousRequestDataAccessInDev;
    },
    useDynamicRouteParams: function() {
        return useDynamicRouteParams;
    }
});
const _react = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)"));
const _hooksservercontext = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/client/components/hooks-server-context.js [app-ssr] (ecmascript)");
const _staticgenerationbailout = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/client/components/static-generation-bailout.js [app-ssr] (ecmascript)");
const _workunitasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)");
const _workasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)");
const _dynamicrenderingutils = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/server/dynamic-rendering-utils.js [app-ssr] (ecmascript)");
const _metadataconstants = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/lib/metadata/metadata-constants.js [app-ssr] (ecmascript)");
const _scheduler = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/lib/scheduler.js [app-ssr] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const hasPostpone = typeof _react.default.unstable_postpone === 'function';
function createDynamicTrackingState(isDebugDynamicAccesses) {
    return {
        isDebugDynamicAccesses,
        dynamicAccesses: [],
        syncDynamicErrorWithStack: null
    };
}
function createDynamicValidationState() {
    return {
        hasSuspenseAboveBody: false,
        hasDynamicMetadata: false,
        hasDynamicViewport: false,
        hasAllowedDynamic: false,
        dynamicErrors: []
    };
}
function getFirstDynamicReason(trackingState) {
    var _trackingState_dynamicAccesses_;
    return (_trackingState_dynamicAccesses_ = trackingState.dynamicAccesses[0]) == null ? void 0 : _trackingState_dynamicAccesses_.expression;
}
function markCurrentScopeAsDynamic(store, workUnitStore, expression) {
    if (workUnitStore) {
        if (workUnitStore.type === 'cache' || workUnitStore.type === 'unstable-cache') {
            // inside cache scopes marking a scope as dynamic has no effect because the outer cache scope
            // creates a cache boundary. This is subtly different from reading a dynamic data source which is
            // forbidden inside a cache scope.
            return;
        }
    }
    // If we're forcing dynamic rendering or we're forcing static rendering, we
    // don't need to do anything here because the entire page is already dynamic
    // or it's static and it should not throw or postpone here.
    if (store.forceDynamic || store.forceStatic) return;
    if (store.dynamicShouldError) {
        throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route ${store.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
            value: "E553",
            enumerable: false,
            configurable: true
        });
    }
    if (workUnitStore) {
        if (workUnitStore.type === 'prerender-ppr') {
            postponeWithTracking(store.route, expression, workUnitStore.dynamicTracking);
        } else if (workUnitStore.type === 'prerender-legacy') {
            workUnitStore.revalidate = 0;
            // We aren't prerendering but we are generating a static page. We need to bail out of static generation
            const err = Object.defineProperty(new _hooksservercontext.DynamicServerError(`Route ${store.route} couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
                value: "E550",
                enumerable: false,
                configurable: true
            });
            store.dynamicUsageDescription = expression;
            store.dynamicUsageStack = err.stack;
            throw err;
        } else if (("TURBOPACK compile-time value", "development") === 'development' && workUnitStore && workUnitStore.type === 'request') {
            workUnitStore.usedDynamic = true;
        }
    }
}
function trackFallbackParamAccessed(store, expression) {
    const prerenderStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (!prerenderStore || prerenderStore.type !== 'prerender-ppr') return;
    postponeWithTracking(store.route, expression, prerenderStore.dynamicTracking);
}
function throwToInterruptStaticGeneration(expression, store, prerenderStore) {
    // We aren't prerendering but we are generating a static page. We need to bail out of static generation
    const err = Object.defineProperty(new _hooksservercontext.DynamicServerError(`Route ${store.route} couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
        value: "E558",
        enumerable: false,
        configurable: true
    });
    prerenderStore.revalidate = 0;
    store.dynamicUsageDescription = expression;
    store.dynamicUsageStack = err.stack;
    throw err;
}
function trackDynamicDataInDynamicRender(_store, workUnitStore) {
    if (workUnitStore) {
        if (workUnitStore.type === 'cache' || workUnitStore.type === 'unstable-cache') {
            // inside cache scopes marking a scope as dynamic has no effect because the outer cache scope
            // creates a cache boundary. This is subtly different from reading a dynamic data source which is
            // forbidden inside a cache scope.
            return;
        }
        // TODO: it makes no sense to have these work unit store types during a dev render.
        if (workUnitStore.type === 'prerender' || workUnitStore.type === 'prerender-client' || workUnitStore.type === 'prerender-legacy') {
            workUnitStore.revalidate = 0;
        }
        if (("TURBOPACK compile-time value", "development") === 'development' && workUnitStore.type === 'request') {
            workUnitStore.usedDynamic = true;
        }
    }
}
function abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore) {
    const reason = `Route ${route} needs to bail out of prerendering at this point because it used ${expression}.`;
    const error = createPrerenderInterruptedError(reason);
    prerenderStore.controller.abort(error);
    const dynamicTracking = prerenderStore.dynamicTracking;
    if (dynamicTracking) {
        dynamicTracking.dynamicAccesses.push({
            // When we aren't debugging, we don't need to create another error for the
            // stack trace.
            stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : undefined,
            expression
        });
    }
}
function abortOnSynchronousPlatformIOAccess(route, expression, errorWithStack, prerenderStore) {
    const dynamicTracking = prerenderStore.dynamicTracking;
    abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore);
    // It is important that we set this tracking value after aborting. Aborts are executed
    // synchronously except for the case where you abort during render itself. By setting this
    // value late we can use it to determine if any of the aborted tasks are the task that
    // called the sync IO expression in the first place.
    if (dynamicTracking) {
        if (dynamicTracking.syncDynamicErrorWithStack === null) {
            dynamicTracking.syncDynamicErrorWithStack = errorWithStack;
        }
    }
}
function trackSynchronousPlatformIOAccessInDev(requestStore) {
    // We don't actually have a controller to abort but we do the semantic equivalent by
    // advancing the request store out of prerender mode
    requestStore.prerenderPhase = false;
}
function abortAndThrowOnSynchronousRequestDataAccess(route, expression, errorWithStack, prerenderStore) {
    const prerenderSignal = prerenderStore.controller.signal;
    if (prerenderSignal.aborted === false) {
        // TODO it would be better to move this aborted check into the callsite so we can avoid making
        // the error object when it isn't relevant to the aborting of the prerender however
        // since we need the throw semantics regardless of whether we abort it is easier to land
        // this way. See how this was handled with `abortOnSynchronousPlatformIOAccess` for a closer
        // to ideal implementation
        abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore);
        // It is important that we set this tracking value after aborting. Aborts are executed
        // synchronously except for the case where you abort during render itself. By setting this
        // value late we can use it to determine if any of the aborted tasks are the task that
        // called the sync IO expression in the first place.
        const dynamicTracking = prerenderStore.dynamicTracking;
        if (dynamicTracking) {
            if (dynamicTracking.syncDynamicErrorWithStack === null) {
                dynamicTracking.syncDynamicErrorWithStack = errorWithStack;
            }
        }
    }
    throw createPrerenderInterruptedError(`Route ${route} needs to bail out of prerendering at this point because it used ${expression}.`);
}
const trackSynchronousRequestDataAccessInDev = trackSynchronousPlatformIOAccessInDev;
function Postpone({ reason, route }) {
    const prerenderStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    const dynamicTracking = prerenderStore && prerenderStore.type === 'prerender-ppr' ? prerenderStore.dynamicTracking : null;
    postponeWithTracking(route, reason, dynamicTracking);
}
function postponeWithTracking(route, expression, dynamicTracking) {
    assertPostpone();
    if (dynamicTracking) {
        dynamicTracking.dynamicAccesses.push({
            // When we aren't debugging, we don't need to create another error for the
            // stack trace.
            stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : undefined,
            expression
        });
    }
    _react.default.unstable_postpone(createPostponeReason(route, expression));
}
function createPostponeReason(route, expression) {
    return `Route ${route} needs to bail out of prerendering at this point because it used ${expression}. ` + `React throws this special object to indicate where. It should not be caught by ` + `your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
}
function isDynamicPostpone(err) {
    if (typeof err === 'object' && err !== null && typeof err.message === 'string') {
        return isDynamicPostponeReason(err.message);
    }
    return false;
}
function isDynamicPostponeReason(reason) {
    return reason.includes('needs to bail out of prerendering at this point because it used') && reason.includes('Learn more: https://nextjs.org/docs/messages/ppr-caught-error');
}
if (isDynamicPostponeReason(createPostponeReason('%%%', '^^^')) === false) {
    throw Object.defineProperty(new Error('Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js'), "__NEXT_ERROR_CODE", {
        value: "E296",
        enumerable: false,
        configurable: true
    });
}
const NEXT_PRERENDER_INTERRUPTED = 'NEXT_PRERENDER_INTERRUPTED';
function createPrerenderInterruptedError(message) {
    const error = Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.digest = NEXT_PRERENDER_INTERRUPTED;
    return error;
}
function isPrerenderInterruptedError(error) {
    return typeof error === 'object' && error !== null && error.digest === NEXT_PRERENDER_INTERRUPTED && 'name' in error && 'message' in error && error instanceof Error;
}
function accessedDynamicData(dynamicAccesses) {
    return dynamicAccesses.length > 0;
}
function consumeDynamicAccess(serverDynamic, clientDynamic) {
    // We mutate because we only call this once we are no longer writing
    // to the dynamicTrackingState and it's more efficient than creating a new
    // array.
    serverDynamic.dynamicAccesses.push(...clientDynamic.dynamicAccesses);
    return serverDynamic.dynamicAccesses;
}
function formatDynamicAPIAccesses(dynamicAccesses) {
    return dynamicAccesses.filter((access)=>typeof access.stack === 'string' && access.stack.length > 0).map(({ expression, stack })=>{
        stack = stack.split('\n') // Remove the "Error: " prefix from the first line of the stack trace as
        // well as the first 4 lines of the stack trace which is the distance
        // from the user code and the `new Error().stack` call.
        .slice(4).filter((line)=>{
            // Exclude Next.js internals from the stack trace.
            if (line.includes('node_modules/next/')) {
                return false;
            }
            // Exclude anonymous functions from the stack trace.
            if (line.includes(' (<anonymous>)')) {
                return false;
            }
            // Exclude Node.js internals from the stack trace.
            if (line.includes(' (node:')) {
                return false;
            }
            return true;
        }).join('\n');
        return `Dynamic API Usage Debug - ${expression}:\n${stack}`;
    });
}
function assertPostpone() {
    if (!hasPostpone) {
        throw Object.defineProperty(new Error(`Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js`), "__NEXT_ERROR_CODE", {
            value: "E224",
            enumerable: false,
            configurable: true
        });
    }
}
function createPostponedAbortSignal(reason) {
    assertPostpone();
    const controller = new AbortController();
    // We get our hands on a postpone instance by calling postpone and catching the throw
    try {
        _react.default.unstable_postpone(reason);
    } catch (x) {
        controller.abort(x);
    }
    return controller.signal;
}
function createHangingInputAbortSignal(workUnitStore) {
    const controller = new AbortController();
    if (workUnitStore.cacheSignal) {
        // If we have a cacheSignal it means we're in a prospective render. If the input
        // we're waiting on is coming from another cache, we do want to wait for it so that
        // we can resolve this cache entry too.
        workUnitStore.cacheSignal.inputReady().then(()=>{
            controller.abort();
        });
    } else {
        // Otherwise we're in the final render and we should already have all our caches
        // filled. We might still be waiting on some microtasks so we wait one tick before
        // giving up. When we give up, we still want to render the content of this cache
        // as deeply as we can so that we can suspend as deeply as possible in the tree
        // or not at all if we don't end up waiting for the input.
        (0, _scheduler.scheduleOnNextTick)(()=>controller.abort());
    }
    return controller.signal;
}
function annotateDynamicAccess(expression, prerenderStore) {
    const dynamicTracking = prerenderStore.dynamicTracking;
    if (dynamicTracking) {
        dynamicTracking.dynamicAccesses.push({
            stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : undefined,
            expression
        });
    }
}
function useDynamicRouteParams(expression) {
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    if (workStore && workStore.isStaticGeneration && workStore.fallbackRouteParams && workStore.fallbackRouteParams.size > 0) {
        // There are fallback route params, we should track these as dynamic
        // accesses.
        const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
        if (workUnitStore) {
            // We're prerendering with dynamicIO or PPR or both
            if (workUnitStore.type === 'prerender-client') {
                // We are in a prerender with dynamicIO semantics
                // We are going to hang here and never resolve. This will cause the currently
                // rendering component to effectively be a dynamic hole
                _react.default.use((0, _dynamicrenderingutils.makeHangingPromise)(workUnitStore.renderSignal, expression));
            } else if (workUnitStore.type === 'prerender-ppr') {
                // We're prerendering with PPR
                postponeWithTracking(workStore.route, expression, workUnitStore.dynamicTracking);
            } else if (workUnitStore.type === 'prerender-legacy') {
                throwToInterruptStaticGeneration(expression, workStore, workUnitStore);
            }
        }
    }
}
const hasSuspenseRegex = /\n\s+at Suspense \(<anonymous>\)/;
const hasSuspenseAfterBodyOrHtmlRegex = /\n\s+at (?:body|html) \(<anonymous>\)[\s\S]*?\n\s+at Suspense \(<anonymous>\)/;
const hasMetadataRegex = new RegExp(`\\n\\s+at ${_metadataconstants.METADATA_BOUNDARY_NAME}[\\n\\s]`);
const hasViewportRegex = new RegExp(`\\n\\s+at ${_metadataconstants.VIEWPORT_BOUNDARY_NAME}[\\n\\s]`);
const hasOutletRegex = new RegExp(`\\n\\s+at ${_metadataconstants.OUTLET_BOUNDARY_NAME}[\\n\\s]`);
function trackAllowedDynamicAccess(workStore, componentStack, dynamicValidation, clientDynamic) {
    if (hasOutletRegex.test(componentStack)) {
        // We don't need to track that this is dynamic. It is only so when something else is also dynamic.
        return;
    } else if (hasMetadataRegex.test(componentStack)) {
        dynamicValidation.hasDynamicMetadata = true;
        return;
    } else if (hasViewportRegex.test(componentStack)) {
        dynamicValidation.hasDynamicViewport = true;
        return;
    } else if (hasSuspenseAfterBodyOrHtmlRegex.test(componentStack)) {
        // This prerender has a Suspense boundary above the body which
        // effectively opts the page into allowing 100% dynamic rendering
        dynamicValidation.hasAllowedDynamic = true;
        dynamicValidation.hasSuspenseAboveBody = true;
        return;
    } else if (hasSuspenseRegex.test(componentStack)) {
        // this error had a Suspense boundary above it so we don't need to report it as a source
        // of disallowed
        dynamicValidation.hasAllowedDynamic = true;
        return;
    } else if (clientDynamic.syncDynamicErrorWithStack) {
        // This task was the task that called the sync error.
        dynamicValidation.dynamicErrors.push(clientDynamic.syncDynamicErrorWithStack);
        return;
    } else {
        const message = `Route "${workStore.route}": A component accessed data, headers, params, searchParams, or a short-lived cache without a Suspense boundary nor a "use cache" above it. See more info: https://nextjs.org/docs/messages/next-prerender-missing-suspense`;
        const error = createErrorWithComponentOrOwnerStack(message, componentStack);
        dynamicValidation.dynamicErrors.push(error);
        return;
    }
}
/**
 * In dev mode, we prefer using the owner stack, otherwise the provided
 * component stack is used.
 */ function createErrorWithComponentOrOwnerStack(message, componentStack) {
    const ownerStack = ("TURBOPACK compile-time value", "development") !== 'production' && _react.default.captureOwnerStack ? _react.default.captureOwnerStack() : null;
    const error = Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.stack = error.name + ': ' + message + (ownerStack ?? componentStack);
    return error;
}
var PreludeState = /*#__PURE__*/ function(PreludeState) {
    PreludeState[PreludeState["Full"] = 0] = "Full";
    PreludeState[PreludeState["Empty"] = 1] = "Empty";
    PreludeState[PreludeState["Errored"] = 2] = "Errored";
    return PreludeState;
}({});
function logDisallowedDynamicError(workStore, error) {
    console.error(error);
    if (!workStore.dev) {
        if (workStore.hasReadableErrorStacks) {
            console.error(`To get a more detailed stack trace and pinpoint the issue, start the app in development mode by running \`next dev\`, then open "${workStore.route}" in your browser to investigate the error.`);
        } else {
            console.error(`To get a more detailed stack trace and pinpoint the issue, try one of the following:
  - Start the app in development mode by running \`next dev\`, then open "${workStore.route}" in your browser to investigate the error.
  - Rerun the production build with \`next build --debug-prerender\` to generate better stack traces.`);
        }
    }
}
function throwIfDisallowedDynamic(workStore, prelude, dynamicValidation, serverDynamic) {
    if (workStore.invalidDynamicUsageError) {
        logDisallowedDynamicError(workStore, workStore.invalidDynamicUsageError);
        throw new _staticgenerationbailout.StaticGenBailoutError();
    }
    if (prelude !== 0) {
        if (dynamicValidation.hasSuspenseAboveBody) {
            // This route has opted into allowing fully dynamic rendering
            // by including a Suspense boundary above the body. In this case
            // a lack of a shell is not considered disallowed so we simply return
            return;
        }
        if (serverDynamic.syncDynamicErrorWithStack) {
            // There is no shell and the server did something sync dynamic likely
            // leading to an early termination of the prerender before the shell
            // could be completed. We terminate the build/validating render.
            logDisallowedDynamicError(workStore, serverDynamic.syncDynamicErrorWithStack);
            throw new _staticgenerationbailout.StaticGenBailoutError();
        }
        // We didn't have any sync bailouts but there may be user code which
        // blocked the root. We would have captured these during the prerender
        // and can log them here and then terminate the build/validating render
        const dynamicErrors = dynamicValidation.dynamicErrors;
        if (dynamicErrors.length > 0) {
            for(let i = 0; i < dynamicErrors.length; i++){
                logDisallowedDynamicError(workStore, dynamicErrors[i]);
            }
            throw new _staticgenerationbailout.StaticGenBailoutError();
        }
        // If we got this far then the only other thing that could be blocking
        // the root is dynamic Viewport. If this is dynamic then
        // you need to opt into that by adding a Suspense boundary above the body
        // to indicate your are ok with fully dynamic rendering.
        if (dynamicValidation.hasDynamicViewport) {
            console.error(`Route "${workStore.route}" has a \`generateViewport\` that depends on Request data (\`cookies()\`, etc...) or uncached external data (\`fetch(...)\`, etc...) without explicitly allowing fully dynamic rendering. See more info here: https://nextjs.org/docs/messages/next-prerender-dynamic-viewport`);
            throw new _staticgenerationbailout.StaticGenBailoutError();
        }
        if (prelude === 1) {
            // If we ever get this far then we messed up the tracking of invalid dynamic.
            // We still adhere to the constraint that you must produce a shell but invite the
            // user to report this as a bug in Next.js.
            console.error(`Route "${workStore.route}" did not produce a static shell and Next.js was unable to determine a reason. This is a bug in Next.js.`);
            throw new _staticgenerationbailout.StaticGenBailoutError();
        }
    } else {
        if (dynamicValidation.hasAllowedDynamic === false && dynamicValidation.hasDynamicMetadata) {
            console.error(`Route "${workStore.route}" has a \`generateMetadata\` that depends on Request data (\`cookies()\`, etc...) or uncached external data (\`fetch(...)\`, etc...) when the rest of the route does not. See more info here: https://nextjs.org/docs/messages/next-prerender-dynamic-metadata`);
            throw new _staticgenerationbailout.StaticGenBailoutError();
        }
    }
} //# sourceMappingURL=dynamic-rendering.js.map
}}),
"[project]/p2p-react/node_modules/next/dist/client/components/unstable-rethrow.server.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "unstable_rethrow", {
    enumerable: true,
    get: function() {
        return unstable_rethrow;
    }
});
const _dynamicrenderingutils = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/server/dynamic-rendering-utils.js [app-ssr] (ecmascript)");
const _ispostpone = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/server/lib/router-utils/is-postpone.js [app-ssr] (ecmascript)");
const _bailouttocsr = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/shared/lib/lazy-dynamic/bailout-to-csr.js [app-ssr] (ecmascript)");
const _isnextroutererror = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/client/components/is-next-router-error.js [app-ssr] (ecmascript)");
const _dynamicrendering = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/server/app-render/dynamic-rendering.js [app-ssr] (ecmascript)");
const _hooksservercontext = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/client/components/hooks-server-context.js [app-ssr] (ecmascript)");
function unstable_rethrow(error) {
    if ((0, _isnextroutererror.isNextRouterError)(error) || (0, _bailouttocsr.isBailoutToCSRError)(error) || (0, _hooksservercontext.isDynamicServerError)(error) || (0, _dynamicrendering.isDynamicPostpone)(error) || (0, _ispostpone.isPostpone)(error) || (0, _dynamicrenderingutils.isHangingPromiseRejectionError)(error)) {
        throw error;
    }
    if (error instanceof Error && 'cause' in error) {
        unstable_rethrow(error.cause);
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=unstable-rethrow.server.js.map
}}),
"[project]/p2p-react/node_modules/next/dist/client/components/unstable-rethrow.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
/**
 * This function should be used to rethrow internal Next.js errors so that they can be handled by the framework.
 * When wrapping an API that uses errors to interrupt control flow, you should use this function before you do any error handling.
 * This function will rethrow the error if it is a Next.js error so it can be handled, otherwise it will do nothing.
 *
 * Read more: [Next.js Docs: `unstable_rethrow`](https://nextjs.org/docs/app/api-reference/functions/unstable_rethrow)
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "unstable_rethrow", {
    enumerable: true,
    get: function() {
        return unstable_rethrow;
    }
});
const unstable_rethrow = ("TURBOPACK compile-time truthy", 1) ? __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/client/components/unstable-rethrow.server.js [app-ssr] (ecmascript)").unstable_rethrow : "TURBOPACK unreachable";
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=unstable-rethrow.js.map
}}),
"[project]/p2p-react/node_modules/next/dist/client/components/navigation.react-server.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
/** @internal */ Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    ReadonlyURLSearchParams: null,
    RedirectType: null,
    forbidden: null,
    notFound: null,
    permanentRedirect: null,
    redirect: null,
    unauthorized: null,
    unstable_rethrow: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ReadonlyURLSearchParams: function() {
        return ReadonlyURLSearchParams;
    },
    RedirectType: function() {
        return _redirecterror.RedirectType;
    },
    forbidden: function() {
        return _forbidden.forbidden;
    },
    notFound: function() {
        return _notfound.notFound;
    },
    permanentRedirect: function() {
        return _redirect.permanentRedirect;
    },
    redirect: function() {
        return _redirect.redirect;
    },
    unauthorized: function() {
        return _unauthorized.unauthorized;
    },
    unstable_rethrow: function() {
        return _unstablerethrow.unstable_rethrow;
    }
});
const _redirect = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/client/components/redirect.js [app-ssr] (ecmascript)");
const _redirecterror = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/client/components/redirect-error.js [app-ssr] (ecmascript)");
const _notfound = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/client/components/not-found.js [app-ssr] (ecmascript)");
const _forbidden = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/client/components/forbidden.js [app-ssr] (ecmascript)");
const _unauthorized = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/client/components/unauthorized.js [app-ssr] (ecmascript)");
const _unstablerethrow = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/client/components/unstable-rethrow.js [app-ssr] (ecmascript)");
class ReadonlyURLSearchParamsError extends Error {
    constructor(){
        super('Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams');
    }
}
class ReadonlyURLSearchParams extends URLSearchParams {
    /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ append() {
        throw new ReadonlyURLSearchParamsError();
    }
    /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ delete() {
        throw new ReadonlyURLSearchParamsError();
    }
    /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ set() {
        throw new ReadonlyURLSearchParamsError();
    }
    /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ sort() {
        throw new ReadonlyURLSearchParamsError();
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=navigation.react-server.js.map
}}),
"[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/contexts/server-inserted-html.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
module.exports = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['contexts'].ServerInsertedHtml; //# sourceMappingURL=server-inserted-html.js.map
}}),
"[project]/p2p-react/node_modules/next/dist/client/components/bailout-to-client-rendering.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "bailoutToClientRendering", {
    enumerable: true,
    get: function() {
        return bailoutToClientRendering;
    }
});
const _bailouttocsr = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/shared/lib/lazy-dynamic/bailout-to-csr.js [app-ssr] (ecmascript)");
const _workasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)");
const _workunitasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)");
function bailoutToClientRendering(reason) {
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    if (workStore == null ? void 0 : workStore.forceStatic) return;
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (workUnitStore) {
        switch(workUnitStore.type){
            case 'prerender':
            case 'prerender-client':
            case 'prerender-ppr':
            case 'prerender-legacy':
                throw Object.defineProperty(new _bailouttocsr.BailoutToCSRError(reason), "__NEXT_ERROR_CODE", {
                    value: "E394",
                    enumerable: false,
                    configurable: true
                });
            default:
        }
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=bailout-to-client-rendering.js.map
}}),
"[project]/p2p-react/node_modules/next/dist/client/components/navigation.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    ReadonlyURLSearchParams: null,
    RedirectType: null,
    ServerInsertedHTMLContext: null,
    forbidden: null,
    notFound: null,
    permanentRedirect: null,
    redirect: null,
    unauthorized: null,
    unstable_rethrow: null,
    useParams: null,
    usePathname: null,
    useRouter: null,
    useSearchParams: null,
    useSelectedLayoutSegment: null,
    useSelectedLayoutSegments: null,
    useServerInsertedHTML: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ReadonlyURLSearchParams: function() {
        return _navigationreactserver.ReadonlyURLSearchParams;
    },
    RedirectType: function() {
        return _navigationreactserver.RedirectType;
    },
    ServerInsertedHTMLContext: function() {
        return _serverinsertedhtmlsharedruntime.ServerInsertedHTMLContext;
    },
    forbidden: function() {
        return _navigationreactserver.forbidden;
    },
    notFound: function() {
        return _navigationreactserver.notFound;
    },
    permanentRedirect: function() {
        return _navigationreactserver.permanentRedirect;
    },
    redirect: function() {
        return _navigationreactserver.redirect;
    },
    unauthorized: function() {
        return _navigationreactserver.unauthorized;
    },
    unstable_rethrow: function() {
        return _navigationreactserver.unstable_rethrow;
    },
    useParams: function() {
        return useParams;
    },
    usePathname: function() {
        return usePathname;
    },
    useRouter: function() {
        return useRouter;
    },
    useSearchParams: function() {
        return useSearchParams;
    },
    useSelectedLayoutSegment: function() {
        return useSelectedLayoutSegment;
    },
    useSelectedLayoutSegments: function() {
        return useSelectedLayoutSegments;
    },
    useServerInsertedHTML: function() {
        return _serverinsertedhtmlsharedruntime.useServerInsertedHTML;
    }
});
const _react = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
const _approutercontextsharedruntime = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/contexts/app-router-context.js [app-ssr] (ecmascript)");
const _hooksclientcontextsharedruntime = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/contexts/hooks-client-context.js [app-ssr] (ecmascript)");
const _getsegmentvalue = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/client/components/router-reducer/reducers/get-segment-value.js [app-ssr] (ecmascript)");
const _segment = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/shared/lib/segment.js [app-ssr] (ecmascript)");
const _navigationreactserver = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/client/components/navigation.react-server.js [app-ssr] (ecmascript)");
const _serverinsertedhtmlsharedruntime = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/contexts/server-inserted-html.js [app-ssr] (ecmascript)");
const useDynamicRouteParams = ("TURBOPACK compile-time truthy", 1) ? __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/server/app-render/dynamic-rendering.js [app-ssr] (ecmascript)").useDynamicRouteParams : "TURBOPACK unreachable";
function useSearchParams() {
    const searchParams = (0, _react.useContext)(_hooksclientcontextsharedruntime.SearchParamsContext);
    // In the case where this is `null`, the compat types added in
    // `next-env.d.ts` will add a new overload that changes the return type to
    // include `null`.
    const readonlySearchParams = (0, _react.useMemo)(()=>{
        if (!searchParams) {
            // When the router is not ready in pages, we won't have the search params
            // available.
            return null;
        }
        return new _navigationreactserver.ReadonlyURLSearchParams(searchParams);
    }, [
        searchParams
    ]);
    if ("TURBOPACK compile-time truthy", 1) {
        // AsyncLocalStorage should not be included in the client bundle.
        const { bailoutToClientRendering } = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/client/components/bailout-to-client-rendering.js [app-ssr] (ecmascript)");
        // TODO-APP: handle dynamic = 'force-static' here and on the client
        bailoutToClientRendering('useSearchParams()');
    }
    return readonlySearchParams;
}
function usePathname() {
    useDynamicRouteParams == null ? void 0 : useDynamicRouteParams('usePathname()');
    // In the case where this is `null`, the compat types added in `next-env.d.ts`
    // will add a new overload that changes the return type to include `null`.
    return (0, _react.useContext)(_hooksclientcontextsharedruntime.PathnameContext);
}
function useRouter() {
    const router = (0, _react.useContext)(_approutercontextsharedruntime.AppRouterContext);
    if (router === null) {
        throw Object.defineProperty(new Error('invariant expected app router to be mounted'), "__NEXT_ERROR_CODE", {
            value: "E238",
            enumerable: false,
            configurable: true
        });
    }
    return router;
}
function useParams() {
    useDynamicRouteParams == null ? void 0 : useDynamicRouteParams('useParams()');
    return (0, _react.useContext)(_hooksclientcontextsharedruntime.PathParamsContext);
}
/** Get the canonical parameters from the current level to the leaf node. */ // Client components API
function getSelectedLayoutSegmentPath(tree, parallelRouteKey, first, segmentPath) {
    if (first === void 0) first = true;
    if (segmentPath === void 0) segmentPath = [];
    let node;
    if (first) {
        // Use the provided parallel route key on the first parallel route
        node = tree[1][parallelRouteKey];
    } else {
        // After first parallel route prefer children, if there's no children pick the first parallel route.
        const parallelRoutes = tree[1];
        var _parallelRoutes_children;
        node = (_parallelRoutes_children = parallelRoutes.children) != null ? _parallelRoutes_children : Object.values(parallelRoutes)[0];
    }
    if (!node) return segmentPath;
    const segment = node[0];
    let segmentValue = (0, _getsegmentvalue.getSegmentValue)(segment);
    if (!segmentValue || segmentValue.startsWith(_segment.PAGE_SEGMENT_KEY)) {
        return segmentPath;
    }
    segmentPath.push(segmentValue);
    return getSelectedLayoutSegmentPath(node, parallelRouteKey, false, segmentPath);
}
function useSelectedLayoutSegments(parallelRouteKey) {
    if (parallelRouteKey === void 0) parallelRouteKey = 'children';
    useDynamicRouteParams == null ? void 0 : useDynamicRouteParams('useSelectedLayoutSegments()');
    const context = (0, _react.useContext)(_approutercontextsharedruntime.LayoutRouterContext);
    // @ts-expect-error This only happens in `pages`. Type is overwritten in navigation.d.ts
    if (!context) return null;
    return getSelectedLayoutSegmentPath(context.parentTree, parallelRouteKey);
}
function useSelectedLayoutSegment(parallelRouteKey) {
    if (parallelRouteKey === void 0) parallelRouteKey = 'children';
    useDynamicRouteParams == null ? void 0 : useDynamicRouteParams('useSelectedLayoutSegment()');
    const selectedLayoutSegments = useSelectedLayoutSegments(parallelRouteKey);
    if (!selectedLayoutSegments || selectedLayoutSegments.length === 0) {
        return null;
    }
    const selectedLayoutSegment = parallelRouteKey === 'children' ? selectedLayoutSegments[0] : selectedLayoutSegments[selectedLayoutSegments.length - 1];
    // if the default slot is showing, we return null since it's not technically "selected" (it's a fallback)
    // and returning an internal value like `__DEFAULT__` would be confusing.
    return selectedLayoutSegment === _segment.DEFAULT_SEGMENT_KEY ? null : selectedLayoutSegment;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=navigation.js.map
}}),
"[project]/p2p-react/node_modules/next/navigation.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
module.exports = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/client/components/navigation.js [app-ssr] (ecmascript)");
}}),
"[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
module.exports = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxRuntime; //# sourceMappingURL=react-jsx-runtime.js.map
}}),
"[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
module.exports = __turbopack_context__.r("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactDOM; //# sourceMappingURL=react-dom.js.map
}}),
"[project]/p2p-react/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "clsx": ()=>clsx,
    "default": ()=>__TURBOPACK__default__export__
});
function r(e) {
    var t, f, n = "";
    if ("string" == typeof e || "number" == typeof e) n += e;
    else if ("object" == typeof e) if (Array.isArray(e)) {
        var o = e.length;
        for(t = 0; t < o; t++)e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else for(f in e)e[f] && (n && (n += " "), n += f);
    return n;
}
function clsx() {
    for(var e, t, f = 0, n = "", o = arguments.length; f < o; f++)(e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
    return n;
}
const __TURBOPACK__default__export__ = clsx;
}),
"[project]/p2p-react/node_modules/@radix-ui/react-compose-refs/dist/index.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// packages/react/compose-refs/src/compose-refs.tsx
__turbopack_context__.s({
    "composeRefs": ()=>composeRefs,
    "useComposedRefs": ()=>useComposedRefs
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function setRef(ref, value) {
    if (typeof ref === "function") {
        return ref(value);
    } else if (ref !== null && ref !== void 0) {
        ref.current = value;
    }
}
function composeRefs(...refs) {
    return (node)=>{
        let hasCleanup = false;
        const cleanups = refs.map((ref)=>{
            const cleanup = setRef(ref, node);
            if (!hasCleanup && typeof cleanup == "function") {
                hasCleanup = true;
            }
            return cleanup;
        });
        if (hasCleanup) {
            return ()=>{
                for(let i = 0; i < cleanups.length; i++){
                    const cleanup = cleanups[i];
                    if (typeof cleanup == "function") {
                        cleanup();
                    } else {
                        setRef(refs[i], null);
                    }
                }
            };
        }
    };
}
function useComposedRefs(...refs) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](composeRefs(...refs), refs);
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/p2p-react/node_modules/@radix-ui/react-slot/dist/index.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// src/slot.tsx
__turbopack_context__.s({
    "Root": ()=>Slot,
    "Slot": ()=>Slot,
    "Slottable": ()=>Slottable,
    "createSlot": ()=>createSlot,
    "createSlottable": ()=>createSlottable
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/@radix-ui/react-compose-refs/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
;
;
;
// @__NO_SIDE_EFFECTS__
function createSlot(ownerName) {
    const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
    const Slot2 = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"]((props, forwardedRef)=>{
        const { children, ...slotProps } = props;
        const childrenArray = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Children"].toArray(children);
        const slottable = childrenArray.find(isSlottable);
        if (slottable) {
            const newElement = slottable.props.children;
            const newChildren = childrenArray.map((child)=>{
                if (child === slottable) {
                    if (__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Children"].count(newElement) > 1) return __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Children"].only(null);
                    return __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidElement"](newElement) ? newElement.props.children : null;
                } else {
                    return child;
                }
            });
            return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(SlotClone, {
                ...slotProps,
                ref: forwardedRef,
                children: __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidElement"](newElement) ? __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cloneElement"](newElement, void 0, newChildren) : null
            });
        }
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(SlotClone, {
            ...slotProps,
            ref: forwardedRef,
            children
        });
    });
    Slot2.displayName = `${ownerName}.Slot`;
    return Slot2;
}
var Slot = /* @__PURE__ */ createSlot("Slot");
// @__NO_SIDE_EFFECTS__
function createSlotClone(ownerName) {
    const SlotClone = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"]((props, forwardedRef)=>{
        const { children, ...slotProps } = props;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidElement"](children)) {
            const childrenRef = getElementRef(children);
            const props2 = mergeProps(slotProps, children.props);
            if (children.type !== __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"]) {
                props2.ref = forwardedRef ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["composeRefs"])(forwardedRef, childrenRef) : childrenRef;
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cloneElement"](children, props2);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Children"].count(children) > 1 ? __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Children"].only(null) : null;
    });
    SlotClone.displayName = `${ownerName}.SlotClone`;
    return SlotClone;
}
var SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function createSlottable(ownerName) {
    const Slottable2 = ({ children })=>{
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children
        });
    };
    Slottable2.displayName = `${ownerName}.Slottable`;
    Slottable2.__radixId = SLOTTABLE_IDENTIFIER;
    return Slottable2;
}
var Slottable = /* @__PURE__ */ createSlottable("Slottable");
function isSlottable(child) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidElement"](child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(slotProps, childProps) {
    const overrideProps = {
        ...childProps
    };
    for(const propName in childProps){
        const slotPropValue = slotProps[propName];
        const childPropValue = childProps[propName];
        const isHandler = /^on[A-Z]/.test(propName);
        if (isHandler) {
            if (slotPropValue && childPropValue) {
                overrideProps[propName] = (...args)=>{
                    const result = childPropValue(...args);
                    slotPropValue(...args);
                    return result;
                };
            } else if (slotPropValue) {
                overrideProps[propName] = slotPropValue;
            }
        } else if (propName === "style") {
            overrideProps[propName] = {
                ...slotPropValue,
                ...childPropValue
            };
        } else if (propName === "className") {
            overrideProps[propName] = [
                slotPropValue,
                childPropValue
            ].filter(Boolean).join(" ");
        }
    }
    return {
        ...slotProps,
        ...overrideProps
    };
}
function getElementRef(element) {
    let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
    let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
    if (mayWarn) {
        return element.ref;
    }
    getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
    mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
    if (mayWarn) {
        return element.props.ref;
    }
    return element.props.ref || element.ref;
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/p2p-react/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * Copyright 2022 Joe Bell. All rights reserved.
 *
 * This file is licensed to you under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR REPRESENTATIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */ __turbopack_context__.s({
    "cva": ()=>cva,
    "cx": ()=>cx
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
;
const falsyToString = (value)=>typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
const cx = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"];
const cva = (base, config)=>(props)=>{
        var _config_compoundVariants;
        if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
        const { variants, defaultVariants } = config;
        const getVariantClassNames = Object.keys(variants).map((variant)=>{
            const variantProp = props === null || props === void 0 ? void 0 : props[variant];
            const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
            if (variantProp === null) return null;
            const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
            return variants[variant][variantKey];
        });
        const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param)=>{
            let [key, value] = param;
            if (value === undefined) {
                return acc;
            }
            acc[key] = value;
            return acc;
        }, {});
        const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param)=>{
            let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
            return Object.entries(compoundVariantOptions).every((param)=>{
                let [key, value] = param;
                return Array.isArray(value) ? value.includes({
                    ...defaultVariants,
                    ...propsWithoutUndefined
                }[key]) : ({
                    ...defaultVariants,
                    ...propsWithoutUndefined
                })[key] === value;
            }) ? [
                ...acc,
                cvClass,
                cvClassName
            ] : acc;
        }, []);
        return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
    };
}),
"[project]/p2p-react/node_modules/@radix-ui/primitive/dist/index.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// packages/core/primitive/src/primitive.tsx
__turbopack_context__.s({
    "composeEventHandlers": ()=>composeEventHandlers
});
function composeEventHandlers(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
    return function handleEvent(event) {
        originalEventHandler?.(event);
        if (checkForDefaultPrevented === false || !event.defaultPrevented) {
            return ourEventHandler?.(event);
        }
    };
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/p2p-react/node_modules/@radix-ui/react-context/dist/index.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// packages/react/context/src/create-context.tsx
__turbopack_context__.s({
    "createContext": ()=>createContext2,
    "createContextScope": ()=>createContextScope
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
;
;
function createContext2(rootComponentName, defaultContext) {
    const Context = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"](defaultContext);
    const Provider = (props)=>{
        const { children, ...context } = props;
        const value = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>context, Object.values(context));
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(Context.Provider, {
            value,
            children
        });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName) {
        const context = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](Context);
        if (context) return context;
        if (defaultContext !== void 0) return defaultContext;
        throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [
        Provider,
        useContext2
    ];
}
function createContextScope(scopeName, createContextScopeDeps = []) {
    let defaultContexts = [];
    function createContext3(rootComponentName, defaultContext) {
        const BaseContext = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"](defaultContext);
        const index = defaultContexts.length;
        defaultContexts = [
            ...defaultContexts,
            defaultContext
        ];
        const Provider = (props)=>{
            const { scope, children, ...context } = props;
            const Context = scope?.[scopeName]?.[index] || BaseContext;
            const value = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>context, Object.values(context));
            return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(Context.Provider, {
                value,
                children
            });
        };
        Provider.displayName = rootComponentName + "Provider";
        function useContext2(consumerName, scope) {
            const Context = scope?.[scopeName]?.[index] || BaseContext;
            const context = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](Context);
            if (context) return context;
            if (defaultContext !== void 0) return defaultContext;
            throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
        }
        return [
            Provider,
            useContext2
        ];
    }
    const createScope = ()=>{
        const scopeContexts = defaultContexts.map((defaultContext)=>{
            return __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"](defaultContext);
        });
        return function useScope(scope) {
            const contexts = scope?.[scopeName] || scopeContexts;
            return __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
                    [`__scope${scopeName}`]: {
                        ...scope,
                        [scopeName]: contexts
                    }
                }), [
                scope,
                contexts
            ]);
        };
    };
    createScope.scopeName = scopeName;
    return [
        createContext3,
        composeContextScopes(createScope, ...createContextScopeDeps)
    ];
}
function composeContextScopes(...scopes) {
    const baseScope = scopes[0];
    if (scopes.length === 1) return baseScope;
    const createScope = ()=>{
        const scopeHooks = scopes.map((createScope2)=>({
                useScope: createScope2(),
                scopeName: createScope2.scopeName
            }));
        return function useComposedScopes(overrideScopes) {
            const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName })=>{
                const scopeProps = useScope(overrideScopes);
                const currentScope = scopeProps[`__scope${scopeName}`];
                return {
                    ...nextScopes2,
                    ...currentScope
                };
            }, {});
            return __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
                    [`__scope${baseScope.scopeName}`]: nextScopes
                }), [
                nextScopes
            ]);
        };
    };
    createScope.scopeName = baseScope.scopeName;
    return createScope;
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/p2p-react/node_modules/@radix-ui/react-collection/dist/index.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "createCollection": ()=>createCollection,
    "unstable_createCollection": ()=>createCollection2
});
// src/collection-legacy.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$context$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/@radix-ui/react-context/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/@radix-ui/react-compose-refs/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/@radix-ui/react-slot/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function createCollection(name) {
    const PROVIDER_NAME = name + "CollectionProvider";
    const [createCollectionContext, createCollectionScope] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$context$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContextScope"])(PROVIDER_NAME);
    const [CollectionProviderImpl, useCollectionContext] = createCollectionContext(PROVIDER_NAME, {
        collectionRef: {
            current: null
        },
        itemMap: /* @__PURE__ */ new Map()
    });
    const CollectionProvider = (props)=>{
        const { scope, children } = props;
        const ref = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
        const itemMap = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(/* @__PURE__ */ new Map()).current;
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(CollectionProviderImpl, {
            scope,
            itemMap,
            collectionRef: ref,
            children
        });
    };
    CollectionProvider.displayName = PROVIDER_NAME;
    const COLLECTION_SLOT_NAME = name + "CollectionSlot";
    const CollectionSlotImpl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSlot"])(COLLECTION_SLOT_NAME);
    const CollectionSlot = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].forwardRef((props, forwardedRef)=>{
        const { scope, children } = props;
        const context = useCollectionContext(COLLECTION_SLOT_NAME, scope);
        const composedRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComposedRefs"])(forwardedRef, context.collectionRef);
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(CollectionSlotImpl, {
            ref: composedRefs,
            children
        });
    });
    CollectionSlot.displayName = COLLECTION_SLOT_NAME;
    const ITEM_SLOT_NAME = name + "CollectionItemSlot";
    const ITEM_DATA_ATTR = "data-radix-collection-item";
    const CollectionItemSlotImpl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSlot"])(ITEM_SLOT_NAME);
    const CollectionItemSlot = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].forwardRef((props, forwardedRef)=>{
        const { scope, children, ...itemData } = props;
        const ref = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
        const composedRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComposedRefs"])(forwardedRef, ref);
        const context = useCollectionContext(ITEM_SLOT_NAME, scope);
        __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
            context.itemMap.set(ref, {
                ref,
                ...itemData
            });
            return ()=>void context.itemMap.delete(ref);
        });
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(CollectionItemSlotImpl, {
            ...{
                [ITEM_DATA_ATTR]: ""
            },
            ref: composedRefs,
            children
        });
    });
    CollectionItemSlot.displayName = ITEM_SLOT_NAME;
    function useCollection(scope) {
        const context = useCollectionContext(name + "CollectionConsumer", scope);
        const getItems = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback(()=>{
            const collectionNode = context.collectionRef.current;
            if (!collectionNode) return [];
            const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`));
            const items = Array.from(context.itemMap.values());
            const orderedItems = items.sort((a, b)=>orderedNodes.indexOf(a.ref.current) - orderedNodes.indexOf(b.ref.current));
            return orderedItems;
        }, [
            context.collectionRef,
            context.itemMap
        ]);
        return getItems;
    }
    return [
        {
            Provider: CollectionProvider,
            Slot: CollectionSlot,
            ItemSlot: CollectionItemSlot
        },
        useCollection,
        createCollectionScope
    ];
}
;
;
;
;
// src/ordered-dictionary.ts
var __instanciated = /* @__PURE__ */ new WeakMap();
var OrderedDict = class _OrderedDict extends Map {
    #keys;
    constructor(entries){
        super(entries);
        this.#keys = [
            ...super.keys()
        ];
        __instanciated.set(this, true);
    }
    set(key, value) {
        if (__instanciated.get(this)) {
            if (this.has(key)) {
                this.#keys[this.#keys.indexOf(key)] = key;
            } else {
                this.#keys.push(key);
            }
        }
        super.set(key, value);
        return this;
    }
    insert(index, key, value) {
        const has = this.has(key);
        const length = this.#keys.length;
        const relativeIndex = toSafeInteger(index);
        let actualIndex = relativeIndex >= 0 ? relativeIndex : length + relativeIndex;
        const safeIndex = actualIndex < 0 || actualIndex >= length ? -1 : actualIndex;
        if (safeIndex === this.size || has && safeIndex === this.size - 1 || safeIndex === -1) {
            this.set(key, value);
            return this;
        }
        const size = this.size + (has ? 0 : 1);
        if (relativeIndex < 0) {
            actualIndex++;
        }
        const keys = [
            ...this.#keys
        ];
        let nextValue;
        let shouldSkip = false;
        for(let i = actualIndex; i < size; i++){
            if (actualIndex === i) {
                let nextKey = keys[i];
                if (keys[i] === key) {
                    nextKey = keys[i + 1];
                }
                if (has) {
                    this.delete(key);
                }
                nextValue = this.get(nextKey);
                this.set(key, value);
            } else {
                if (!shouldSkip && keys[i - 1] === key) {
                    shouldSkip = true;
                }
                const currentKey = keys[shouldSkip ? i : i - 1];
                const currentValue = nextValue;
                nextValue = this.get(currentKey);
                this.delete(currentKey);
                this.set(currentKey, currentValue);
            }
        }
        return this;
    }
    with(index, key, value) {
        const copy = new _OrderedDict(this);
        copy.insert(index, key, value);
        return copy;
    }
    before(key) {
        const index = this.#keys.indexOf(key) - 1;
        if (index < 0) {
            return void 0;
        }
        return this.entryAt(index);
    }
    /**
   * Sets a new key-value pair at the position before the given key.
   */ setBefore(key, newKey, value) {
        const index = this.#keys.indexOf(key);
        if (index === -1) {
            return this;
        }
        return this.insert(index, newKey, value);
    }
    after(key) {
        let index = this.#keys.indexOf(key);
        index = index === -1 || index === this.size - 1 ? -1 : index + 1;
        if (index === -1) {
            return void 0;
        }
        return this.entryAt(index);
    }
    /**
   * Sets a new key-value pair at the position after the given key.
   */ setAfter(key, newKey, value) {
        const index = this.#keys.indexOf(key);
        if (index === -1) {
            return this;
        }
        return this.insert(index + 1, newKey, value);
    }
    first() {
        return this.entryAt(0);
    }
    last() {
        return this.entryAt(-1);
    }
    clear() {
        this.#keys = [];
        return super.clear();
    }
    delete(key) {
        const deleted = super.delete(key);
        if (deleted) {
            this.#keys.splice(this.#keys.indexOf(key), 1);
        }
        return deleted;
    }
    deleteAt(index) {
        const key = this.keyAt(index);
        if (key !== void 0) {
            return this.delete(key);
        }
        return false;
    }
    at(index) {
        const key = at(this.#keys, index);
        if (key !== void 0) {
            return this.get(key);
        }
    }
    entryAt(index) {
        const key = at(this.#keys, index);
        if (key !== void 0) {
            return [
                key,
                this.get(key)
            ];
        }
    }
    indexOf(key) {
        return this.#keys.indexOf(key);
    }
    keyAt(index) {
        return at(this.#keys, index);
    }
    from(key, offset) {
        const index = this.indexOf(key);
        if (index === -1) {
            return void 0;
        }
        let dest = index + offset;
        if (dest < 0) dest = 0;
        if (dest >= this.size) dest = this.size - 1;
        return this.at(dest);
    }
    keyFrom(key, offset) {
        const index = this.indexOf(key);
        if (index === -1) {
            return void 0;
        }
        let dest = index + offset;
        if (dest < 0) dest = 0;
        if (dest >= this.size) dest = this.size - 1;
        return this.keyAt(dest);
    }
    find(predicate, thisArg) {
        let index = 0;
        for (const entry of this){
            if (Reflect.apply(predicate, thisArg, [
                entry,
                index,
                this
            ])) {
                return entry;
            }
            index++;
        }
        return void 0;
    }
    findIndex(predicate, thisArg) {
        let index = 0;
        for (const entry of this){
            if (Reflect.apply(predicate, thisArg, [
                entry,
                index,
                this
            ])) {
                return index;
            }
            index++;
        }
        return -1;
    }
    filter(predicate, thisArg) {
        const entries = [];
        let index = 0;
        for (const entry of this){
            if (Reflect.apply(predicate, thisArg, [
                entry,
                index,
                this
            ])) {
                entries.push(entry);
            }
            index++;
        }
        return new _OrderedDict(entries);
    }
    map(callbackfn, thisArg) {
        const entries = [];
        let index = 0;
        for (const entry of this){
            entries.push([
                entry[0],
                Reflect.apply(callbackfn, thisArg, [
                    entry,
                    index,
                    this
                ])
            ]);
            index++;
        }
        return new _OrderedDict(entries);
    }
    reduce(...args) {
        const [callbackfn, initialValue] = args;
        let index = 0;
        let accumulator = initialValue ?? this.at(0);
        for (const entry of this){
            if (index === 0 && args.length === 1) {
                accumulator = entry;
            } else {
                accumulator = Reflect.apply(callbackfn, this, [
                    accumulator,
                    entry,
                    index,
                    this
                ]);
            }
            index++;
        }
        return accumulator;
    }
    reduceRight(...args) {
        const [callbackfn, initialValue] = args;
        let accumulator = initialValue ?? this.at(-1);
        for(let index = this.size - 1; index >= 0; index--){
            const entry = this.at(index);
            if (index === this.size - 1 && args.length === 1) {
                accumulator = entry;
            } else {
                accumulator = Reflect.apply(callbackfn, this, [
                    accumulator,
                    entry,
                    index,
                    this
                ]);
            }
        }
        return accumulator;
    }
    toSorted(compareFn) {
        const entries = [
            ...this.entries()
        ].sort(compareFn);
        return new _OrderedDict(entries);
    }
    toReversed() {
        const reversed = new _OrderedDict();
        for(let index = this.size - 1; index >= 0; index--){
            const key = this.keyAt(index);
            const element = this.get(key);
            reversed.set(key, element);
        }
        return reversed;
    }
    toSpliced(...args) {
        const entries = [
            ...this.entries()
        ];
        entries.splice(...args);
        return new _OrderedDict(entries);
    }
    slice(start, end) {
        const result = new _OrderedDict();
        let stop = this.size - 1;
        if (start === void 0) {
            return result;
        }
        if (start < 0) {
            start = start + this.size;
        }
        if (end !== void 0 && end > 0) {
            stop = end - 1;
        }
        for(let index = start; index <= stop; index++){
            const key = this.keyAt(index);
            const element = this.get(key);
            result.set(key, element);
        }
        return result;
    }
    every(predicate, thisArg) {
        let index = 0;
        for (const entry of this){
            if (!Reflect.apply(predicate, thisArg, [
                entry,
                index,
                this
            ])) {
                return false;
            }
            index++;
        }
        return true;
    }
    some(predicate, thisArg) {
        let index = 0;
        for (const entry of this){
            if (Reflect.apply(predicate, thisArg, [
                entry,
                index,
                this
            ])) {
                return true;
            }
            index++;
        }
        return false;
    }
};
function at(array, index) {
    if ("at" in Array.prototype) {
        return Array.prototype.at.call(array, index);
    }
    const actualIndex = toSafeIndex(array, index);
    return actualIndex === -1 ? void 0 : array[actualIndex];
}
function toSafeIndex(array, index) {
    const length = array.length;
    const relativeIndex = toSafeInteger(index);
    const actualIndex = relativeIndex >= 0 ? relativeIndex : length + relativeIndex;
    return actualIndex < 0 || actualIndex >= length ? -1 : actualIndex;
}
function toSafeInteger(number) {
    return number !== number || number === 0 ? 0 : Math.trunc(number);
}
;
function createCollection2(name) {
    const PROVIDER_NAME = name + "CollectionProvider";
    const [createCollectionContext, createCollectionScope] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$context$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContextScope"])(PROVIDER_NAME);
    const [CollectionContextProvider, useCollectionContext] = createCollectionContext(PROVIDER_NAME, {
        collectionElement: null,
        collectionRef: {
            current: null
        },
        collectionRefObject: {
            current: null
        },
        itemMap: new OrderedDict(),
        setItemMap: ()=>void 0
    });
    const CollectionProvider = ({ state, ...props })=>{
        return state ? /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(CollectionProviderImpl, {
            ...props,
            state
        }) : /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(CollectionInit, {
            ...props
        });
    };
    CollectionProvider.displayName = PROVIDER_NAME;
    const CollectionInit = (props)=>{
        const state = useInitCollection();
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(CollectionProviderImpl, {
            ...props,
            state
        });
    };
    CollectionInit.displayName = PROVIDER_NAME + "Init";
    const CollectionProviderImpl = (props)=>{
        const { scope, children, state } = props;
        const ref = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
        const [collectionElement, setCollectionElement] = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(null);
        const composeRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComposedRefs"])(ref, setCollectionElement);
        const [itemMap, setItemMap] = state;
        __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
            if (!collectionElement) return;
            const observer = getChildListObserver(()=>{});
            observer.observe(collectionElement, {
                childList: true,
                subtree: true
            });
            return ()=>{
                observer.disconnect();
            };
        }, [
            collectionElement
        ]);
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(CollectionContextProvider, {
            scope,
            itemMap,
            setItemMap,
            collectionRef: composeRefs,
            collectionRefObject: ref,
            collectionElement,
            children
        });
    };
    CollectionProviderImpl.displayName = PROVIDER_NAME + "Impl";
    const COLLECTION_SLOT_NAME = name + "CollectionSlot";
    const CollectionSlotImpl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSlot"])(COLLECTION_SLOT_NAME);
    const CollectionSlot = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].forwardRef((props, forwardedRef)=>{
        const { scope, children } = props;
        const context = useCollectionContext(COLLECTION_SLOT_NAME, scope);
        const composedRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComposedRefs"])(forwardedRef, context.collectionRef);
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(CollectionSlotImpl, {
            ref: composedRefs,
            children
        });
    });
    CollectionSlot.displayName = COLLECTION_SLOT_NAME;
    const ITEM_SLOT_NAME = name + "CollectionItemSlot";
    const ITEM_DATA_ATTR = "data-radix-collection-item";
    const CollectionItemSlotImpl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSlot"])(ITEM_SLOT_NAME);
    const CollectionItemSlot = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].forwardRef((props, forwardedRef)=>{
        const { scope, children, ...itemData } = props;
        const ref = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
        const [element, setElement] = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(null);
        const composedRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComposedRefs"])(forwardedRef, ref, setElement);
        const context = useCollectionContext(ITEM_SLOT_NAME, scope);
        const { setItemMap } = context;
        const itemDataRef = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(itemData);
        if (!shallowEqual(itemDataRef.current, itemData)) {
            itemDataRef.current = itemData;
        }
        const memoizedItemData = itemDataRef.current;
        __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
            const itemData2 = memoizedItemData;
            setItemMap((map)=>{
                if (!element) {
                    return map;
                }
                if (!map.has(element)) {
                    map.set(element, {
                        ...itemData2,
                        element
                    });
                    return map.toSorted(sortByDocumentPosition);
                }
                return map.set(element, {
                    ...itemData2,
                    element
                }).toSorted(sortByDocumentPosition);
            });
            return ()=>{
                setItemMap((map)=>{
                    if (!element || !map.has(element)) {
                        return map;
                    }
                    map.delete(element);
                    return new OrderedDict(map);
                });
            };
        }, [
            element,
            memoizedItemData,
            setItemMap
        ]);
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(CollectionItemSlotImpl, {
            ...{
                [ITEM_DATA_ATTR]: ""
            },
            ref: composedRefs,
            children
        });
    });
    CollectionItemSlot.displayName = ITEM_SLOT_NAME;
    function useInitCollection() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(new OrderedDict());
    }
    function useCollection(scope) {
        const { itemMap } = useCollectionContext(name + "CollectionConsumer", scope);
        return itemMap;
    }
    const functions = {
        createCollectionScope,
        useCollection,
        useInitCollection
    };
    return [
        {
            Provider: CollectionProvider,
            Slot: CollectionSlot,
            ItemSlot: CollectionItemSlot
        },
        functions
    ];
}
function shallowEqual(a, b) {
    if (a === b) return true;
    if (typeof a !== "object" || typeof b !== "object") return false;
    if (a == null || b == null) return false;
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    for (const key of keysA){
        if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
        if (a[key] !== b[key]) return false;
    }
    return true;
}
function isElementPreceding(a, b) {
    return !!(b.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_PRECEDING);
}
function sortByDocumentPosition(a, b) {
    return !a[1].element || !b[1].element ? 0 : isElementPreceding(a[1].element, b[1].element) ? -1 : 1;
}
function getChildListObserver(callback) {
    const observer = new MutationObserver((mutationsList)=>{
        for (const mutation of mutationsList){
            if (mutation.type === "childList") {
                callback();
                return;
            }
        }
    });
    return observer;
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/p2p-react/node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// packages/react/use-layout-effect/src/use-layout-effect.tsx
__turbopack_context__.s({
    "useLayoutEffect": ()=>useLayoutEffect2
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
var useLayoutEffect2 = globalThis?.document ? __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLayoutEffect"] : ()=>{};
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/p2p-react/node_modules/@radix-ui/react-id/dist/index.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// packages/react/id/src/id.tsx
__turbopack_context__.s({
    "useId": ()=>useId
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$layout$2d$effect$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs [app-ssr] (ecmascript)");
;
;
var useReactId = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[" useId ".trim().toString()] || (()=>void 0);
var count = 0;
function useId(deterministicId) {
    const [id, setId] = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useState(useReactId());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$layout$2d$effect$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLayoutEffect"])(()=>{
        if (!deterministicId) setId((reactId)=>reactId ?? String(count++));
    }, [
        deterministicId
    ]);
    return deterministicId || (id ? `radix-${id}` : "");
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/p2p-react/node_modules/@radix-ui/react-primitive/dist/index.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// src/primitive.tsx
__turbopack_context__.s({
    "Primitive": ()=>Primitive,
    "Root": ()=>Root,
    "dispatchDiscreteCustomEvent": ()=>dispatchDiscreteCustomEvent
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/@radix-ui/react-slot/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
;
;
;
;
var NODES = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "select",
    "span",
    "svg",
    "ul"
];
var Primitive = NODES.reduce((primitive, node)=>{
    const Slot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSlot"])(`Primitive.${node}`);
    const Node = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"]((props, forwardedRef)=>{
        const { asChild, ...primitiveProps } = props;
        const Comp = asChild ? Slot : node;
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(Comp, {
            ...primitiveProps,
            ref: forwardedRef
        });
    });
    Node.displayName = `Primitive.${node}`;
    return {
        ...primitive,
        [node]: Node
    };
}, {});
function dispatchDiscreteCustomEvent(target, event) {
    if (target) __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["flushSync"](()=>target.dispatchEvent(event));
}
var Root = Primitive;
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/p2p-react/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// packages/react/use-callback-ref/src/use-callback-ref.tsx
__turbopack_context__.s({
    "useCallbackRef": ()=>useCallbackRef
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function useCallbackRef(callback) {
    const callbackRef = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](callback);
    __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        callbackRef.current = callback;
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>(...args)=>callbackRef.current?.(...args), []);
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/p2p-react/node_modules/@radix-ui/react-use-effect-event/dist/index.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// src/use-effect-event.tsx
__turbopack_context__.s({
    "useEffectEvent": ()=>useEffectEvent
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$layout$2d$effect$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
var useReactEffectEvent = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[" useEffectEvent ".trim().toString()];
var useReactInsertionEffect = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[" useInsertionEffect ".trim().toString()];
function useEffectEvent(callback) {
    if (typeof useReactEffectEvent === "function") {
        return useReactEffectEvent(callback);
    }
    const ref = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useRef(()=>{
        throw new Error("Cannot call an event handler while rendering.");
    });
    if (typeof useReactInsertionEffect === "function") {
        useReactInsertionEffect(()=>{
            ref.current = callback;
        });
    } else {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$layout$2d$effect$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLayoutEffect"])(()=>{
            ref.current = callback;
        });
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useMemo(()=>(...args)=>ref.current?.(...args), []);
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/p2p-react/node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// src/use-controllable-state.tsx
__turbopack_context__.s({
    "useControllableState": ()=>useControllableState,
    "useControllableStateReducer": ()=>useControllableStateReducer
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$layout$2d$effect$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$effect$2d$event$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/@radix-ui/react-use-effect-event/dist/index.mjs [app-ssr] (ecmascript)");
;
;
var useInsertionEffect = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[" useInsertionEffect ".trim().toString()] || __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$layout$2d$effect$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLayoutEffect"];
function useControllableState({ prop, defaultProp, onChange = ()=>{}, caller }) {
    const [uncontrolledProp, setUncontrolledProp, onChangeRef] = useUncontrolledState({
        defaultProp,
        onChange
    });
    const isControlled = prop !== void 0;
    const value = isControlled ? prop : uncontrolledProp;
    if ("TURBOPACK compile-time truthy", 1) {
        const isControlledRef = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useRef(prop !== void 0);
        __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useEffect(()=>{
            const wasControlled = isControlledRef.current;
            if (wasControlled !== isControlled) {
                const from = wasControlled ? "controlled" : "uncontrolled";
                const to = isControlled ? "controlled" : "uncontrolled";
                console.warn(`${caller} is changing from ${from} to ${to}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`);
            }
            isControlledRef.current = isControlled;
        }, [
            isControlled,
            caller
        ]);
    }
    const setValue = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useCallback((nextValue)=>{
        if (isControlled) {
            const value2 = isFunction(nextValue) ? nextValue(prop) : nextValue;
            if (value2 !== prop) {
                onChangeRef.current?.(value2);
            }
        } else {
            setUncontrolledProp(nextValue);
        }
    }, [
        isControlled,
        prop,
        setUncontrolledProp,
        onChangeRef
    ]);
    return [
        value,
        setValue
    ];
}
function useUncontrolledState({ defaultProp, onChange }) {
    const [value, setValue] = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useState(defaultProp);
    const prevValueRef = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useRef(value);
    const onChangeRef = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useRef(onChange);
    useInsertionEffect(()=>{
        onChangeRef.current = onChange;
    }, [
        onChange
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useEffect(()=>{
        if (prevValueRef.current !== value) {
            onChangeRef.current?.(value);
            prevValueRef.current = value;
        }
    }, [
        value,
        prevValueRef
    ]);
    return [
        value,
        setValue,
        onChangeRef
    ];
}
function isFunction(value) {
    return typeof value === "function";
}
;
;
var SYNC_STATE = Symbol("RADIX:SYNC_STATE");
function useControllableStateReducer(reducer, userArgs, initialArg, init) {
    const { prop: controlledState, defaultProp, onChange: onChangeProp, caller } = userArgs;
    const isControlled = controlledState !== void 0;
    const onChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$effect$2d$event$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffectEvent"])(onChangeProp);
    if ("TURBOPACK compile-time truthy", 1) {
        const isControlledRef = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useRef(controlledState !== void 0);
        __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useEffect(()=>{
            const wasControlled = isControlledRef.current;
            if (wasControlled !== isControlled) {
                const from = wasControlled ? "controlled" : "uncontrolled";
                const to = isControlled ? "controlled" : "uncontrolled";
                console.warn(`${caller} is changing from ${from} to ${to}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`);
            }
            isControlledRef.current = isControlled;
        }, [
            isControlled,
            caller
        ]);
    }
    const args = [
        {
            ...initialArg,
            state: defaultProp
        }
    ];
    if (init) {
        args.push(init);
    }
    const [internalState, dispatch] = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useReducer((state2, action)=>{
        if (action.type === SYNC_STATE) {
            return {
                ...state2,
                state: action.state
            };
        }
        const next = reducer(state2, action);
        if (isControlled && !Object.is(next.state, state2.state)) {
            onChange(next.state);
        }
        return next;
    }, ...args);
    const uncontrolledState = internalState.state;
    const prevValueRef = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useRef(uncontrolledState);
    __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useEffect(()=>{
        if (prevValueRef.current !== uncontrolledState) {
            prevValueRef.current = uncontrolledState;
            if (!isControlled) {
                onChange(uncontrolledState);
            }
        }
    }, [
        onChange,
        uncontrolledState,
        prevValueRef,
        isControlled
    ]);
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useMemo(()=>{
        const isControlled2 = controlledState !== void 0;
        if (isControlled2) {
            return {
                ...internalState,
                state: controlledState
            };
        }
        return internalState;
    }, [
        internalState,
        controlledState
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useEffect(()=>{
        if (isControlled && !Object.is(controlledState, internalState.state)) {
            dispatch({
                type: SYNC_STATE,
                state: controlledState
            });
        }
    }, [
        controlledState,
        internalState.state,
        isControlled
    ]);
    return [
        state,
        dispatch
    ];
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/p2p-react/node_modules/@radix-ui/react-direction/dist/index.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// packages/react/direction/src/direction.tsx
__turbopack_context__.s({
    "DirectionProvider": ()=>DirectionProvider,
    "Provider": ()=>Provider,
    "useDirection": ()=>useDirection
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
;
;
var DirectionContext = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"](void 0);
var DirectionProvider = (props)=>{
    const { dir, children } = props;
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(DirectionContext.Provider, {
        value: dir,
        children
    });
};
function useDirection(localDir) {
    const globalDir = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](DirectionContext);
    return localDir || globalDir || "ltr";
}
var Provider = DirectionProvider;
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/p2p-react/node_modules/@radix-ui/react-roving-focus/dist/index.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "Item": ()=>Item,
    "Root": ()=>Root,
    "RovingFocusGroup": ()=>RovingFocusGroup,
    "RovingFocusGroupItem": ()=>RovingFocusGroupItem,
    "createRovingFocusGroupScope": ()=>createRovingFocusGroupScope
});
// src/roving-focus-group.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/@radix-ui/primitive/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$collection$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/@radix-ui/react-collection/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/@radix-ui/react-compose-refs/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$context$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/@radix-ui/react-context/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$id$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/@radix-ui/react-id/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/@radix-ui/react-primitive/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$callback$2d$ref$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$controllable$2d$state$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$direction$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/@radix-ui/react-direction/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = {
    bubbles: false,
    cancelable: true
};
var GROUP_NAME = "RovingFocusGroup";
var [Collection, useCollection, createCollectionScope] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$collection$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createCollection"])(GROUP_NAME);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$context$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContextScope"])(GROUP_NAME, [
    createCollectionScope
]);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
var RovingFocusGroup = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"]((props, forwardedRef)=>{
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(Collection.Provider, {
        scope: props.__scopeRovingFocusGroup,
        children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(Collection.Slot, {
            scope: props.__scopeRovingFocusGroup,
            children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(RovingFocusGroupImpl, {
                ...props,
                ref: forwardedRef
            })
        })
    });
});
RovingFocusGroup.displayName = GROUP_NAME;
var RovingFocusGroupImpl = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"]((props, forwardedRef)=>{
    const { __scopeRovingFocusGroup, orientation, loop = false, dir, currentTabStopId: currentTabStopIdProp, defaultCurrentTabStopId, onCurrentTabStopIdChange, onEntryFocus, preventScrollOnEntryFocus = false, ...groupProps } = props;
    const ref = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const composedRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComposedRefs"])(forwardedRef, ref);
    const direction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$direction$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDirection"])(dir);
    const [currentTabStopId, setCurrentTabStopId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$controllable$2d$state$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useControllableState"])({
        prop: currentTabStopIdProp,
        defaultProp: defaultCurrentTabStopId ?? null,
        onChange: onCurrentTabStopIdChange,
        caller: GROUP_NAME
    });
    const [isTabbingBackOut, setIsTabbingBackOut] = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const handleEntryFocus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$callback$2d$ref$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallbackRef"])(onEntryFocus);
    const getItems = useCollection(__scopeRovingFocusGroup);
    const isClickFocusRef = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](false);
    const [focusableItemsCount, setFocusableItemsCount] = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](0);
    __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        const node = ref.current;
        if (node) {
            node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
            return ()=>node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
        }
    }, [
        handleEntryFocus
    ]);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(RovingFocusProvider, {
        scope: __scopeRovingFocusGroup,
        orientation,
        dir: direction,
        loop,
        currentTabStopId,
        onItemFocus: __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((tabStopId)=>setCurrentTabStopId(tabStopId), [
            setCurrentTabStopId
        ]),
        onItemShiftTab: __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](()=>setIsTabbingBackOut(true), []),
        onFocusableItemAdd: __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](()=>setFocusableItemsCount((prevCount)=>prevCount + 1), []),
        onFocusableItemRemove: __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](()=>setFocusableItemsCount((prevCount)=>prevCount - 1), []),
        children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Primitive"].div, {
            tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
            "data-orientation": orientation,
            ...groupProps,
            ref: composedRefs,
            style: {
                outline: "none",
                ...props.style
            },
            onMouseDown: (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["composeEventHandlers"])(props.onMouseDown, ()=>{
                isClickFocusRef.current = true;
            }),
            onFocus: (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["composeEventHandlers"])(props.onFocus, (event)=>{
                const isKeyboardFocus = !isClickFocusRef.current;
                if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
                    const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
                    event.currentTarget.dispatchEvent(entryFocusEvent);
                    if (!entryFocusEvent.defaultPrevented) {
                        const items = getItems().filter((item)=>item.focusable);
                        const activeItem = items.find((item)=>item.active);
                        const currentItem = items.find((item)=>item.id === currentTabStopId);
                        const candidateItems = [
                            activeItem,
                            currentItem,
                            ...items
                        ].filter(Boolean);
                        const candidateNodes = candidateItems.map((item)=>item.ref.current);
                        focusFirst(candidateNodes, preventScrollOnEntryFocus);
                    }
                }
                isClickFocusRef.current = false;
            }),
            onBlur: (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["composeEventHandlers"])(props.onBlur, ()=>setIsTabbingBackOut(false))
        })
    });
});
var ITEM_NAME = "RovingFocusGroupItem";
var RovingFocusGroupItem = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"]((props, forwardedRef)=>{
    const { __scopeRovingFocusGroup, focusable = true, active = false, tabStopId, children, ...itemProps } = props;
    const autoId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$id$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])();
    const id = tabStopId || autoId;
    const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
    const isCurrentTabStop = context.currentTabStopId === id;
    const getItems = useCollection(__scopeRovingFocusGroup);
    const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
    __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (focusable) {
            onFocusableItemAdd();
            return ()=>onFocusableItemRemove();
        }
    }, [
        focusable,
        onFocusableItemAdd,
        onFocusableItemRemove
    ]);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(Collection.ItemSlot, {
        scope: __scopeRovingFocusGroup,
        id,
        focusable,
        active,
        children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Primitive"].span, {
            tabIndex: isCurrentTabStop ? 0 : -1,
            "data-orientation": context.orientation,
            ...itemProps,
            ref: forwardedRef,
            onMouseDown: (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["composeEventHandlers"])(props.onMouseDown, (event)=>{
                if (!focusable) event.preventDefault();
                else context.onItemFocus(id);
            }),
            onFocus: (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["composeEventHandlers"])(props.onFocus, ()=>context.onItemFocus(id)),
            onKeyDown: (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["composeEventHandlers"])(props.onKeyDown, (event)=>{
                if (event.key === "Tab" && event.shiftKey) {
                    context.onItemShiftTab();
                    return;
                }
                if (event.target !== event.currentTarget) return;
                const focusIntent = getFocusIntent(event, context.orientation, context.dir);
                if (focusIntent !== void 0) {
                    if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
                    event.preventDefault();
                    const items = getItems().filter((item)=>item.focusable);
                    let candidateNodes = items.map((item)=>item.ref.current);
                    if (focusIntent === "last") candidateNodes.reverse();
                    else if (focusIntent === "prev" || focusIntent === "next") {
                        if (focusIntent === "prev") candidateNodes.reverse();
                        const currentIndex = candidateNodes.indexOf(event.currentTarget);
                        candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
                    }
                    setTimeout(()=>focusFirst(candidateNodes));
                }
            }),
            children: typeof children === "function" ? children({
                isCurrentTabStop,
                hasTabStop: currentTabStopId != null
            }) : children
        })
    });
});
RovingFocusGroupItem.displayName = ITEM_NAME;
var MAP_KEY_TO_FOCUS_INTENT = {
    ArrowLeft: "prev",
    ArrowUp: "prev",
    ArrowRight: "next",
    ArrowDown: "next",
    PageUp: "first",
    Home: "first",
    PageDown: "last",
    End: "last"
};
function getDirectionAwareKey(key, dir) {
    if (dir !== "rtl") return key;
    return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
    const key = getDirectionAwareKey(event.key, dir);
    if (orientation === "vertical" && [
        "ArrowLeft",
        "ArrowRight"
    ].includes(key)) return void 0;
    if (orientation === "horizontal" && [
        "ArrowUp",
        "ArrowDown"
    ].includes(key)) return void 0;
    return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
    const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
    for (const candidate of candidates){
        if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
        candidate.focus({
            preventScroll
        });
        if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
    }
}
function wrapArray(array, startIndex) {
    return array.map((_, index)=>array[(startIndex + index) % array.length]);
}
var Root = RovingFocusGroup;
var Item = RovingFocusGroupItem;
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/p2p-react/node_modules/@radix-ui/react-presence/dist/index.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "Presence": ()=>Presence,
    "Root": ()=>Root
});
// src/presence.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/@radix-ui/react-compose-refs/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$layout$2d$effect$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function useStateMachine(initialState, machine) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducer"]((state, event)=>{
        const nextState = machine[state][event];
        return nextState ?? state;
    }, initialState);
}
// src/presence.tsx
var Presence = (props)=>{
    const { present, children } = props;
    const presence = usePresence(present);
    const child = typeof children === "function" ? children({
        present: presence.isPresent
    }) : __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Children"].only(children);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComposedRefs"])(presence.ref, getElementRef(child));
    const forceMount = typeof children === "function";
    return forceMount || presence.isPresent ? __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cloneElement"](child, {
        ref
    }) : null;
};
Presence.displayName = "Presence";
function usePresence(present) {
    const [node, setNode] = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]();
    const stylesRef = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const prevPresentRef = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](present);
    const prevAnimationNameRef = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"]("none");
    const initialState = present ? "mounted" : "unmounted";
    const [state, send] = useStateMachine(initialState, {
        mounted: {
            UNMOUNT: "unmounted",
            ANIMATION_OUT: "unmountSuspended"
        },
        unmountSuspended: {
            MOUNT: "mounted",
            ANIMATION_END: "unmounted"
        },
        unmounted: {
            MOUNT: "mounted"
        }
    });
    __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        const currentAnimationName = getAnimationName(stylesRef.current);
        prevAnimationNameRef.current = state === "mounted" ? currentAnimationName : "none";
    }, [
        state
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$layout$2d$effect$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLayoutEffect"])(()=>{
        const styles = stylesRef.current;
        const wasPresent = prevPresentRef.current;
        const hasPresentChanged = wasPresent !== present;
        if (hasPresentChanged) {
            const prevAnimationName = prevAnimationNameRef.current;
            const currentAnimationName = getAnimationName(styles);
            if (present) {
                send("MOUNT");
            } else if (currentAnimationName === "none" || styles?.display === "none") {
                send("UNMOUNT");
            } else {
                const isAnimating = prevAnimationName !== currentAnimationName;
                if (wasPresent && isAnimating) {
                    send("ANIMATION_OUT");
                } else {
                    send("UNMOUNT");
                }
            }
            prevPresentRef.current = present;
        }
    }, [
        present,
        send
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$layout$2d$effect$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLayoutEffect"])(()=>{
        if (node) {
            let timeoutId;
            const ownerWindow = node.ownerDocument.defaultView ?? window;
            const handleAnimationEnd = (event)=>{
                const currentAnimationName = getAnimationName(stylesRef.current);
                const isCurrentAnimation = currentAnimationName.includes(event.animationName);
                if (event.target === node && isCurrentAnimation) {
                    send("ANIMATION_END");
                    if (!prevPresentRef.current) {
                        const currentFillMode = node.style.animationFillMode;
                        node.style.animationFillMode = "forwards";
                        timeoutId = ownerWindow.setTimeout(()=>{
                            if (node.style.animationFillMode === "forwards") {
                                node.style.animationFillMode = currentFillMode;
                            }
                        });
                    }
                }
            };
            const handleAnimationStart = (event)=>{
                if (event.target === node) {
                    prevAnimationNameRef.current = getAnimationName(stylesRef.current);
                }
            };
            node.addEventListener("animationstart", handleAnimationStart);
            node.addEventListener("animationcancel", handleAnimationEnd);
            node.addEventListener("animationend", handleAnimationEnd);
            return ()=>{
                ownerWindow.clearTimeout(timeoutId);
                node.removeEventListener("animationstart", handleAnimationStart);
                node.removeEventListener("animationcancel", handleAnimationEnd);
                node.removeEventListener("animationend", handleAnimationEnd);
            };
        } else {
            send("ANIMATION_END");
        }
    }, [
        node,
        send
    ]);
    return {
        isPresent: [
            "mounted",
            "unmountSuspended"
        ].includes(state),
        ref: __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((node2)=>{
            stylesRef.current = node2 ? getComputedStyle(node2) : null;
            setNode(node2);
        }, [])
    };
}
function getAnimationName(styles) {
    return styles?.animationName || "none";
}
function getElementRef(element) {
    let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
    let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
    if (mayWarn) {
        return element.ref;
    }
    getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
    mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
    if (mayWarn) {
        return element.props.ref;
    }
    return element.props.ref || element.ref;
}
var Root = Presence;
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/p2p-react/node_modules/@radix-ui/react-tabs/dist/index.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "Content": ()=>Content,
    "List": ()=>List,
    "Root": ()=>Root2,
    "Tabs": ()=>Tabs,
    "TabsContent": ()=>TabsContent,
    "TabsList": ()=>TabsList,
    "TabsTrigger": ()=>TabsTrigger,
    "Trigger": ()=>Trigger,
    "createTabsScope": ()=>createTabsScope
});
// src/tabs.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/@radix-ui/primitive/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$context$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/@radix-ui/react-context/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$roving$2d$focus$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/@radix-ui/react-roving-focus/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$presence$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/@radix-ui/react-presence/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/@radix-ui/react-primitive/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$direction$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/@radix-ui/react-direction/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$controllable$2d$state$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$id$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/@radix-ui/react-id/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
var TABS_NAME = "Tabs";
var [createTabsContext, createTabsScope] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$context$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContextScope"])(TABS_NAME, [
    __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$roving$2d$focus$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createRovingFocusGroupScope"]
]);
var useRovingFocusGroupScope = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$roving$2d$focus$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createRovingFocusGroupScope"])();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"]((props, forwardedRef)=>{
    const { __scopeTabs, value: valueProp, onValueChange, defaultValue, orientation = "horizontal", dir, activationMode = "automatic", ...tabsProps } = props;
    const direction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$direction$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDirection"])(dir);
    const [value, setValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$controllable$2d$state$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useControllableState"])({
        prop: valueProp,
        onChange: onValueChange,
        defaultProp: defaultValue ?? "",
        caller: TABS_NAME
    });
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(TabsProvider, {
        scope: __scopeTabs,
        baseId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$id$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Primitive"].div, {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
        })
    });
});
Tabs.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"]((props, forwardedRef)=>{
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$roving$2d$focus$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Primitive"].div, {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
        })
    });
});
TabsList.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"]((props, forwardedRef)=>{
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$roving$2d$focus$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Item"], {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Primitive"].button, {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["composeEventHandlers"])(props.onMouseDown, (event)=>{
                if (!disabled && event.button === 0 && event.ctrlKey === false) {
                    context.onValueChange(value);
                } else {
                    event.preventDefault();
                }
            }),
            onKeyDown: (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["composeEventHandlers"])(props.onKeyDown, (event)=>{
                if ([
                    " ",
                    "Enter"
                ].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["composeEventHandlers"])(props.onFocus, ()=>{
                const isAutomaticActivation = context.activationMode !== "manual";
                if (!isSelected && !disabled && isAutomaticActivation) {
                    context.onValueChange(value);
                }
            })
        })
    });
});
TabsTrigger.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"]((props, forwardedRef)=>{
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](isSelected);
    __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        const rAF = requestAnimationFrame(()=>isMountAnimationPreventedRef.current = false);
        return ()=>cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$presence$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Presence"], {
        present: forceMount || isSelected,
        children: ({ present })=>/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Primitive"].div, {
                "data-state": isSelected ? "active" : "inactive",
                "data-orientation": context.orientation,
                role: "tabpanel",
                "aria-labelledby": triggerId,
                hidden: !present,
                id: contentId,
                tabIndex: 0,
                ...contentProps,
                ref: forwardedRef,
                style: {
                    ...props.style,
                    animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
                },
                children: present && children
            })
    });
});
TabsContent.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
    return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
    return `${baseId}-content-${value}`;
}
var Root2 = Tabs;
var List = TabsList;
var Trigger = TabsTrigger;
var Content = TabsContent;
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/p2p-react/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "hasA11yProp": ()=>hasA11yProp,
    "mergeClasses": ()=>mergeClasses,
    "toCamelCase": ()=>toCamelCase,
    "toKebabCase": ()=>toKebabCase,
    "toPascalCase": ()=>toPascalCase
});
const toKebabCase = (string)=>string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string)=>string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2)=>p2 ? p2.toUpperCase() : p1.toLowerCase());
const toPascalCase = (string)=>{
    const camelCase = toCamelCase(string);
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
const mergeClasses = (...classes)=>classes.filter((className, index, array)=>{
        return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
    }).join(" ").trim();
const hasA11yProp = (props)=>{
    for(const prop in props){
        if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
            return true;
        }
    }
};
;
 //# sourceMappingURL=utils.js.map
}),
"[project]/p2p-react/node_modules/lucide-react/dist/esm/defaultAttributes.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "default": ()=>defaultAttributes
});
var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
};
;
 //# sourceMappingURL=defaultAttributes.js.map
}),
"[project]/p2p-react/node_modules/lucide-react/dist/esm/Icon.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "default": ()=>Icon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$defaultAttributes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/lucide-react/dist/esm/defaultAttributes.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-ssr] (ecmascript)");
;
;
;
const Icon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"])("svg", {
        ref,
        ...__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$defaultAttributes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeClasses"])("lucide", className),
        ...!children && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasA11yProp"])(rest) && {
            "aria-hidden": "true"
        },
        ...rest
    }, [
        ...iconNode.map(([tag, attrs])=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"])(tag, attrs)),
        ...Array.isArray(children) ? children : [
            children
        ]
    ]));
;
 //# sourceMappingURL=Icon.js.map
}),
"[project]/p2p-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "default": ()=>createLucideIcon
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/lucide-react/dist/esm/Icon.js [app-ssr] (ecmascript)");
;
;
;
const createLucideIcon = (iconName, iconNode)=>{
    const Component = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"])(__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            ref,
            iconNode,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeClasses"])(`lucide-${(0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toKebabCase"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toPascalCase"])(iconName))}`, `lucide-${iconName}`, className),
            ...props
        }));
    Component.displayName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toPascalCase"])(iconName);
    return Component;
};
;
 //# sourceMappingURL=createLucideIcon.js.map
}),
"[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/upload.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": ()=>__iconNode,
    "default": ()=>Upload
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M12 3v12",
            key: "1x0j5s"
        }
    ],
    [
        "path",
        {
            d: "m17 8-5-5-5 5",
            key: "7q97r8"
        }
    ],
    [
        "path",
        {
            d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
            key: "ih7n3h"
        }
    ]
];
const Upload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("upload", __iconNode);
;
 //# sourceMappingURL=upload.js.map
}),
"[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/upload.js [app-ssr] (ecmascript) <export default as Upload>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "Upload": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/upload.js [app-ssr] (ecmascript)");
}),
"[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/download.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": ()=>__iconNode,
    "default": ()=>Download
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M12 15V3",
            key: "m9g1x1"
        }
    ],
    [
        "path",
        {
            d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
            key: "ih7n3h"
        }
    ],
    [
        "path",
        {
            d: "m7 10 5 5 5-5",
            key: "brsn70"
        }
    ]
];
const Download = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("download", __iconNode);
;
 //# sourceMappingURL=download.js.map
}),
"[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/download.js [app-ssr] (ecmascript) <export default as Download>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "Download": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/download.js [app-ssr] (ecmascript)");
}),
"[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/wifi.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": ()=>__iconNode,
    "default": ()=>Wifi
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M12 20h.01",
            key: "zekei9"
        }
    ],
    [
        "path",
        {
            d: "M2 8.82a15 15 0 0 1 20 0",
            key: "dnpr2z"
        }
    ],
    [
        "path",
        {
            d: "M5 12.859a10 10 0 0 1 14 0",
            key: "1x1e6c"
        }
    ],
    [
        "path",
        {
            d: "M8.5 16.429a5 5 0 0 1 7 0",
            key: "1bycff"
        }
    ]
];
const Wifi = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("wifi", __iconNode);
;
 //# sourceMappingURL=wifi.js.map
}),
"[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/wifi.js [app-ssr] (ecmascript) <export default as Wifi>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "Wifi": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/wifi.js [app-ssr] (ecmascript)");
}),
"[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/wifi-off.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": ()=>__iconNode,
    "default": ()=>WifiOff
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M12 20h.01",
            key: "zekei9"
        }
    ],
    [
        "path",
        {
            d: "M8.5 16.429a5 5 0 0 1 7 0",
            key: "1bycff"
        }
    ],
    [
        "path",
        {
            d: "M5 12.859a10 10 0 0 1 5.17-2.69",
            key: "1dl1wf"
        }
    ],
    [
        "path",
        {
            d: "M19 12.859a10 10 0 0 0-2.007-1.523",
            key: "4k23kn"
        }
    ],
    [
        "path",
        {
            d: "M2 8.82a15 15 0 0 1 4.177-2.643",
            key: "1grhjp"
        }
    ],
    [
        "path",
        {
            d: "M22 8.82a15 15 0 0 0-11.288-3.764",
            key: "z3jwby"
        }
    ],
    [
        "path",
        {
            d: "m2 2 20 20",
            key: "1ooewy"
        }
    ]
];
const WifiOff = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("wifi-off", __iconNode);
;
 //# sourceMappingURL=wifi-off.js.map
}),
"[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/wifi-off.js [app-ssr] (ecmascript) <export default as WifiOff>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "WifiOff": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/wifi-off.js [app-ssr] (ecmascript)");
}),
"[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/zap.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": ()=>__iconNode,
    "default": ()=>Zap
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
            key: "1xq2db"
        }
    ]
];
const Zap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("zap", __iconNode);
;
 //# sourceMappingURL=zap.js.map
}),
"[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/zap.js [app-ssr] (ecmascript) <export default as Zap>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "Zap": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/zap.js [app-ssr] (ecmascript)");
}),
"[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": ()=>__iconNode,
    "default": ()=>FileText
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
            key: "1rqfz7"
        }
    ],
    [
        "path",
        {
            d: "M14 2v4a2 2 0 0 0 2 2h4",
            key: "tnqrlb"
        }
    ],
    [
        "path",
        {
            d: "M10 9H8",
            key: "b1mrlr"
        }
    ],
    [
        "path",
        {
            d: "M16 13H8",
            key: "t4e002"
        }
    ],
    [
        "path",
        {
            d: "M16 17H8",
            key: "z1uh3a"
        }
    ]
];
const FileText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("file-text", __iconNode);
;
 //# sourceMappingURL=file-text.js.map
}),
"[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "FileText": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript)");
}),
"[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": ()=>__iconNode,
    "default": ()=>Trash2
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M10 11v6",
            key: "nco0om"
        }
    ],
    [
        "path",
        {
            d: "M14 11v6",
            key: "outv1u"
        }
    ],
    [
        "path",
        {
            d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
            key: "miytrc"
        }
    ],
    [
        "path",
        {
            d: "M3 6h18",
            key: "d0wm0j"
        }
    ],
    [
        "path",
        {
            d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
            key: "e791ji"
        }
    ]
];
const Trash2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("trash-2", __iconNode);
;
 //# sourceMappingURL=trash-2.js.map
}),
"[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "Trash2": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript)");
}),
"[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/qr-code.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": ()=>__iconNode,
    "default": ()=>QrCode
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "rect",
        {
            width: "5",
            height: "5",
            x: "3",
            y: "3",
            rx: "1",
            key: "1tu5fj"
        }
    ],
    [
        "rect",
        {
            width: "5",
            height: "5",
            x: "16",
            y: "3",
            rx: "1",
            key: "1v8r4q"
        }
    ],
    [
        "rect",
        {
            width: "5",
            height: "5",
            x: "3",
            y: "16",
            rx: "1",
            key: "1x03jg"
        }
    ],
    [
        "path",
        {
            d: "M21 16h-3a2 2 0 0 0-2 2v3",
            key: "177gqh"
        }
    ],
    [
        "path",
        {
            d: "M21 21v.01",
            key: "ents32"
        }
    ],
    [
        "path",
        {
            d: "M12 7v3a2 2 0 0 1-2 2H7",
            key: "8crl2c"
        }
    ],
    [
        "path",
        {
            d: "M3 12h.01",
            key: "nlz23k"
        }
    ],
    [
        "path",
        {
            d: "M12 3h.01",
            key: "n36tog"
        }
    ],
    [
        "path",
        {
            d: "M12 16v.01",
            key: "133mhm"
        }
    ],
    [
        "path",
        {
            d: "M16 12h1",
            key: "1slzba"
        }
    ],
    [
        "path",
        {
            d: "M21 12v.01",
            key: "1lwtk9"
        }
    ],
    [
        "path",
        {
            d: "M12 21v-1",
            key: "1880an"
        }
    ]
];
const QrCode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("qr-code", __iconNode);
;
 //# sourceMappingURL=qr-code.js.map
}),
"[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/qr-code.js [app-ssr] (ecmascript) <export default as QrCode>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "QrCode": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$qr$2d$code$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$qr$2d$code$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/qr-code.js [app-ssr] (ecmascript)");
}),
"[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/camera.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": ()=>__iconNode,
    "default": ()=>Camera
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",
            key: "1tc9qg"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "13",
            r: "3",
            key: "1vg3eu"
        }
    ]
];
const Camera = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("camera", __iconNode);
;
 //# sourceMappingURL=camera.js.map
}),
"[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/camera.js [app-ssr] (ecmascript) <export default as Camera>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "Camera": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/camera.js [app-ssr] (ecmascript)");
}),
"[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": ()=>__iconNode,
    "default": ()=>X
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M18 6 6 18",
            key: "1bl5f8"
        }
    ],
    [
        "path",
        {
            d: "m6 6 12 12",
            key: "d8bk6v"
        }
    ]
];
const X = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("x", __iconNode);
;
 //# sourceMappingURL=x.js.map
}),
"[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "X": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript)");
}),
"[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": ()=>__iconNode,
    "default": ()=>CircleCheckBig
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M21.801 10A10 10 0 1 1 17 3.335",
            key: "yps3ct"
        }
    ],
    [
        "path",
        {
            d: "m9 11 3 3L22 4",
            key: "1pflzl"
        }
    ]
];
const CircleCheckBig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("circle-check-big", __iconNode);
;
 //# sourceMappingURL=circle-check-big.js.map
}),
"[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "CheckCircle": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript)");
}),
"[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": ()=>__iconNode,
    "default": ()=>CircleX
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ],
    [
        "path",
        {
            d: "m15 9-6 6",
            key: "1uzhvr"
        }
    ],
    [
        "path",
        {
            d: "m9 9 6 6",
            key: "z0biqf"
        }
    ]
];
const CircleX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("circle-x", __iconNode);
;
 //# sourceMappingURL=circle-x.js.map
}),
"[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-ssr] (ecmascript) <export default as XCircle>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "XCircle": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-ssr] (ecmascript)");
}),
"[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": ()=>__iconNode,
    "default": ()=>LoaderCircle
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M21 12a9 9 0 1 1-6.219-8.56",
            key: "13zald"
        }
    ]
];
const LoaderCircle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("loader-circle", __iconNode);
;
 //# sourceMappingURL=loader-circle.js.map
}),
"[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "Loader2": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript)");
}),
"[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": ()=>__iconNode,
    "default": ()=>RotateCcw
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
            key: "1357e3"
        }
    ],
    [
        "path",
        {
            d: "M3 3v5h5",
            key: "1xhq8a"
        }
    ]
];
const RotateCcw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("rotate-ccw", __iconNode);
;
 //# sourceMappingURL=rotate-ccw.js.map
}),
"[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-ssr] (ecmascript) <export default as RotateCcw>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "RotateCcw": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-ssr] (ecmascript)");
}),
"[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/copy.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": ()=>__iconNode,
    "default": ()=>Copy
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "rect",
        {
            width: "14",
            height: "14",
            x: "8",
            y: "8",
            rx: "2",
            ry: "2",
            key: "17jyea"
        }
    ],
    [
        "path",
        {
            d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
            key: "zix9uf"
        }
    ]
];
const Copy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("copy", __iconNode);
;
 //# sourceMappingURL=copy.js.map
}),
"[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/copy.js [app-ssr] (ecmascript) <export default as Copy>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "Copy": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/copy.js [app-ssr] (ecmascript)");
}),
"[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": ()=>__iconNode,
    "default": ()=>ArrowLeft
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m12 19-7-7 7-7",
            key: "1l729n"
        }
    ],
    [
        "path",
        {
            d: "M19 12H5",
            key: "x3x0zl"
        }
    ]
];
const ArrowLeft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("arrow-left", __iconNode);
;
 //# sourceMappingURL=arrow-left.js.map
}),
"[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-ssr] (ecmascript) <export default as ArrowLeft>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "ArrowLeft": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-ssr] (ecmascript)");
}),
"[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": ()=>__iconNode,
    "default": ()=>ChevronUp
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m18 15-6-6-6 6",
            key: "153udz"
        }
    ]
];
const ChevronUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("chevron-up", __iconNode);
;
 //# sourceMappingURL=chevron-up.js.map
}),
"[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-ssr] (ecmascript) <export default as ChevronUp>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "ChevronUp": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-ssr] (ecmascript)");
}),
"[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": ()=>__iconNode,
    "default": ()=>ChevronDown
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m6 9 6 6 6-6",
            key: "qrunsl"
        }
    ]
];
const ChevronDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("chevron-down", __iconNode);
;
 //# sourceMappingURL=chevron-down.js.map
}),
"[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "ChevronDown": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript)");
}),
"[project]/p2p-react/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "Toaster": ()=>Toaster,
    "toast": ()=>toast,
    "useSonner": ()=>useSonner
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
'use client';
function __insertCSS(code) {
    if (!code || typeof document == 'undefined') return;
    let head = document.head || document.getElementsByTagName('head')[0];
    let style = document.createElement('style');
    style.type = 'text/css';
    head.appendChild(style);
    style.styleSheet ? style.styleSheet.cssText = code : style.appendChild(document.createTextNode(code));
}
;
;
const getAsset = (type)=>{
    switch(type){
        case 'success':
            return SuccessIcon;
        case 'info':
            return InfoIcon;
        case 'warning':
            return WarningIcon;
        case 'error':
            return ErrorIcon;
        default:
            return null;
    }
};
const bars = Array(12).fill(0);
const Loader = ({ visible, className })=>{
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        className: [
            'sonner-loading-wrapper',
            className
        ].filter(Boolean).join(' '),
        "data-visible": visible
    }, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        className: "sonner-spinner"
    }, bars.map((_, i)=>/*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("div", {
            className: "sonner-loading-bar",
            key: `spinner-bar-${i}`
        }))));
};
const SuccessIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    height: "20",
    width: "20"
}, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("path", {
    fillRule: "evenodd",
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
    clipRule: "evenodd"
}));
const WarningIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    height: "20",
    width: "20"
}, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("path", {
    fillRule: "evenodd",
    d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
    clipRule: "evenodd"
}));
const InfoIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    height: "20",
    width: "20"
}, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("path", {
    fillRule: "evenodd",
    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
    clipRule: "evenodd"
}));
const ErrorIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    height: "20",
    width: "20"
}, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("path", {
    fillRule: "evenodd",
    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
    clipRule: "evenodd"
}));
const CloseIcon = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
}, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
}), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
}));
const useIsDocumentHidden = ()=>{
    const [isDocumentHidden, setIsDocumentHidden] = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(document.hidden);
    __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        const callback = ()=>{
            setIsDocumentHidden(document.hidden);
        };
        document.addEventListener('visibilitychange', callback);
        return ()=>window.removeEventListener('visibilitychange', callback);
    }, []);
    return isDocumentHidden;
};
let toastsCounter = 1;
class Observer {
    constructor(){
        // We use arrow functions to maintain the correct `this` reference
        this.subscribe = (subscriber)=>{
            this.subscribers.push(subscriber);
            return ()=>{
                const index = this.subscribers.indexOf(subscriber);
                this.subscribers.splice(index, 1);
            };
        };
        this.publish = (data)=>{
            this.subscribers.forEach((subscriber)=>subscriber(data));
        };
        this.addToast = (data)=>{
            this.publish(data);
            this.toasts = [
                ...this.toasts,
                data
            ];
        };
        this.create = (data)=>{
            var _data_id;
            const { message, ...rest } = data;
            const id = typeof (data == null ? void 0 : data.id) === 'number' || ((_data_id = data.id) == null ? void 0 : _data_id.length) > 0 ? data.id : toastsCounter++;
            const alreadyExists = this.toasts.find((toast)=>{
                return toast.id === id;
            });
            const dismissible = data.dismissible === undefined ? true : data.dismissible;
            if (this.dismissedToasts.has(id)) {
                this.dismissedToasts.delete(id);
            }
            if (alreadyExists) {
                this.toasts = this.toasts.map((toast)=>{
                    if (toast.id === id) {
                        this.publish({
                            ...toast,
                            ...data,
                            id,
                            title: message
                        });
                        return {
                            ...toast,
                            ...data,
                            id,
                            dismissible,
                            title: message
                        };
                    }
                    return toast;
                });
            } else {
                this.addToast({
                    title: message,
                    ...rest,
                    dismissible,
                    id
                });
            }
            return id;
        };
        this.dismiss = (id)=>{
            if (id) {
                this.dismissedToasts.add(id);
                requestAnimationFrame(()=>this.subscribers.forEach((subscriber)=>subscriber({
                            id,
                            dismiss: true
                        })));
            } else {
                this.toasts.forEach((toast)=>{
                    this.subscribers.forEach((subscriber)=>subscriber({
                            id: toast.id,
                            dismiss: true
                        }));
                });
            }
            return id;
        };
        this.message = (message, data)=>{
            return this.create({
                ...data,
                message
            });
        };
        this.error = (message, data)=>{
            return this.create({
                ...data,
                message,
                type: 'error'
            });
        };
        this.success = (message, data)=>{
            return this.create({
                ...data,
                type: 'success',
                message
            });
        };
        this.info = (message, data)=>{
            return this.create({
                ...data,
                type: 'info',
                message
            });
        };
        this.warning = (message, data)=>{
            return this.create({
                ...data,
                type: 'warning',
                message
            });
        };
        this.loading = (message, data)=>{
            return this.create({
                ...data,
                type: 'loading',
                message
            });
        };
        this.promise = (promise, data)=>{
            if (!data) {
                // Nothing to show
                return;
            }
            let id = undefined;
            if (data.loading !== undefined) {
                id = this.create({
                    ...data,
                    promise,
                    type: 'loading',
                    message: data.loading,
                    description: typeof data.description !== 'function' ? data.description : undefined
                });
            }
            const p = Promise.resolve(promise instanceof Function ? promise() : promise);
            let shouldDismiss = id !== undefined;
            let result;
            const originalPromise = p.then(async (response)=>{
                result = [
                    'resolve',
                    response
                ];
                const isReactElementResponse = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isValidElement(response);
                if (isReactElementResponse) {
                    shouldDismiss = false;
                    this.create({
                        id,
                        type: 'default',
                        message: response
                    });
                } else if (isHttpResponse(response) && !response.ok) {
                    shouldDismiss = false;
                    const promiseData = typeof data.error === 'function' ? await data.error(`HTTP error! status: ${response.status}`) : data.error;
                    const description = typeof data.description === 'function' ? await data.description(`HTTP error! status: ${response.status}`) : data.description;
                    const isExtendedResult = typeof promiseData === 'object' && !__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isValidElement(promiseData);
                    const toastSettings = isExtendedResult ? promiseData : {
                        message: promiseData
                    };
                    this.create({
                        id,
                        type: 'error',
                        description,
                        ...toastSettings
                    });
                } else if (response instanceof Error) {
                    shouldDismiss = false;
                    const promiseData = typeof data.error === 'function' ? await data.error(response) : data.error;
                    const description = typeof data.description === 'function' ? await data.description(response) : data.description;
                    const isExtendedResult = typeof promiseData === 'object' && !__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isValidElement(promiseData);
                    const toastSettings = isExtendedResult ? promiseData : {
                        message: promiseData
                    };
                    this.create({
                        id,
                        type: 'error',
                        description,
                        ...toastSettings
                    });
                } else if (data.success !== undefined) {
                    shouldDismiss = false;
                    const promiseData = typeof data.success === 'function' ? await data.success(response) : data.success;
                    const description = typeof data.description === 'function' ? await data.description(response) : data.description;
                    const isExtendedResult = typeof promiseData === 'object' && !__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isValidElement(promiseData);
                    const toastSettings = isExtendedResult ? promiseData : {
                        message: promiseData
                    };
                    this.create({
                        id,
                        type: 'success',
                        description,
                        ...toastSettings
                    });
                }
            }).catch(async (error)=>{
                result = [
                    'reject',
                    error
                ];
                if (data.error !== undefined) {
                    shouldDismiss = false;
                    const promiseData = typeof data.error === 'function' ? await data.error(error) : data.error;
                    const description = typeof data.description === 'function' ? await data.description(error) : data.description;
                    const isExtendedResult = typeof promiseData === 'object' && !__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isValidElement(promiseData);
                    const toastSettings = isExtendedResult ? promiseData : {
                        message: promiseData
                    };
                    this.create({
                        id,
                        type: 'error',
                        description,
                        ...toastSettings
                    });
                }
            }).finally(()=>{
                if (shouldDismiss) {
                    // Toast is still in load state (and will be indefinitely — dismiss it)
                    this.dismiss(id);
                    id = undefined;
                }
                data.finally == null ? void 0 : data.finally.call(data);
            });
            const unwrap = ()=>new Promise((resolve, reject)=>originalPromise.then(()=>result[0] === 'reject' ? reject(result[1]) : resolve(result[1])).catch(reject));
            if (typeof id !== 'string' && typeof id !== 'number') {
                // cannot Object.assign on undefined
                return {
                    unwrap
                };
            } else {
                return Object.assign(id, {
                    unwrap
                });
            }
        };
        this.custom = (jsx, data)=>{
            const id = (data == null ? void 0 : data.id) || toastsCounter++;
            this.create({
                jsx: jsx(id),
                id,
                ...data
            });
            return id;
        };
        this.getActiveToasts = ()=>{
            return this.toasts.filter((toast)=>!this.dismissedToasts.has(toast.id));
        };
        this.subscribers = [];
        this.toasts = [];
        this.dismissedToasts = new Set();
    }
}
const ToastState = new Observer();
// bind this to the toast function
const toastFunction = (message, data)=>{
    const id = (data == null ? void 0 : data.id) || toastsCounter++;
    ToastState.addToast({
        title: message,
        ...data,
        id
    });
    return id;
};
const isHttpResponse = (data)=>{
    return data && typeof data === 'object' && 'ok' in data && typeof data.ok === 'boolean' && 'status' in data && typeof data.status === 'number';
};
const basicToast = toastFunction;
const getHistory = ()=>ToastState.toasts;
const getToasts = ()=>ToastState.getActiveToasts();
// We use `Object.assign` to maintain the correct types as we would lose them otherwise
const toast = Object.assign(basicToast, {
    success: ToastState.success,
    info: ToastState.info,
    warning: ToastState.warning,
    error: ToastState.error,
    custom: ToastState.custom,
    message: ToastState.message,
    promise: ToastState.promise,
    dismiss: ToastState.dismiss,
    loading: ToastState.loading
}, {
    getHistory,
    getToasts
});
__insertCSS("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function isAction(action) {
    return action.label !== undefined;
}
// Visible toasts amount
const VISIBLE_TOASTS_AMOUNT = 3;
// Viewport padding
const VIEWPORT_OFFSET = '24px';
// Mobile viewport padding
const MOBILE_VIEWPORT_OFFSET = '16px';
// Default lifetime of a toasts (in ms)
const TOAST_LIFETIME = 4000;
// Default toast width
const TOAST_WIDTH = 356;
// Default gap between toasts
const GAP = 14;
// Threshold to dismiss a toast
const SWIPE_THRESHOLD = 45;
// Equal to exit animation duration
const TIME_BEFORE_UNMOUNT = 200;
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
function getDefaultSwipeDirections(position) {
    const [y, x] = position.split('-');
    const directions = [];
    if (y) {
        directions.push(y);
    }
    if (x) {
        directions.push(x);
    }
    return directions;
}
const Toast = (props)=>{
    var _toast_classNames, _toast_classNames1, _toast_classNames2, _toast_classNames3, _toast_classNames4, _toast_classNames5, _toast_classNames6, _toast_classNames7, _toast_classNames8;
    const { invert: ToasterInvert, toast, unstyled, interacting, setHeights, visibleToasts, heights, index, toasts, expanded, removeToast, defaultRichColors, closeButton: closeButtonFromToaster, style, cancelButtonStyle, actionButtonStyle, className = '', descriptionClassName = '', duration: durationFromToaster, position, gap, expandByDefault, classNames, icons, closeButtonAriaLabel = 'Close toast' } = props;
    const [swipeDirection, setSwipeDirection] = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(null);
    const [swipeOutDirection, setSwipeOutDirection] = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(null);
    const [mounted, setMounted] = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [removed, setRemoved] = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [swiping, setSwiping] = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [swipeOut, setSwipeOut] = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [isSwiped, setIsSwiped] = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [offsetBeforeRemove, setOffsetBeforeRemove] = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(0);
    const [initialHeight, setInitialHeight] = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(0);
    const remainingTime = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(toast.duration || durationFromToaster || TOAST_LIFETIME);
    const dragStartTime = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
    const toastRef = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
    const isFront = index === 0;
    const isVisible = index + 1 <= visibleToasts;
    const toastType = toast.type;
    const dismissible = toast.dismissible !== false;
    const toastClassname = toast.className || '';
    const toastDescriptionClassname = toast.descriptionClassName || '';
    // Height index is used to calculate the offset as it gets updated before the toast array, which means we can calculate the new layout faster.
    const heightIndex = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useMemo(()=>heights.findIndex((height)=>height.toastId === toast.id) || 0, [
        heights,
        toast.id
    ]);
    const closeButton = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useMemo(()=>{
        var _toast_closeButton;
        return (_toast_closeButton = toast.closeButton) != null ? _toast_closeButton : closeButtonFromToaster;
    }, [
        toast.closeButton,
        closeButtonFromToaster
    ]);
    const duration = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useMemo(()=>toast.duration || durationFromToaster || TOAST_LIFETIME, [
        toast.duration,
        durationFromToaster
    ]);
    const closeTimerStartTimeRef = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(0);
    const offset = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(0);
    const lastCloseTimerStartTimeRef = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(0);
    const pointerStartRef = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
    const [y, x] = position.split('-');
    const toastsHeightBefore = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useMemo(()=>{
        return heights.reduce((prev, curr, reducerIndex)=>{
            // Calculate offset up until current toast
            if (reducerIndex >= heightIndex) {
                return prev;
            }
            return prev + curr.height;
        }, 0);
    }, [
        heights,
        heightIndex
    ]);
    const isDocumentHidden = useIsDocumentHidden();
    const invert = toast.invert || ToasterInvert;
    const disabled = toastType === 'loading';
    offset.current = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useMemo(()=>heightIndex * gap + toastsHeightBefore, [
        heightIndex,
        toastsHeightBefore
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        remainingTime.current = duration;
    }, [
        duration
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        // Trigger enter animation without using CSS animation
        setMounted(true);
    }, []);
    __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        const toastNode = toastRef.current;
        if (toastNode) {
            const height = toastNode.getBoundingClientRect().height;
            // Add toast height to heights array after the toast is mounted
            setInitialHeight(height);
            setHeights((h)=>[
                    {
                        toastId: toast.id,
                        height,
                        position: toast.position
                    },
                    ...h
                ]);
            return ()=>setHeights((h)=>h.filter((height)=>height.toastId !== toast.id));
        }
    }, [
        setHeights,
        toast.id
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useLayoutEffect(()=>{
        // Keep height up to date with the content in case it updates
        if (!mounted) return;
        const toastNode = toastRef.current;
        const originalHeight = toastNode.style.height;
        toastNode.style.height = 'auto';
        const newHeight = toastNode.getBoundingClientRect().height;
        toastNode.style.height = originalHeight;
        setInitialHeight(newHeight);
        setHeights((heights)=>{
            const alreadyExists = heights.find((height)=>height.toastId === toast.id);
            if (!alreadyExists) {
                return [
                    {
                        toastId: toast.id,
                        height: newHeight,
                        position: toast.position
                    },
                    ...heights
                ];
            } else {
                return heights.map((height)=>height.toastId === toast.id ? {
                        ...height,
                        height: newHeight
                    } : height);
            }
        });
    }, [
        mounted,
        toast.title,
        toast.description,
        setHeights,
        toast.id,
        toast.jsx,
        toast.action,
        toast.cancel
    ]);
    const deleteToast = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback(()=>{
        // Save the offset for the exit swipe animation
        setRemoved(true);
        setOffsetBeforeRemove(offset.current);
        setHeights((h)=>h.filter((height)=>height.toastId !== toast.id));
        setTimeout(()=>{
            removeToast(toast);
        }, TIME_BEFORE_UNMOUNT);
    }, [
        toast,
        removeToast,
        setHeights,
        offset
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        if (toast.promise && toastType === 'loading' || toast.duration === Infinity || toast.type === 'loading') return;
        let timeoutId;
        // Pause the timer on each hover
        const pauseTimer = ()=>{
            if (lastCloseTimerStartTimeRef.current < closeTimerStartTimeRef.current) {
                // Get the elapsed time since the timer started
                const elapsedTime = new Date().getTime() - closeTimerStartTimeRef.current;
                remainingTime.current = remainingTime.current - elapsedTime;
            }
            lastCloseTimerStartTimeRef.current = new Date().getTime();
        };
        const startTimer = ()=>{
            // setTimeout(, Infinity) behaves as if the delay is 0.
            // As a result, the toast would be closed immediately, giving the appearance that it was never rendered.
            // See: https://github.com/denysdovhan/wtfjs?tab=readme-ov-file#an-infinite-timeout
            if (remainingTime.current === Infinity) return;
            closeTimerStartTimeRef.current = new Date().getTime();
            // Let the toast know it has started
            timeoutId = setTimeout(()=>{
                toast.onAutoClose == null ? void 0 : toast.onAutoClose.call(toast, toast);
                deleteToast();
            }, remainingTime.current);
        };
        if (expanded || interacting || isDocumentHidden) {
            pauseTimer();
        } else {
            startTimer();
        }
        return ()=>clearTimeout(timeoutId);
    }, [
        expanded,
        interacting,
        toast,
        toastType,
        isDocumentHidden,
        deleteToast
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        if (toast.delete) {
            deleteToast();
            toast.onDismiss == null ? void 0 : toast.onDismiss.call(toast, toast);
        }
    }, [
        deleteToast,
        toast.delete
    ]);
    function getLoadingIcon() {
        var _toast_classNames;
        if (icons == null ? void 0 : icons.loading) {
            var _toast_classNames1;
            return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("div", {
                className: cn(classNames == null ? void 0 : classNames.loader, toast == null ? void 0 : (_toast_classNames1 = toast.classNames) == null ? void 0 : _toast_classNames1.loader, 'sonner-loader'),
                "data-visible": toastType === 'loading'
            }, icons.loading);
        }
        return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(Loader, {
            className: cn(classNames == null ? void 0 : classNames.loader, toast == null ? void 0 : (_toast_classNames = toast.classNames) == null ? void 0 : _toast_classNames.loader),
            visible: toastType === 'loading'
        });
    }
    const icon = toast.icon || (icons == null ? void 0 : icons[toastType]) || getAsset(toastType);
    var _toast_richColors, _icons_close;
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("li", {
        tabIndex: 0,
        ref: toastRef,
        className: cn(className, toastClassname, classNames == null ? void 0 : classNames.toast, toast == null ? void 0 : (_toast_classNames = toast.classNames) == null ? void 0 : _toast_classNames.toast, classNames == null ? void 0 : classNames.default, classNames == null ? void 0 : classNames[toastType], toast == null ? void 0 : (_toast_classNames1 = toast.classNames) == null ? void 0 : _toast_classNames1[toastType]),
        "data-sonner-toast": "",
        "data-rich-colors": (_toast_richColors = toast.richColors) != null ? _toast_richColors : defaultRichColors,
        "data-styled": !Boolean(toast.jsx || toast.unstyled || unstyled),
        "data-mounted": mounted,
        "data-promise": Boolean(toast.promise),
        "data-swiped": isSwiped,
        "data-removed": removed,
        "data-visible": isVisible,
        "data-y-position": y,
        "data-x-position": x,
        "data-index": index,
        "data-front": isFront,
        "data-swiping": swiping,
        "data-dismissible": dismissible,
        "data-type": toastType,
        "data-invert": invert,
        "data-swipe-out": swipeOut,
        "data-swipe-direction": swipeOutDirection,
        "data-expanded": Boolean(expanded || expandByDefault && mounted),
        "data-testid": toast.testId,
        style: {
            '--index': index,
            '--toasts-before': index,
            '--z-index': toasts.length - index,
            '--offset': `${removed ? offsetBeforeRemove : offset.current}px`,
            '--initial-height': expandByDefault ? 'auto' : `${initialHeight}px`,
            ...style,
            ...toast.style
        },
        onDragEnd: ()=>{
            setSwiping(false);
            setSwipeDirection(null);
            pointerStartRef.current = null;
        },
        onPointerDown: (event)=>{
            if (event.button === 2) return; // Return early on right click
            if (disabled || !dismissible) return;
            dragStartTime.current = new Date();
            setOffsetBeforeRemove(offset.current);
            // Ensure we maintain correct pointer capture even when going outside of the toast (e.g. when swiping)
            event.target.setPointerCapture(event.pointerId);
            if (event.target.tagName === 'BUTTON') return;
            setSwiping(true);
            pointerStartRef.current = {
                x: event.clientX,
                y: event.clientY
            };
        },
        onPointerUp: ()=>{
            var _toastRef_current, _toastRef_current1, _dragStartTime_current;
            if (swipeOut || !dismissible) return;
            pointerStartRef.current = null;
            const swipeAmountX = Number(((_toastRef_current = toastRef.current) == null ? void 0 : _toastRef_current.style.getPropertyValue('--swipe-amount-x').replace('px', '')) || 0);
            const swipeAmountY = Number(((_toastRef_current1 = toastRef.current) == null ? void 0 : _toastRef_current1.style.getPropertyValue('--swipe-amount-y').replace('px', '')) || 0);
            const timeTaken = new Date().getTime() - ((_dragStartTime_current = dragStartTime.current) == null ? void 0 : _dragStartTime_current.getTime());
            const swipeAmount = swipeDirection === 'x' ? swipeAmountX : swipeAmountY;
            const velocity = Math.abs(swipeAmount) / timeTaken;
            if (Math.abs(swipeAmount) >= SWIPE_THRESHOLD || velocity > 0.11) {
                setOffsetBeforeRemove(offset.current);
                toast.onDismiss == null ? void 0 : toast.onDismiss.call(toast, toast);
                if (swipeDirection === 'x') {
                    setSwipeOutDirection(swipeAmountX > 0 ? 'right' : 'left');
                } else {
                    setSwipeOutDirection(swipeAmountY > 0 ? 'down' : 'up');
                }
                deleteToast();
                setSwipeOut(true);
                return;
            } else {
                var _toastRef_current2, _toastRef_current3;
                (_toastRef_current2 = toastRef.current) == null ? void 0 : _toastRef_current2.style.setProperty('--swipe-amount-x', `0px`);
                (_toastRef_current3 = toastRef.current) == null ? void 0 : _toastRef_current3.style.setProperty('--swipe-amount-y', `0px`);
            }
            setIsSwiped(false);
            setSwiping(false);
            setSwipeDirection(null);
        },
        onPointerMove: (event)=>{
            var _window_getSelection, _toastRef_current, _toastRef_current1;
            if (!pointerStartRef.current || !dismissible) return;
            const isHighlighted = ((_window_getSelection = window.getSelection()) == null ? void 0 : _window_getSelection.toString().length) > 0;
            if (isHighlighted) return;
            const yDelta = event.clientY - pointerStartRef.current.y;
            const xDelta = event.clientX - pointerStartRef.current.x;
            var _props_swipeDirections;
            const swipeDirections = (_props_swipeDirections = props.swipeDirections) != null ? _props_swipeDirections : getDefaultSwipeDirections(position);
            // Determine swipe direction if not already locked
            if (!swipeDirection && (Math.abs(xDelta) > 1 || Math.abs(yDelta) > 1)) {
                setSwipeDirection(Math.abs(xDelta) > Math.abs(yDelta) ? 'x' : 'y');
            }
            let swipeAmount = {
                x: 0,
                y: 0
            };
            const getDampening = (delta)=>{
                const factor = Math.abs(delta) / 20;
                return 1 / (1.5 + factor);
            };
            // Only apply swipe in the locked direction
            if (swipeDirection === 'y') {
                // Handle vertical swipes
                if (swipeDirections.includes('top') || swipeDirections.includes('bottom')) {
                    if (swipeDirections.includes('top') && yDelta < 0 || swipeDirections.includes('bottom') && yDelta > 0) {
                        swipeAmount.y = yDelta;
                    } else {
                        // Smoothly transition to dampened movement
                        const dampenedDelta = yDelta * getDampening(yDelta);
                        // Ensure we don't jump when transitioning to dampened movement
                        swipeAmount.y = Math.abs(dampenedDelta) < Math.abs(yDelta) ? dampenedDelta : yDelta;
                    }
                }
            } else if (swipeDirection === 'x') {
                // Handle horizontal swipes
                if (swipeDirections.includes('left') || swipeDirections.includes('right')) {
                    if (swipeDirections.includes('left') && xDelta < 0 || swipeDirections.includes('right') && xDelta > 0) {
                        swipeAmount.x = xDelta;
                    } else {
                        // Smoothly transition to dampened movement
                        const dampenedDelta = xDelta * getDampening(xDelta);
                        // Ensure we don't jump when transitioning to dampened movement
                        swipeAmount.x = Math.abs(dampenedDelta) < Math.abs(xDelta) ? dampenedDelta : xDelta;
                    }
                }
            }
            if (Math.abs(swipeAmount.x) > 0 || Math.abs(swipeAmount.y) > 0) {
                setIsSwiped(true);
            }
            (_toastRef_current = toastRef.current) == null ? void 0 : _toastRef_current.style.setProperty('--swipe-amount-x', `${swipeAmount.x}px`);
            (_toastRef_current1 = toastRef.current) == null ? void 0 : _toastRef_current1.style.setProperty('--swipe-amount-y', `${swipeAmount.y}px`);
        }
    }, closeButton && !toast.jsx && toastType !== 'loading' ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("button", {
        "aria-label": closeButtonAriaLabel,
        "data-disabled": disabled,
        "data-close-button": true,
        onClick: disabled || !dismissible ? ()=>{} : ()=>{
            deleteToast();
            toast.onDismiss == null ? void 0 : toast.onDismiss.call(toast, toast);
        },
        className: cn(classNames == null ? void 0 : classNames.closeButton, toast == null ? void 0 : (_toast_classNames2 = toast.classNames) == null ? void 0 : _toast_classNames2.closeButton)
    }, (_icons_close = icons == null ? void 0 : icons.close) != null ? _icons_close : CloseIcon) : null, (toastType || toast.icon || toast.promise) && toast.icon !== null && ((icons == null ? void 0 : icons[toastType]) !== null || toast.icon) ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        "data-icon": "",
        className: cn(classNames == null ? void 0 : classNames.icon, toast == null ? void 0 : (_toast_classNames3 = toast.classNames) == null ? void 0 : _toast_classNames3.icon)
    }, toast.promise || toast.type === 'loading' && !toast.icon ? toast.icon || getLoadingIcon() : null, toast.type !== 'loading' ? icon : null) : null, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        "data-content": "",
        className: cn(classNames == null ? void 0 : classNames.content, toast == null ? void 0 : (_toast_classNames4 = toast.classNames) == null ? void 0 : _toast_classNames4.content)
    }, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        "data-title": "",
        className: cn(classNames == null ? void 0 : classNames.title, toast == null ? void 0 : (_toast_classNames5 = toast.classNames) == null ? void 0 : _toast_classNames5.title)
    }, toast.jsx ? toast.jsx : typeof toast.title === 'function' ? toast.title() : toast.title), toast.description ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        "data-description": "",
        className: cn(descriptionClassName, toastDescriptionClassname, classNames == null ? void 0 : classNames.description, toast == null ? void 0 : (_toast_classNames6 = toast.classNames) == null ? void 0 : _toast_classNames6.description)
    }, typeof toast.description === 'function' ? toast.description() : toast.description) : null), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isValidElement(toast.cancel) ? toast.cancel : toast.cancel && isAction(toast.cancel) ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("button", {
        "data-button": true,
        "data-cancel": true,
        style: toast.cancelButtonStyle || cancelButtonStyle,
        onClick: (event)=>{
            // We need to check twice because typescript
            if (!isAction(toast.cancel)) return;
            if (!dismissible) return;
            toast.cancel.onClick == null ? void 0 : toast.cancel.onClick.call(toast.cancel, event);
            deleteToast();
        },
        className: cn(classNames == null ? void 0 : classNames.cancelButton, toast == null ? void 0 : (_toast_classNames7 = toast.classNames) == null ? void 0 : _toast_classNames7.cancelButton)
    }, toast.cancel.label) : null, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isValidElement(toast.action) ? toast.action : toast.action && isAction(toast.action) ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("button", {
        "data-button": true,
        "data-action": true,
        style: toast.actionButtonStyle || actionButtonStyle,
        onClick: (event)=>{
            // We need to check twice because typescript
            if (!isAction(toast.action)) return;
            toast.action.onClick == null ? void 0 : toast.action.onClick.call(toast.action, event);
            if (event.defaultPrevented) return;
            deleteToast();
        },
        className: cn(classNames == null ? void 0 : classNames.actionButton, toast == null ? void 0 : (_toast_classNames8 = toast.classNames) == null ? void 0 : _toast_classNames8.actionButton)
    }, toast.action.label) : null);
};
function getDocumentDirection() {
    if ("TURBOPACK compile-time truthy", 1) return 'ltr';
    //TURBOPACK unreachable
    ;
    const dirAttribute = undefined;
}
function assignOffset(defaultOffset, mobileOffset) {
    const styles = {};
    [
        defaultOffset,
        mobileOffset
    ].forEach((offset, index)=>{
        const isMobile = index === 1;
        const prefix = isMobile ? '--mobile-offset' : '--offset';
        const defaultValue = isMobile ? MOBILE_VIEWPORT_OFFSET : VIEWPORT_OFFSET;
        function assignAll(offset) {
            [
                'top',
                'right',
                'bottom',
                'left'
            ].forEach((key)=>{
                styles[`${prefix}-${key}`] = typeof offset === 'number' ? `${offset}px` : offset;
            });
        }
        if (typeof offset === 'number' || typeof offset === 'string') {
            assignAll(offset);
        } else if (typeof offset === 'object') {
            [
                'top',
                'right',
                'bottom',
                'left'
            ].forEach((key)=>{
                if (offset[key] === undefined) {
                    styles[`${prefix}-${key}`] = defaultValue;
                } else {
                    styles[`${prefix}-${key}`] = typeof offset[key] === 'number' ? `${offset[key]}px` : offset[key];
                }
            });
        } else {
            assignAll(defaultValue);
        }
    });
    return styles;
}
function useSonner() {
    const [activeToasts, setActiveToasts] = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState([]);
    __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        return ToastState.subscribe((toast)=>{
            if (toast.dismiss) {
                setTimeout(()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].flushSync(()=>{
                        setActiveToasts((toasts)=>toasts.filter((t)=>t.id !== toast.id));
                    });
                });
                return;
            }
            // Prevent batching, temp solution.
            setTimeout(()=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].flushSync(()=>{
                    setActiveToasts((toasts)=>{
                        const indexOfExistingToast = toasts.findIndex((t)=>t.id === toast.id);
                        // Update the toast if it already exists
                        if (indexOfExistingToast !== -1) {
                            return [
                                ...toasts.slice(0, indexOfExistingToast),
                                {
                                    ...toasts[indexOfExistingToast],
                                    ...toast
                                },
                                ...toasts.slice(indexOfExistingToast + 1)
                            ];
                        }
                        return [
                            toast,
                            ...toasts
                        ];
                    });
                });
            });
        });
    }, []);
    return {
        toasts: activeToasts
    };
}
const Toaster = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].forwardRef(function Toaster(props, ref) {
    const { id, invert, position = 'bottom-right', hotkey = [
        'altKey',
        'KeyT'
    ], expand, closeButton, className, offset, mobileOffset, theme = 'light', richColors, duration, style, visibleToasts = VISIBLE_TOASTS_AMOUNT, toastOptions, dir = getDocumentDirection(), gap = GAP, icons, containerAriaLabel = 'Notifications' } = props;
    const [toasts, setToasts] = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState([]);
    const filteredToasts = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useMemo(()=>{
        if (id) {
            return toasts.filter((toast)=>toast.toasterId === id);
        }
        return toasts.filter((toast)=>!toast.toasterId);
    }, [
        toasts,
        id
    ]);
    const possiblePositions = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useMemo(()=>{
        return Array.from(new Set([
            position
        ].concat(filteredToasts.filter((toast)=>toast.position).map((toast)=>toast.position))));
    }, [
        filteredToasts,
        position
    ]);
    const [heights, setHeights] = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState([]);
    const [expanded, setExpanded] = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [interacting, setInteracting] = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [actualTheme, setActualTheme] = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(theme !== 'system' ? theme : ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 'light');
    const listRef = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
    const hotkeyLabel = hotkey.join('+').replace(/Key/g, '').replace(/Digit/g, '');
    const lastFocusedElementRef = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
    const isFocusWithinRef = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(false);
    const removeToast = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback((toastToRemove)=>{
        setToasts((toasts)=>{
            var _toasts_find;
            if (!((_toasts_find = toasts.find((toast)=>toast.id === toastToRemove.id)) == null ? void 0 : _toasts_find.delete)) {
                ToastState.dismiss(toastToRemove.id);
            }
            return toasts.filter(({ id })=>id !== toastToRemove.id);
        });
    }, []);
    __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        return ToastState.subscribe((toast)=>{
            if (toast.dismiss) {
                // Prevent batching of other state updates
                requestAnimationFrame(()=>{
                    setToasts((toasts)=>toasts.map((t)=>t.id === toast.id ? {
                                ...t,
                                delete: true
                            } : t));
                });
                return;
            }
            // Prevent batching, temp solution.
            setTimeout(()=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].flushSync(()=>{
                    setToasts((toasts)=>{
                        const indexOfExistingToast = toasts.findIndex((t)=>t.id === toast.id);
                        // Update the toast if it already exists
                        if (indexOfExistingToast !== -1) {
                            return [
                                ...toasts.slice(0, indexOfExistingToast),
                                {
                                    ...toasts[indexOfExistingToast],
                                    ...toast
                                },
                                ...toasts.slice(indexOfExistingToast + 1)
                            ];
                        }
                        return [
                            toast,
                            ...toasts
                        ];
                    });
                });
            });
        });
    }, [
        toasts
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        if (theme !== 'system') {
            setActualTheme(theme);
            return;
        }
        if (theme === 'system') {
            // check if current preference is dark
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                // it's currently dark
                setActualTheme('dark');
            } else {
                // it's not dark
                setActualTheme('light');
            }
        }
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
        const darkMediaQuery = undefined;
    }, [
        theme
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        // Ensure expanded is always false when no toasts are present / only one left
        if (toasts.length <= 1) {
            setExpanded(false);
        }
    }, [
        toasts
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        const handleKeyDown = (event)=>{
            var _listRef_current;
            const isHotkeyPressed = hotkey.every((key)=>event[key] || event.code === key);
            if (isHotkeyPressed) {
                var _listRef_current1;
                setExpanded(true);
                (_listRef_current1 = listRef.current) == null ? void 0 : _listRef_current1.focus();
            }
            if (event.code === 'Escape' && (document.activeElement === listRef.current || ((_listRef_current = listRef.current) == null ? void 0 : _listRef_current.contains(document.activeElement)))) {
                setExpanded(false);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return ()=>document.removeEventListener('keydown', handleKeyDown);
    }, [
        hotkey
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        if (listRef.current) {
            return ()=>{
                if (lastFocusedElementRef.current) {
                    lastFocusedElementRef.current.focus({
                        preventScroll: true
                    });
                    lastFocusedElementRef.current = null;
                    isFocusWithinRef.current = false;
                }
            };
        }
    }, [
        listRef.current
    ]);
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("section", {
        ref: ref,
        "aria-label": `${containerAriaLabel} ${hotkeyLabel}`,
        tabIndex: -1,
        "aria-live": "polite",
        "aria-relevant": "additions text",
        "aria-atomic": "false",
        suppressHydrationWarning: true
    }, possiblePositions.map((position, index)=>{
        var _heights_;
        const [y, x] = position.split('-');
        if (!filteredToasts.length) return null;
        return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("ol", {
            key: position,
            dir: dir === 'auto' ? getDocumentDirection() : dir,
            tabIndex: -1,
            ref: listRef,
            className: className,
            "data-sonner-toaster": true,
            "data-sonner-theme": actualTheme,
            "data-y-position": y,
            "data-x-position": x,
            style: {
                '--front-toast-height': `${((_heights_ = heights[0]) == null ? void 0 : _heights_.height) || 0}px`,
                '--width': `${TOAST_WIDTH}px`,
                '--gap': `${gap}px`,
                ...style,
                ...assignOffset(offset, mobileOffset)
            },
            onBlur: (event)=>{
                if (isFocusWithinRef.current && !event.currentTarget.contains(event.relatedTarget)) {
                    isFocusWithinRef.current = false;
                    if (lastFocusedElementRef.current) {
                        lastFocusedElementRef.current.focus({
                            preventScroll: true
                        });
                        lastFocusedElementRef.current = null;
                    }
                }
            },
            onFocus: (event)=>{
                const isNotDismissible = event.target instanceof HTMLElement && event.target.dataset.dismissible === 'false';
                if (isNotDismissible) return;
                if (!isFocusWithinRef.current) {
                    isFocusWithinRef.current = true;
                    lastFocusedElementRef.current = event.relatedTarget;
                }
            },
            onMouseEnter: ()=>setExpanded(true),
            onMouseMove: ()=>setExpanded(true),
            onMouseLeave: ()=>{
                // Avoid setting expanded to false when interacting with a toast, e.g. swiping
                if (!interacting) {
                    setExpanded(false);
                }
            },
            onDragEnd: ()=>setExpanded(false),
            onPointerDown: (event)=>{
                const isNotDismissible = event.target instanceof HTMLElement && event.target.dataset.dismissible === 'false';
                if (isNotDismissible) return;
                setInteracting(true);
            },
            onPointerUp: ()=>setInteracting(false)
        }, filteredToasts.filter((toast)=>!toast.position && index === 0 || toast.position === position).map((toast, index)=>{
            var _toastOptions_duration, _toastOptions_closeButton;
            return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(Toast, {
                key: toast.id,
                icons: icons,
                index: index,
                toast: toast,
                defaultRichColors: richColors,
                duration: (_toastOptions_duration = toastOptions == null ? void 0 : toastOptions.duration) != null ? _toastOptions_duration : duration,
                className: toastOptions == null ? void 0 : toastOptions.className,
                descriptionClassName: toastOptions == null ? void 0 : toastOptions.descriptionClassName,
                invert: invert,
                visibleToasts: visibleToasts,
                closeButton: (_toastOptions_closeButton = toastOptions == null ? void 0 : toastOptions.closeButton) != null ? _toastOptions_closeButton : closeButton,
                interacting: interacting,
                position: position,
                style: toastOptions == null ? void 0 : toastOptions.style,
                unstyled: toastOptions == null ? void 0 : toastOptions.unstyled,
                classNames: toastOptions == null ? void 0 : toastOptions.classNames,
                cancelButtonStyle: toastOptions == null ? void 0 : toastOptions.cancelButtonStyle,
                actionButtonStyle: toastOptions == null ? void 0 : toastOptions.actionButtonStyle,
                closeButtonAriaLabel: toastOptions == null ? void 0 : toastOptions.closeButtonAriaLabel,
                removeToast: removeToast,
                toasts: filteredToasts.filter((t)=>t.position == toast.position),
                heights: heights.filter((h)=>h.position == toast.position),
                setHeights: setHeights,
                expandByDefault: expand,
                gap: gap,
                expanded: expanded,
                swipeDirections: props.swipeDirections
            });
        }));
    }));
});
;
}),
"[project]/p2p-react/node_modules/xmlhttprequest-ssl/lib/XMLHttpRequest.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
/**
 * Wrapper for built-in http.js to emulate the browser XMLHttpRequest object.
 *
 * This can be used with JS designed for browsers to improve reuse of code and
 * allow the use of existing libraries.
 *
 * Usage: include("XMLHttpRequest.js") and use XMLHttpRequest per W3C specs.
 *
 * @author Dan DeFelippi <dan@driverdan.com>
 * @contributor David Ellis <d.f.ellis@ieee.org>
 * @license MIT
 */ var fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
var Url = __turbopack_context__.r("[externals]/url [external] (url, cjs)");
var spawn = __turbopack_context__.r("[externals]/child_process [external] (child_process, cjs)").spawn;
/**
 * Module exports.
 */ module.exports = XMLHttpRequest;
// backwards-compat
XMLHttpRequest.XMLHttpRequest = XMLHttpRequest;
/**
 * `XMLHttpRequest` constructor.
 *
 * Supported options for the `opts` object are:
 *
 *  - `agent`: An http.Agent instance; http.globalAgent may be used; if 'undefined', agent usage is disabled
 *
 * @param {Object} opts optional "options" object
 */ function XMLHttpRequest(opts) {
    "use strict";
    opts = opts || {};
    /**
   * Private variables
   */ var self = this;
    var http = __turbopack_context__.r("[externals]/http [external] (http, cjs)");
    var https = __turbopack_context__.r("[externals]/https [external] (https, cjs)");
    // Holds http.js objects
    var request;
    var response;
    // Request settings
    var settings = {};
    // Disable header blacklist.
    // Not part of XHR specs.
    var disableHeaderCheck = false;
    // Set some default headers
    var defaultHeaders = {
        "User-Agent": "node-XMLHttpRequest",
        "Accept": "*/*"
    };
    var headers = Object.assign({}, defaultHeaders);
    // These headers are not user setable.
    // The following are allowed but banned in the spec:
    // * user-agent
    var forbiddenRequestHeaders = [
        "accept-charset",
        "accept-encoding",
        "access-control-request-headers",
        "access-control-request-method",
        "connection",
        "content-length",
        "content-transfer-encoding",
        "cookie",
        "cookie2",
        "date",
        "expect",
        "host",
        "keep-alive",
        "origin",
        "referer",
        "te",
        "trailer",
        "transfer-encoding",
        "upgrade",
        "via"
    ];
    // These request methods are not allowed
    var forbiddenRequestMethods = [
        "TRACE",
        "TRACK",
        "CONNECT"
    ];
    // Send flag
    var sendFlag = false;
    // Error flag, used when errors occur or abort is called
    var errorFlag = false;
    var abortedFlag = false;
    // Event listeners
    var listeners = {};
    /**
   * Constants
   */ this.UNSENT = 0;
    this.OPENED = 1;
    this.HEADERS_RECEIVED = 2;
    this.LOADING = 3;
    this.DONE = 4;
    /**
   * Public vars
   */ // Current state
    this.readyState = this.UNSENT;
    // default ready state change handler in case one is not set or is set late
    this.onreadystatechange = null;
    // Result & response
    this.responseText = "";
    this.responseXML = "";
    this.response = Buffer.alloc(0);
    this.status = null;
    this.statusText = null;
    /**
   * Private methods
   */ /**
   * Check if the specified header is allowed.
   *
   * @param string header Header to validate
   * @return boolean False if not allowed, otherwise true
   */ var isAllowedHttpHeader = function(header) {
        return disableHeaderCheck || header && forbiddenRequestHeaders.indexOf(header.toLowerCase()) === -1;
    };
    /**
   * Check if the specified method is allowed.
   *
   * @param string method Request method to validate
   * @return boolean False if not allowed, otherwise true
   */ var isAllowedHttpMethod = function(method) {
        return method && forbiddenRequestMethods.indexOf(method) === -1;
    };
    /**
   * Public methods
   */ /**
   * Open the connection. Currently supports local server requests.
   *
   * @param string method Connection method (eg GET, POST)
   * @param string url URL for the connection.
   * @param boolean async Asynchronous connection. Default is true.
   * @param string user Username for basic authentication (optional)
   * @param string password Password for basic authentication (optional)
   */ this.open = function(method, url, async, user, password) {
        this.abort();
        errorFlag = false;
        abortedFlag = false;
        // Check for valid request method
        if (!isAllowedHttpMethod(method)) {
            throw new Error("SecurityError: Request method not allowed");
        }
        settings = {
            "method": method,
            "url": url.toString(),
            "async": typeof async !== "boolean" ? true : async,
            "user": user || null,
            "password": password || null
        };
        setState(this.OPENED);
    };
    /**
   * Disables or enables isAllowedHttpHeader() check the request. Enabled by default.
   * This does not conform to the W3C spec.
   *
   * @param boolean state Enable or disable header checking.
   */ this.setDisableHeaderCheck = function(state) {
        disableHeaderCheck = state;
    };
    /**
   * Sets a header for the request.
   *
   * @param string header Header name
   * @param string value Header value
   * @return boolean Header added
   */ this.setRequestHeader = function(header, value) {
        if (this.readyState != this.OPENED) {
            throw new Error("INVALID_STATE_ERR: setRequestHeader can only be called when state is OPEN");
        }
        if (!isAllowedHttpHeader(header)) {
            console.warn('Refused to set unsafe header "' + header + '"');
            return false;
        }
        if (sendFlag) {
            throw new Error("INVALID_STATE_ERR: send flag is true");
        }
        headers[header] = value;
        return true;
    };
    /**
   * Gets a header from the server response.
   *
   * @param string header Name of header to get.
   * @return string Text of the header or null if it doesn't exist.
   */ this.getResponseHeader = function(header) {
        if (typeof header === "string" && this.readyState > this.OPENED && response.headers[header.toLowerCase()] && !errorFlag) {
            return response.headers[header.toLowerCase()];
        }
        return null;
    };
    /**
   * Gets all the response headers.
   *
   * @return string A string with all response headers separated by CR+LF
   */ this.getAllResponseHeaders = function() {
        if (this.readyState < this.HEADERS_RECEIVED || errorFlag) {
            return "";
        }
        var result = "";
        for(var i in response.headers){
            // Cookie headers are excluded
            if (i !== "set-cookie" && i !== "set-cookie2") {
                result += i + ": " + response.headers[i] + "\r\n";
            }
        }
        return result.substr(0, result.length - 2);
    };
    /**
   * Gets a request header
   *
   * @param string name Name of header to get
   * @return string Returns the request header or empty string if not set
   */ this.getRequestHeader = function(name) {
        // @TODO Make this case insensitive
        if (typeof name === "string" && headers[name]) {
            return headers[name];
        }
        return "";
    };
    /**
   * Sends the request to the server.
   *
   * @param string data Optional data to send as request body.
   */ this.send = function(data) {
        if (this.readyState != this.OPENED) {
            throw new Error("INVALID_STATE_ERR: connection must be opened before send() is called");
        }
        if (sendFlag) {
            throw new Error("INVALID_STATE_ERR: send has already been called");
        }
        var ssl = false, local = false;
        var url = Url.parse(settings.url);
        var host;
        // Determine the server
        switch(url.protocol){
            case 'https:':
                ssl = true;
            // SSL & non-SSL both need host, no break here.
            case 'http:':
                host = url.hostname;
                break;
            case 'file:':
                local = true;
                break;
            case undefined:
            case '':
                host = "localhost";
                break;
            default:
                throw new Error("Protocol not supported.");
        }
        // Load files off the local filesystem (file://)
        if (local) {
            if (settings.method !== "GET") {
                throw new Error("XMLHttpRequest: Only GET method is supported");
            }
            if (settings.async) {
                fs.readFile(unescape(url.pathname), function(error, data) {
                    if (error) {
                        self.handleError(error, error.errno || -1);
                    } else {
                        self.status = 200;
                        self.responseText = data.toString('utf8');
                        self.response = data;
                        setState(self.DONE);
                    }
                });
            } else {
                try {
                    this.response = fs.readFileSync(unescape(url.pathname));
                    this.responseText = this.response.toString('utf8');
                    this.status = 200;
                    setState(self.DONE);
                } catch (e) {
                    this.handleError(e, e.errno || -1);
                }
            }
            return;
        }
        // Default to port 80. If accessing localhost on another port be sure
        // to use http://localhost:port/path
        var port = url.port || (ssl ? 443 : 80);
        // Add query string if one is used
        var uri = url.pathname + (url.search ? url.search : '');
        // Set the Host header or the server may reject the request
        headers["Host"] = host;
        if (!(ssl && port === 443 || port === 80)) {
            headers["Host"] += ':' + url.port;
        }
        // Set Basic Auth if necessary
        if (settings.user) {
            if (typeof settings.password == "undefined") {
                settings.password = "";
            }
            var authBuf = new Buffer(settings.user + ":" + settings.password);
            headers["Authorization"] = "Basic " + authBuf.toString("base64");
        }
        // Set content length header
        if (settings.method === "GET" || settings.method === "HEAD") {
            data = null;
        } else if (data) {
            headers["Content-Length"] = Buffer.isBuffer(data) ? data.length : Buffer.byteLength(data);
            var headersKeys = Object.keys(headers);
            if (!headersKeys.some(function(h) {
                return h.toLowerCase() === 'content-type';
            })) {
                headers["Content-Type"] = "text/plain;charset=UTF-8";
            }
        } else if (settings.method === "POST") {
            // For a post with no data set Content-Length: 0.
            // This is required by buggy servers that don't meet the specs.
            headers["Content-Length"] = 0;
        }
        var agent = opts.agent || false;
        var options = {
            host: host,
            port: port,
            path: uri,
            method: settings.method,
            headers: headers,
            agent: agent
        };
        if (ssl) {
            options.pfx = opts.pfx;
            options.key = opts.key;
            options.passphrase = opts.passphrase;
            options.cert = opts.cert;
            options.ca = opts.ca;
            options.ciphers = opts.ciphers;
            options.rejectUnauthorized = opts.rejectUnauthorized === false ? false : true;
        }
        // Reset error flag
        errorFlag = false;
        // Handle async requests
        if (settings.async) {
            // Use the proper protocol
            var doRequest = ssl ? https.request : http.request;
            // Request is being sent, set send flag
            sendFlag = true;
            // As per spec, this is called here for historical reasons.
            self.dispatchEvent("readystatechange");
            // Handler for the response
            var responseHandler = function(resp) {
                // Set response var to the response we got back
                // This is so it remains accessable outside this scope
                response = resp;
                // Check for redirect
                // @TODO Prevent looped redirects
                if (response.statusCode === 302 || response.statusCode === 303 || response.statusCode === 307) {
                    // Change URL to the redirect location
                    settings.url = response.headers.location;
                    var url = Url.parse(settings.url);
                    // Set host var in case it's used later
                    host = url.hostname;
                    // Options for the new request
                    var newOptions = {
                        hostname: url.hostname,
                        port: url.port,
                        path: url.path,
                        method: response.statusCode === 303 ? 'GET' : settings.method,
                        headers: headers
                    };
                    if (ssl) {
                        newOptions.pfx = opts.pfx;
                        newOptions.key = opts.key;
                        newOptions.passphrase = opts.passphrase;
                        newOptions.cert = opts.cert;
                        newOptions.ca = opts.ca;
                        newOptions.ciphers = opts.ciphers;
                        newOptions.rejectUnauthorized = opts.rejectUnauthorized === false ? false : true;
                    }
                    // Issue the new request
                    request = doRequest(newOptions, responseHandler).on('error', errorHandler);
                    request.end();
                    // @TODO Check if an XHR event needs to be fired here
                    return;
                }
                setState(self.HEADERS_RECEIVED);
                self.status = response.statusCode;
                response.on('data', function(chunk) {
                    // Make sure there's some data
                    if (chunk) {
                        var data = Buffer.from(chunk);
                        self.response = Buffer.concat([
                            self.response,
                            data
                        ]);
                    }
                    // Don't emit state changes if the connection has been aborted.
                    if (sendFlag) {
                        setState(self.LOADING);
                    }
                });
                response.on('end', function() {
                    if (sendFlag) {
                        // The sendFlag needs to be set before setState is called.  Otherwise if we are chaining callbacks
                        // there can be a timing issue (the callback is called and a new call is made before the flag is reset).
                        sendFlag = false;
                        // Discard the 'end' event if the connection has been aborted
                        setState(self.DONE);
                        // Construct responseText from response
                        self.responseText = self.response.toString('utf8');
                    }
                });
                response.on('error', function(error) {
                    self.handleError(error);
                });
            };
            // Error handler for the request
            var errorHandler = function(error) {
                // In the case of https://nodejs.org/api/http.html#requestreusedsocket triggering an ECONNRESET,
                // don't fail the xhr request, attempt again.
                if (request.reusedSocket && error.code === 'ECONNRESET') return doRequest(options, responseHandler).on('error', errorHandler);
                self.handleError(error);
            };
            // Create the request
            request = doRequest(options, responseHandler).on('error', errorHandler);
            if (opts.autoUnref) {
                request.on('socket', (socket)=>{
                    socket.unref();
                });
            }
            // Node 0.4 and later won't accept empty data. Make sure it's needed.
            if (data) {
                request.write(data);
            }
            request.end();
            self.dispatchEvent("loadstart");
        } else {
            // Create a temporary file for communication with the other Node process
            var contentFile = ".node-xmlhttprequest-content-" + process.pid;
            var syncFile = ".node-xmlhttprequest-sync-" + process.pid;
            fs.writeFileSync(syncFile, "", "utf8");
            // The async request the other Node process executes
            var execString = "var http = require('http'), https = require('https'), fs = require('fs');" + "var doRequest = http" + (ssl ? "s" : "") + ".request;" + "var options = " + JSON.stringify(options) + ";" + "var responseText = '';" + "var responseData = Buffer.alloc(0);" + "var req = doRequest(options, function(response) {" + "response.on('data', function(chunk) {" + "  var data = Buffer.from(chunk);" + "  responseText += data.toString('utf8');" + "  responseData = Buffer.concat([responseData, data]);" + "});" + "response.on('end', function() {" + "fs.writeFileSync('" + contentFile + "', JSON.stringify({err: null, data: {statusCode: response.statusCode, headers: response.headers, text: responseText, data: responseData.toString('base64')}}), 'utf8');" + "fs.unlinkSync('" + syncFile + "');" + "});" + "response.on('error', function(error) {" + "fs.writeFileSync('" + contentFile + "', 'NODE-XMLHTTPREQUEST-ERROR:' + JSON.stringify(error), 'utf8');" + "fs.unlinkSync('" + syncFile + "');" + "});" + "}).on('error', function(error) {" + "fs.writeFileSync('" + contentFile + "', 'NODE-XMLHTTPREQUEST-ERROR:' + JSON.stringify(error), 'utf8');" + "fs.unlinkSync('" + syncFile + "');" + "});" + (data ? "req.write('" + JSON.stringify(data).slice(1, -1).replace(/'/g, "\\'") + "');" : "") + "req.end();";
            // Start the other Node Process, executing this string
            var syncProc = spawn(process.argv[0], [
                "-e",
                execString
            ]);
            var statusText;
            while(fs.existsSync(syncFile)){
            // Wait while the sync file is empty
            }
            self.responseText = fs.readFileSync(contentFile, 'utf8');
            // Kill the child process once the file has data
            syncProc.stdin.end();
            // Remove the temporary file
            fs.unlinkSync(contentFile);
            if (self.responseText.match(/^NODE-XMLHTTPREQUEST-ERROR:/)) {
                // If the file returned an error, handle it
                var errorObj = JSON.parse(self.responseText.replace(/^NODE-XMLHTTPREQUEST-ERROR:/, ""));
                self.handleError(errorObj, 503);
            } else {
                // If the file returned okay, parse its data and move to the DONE state
                self.status = self.responseText.replace(/^NODE-XMLHTTPREQUEST-STATUS:([0-9]*),.*/, "$1");
                var resp = JSON.parse(self.responseText.replace(/^NODE-XMLHTTPREQUEST-STATUS:[0-9]*,(.*)/, "$1"));
                response = {
                    statusCode: self.status,
                    headers: resp.data.headers
                };
                self.responseText = resp.data.text;
                self.response = Buffer.from(resp.data.data, 'base64');
                setState(self.DONE, true);
            }
        }
    };
    /**
   * Called when an error is encountered to deal with it.
   * @param  status  {number}    HTTP status code to use rather than the default (0) for XHR errors.
   */ this.handleError = function(error, status) {
        this.status = status || 0;
        this.statusText = error;
        this.responseText = error.stack;
        errorFlag = true;
        setState(this.DONE);
    };
    /**
   * Aborts a request.
   */ this.abort = function() {
        if (request) {
            request.abort();
            request = null;
        }
        headers = Object.assign({}, defaultHeaders);
        this.responseText = "";
        this.responseXML = "";
        this.response = Buffer.alloc(0);
        errorFlag = abortedFlag = true;
        if (this.readyState !== this.UNSENT && (this.readyState !== this.OPENED || sendFlag) && this.readyState !== this.DONE) {
            sendFlag = false;
            setState(this.DONE);
        }
        this.readyState = this.UNSENT;
    };
    /**
   * Adds an event listener. Preferred method of binding to events.
   */ this.addEventListener = function(event, callback) {
        if (!(event in listeners)) {
            listeners[event] = [];
        }
        // Currently allows duplicate callbacks. Should it?
        listeners[event].push(callback);
    };
    /**
   * Remove an event callback that has already been bound.
   * Only works on the matching funciton, cannot be a copy.
   */ this.removeEventListener = function(event, callback) {
        if (event in listeners) {
            // Filter will return a new array with the callback removed
            listeners[event] = listeners[event].filter(function(ev) {
                return ev !== callback;
            });
        }
    };
    /**
   * Dispatch any events, including both "on" methods and events attached using addEventListener.
   */ this.dispatchEvent = function(event) {
        if (typeof self["on" + event] === "function") {
            if (this.readyState === this.DONE && settings.async) setTimeout(function() {
                self["on" + event]();
            }, 0);
            else self["on" + event]();
        }
        if (event in listeners) {
            for(let i = 0, len = listeners[event].length; i < len; i++){
                if (this.readyState === this.DONE) setTimeout(function() {
                    listeners[event][i].call(self);
                }, 0);
                else listeners[event][i].call(self);
            }
        }
    };
    /**
   * Changes readyState and calls onreadystatechange.
   *
   * @param int state New state
   */ var setState = function(state) {
        if (self.readyState === state || self.readyState === self.UNSENT && abortedFlag) return;
        self.readyState = state;
        if (settings.async || self.readyState < self.OPENED || self.readyState === self.DONE) {
            self.dispatchEvent("readystatechange");
        }
        if (self.readyState === self.DONE) {
            let fire;
            if (abortedFlag) fire = "abort";
            else if (errorFlag) fire = "error";
            else fire = "load";
            self.dispatchEvent(fire);
            // @TODO figure out InspectorInstrumentation::didLoadXHR(cookie)
            self.dispatchEvent("loadend");
        }
    };
}
;
}}),
"[project]/p2p-react/node_modules/engine.io-parser/build/esm/commons.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "ERROR_PACKET": ()=>ERROR_PACKET,
    "PACKET_TYPES": ()=>PACKET_TYPES,
    "PACKET_TYPES_REVERSE": ()=>PACKET_TYPES_REVERSE
});
const PACKET_TYPES = Object.create(null); // no Map = no polyfill
PACKET_TYPES["open"] = "0";
PACKET_TYPES["close"] = "1";
PACKET_TYPES["ping"] = "2";
PACKET_TYPES["pong"] = "3";
PACKET_TYPES["message"] = "4";
PACKET_TYPES["upgrade"] = "5";
PACKET_TYPES["noop"] = "6";
const PACKET_TYPES_REVERSE = Object.create(null);
Object.keys(PACKET_TYPES).forEach((key)=>{
    PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
});
const ERROR_PACKET = {
    type: "error",
    data: "parser error"
};
;
}),
"[project]/p2p-react/node_modules/engine.io-parser/build/esm/encodePacket.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "encodePacket": ()=>encodePacket,
    "encodePacketToBinary": ()=>encodePacketToBinary
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$commons$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-parser/build/esm/commons.js [app-ssr] (ecmascript)");
;
const encodePacket = ({ type, data }, supportsBinary, callback)=>{
    if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
        return callback(supportsBinary ? data : "b" + toBuffer(data, true).toString("base64"));
    }
    // plain string
    return callback(__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$commons$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PACKET_TYPES"][type] + (data || ""));
};
const toBuffer = (data, forceBufferConversion)=>{
    if (Buffer.isBuffer(data) || data instanceof Uint8Array && !forceBufferConversion) {
        return data;
    } else if (data instanceof ArrayBuffer) {
        return Buffer.from(data);
    } else {
        return Buffer.from(data.buffer, data.byteOffset, data.byteLength);
    }
};
let TEXT_ENCODER;
function encodePacketToBinary(packet, callback) {
    if (packet.data instanceof ArrayBuffer || ArrayBuffer.isView(packet.data)) {
        return callback(toBuffer(packet.data, false));
    }
    encodePacket(packet, true, (encoded)=>{
        if (!TEXT_ENCODER) {
            // lazily created for compatibility with Node.js 10
            TEXT_ENCODER = new TextEncoder();
        }
        callback(TEXT_ENCODER.encode(encoded));
    });
}
}),
"[project]/p2p-react/node_modules/engine.io-parser/build/esm/decodePacket.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "decodePacket": ()=>decodePacket
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$commons$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-parser/build/esm/commons.js [app-ssr] (ecmascript)");
;
const decodePacket = (encodedPacket, binaryType)=>{
    if (typeof encodedPacket !== "string") {
        return {
            type: "message",
            data: mapBinary(encodedPacket, binaryType)
        };
    }
    const type = encodedPacket.charAt(0);
    if (type === "b") {
        const buffer = Buffer.from(encodedPacket.substring(1), "base64");
        return {
            type: "message",
            data: mapBinary(buffer, binaryType)
        };
    }
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$commons$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PACKET_TYPES_REVERSE"][type]) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$commons$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ERROR_PACKET"];
    }
    return encodedPacket.length > 1 ? {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$commons$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PACKET_TYPES_REVERSE"][type],
        data: encodedPacket.substring(1)
    } : {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$commons$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PACKET_TYPES_REVERSE"][type]
    };
};
const mapBinary = (data, binaryType)=>{
    switch(binaryType){
        case "arraybuffer":
            if (data instanceof ArrayBuffer) {
                // from WebSocket & binaryType "arraybuffer"
                return data;
            } else if (Buffer.isBuffer(data)) {
                // from HTTP long-polling
                return data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
            } else {
                // from WebTransport (Uint8Array)
                return data.buffer;
            }
        case "nodebuffer":
        default:
            if (Buffer.isBuffer(data)) {
                // from HTTP long-polling or WebSocket & binaryType "nodebuffer" (default)
                return data;
            } else {
                // from WebTransport (Uint8Array)
                return Buffer.from(data);
            }
    }
};
}),
"[project]/p2p-react/node_modules/engine.io-parser/build/esm/index.js [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "createPacketDecoderStream": ()=>createPacketDecoderStream,
    "createPacketEncoderStream": ()=>createPacketEncoderStream,
    "decodePayload": ()=>decodePayload,
    "encodePayload": ()=>encodePayload,
    "protocol": ()=>protocol
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$encodePacket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-parser/build/esm/encodePacket.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$decodePacket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-parser/build/esm/decodePacket.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$commons$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-parser/build/esm/commons.js [app-ssr] (ecmascript)");
;
;
;
const SEPARATOR = String.fromCharCode(30); // see https://en.wikipedia.org/wiki/Delimiter#ASCII_delimited_text
const encodePayload = (packets, callback)=>{
    // some packets may be added to the array while encoding, so the initial length must be saved
    const length = packets.length;
    const encodedPackets = new Array(length);
    let count = 0;
    packets.forEach((packet, i)=>{
        // force base64 encoding for binary packets
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$encodePacket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encodePacket"])(packet, false, (encodedPacket)=>{
            encodedPackets[i] = encodedPacket;
            if (++count === length) {
                callback(encodedPackets.join(SEPARATOR));
            }
        });
    });
};
const decodePayload = (encodedPayload, binaryType)=>{
    const encodedPackets = encodedPayload.split(SEPARATOR);
    const packets = [];
    for(let i = 0; i < encodedPackets.length; i++){
        const decodedPacket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$decodePacket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decodePacket"])(encodedPackets[i], binaryType);
        packets.push(decodedPacket);
        if (decodedPacket.type === "error") {
            break;
        }
    }
    return packets;
};
function createPacketEncoderStream() {
    return new TransformStream({
        transform (packet, controller) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$encodePacket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encodePacketToBinary"])(packet, (encodedPacket)=>{
                const payloadLength = encodedPacket.length;
                let header;
                // inspired by the WebSocket format: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers#decoding_payload_length
                if (payloadLength < 126) {
                    header = new Uint8Array(1);
                    new DataView(header.buffer).setUint8(0, payloadLength);
                } else if (payloadLength < 65536) {
                    header = new Uint8Array(3);
                    const view = new DataView(header.buffer);
                    view.setUint8(0, 126);
                    view.setUint16(1, payloadLength);
                } else {
                    header = new Uint8Array(9);
                    const view = new DataView(header.buffer);
                    view.setUint8(0, 127);
                    view.setBigUint64(1, BigInt(payloadLength));
                }
                // first bit indicates whether the payload is plain text (0) or binary (1)
                if (packet.data && typeof packet.data !== "string") {
                    header[0] |= 0x80;
                }
                controller.enqueue(header);
                controller.enqueue(encodedPacket);
            });
        }
    });
}
let TEXT_DECODER;
function totalLength(chunks) {
    return chunks.reduce((acc, chunk)=>acc + chunk.length, 0);
}
function concatChunks(chunks, size) {
    if (chunks[0].length === size) {
        return chunks.shift();
    }
    const buffer = new Uint8Array(size);
    let j = 0;
    for(let i = 0; i < size; i++){
        buffer[i] = chunks[0][j++];
        if (j === chunks[0].length) {
            chunks.shift();
            j = 0;
        }
    }
    if (chunks.length && j < chunks[0].length) {
        chunks[0] = chunks[0].slice(j);
    }
    return buffer;
}
function createPacketDecoderStream(maxPayload, binaryType) {
    if (!TEXT_DECODER) {
        TEXT_DECODER = new TextDecoder();
    }
    const chunks = [];
    let state = 0 /* State.READ_HEADER */ ;
    let expectedLength = -1;
    let isBinary = false;
    return new TransformStream({
        transform (chunk, controller) {
            chunks.push(chunk);
            while(true){
                if (state === 0 /* State.READ_HEADER */ ) {
                    if (totalLength(chunks) < 1) {
                        break;
                    }
                    const header = concatChunks(chunks, 1);
                    isBinary = (header[0] & 0x80) === 0x80;
                    expectedLength = header[0] & 0x7f;
                    if (expectedLength < 126) {
                        state = 3 /* State.READ_PAYLOAD */ ;
                    } else if (expectedLength === 126) {
                        state = 1 /* State.READ_EXTENDED_LENGTH_16 */ ;
                    } else {
                        state = 2 /* State.READ_EXTENDED_LENGTH_64 */ ;
                    }
                } else if (state === 1 /* State.READ_EXTENDED_LENGTH_16 */ ) {
                    if (totalLength(chunks) < 2) {
                        break;
                    }
                    const headerArray = concatChunks(chunks, 2);
                    expectedLength = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length).getUint16(0);
                    state = 3 /* State.READ_PAYLOAD */ ;
                } else if (state === 2 /* State.READ_EXTENDED_LENGTH_64 */ ) {
                    if (totalLength(chunks) < 8) {
                        break;
                    }
                    const headerArray = concatChunks(chunks, 8);
                    const view = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length);
                    const n = view.getUint32(0);
                    if (n > Math.pow(2, 53 - 32) - 1) {
                        // the maximum safe integer in JavaScript is 2^53 - 1
                        controller.enqueue(__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$commons$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ERROR_PACKET"]);
                        break;
                    }
                    expectedLength = n * Math.pow(2, 32) + view.getUint32(4);
                    state = 3 /* State.READ_PAYLOAD */ ;
                } else {
                    if (totalLength(chunks) < expectedLength) {
                        break;
                    }
                    const data = concatChunks(chunks, expectedLength);
                    controller.enqueue((0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$decodePacket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decodePacket"])(isBinary ? data : TEXT_DECODER.decode(data), binaryType));
                    state = 0 /* State.READ_HEADER */ ;
                }
                if (expectedLength === 0 || expectedLength > maxPayload) {
                    controller.enqueue(__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$commons$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ERROR_PACKET"]);
                    break;
                }
            }
        }
    });
}
const protocol = 4;
;
}),
"[project]/p2p-react/node_modules/engine.io-parser/build/esm/index.js [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$encodePacket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-parser/build/esm/encodePacket.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$decodePacket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-parser/build/esm/decodePacket.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$commons$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-parser/build/esm/commons.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-parser/build/esm/index.js [app-ssr] (ecmascript) <locals>");
}),
"[project]/p2p-react/node_modules/@socket.io/component-emitter/lib/esm/index.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */ __turbopack_context__.s({
    "Emitter": ()=>Emitter
});
function Emitter(obj) {
    if (obj) return mixin(obj);
}
/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */ function mixin(obj) {
    for(var key in Emitter.prototype){
        obj[key] = Emitter.prototype[key];
    }
    return obj;
}
/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */ Emitter.prototype.on = Emitter.prototype.addEventListener = function(event, fn) {
    this._callbacks = this._callbacks || {};
    (this._callbacks['$' + event] = this._callbacks['$' + event] || []).push(fn);
    return this;
};
/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */ Emitter.prototype.once = function(event, fn) {
    function on() {
        this.off(event, on);
        fn.apply(this, arguments);
    }
    on.fn = fn;
    this.on(event, on);
    return this;
};
/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */ Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event, fn) {
    this._callbacks = this._callbacks || {};
    // all
    if (0 == arguments.length) {
        this._callbacks = {};
        return this;
    }
    // specific event
    var callbacks = this._callbacks['$' + event];
    if (!callbacks) return this;
    // remove all handlers
    if (1 == arguments.length) {
        delete this._callbacks['$' + event];
        return this;
    }
    // remove specific handler
    var cb;
    for(var i = 0; i < callbacks.length; i++){
        cb = callbacks[i];
        if (cb === fn || cb.fn === fn) {
            callbacks.splice(i, 1);
            break;
        }
    }
    // Remove event specific arrays for event types that no
    // one is subscribed for to avoid memory leak.
    if (callbacks.length === 0) {
        delete this._callbacks['$' + event];
    }
    return this;
};
/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */ Emitter.prototype.emit = function(event) {
    this._callbacks = this._callbacks || {};
    var args = new Array(arguments.length - 1), callbacks = this._callbacks['$' + event];
    for(var i = 1; i < arguments.length; i++){
        args[i - 1] = arguments[i];
    }
    if (callbacks) {
        callbacks = callbacks.slice(0);
        for(var i = 0, len = callbacks.length; i < len; ++i){
            callbacks[i].apply(this, args);
        }
    }
    return this;
};
// alias used for reserved events (protected method)
Emitter.prototype.emitReserved = Emitter.prototype.emit;
/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */ Emitter.prototype.listeners = function(event) {
    this._callbacks = this._callbacks || {};
    return this._callbacks['$' + event] || [];
};
/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */ Emitter.prototype.hasListeners = function(event) {
    return !!this.listeners(event).length;
};
}),
"[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/globals.node.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "CookieJar": ()=>CookieJar,
    "createCookieJar": ()=>createCookieJar,
    "defaultBinaryType": ()=>defaultBinaryType,
    "globalThisShim": ()=>globalThisShim,
    "nextTick": ()=>nextTick,
    "parse": ()=>parse
});
const nextTick = process.nextTick;
const globalThisShim = ("TURBOPACK ident replacement", globalThis);
const defaultBinaryType = "nodebuffer";
function createCookieJar() {
    return new CookieJar();
}
function parse(setCookieString) {
    const parts = setCookieString.split("; ");
    const i = parts[0].indexOf("=");
    if (i === -1) {
        return;
    }
    const name = parts[0].substring(0, i).trim();
    if (!name.length) {
        return;
    }
    let value = parts[0].substring(i + 1).trim();
    if (value.charCodeAt(0) === 0x22) {
        // remove double quotes
        value = value.slice(1, -1);
    }
    const cookie = {
        name,
        value
    };
    for(let j = 1; j < parts.length; j++){
        const subParts = parts[j].split("=");
        if (subParts.length !== 2) {
            continue;
        }
        const key = subParts[0].trim();
        const value = subParts[1].trim();
        switch(key){
            case "Expires":
                cookie.expires = new Date(value);
                break;
            case "Max-Age":
                const expiration = new Date();
                expiration.setUTCSeconds(expiration.getUTCSeconds() + parseInt(value, 10));
                cookie.expires = expiration;
                break;
            default:
        }
    }
    return cookie;
}
class CookieJar {
    constructor(){
        this._cookies = new Map();
    }
    parseCookies(values) {
        if (!values) {
            return;
        }
        values.forEach((value)=>{
            const parsed = parse(value);
            if (parsed) {
                this._cookies.set(parsed.name, parsed);
            }
        });
    }
    get cookies() {
        const now = Date.now();
        this._cookies.forEach((cookie, name)=>{
            var _a;
            if (((_a = cookie.expires) === null || _a === void 0 ? void 0 : _a.getTime()) < now) {
                this._cookies.delete(name);
            }
        });
        return this._cookies.entries();
    }
    addCookies(xhr) {
        const cookies = [];
        for (const [name, cookie] of this.cookies){
            cookies.push(`${name}=${cookie.value}`);
        }
        if (cookies.length) {
            xhr.setDisableHeaderCheck(true);
            xhr.setRequestHeader("cookie", cookies.join("; "));
        }
    }
    appendCookies(headers) {
        for (const [name, cookie] of this.cookies){
            headers.append("cookie", `${name}=${cookie.value}`);
        }
    }
}
}),
"[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/util.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "byteLength": ()=>byteLength,
    "installTimerFunctions": ()=>installTimerFunctions,
    "pick": ()=>pick,
    "randomString": ()=>randomString
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$globals$2e$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/globals.node.js [app-ssr] (ecmascript)");
;
function pick(obj, ...attr) {
    return attr.reduce((acc, k)=>{
        if (obj.hasOwnProperty(k)) {
            acc[k] = obj[k];
        }
        return acc;
    }, {});
}
// Keep a reference to the real timeout functions so they can be used when overridden
const NATIVE_SET_TIMEOUT = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$globals$2e$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["globalThisShim"].setTimeout;
const NATIVE_CLEAR_TIMEOUT = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$globals$2e$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["globalThisShim"].clearTimeout;
function installTimerFunctions(obj, opts) {
    if (opts.useNativeTimers) {
        obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$globals$2e$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["globalThisShim"]);
        obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$globals$2e$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["globalThisShim"]);
    } else {
        obj.setTimeoutFn = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$globals$2e$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["globalThisShim"].setTimeout.bind(__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$globals$2e$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["globalThisShim"]);
        obj.clearTimeoutFn = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$globals$2e$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["globalThisShim"].clearTimeout.bind(__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$globals$2e$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["globalThisShim"]);
    }
}
// base64 encoded buffers are about 33% bigger (https://en.wikipedia.org/wiki/Base64)
const BASE64_OVERHEAD = 1.33;
function byteLength(obj) {
    if (typeof obj === "string") {
        return utf8Length(obj);
    }
    // arraybuffer or blob
    return Math.ceil((obj.byteLength || obj.size) * BASE64_OVERHEAD);
}
function utf8Length(str) {
    let c = 0, length = 0;
    for(let i = 0, l = str.length; i < l; i++){
        c = str.charCodeAt(i);
        if (c < 0x80) {
            length += 1;
        } else if (c < 0x800) {
            length += 2;
        } else if (c < 0xd800 || c >= 0xe000) {
            length += 3;
        } else {
            i++;
            length += 4;
        }
    }
    return length;
}
function randomString() {
    return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5);
}
}),
"[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/contrib/parseqs.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// imported from https://github.com/galkn/querystring
/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */ __turbopack_context__.s({
    "decode": ()=>decode,
    "encode": ()=>encode
});
function encode(obj) {
    let str = '';
    for(let i in obj){
        if (obj.hasOwnProperty(i)) {
            if (str.length) str += '&';
            str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
        }
    }
    return str;
}
function decode(qs) {
    let qry = {};
    let pairs = qs.split('&');
    for(let i = 0, l = pairs.length; i < l; i++){
        let pair = pairs[i].split('=');
        qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return qry;
}
}),
"[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/transport.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "Transport": ()=>Transport,
    "TransportError": ()=>TransportError
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-parser/build/esm/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$decodePacket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-parser/build/esm/decodePacket.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$socket$2e$io$2f$component$2d$emitter$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/@socket.io/component-emitter/lib/esm/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$util$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/util.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$contrib$2f$parseqs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/contrib/parseqs.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$node_modules$2f$debug$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/node_modules/debug/src/index.js [app-ssr] (ecmascript)"); // debug()
;
;
;
;
;
const debug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$node_modules$2f$debug$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("engine.io-client:transport"); // debug()
class TransportError extends Error {
    constructor(reason, description, context){
        super(reason);
        this.description = description;
        this.context = context;
        this.type = "TransportError";
    }
}
class Transport extends __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$socket$2e$io$2f$component$2d$emitter$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Emitter"] {
    /**
     * Transport abstract constructor.
     *
     * @param {Object} opts - options
     * @protected
     */ constructor(opts){
        super();
        this.writable = false;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$util$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["installTimerFunctions"])(this, opts);
        this.opts = opts;
        this.query = opts.query;
        this.socket = opts.socket;
        this.supportsBinary = !opts.forceBase64;
    }
    /**
     * Emits an error.
     *
     * @param {String} reason
     * @param description
     * @param context - the error context
     * @return {Transport} for chaining
     * @protected
     */ onError(reason, description, context) {
        super.emitReserved("error", new TransportError(reason, description, context));
        return this;
    }
    /**
     * Opens the transport.
     */ open() {
        this.readyState = "opening";
        this.doOpen();
        return this;
    }
    /**
     * Closes the transport.
     */ close() {
        if (this.readyState === "opening" || this.readyState === "open") {
            this.doClose();
            this.onClose();
        }
        return this;
    }
    /**
     * Sends multiple packets.
     *
     * @param {Array} packets
     */ send(packets) {
        if (this.readyState === "open") {
            this.write(packets);
        } else {
            // this might happen if the transport was silently closed in the beforeunload event handler
            debug("transport is not open, discarding packets");
        }
    }
    /**
     * Called upon open
     *
     * @protected
     */ onOpen() {
        this.readyState = "open";
        this.writable = true;
        super.emitReserved("open");
    }
    /**
     * Called with data.
     *
     * @param {String} data
     * @protected
     */ onData(data) {
        const packet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$decodePacket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decodePacket"])(data, this.socket.binaryType);
        this.onPacket(packet);
    }
    /**
     * Called with a decoded packet.
     *
     * @protected
     */ onPacket(packet) {
        super.emitReserved("packet", packet);
    }
    /**
     * Called upon close.
     *
     * @protected
     */ onClose(details) {
        this.readyState = "closed";
        super.emitReserved("close", details);
    }
    /**
     * Pauses the transport, in order not to lose packets during an upgrade.
     *
     * @param onPause
     */ pause(onPause) {}
    createUri(schema, query = {}) {
        return schema + "://" + this._hostname() + this._port() + this.opts.path + this._query(query);
    }
    _hostname() {
        const hostname = this.opts.hostname;
        return hostname.indexOf(":") === -1 ? hostname : "[" + hostname + "]";
    }
    _port() {
        if (this.opts.port && (this.opts.secure && Number(this.opts.port !== 443) || !this.opts.secure && Number(this.opts.port) !== 80)) {
            return ":" + this.opts.port;
        } else {
            return "";
        }
    }
    _query(query) {
        const encodedQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$contrib$2f$parseqs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encode"])(query);
        return encodedQuery.length ? "?" + encodedQuery : "";
    }
}
}),
"[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/transports/polling.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "Polling": ()=>Polling
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$transport$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/transport.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$util$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/util.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-parser/build/esm/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-parser/build/esm/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$node_modules$2f$debug$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/node_modules/debug/src/index.js [app-ssr] (ecmascript)"); // debug()
;
;
;
;
const debug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$node_modules$2f$debug$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("engine.io-client:polling"); // debug()
class Polling extends __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$transport$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Transport"] {
    constructor(){
        super(...arguments);
        this._polling = false;
    }
    get name() {
        return "polling";
    }
    /**
     * Opens the socket (triggers polling). We write a PING message to determine
     * when the transport is open.
     *
     * @protected
     */ doOpen() {
        this._poll();
    }
    /**
     * Pauses polling.
     *
     * @param {Function} onPause - callback upon buffers are flushed and transport is paused
     * @package
     */ pause(onPause) {
        this.readyState = "pausing";
        const pause = ()=>{
            debug("paused");
            this.readyState = "paused";
            onPause();
        };
        if (this._polling || !this.writable) {
            let total = 0;
            if (this._polling) {
                debug("we are currently polling - waiting to pause");
                total++;
                this.once("pollComplete", function() {
                    debug("pre-pause polling complete");
                    --total || pause();
                });
            }
            if (!this.writable) {
                debug("we are currently writing - waiting to pause");
                total++;
                this.once("drain", function() {
                    debug("pre-pause writing complete");
                    --total || pause();
                });
            }
        } else {
            pause();
        }
    }
    /**
     * Starts polling cycle.
     *
     * @private
     */ _poll() {
        debug("polling");
        this._polling = true;
        this.doPoll();
        this.emitReserved("poll");
    }
    /**
     * Overloads onData to detect payloads.
     *
     * @protected
     */ onData(data) {
        debug("polling got data %s", data);
        const callback = (packet)=>{
            // if its the first message we consider the transport open
            if ("opening" === this.readyState && packet.type === "open") {
                this.onOpen();
            }
            // if its a close packet, we close the ongoing requests
            if ("close" === packet.type) {
                this.onClose({
                    description: "transport closed by the server"
                });
                return false;
            }
            // otherwise bypass onData and handle the message
            this.onPacket(packet);
        };
        // decode payload
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["decodePayload"])(data, this.socket.binaryType).forEach(callback);
        // if an event did not trigger closing
        if ("closed" !== this.readyState) {
            // if we got data we're not polling
            this._polling = false;
            this.emitReserved("pollComplete");
            if ("open" === this.readyState) {
                this._poll();
            } else {
                debug('ignoring poll - transport state "%s"', this.readyState);
            }
        }
    }
    /**
     * For polling, send a close packet.
     *
     * @protected
     */ doClose() {
        const close = ()=>{
            debug("writing close packet");
            this.write([
                {
                    type: "close"
                }
            ]);
        };
        if ("open" === this.readyState) {
            debug("transport open - closing");
            close();
        } else {
            // in case we're trying to close while
            // handshaking is in progress (GH-164)
            debug("transport not open - deferring close");
            this.once("open", close);
        }
    }
    /**
     * Writes a packets payload.
     *
     * @param {Array} packets - data packets
     * @protected
     */ write(packets) {
        this.writable = false;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["encodePayload"])(packets, (data)=>{
            this.doWrite(data, ()=>{
                this.writable = true;
                this.emitReserved("drain");
            });
        });
    }
    /**
     * Generates uri for connection.
     *
     * @private
     */ uri() {
        const schema = this.opts.secure ? "https" : "http";
        const query = this.query || {};
        // cache busting is forced
        if (false !== this.opts.timestampRequests) {
            query[this.opts.timestampParam] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$util$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["randomString"])();
        }
        if (!this.supportsBinary && !query.sid) {
            query.b64 = 1;
        }
        return this.createUri(schema, query);
    }
}
}),
"[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/contrib/has-cors.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// imported from https://github.com/component/has-cors
__turbopack_context__.s({
    "hasCORS": ()=>hasCORS
});
let value = false;
try {
    value = typeof XMLHttpRequest !== 'undefined' && 'withCredentials' in new XMLHttpRequest();
} catch (err) {
// if XMLHttp support is disabled in IE then it will throw
// when trying to create
}
const hasCORS = value;
}),
"[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/transports/polling-xhr.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "BaseXHR": ()=>BaseXHR,
    "Request": ()=>Request,
    "XHR": ()=>XHR
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$transports$2f$polling$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/transports/polling.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$socket$2e$io$2f$component$2d$emitter$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/@socket.io/component-emitter/lib/esm/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$util$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/util.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$globals$2e$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/globals.node.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$contrib$2f$has$2d$cors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/contrib/has-cors.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$node_modules$2f$debug$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/node_modules/debug/src/index.js [app-ssr] (ecmascript)"); // debug()
;
;
;
;
;
;
const debug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$node_modules$2f$debug$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("engine.io-client:polling"); // debug()
function empty() {}
class BaseXHR extends __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$transports$2f$polling$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Polling"] {
    /**
     * XHR Polling constructor.
     *
     * @param {Object} opts
     * @package
     */ constructor(opts){
        super(opts);
        if (typeof location !== "undefined") {
            const isSSL = "https:" === location.protocol;
            let port = location.port;
            // some user agents have empty `location.port`
            if (!port) {
                port = isSSL ? "443" : "80";
            }
            this.xd = typeof location !== "undefined" && opts.hostname !== location.hostname || port !== opts.port;
        }
    }
    /**
     * Sends data.
     *
     * @param {String} data to send.
     * @param {Function} called upon flush.
     * @private
     */ doWrite(data, fn) {
        const req = this.request({
            method: "POST",
            data: data
        });
        req.on("success", fn);
        req.on("error", (xhrStatus, context)=>{
            this.onError("xhr post error", xhrStatus, context);
        });
    }
    /**
     * Starts a poll cycle.
     *
     * @private
     */ doPoll() {
        debug("xhr poll");
        const req = this.request();
        req.on("data", this.onData.bind(this));
        req.on("error", (xhrStatus, context)=>{
            this.onError("xhr poll error", xhrStatus, context);
        });
        this.pollXhr = req;
    }
}
class Request extends __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$socket$2e$io$2f$component$2d$emitter$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Emitter"] {
    /**
     * Request constructor
     *
     * @param {Object} options
     * @package
     */ constructor(createRequest, uri, opts){
        super();
        this.createRequest = createRequest;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$util$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["installTimerFunctions"])(this, opts);
        this._opts = opts;
        this._method = opts.method || "GET";
        this._uri = uri;
        this._data = undefined !== opts.data ? opts.data : null;
        this._create();
    }
    /**
     * Creates the XHR object and sends the request.
     *
     * @private
     */ _create() {
        var _a;
        const opts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$util$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pick"])(this._opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
        opts.xdomain = !!this._opts.xd;
        const xhr = this._xhr = this.createRequest(opts);
        try {
            debug("xhr open %s: %s", this._method, this._uri);
            xhr.open(this._method, this._uri, true);
            try {
                if (this._opts.extraHeaders) {
                    // @ts-ignore
                    xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
                    for(let i in this._opts.extraHeaders){
                        if (this._opts.extraHeaders.hasOwnProperty(i)) {
                            xhr.setRequestHeader(i, this._opts.extraHeaders[i]);
                        }
                    }
                }
            } catch (e) {}
            if ("POST" === this._method) {
                try {
                    xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
                } catch (e) {}
            }
            try {
                xhr.setRequestHeader("Accept", "*/*");
            } catch (e) {}
            (_a = this._opts.cookieJar) === null || _a === void 0 ? void 0 : _a.addCookies(xhr);
            // ie6 check
            if ("withCredentials" in xhr) {
                xhr.withCredentials = this._opts.withCredentials;
            }
            if (this._opts.requestTimeout) {
                xhr.timeout = this._opts.requestTimeout;
            }
            xhr.onreadystatechange = ()=>{
                var _a;
                if (xhr.readyState === 3) {
                    (_a = this._opts.cookieJar) === null || _a === void 0 ? void 0 : _a.parseCookies(// @ts-ignore
                    xhr.getResponseHeader("set-cookie"));
                }
                if (4 !== xhr.readyState) return;
                if (200 === xhr.status || 1223 === xhr.status) {
                    this._onLoad();
                } else {
                    // make sure the `error` event handler that's user-set
                    // does not throw in the same tick and gets caught here
                    this.setTimeoutFn(()=>{
                        this._onError(typeof xhr.status === "number" ? xhr.status : 0);
                    }, 0);
                }
            };
            debug("xhr data %s", this._data);
            xhr.send(this._data);
        } catch (e) {
            // Need to defer since .create() is called directly from the constructor
            // and thus the 'error' event can only be only bound *after* this exception
            // occurs.  Therefore, also, we cannot throw here at all.
            this.setTimeoutFn(()=>{
                this._onError(e);
            }, 0);
            return;
        }
        if (typeof document !== "undefined") {
            this._index = Request.requestsCount++;
            Request.requests[this._index] = this;
        }
    }
    /**
     * Called upon error.
     *
     * @private
     */ _onError(err) {
        this.emitReserved("error", err, this._xhr);
        this._cleanup(true);
    }
    /**
     * Cleans up house.
     *
     * @private
     */ _cleanup(fromError) {
        if ("undefined" === typeof this._xhr || null === this._xhr) {
            return;
        }
        this._xhr.onreadystatechange = empty;
        if (fromError) {
            try {
                this._xhr.abort();
            } catch (e) {}
        }
        if (typeof document !== "undefined") {
            delete Request.requests[this._index];
        }
        this._xhr = null;
    }
    /**
     * Called upon load.
     *
     * @private
     */ _onLoad() {
        const data = this._xhr.responseText;
        if (data !== null) {
            this.emitReserved("data", data);
            this.emitReserved("success");
            this._cleanup();
        }
    }
    /**
     * Aborts the request.
     *
     * @package
     */ abort() {
        this._cleanup();
    }
}
Request.requestsCount = 0;
Request.requests = {};
/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */ if (typeof document !== "undefined") {
    // @ts-ignore
    if (typeof attachEvent === "function") {
        // @ts-ignore
        attachEvent("onunload", unloadHandler);
    } else if (typeof addEventListener === "function") {
        const terminationEvent = "onpagehide" in __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$globals$2e$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["globalThisShim"] ? "pagehide" : "unload";
        addEventListener(terminationEvent, unloadHandler, false);
    }
}
function unloadHandler() {
    for(let i in Request.requests){
        if (Request.requests.hasOwnProperty(i)) {
            Request.requests[i].abort();
        }
    }
}
const hasXHR2 = function() {
    const xhr = newRequest({
        xdomain: false
    });
    return xhr && xhr.responseType !== null;
}();
class XHR extends BaseXHR {
    constructor(opts){
        super(opts);
        const forceBase64 = opts && opts.forceBase64;
        this.supportsBinary = hasXHR2 && !forceBase64;
    }
    request(opts = {}) {
        Object.assign(opts, {
            xd: this.xd
        }, this.opts);
        return new Request(newRequest, this.uri(), opts);
    }
}
function newRequest(opts) {
    const xdomain = opts.xdomain;
    // XMLHttpRequest can be disabled on IE
    try {
        if ("undefined" !== typeof XMLHttpRequest && (!xdomain || __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$contrib$2f$has$2d$cors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasCORS"])) {
            return new XMLHttpRequest();
        }
    } catch (e) {}
    if (!xdomain) {
        try {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$globals$2e$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["globalThisShim"][[
                "Active"
            ].concat("Object").join("X")]("Microsoft.XMLHTTP");
        } catch (e) {}
    }
}
}),
"[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/transports/polling-xhr.node.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "XHR": ()=>XHR
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$xmlhttprequest$2d$ssl$2f$lib$2f$XMLHttpRequest$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/xmlhttprequest-ssl/lib/XMLHttpRequest.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$transports$2f$polling$2d$xhr$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/transports/polling-xhr.js [app-ssr] (ecmascript)");
;
;
const XMLHttpRequest = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$xmlhttprequest$2d$ssl$2f$lib$2f$XMLHttpRequest$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.default || __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$xmlhttprequest$2d$ssl$2f$lib$2f$XMLHttpRequest$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__;
class XHR extends __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$transports$2f$polling$2d$xhr$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseXHR"] {
    request(opts = {}) {
        var _a;
        Object.assign(opts, {
            xd: this.xd,
            cookieJar: (_a = this.socket) === null || _a === void 0 ? void 0 : _a._cookieJar
        }, this.opts);
        return new __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$transports$2f$polling$2d$xhr$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Request"]((opts)=>new XMLHttpRequest(opts), this.uri(), opts);
    }
}
}),
"[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/transports/websocket.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "BaseWS": ()=>BaseWS,
    "WS": ()=>WS
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$transport$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/transport.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$util$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/util.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-parser/build/esm/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$encodePacket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-parser/build/esm/encodePacket.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$globals$2e$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/globals.node.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$node_modules$2f$debug$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/node_modules/debug/src/index.js [app-ssr] (ecmascript)"); // debug()
;
;
;
;
;
const debug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$node_modules$2f$debug$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("engine.io-client:websocket"); // debug()
// detect ReactNative environment
const isReactNative = typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
class BaseWS extends __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$transport$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Transport"] {
    get name() {
        return "websocket";
    }
    doOpen() {
        const uri = this.uri();
        const protocols = this.opts.protocols;
        // React Native only supports the 'headers' option, and will print a warning if anything else is passed
        const opts = isReactNative ? {} : (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$util$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pick"])(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
        if (this.opts.extraHeaders) {
            opts.headers = this.opts.extraHeaders;
        }
        try {
            this.ws = this.createSocket(uri, protocols, opts);
        } catch (err) {
            return this.emitReserved("error", err);
        }
        this.ws.binaryType = this.socket.binaryType;
        this.addEventListeners();
    }
    /**
     * Adds event listeners to the socket
     *
     * @private
     */ addEventListeners() {
        this.ws.onopen = ()=>{
            if (this.opts.autoUnref) {
                this.ws._socket.unref();
            }
            this.onOpen();
        };
        this.ws.onclose = (closeEvent)=>this.onClose({
                description: "websocket connection closed",
                context: closeEvent
            });
        this.ws.onmessage = (ev)=>this.onData(ev.data);
        this.ws.onerror = (e)=>this.onError("websocket error", e);
    }
    write(packets) {
        this.writable = false;
        // encodePacket efficient as it uses WS framing
        // no need for encodePayload
        for(let i = 0; i < packets.length; i++){
            const packet = packets[i];
            const lastPacket = i === packets.length - 1;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$encodePacket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encodePacket"])(packet, this.supportsBinary, (data)=>{
                // Sometimes the websocket has already been closed but the browser didn't
                // have a chance of informing us about it yet, in that case send will
                // throw an error
                try {
                    this.doWrite(packet, data);
                } catch (e) {
                    debug("websocket closed before onclose event");
                }
                if (lastPacket) {
                    // fake drain
                    // defer to next tick to allow Socket to clear writeBuffer
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$globals$2e$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nextTick"])(()=>{
                        this.writable = true;
                        this.emitReserved("drain");
                    }, this.setTimeoutFn);
                }
            });
        }
    }
    doClose() {
        if (typeof this.ws !== "undefined") {
            this.ws.onerror = ()=>{};
            this.ws.close();
            this.ws = null;
        }
    }
    /**
     * Generates uri for connection.
     *
     * @private
     */ uri() {
        const schema = this.opts.secure ? "wss" : "ws";
        const query = this.query || {};
        // append timestamp to URI
        if (this.opts.timestampRequests) {
            query[this.opts.timestampParam] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$util$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["randomString"])();
        }
        // communicate binary support capabilities
        if (!this.supportsBinary) {
            query.b64 = 1;
        }
        return this.createUri(schema, query);
    }
}
const WebSocketCtor = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$globals$2e$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["globalThisShim"].WebSocket || __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$globals$2e$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["globalThisShim"].MozWebSocket;
class WS extends BaseWS {
    createSocket(uri, protocols, opts) {
        return !isReactNative ? protocols ? new WebSocketCtor(uri, protocols) : new WebSocketCtor(uri) : new WebSocketCtor(uri, protocols, opts);
    }
    doWrite(_packet, data) {
        this.ws.send(data);
    }
}
}),
"[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/transports/websocket.node.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "WS": ()=>WS
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$ws$2f$wrapper$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/ws/wrapper.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$ws$2f$lib$2f$websocket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__WebSocket$3e$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/ws/lib/websocket.js [app-ssr] (ecmascript) <export default as WebSocket>");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$transports$2f$websocket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/transports/websocket.js [app-ssr] (ecmascript)");
;
;
class WS extends __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$transports$2f$websocket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BaseWS"] {
    createSocket(uri, protocols, opts) {
        var _a;
        if ((_a = this.socket) === null || _a === void 0 ? void 0 : _a._cookieJar) {
            opts.headers = opts.headers || {};
            opts.headers.cookie = typeof opts.headers.cookie === "string" ? [
                opts.headers.cookie
            ] : opts.headers.cookie || [];
            for (const [name, cookie] of this.socket._cookieJar.cookies){
                opts.headers.cookie.push(`${name}=${cookie.value}`);
            }
        }
        return new __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$ws$2f$lib$2f$websocket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__WebSocket$3e$__["WebSocket"](uri, protocols, opts);
    }
    doWrite(packet, data) {
        const opts = {};
        if (packet.options) {
            opts.compress = packet.options.compress;
        }
        if (this.opts.perMessageDeflate) {
            const len = // @ts-ignore
            "string" === typeof data ? Buffer.byteLength(data) : data.length;
            if (len < this.opts.perMessageDeflate.threshold) {
                opts.compress = false;
            }
        }
        this.ws.send(data, opts);
    }
}
}),
"[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/transports/webtransport.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "WT": ()=>WT
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$transport$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/transport.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$globals$2e$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/globals.node.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-parser/build/esm/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-parser/build/esm/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$node_modules$2f$debug$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/node_modules/debug/src/index.js [app-ssr] (ecmascript)"); // debug()
;
;
;
;
const debug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$node_modules$2f$debug$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("engine.io-client:webtransport"); // debug()
class WT extends __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$transport$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Transport"] {
    get name() {
        return "webtransport";
    }
    doOpen() {
        try {
            // @ts-ignore
            this._transport = new WebTransport(this.createUri("https"), this.opts.transportOptions[this.name]);
        } catch (err) {
            return this.emitReserved("error", err);
        }
        this._transport.closed.then(()=>{
            debug("transport closed gracefully");
            this.onClose();
        }).catch((err)=>{
            debug("transport closed due to %s", err);
            this.onError("webtransport error", err);
        });
        // note: we could have used async/await, but that would require some additional polyfills
        this._transport.ready.then(()=>{
            this._transport.createBidirectionalStream().then((stream)=>{
                const decoderStream = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createPacketDecoderStream"])(Number.MAX_SAFE_INTEGER, this.socket.binaryType);
                const reader = stream.readable.pipeThrough(decoderStream).getReader();
                const encoderStream = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createPacketEncoderStream"])();
                encoderStream.readable.pipeTo(stream.writable);
                this._writer = encoderStream.writable.getWriter();
                const read = ()=>{
                    reader.read().then(({ done, value })=>{
                        if (done) {
                            debug("session is closed");
                            return;
                        }
                        debug("received chunk: %o", value);
                        this.onPacket(value);
                        read();
                    }).catch((err)=>{
                        debug("an error occurred while reading: %s", err);
                    });
                };
                read();
                const packet = {
                    type: "open"
                };
                if (this.query.sid) {
                    packet.data = `{"sid":"${this.query.sid}"}`;
                }
                this._writer.write(packet).then(()=>this.onOpen());
            });
        });
    }
    write(packets) {
        this.writable = false;
        for(let i = 0; i < packets.length; i++){
            const packet = packets[i];
            const lastPacket = i === packets.length - 1;
            this._writer.write(packet).then(()=>{
                if (lastPacket) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$globals$2e$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nextTick"])(()=>{
                        this.writable = true;
                        this.emitReserved("drain");
                    }, this.setTimeoutFn);
                }
            });
        }
    }
    doClose() {
        var _a;
        (_a = this._transport) === null || _a === void 0 ? void 0 : _a.close();
    }
}
}),
"[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/transports/index.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "transports": ()=>transports
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$transports$2f$polling$2d$xhr$2e$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/transports/polling-xhr.node.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$transports$2f$websocket$2e$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/transports/websocket.node.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$transports$2f$webtransport$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/transports/webtransport.js [app-ssr] (ecmascript)");
;
;
;
const transports = {
    websocket: __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$transports$2f$websocket$2e$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WS"],
    webtransport: __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$transports$2f$webtransport$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WT"],
    polling: __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$transports$2f$polling$2d$xhr$2e$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["XHR"]
};
}),
"[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/contrib/parseuri.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// imported from https://github.com/galkn/parseuri
/**
 * Parses a URI
 *
 * Note: we could also have used the built-in URL object, but it isn't supported on all platforms.
 *
 * See:
 * - https://developer.mozilla.org/en-US/docs/Web/API/URL
 * - https://caniuse.com/url
 * - https://www.rfc-editor.org/rfc/rfc3986#appendix-B
 *
 * History of the parse() method:
 * - first commit: https://github.com/socketio/socket.io-client/commit/4ee1d5d94b3906a9c052b459f1a818b15f38f91c
 * - export into its own module: https://github.com/socketio/engine.io-client/commit/de2c561e4564efeb78f1bdb1ba39ef81b2822cb3
 * - reimport: https://github.com/socketio/engine.io-client/commit/df32277c3f6d622eec5ed09f493cae3f3391d242
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */ __turbopack_context__.s({
    "parse": ()=>parse
});
const re = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
const parts = [
    'source',
    'protocol',
    'authority',
    'userInfo',
    'user',
    'password',
    'host',
    'port',
    'relative',
    'path',
    'directory',
    'file',
    'query',
    'anchor'
];
function parse(str) {
    if (str.length > 8000) {
        throw "URI too long";
    }
    const src = str, b = str.indexOf('['), e = str.indexOf(']');
    if (b != -1 && e != -1) {
        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
    }
    let m = re.exec(str || ''), uri = {}, i = 14;
    while(i--){
        uri[parts[i]] = m[i] || '';
    }
    if (b != -1 && e != -1) {
        uri.source = src;
        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
        uri.ipv6uri = true;
    }
    uri.pathNames = pathNames(uri, uri['path']);
    uri.queryKey = queryKey(uri, uri['query']);
    return uri;
}
function pathNames(obj, path) {
    const regx = /\/{2,9}/g, names = path.replace(regx, "/").split("/");
    if (path.slice(0, 1) == '/' || path.length === 0) {
        names.splice(0, 1);
    }
    if (path.slice(-1) == '/') {
        names.splice(names.length - 1, 1);
    }
    return names;
}
function queryKey(uri, query) {
    const data = {};
    query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function($0, $1, $2) {
        if ($1) {
            data[$1] = $2;
        }
    });
    return data;
}
}),
"[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/socket.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "Socket": ()=>Socket,
    "SocketWithUpgrade": ()=>SocketWithUpgrade,
    "SocketWithoutUpgrade": ()=>SocketWithoutUpgrade
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$transports$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/transports/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$util$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/util.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$contrib$2f$parseqs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/contrib/parseqs.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$contrib$2f$parseuri$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/contrib/parseuri.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$socket$2e$io$2f$component$2d$emitter$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/@socket.io/component-emitter/lib/esm/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-parser/build/esm/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-parser/build/esm/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$globals$2e$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/globals.node.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$node_modules$2f$debug$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/node_modules/debug/src/index.js [app-ssr] (ecmascript)"); // debug()
;
;
;
;
;
;
;
;
const debug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$node_modules$2f$debug$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("engine.io-client:socket"); // debug()
const withEventListeners = typeof addEventListener === "function" && typeof removeEventListener === "function";
const OFFLINE_EVENT_LISTENERS = [];
if (withEventListeners) {
    // within a ServiceWorker, any event handler for the 'offline' event must be added on the initial evaluation of the
    // script, so we create one single event listener here which will forward the event to the socket instances
    addEventListener("offline", ()=>{
        debug("closing %d connection(s) because the network was lost", OFFLINE_EVENT_LISTENERS.length);
        OFFLINE_EVENT_LISTENERS.forEach((listener)=>listener());
    }, false);
}
class SocketWithoutUpgrade extends __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$socket$2e$io$2f$component$2d$emitter$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Emitter"] {
    /**
     * Socket constructor.
     *
     * @param {String|Object} uri - uri or options
     * @param {Object} opts - options
     */ constructor(uri, opts){
        super();
        this.binaryType = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$globals$2e$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultBinaryType"];
        this.writeBuffer = [];
        this._prevBufferLen = 0;
        this._pingInterval = -1;
        this._pingTimeout = -1;
        this._maxPayload = -1;
        /**
         * The expiration timestamp of the {@link _pingTimeoutTimer} object is tracked, in case the timer is throttled and the
         * callback is not fired on time. This can happen for example when a laptop is suspended or when a phone is locked.
         */ this._pingTimeoutTime = Infinity;
        if (uri && "object" === typeof uri) {
            opts = uri;
            uri = null;
        }
        if (uri) {
            const parsedUri = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$contrib$2f$parseuri$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parse"])(uri);
            opts.hostname = parsedUri.host;
            opts.secure = parsedUri.protocol === "https" || parsedUri.protocol === "wss";
            opts.port = parsedUri.port;
            if (parsedUri.query) opts.query = parsedUri.query;
        } else if (opts.host) {
            opts.hostname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$contrib$2f$parseuri$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parse"])(opts.host).host;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$util$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["installTimerFunctions"])(this, opts);
        this.secure = null != opts.secure ? opts.secure : typeof location !== "undefined" && "https:" === location.protocol;
        if (opts.hostname && !opts.port) {
            // if no port is specified manually, use the protocol default
            opts.port = this.secure ? "443" : "80";
        }
        this.hostname = opts.hostname || (typeof location !== "undefined" ? location.hostname : "localhost");
        this.port = opts.port || (typeof location !== "undefined" && location.port ? location.port : this.secure ? "443" : "80");
        this.transports = [];
        this._transportsByName = {};
        opts.transports.forEach((t)=>{
            const transportName = t.prototype.name;
            this.transports.push(transportName);
            this._transportsByName[transportName] = t;
        });
        this.opts = Object.assign({
            path: "/engine.io",
            agent: false,
            withCredentials: false,
            upgrade: true,
            timestampParam: "t",
            rememberUpgrade: false,
            addTrailingSlash: true,
            rejectUnauthorized: true,
            perMessageDeflate: {
                threshold: 1024
            },
            transportOptions: {},
            closeOnBeforeunload: false
        }, opts);
        this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : "");
        if (typeof this.opts.query === "string") {
            this.opts.query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$contrib$2f$parseqs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decode"])(this.opts.query);
        }
        if (withEventListeners) {
            if (this.opts.closeOnBeforeunload) {
                // Firefox closes the connection when the "beforeunload" event is emitted but not Chrome. This event listener
                // ensures every browser behaves the same (no "disconnect" event at the Socket.IO level when the page is
                // closed/reloaded)
                this._beforeunloadEventListener = ()=>{
                    if (this.transport) {
                        // silently close the transport
                        this.transport.removeAllListeners();
                        this.transport.close();
                    }
                };
                addEventListener("beforeunload", this._beforeunloadEventListener, false);
            }
            if (this.hostname !== "localhost") {
                debug("adding listener for the 'offline' event");
                this._offlineEventListener = ()=>{
                    this._onClose("transport close", {
                        description: "network connection lost"
                    });
                };
                OFFLINE_EVENT_LISTENERS.push(this._offlineEventListener);
            }
        }
        if (this.opts.withCredentials) {
            this._cookieJar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$globals$2e$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createCookieJar"])();
        }
        this._open();
    }
    /**
     * Creates transport of the given type.
     *
     * @param {String} name - transport name
     * @return {Transport}
     * @private
     */ createTransport(name) {
        debug('creating transport "%s"', name);
        const query = Object.assign({}, this.opts.query);
        // append engine.io protocol identifier
        query.EIO = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["protocol"];
        // transport name
        query.transport = name;
        // session id if we already have one
        if (this.id) query.sid = this.id;
        const opts = Object.assign({}, this.opts, {
            query,
            socket: this,
            hostname: this.hostname,
            secure: this.secure,
            port: this.port
        }, this.opts.transportOptions[name]);
        debug("options: %j", opts);
        return new this._transportsByName[name](opts);
    }
    /**
     * Initializes transport to use and starts probe.
     *
     * @private
     */ _open() {
        if (this.transports.length === 0) {
            // Emit error on next tick so it can be listened to
            this.setTimeoutFn(()=>{
                this.emitReserved("error", "No transports available");
            }, 0);
            return;
        }
        const transportName = this.opts.rememberUpgrade && SocketWithoutUpgrade.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1 ? "websocket" : this.transports[0];
        this.readyState = "opening";
        const transport = this.createTransport(transportName);
        transport.open();
        this.setTransport(transport);
    }
    /**
     * Sets the current transport. Disables the existing one (if any).
     *
     * @private
     */ setTransport(transport) {
        debug("setting transport %s", transport.name);
        if (this.transport) {
            debug("clearing existing transport %s", this.transport.name);
            this.transport.removeAllListeners();
        }
        // set up transport
        this.transport = transport;
        // set up transport listeners
        transport.on("drain", this._onDrain.bind(this)).on("packet", this._onPacket.bind(this)).on("error", this._onError.bind(this)).on("close", (reason)=>this._onClose("transport close", reason));
    }
    /**
     * Called when connection is deemed open.
     *
     * @private
     */ onOpen() {
        debug("socket open");
        this.readyState = "open";
        SocketWithoutUpgrade.priorWebsocketSuccess = "websocket" === this.transport.name;
        this.emitReserved("open");
        this.flush();
    }
    /**
     * Handles a packet.
     *
     * @private
     */ _onPacket(packet) {
        if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
            debug('socket receive: type "%s", data "%s"', packet.type, packet.data);
            this.emitReserved("packet", packet);
            // Socket is live - any packet counts
            this.emitReserved("heartbeat");
            switch(packet.type){
                case "open":
                    this.onHandshake(JSON.parse(packet.data));
                    break;
                case "ping":
                    this._sendPacket("pong");
                    this.emitReserved("ping");
                    this.emitReserved("pong");
                    this._resetPingTimeout();
                    break;
                case "error":
                    const err = new Error("server error");
                    // @ts-ignore
                    err.code = packet.data;
                    this._onError(err);
                    break;
                case "message":
                    this.emitReserved("data", packet.data);
                    this.emitReserved("message", packet.data);
                    break;
            }
        } else {
            debug('packet received with socket readyState "%s"', this.readyState);
        }
    }
    /**
     * Called upon handshake completion.
     *
     * @param {Object} data - handshake obj
     * @private
     */ onHandshake(data) {
        this.emitReserved("handshake", data);
        this.id = data.sid;
        this.transport.query.sid = data.sid;
        this._pingInterval = data.pingInterval;
        this._pingTimeout = data.pingTimeout;
        this._maxPayload = data.maxPayload;
        this.onOpen();
        // In case open handler closes socket
        if ("closed" === this.readyState) return;
        this._resetPingTimeout();
    }
    /**
     * Sets and resets ping timeout timer based on server pings.
     *
     * @private
     */ _resetPingTimeout() {
        this.clearTimeoutFn(this._pingTimeoutTimer);
        const delay = this._pingInterval + this._pingTimeout;
        this._pingTimeoutTime = Date.now() + delay;
        this._pingTimeoutTimer = this.setTimeoutFn(()=>{
            this._onClose("ping timeout");
        }, delay);
        if (this.opts.autoUnref) {
            this._pingTimeoutTimer.unref();
        }
    }
    /**
     * Called on `drain` event
     *
     * @private
     */ _onDrain() {
        this.writeBuffer.splice(0, this._prevBufferLen);
        // setting prevBufferLen = 0 is very important
        // for example, when upgrading, upgrade packet is sent over,
        // and a nonzero prevBufferLen could cause problems on `drain`
        this._prevBufferLen = 0;
        if (0 === this.writeBuffer.length) {
            this.emitReserved("drain");
        } else {
            this.flush();
        }
    }
    /**
     * Flush write buffers.
     *
     * @private
     */ flush() {
        if ("closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
            const packets = this._getWritablePackets();
            debug("flushing %d packets in socket", packets.length);
            this.transport.send(packets);
            // keep track of current length of writeBuffer
            // splice writeBuffer and callbackBuffer on `drain`
            this._prevBufferLen = packets.length;
            this.emitReserved("flush");
        }
    }
    /**
     * Ensure the encoded size of the writeBuffer is below the maxPayload value sent by the server (only for HTTP
     * long-polling)
     *
     * @private
     */ _getWritablePackets() {
        const shouldCheckPayloadSize = this._maxPayload && this.transport.name === "polling" && this.writeBuffer.length > 1;
        if (!shouldCheckPayloadSize) {
            return this.writeBuffer;
        }
        let payloadSize = 1; // first packet type
        for(let i = 0; i < this.writeBuffer.length; i++){
            const data = this.writeBuffer[i].data;
            if (data) {
                payloadSize += (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$util$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["byteLength"])(data);
            }
            if (i > 0 && payloadSize > this._maxPayload) {
                debug("only send %d out of %d packets", i, this.writeBuffer.length);
                return this.writeBuffer.slice(0, i);
            }
            payloadSize += 2; // separator + packet type
        }
        debug("payload size is %d (max: %d)", payloadSize, this._maxPayload);
        return this.writeBuffer;
    }
    /**
     * Checks whether the heartbeat timer has expired but the socket has not yet been notified.
     *
     * Note: this method is private for now because it does not really fit the WebSocket API, but if we put it in the
     * `write()` method then the message would not be buffered by the Socket.IO client.
     *
     * @return {boolean}
     * @private
     */ /* private */ _hasPingExpired() {
        if (!this._pingTimeoutTime) return true;
        const hasExpired = Date.now() > this._pingTimeoutTime;
        if (hasExpired) {
            debug("throttled timer detected, scheduling connection close");
            this._pingTimeoutTime = 0;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$globals$2e$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nextTick"])(()=>{
                this._onClose("ping timeout");
            }, this.setTimeoutFn);
        }
        return hasExpired;
    }
    /**
     * Sends a message.
     *
     * @param {String} msg - message.
     * @param {Object} options.
     * @param {Function} fn - callback function.
     * @return {Socket} for chaining.
     */ write(msg, options, fn) {
        this._sendPacket("message", msg, options, fn);
        return this;
    }
    /**
     * Sends a message. Alias of {@link Socket#write}.
     *
     * @param {String} msg - message.
     * @param {Object} options.
     * @param {Function} fn - callback function.
     * @return {Socket} for chaining.
     */ send(msg, options, fn) {
        this._sendPacket("message", msg, options, fn);
        return this;
    }
    /**
     * Sends a packet.
     *
     * @param {String} type: packet type.
     * @param {String} data.
     * @param {Object} options.
     * @param {Function} fn - callback function.
     * @private
     */ _sendPacket(type, data, options, fn) {
        if ("function" === typeof data) {
            fn = data;
            data = undefined;
        }
        if ("function" === typeof options) {
            fn = options;
            options = null;
        }
        if ("closing" === this.readyState || "closed" === this.readyState) {
            return;
        }
        options = options || {};
        options.compress = false !== options.compress;
        const packet = {
            type: type,
            data: data,
            options: options
        };
        this.emitReserved("packetCreate", packet);
        this.writeBuffer.push(packet);
        if (fn) this.once("flush", fn);
        this.flush();
    }
    /**
     * Closes the connection.
     */ close() {
        const close = ()=>{
            this._onClose("forced close");
            debug("socket closing - telling transport to close");
            this.transport.close();
        };
        const cleanupAndClose = ()=>{
            this.off("upgrade", cleanupAndClose);
            this.off("upgradeError", cleanupAndClose);
            close();
        };
        const waitForUpgrade = ()=>{
            // wait for upgrade to finish since we can't send packets while pausing a transport
            this.once("upgrade", cleanupAndClose);
            this.once("upgradeError", cleanupAndClose);
        };
        if ("opening" === this.readyState || "open" === this.readyState) {
            this.readyState = "closing";
            if (this.writeBuffer.length) {
                this.once("drain", ()=>{
                    if (this.upgrading) {
                        waitForUpgrade();
                    } else {
                        close();
                    }
                });
            } else if (this.upgrading) {
                waitForUpgrade();
            } else {
                close();
            }
        }
        return this;
    }
    /**
     * Called upon transport error
     *
     * @private
     */ _onError(err) {
        debug("socket error %j", err);
        SocketWithoutUpgrade.priorWebsocketSuccess = false;
        if (this.opts.tryAllTransports && this.transports.length > 1 && this.readyState === "opening") {
            debug("trying next transport");
            this.transports.shift();
            return this._open();
        }
        this.emitReserved("error", err);
        this._onClose("transport error", err);
    }
    /**
     * Called upon transport close.
     *
     * @private
     */ _onClose(reason, description) {
        if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
            debug('socket close with reason: "%s"', reason);
            // clear timers
            this.clearTimeoutFn(this._pingTimeoutTimer);
            // stop event from firing again for transport
            this.transport.removeAllListeners("close");
            // ensure transport won't stay open
            this.transport.close();
            // ignore further transport communication
            this.transport.removeAllListeners();
            if (withEventListeners) {
                if (this._beforeunloadEventListener) {
                    removeEventListener("beforeunload", this._beforeunloadEventListener, false);
                }
                if (this._offlineEventListener) {
                    const i = OFFLINE_EVENT_LISTENERS.indexOf(this._offlineEventListener);
                    if (i !== -1) {
                        debug("removing listener for the 'offline' event");
                        OFFLINE_EVENT_LISTENERS.splice(i, 1);
                    }
                }
            }
            // set ready state
            this.readyState = "closed";
            // clear session id
            this.id = null;
            // emit close event
            this.emitReserved("close", reason, description);
            // clean buffers after, so users can still
            // grab the buffers on `close` event
            this.writeBuffer = [];
            this._prevBufferLen = 0;
        }
    }
}
SocketWithoutUpgrade.protocol = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$parser$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["protocol"];
class SocketWithUpgrade extends SocketWithoutUpgrade {
    constructor(){
        super(...arguments);
        this._upgrades = [];
    }
    onOpen() {
        super.onOpen();
        if ("open" === this.readyState && this.opts.upgrade) {
            debug("starting upgrade probes");
            for(let i = 0; i < this._upgrades.length; i++){
                this._probe(this._upgrades[i]);
            }
        }
    }
    /**
     * Probes a transport.
     *
     * @param {String} name - transport name
     * @private
     */ _probe(name) {
        debug('probing transport "%s"', name);
        let transport = this.createTransport(name);
        let failed = false;
        SocketWithoutUpgrade.priorWebsocketSuccess = false;
        const onTransportOpen = ()=>{
            if (failed) return;
            debug('probe transport "%s" opened', name);
            transport.send([
                {
                    type: "ping",
                    data: "probe"
                }
            ]);
            transport.once("packet", (msg)=>{
                if (failed) return;
                if ("pong" === msg.type && "probe" === msg.data) {
                    debug('probe transport "%s" pong', name);
                    this.upgrading = true;
                    this.emitReserved("upgrading", transport);
                    if (!transport) return;
                    SocketWithoutUpgrade.priorWebsocketSuccess = "websocket" === transport.name;
                    debug('pausing current transport "%s"', this.transport.name);
                    this.transport.pause(()=>{
                        if (failed) return;
                        if ("closed" === this.readyState) return;
                        debug("changing transport and sending upgrade packet");
                        cleanup();
                        this.setTransport(transport);
                        transport.send([
                            {
                                type: "upgrade"
                            }
                        ]);
                        this.emitReserved("upgrade", transport);
                        transport = null;
                        this.upgrading = false;
                        this.flush();
                    });
                } else {
                    debug('probe transport "%s" failed', name);
                    const err = new Error("probe error");
                    // @ts-ignore
                    err.transport = transport.name;
                    this.emitReserved("upgradeError", err);
                }
            });
        };
        function freezeTransport() {
            if (failed) return;
            // Any callback called by transport should be ignored since now
            failed = true;
            cleanup();
            transport.close();
            transport = null;
        }
        // Handle any error that happens while probing
        const onerror = (err)=>{
            const error = new Error("probe error: " + err);
            // @ts-ignore
            error.transport = transport.name;
            freezeTransport();
            debug('probe transport "%s" failed because of error: %s', name, err);
            this.emitReserved("upgradeError", error);
        };
        function onTransportClose() {
            onerror("transport closed");
        }
        // When the socket is closed while we're probing
        function onclose() {
            onerror("socket closed");
        }
        // When the socket is upgraded while we're probing
        function onupgrade(to) {
            if (transport && to.name !== transport.name) {
                debug('"%s" works - aborting "%s"', to.name, transport.name);
                freezeTransport();
            }
        }
        // Remove all listeners on the transport and on self
        const cleanup = ()=>{
            transport.removeListener("open", onTransportOpen);
            transport.removeListener("error", onerror);
            transport.removeListener("close", onTransportClose);
            this.off("close", onclose);
            this.off("upgrading", onupgrade);
        };
        transport.once("open", onTransportOpen);
        transport.once("error", onerror);
        transport.once("close", onTransportClose);
        this.once("close", onclose);
        this.once("upgrading", onupgrade);
        if (this._upgrades.indexOf("webtransport") !== -1 && name !== "webtransport") {
            // favor WebTransport
            this.setTimeoutFn(()=>{
                if (!failed) {
                    transport.open();
                }
            }, 200);
        } else {
            transport.open();
        }
    }
    onHandshake(data) {
        this._upgrades = this._filterUpgrades(data.upgrades);
        super.onHandshake(data);
    }
    /**
     * Filters upgrades, returning only those matching client transports.
     *
     * @param {Array} upgrades - server upgrades
     * @private
     */ _filterUpgrades(upgrades) {
        const filteredUpgrades = [];
        for(let i = 0; i < upgrades.length; i++){
            if (~this.transports.indexOf(upgrades[i])) filteredUpgrades.push(upgrades[i]);
        }
        return filteredUpgrades;
    }
}
class Socket extends SocketWithUpgrade {
    constructor(uri, opts = {}){
        const o = typeof uri === "object" ? uri : opts;
        if (!o.transports || o.transports && typeof o.transports[0] === "string") {
            o.transports = (o.transports || [
                "polling",
                "websocket",
                "webtransport"
            ]).map((transportName)=>__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$transports$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transports"][transportName]).filter((t)=>!!t);
        }
        super(uri, o);
    }
}
}),
"[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/transports/polling-fetch.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "Fetch": ()=>Fetch
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$transports$2f$polling$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/transports/polling.js [app-ssr] (ecmascript)");
;
class Fetch extends __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$transports$2f$polling$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Polling"] {
    doPoll() {
        this._fetch().then((res)=>{
            if (!res.ok) {
                return this.onError("fetch read error", res.status, res);
            }
            res.text().then((data)=>this.onData(data));
        }).catch((err)=>{
            this.onError("fetch read error", err);
        });
    }
    doWrite(data, callback) {
        this._fetch(data).then((res)=>{
            if (!res.ok) {
                return this.onError("fetch write error", res.status, res);
            }
            callback();
        }).catch((err)=>{
            this.onError("fetch write error", err);
        });
    }
    _fetch(data) {
        var _a;
        const isPost = data !== undefined;
        const headers = new Headers(this.opts.extraHeaders);
        if (isPost) {
            headers.set("content-type", "text/plain;charset=UTF-8");
        }
        (_a = this.socket._cookieJar) === null || _a === void 0 ? void 0 : _a.appendCookies(headers);
        return fetch(this.uri(), {
            method: isPost ? "POST" : "GET",
            body: isPost ? data : null,
            headers,
            credentials: this.opts.withCredentials ? "include" : "omit"
        }).then((res)=>{
            var _a;
            // @ts-ignore getSetCookie() was added in Node.js v19.7.0
            (_a = this.socket._cookieJar) === null || _a === void 0 ? void 0 : _a.parseCookies(res.headers.getSetCookie());
            return res;
        });
    }
}
}),
"[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/index.js [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "protocol": ()=>protocol
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$socket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/socket.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$transport$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/transport.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$transports$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/transports/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$util$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/util.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$contrib$2f$parseuri$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/contrib/parseuri.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$globals$2e$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/globals.node.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$transports$2f$polling$2d$fetch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/transports/polling-fetch.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$transports$2f$polling$2d$xhr$2e$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/transports/polling-xhr.node.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$transports$2f$polling$2d$xhr$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/transports/polling-xhr.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$transports$2f$websocket$2e$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/transports/websocket.node.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$transports$2f$websocket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/transports/websocket.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$transports$2f$webtransport$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/transports/webtransport.js [app-ssr] (ecmascript)");
;
;
;
const protocol = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$socket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Socket"].protocol;
;
;
;
;
;
;
;
;
;
;
;
}),
"[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/index.js [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$socket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/socket.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$transport$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/transport.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$transports$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/transports/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$util$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/util.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$contrib$2f$parseuri$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/contrib/parseuri.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$globals$2e$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/globals.node.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$transports$2f$polling$2d$fetch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/transports/polling-fetch.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$transports$2f$polling$2d$xhr$2e$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/transports/polling-xhr.node.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$transports$2f$polling$2d$xhr$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/transports/polling-xhr.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$transports$2f$websocket$2e$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/transports/websocket.node.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$transports$2f$websocket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/transports/websocket.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$transports$2f$webtransport$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/transports/webtransport.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/index.js [app-ssr] (ecmascript) <locals>");
}),
"[project]/p2p-react/node_modules/ms/index.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
/**
 * Helpers.
 */ var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;
/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */ module.exports = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === 'string' && val.length > 0) {
        return parse(val);
    } else if (type === 'number' && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
};
/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */ function parse(str) {
    str = String(str);
    if (str.length > 100) {
        return;
    }
    var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
    if (!match) {
        return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || 'ms').toLowerCase();
    switch(type){
        case 'years':
        case 'year':
        case 'yrs':
        case 'yr':
        case 'y':
            return n * y;
        case 'weeks':
        case 'week':
        case 'w':
            return n * w;
        case 'days':
        case 'day':
        case 'd':
            return n * d;
        case 'hours':
        case 'hour':
        case 'hrs':
        case 'hr':
        case 'h':
            return n * h;
        case 'minutes':
        case 'minute':
        case 'mins':
        case 'min':
        case 'm':
            return n * m;
        case 'seconds':
        case 'second':
        case 'secs':
        case 'sec':
        case 's':
            return n * s;
        case 'milliseconds':
        case 'millisecond':
        case 'msecs':
        case 'msec':
        case 'ms':
            return n;
        default:
            return undefined;
    }
}
/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */ function fmtShort(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
        return Math.round(ms / d) + 'd';
    }
    if (msAbs >= h) {
        return Math.round(ms / h) + 'h';
    }
    if (msAbs >= m) {
        return Math.round(ms / m) + 'm';
    }
    if (msAbs >= s) {
        return Math.round(ms / s) + 's';
    }
    return ms + 'ms';
}
/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */ function fmtLong(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
        return plural(ms, msAbs, d, 'day');
    }
    if (msAbs >= h) {
        return plural(ms, msAbs, h, 'hour');
    }
    if (msAbs >= m) {
        return plural(ms, msAbs, m, 'minute');
    }
    if (msAbs >= s) {
        return plural(ms, msAbs, s, 'second');
    }
    return ms + ' ms';
}
/**
 * Pluralization helper.
 */ function plural(ms, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}
}}),
"[project]/p2p-react/node_modules/engine.io-client/node_modules/debug/src/common.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */ function setup(env) {
    createDebug.debug = createDebug;
    createDebug.default = createDebug;
    createDebug.coerce = coerce;
    createDebug.disable = disable;
    createDebug.enable = enable;
    createDebug.enabled = enabled;
    createDebug.humanize = __turbopack_context__.r("[project]/p2p-react/node_modules/ms/index.js [app-ssr] (ecmascript)");
    createDebug.destroy = destroy;
    Object.keys(env).forEach((key)=>{
        createDebug[key] = env[key];
    });
    /**
	* The currently active debug mode names, and names to skip.
	*/ createDebug.names = [];
    createDebug.skips = [];
    /**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/ createDebug.formatters = {};
    /**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/ function selectColor(namespace) {
        let hash = 0;
        for(let i = 0; i < namespace.length; i++){
            hash = (hash << 5) - hash + namespace.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
    }
    createDebug.selectColor = selectColor;
    /**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/ function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
            // Disabled?
            if (!debug.enabled) {
                return;
            }
            const self = debug;
            // Set `diff` timestamp
            const curr = Number(new Date());
            const ms = curr - (prevTime || curr);
            self.diff = ms;
            self.prev = prevTime;
            self.curr = curr;
            prevTime = curr;
            args[0] = createDebug.coerce(args[0]);
            if (typeof args[0] !== 'string') {
                // Anything else let's inspect with %O
                args.unshift('%O');
            }
            // Apply any `formatters` transformations
            let index = 0;
            args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format)=>{
                // If we encounter an escaped % then don't increase the array index
                if (match === '%%') {
                    return '%';
                }
                index++;
                const formatter = createDebug.formatters[format];
                if (typeof formatter === 'function') {
                    const val = args[index];
                    match = formatter.call(self, val);
                    // Now we need to remove `args[index]` since it's inlined in the `format`
                    args.splice(index, 1);
                    index--;
                }
                return match;
            });
            // Apply env-specific formatting (colors, etc.)
            createDebug.formatArgs.call(self, args);
            const logFn = self.log || createDebug.log;
            logFn.apply(self, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.
        Object.defineProperty(debug, 'enabled', {
            enumerable: true,
            configurable: false,
            get: ()=>{
                if (enableOverride !== null) {
                    return enableOverride;
                }
                if (namespacesCache !== createDebug.namespaces) {
                    namespacesCache = createDebug.namespaces;
                    enabledCache = createDebug.enabled(namespace);
                }
                return enabledCache;
            },
            set: (v)=>{
                enableOverride = v;
            }
        });
        // Env-specific initialization logic for debug instances
        if (typeof createDebug.init === 'function') {
            createDebug.init(debug);
        }
        return debug;
    }
    function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
    }
    /**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/ function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
        const len = split.length;
        for(i = 0; i < len; i++){
            if (!split[i]) {
                continue;
            }
            namespaces = split[i].replace(/\*/g, '.*?');
            if (namespaces[0] === '-') {
                createDebug.skips.push(new RegExp('^' + namespaces.slice(1) + '$'));
            } else {
                createDebug.names.push(new RegExp('^' + namespaces + '$'));
            }
        }
    }
    /**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/ function disable() {
        const namespaces = [
            ...createDebug.names.map(toNamespace),
            ...createDebug.skips.map(toNamespace).map((namespace)=>'-' + namespace)
        ].join(',');
        createDebug.enable('');
        return namespaces;
    }
    /**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/ function enabled(name) {
        if (name[name.length - 1] === '*') {
            return true;
        }
        let i;
        let len;
        for(i = 0, len = createDebug.skips.length; i < len; i++){
            if (createDebug.skips[i].test(name)) {
                return false;
            }
        }
        for(i = 0, len = createDebug.names.length; i < len; i++){
            if (createDebug.names[i].test(name)) {
                return true;
            }
        }
        return false;
    }
    /**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/ function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, '*');
    }
    /**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/ function coerce(val) {
        if (val instanceof Error) {
            return val.stack || val.message;
        }
        return val;
    }
    /**
	* XXX DO NOT USE. This is a temporary stub function.
	* XXX It WILL be removed in the next major release.
	*/ function destroy() {
        console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
    }
    createDebug.enable(createDebug.load());
    return createDebug;
}
module.exports = setup;
}}),
"[project]/p2p-react/node_modules/engine.io-client/node_modules/debug/src/node.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
/**
 * Module dependencies.
 */ const tty = __turbopack_context__.r("[externals]/tty [external] (tty, cjs)");
const util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
/**
 * This is the Node.js implementation of `debug()`.
 */ exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.destroy = util.deprecate(()=>{}, 'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
/**
 * Colors.
 */ exports.colors = [
    6,
    2,
    3,
    4,
    5,
    1
];
try {
    // Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
    // eslint-disable-next-line import/no-extraneous-dependencies
    const supportsColor = __turbopack_context__.r("[project]/p2p-react/node_modules/supports-color/index.js [app-ssr] (ecmascript)");
    if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports.colors = [
            20,
            21,
            26,
            27,
            32,
            33,
            38,
            39,
            40,
            41,
            42,
            43,
            44,
            45,
            56,
            57,
            62,
            63,
            68,
            69,
            74,
            75,
            76,
            77,
            78,
            79,
            80,
            81,
            92,
            93,
            98,
            99,
            112,
            113,
            128,
            129,
            134,
            135,
            148,
            149,
            160,
            161,
            162,
            163,
            164,
            165,
            166,
            167,
            168,
            169,
            170,
            171,
            172,
            173,
            178,
            179,
            184,
            185,
            196,
            197,
            198,
            199,
            200,
            201,
            202,
            203,
            204,
            205,
            206,
            207,
            208,
            209,
            214,
            215,
            220,
            221
        ];
    }
} catch (error) {
// Swallow - we only care if `supports-color` is available; it doesn't have to be.
}
/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */ exports.inspectOpts = Object.keys(process.env).filter((key)=>{
    return /^debug_/i.test(key);
}).reduce((obj, key)=>{
    // Camel-case
    const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k)=>{
        return k.toUpperCase();
    });
    // Coerce string value into JS value
    let val = process.env[key];
    if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
    } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
    } else if (val === 'null') {
        val = null;
    } else {
        val = Number(val);
    }
    obj[prop] = val;
    return obj;
}, {});
/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */ function useColors() {
    return 'colors' in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
}
/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */ function formatArgs(args) {
    const { namespace: name, useColors } = this;
    if (useColors) {
        const c = this.color;
        const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
        const prefix = `  ${colorCode};1m${name} \u001B[0m`;
        args[0] = prefix + args[0].split('\n').join('\n' + prefix);
        args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
    } else {
        args[0] = getDate() + name + ' ' + args[0];
    }
}
function getDate() {
    if (exports.inspectOpts.hideDate) {
        return '';
    }
    return new Date().toISOString() + ' ';
}
/**
 * Invokes `util.formatWithOptions()` with the specified arguments and writes to stderr.
 */ function log(...args) {
    return process.stderr.write(util.formatWithOptions(exports.inspectOpts, ...args) + '\n');
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */ function save(namespaces) {
    if (namespaces) {
        process.env.DEBUG = namespaces;
    } else {
        // If you set a process.env field to null or undefined, it gets cast to the
        // string 'null' or 'undefined'. Just delete instead.
        delete process.env.DEBUG;
    }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */ function load() {
    return process.env.DEBUG;
}
/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */ function init(debug) {
    debug.inspectOpts = {};
    const keys = Object.keys(exports.inspectOpts);
    for(let i = 0; i < keys.length; i++){
        debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
    }
}
module.exports = __turbopack_context__.r("[project]/p2p-react/node_modules/engine.io-client/node_modules/debug/src/common.js [app-ssr] (ecmascript)")(exports);
const { formatters } = module.exports;
/**
 * Map %o to `util.inspect()`, all on a single line.
 */ formatters.o = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts).split('\n').map((str)=>str.trim()).join(' ');
};
/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */ formatters.O = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts);
};
}}),
"[project]/p2p-react/node_modules/engine.io-client/node_modules/debug/src/browser.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
/* eslint-env browser */ /**
 * This is the web browser implementation of `debug()`.
 */ exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
exports.destroy = (()=>{
    let warned = false;
    return ()=>{
        if (!warned) {
            warned = true;
            console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
        }
    };
})();
/**
 * Colors.
 */ exports.colors = [
    '#0000CC',
    '#0000FF',
    '#0033CC',
    '#0033FF',
    '#0066CC',
    '#0066FF',
    '#0099CC',
    '#0099FF',
    '#00CC00',
    '#00CC33',
    '#00CC66',
    '#00CC99',
    '#00CCCC',
    '#00CCFF',
    '#3300CC',
    '#3300FF',
    '#3333CC',
    '#3333FF',
    '#3366CC',
    '#3366FF',
    '#3399CC',
    '#3399FF',
    '#33CC00',
    '#33CC33',
    '#33CC66',
    '#33CC99',
    '#33CCCC',
    '#33CCFF',
    '#6600CC',
    '#6600FF',
    '#6633CC',
    '#6633FF',
    '#66CC00',
    '#66CC33',
    '#9900CC',
    '#9900FF',
    '#9933CC',
    '#9933FF',
    '#99CC00',
    '#99CC33',
    '#CC0000',
    '#CC0033',
    '#CC0066',
    '#CC0099',
    '#CC00CC',
    '#CC00FF',
    '#CC3300',
    '#CC3333',
    '#CC3366',
    '#CC3399',
    '#CC33CC',
    '#CC33FF',
    '#CC6600',
    '#CC6633',
    '#CC9900',
    '#CC9933',
    '#CCCC00',
    '#CCCC33',
    '#FF0000',
    '#FF0033',
    '#FF0066',
    '#FF0099',
    '#FF00CC',
    '#FF00FF',
    '#FF3300',
    '#FF3333',
    '#FF3366',
    '#FF3399',
    '#FF33CC',
    '#FF33FF',
    '#FF6600',
    '#FF6633',
    '#FF9900',
    '#FF9933',
    '#FFCC00',
    '#FFCC33'
];
/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */ // eslint-disable-next-line complexity
function useColors() {
    // NB: In an Electron preload script, document will be defined but not fully
    // initialized. Since we know we're in Chrome, we'll just detect this case
    // explicitly
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    // Internet Explorer and Edge do not support colors.
    if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
    }
    let m;
    // Is webkit? http://stackoverflow.com/a/16459606/376773
    // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
    return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== 'undefined' && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}
/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */ function formatArgs(args) {
    args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);
    if (!this.useColors) {
        return;
    }
    const c = 'color: ' + this.color;
    args.splice(1, 0, c, 'color: inherit');
    // The final "%c" is somewhat tricky, because there could be other
    // arguments passed either before or after the %c, so we need to
    // figure out the correct index to insert the CSS into
    let index = 0;
    let lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, (match)=>{
        if (match === '%%') {
            return;
        }
        index++;
        if (match === '%c') {
            // We only are interested in the *last* %c
            // (the user may have provided their own)
            lastC = index;
        }
    });
    args.splice(lastC, 0, c);
}
/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */ exports.log = console.debug || console.log || (()=>{});
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */ function save(namespaces) {
    try {
        if (namespaces) {
            exports.storage.setItem('debug', namespaces);
        } else {
            exports.storage.removeItem('debug');
        }
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */ function load() {
    let r;
    try {
        r = exports.storage.getItem('debug');
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
    // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
    if (!r && typeof process !== 'undefined' && 'env' in process) {
        r = process.env.DEBUG;
    }
    return r;
}
/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */ function localstorage() {
    try {
        // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
        // The Browser also has localStorage in the global context.
        return localStorage;
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
}
module.exports = __turbopack_context__.r("[project]/p2p-react/node_modules/engine.io-client/node_modules/debug/src/common.js [app-ssr] (ecmascript)")(exports);
const { formatters } = module.exports;
/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */ formatters.j = function(v) {
    try {
        return JSON.stringify(v);
    } catch (error) {
        return '[UnexpectedJSONParseError]: ' + error.message;
    }
};
}}),
"[project]/p2p-react/node_modules/engine.io-client/node_modules/debug/src/index.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */ if (typeof process === 'undefined' || process.type === 'renderer' || ("TURBOPACK compile-time value", false) === true || process.__nwjs) {
    module.exports = __turbopack_context__.r("[project]/p2p-react/node_modules/engine.io-client/node_modules/debug/src/browser.js [app-ssr] (ecmascript)");
} else {
    module.exports = __turbopack_context__.r("[project]/p2p-react/node_modules/engine.io-client/node_modules/debug/src/node.js [app-ssr] (ecmascript)");
}
}}),
"[project]/p2p-react/node_modules/socket.io-client/node_modules/debug/src/common.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */ function setup(env) {
    createDebug.debug = createDebug;
    createDebug.default = createDebug;
    createDebug.coerce = coerce;
    createDebug.disable = disable;
    createDebug.enable = enable;
    createDebug.enabled = enabled;
    createDebug.humanize = __turbopack_context__.r("[project]/p2p-react/node_modules/ms/index.js [app-ssr] (ecmascript)");
    createDebug.destroy = destroy;
    Object.keys(env).forEach((key)=>{
        createDebug[key] = env[key];
    });
    /**
	* The currently active debug mode names, and names to skip.
	*/ createDebug.names = [];
    createDebug.skips = [];
    /**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/ createDebug.formatters = {};
    /**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/ function selectColor(namespace) {
        let hash = 0;
        for(let i = 0; i < namespace.length; i++){
            hash = (hash << 5) - hash + namespace.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
    }
    createDebug.selectColor = selectColor;
    /**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/ function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
            // Disabled?
            if (!debug.enabled) {
                return;
            }
            const self = debug;
            // Set `diff` timestamp
            const curr = Number(new Date());
            const ms = curr - (prevTime || curr);
            self.diff = ms;
            self.prev = prevTime;
            self.curr = curr;
            prevTime = curr;
            args[0] = createDebug.coerce(args[0]);
            if (typeof args[0] !== 'string') {
                // Anything else let's inspect with %O
                args.unshift('%O');
            }
            // Apply any `formatters` transformations
            let index = 0;
            args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format)=>{
                // If we encounter an escaped % then don't increase the array index
                if (match === '%%') {
                    return '%';
                }
                index++;
                const formatter = createDebug.formatters[format];
                if (typeof formatter === 'function') {
                    const val = args[index];
                    match = formatter.call(self, val);
                    // Now we need to remove `args[index]` since it's inlined in the `format`
                    args.splice(index, 1);
                    index--;
                }
                return match;
            });
            // Apply env-specific formatting (colors, etc.)
            createDebug.formatArgs.call(self, args);
            const logFn = self.log || createDebug.log;
            logFn.apply(self, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.
        Object.defineProperty(debug, 'enabled', {
            enumerable: true,
            configurable: false,
            get: ()=>{
                if (enableOverride !== null) {
                    return enableOverride;
                }
                if (namespacesCache !== createDebug.namespaces) {
                    namespacesCache = createDebug.namespaces;
                    enabledCache = createDebug.enabled(namespace);
                }
                return enabledCache;
            },
            set: (v)=>{
                enableOverride = v;
            }
        });
        // Env-specific initialization logic for debug instances
        if (typeof createDebug.init === 'function') {
            createDebug.init(debug);
        }
        return debug;
    }
    function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
    }
    /**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/ function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
        const len = split.length;
        for(i = 0; i < len; i++){
            if (!split[i]) {
                continue;
            }
            namespaces = split[i].replace(/\*/g, '.*?');
            if (namespaces[0] === '-') {
                createDebug.skips.push(new RegExp('^' + namespaces.slice(1) + '$'));
            } else {
                createDebug.names.push(new RegExp('^' + namespaces + '$'));
            }
        }
    }
    /**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/ function disable() {
        const namespaces = [
            ...createDebug.names.map(toNamespace),
            ...createDebug.skips.map(toNamespace).map((namespace)=>'-' + namespace)
        ].join(',');
        createDebug.enable('');
        return namespaces;
    }
    /**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/ function enabled(name) {
        if (name[name.length - 1] === '*') {
            return true;
        }
        let i;
        let len;
        for(i = 0, len = createDebug.skips.length; i < len; i++){
            if (createDebug.skips[i].test(name)) {
                return false;
            }
        }
        for(i = 0, len = createDebug.names.length; i < len; i++){
            if (createDebug.names[i].test(name)) {
                return true;
            }
        }
        return false;
    }
    /**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/ function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, '*');
    }
    /**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/ function coerce(val) {
        if (val instanceof Error) {
            return val.stack || val.message;
        }
        return val;
    }
    /**
	* XXX DO NOT USE. This is a temporary stub function.
	* XXX It WILL be removed in the next major release.
	*/ function destroy() {
        console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
    }
    createDebug.enable(createDebug.load());
    return createDebug;
}
module.exports = setup;
}}),
"[project]/p2p-react/node_modules/socket.io-client/node_modules/debug/src/node.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
/**
 * Module dependencies.
 */ const tty = __turbopack_context__.r("[externals]/tty [external] (tty, cjs)");
const util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
/**
 * This is the Node.js implementation of `debug()`.
 */ exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.destroy = util.deprecate(()=>{}, 'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
/**
 * Colors.
 */ exports.colors = [
    6,
    2,
    3,
    4,
    5,
    1
];
try {
    // Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
    // eslint-disable-next-line import/no-extraneous-dependencies
    const supportsColor = __turbopack_context__.r("[project]/p2p-react/node_modules/supports-color/index.js [app-ssr] (ecmascript)");
    if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports.colors = [
            20,
            21,
            26,
            27,
            32,
            33,
            38,
            39,
            40,
            41,
            42,
            43,
            44,
            45,
            56,
            57,
            62,
            63,
            68,
            69,
            74,
            75,
            76,
            77,
            78,
            79,
            80,
            81,
            92,
            93,
            98,
            99,
            112,
            113,
            128,
            129,
            134,
            135,
            148,
            149,
            160,
            161,
            162,
            163,
            164,
            165,
            166,
            167,
            168,
            169,
            170,
            171,
            172,
            173,
            178,
            179,
            184,
            185,
            196,
            197,
            198,
            199,
            200,
            201,
            202,
            203,
            204,
            205,
            206,
            207,
            208,
            209,
            214,
            215,
            220,
            221
        ];
    }
} catch (error) {
// Swallow - we only care if `supports-color` is available; it doesn't have to be.
}
/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */ exports.inspectOpts = Object.keys(process.env).filter((key)=>{
    return /^debug_/i.test(key);
}).reduce((obj, key)=>{
    // Camel-case
    const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k)=>{
        return k.toUpperCase();
    });
    // Coerce string value into JS value
    let val = process.env[key];
    if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
    } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
    } else if (val === 'null') {
        val = null;
    } else {
        val = Number(val);
    }
    obj[prop] = val;
    return obj;
}, {});
/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */ function useColors() {
    return 'colors' in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
}
/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */ function formatArgs(args) {
    const { namespace: name, useColors } = this;
    if (useColors) {
        const c = this.color;
        const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
        const prefix = `  ${colorCode};1m${name} \u001B[0m`;
        args[0] = prefix + args[0].split('\n').join('\n' + prefix);
        args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
    } else {
        args[0] = getDate() + name + ' ' + args[0];
    }
}
function getDate() {
    if (exports.inspectOpts.hideDate) {
        return '';
    }
    return new Date().toISOString() + ' ';
}
/**
 * Invokes `util.formatWithOptions()` with the specified arguments and writes to stderr.
 */ function log(...args) {
    return process.stderr.write(util.formatWithOptions(exports.inspectOpts, ...args) + '\n');
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */ function save(namespaces) {
    if (namespaces) {
        process.env.DEBUG = namespaces;
    } else {
        // If you set a process.env field to null or undefined, it gets cast to the
        // string 'null' or 'undefined'. Just delete instead.
        delete process.env.DEBUG;
    }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */ function load() {
    return process.env.DEBUG;
}
/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */ function init(debug) {
    debug.inspectOpts = {};
    const keys = Object.keys(exports.inspectOpts);
    for(let i = 0; i < keys.length; i++){
        debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
    }
}
module.exports = __turbopack_context__.r("[project]/p2p-react/node_modules/socket.io-client/node_modules/debug/src/common.js [app-ssr] (ecmascript)")(exports);
const { formatters } = module.exports;
/**
 * Map %o to `util.inspect()`, all on a single line.
 */ formatters.o = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts).split('\n').map((str)=>str.trim()).join(' ');
};
/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */ formatters.O = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts);
};
}}),
"[project]/p2p-react/node_modules/socket.io-client/node_modules/debug/src/browser.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
/* eslint-env browser */ /**
 * This is the web browser implementation of `debug()`.
 */ exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
exports.destroy = (()=>{
    let warned = false;
    return ()=>{
        if (!warned) {
            warned = true;
            console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
        }
    };
})();
/**
 * Colors.
 */ exports.colors = [
    '#0000CC',
    '#0000FF',
    '#0033CC',
    '#0033FF',
    '#0066CC',
    '#0066FF',
    '#0099CC',
    '#0099FF',
    '#00CC00',
    '#00CC33',
    '#00CC66',
    '#00CC99',
    '#00CCCC',
    '#00CCFF',
    '#3300CC',
    '#3300FF',
    '#3333CC',
    '#3333FF',
    '#3366CC',
    '#3366FF',
    '#3399CC',
    '#3399FF',
    '#33CC00',
    '#33CC33',
    '#33CC66',
    '#33CC99',
    '#33CCCC',
    '#33CCFF',
    '#6600CC',
    '#6600FF',
    '#6633CC',
    '#6633FF',
    '#66CC00',
    '#66CC33',
    '#9900CC',
    '#9900FF',
    '#9933CC',
    '#9933FF',
    '#99CC00',
    '#99CC33',
    '#CC0000',
    '#CC0033',
    '#CC0066',
    '#CC0099',
    '#CC00CC',
    '#CC00FF',
    '#CC3300',
    '#CC3333',
    '#CC3366',
    '#CC3399',
    '#CC33CC',
    '#CC33FF',
    '#CC6600',
    '#CC6633',
    '#CC9900',
    '#CC9933',
    '#CCCC00',
    '#CCCC33',
    '#FF0000',
    '#FF0033',
    '#FF0066',
    '#FF0099',
    '#FF00CC',
    '#FF00FF',
    '#FF3300',
    '#FF3333',
    '#FF3366',
    '#FF3399',
    '#FF33CC',
    '#FF33FF',
    '#FF6600',
    '#FF6633',
    '#FF9900',
    '#FF9933',
    '#FFCC00',
    '#FFCC33'
];
/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */ // eslint-disable-next-line complexity
function useColors() {
    // NB: In an Electron preload script, document will be defined but not fully
    // initialized. Since we know we're in Chrome, we'll just detect this case
    // explicitly
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    // Internet Explorer and Edge do not support colors.
    if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
    }
    let m;
    // Is webkit? http://stackoverflow.com/a/16459606/376773
    // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
    return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== 'undefined' && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}
/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */ function formatArgs(args) {
    args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);
    if (!this.useColors) {
        return;
    }
    const c = 'color: ' + this.color;
    args.splice(1, 0, c, 'color: inherit');
    // The final "%c" is somewhat tricky, because there could be other
    // arguments passed either before or after the %c, so we need to
    // figure out the correct index to insert the CSS into
    let index = 0;
    let lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, (match)=>{
        if (match === '%%') {
            return;
        }
        index++;
        if (match === '%c') {
            // We only are interested in the *last* %c
            // (the user may have provided their own)
            lastC = index;
        }
    });
    args.splice(lastC, 0, c);
}
/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */ exports.log = console.debug || console.log || (()=>{});
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */ function save(namespaces) {
    try {
        if (namespaces) {
            exports.storage.setItem('debug', namespaces);
        } else {
            exports.storage.removeItem('debug');
        }
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */ function load() {
    let r;
    try {
        r = exports.storage.getItem('debug');
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
    // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
    if (!r && typeof process !== 'undefined' && 'env' in process) {
        r = process.env.DEBUG;
    }
    return r;
}
/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */ function localstorage() {
    try {
        // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
        // The Browser also has localStorage in the global context.
        return localStorage;
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
}
module.exports = __turbopack_context__.r("[project]/p2p-react/node_modules/socket.io-client/node_modules/debug/src/common.js [app-ssr] (ecmascript)")(exports);
const { formatters } = module.exports;
/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */ formatters.j = function(v) {
    try {
        return JSON.stringify(v);
    } catch (error) {
        return '[UnexpectedJSONParseError]: ' + error.message;
    }
};
}}),
"[project]/p2p-react/node_modules/socket.io-client/node_modules/debug/src/index.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */ if (typeof process === 'undefined' || process.type === 'renderer' || ("TURBOPACK compile-time value", false) === true || process.__nwjs) {
    module.exports = __turbopack_context__.r("[project]/p2p-react/node_modules/socket.io-client/node_modules/debug/src/browser.js [app-ssr] (ecmascript)");
} else {
    module.exports = __turbopack_context__.r("[project]/p2p-react/node_modules/socket.io-client/node_modules/debug/src/node.js [app-ssr] (ecmascript)");
}
}}),
"[project]/p2p-react/node_modules/socket.io-parser/node_modules/debug/src/common.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */ function setup(env) {
    createDebug.debug = createDebug;
    createDebug.default = createDebug;
    createDebug.coerce = coerce;
    createDebug.disable = disable;
    createDebug.enable = enable;
    createDebug.enabled = enabled;
    createDebug.humanize = __turbopack_context__.r("[project]/p2p-react/node_modules/ms/index.js [app-ssr] (ecmascript)");
    createDebug.destroy = destroy;
    Object.keys(env).forEach((key)=>{
        createDebug[key] = env[key];
    });
    /**
	* The currently active debug mode names, and names to skip.
	*/ createDebug.names = [];
    createDebug.skips = [];
    /**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/ createDebug.formatters = {};
    /**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/ function selectColor(namespace) {
        let hash = 0;
        for(let i = 0; i < namespace.length; i++){
            hash = (hash << 5) - hash + namespace.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
    }
    createDebug.selectColor = selectColor;
    /**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/ function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
            // Disabled?
            if (!debug.enabled) {
                return;
            }
            const self = debug;
            // Set `diff` timestamp
            const curr = Number(new Date());
            const ms = curr - (prevTime || curr);
            self.diff = ms;
            self.prev = prevTime;
            self.curr = curr;
            prevTime = curr;
            args[0] = createDebug.coerce(args[0]);
            if (typeof args[0] !== 'string') {
                // Anything else let's inspect with %O
                args.unshift('%O');
            }
            // Apply any `formatters` transformations
            let index = 0;
            args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format)=>{
                // If we encounter an escaped % then don't increase the array index
                if (match === '%%') {
                    return '%';
                }
                index++;
                const formatter = createDebug.formatters[format];
                if (typeof formatter === 'function') {
                    const val = args[index];
                    match = formatter.call(self, val);
                    // Now we need to remove `args[index]` since it's inlined in the `format`
                    args.splice(index, 1);
                    index--;
                }
                return match;
            });
            // Apply env-specific formatting (colors, etc.)
            createDebug.formatArgs.call(self, args);
            const logFn = self.log || createDebug.log;
            logFn.apply(self, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.
        Object.defineProperty(debug, 'enabled', {
            enumerable: true,
            configurable: false,
            get: ()=>{
                if (enableOverride !== null) {
                    return enableOverride;
                }
                if (namespacesCache !== createDebug.namespaces) {
                    namespacesCache = createDebug.namespaces;
                    enabledCache = createDebug.enabled(namespace);
                }
                return enabledCache;
            },
            set: (v)=>{
                enableOverride = v;
            }
        });
        // Env-specific initialization logic for debug instances
        if (typeof createDebug.init === 'function') {
            createDebug.init(debug);
        }
        return debug;
    }
    function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
    }
    /**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/ function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
        const len = split.length;
        for(i = 0; i < len; i++){
            if (!split[i]) {
                continue;
            }
            namespaces = split[i].replace(/\*/g, '.*?');
            if (namespaces[0] === '-') {
                createDebug.skips.push(new RegExp('^' + namespaces.slice(1) + '$'));
            } else {
                createDebug.names.push(new RegExp('^' + namespaces + '$'));
            }
        }
    }
    /**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/ function disable() {
        const namespaces = [
            ...createDebug.names.map(toNamespace),
            ...createDebug.skips.map(toNamespace).map((namespace)=>'-' + namespace)
        ].join(',');
        createDebug.enable('');
        return namespaces;
    }
    /**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/ function enabled(name) {
        if (name[name.length - 1] === '*') {
            return true;
        }
        let i;
        let len;
        for(i = 0, len = createDebug.skips.length; i < len; i++){
            if (createDebug.skips[i].test(name)) {
                return false;
            }
        }
        for(i = 0, len = createDebug.names.length; i < len; i++){
            if (createDebug.names[i].test(name)) {
                return true;
            }
        }
        return false;
    }
    /**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/ function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, '*');
    }
    /**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/ function coerce(val) {
        if (val instanceof Error) {
            return val.stack || val.message;
        }
        return val;
    }
    /**
	* XXX DO NOT USE. This is a temporary stub function.
	* XXX It WILL be removed in the next major release.
	*/ function destroy() {
        console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
    }
    createDebug.enable(createDebug.load());
    return createDebug;
}
module.exports = setup;
}}),
"[project]/p2p-react/node_modules/socket.io-parser/node_modules/debug/src/node.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
/**
 * Module dependencies.
 */ const tty = __turbopack_context__.r("[externals]/tty [external] (tty, cjs)");
const util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
/**
 * This is the Node.js implementation of `debug()`.
 */ exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.destroy = util.deprecate(()=>{}, 'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
/**
 * Colors.
 */ exports.colors = [
    6,
    2,
    3,
    4,
    5,
    1
];
try {
    // Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
    // eslint-disable-next-line import/no-extraneous-dependencies
    const supportsColor = __turbopack_context__.r("[project]/p2p-react/node_modules/supports-color/index.js [app-ssr] (ecmascript)");
    if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports.colors = [
            20,
            21,
            26,
            27,
            32,
            33,
            38,
            39,
            40,
            41,
            42,
            43,
            44,
            45,
            56,
            57,
            62,
            63,
            68,
            69,
            74,
            75,
            76,
            77,
            78,
            79,
            80,
            81,
            92,
            93,
            98,
            99,
            112,
            113,
            128,
            129,
            134,
            135,
            148,
            149,
            160,
            161,
            162,
            163,
            164,
            165,
            166,
            167,
            168,
            169,
            170,
            171,
            172,
            173,
            178,
            179,
            184,
            185,
            196,
            197,
            198,
            199,
            200,
            201,
            202,
            203,
            204,
            205,
            206,
            207,
            208,
            209,
            214,
            215,
            220,
            221
        ];
    }
} catch (error) {
// Swallow - we only care if `supports-color` is available; it doesn't have to be.
}
/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */ exports.inspectOpts = Object.keys(process.env).filter((key)=>{
    return /^debug_/i.test(key);
}).reduce((obj, key)=>{
    // Camel-case
    const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k)=>{
        return k.toUpperCase();
    });
    // Coerce string value into JS value
    let val = process.env[key];
    if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
    } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
    } else if (val === 'null') {
        val = null;
    } else {
        val = Number(val);
    }
    obj[prop] = val;
    return obj;
}, {});
/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */ function useColors() {
    return 'colors' in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
}
/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */ function formatArgs(args) {
    const { namespace: name, useColors } = this;
    if (useColors) {
        const c = this.color;
        const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
        const prefix = `  ${colorCode};1m${name} \u001B[0m`;
        args[0] = prefix + args[0].split('\n').join('\n' + prefix);
        args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
    } else {
        args[0] = getDate() + name + ' ' + args[0];
    }
}
function getDate() {
    if (exports.inspectOpts.hideDate) {
        return '';
    }
    return new Date().toISOString() + ' ';
}
/**
 * Invokes `util.formatWithOptions()` with the specified arguments and writes to stderr.
 */ function log(...args) {
    return process.stderr.write(util.formatWithOptions(exports.inspectOpts, ...args) + '\n');
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */ function save(namespaces) {
    if (namespaces) {
        process.env.DEBUG = namespaces;
    } else {
        // If you set a process.env field to null or undefined, it gets cast to the
        // string 'null' or 'undefined'. Just delete instead.
        delete process.env.DEBUG;
    }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */ function load() {
    return process.env.DEBUG;
}
/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */ function init(debug) {
    debug.inspectOpts = {};
    const keys = Object.keys(exports.inspectOpts);
    for(let i = 0; i < keys.length; i++){
        debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
    }
}
module.exports = __turbopack_context__.r("[project]/p2p-react/node_modules/socket.io-parser/node_modules/debug/src/common.js [app-ssr] (ecmascript)")(exports);
const { formatters } = module.exports;
/**
 * Map %o to `util.inspect()`, all on a single line.
 */ formatters.o = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts).split('\n').map((str)=>str.trim()).join(' ');
};
/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */ formatters.O = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts);
};
}}),
"[project]/p2p-react/node_modules/socket.io-parser/node_modules/debug/src/browser.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
/* eslint-env browser */ /**
 * This is the web browser implementation of `debug()`.
 */ exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
exports.destroy = (()=>{
    let warned = false;
    return ()=>{
        if (!warned) {
            warned = true;
            console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
        }
    };
})();
/**
 * Colors.
 */ exports.colors = [
    '#0000CC',
    '#0000FF',
    '#0033CC',
    '#0033FF',
    '#0066CC',
    '#0066FF',
    '#0099CC',
    '#0099FF',
    '#00CC00',
    '#00CC33',
    '#00CC66',
    '#00CC99',
    '#00CCCC',
    '#00CCFF',
    '#3300CC',
    '#3300FF',
    '#3333CC',
    '#3333FF',
    '#3366CC',
    '#3366FF',
    '#3399CC',
    '#3399FF',
    '#33CC00',
    '#33CC33',
    '#33CC66',
    '#33CC99',
    '#33CCCC',
    '#33CCFF',
    '#6600CC',
    '#6600FF',
    '#6633CC',
    '#6633FF',
    '#66CC00',
    '#66CC33',
    '#9900CC',
    '#9900FF',
    '#9933CC',
    '#9933FF',
    '#99CC00',
    '#99CC33',
    '#CC0000',
    '#CC0033',
    '#CC0066',
    '#CC0099',
    '#CC00CC',
    '#CC00FF',
    '#CC3300',
    '#CC3333',
    '#CC3366',
    '#CC3399',
    '#CC33CC',
    '#CC33FF',
    '#CC6600',
    '#CC6633',
    '#CC9900',
    '#CC9933',
    '#CCCC00',
    '#CCCC33',
    '#FF0000',
    '#FF0033',
    '#FF0066',
    '#FF0099',
    '#FF00CC',
    '#FF00FF',
    '#FF3300',
    '#FF3333',
    '#FF3366',
    '#FF3399',
    '#FF33CC',
    '#FF33FF',
    '#FF6600',
    '#FF6633',
    '#FF9900',
    '#FF9933',
    '#FFCC00',
    '#FFCC33'
];
/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */ // eslint-disable-next-line complexity
function useColors() {
    // NB: In an Electron preload script, document will be defined but not fully
    // initialized. Since we know we're in Chrome, we'll just detect this case
    // explicitly
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    // Internet Explorer and Edge do not support colors.
    if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
    }
    let m;
    // Is webkit? http://stackoverflow.com/a/16459606/376773
    // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
    return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== 'undefined' && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}
/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */ function formatArgs(args) {
    args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);
    if (!this.useColors) {
        return;
    }
    const c = 'color: ' + this.color;
    args.splice(1, 0, c, 'color: inherit');
    // The final "%c" is somewhat tricky, because there could be other
    // arguments passed either before or after the %c, so we need to
    // figure out the correct index to insert the CSS into
    let index = 0;
    let lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, (match)=>{
        if (match === '%%') {
            return;
        }
        index++;
        if (match === '%c') {
            // We only are interested in the *last* %c
            // (the user may have provided their own)
            lastC = index;
        }
    });
    args.splice(lastC, 0, c);
}
/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */ exports.log = console.debug || console.log || (()=>{});
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */ function save(namespaces) {
    try {
        if (namespaces) {
            exports.storage.setItem('debug', namespaces);
        } else {
            exports.storage.removeItem('debug');
        }
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */ function load() {
    let r;
    try {
        r = exports.storage.getItem('debug');
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
    // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
    if (!r && typeof process !== 'undefined' && 'env' in process) {
        r = process.env.DEBUG;
    }
    return r;
}
/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */ function localstorage() {
    try {
        // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
        // The Browser also has localStorage in the global context.
        return localStorage;
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
}
module.exports = __turbopack_context__.r("[project]/p2p-react/node_modules/socket.io-parser/node_modules/debug/src/common.js [app-ssr] (ecmascript)")(exports);
const { formatters } = module.exports;
/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */ formatters.j = function(v) {
    try {
        return JSON.stringify(v);
    } catch (error) {
        return '[UnexpectedJSONParseError]: ' + error.message;
    }
};
}}),
"[project]/p2p-react/node_modules/socket.io-parser/node_modules/debug/src/index.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */ if (typeof process === 'undefined' || process.type === 'renderer' || ("TURBOPACK compile-time value", false) === true || process.__nwjs) {
    module.exports = __turbopack_context__.r("[project]/p2p-react/node_modules/socket.io-parser/node_modules/debug/src/browser.js [app-ssr] (ecmascript)");
} else {
    module.exports = __turbopack_context__.r("[project]/p2p-react/node_modules/socket.io-parser/node_modules/debug/src/node.js [app-ssr] (ecmascript)");
}
}}),
"[project]/p2p-react/node_modules/has-flag/index.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
module.exports = (flag, argv = process.argv)=>{
    const prefix = flag.startsWith('-') ? '' : flag.length === 1 ? '-' : '--';
    const position = argv.indexOf(prefix + flag);
    const terminatorPosition = argv.indexOf('--');
    return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
};
}}),
"[project]/p2p-react/node_modules/supports-color/index.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
const os = __turbopack_context__.r("[externals]/os [external] (os, cjs)");
const tty = __turbopack_context__.r("[externals]/tty [external] (tty, cjs)");
const hasFlag = __turbopack_context__.r("[project]/p2p-react/node_modules/has-flag/index.js [app-ssr] (ecmascript)");
const { env } = process;
let forceColor;
if (hasFlag('no-color') || hasFlag('no-colors') || hasFlag('color=false') || hasFlag('color=never')) {
    forceColor = 0;
} else if (hasFlag('color') || hasFlag('colors') || hasFlag('color=true') || hasFlag('color=always')) {
    forceColor = 1;
}
if ('FORCE_COLOR' in env) {
    if (env.FORCE_COLOR === 'true') {
        forceColor = 1;
    } else if (env.FORCE_COLOR === 'false') {
        forceColor = 0;
    } else {
        forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
    }
}
function translateLevel(level) {
    if (level === 0) {
        return false;
    }
    return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
    };
}
function supportsColor(haveStream, streamIsTTY) {
    if (forceColor === 0) {
        return 0;
    }
    if (hasFlag('color=16m') || hasFlag('color=full') || hasFlag('color=truecolor')) {
        return 3;
    }
    if (hasFlag('color=256')) {
        return 2;
    }
    if (haveStream && !streamIsTTY && forceColor === undefined) {
        return 0;
    }
    const min = forceColor || 0;
    if (env.TERM === 'dumb') {
        return min;
    }
    if ("TURBOPACK compile-time truthy", 1) {
        // Windows 10 build 10586 is the first Windows release that supports 256 colors.
        // Windows 10 build 14931 is the first release that supports 16m/TrueColor.
        const osRelease = os.release().split('.');
        if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
            return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
    }
    //TURBOPACK unreachable
    ;
}
function getSupportLevel(stream) {
    const level = supportsColor(stream, stream && stream.isTTY);
    return translateLevel(level);
}
module.exports = {
    supportsColor: getSupportLevel,
    stdout: translateLevel(supportsColor(true, tty.isatty(1))),
    stderr: translateLevel(supportsColor(true, tty.isatty(2)))
};
}}),
"[project]/p2p-react/node_modules/socket.io-client/build/esm-debug/url.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "url": ()=>url
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$contrib$2f$parseuri$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/contrib/parseuri.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$client$2f$node_modules$2f$debug$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/socket.io-client/node_modules/debug/src/index.js [app-ssr] (ecmascript)"); // debug()
;
;
const debug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$client$2f$node_modules$2f$debug$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("socket.io-client:url"); // debug()
function url(uri, path = "", loc) {
    let obj = uri;
    // default to window.location
    loc = loc || typeof location !== "undefined" && location;
    if (null == uri) uri = loc.protocol + "//" + loc.host;
    // relative path support
    if (typeof uri === "string") {
        if ("/" === uri.charAt(0)) {
            if ("/" === uri.charAt(1)) {
                uri = loc.protocol + uri;
            } else {
                uri = loc.host + uri;
            }
        }
        if (!/^(https?|wss?):\/\//.test(uri)) {
            debug("protocol-less url %s", uri);
            if ("undefined" !== typeof loc) {
                uri = loc.protocol + "//" + uri;
            } else {
                uri = "https://" + uri;
            }
        }
        // parse
        debug("parse %s", uri);
        obj = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$contrib$2f$parseuri$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parse"])(uri);
    }
    // make sure we treat `localhost:80` and `localhost` equally
    if (!obj.port) {
        if (/^(http|ws)$/.test(obj.protocol)) {
            obj.port = "80";
        } else if (/^(http|ws)s$/.test(obj.protocol)) {
            obj.port = "443";
        }
    }
    obj.path = obj.path || "/";
    const ipv6 = obj.host.indexOf(":") !== -1;
    const host = ipv6 ? "[" + obj.host + "]" : obj.host;
    // define unique id
    obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
    // define href
    obj.href = obj.protocol + "://" + host + (loc && loc.port === obj.port ? "" : ":" + obj.port);
    return obj;
}
}),
"[project]/p2p-react/node_modules/socket.io-client/build/esm-debug/on.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "on": ()=>on
});
function on(obj, ev, fn) {
    obj.on(ev, fn);
    return function subDestroy() {
        obj.off(ev, fn);
    };
}
}),
"[project]/p2p-react/node_modules/socket.io-client/build/esm-debug/socket.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "Socket": ()=>Socket
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/socket.io-parser/build/esm-debug/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$on$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/socket.io-client/build/esm-debug/on.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$socket$2e$io$2f$component$2d$emitter$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/@socket.io/component-emitter/lib/esm/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$client$2f$node_modules$2f$debug$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/socket.io-client/node_modules/debug/src/index.js [app-ssr] (ecmascript)"); // debug()
;
;
;
;
const debug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$client$2f$node_modules$2f$debug$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("socket.io-client:socket"); // debug()
/**
 * Internal events.
 * These events can't be emitted by the user.
 */ const RESERVED_EVENTS = Object.freeze({
    connect: 1,
    connect_error: 1,
    disconnect: 1,
    disconnecting: 1,
    // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
    newListener: 1,
    removeListener: 1
});
class Socket extends __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$socket$2e$io$2f$component$2d$emitter$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Emitter"] {
    /**
     * `Socket` constructor.
     */ constructor(io, nsp, opts){
        super();
        /**
         * Whether the socket is currently connected to the server.
         *
         * @example
         * const socket = io();
         *
         * socket.on("connect", () => {
         *   console.log(socket.connected); // true
         * });
         *
         * socket.on("disconnect", () => {
         *   console.log(socket.connected); // false
         * });
         */ this.connected = false;
        /**
         * Whether the connection state was recovered after a temporary disconnection. In that case, any missed packets will
         * be transmitted by the server.
         */ this.recovered = false;
        /**
         * Buffer for packets received before the CONNECT packet
         */ this.receiveBuffer = [];
        /**
         * Buffer for packets that will be sent once the socket is connected
         */ this.sendBuffer = [];
        /**
         * The queue of packets to be sent with retry in case of failure.
         *
         * Packets are sent one by one, each waiting for the server acknowledgement, in order to guarantee the delivery order.
         * @private
         */ this._queue = [];
        /**
         * A sequence to generate the ID of the {@link QueuedPacket}.
         * @private
         */ this._queueSeq = 0;
        this.ids = 0;
        /**
         * A map containing acknowledgement handlers.
         *
         * The `withError` attribute is used to differentiate handlers that accept an error as first argument:
         *
         * - `socket.emit("test", (err, value) => { ... })` with `ackTimeout` option
         * - `socket.timeout(5000).emit("test", (err, value) => { ... })`
         * - `const value = await socket.emitWithAck("test")`
         *
         * From those that don't:
         *
         * - `socket.emit("test", (value) => { ... });`
         *
         * In the first case, the handlers will be called with an error when:
         *
         * - the timeout is reached
         * - the socket gets disconnected
         *
         * In the second case, the handlers will be simply discarded upon disconnection, since the client will never receive
         * an acknowledgement from the server.
         *
         * @private
         */ this.acks = {};
        this.flags = {};
        this.io = io;
        this.nsp = nsp;
        if (opts && opts.auth) {
            this.auth = opts.auth;
        }
        this._opts = Object.assign({}, opts);
        if (this.io._autoConnect) this.open();
    }
    /**
     * Whether the socket is currently disconnected
     *
     * @example
     * const socket = io();
     *
     * socket.on("connect", () => {
     *   console.log(socket.disconnected); // false
     * });
     *
     * socket.on("disconnect", () => {
     *   console.log(socket.disconnected); // true
     * });
     */ get disconnected() {
        return !this.connected;
    }
    /**
     * Subscribe to open, close and packet events
     *
     * @private
     */ subEvents() {
        if (this.subs) return;
        const io = this.io;
        this.subs = [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$on$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["on"])(io, "open", this.onopen.bind(this)),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$on$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["on"])(io, "packet", this.onpacket.bind(this)),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$on$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["on"])(io, "error", this.onerror.bind(this)),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$on$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["on"])(io, "close", this.onclose.bind(this))
        ];
    }
    /**
     * Whether the Socket will try to reconnect when its Manager connects or reconnects.
     *
     * @example
     * const socket = io();
     *
     * console.log(socket.active); // true
     *
     * socket.on("disconnect", (reason) => {
     *   if (reason === "io server disconnect") {
     *     // the disconnection was initiated by the server, you need to manually reconnect
     *     console.log(socket.active); // false
     *   }
     *   // else the socket will automatically try to reconnect
     *   console.log(socket.active); // true
     * });
     */ get active() {
        return !!this.subs;
    }
    /**
     * "Opens" the socket.
     *
     * @example
     * const socket = io({
     *   autoConnect: false
     * });
     *
     * socket.connect();
     */ connect() {
        if (this.connected) return this;
        this.subEvents();
        if (!this.io["_reconnecting"]) this.io.open(); // ensure open
        if ("open" === this.io._readyState) this.onopen();
        return this;
    }
    /**
     * Alias for {@link connect()}.
     */ open() {
        return this.connect();
    }
    /**
     * Sends a `message` event.
     *
     * This method mimics the WebSocket.send() method.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
     *
     * @example
     * socket.send("hello");
     *
     * // this is equivalent to
     * socket.emit("message", "hello");
     *
     * @return self
     */ send(...args) {
        args.unshift("message");
        this.emit.apply(this, args);
        return this;
    }
    /**
     * Override `emit`.
     * If the event is in `events`, it's emitted normally.
     *
     * @example
     * socket.emit("hello", "world");
     *
     * // all serializable datastructures are supported (no need to call JSON.stringify)
     * socket.emit("hello", 1, "2", { 3: ["4"], 5: Uint8Array.from([6]) });
     *
     * // with an acknowledgement from the server
     * socket.emit("hello", "world", (val) => {
     *   // ...
     * });
     *
     * @return self
     */ emit(ev, ...args) {
        var _a, _b, _c;
        if (RESERVED_EVENTS.hasOwnProperty(ev)) {
            throw new Error('"' + ev.toString() + '" is a reserved event name');
        }
        args.unshift(ev);
        if (this._opts.retries && !this.flags.fromQueue && !this.flags.volatile) {
            this._addToQueue(args);
            return this;
        }
        const packet = {
            type: __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PacketType"].EVENT,
            data: args
        };
        packet.options = {};
        packet.options.compress = this.flags.compress !== false;
        // event ack callback
        if ("function" === typeof args[args.length - 1]) {
            const id = this.ids++;
            debug("emitting packet with ack id %d", id);
            const ack = args.pop();
            this._registerAckCallback(id, ack);
            packet.id = id;
        }
        const isTransportWritable = (_b = (_a = this.io.engine) === null || _a === void 0 ? void 0 : _a.transport) === null || _b === void 0 ? void 0 : _b.writable;
        const isConnected = this.connected && !((_c = this.io.engine) === null || _c === void 0 ? void 0 : _c._hasPingExpired());
        const discardPacket = this.flags.volatile && !isTransportWritable;
        if (discardPacket) {
            debug("discard packet as the transport is not currently writable");
        } else if (isConnected) {
            this.notifyOutgoingListeners(packet);
            this.packet(packet);
        } else {
            this.sendBuffer.push(packet);
        }
        this.flags = {};
        return this;
    }
    /**
     * @private
     */ _registerAckCallback(id, ack) {
        var _a;
        const timeout = (_a = this.flags.timeout) !== null && _a !== void 0 ? _a : this._opts.ackTimeout;
        if (timeout === undefined) {
            this.acks[id] = ack;
            return;
        }
        // @ts-ignore
        const timer = this.io.setTimeoutFn(()=>{
            delete this.acks[id];
            for(let i = 0; i < this.sendBuffer.length; i++){
                if (this.sendBuffer[i].id === id) {
                    debug("removing packet with ack id %d from the buffer", id);
                    this.sendBuffer.splice(i, 1);
                }
            }
            debug("event with ack id %d has timed out after %d ms", id, timeout);
            ack.call(this, new Error("operation has timed out"));
        }, timeout);
        const fn = (...args)=>{
            // @ts-ignore
            this.io.clearTimeoutFn(timer);
            ack.apply(this, args);
        };
        fn.withError = true;
        this.acks[id] = fn;
    }
    /**
     * Emits an event and waits for an acknowledgement
     *
     * @example
     * // without timeout
     * const response = await socket.emitWithAck("hello", "world");
     *
     * // with a specific timeout
     * try {
     *   const response = await socket.timeout(1000).emitWithAck("hello", "world");
     * } catch (err) {
     *   // the server did not acknowledge the event in the given delay
     * }
     *
     * @return a Promise that will be fulfilled when the server acknowledges the event
     */ emitWithAck(ev, ...args) {
        return new Promise((resolve, reject)=>{
            const fn = (arg1, arg2)=>{
                return arg1 ? reject(arg1) : resolve(arg2);
            };
            fn.withError = true;
            args.push(fn);
            this.emit(ev, ...args);
        });
    }
    /**
     * Add the packet to the queue.
     * @param args
     * @private
     */ _addToQueue(args) {
        let ack;
        if (typeof args[args.length - 1] === "function") {
            ack = args.pop();
        }
        const packet = {
            id: this._queueSeq++,
            tryCount: 0,
            pending: false,
            args,
            flags: Object.assign({
                fromQueue: true
            }, this.flags)
        };
        args.push((err, ...responseArgs)=>{
            if (packet !== this._queue[0]) {
                // the packet has already been acknowledged
                return;
            }
            const hasError = err !== null;
            if (hasError) {
                if (packet.tryCount > this._opts.retries) {
                    debug("packet [%d] is discarded after %d tries", packet.id, packet.tryCount);
                    this._queue.shift();
                    if (ack) {
                        ack(err);
                    }
                }
            } else {
                debug("packet [%d] was successfully sent", packet.id);
                this._queue.shift();
                if (ack) {
                    ack(null, ...responseArgs);
                }
            }
            packet.pending = false;
            return this._drainQueue();
        });
        this._queue.push(packet);
        this._drainQueue();
    }
    /**
     * Send the first packet of the queue, and wait for an acknowledgement from the server.
     * @param force - whether to resend a packet that has not been acknowledged yet
     *
     * @private
     */ _drainQueue(force = false) {
        debug("draining queue");
        if (!this.connected || this._queue.length === 0) {
            return;
        }
        const packet = this._queue[0];
        if (packet.pending && !force) {
            debug("packet [%d] has already been sent and is waiting for an ack", packet.id);
            return;
        }
        packet.pending = true;
        packet.tryCount++;
        debug("sending packet [%d] (try n°%d)", packet.id, packet.tryCount);
        this.flags = packet.flags;
        this.emit.apply(this, packet.args);
    }
    /**
     * Sends a packet.
     *
     * @param packet
     * @private
     */ packet(packet) {
        packet.nsp = this.nsp;
        this.io._packet(packet);
    }
    /**
     * Called upon engine `open`.
     *
     * @private
     */ onopen() {
        debug("transport is open - connecting");
        if (typeof this.auth == "function") {
            this.auth((data)=>{
                this._sendConnectPacket(data);
            });
        } else {
            this._sendConnectPacket(this.auth);
        }
    }
    /**
     * Sends a CONNECT packet to initiate the Socket.IO session.
     *
     * @param data
     * @private
     */ _sendConnectPacket(data) {
        this.packet({
            type: __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PacketType"].CONNECT,
            data: this._pid ? Object.assign({
                pid: this._pid,
                offset: this._lastOffset
            }, data) : data
        });
    }
    /**
     * Called upon engine or manager `error`.
     *
     * @param err
     * @private
     */ onerror(err) {
        if (!this.connected) {
            this.emitReserved("connect_error", err);
        }
    }
    /**
     * Called upon engine `close`.
     *
     * @param reason
     * @param description
     * @private
     */ onclose(reason, description) {
        debug("close (%s)", reason);
        this.connected = false;
        delete this.id;
        this.emitReserved("disconnect", reason, description);
        this._clearAcks();
    }
    /**
     * Clears the acknowledgement handlers upon disconnection, since the client will never receive an acknowledgement from
     * the server.
     *
     * @private
     */ _clearAcks() {
        Object.keys(this.acks).forEach((id)=>{
            const isBuffered = this.sendBuffer.some((packet)=>String(packet.id) === id);
            if (!isBuffered) {
                // note: handlers that do not accept an error as first argument are ignored here
                const ack = this.acks[id];
                delete this.acks[id];
                if (ack.withError) {
                    ack.call(this, new Error("socket has been disconnected"));
                }
            }
        });
    }
    /**
     * Called with socket packet.
     *
     * @param packet
     * @private
     */ onpacket(packet) {
        const sameNamespace = packet.nsp === this.nsp;
        if (!sameNamespace) return;
        switch(packet.type){
            case __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PacketType"].CONNECT:
                if (packet.data && packet.data.sid) {
                    this.onconnect(packet.data.sid, packet.data.pid);
                } else {
                    this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
                }
                break;
            case __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PacketType"].EVENT:
            case __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PacketType"].BINARY_EVENT:
                this.onevent(packet);
                break;
            case __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PacketType"].ACK:
            case __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PacketType"].BINARY_ACK:
                this.onack(packet);
                break;
            case __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PacketType"].DISCONNECT:
                this.ondisconnect();
                break;
            case __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PacketType"].CONNECT_ERROR:
                this.destroy();
                const err = new Error(packet.data.message);
                // @ts-ignore
                err.data = packet.data.data;
                this.emitReserved("connect_error", err);
                break;
        }
    }
    /**
     * Called upon a server event.
     *
     * @param packet
     * @private
     */ onevent(packet) {
        const args = packet.data || [];
        debug("emitting event %j", args);
        if (null != packet.id) {
            debug("attaching ack callback to event");
            args.push(this.ack(packet.id));
        }
        if (this.connected) {
            this.emitEvent(args);
        } else {
            this.receiveBuffer.push(Object.freeze(args));
        }
    }
    emitEvent(args) {
        if (this._anyListeners && this._anyListeners.length) {
            const listeners = this._anyListeners.slice();
            for (const listener of listeners){
                listener.apply(this, args);
            }
        }
        super.emit.apply(this, args);
        if (this._pid && args.length && typeof args[args.length - 1] === "string") {
            this._lastOffset = args[args.length - 1];
        }
    }
    /**
     * Produces an ack callback to emit with an event.
     *
     * @private
     */ ack(id) {
        const self = this;
        let sent = false;
        return function(...args) {
            // prevent double callbacks
            if (sent) return;
            sent = true;
            debug("sending ack %j", args);
            self.packet({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PacketType"].ACK,
                id: id,
                data: args
            });
        };
    }
    /**
     * Called upon a server acknowledgement.
     *
     * @param packet
     * @private
     */ onack(packet) {
        const ack = this.acks[packet.id];
        if (typeof ack !== "function") {
            debug("bad ack %s", packet.id);
            return;
        }
        delete this.acks[packet.id];
        debug("calling ack %s with %j", packet.id, packet.data);
        // @ts-ignore FIXME ack is incorrectly inferred as 'never'
        if (ack.withError) {
            packet.data.unshift(null);
        }
        // @ts-ignore
        ack.apply(this, packet.data);
    }
    /**
     * Called upon server connect.
     *
     * @private
     */ onconnect(id, pid) {
        debug("socket connected with id %s", id);
        this.id = id;
        this.recovered = pid && this._pid === pid;
        this._pid = pid; // defined only if connection state recovery is enabled
        this.connected = true;
        this.emitBuffered();
        this.emitReserved("connect");
        this._drainQueue(true);
    }
    /**
     * Emit buffered events (received and emitted).
     *
     * @private
     */ emitBuffered() {
        this.receiveBuffer.forEach((args)=>this.emitEvent(args));
        this.receiveBuffer = [];
        this.sendBuffer.forEach((packet)=>{
            this.notifyOutgoingListeners(packet);
            this.packet(packet);
        });
        this.sendBuffer = [];
    }
    /**
     * Called upon server disconnect.
     *
     * @private
     */ ondisconnect() {
        debug("server disconnect (%s)", this.nsp);
        this.destroy();
        this.onclose("io server disconnect");
    }
    /**
     * Called upon forced client/server side disconnections,
     * this method ensures the manager stops tracking us and
     * that reconnections don't get triggered for this.
     *
     * @private
     */ destroy() {
        if (this.subs) {
            // clean subscriptions to avoid reconnections
            this.subs.forEach((subDestroy)=>subDestroy());
            this.subs = undefined;
        }
        this.io["_destroy"](this);
    }
    /**
     * Disconnects the socket manually. In that case, the socket will not try to reconnect.
     *
     * If this is the last active Socket instance of the {@link Manager}, the low-level connection will be closed.
     *
     * @example
     * const socket = io();
     *
     * socket.on("disconnect", (reason) => {
     *   // console.log(reason); prints "io client disconnect"
     * });
     *
     * socket.disconnect();
     *
     * @return self
     */ disconnect() {
        if (this.connected) {
            debug("performing disconnect (%s)", this.nsp);
            this.packet({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PacketType"].DISCONNECT
            });
        }
        // remove socket from pool
        this.destroy();
        if (this.connected) {
            // fire events
            this.onclose("io client disconnect");
        }
        return this;
    }
    /**
     * Alias for {@link disconnect()}.
     *
     * @return self
     */ close() {
        return this.disconnect();
    }
    /**
     * Sets the compress flag.
     *
     * @example
     * socket.compress(false).emit("hello");
     *
     * @param compress - if `true`, compresses the sending data
     * @return self
     */ compress(compress) {
        this.flags.compress = compress;
        return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
     * ready to send messages.
     *
     * @example
     * socket.volatile.emit("hello"); // the server may or may not receive it
     *
     * @returns self
     */ get volatile() {
        this.flags.volatile = true;
        return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
     * given number of milliseconds have elapsed without an acknowledgement from the server:
     *
     * @example
     * socket.timeout(5000).emit("my-event", (err) => {
     *   if (err) {
     *     // the server did not acknowledge the event in the given delay
     *   }
     * });
     *
     * @returns self
     */ timeout(timeout) {
        this.flags.timeout = timeout;
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * @example
     * socket.onAny((event, ...args) => {
     *   console.log(`got ${event}`);
     * });
     *
     * @param listener
     */ onAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.push(listener);
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * @example
     * socket.prependAny((event, ...args) => {
     *   console.log(`got event ${event}`);
     * });
     *
     * @param listener
     */ prependAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.unshift(listener);
        return this;
    }
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @example
     * const catchAllListener = (event, ...args) => {
     *   console.log(`got event ${event}`);
     * }
     *
     * socket.onAny(catchAllListener);
     *
     * // remove a specific listener
     * socket.offAny(catchAllListener);
     *
     * // or remove all listeners
     * socket.offAny();
     *
     * @param listener
     */ offAny(listener) {
        if (!this._anyListeners) {
            return this;
        }
        if (listener) {
            const listeners = this._anyListeners;
            for(let i = 0; i < listeners.length; i++){
                if (listener === listeners[i]) {
                    listeners.splice(i, 1);
                    return this;
                }
            }
        } else {
            this._anyListeners = [];
        }
        return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     */ listenersAny() {
        return this._anyListeners || [];
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * Note: acknowledgements sent to the server are not included.
     *
     * @example
     * socket.onAnyOutgoing((event, ...args) => {
     *   console.log(`sent event ${event}`);
     * });
     *
     * @param listener
     */ onAnyOutgoing(listener) {
        this._anyOutgoingListeners = this._anyOutgoingListeners || [];
        this._anyOutgoingListeners.push(listener);
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * Note: acknowledgements sent to the server are not included.
     *
     * @example
     * socket.prependAnyOutgoing((event, ...args) => {
     *   console.log(`sent event ${event}`);
     * });
     *
     * @param listener
     */ prependAnyOutgoing(listener) {
        this._anyOutgoingListeners = this._anyOutgoingListeners || [];
        this._anyOutgoingListeners.unshift(listener);
        return this;
    }
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @example
     * const catchAllListener = (event, ...args) => {
     *   console.log(`sent event ${event}`);
     * }
     *
     * socket.onAnyOutgoing(catchAllListener);
     *
     * // remove a specific listener
     * socket.offAnyOutgoing(catchAllListener);
     *
     * // or remove all listeners
     * socket.offAnyOutgoing();
     *
     * @param [listener] - the catch-all listener (optional)
     */ offAnyOutgoing(listener) {
        if (!this._anyOutgoingListeners) {
            return this;
        }
        if (listener) {
            const listeners = this._anyOutgoingListeners;
            for(let i = 0; i < listeners.length; i++){
                if (listener === listeners[i]) {
                    listeners.splice(i, 1);
                    return this;
                }
            }
        } else {
            this._anyOutgoingListeners = [];
        }
        return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     */ listenersAnyOutgoing() {
        return this._anyOutgoingListeners || [];
    }
    /**
     * Notify the listeners for each packet sent
     *
     * @param packet
     *
     * @private
     */ notifyOutgoingListeners(packet) {
        if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
            const listeners = this._anyOutgoingListeners.slice();
            for (const listener of listeners){
                listener.apply(this, packet.data);
            }
        }
    }
}
}),
"[project]/p2p-react/node_modules/socket.io-client/build/esm-debug/contrib/backo2.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */ __turbopack_context__.s({
    "Backoff": ()=>Backoff
});
function Backoff(opts) {
    opts = opts || {};
    this.ms = opts.min || 100;
    this.max = opts.max || 10000;
    this.factor = opts.factor || 2;
    this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
    this.attempts = 0;
}
/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */ Backoff.prototype.duration = function() {
    var ms = this.ms * Math.pow(this.factor, this.attempts++);
    if (this.jitter) {
        var rand = Math.random();
        var deviation = Math.floor(rand * this.jitter * ms);
        ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
    }
    return Math.min(ms, this.max) | 0;
};
/**
 * Reset the number of attempts.
 *
 * @api public
 */ Backoff.prototype.reset = function() {
    this.attempts = 0;
};
/**
 * Set the minimum duration
 *
 * @api public
 */ Backoff.prototype.setMin = function(min) {
    this.ms = min;
};
/**
 * Set the maximum duration
 *
 * @api public
 */ Backoff.prototype.setMax = function(max) {
    this.max = max;
};
/**
 * Set the jitter
 *
 * @api public
 */ Backoff.prototype.setJitter = function(jitter) {
    this.jitter = jitter;
};
}),
"[project]/p2p-react/node_modules/socket.io-client/build/esm-debug/manager.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "Manager": ()=>Manager
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$socket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/socket.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$util$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/util.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$globals$2e$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/globals.node.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$socket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/socket.io-client/build/esm-debug/socket.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/socket.io-parser/build/esm-debug/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$on$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/socket.io-client/build/esm-debug/on.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$contrib$2f$backo2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/socket.io-client/build/esm-debug/contrib/backo2.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$socket$2e$io$2f$component$2d$emitter$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/@socket.io/component-emitter/lib/esm/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$client$2f$node_modules$2f$debug$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/socket.io-client/node_modules/debug/src/index.js [app-ssr] (ecmascript)"); // debug()
;
;
;
;
;
;
;
const debug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$client$2f$node_modules$2f$debug$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("socket.io-client:manager"); // debug()
class Manager extends __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$socket$2e$io$2f$component$2d$emitter$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Emitter"] {
    constructor(uri, opts){
        var _a;
        super();
        this.nsps = {};
        this.subs = [];
        if (uri && "object" === typeof uri) {
            opts = uri;
            uri = undefined;
        }
        opts = opts || {};
        opts.path = opts.path || "/socket.io";
        this.opts = opts;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$util$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["installTimerFunctions"])(this, opts);
        this.reconnection(opts.reconnection !== false);
        this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
        this.reconnectionDelay(opts.reconnectionDelay || 1000);
        this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
        this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
        this.backoff = new __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$contrib$2f$backo2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Backoff"]({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor()
        });
        this.timeout(null == opts.timeout ? 20000 : opts.timeout);
        this._readyState = "closed";
        this.uri = uri;
        const _parser = opts.parser || __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__;
        this.encoder = new _parser.Encoder();
        this.decoder = new _parser.Decoder();
        this._autoConnect = opts.autoConnect !== false;
        if (this._autoConnect) this.open();
    }
    reconnection(v) {
        if (!arguments.length) return this._reconnection;
        this._reconnection = !!v;
        if (!v) {
            this.skipReconnect = true;
        }
        return this;
    }
    reconnectionAttempts(v) {
        if (v === undefined) return this._reconnectionAttempts;
        this._reconnectionAttempts = v;
        return this;
    }
    reconnectionDelay(v) {
        var _a;
        if (v === undefined) return this._reconnectionDelay;
        this._reconnectionDelay = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
        return this;
    }
    randomizationFactor(v) {
        var _a;
        if (v === undefined) return this._randomizationFactor;
        this._randomizationFactor = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
        return this;
    }
    reconnectionDelayMax(v) {
        var _a;
        if (v === undefined) return this._reconnectionDelayMax;
        this._reconnectionDelayMax = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
        return this;
    }
    timeout(v) {
        if (!arguments.length) return this._timeout;
        this._timeout = v;
        return this;
    }
    /**
     * Starts trying to reconnect if reconnection is enabled and we have not
     * started reconnecting yet
     *
     * @private
     */ maybeReconnectOnOpen() {
        // Only try to reconnect if it's the first time we're connecting
        if (!this._reconnecting && this._reconnection && this.backoff.attempts === 0) {
            // keeps reconnection from firing twice for the same reconnection loop
            this.reconnect();
        }
    }
    /**
     * Sets the current transport `socket`.
     *
     * @param {Function} fn - optional, callback
     * @return self
     * @public
     */ open(fn) {
        debug("readyState %s", this._readyState);
        if (~this._readyState.indexOf("open")) return this;
        debug("opening %s", this.uri);
        this.engine = new __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$socket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Socket"](this.uri, this.opts);
        const socket = this.engine;
        const self = this;
        this._readyState = "opening";
        this.skipReconnect = false;
        // emit `open`
        const openSubDestroy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$on$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["on"])(socket, "open", function() {
            self.onopen();
            fn && fn();
        });
        const onError = (err)=>{
            debug("error");
            this.cleanup();
            this._readyState = "closed";
            this.emitReserved("error", err);
            if (fn) {
                fn(err);
            } else {
                // Only do this if there is no fn to handle the error
                this.maybeReconnectOnOpen();
            }
        };
        // emit `error`
        const errorSub = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$on$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["on"])(socket, "error", onError);
        if (false !== this._timeout) {
            const timeout = this._timeout;
            debug("connect attempt will timeout after %d", timeout);
            // set timer
            const timer = this.setTimeoutFn(()=>{
                debug("connect attempt timed out after %d", timeout);
                openSubDestroy();
                onError(new Error("timeout"));
                socket.close();
            }, timeout);
            if (this.opts.autoUnref) {
                timer.unref();
            }
            this.subs.push(()=>{
                this.clearTimeoutFn(timer);
            });
        }
        this.subs.push(openSubDestroy);
        this.subs.push(errorSub);
        return this;
    }
    /**
     * Alias for open()
     *
     * @return self
     * @public
     */ connect(fn) {
        return this.open(fn);
    }
    /**
     * Called upon transport open.
     *
     * @private
     */ onopen() {
        debug("open");
        // clear old subs
        this.cleanup();
        // mark as open
        this._readyState = "open";
        this.emitReserved("open");
        // add new subs
        const socket = this.engine;
        this.subs.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$on$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["on"])(socket, "ping", this.onping.bind(this)), (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$on$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["on"])(socket, "data", this.ondata.bind(this)), (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$on$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["on"])(socket, "error", this.onerror.bind(this)), (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$on$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["on"])(socket, "close", this.onclose.bind(this)), // @ts-ignore
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$on$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["on"])(this.decoder, "decoded", this.ondecoded.bind(this)));
    }
    /**
     * Called upon a ping.
     *
     * @private
     */ onping() {
        this.emitReserved("ping");
    }
    /**
     * Called with data.
     *
     * @private
     */ ondata(data) {
        try {
            this.decoder.add(data);
        } catch (e) {
            this.onclose("parse error", e);
        }
    }
    /**
     * Called when parser fully decodes a packet.
     *
     * @private
     */ ondecoded(packet) {
        // the nextTick call prevents an exception in a user-provided event listener from triggering a disconnection due to a "parse error"
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$globals$2e$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nextTick"])(()=>{
            this.emitReserved("packet", packet);
        }, this.setTimeoutFn);
    }
    /**
     * Called upon socket error.
     *
     * @private
     */ onerror(err) {
        debug("error", err);
        this.emitReserved("error", err);
    }
    /**
     * Creates a new socket for the given `nsp`.
     *
     * @return {Socket}
     * @public
     */ socket(nsp, opts) {
        let socket = this.nsps[nsp];
        if (!socket) {
            socket = new __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$socket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Socket"](this, nsp, opts);
            this.nsps[nsp] = socket;
        } else if (this._autoConnect && !socket.active) {
            socket.connect();
        }
        return socket;
    }
    /**
     * Called upon a socket close.
     *
     * @param socket
     * @private
     */ _destroy(socket) {
        const nsps = Object.keys(this.nsps);
        for (const nsp of nsps){
            const socket = this.nsps[nsp];
            if (socket.active) {
                debug("socket %s is still active, skipping close", nsp);
                return;
            }
        }
        this._close();
    }
    /**
     * Writes a packet.
     *
     * @param packet
     * @private
     */ _packet(packet) {
        debug("writing packet %j", packet);
        const encodedPackets = this.encoder.encode(packet);
        for(let i = 0; i < encodedPackets.length; i++){
            this.engine.write(encodedPackets[i], packet.options);
        }
    }
    /**
     * Clean up transport subscriptions and packet buffer.
     *
     * @private
     */ cleanup() {
        debug("cleanup");
        this.subs.forEach((subDestroy)=>subDestroy());
        this.subs.length = 0;
        this.decoder.destroy();
    }
    /**
     * Close the current socket.
     *
     * @private
     */ _close() {
        debug("disconnect");
        this.skipReconnect = true;
        this._reconnecting = false;
        this.onclose("forced close");
    }
    /**
     * Alias for close()
     *
     * @private
     */ disconnect() {
        return this._close();
    }
    /**
     * Called when:
     *
     * - the low-level engine is closed
     * - the parser encountered a badly formatted packet
     * - all sockets are disconnected
     *
     * @private
     */ onclose(reason, description) {
        var _a;
        debug("closed due to %s", reason);
        this.cleanup();
        (_a = this.engine) === null || _a === void 0 ? void 0 : _a.close();
        this.backoff.reset();
        this._readyState = "closed";
        this.emitReserved("close", reason, description);
        if (this._reconnection && !this.skipReconnect) {
            this.reconnect();
        }
    }
    /**
     * Attempt a reconnection.
     *
     * @private
     */ reconnect() {
        if (this._reconnecting || this.skipReconnect) return this;
        const self = this;
        if (this.backoff.attempts >= this._reconnectionAttempts) {
            debug("reconnect failed");
            this.backoff.reset();
            this.emitReserved("reconnect_failed");
            this._reconnecting = false;
        } else {
            const delay = this.backoff.duration();
            debug("will wait %dms before reconnect attempt", delay);
            this._reconnecting = true;
            const timer = this.setTimeoutFn(()=>{
                if (self.skipReconnect) return;
                debug("attempting reconnect");
                this.emitReserved("reconnect_attempt", self.backoff.attempts);
                // check again for the case socket closed in above events
                if (self.skipReconnect) return;
                self.open((err)=>{
                    if (err) {
                        debug("reconnect attempt error");
                        self._reconnecting = false;
                        self.reconnect();
                        this.emitReserved("reconnect_error", err);
                    } else {
                        debug("reconnect success");
                        self.onreconnect();
                    }
                });
            }, delay);
            if (this.opts.autoUnref) {
                timer.unref();
            }
            this.subs.push(()=>{
                this.clearTimeoutFn(timer);
            });
        }
    }
    /**
     * Called upon successful reconnect.
     *
     * @private
     */ onreconnect() {
        const attempt = this.backoff.attempts;
        this._reconnecting = false;
        this.backoff.reset();
        this.emitReserved("reconnect", attempt);
    }
}
}),
"[project]/p2p-react/node_modules/socket.io-client/build/esm-debug/index.js [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "connect": ()=>lookup,
    "default": ()=>lookup,
    "io": ()=>lookup
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$url$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/socket.io-client/build/esm-debug/url.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$manager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/socket.io-client/build/esm-debug/manager.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$socket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/socket.io-client/build/esm-debug/socket.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$client$2f$node_modules$2f$debug$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/socket.io-client/node_modules/debug/src/index.js [app-ssr] (ecmascript)"); // debug()
/**
 * Protocol version.
 *
 * @public
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/socket.io-parser/build/esm-debug/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/index.js [app-ssr] (ecmascript) <module evaluation>");
;
;
;
;
const debug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$client$2f$node_modules$2f$debug$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("socket.io-client"); // debug()
/**
 * Managers cache.
 */ const cache = {};
function lookup(uri, opts) {
    if (typeof uri === "object") {
        opts = uri;
        uri = undefined;
    }
    opts = opts || {};
    const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$url$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["url"])(uri, opts.path || "/socket.io");
    const source = parsed.source;
    const id = parsed.id;
    const path = parsed.path;
    const sameNamespace = cache[id] && path in cache[id]["nsps"];
    const newConnection = opts.forceNew || opts["force new connection"] || false === opts.multiplex || sameNamespace;
    let io;
    if (newConnection) {
        debug("ignoring socket cache for %s", source);
        io = new __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$manager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Manager"](source, opts);
    } else {
        if (!cache[id]) {
            debug("new io instance for %s", source);
            cache[id] = new __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$manager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Manager"](source, opts);
        }
        io = cache[id];
    }
    if (parsed.query && !opts.query) {
        opts.query = parsed.queryKey;
    }
    return io.socket(parsed.path, opts);
}
// so that "lookup" can be used both as a function (e.g. `io(...)`) and as a
// namespace (e.g. `io.connect(...)`), for backward compatibility
Object.assign(lookup, {
    Manager: __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$manager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Manager"],
    Socket: __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$socket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Socket"],
    io: lookup,
    connect: lookup
});
;
;
;
}),
"[project]/p2p-react/node_modules/socket.io-client/build/esm-debug/index.js [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$url$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/socket.io-client/build/esm-debug/url.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$manager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/socket.io-client/build/esm-debug/manager.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$socket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/socket.io-client/build/esm-debug/socket.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$client$2f$node_modules$2f$debug$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/socket.io-client/node_modules/debug/src/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/socket.io-parser/build/esm-debug/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$engine$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/engine.io-client/build/esm-debug/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/socket.io-client/build/esm-debug/index.js [app-ssr] (ecmascript) <locals>");
}),
"[project]/p2p-react/node_modules/socket.io-parser/build/esm-debug/is-binary.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "hasBinary": ()=>hasBinary,
    "isBinary": ()=>isBinary
});
const withNativeArrayBuffer = typeof ArrayBuffer === "function";
const isView = (obj)=>{
    return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
};
const toString = Object.prototype.toString;
const withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && toString.call(Blob) === "[object BlobConstructor]";
const withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString.call(File) === "[object FileConstructor]";
function isBinary(obj) {
    return withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj)) || withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File;
}
function hasBinary(obj, toJSON) {
    if (!obj || typeof obj !== "object") {
        return false;
    }
    if (Array.isArray(obj)) {
        for(let i = 0, l = obj.length; i < l; i++){
            if (hasBinary(obj[i])) {
                return true;
            }
        }
        return false;
    }
    if (isBinary(obj)) {
        return true;
    }
    if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) {
        return hasBinary(obj.toJSON(), true);
    }
    for(const key in obj){
        if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
            return true;
        }
    }
    return false;
}
}),
"[project]/p2p-react/node_modules/socket.io-parser/build/esm-debug/binary.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "deconstructPacket": ()=>deconstructPacket,
    "reconstructPacket": ()=>reconstructPacket
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$is$2d$binary$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/socket.io-parser/build/esm-debug/is-binary.js [app-ssr] (ecmascript)");
;
function deconstructPacket(packet) {
    const buffers = [];
    const packetData = packet.data;
    const pack = packet;
    pack.data = _deconstructPacket(packetData, buffers);
    pack.attachments = buffers.length; // number of binary 'attachments'
    return {
        packet: pack,
        buffers: buffers
    };
}
function _deconstructPacket(data, buffers) {
    if (!data) return data;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$is$2d$binary$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isBinary"])(data)) {
        const placeholder = {
            _placeholder: true,
            num: buffers.length
        };
        buffers.push(data);
        return placeholder;
    } else if (Array.isArray(data)) {
        const newData = new Array(data.length);
        for(let i = 0; i < data.length; i++){
            newData[i] = _deconstructPacket(data[i], buffers);
        }
        return newData;
    } else if (typeof data === "object" && !(data instanceof Date)) {
        const newData = {};
        for(const key in data){
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                newData[key] = _deconstructPacket(data[key], buffers);
            }
        }
        return newData;
    }
    return data;
}
function reconstructPacket(packet, buffers) {
    packet.data = _reconstructPacket(packet.data, buffers);
    delete packet.attachments; // no longer useful
    return packet;
}
function _reconstructPacket(data, buffers) {
    if (!data) return data;
    if (data && data._placeholder === true) {
        const isIndexValid = typeof data.num === "number" && data.num >= 0 && data.num < buffers.length;
        if (isIndexValid) {
            return buffers[data.num]; // appropriate buffer (should be natural order anyway)
        } else {
            throw new Error("illegal attachments");
        }
    } else if (Array.isArray(data)) {
        for(let i = 0; i < data.length; i++){
            data[i] = _reconstructPacket(data[i], buffers);
        }
    } else if (typeof data === "object") {
        for(const key in data){
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                data[key] = _reconstructPacket(data[key], buffers);
            }
        }
    }
    return data;
}
}),
"[project]/p2p-react/node_modules/socket.io-parser/build/esm-debug/index.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "Decoder": ()=>Decoder,
    "Encoder": ()=>Encoder,
    "PacketType": ()=>PacketType,
    "protocol": ()=>protocol
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$socket$2e$io$2f$component$2d$emitter$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/@socket.io/component-emitter/lib/esm/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$binary$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/socket.io-parser/build/esm-debug/binary.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$is$2d$binary$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/socket.io-parser/build/esm-debug/is-binary.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$parser$2f$node_modules$2f$debug$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/socket.io-parser/node_modules/debug/src/index.js [app-ssr] (ecmascript)"); // debug()
;
;
;
;
const debug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$parser$2f$node_modules$2f$debug$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("socket.io-parser"); // debug()
/**
 * These strings must not be used as event names, as they have a special meaning.
 */ const RESERVED_EVENTS = [
    "connect",
    "connect_error",
    "disconnect",
    "disconnecting",
    "newListener",
    "removeListener"
];
const protocol = 5;
var PacketType;
(function(PacketType) {
    PacketType[PacketType["CONNECT"] = 0] = "CONNECT";
    PacketType[PacketType["DISCONNECT"] = 1] = "DISCONNECT";
    PacketType[PacketType["EVENT"] = 2] = "EVENT";
    PacketType[PacketType["ACK"] = 3] = "ACK";
    PacketType[PacketType["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
    PacketType[PacketType["BINARY_EVENT"] = 5] = "BINARY_EVENT";
    PacketType[PacketType["BINARY_ACK"] = 6] = "BINARY_ACK";
})(PacketType || (PacketType = {}));
class Encoder {
    /**
     * Encoder constructor
     *
     * @param {function} replacer - custom replacer to pass down to JSON.parse
     */ constructor(replacer){
        this.replacer = replacer;
    }
    /**
     * Encode a packet as a single string if non-binary, or as a
     * buffer sequence, depending on packet type.
     *
     * @param {Object} obj - packet object
     */ encode(obj) {
        debug("encoding packet %j", obj);
        if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$is$2d$binary$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasBinary"])(obj)) {
                return this.encodeAsBinary({
                    type: obj.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK,
                    nsp: obj.nsp,
                    data: obj.data,
                    id: obj.id
                });
            }
        }
        return [
            this.encodeAsString(obj)
        ];
    }
    /**
     * Encode packet as string.
     */ encodeAsString(obj) {
        // first is type
        let str = "" + obj.type;
        // attachments if we have them
        if (obj.type === PacketType.BINARY_EVENT || obj.type === PacketType.BINARY_ACK) {
            str += obj.attachments + "-";
        }
        // if we have a namespace other than `/`
        // we append it followed by a comma `,`
        if (obj.nsp && "/" !== obj.nsp) {
            str += obj.nsp + ",";
        }
        // immediately followed by the id
        if (null != obj.id) {
            str += obj.id;
        }
        // json data
        if (null != obj.data) {
            str += JSON.stringify(obj.data, this.replacer);
        }
        debug("encoded %j as %s", obj, str);
        return str;
    }
    /**
     * Encode packet as 'buffer sequence' by removing blobs, and
     * deconstructing packet into object with placeholders and
     * a list of buffers.
     */ encodeAsBinary(obj) {
        const deconstruction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$binary$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deconstructPacket"])(obj);
        const pack = this.encodeAsString(deconstruction.packet);
        const buffers = deconstruction.buffers;
        buffers.unshift(pack); // add packet info to beginning of data list
        return buffers; // write all the buffers
    }
}
// see https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript
function isObject(value) {
    return Object.prototype.toString.call(value) === "[object Object]";
}
class Decoder extends __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$socket$2e$io$2f$component$2d$emitter$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Emitter"] {
    /**
     * Decoder constructor
     *
     * @param {function} reviver - custom reviver to pass down to JSON.stringify
     */ constructor(reviver){
        super();
        this.reviver = reviver;
    }
    /**
     * Decodes an encoded packet string into packet JSON.
     *
     * @param {String} obj - encoded packet
     */ add(obj) {
        let packet;
        if (typeof obj === "string") {
            if (this.reconstructor) {
                throw new Error("got plaintext data when reconstructing a packet");
            }
            packet = this.decodeString(obj);
            const isBinaryEvent = packet.type === PacketType.BINARY_EVENT;
            if (isBinaryEvent || packet.type === PacketType.BINARY_ACK) {
                packet.type = isBinaryEvent ? PacketType.EVENT : PacketType.ACK;
                // binary packet's json
                this.reconstructor = new BinaryReconstructor(packet);
                // no attachments, labeled binary but no binary data to follow
                if (packet.attachments === 0) {
                    super.emitReserved("decoded", packet);
                }
            } else {
                // non-binary full packet
                super.emitReserved("decoded", packet);
            }
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$is$2d$binary$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isBinary"])(obj) || obj.base64) {
            // raw binary data
            if (!this.reconstructor) {
                throw new Error("got binary data when not reconstructing a packet");
            } else {
                packet = this.reconstructor.takeBinaryData(obj);
                if (packet) {
                    // received final buffer
                    this.reconstructor = null;
                    super.emitReserved("decoded", packet);
                }
            }
        } else {
            throw new Error("Unknown type: " + obj);
        }
    }
    /**
     * Decode a packet String (JSON data)
     *
     * @param {String} str
     * @return {Object} packet
     */ decodeString(str) {
        let i = 0;
        // look up type
        const p = {
            type: Number(str.charAt(0))
        };
        if (PacketType[p.type] === undefined) {
            throw new Error("unknown packet type " + p.type);
        }
        // look up attachments if type binary
        if (p.type === PacketType.BINARY_EVENT || p.type === PacketType.BINARY_ACK) {
            const start = i + 1;
            while(str.charAt(++i) !== "-" && i != str.length){}
            const buf = str.substring(start, i);
            if (buf != Number(buf) || str.charAt(i) !== "-") {
                throw new Error("Illegal attachments");
            }
            p.attachments = Number(buf);
        }
        // look up namespace (if any)
        if ("/" === str.charAt(i + 1)) {
            const start = i + 1;
            while(++i){
                const c = str.charAt(i);
                if ("," === c) break;
                if (i === str.length) break;
            }
            p.nsp = str.substring(start, i);
        } else {
            p.nsp = "/";
        }
        // look up id
        const next = str.charAt(i + 1);
        if ("" !== next && Number(next) == next) {
            const start = i + 1;
            while(++i){
                const c = str.charAt(i);
                if (null == c || Number(c) != c) {
                    --i;
                    break;
                }
                if (i === str.length) break;
            }
            p.id = Number(str.substring(start, i + 1));
        }
        // look up json data
        if (str.charAt(++i)) {
            const payload = this.tryParse(str.substr(i));
            if (Decoder.isPayloadValid(p.type, payload)) {
                p.data = payload;
            } else {
                throw new Error("invalid payload");
            }
        }
        debug("decoded %s as %j", str, p);
        return p;
    }
    tryParse(str) {
        try {
            return JSON.parse(str, this.reviver);
        } catch (e) {
            return false;
        }
    }
    static isPayloadValid(type, payload) {
        switch(type){
            case PacketType.CONNECT:
                return isObject(payload);
            case PacketType.DISCONNECT:
                return payload === undefined;
            case PacketType.CONNECT_ERROR:
                return typeof payload === "string" || isObject(payload);
            case PacketType.EVENT:
            case PacketType.BINARY_EVENT:
                return Array.isArray(payload) && (typeof payload[0] === "number" || typeof payload[0] === "string" && RESERVED_EVENTS.indexOf(payload[0]) === -1);
            case PacketType.ACK:
            case PacketType.BINARY_ACK:
                return Array.isArray(payload);
        }
    }
    /**
     * Deallocates a parser's resources
     */ destroy() {
        if (this.reconstructor) {
            this.reconstructor.finishedReconstruction();
            this.reconstructor = null;
        }
    }
}
/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 */ class BinaryReconstructor {
    constructor(packet){
        this.packet = packet;
        this.buffers = [];
        this.reconPack = packet;
    }
    /**
     * Method to be called when binary data received from connection
     * after a BINARY_EVENT packet.
     *
     * @param {Buffer | ArrayBuffer} binData - the raw binary data received
     * @return {null | Object} returns null if more binary data is expected or
     *   a reconstructed packet object if all buffers have been received.
     */ takeBinaryData(binData) {
        this.buffers.push(binData);
        if (this.buffers.length === this.reconPack.attachments) {
            // done with buffer list
            const packet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$socket$2e$io$2d$parser$2f$build$2f$esm$2d$debug$2f$binary$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["reconstructPacket"])(this.reconPack, this.buffers);
            this.finishedReconstruction();
            return packet;
        }
        return null;
    }
    /**
     * Cleans up binary packet reconstruction variables.
     */ finishedReconstruction() {
        this.reconPack = null;
        this.buffers = [];
    }
}
}),
"[project]/p2p-react/node_modules/qrcode/lib/can-promise.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
// can-promise has a crash in some versions of react native that dont have
// standard global objects
// https://github.com/soldair/node-qrcode/issues/157
module.exports = function() {
    return typeof Promise === 'function' && Promise.prototype && Promise.prototype.then;
};
}}),
"[project]/p2p-react/node_modules/qrcode/lib/core/utils.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
let toSJISFunction;
const CODEWORDS_COUNT = [
    0,
    26,
    44,
    70,
    100,
    134,
    172,
    196,
    242,
    292,
    346,
    404,
    466,
    532,
    581,
    655,
    733,
    815,
    901,
    991,
    1085,
    1156,
    1258,
    1364,
    1474,
    1588,
    1706,
    1828,
    1921,
    2051,
    2185,
    2323,
    2465,
    2611,
    2761,
    2876,
    3034,
    3196,
    3362,
    3532,
    3706
];
/**
 * Returns the QR Code size for the specified version
 *
 * @param  {Number} version QR Code version
 * @return {Number}         size of QR code
 */ exports.getSymbolSize = function getSymbolSize(version) {
    if (!version) throw new Error('"version" cannot be null or undefined');
    if (version < 1 || version > 40) throw new Error('"version" should be in range from 1 to 40');
    return version * 4 + 17;
};
/**
 * Returns the total number of codewords used to store data and EC information.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Data length in bits
 */ exports.getSymbolTotalCodewords = function getSymbolTotalCodewords(version) {
    return CODEWORDS_COUNT[version];
};
/**
 * Encode data with Bose-Chaudhuri-Hocquenghem
 *
 * @param  {Number} data Value to encode
 * @return {Number}      Encoded value
 */ exports.getBCHDigit = function(data) {
    let digit = 0;
    while(data !== 0){
        digit++;
        data >>>= 1;
    }
    return digit;
};
exports.setToSJISFunction = function setToSJISFunction(f) {
    if (typeof f !== 'function') {
        throw new Error('"toSJISFunc" is not a valid function.');
    }
    toSJISFunction = f;
};
exports.isKanjiModeEnabled = function() {
    return typeof toSJISFunction !== 'undefined';
};
exports.toSJIS = function toSJIS(kanji) {
    return toSJISFunction(kanji);
};
}}),
"[project]/p2p-react/node_modules/qrcode/lib/core/error-correction-level.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
exports.L = {
    bit: 1
};
exports.M = {
    bit: 0
};
exports.Q = {
    bit: 3
};
exports.H = {
    bit: 2
};
function fromString(string) {
    if (typeof string !== 'string') {
        throw new Error('Param is not a string');
    }
    const lcStr = string.toLowerCase();
    switch(lcStr){
        case 'l':
        case 'low':
            return exports.L;
        case 'm':
        case 'medium':
            return exports.M;
        case 'q':
        case 'quartile':
            return exports.Q;
        case 'h':
        case 'high':
            return exports.H;
        default:
            throw new Error('Unknown EC Level: ' + string);
    }
}
exports.isValid = function isValid(level) {
    return level && typeof level.bit !== 'undefined' && level.bit >= 0 && level.bit < 4;
};
exports.from = function from(value, defaultValue) {
    if (exports.isValid(value)) {
        return value;
    }
    try {
        return fromString(value);
    } catch (e) {
        return defaultValue;
    }
};
}}),
"[project]/p2p-react/node_modules/qrcode/lib/core/bit-buffer.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
function BitBuffer() {
    this.buffer = [];
    this.length = 0;
}
BitBuffer.prototype = {
    get: function(index) {
        const bufIndex = Math.floor(index / 8);
        return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) === 1;
    },
    put: function(num, length) {
        for(let i = 0; i < length; i++){
            this.putBit((num >>> length - i - 1 & 1) === 1);
        }
    },
    getLengthInBits: function() {
        return this.length;
    },
    putBit: function(bit) {
        const bufIndex = Math.floor(this.length / 8);
        if (this.buffer.length <= bufIndex) {
            this.buffer.push(0);
        }
        if (bit) {
            this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
        }
        this.length++;
    }
};
module.exports = BitBuffer;
}}),
"[project]/p2p-react/node_modules/qrcode/lib/core/bit-matrix.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
/**
 * Helper class to handle QR Code symbol modules
 *
 * @param {Number} size Symbol size
 */ function BitMatrix(size) {
    if (!size || size < 1) {
        throw new Error('BitMatrix size must be defined and greater than 0');
    }
    this.size = size;
    this.data = new Uint8Array(size * size);
    this.reservedBit = new Uint8Array(size * size);
}
/**
 * Set bit value at specified location
 * If reserved flag is set, this bit will be ignored during masking process
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 * @param {Boolean} reserved
 */ BitMatrix.prototype.set = function(row, col, value, reserved) {
    const index = row * this.size + col;
    this.data[index] = value;
    if (reserved) this.reservedBit[index] = true;
};
/**
 * Returns bit value at specified location
 *
 * @param  {Number}  row
 * @param  {Number}  col
 * @return {Boolean}
 */ BitMatrix.prototype.get = function(row, col) {
    return this.data[row * this.size + col];
};
/**
 * Applies xor operator at specified location
 * (used during masking process)
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 */ BitMatrix.prototype.xor = function(row, col, value) {
    this.data[row * this.size + col] ^= value;
};
/**
 * Check if bit at specified location is reserved
 *
 * @param {Number}   row
 * @param {Number}   col
 * @return {Boolean}
 */ BitMatrix.prototype.isReserved = function(row, col) {
    return this.reservedBit[row * this.size + col];
};
module.exports = BitMatrix;
}}),
"[project]/p2p-react/node_modules/qrcode/lib/core/alignment-pattern.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
/**
 * Alignment pattern are fixed reference pattern in defined positions
 * in a matrix symbology, which enables the decode software to re-synchronise
 * the coordinate mapping of the image modules in the event of moderate amounts
 * of distortion of the image.
 *
 * Alignment patterns are present only in QR Code symbols of version 2 or larger
 * and their number depends on the symbol version.
 */ const getSymbolSize = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/core/utils.js [app-ssr] (ecmascript)").getSymbolSize;
/**
 * Calculate the row/column coordinates of the center module of each alignment pattern
 * for the specified QR Code version.
 *
 * The alignment patterns are positioned symmetrically on either side of the diagonal
 * running from the top left corner of the symbol to the bottom right corner.
 *
 * Since positions are simmetrical only half of the coordinates are returned.
 * Each item of the array will represent in turn the x and y coordinate.
 * @see {@link getPositions}
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinate
 */ exports.getRowColCoords = function getRowColCoords(version) {
    if (version === 1) return [];
    const posCount = Math.floor(version / 7) + 2;
    const size = getSymbolSize(version);
    const intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;
    const positions = [
        size - 7
    ] // Last coord is always (size - 7)
    ;
    for(let i = 1; i < posCount - 1; i++){
        positions[i] = positions[i - 1] - intervals;
    }
    positions.push(6); // First coord is always 6
    return positions.reverse();
};
/**
 * Returns an array containing the positions of each alignment pattern.
 * Each array's element represent the center point of the pattern as (x, y) coordinates
 *
 * Coordinates are calculated expanding the row/column coordinates returned by {@link getRowColCoords}
 * and filtering out the items that overlaps with finder pattern
 *
 * @example
 * For a Version 7 symbol {@link getRowColCoords} returns values 6, 22 and 38.
 * The alignment patterns, therefore, are to be centered on (row, column)
 * positions (6,22), (22,6), (22,22), (22,38), (38,22), (38,38).
 * Note that the coordinates (6,6), (6,38), (38,6) are occupied by finder patterns
 * and are not therefore used for alignment patterns.
 *
 * let pos = getPositions(7)
 * // [[6,22], [22,6], [22,22], [22,38], [38,22], [38,38]]
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */ exports.getPositions = function getPositions(version) {
    const coords = [];
    const pos = exports.getRowColCoords(version);
    const posLength = pos.length;
    for(let i = 0; i < posLength; i++){
        for(let j = 0; j < posLength; j++){
            // Skip if position is occupied by finder patterns
            if (i === 0 && j === 0 || i === 0 && j === posLength - 1 || i === posLength - 1 && j === 0) {
                continue;
            }
            coords.push([
                pos[i],
                pos[j]
            ]);
        }
    }
    return coords;
};
}}),
"[project]/p2p-react/node_modules/qrcode/lib/core/finder-pattern.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const getSymbolSize = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/core/utils.js [app-ssr] (ecmascript)").getSymbolSize;
const FINDER_PATTERN_SIZE = 7;
/**
 * Returns an array containing the positions of each finder pattern.
 * Each array's element represent the top-left point of the pattern as (x, y) coordinates
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */ exports.getPositions = function getPositions(version) {
    const size = getSymbolSize(version);
    return [
        // top-left
        [
            0,
            0
        ],
        // top-right
        [
            size - FINDER_PATTERN_SIZE,
            0
        ],
        // bottom-left
        [
            0,
            size - FINDER_PATTERN_SIZE
        ]
    ];
};
}}),
"[project]/p2p-react/node_modules/qrcode/lib/core/mask-pattern.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
/**
 * Data mask pattern reference
 * @type {Object}
 */ exports.Patterns = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7
};
/**
 * Weighted penalty scores for the undesirable features
 * @type {Object}
 */ const PenaltyScores = {
    N1: 3,
    N2: 3,
    N3: 40,
    N4: 10
};
/**
 * Check if mask pattern value is valid
 *
 * @param  {Number}  mask    Mask pattern
 * @return {Boolean}         true if valid, false otherwise
 */ exports.isValid = function isValid(mask) {
    return mask != null && mask !== '' && !isNaN(mask) && mask >= 0 && mask <= 7;
};
/**
 * Returns mask pattern from a value.
 * If value is not valid, returns undefined
 *
 * @param  {Number|String} value        Mask pattern value
 * @return {Number}                     Valid mask pattern or undefined
 */ exports.from = function from(value) {
    return exports.isValid(value) ? parseInt(value, 10) : undefined;
};
/**
* Find adjacent modules in row/column with the same color
* and assign a penalty value.
*
* Points: N1 + i
* i is the amount by which the number of adjacent modules of the same color exceeds 5
*/ exports.getPenaltyN1 = function getPenaltyN1(data) {
    const size = data.size;
    let points = 0;
    let sameCountCol = 0;
    let sameCountRow = 0;
    let lastCol = null;
    let lastRow = null;
    for(let row = 0; row < size; row++){
        sameCountCol = sameCountRow = 0;
        lastCol = lastRow = null;
        for(let col = 0; col < size; col++){
            let module = data.get(row, col);
            if (module === lastCol) {
                sameCountCol++;
            } else {
                if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
                lastCol = module;
                sameCountCol = 1;
            }
            module = data.get(col, row);
            if (module === lastRow) {
                sameCountRow++;
            } else {
                if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
                lastRow = module;
                sameCountRow = 1;
            }
        }
        if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
        if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
    }
    return points;
};
/**
 * Find 2x2 blocks with the same color and assign a penalty value
 *
 * Points: N2 * (m - 1) * (n - 1)
 */ exports.getPenaltyN2 = function getPenaltyN2(data) {
    const size = data.size;
    let points = 0;
    for(let row = 0; row < size - 1; row++){
        for(let col = 0; col < size - 1; col++){
            const last = data.get(row, col) + data.get(row, col + 1) + data.get(row + 1, col) + data.get(row + 1, col + 1);
            if (last === 4 || last === 0) points++;
        }
    }
    return points * PenaltyScores.N2;
};
/**
 * Find 1:1:3:1:1 ratio (dark:light:dark:light:dark) pattern in row/column,
 * preceded or followed by light area 4 modules wide
 *
 * Points: N3 * number of pattern found
 */ exports.getPenaltyN3 = function getPenaltyN3(data) {
    const size = data.size;
    let points = 0;
    let bitsCol = 0;
    let bitsRow = 0;
    for(let row = 0; row < size; row++){
        bitsCol = bitsRow = 0;
        for(let col = 0; col < size; col++){
            bitsCol = bitsCol << 1 & 0x7FF | data.get(row, col);
            if (col >= 10 && (bitsCol === 0x5D0 || bitsCol === 0x05D)) points++;
            bitsRow = bitsRow << 1 & 0x7FF | data.get(col, row);
            if (col >= 10 && (bitsRow === 0x5D0 || bitsRow === 0x05D)) points++;
        }
    }
    return points * PenaltyScores.N3;
};
/**
 * Calculate proportion of dark modules in entire symbol
 *
 * Points: N4 * k
 *
 * k is the rating of the deviation of the proportion of dark modules
 * in the symbol from 50% in steps of 5%
 */ exports.getPenaltyN4 = function getPenaltyN4(data) {
    let darkCount = 0;
    const modulesCount = data.data.length;
    for(let i = 0; i < modulesCount; i++)darkCount += data.data[i];
    const k = Math.abs(Math.ceil(darkCount * 100 / modulesCount / 5) - 10);
    return k * PenaltyScores.N4;
};
/**
 * Return mask value at given position
 *
 * @param  {Number} maskPattern Pattern reference value
 * @param  {Number} i           Row
 * @param  {Number} j           Column
 * @return {Boolean}            Mask value
 */ function getMaskAt(maskPattern, i, j) {
    switch(maskPattern){
        case exports.Patterns.PATTERN000:
            return (i + j) % 2 === 0;
        case exports.Patterns.PATTERN001:
            return i % 2 === 0;
        case exports.Patterns.PATTERN010:
            return j % 3 === 0;
        case exports.Patterns.PATTERN011:
            return (i + j) % 3 === 0;
        case exports.Patterns.PATTERN100:
            return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
        case exports.Patterns.PATTERN101:
            return i * j % 2 + i * j % 3 === 0;
        case exports.Patterns.PATTERN110:
            return (i * j % 2 + i * j % 3) % 2 === 0;
        case exports.Patterns.PATTERN111:
            return (i * j % 3 + (i + j) % 2) % 2 === 0;
        default:
            throw new Error('bad maskPattern:' + maskPattern);
    }
}
/**
 * Apply a mask pattern to a BitMatrix
 *
 * @param  {Number}    pattern Pattern reference number
 * @param  {BitMatrix} data    BitMatrix data
 */ exports.applyMask = function applyMask(pattern, data) {
    const size = data.size;
    for(let col = 0; col < size; col++){
        for(let row = 0; row < size; row++){
            if (data.isReserved(row, col)) continue;
            data.xor(row, col, getMaskAt(pattern, row, col));
        }
    }
};
/**
 * Returns the best mask pattern for data
 *
 * @param  {BitMatrix} data
 * @return {Number} Mask pattern reference number
 */ exports.getBestMask = function getBestMask(data, setupFormatFunc) {
    const numPatterns = Object.keys(exports.Patterns).length;
    let bestPattern = 0;
    let lowerPenalty = Infinity;
    for(let p = 0; p < numPatterns; p++){
        setupFormatFunc(p);
        exports.applyMask(p, data);
        // Calculate penalty
        const penalty = exports.getPenaltyN1(data) + exports.getPenaltyN2(data) + exports.getPenaltyN3(data) + exports.getPenaltyN4(data);
        // Undo previously applied mask
        exports.applyMask(p, data);
        if (penalty < lowerPenalty) {
            lowerPenalty = penalty;
            bestPattern = p;
        }
    }
    return bestPattern;
};
}}),
"[project]/p2p-react/node_modules/qrcode/lib/core/error-correction-code.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const ECLevel = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/core/error-correction-level.js [app-ssr] (ecmascript)");
const EC_BLOCKS_TABLE = [
    // L  M  Q  H
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    2,
    2,
    1,
    2,
    2,
    4,
    1,
    2,
    4,
    4,
    2,
    4,
    4,
    4,
    2,
    4,
    6,
    5,
    2,
    4,
    6,
    6,
    2,
    5,
    8,
    8,
    4,
    5,
    8,
    8,
    4,
    5,
    8,
    11,
    4,
    8,
    10,
    11,
    4,
    9,
    12,
    16,
    4,
    9,
    16,
    16,
    6,
    10,
    12,
    18,
    6,
    10,
    17,
    16,
    6,
    11,
    16,
    19,
    6,
    13,
    18,
    21,
    7,
    14,
    21,
    25,
    8,
    16,
    20,
    25,
    8,
    17,
    23,
    25,
    9,
    17,
    23,
    34,
    9,
    18,
    25,
    30,
    10,
    20,
    27,
    32,
    12,
    21,
    29,
    35,
    12,
    23,
    34,
    37,
    12,
    25,
    34,
    40,
    13,
    26,
    35,
    42,
    14,
    28,
    38,
    45,
    15,
    29,
    40,
    48,
    16,
    31,
    43,
    51,
    17,
    33,
    45,
    54,
    18,
    35,
    48,
    57,
    19,
    37,
    51,
    60,
    19,
    38,
    53,
    63,
    20,
    40,
    56,
    66,
    21,
    43,
    59,
    70,
    22,
    45,
    62,
    74,
    24,
    47,
    65,
    77,
    25,
    49,
    68,
    81
];
const EC_CODEWORDS_TABLE = [
    // L  M  Q  H
    7,
    10,
    13,
    17,
    10,
    16,
    22,
    28,
    15,
    26,
    36,
    44,
    20,
    36,
    52,
    64,
    26,
    48,
    72,
    88,
    36,
    64,
    96,
    112,
    40,
    72,
    108,
    130,
    48,
    88,
    132,
    156,
    60,
    110,
    160,
    192,
    72,
    130,
    192,
    224,
    80,
    150,
    224,
    264,
    96,
    176,
    260,
    308,
    104,
    198,
    288,
    352,
    120,
    216,
    320,
    384,
    132,
    240,
    360,
    432,
    144,
    280,
    408,
    480,
    168,
    308,
    448,
    532,
    180,
    338,
    504,
    588,
    196,
    364,
    546,
    650,
    224,
    416,
    600,
    700,
    224,
    442,
    644,
    750,
    252,
    476,
    690,
    816,
    270,
    504,
    750,
    900,
    300,
    560,
    810,
    960,
    312,
    588,
    870,
    1050,
    336,
    644,
    952,
    1110,
    360,
    700,
    1020,
    1200,
    390,
    728,
    1050,
    1260,
    420,
    784,
    1140,
    1350,
    450,
    812,
    1200,
    1440,
    480,
    868,
    1290,
    1530,
    510,
    924,
    1350,
    1620,
    540,
    980,
    1440,
    1710,
    570,
    1036,
    1530,
    1800,
    570,
    1064,
    1590,
    1890,
    600,
    1120,
    1680,
    1980,
    630,
    1204,
    1770,
    2100,
    660,
    1260,
    1860,
    2220,
    720,
    1316,
    1950,
    2310,
    750,
    1372,
    2040,
    2430
];
/**
 * Returns the number of error correction block that the QR Code should contain
 * for the specified version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction blocks
 */ exports.getBlocksCount = function getBlocksCount(version, errorCorrectionLevel) {
    switch(errorCorrectionLevel){
        case ECLevel.L:
            return EC_BLOCKS_TABLE[(version - 1) * 4 + 0];
        case ECLevel.M:
            return EC_BLOCKS_TABLE[(version - 1) * 4 + 1];
        case ECLevel.Q:
            return EC_BLOCKS_TABLE[(version - 1) * 4 + 2];
        case ECLevel.H:
            return EC_BLOCKS_TABLE[(version - 1) * 4 + 3];
        default:
            return undefined;
    }
};
/**
 * Returns the number of error correction codewords to use for the specified
 * version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction codewords
 */ exports.getTotalCodewordsCount = function getTotalCodewordsCount(version, errorCorrectionLevel) {
    switch(errorCorrectionLevel){
        case ECLevel.L:
            return EC_CODEWORDS_TABLE[(version - 1) * 4 + 0];
        case ECLevel.M:
            return EC_CODEWORDS_TABLE[(version - 1) * 4 + 1];
        case ECLevel.Q:
            return EC_CODEWORDS_TABLE[(version - 1) * 4 + 2];
        case ECLevel.H:
            return EC_CODEWORDS_TABLE[(version - 1) * 4 + 3];
        default:
            return undefined;
    }
};
}}),
"[project]/p2p-react/node_modules/qrcode/lib/core/galois-field.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const EXP_TABLE = new Uint8Array(512);
const LOG_TABLE = new Uint8Array(256);
(function initTables() {
    let x = 1;
    for(let i = 0; i < 255; i++){
        EXP_TABLE[i] = x;
        LOG_TABLE[x] = i;
        x <<= 1; // multiply by 2
        // The QR code specification says to use byte-wise modulo 100011101 arithmetic.
        // This means that when a number is 256 or larger, it should be XORed with 0x11D.
        if (x & 0x100) {
            x ^= 0x11D;
        }
    }
    // Optimization: double the size of the anti-log table so that we don't need to mod 255 to
    // stay inside the bounds (because we will mainly use this table for the multiplication of
    // two GF numbers, no more).
    // @see {@link mul}
    for(let i = 255; i < 512; i++){
        EXP_TABLE[i] = EXP_TABLE[i - 255];
    }
})();
/**
 * Returns log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */ exports.log = function log(n) {
    if (n < 1) throw new Error('log(' + n + ')');
    return LOG_TABLE[n];
};
/**
 * Returns anti-log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */ exports.exp = function exp(n) {
    return EXP_TABLE[n];
};
/**
 * Multiplies two number inside Galois Field
 *
 * @param  {Number} x
 * @param  {Number} y
 * @return {Number}
 */ exports.mul = function mul(x, y) {
    if (x === 0 || y === 0) return 0;
    // should be EXP_TABLE[(LOG_TABLE[x] + LOG_TABLE[y]) % 255] if EXP_TABLE wasn't oversized
    // @see {@link initTables}
    return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]];
};
}}),
"[project]/p2p-react/node_modules/qrcode/lib/core/polynomial.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const GF = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/core/galois-field.js [app-ssr] (ecmascript)");
/**
 * Multiplies two polynomials inside Galois Field
 *
 * @param  {Uint8Array} p1 Polynomial
 * @param  {Uint8Array} p2 Polynomial
 * @return {Uint8Array}    Product of p1 and p2
 */ exports.mul = function mul(p1, p2) {
    const coeff = new Uint8Array(p1.length + p2.length - 1);
    for(let i = 0; i < p1.length; i++){
        for(let j = 0; j < p2.length; j++){
            coeff[i + j] ^= GF.mul(p1[i], p2[j]);
        }
    }
    return coeff;
};
/**
 * Calculate the remainder of polynomials division
 *
 * @param  {Uint8Array} divident Polynomial
 * @param  {Uint8Array} divisor  Polynomial
 * @return {Uint8Array}          Remainder
 */ exports.mod = function mod(divident, divisor) {
    let result = new Uint8Array(divident);
    while(result.length - divisor.length >= 0){
        const coeff = result[0];
        for(let i = 0; i < divisor.length; i++){
            result[i] ^= GF.mul(divisor[i], coeff);
        }
        // remove all zeros from buffer head
        let offset = 0;
        while(offset < result.length && result[offset] === 0)offset++;
        result = result.slice(offset);
    }
    return result;
};
/**
 * Generate an irreducible generator polynomial of specified degree
 * (used by Reed-Solomon encoder)
 *
 * @param  {Number} degree Degree of the generator polynomial
 * @return {Uint8Array}    Buffer containing polynomial coefficients
 */ exports.generateECPolynomial = function generateECPolynomial(degree) {
    let poly = new Uint8Array([
        1
    ]);
    for(let i = 0; i < degree; i++){
        poly = exports.mul(poly, new Uint8Array([
            1,
            GF.exp(i)
        ]));
    }
    return poly;
};
}}),
"[project]/p2p-react/node_modules/qrcode/lib/core/reed-solomon-encoder.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const Polynomial = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/core/polynomial.js [app-ssr] (ecmascript)");
function ReedSolomonEncoder(degree) {
    this.genPoly = undefined;
    this.degree = degree;
    if (this.degree) this.initialize(this.degree);
}
/**
 * Initialize the encoder.
 * The input param should correspond to the number of error correction codewords.
 *
 * @param  {Number} degree
 */ ReedSolomonEncoder.prototype.initialize = function initialize(degree) {
    // create an irreducible generator polynomial
    this.degree = degree;
    this.genPoly = Polynomial.generateECPolynomial(this.degree);
};
/**
 * Encodes a chunk of data
 *
 * @param  {Uint8Array} data Buffer containing input data
 * @return {Uint8Array}      Buffer containing encoded data
 */ ReedSolomonEncoder.prototype.encode = function encode(data) {
    if (!this.genPoly) {
        throw new Error('Encoder not initialized');
    }
    // Calculate EC for this data block
    // extends data size to data+genPoly size
    const paddedData = new Uint8Array(data.length + this.degree);
    paddedData.set(data);
    // The error correction codewords are the remainder after dividing the data codewords
    // by a generator polynomial
    const remainder = Polynomial.mod(paddedData, this.genPoly);
    // return EC data blocks (last n byte, where n is the degree of genPoly)
    // If coefficients number in remainder are less than genPoly degree,
    // pad with 0s to the left to reach the needed number of coefficients
    const start = this.degree - remainder.length;
    if (start > 0) {
        const buff = new Uint8Array(this.degree);
        buff.set(remainder, start);
        return buff;
    }
    return remainder;
};
module.exports = ReedSolomonEncoder;
}}),
"[project]/p2p-react/node_modules/qrcode/lib/core/version-check.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
/**
 * Check if QR Code version is valid
 *
 * @param  {Number}  version QR Code version
 * @return {Boolean}         true if valid version, false otherwise
 */ exports.isValid = function isValid(version) {
    return !isNaN(version) && version >= 1 && version <= 40;
};
}}),
"[project]/p2p-react/node_modules/qrcode/lib/core/regex.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const numeric = '[0-9]+';
const alphanumeric = '[A-Z $%*+\\-./:]+';
let kanji = '(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|' + '[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|' + '[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|' + '[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+';
kanji = kanji.replace(/u/g, '\\u');
const byte = '(?:(?![A-Z0-9 $%*+\\-./:]|' + kanji + ')(?:.|[\r\n]))+';
exports.KANJI = new RegExp(kanji, 'g');
exports.BYTE_KANJI = new RegExp('[^A-Z0-9 $%*+\\-./:]+', 'g');
exports.BYTE = new RegExp(byte, 'g');
exports.NUMERIC = new RegExp(numeric, 'g');
exports.ALPHANUMERIC = new RegExp(alphanumeric, 'g');
const TEST_KANJI = new RegExp('^' + kanji + '$');
const TEST_NUMERIC = new RegExp('^' + numeric + '$');
const TEST_ALPHANUMERIC = new RegExp('^[A-Z0-9 $%*+\\-./:]+$');
exports.testKanji = function testKanji(str) {
    return TEST_KANJI.test(str);
};
exports.testNumeric = function testNumeric(str) {
    return TEST_NUMERIC.test(str);
};
exports.testAlphanumeric = function testAlphanumeric(str) {
    return TEST_ALPHANUMERIC.test(str);
};
}}),
"[project]/p2p-react/node_modules/qrcode/lib/core/mode.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const VersionCheck = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/core/version-check.js [app-ssr] (ecmascript)");
const Regex = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/core/regex.js [app-ssr] (ecmascript)");
/**
 * Numeric mode encodes data from the decimal digit set (0 - 9)
 * (byte values 30HEX to 39HEX).
 * Normally, 3 data characters are represented by 10 bits.
 *
 * @type {Object}
 */ exports.NUMERIC = {
    id: 'Numeric',
    bit: 1 << 0,
    ccBits: [
        10,
        12,
        14
    ]
};
/**
 * Alphanumeric mode encodes data from a set of 45 characters,
 * i.e. 10 numeric digits (0 - 9),
 *      26 alphabetic characters (A - Z),
 *   and 9 symbols (SP, $, %, *, +, -, ., /, :).
 * Normally, two input characters are represented by 11 bits.
 *
 * @type {Object}
 */ exports.ALPHANUMERIC = {
    id: 'Alphanumeric',
    bit: 1 << 1,
    ccBits: [
        9,
        11,
        13
    ]
};
/**
 * In byte mode, data is encoded at 8 bits per character.
 *
 * @type {Object}
 */ exports.BYTE = {
    id: 'Byte',
    bit: 1 << 2,
    ccBits: [
        8,
        16,
        16
    ]
};
/**
 * The Kanji mode efficiently encodes Kanji characters in accordance with
 * the Shift JIS system based on JIS X 0208.
 * The Shift JIS values are shifted from the JIS X 0208 values.
 * JIS X 0208 gives details of the shift coded representation.
 * Each two-byte character value is compacted to a 13-bit binary codeword.
 *
 * @type {Object}
 */ exports.KANJI = {
    id: 'Kanji',
    bit: 1 << 3,
    ccBits: [
        8,
        10,
        12
    ]
};
/**
 * Mixed mode will contain a sequences of data in a combination of any of
 * the modes described above
 *
 * @type {Object}
 */ exports.MIXED = {
    bit: -1
};
/**
 * Returns the number of bits needed to store the data length
 * according to QR Code specifications.
 *
 * @param  {Mode}   mode    Data mode
 * @param  {Number} version QR Code version
 * @return {Number}         Number of bits
 */ exports.getCharCountIndicator = function getCharCountIndicator(mode, version) {
    if (!mode.ccBits) throw new Error('Invalid mode: ' + mode);
    if (!VersionCheck.isValid(version)) {
        throw new Error('Invalid version: ' + version);
    }
    if (version >= 1 && version < 10) return mode.ccBits[0];
    else if (version < 27) return mode.ccBits[1];
    return mode.ccBits[2];
};
/**
 * Returns the most efficient mode to store the specified data
 *
 * @param  {String} dataStr Input data string
 * @return {Mode}           Best mode
 */ exports.getBestModeForData = function getBestModeForData(dataStr) {
    if (Regex.testNumeric(dataStr)) return exports.NUMERIC;
    else if (Regex.testAlphanumeric(dataStr)) return exports.ALPHANUMERIC;
    else if (Regex.testKanji(dataStr)) return exports.KANJI;
    else return exports.BYTE;
};
/**
 * Return mode name as string
 *
 * @param {Mode} mode Mode object
 * @returns {String}  Mode name
 */ exports.toString = function toString(mode) {
    if (mode && mode.id) return mode.id;
    throw new Error('Invalid mode');
};
/**
 * Check if input param is a valid mode object
 *
 * @param   {Mode}    mode Mode object
 * @returns {Boolean} True if valid mode, false otherwise
 */ exports.isValid = function isValid(mode) {
    return mode && mode.bit && mode.ccBits;
};
/**
 * Get mode object from its name
 *
 * @param   {String} string Mode name
 * @returns {Mode}          Mode object
 */ function fromString(string) {
    if (typeof string !== 'string') {
        throw new Error('Param is not a string');
    }
    const lcStr = string.toLowerCase();
    switch(lcStr){
        case 'numeric':
            return exports.NUMERIC;
        case 'alphanumeric':
            return exports.ALPHANUMERIC;
        case 'kanji':
            return exports.KANJI;
        case 'byte':
            return exports.BYTE;
        default:
            throw new Error('Unknown mode: ' + string);
    }
}
/**
 * Returns mode from a value.
 * If value is not a valid mode, returns defaultValue
 *
 * @param  {Mode|String} value        Encoding mode
 * @param  {Mode}        defaultValue Fallback value
 * @return {Mode}                     Encoding mode
 */ exports.from = function from(value, defaultValue) {
    if (exports.isValid(value)) {
        return value;
    }
    try {
        return fromString(value);
    } catch (e) {
        return defaultValue;
    }
};
}}),
"[project]/p2p-react/node_modules/qrcode/lib/core/version.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const Utils = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/core/utils.js [app-ssr] (ecmascript)");
const ECCode = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/core/error-correction-code.js [app-ssr] (ecmascript)");
const ECLevel = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/core/error-correction-level.js [app-ssr] (ecmascript)");
const Mode = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/core/mode.js [app-ssr] (ecmascript)");
const VersionCheck = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/core/version-check.js [app-ssr] (ecmascript)");
// Generator polynomial used to encode version information
const G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
const G18_BCH = Utils.getBCHDigit(G18);
function getBestVersionForDataLength(mode, length, errorCorrectionLevel) {
    for(let currentVersion = 1; currentVersion <= 40; currentVersion++){
        if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) {
            return currentVersion;
        }
    }
    return undefined;
}
function getReservedBitsCount(mode, version) {
    // Character count indicator + mode indicator bits
    return Mode.getCharCountIndicator(mode, version) + 4;
}
function getTotalBitsFromDataArray(segments, version) {
    let totalBits = 0;
    segments.forEach(function(data) {
        const reservedBits = getReservedBitsCount(data.mode, version);
        totalBits += reservedBits + data.getBitsLength();
    });
    return totalBits;
}
function getBestVersionForMixedData(segments, errorCorrectionLevel) {
    for(let currentVersion = 1; currentVersion <= 40; currentVersion++){
        const length = getTotalBitsFromDataArray(segments, currentVersion);
        if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, Mode.MIXED)) {
            return currentVersion;
        }
    }
    return undefined;
}
/**
 * Returns version number from a value.
 * If value is not a valid version, returns defaultValue
 *
 * @param  {Number|String} value        QR Code version
 * @param  {Number}        defaultValue Fallback value
 * @return {Number}                     QR Code version number
 */ exports.from = function from(value, defaultValue) {
    if (VersionCheck.isValid(value)) {
        return parseInt(value, 10);
    }
    return defaultValue;
};
/**
 * Returns how much data can be stored with the specified QR code version
 * and error correction level
 *
 * @param  {Number} version              QR Code version (1-40)
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Mode}   mode                 Data mode
 * @return {Number}                      Quantity of storable data
 */ exports.getCapacity = function getCapacity(version, errorCorrectionLevel, mode) {
    if (!VersionCheck.isValid(version)) {
        throw new Error('Invalid QR Code version');
    }
    // Use Byte mode as default
    if (typeof mode === 'undefined') mode = Mode.BYTE;
    // Total codewords for this QR code version (Data + Error correction)
    const totalCodewords = Utils.getSymbolTotalCodewords(version);
    // Total number of error correction codewords
    const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
    // Total number of data codewords
    const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
    if (mode === Mode.MIXED) return dataTotalCodewordsBits;
    const usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version);
    // Return max number of storable codewords
    switch(mode){
        case Mode.NUMERIC:
            return Math.floor(usableBits / 10 * 3);
        case Mode.ALPHANUMERIC:
            return Math.floor(usableBits / 11 * 2);
        case Mode.KANJI:
            return Math.floor(usableBits / 13);
        case Mode.BYTE:
        default:
            return Math.floor(usableBits / 8);
    }
};
/**
 * Returns the minimum version needed to contain the amount of data
 *
 * @param  {Segment} data                    Segment of data
 * @param  {Number} [errorCorrectionLevel=H] Error correction level
 * @param  {Mode} mode                       Data mode
 * @return {Number}                          QR Code version
 */ exports.getBestVersionForData = function getBestVersionForData(data, errorCorrectionLevel) {
    let seg;
    const ecl = ECLevel.from(errorCorrectionLevel, ECLevel.M);
    if (Array.isArray(data)) {
        if (data.length > 1) {
            return getBestVersionForMixedData(data, ecl);
        }
        if (data.length === 0) {
            return 1;
        }
        seg = data[0];
    } else {
        seg = data;
    }
    return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl);
};
/**
 * Returns version information with relative error correction bits
 *
 * The version information is included in QR Code symbols of version 7 or larger.
 * It consists of an 18-bit sequence containing 6 data bits,
 * with 12 error correction bits calculated using the (18, 6) Golay code.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Encoded version info bits
 */ exports.getEncodedBits = function getEncodedBits(version) {
    if (!VersionCheck.isValid(version) || version < 7) {
        throw new Error('Invalid QR Code version');
    }
    let d = version << 12;
    while(Utils.getBCHDigit(d) - G18_BCH >= 0){
        d ^= G18 << Utils.getBCHDigit(d) - G18_BCH;
    }
    return version << 12 | d;
};
}}),
"[project]/p2p-react/node_modules/qrcode/lib/core/format-info.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const Utils = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/core/utils.js [app-ssr] (ecmascript)");
const G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
const G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
const G15_BCH = Utils.getBCHDigit(G15);
/**
 * Returns format information with relative error correction bits
 *
 * The format information is a 15-bit sequence containing 5 data bits,
 * with 10 error correction bits calculated using the (15, 5) BCH code.
 *
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Number} mask                 Mask pattern
 * @return {Number}                      Encoded format information bits
 */ exports.getEncodedBits = function getEncodedBits(errorCorrectionLevel, mask) {
    const data = errorCorrectionLevel.bit << 3 | mask;
    let d = data << 10;
    while(Utils.getBCHDigit(d) - G15_BCH >= 0){
        d ^= G15 << Utils.getBCHDigit(d) - G15_BCH;
    }
    // xor final data with mask pattern in order to ensure that
    // no combination of Error Correction Level and data mask pattern
    // will result in an all-zero data string
    return (data << 10 | d) ^ G15_MASK;
};
}}),
"[project]/p2p-react/node_modules/qrcode/lib/core/numeric-data.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const Mode = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/core/mode.js [app-ssr] (ecmascript)");
function NumericData(data) {
    this.mode = Mode.NUMERIC;
    this.data = data.toString();
}
NumericData.getBitsLength = function getBitsLength(length) {
    return 10 * Math.floor(length / 3) + (length % 3 ? length % 3 * 3 + 1 : 0);
};
NumericData.prototype.getLength = function getLength() {
    return this.data.length;
};
NumericData.prototype.getBitsLength = function getBitsLength() {
    return NumericData.getBitsLength(this.data.length);
};
NumericData.prototype.write = function write(bitBuffer) {
    let i, group, value;
    // The input data string is divided into groups of three digits,
    // and each group is converted to its 10-bit binary equivalent.
    for(i = 0; i + 3 <= this.data.length; i += 3){
        group = this.data.substr(i, 3);
        value = parseInt(group, 10);
        bitBuffer.put(value, 10);
    }
    // If the number of input digits is not an exact multiple of three,
    // the final one or two digits are converted to 4 or 7 bits respectively.
    const remainingNum = this.data.length - i;
    if (remainingNum > 0) {
        group = this.data.substr(i);
        value = parseInt(group, 10);
        bitBuffer.put(value, remainingNum * 3 + 1);
    }
};
module.exports = NumericData;
}}),
"[project]/p2p-react/node_modules/qrcode/lib/core/alphanumeric-data.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const Mode = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/core/mode.js [app-ssr] (ecmascript)");
/**
 * Array of characters available in alphanumeric mode
 *
 * As per QR Code specification, to each character
 * is assigned a value from 0 to 44 which in this case coincides
 * with the array index
 *
 * @type {Array}
 */ const ALPHA_NUM_CHARS = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    ' ',
    '$',
    '%',
    '*',
    '+',
    '-',
    '.',
    '/',
    ':'
];
function AlphanumericData(data) {
    this.mode = Mode.ALPHANUMERIC;
    this.data = data;
}
AlphanumericData.getBitsLength = function getBitsLength(length) {
    return 11 * Math.floor(length / 2) + 6 * (length % 2);
};
AlphanumericData.prototype.getLength = function getLength() {
    return this.data.length;
};
AlphanumericData.prototype.getBitsLength = function getBitsLength() {
    return AlphanumericData.getBitsLength(this.data.length);
};
AlphanumericData.prototype.write = function write(bitBuffer) {
    let i;
    // Input data characters are divided into groups of two characters
    // and encoded as 11-bit binary codes.
    for(i = 0; i + 2 <= this.data.length; i += 2){
        // The character value of the first character is multiplied by 45
        let value = ALPHA_NUM_CHARS.indexOf(this.data[i]) * 45;
        // The character value of the second digit is added to the product
        value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1]);
        // The sum is then stored as 11-bit binary number
        bitBuffer.put(value, 11);
    }
    // If the number of input data characters is not a multiple of two,
    // the character value of the final character is encoded as a 6-bit binary number.
    if (this.data.length % 2) {
        bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6);
    }
};
module.exports = AlphanumericData;
}}),
"[project]/p2p-react/node_modules/qrcode/lib/core/byte-data.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const Mode = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/core/mode.js [app-ssr] (ecmascript)");
function ByteData(data) {
    this.mode = Mode.BYTE;
    if (typeof data === 'string') {
        this.data = new TextEncoder().encode(data);
    } else {
        this.data = new Uint8Array(data);
    }
}
ByteData.getBitsLength = function getBitsLength(length) {
    return length * 8;
};
ByteData.prototype.getLength = function getLength() {
    return this.data.length;
};
ByteData.prototype.getBitsLength = function getBitsLength() {
    return ByteData.getBitsLength(this.data.length);
};
ByteData.prototype.write = function(bitBuffer) {
    for(let i = 0, l = this.data.length; i < l; i++){
        bitBuffer.put(this.data[i], 8);
    }
};
module.exports = ByteData;
}}),
"[project]/p2p-react/node_modules/qrcode/lib/core/kanji-data.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const Mode = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/core/mode.js [app-ssr] (ecmascript)");
const Utils = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/core/utils.js [app-ssr] (ecmascript)");
function KanjiData(data) {
    this.mode = Mode.KANJI;
    this.data = data;
}
KanjiData.getBitsLength = function getBitsLength(length) {
    return length * 13;
};
KanjiData.prototype.getLength = function getLength() {
    return this.data.length;
};
KanjiData.prototype.getBitsLength = function getBitsLength() {
    return KanjiData.getBitsLength(this.data.length);
};
KanjiData.prototype.write = function(bitBuffer) {
    let i;
    // In the Shift JIS system, Kanji characters are represented by a two byte combination.
    // These byte values are shifted from the JIS X 0208 values.
    // JIS X 0208 gives details of the shift coded representation.
    for(i = 0; i < this.data.length; i++){
        let value = Utils.toSJIS(this.data[i]);
        // For characters with Shift JIS values from 0x8140 to 0x9FFC:
        if (value >= 0x8140 && value <= 0x9FFC) {
            // Subtract 0x8140 from Shift JIS value
            value -= 0x8140;
        // For characters with Shift JIS values from 0xE040 to 0xEBBF
        } else if (value >= 0xE040 && value <= 0xEBBF) {
            // Subtract 0xC140 from Shift JIS value
            value -= 0xC140;
        } else {
            throw new Error('Invalid SJIS character: ' + this.data[i] + '\n' + 'Make sure your charset is UTF-8');
        }
        // Multiply most significant byte of result by 0xC0
        // and add least significant byte to product
        value = (value >>> 8 & 0xff) * 0xC0 + (value & 0xff);
        // Convert result to a 13-bit binary string
        bitBuffer.put(value, 13);
    }
};
module.exports = KanjiData;
}}),
"[project]/p2p-react/node_modules/qrcode/lib/core/segments.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const Mode = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/core/mode.js [app-ssr] (ecmascript)");
const NumericData = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/core/numeric-data.js [app-ssr] (ecmascript)");
const AlphanumericData = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/core/alphanumeric-data.js [app-ssr] (ecmascript)");
const ByteData = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/core/byte-data.js [app-ssr] (ecmascript)");
const KanjiData = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/core/kanji-data.js [app-ssr] (ecmascript)");
const Regex = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/core/regex.js [app-ssr] (ecmascript)");
const Utils = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/core/utils.js [app-ssr] (ecmascript)");
const dijkstra = __turbopack_context__.r("[project]/p2p-react/node_modules/dijkstrajs/dijkstra.js [app-ssr] (ecmascript)");
/**
 * Returns UTF8 byte length
 *
 * @param  {String} str Input string
 * @return {Number}     Number of byte
 */ function getStringByteLength(str) {
    return unescape(encodeURIComponent(str)).length;
}
/**
 * Get a list of segments of the specified mode
 * from a string
 *
 * @param  {Mode}   mode Segment mode
 * @param  {String} str  String to process
 * @return {Array}       Array of object with segments data
 */ function getSegments(regex, mode, str) {
    const segments = [];
    let result;
    while((result = regex.exec(str)) !== null){
        segments.push({
            data: result[0],
            index: result.index,
            mode: mode,
            length: result[0].length
        });
    }
    return segments;
}
/**
 * Extracts a series of segments with the appropriate
 * modes from a string
 *
 * @param  {String} dataStr Input string
 * @return {Array}          Array of object with segments data
 */ function getSegmentsFromString(dataStr) {
    const numSegs = getSegments(Regex.NUMERIC, Mode.NUMERIC, dataStr);
    const alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode.ALPHANUMERIC, dataStr);
    let byteSegs;
    let kanjiSegs;
    if (Utils.isKanjiModeEnabled()) {
        byteSegs = getSegments(Regex.BYTE, Mode.BYTE, dataStr);
        kanjiSegs = getSegments(Regex.KANJI, Mode.KANJI, dataStr);
    } else {
        byteSegs = getSegments(Regex.BYTE_KANJI, Mode.BYTE, dataStr);
        kanjiSegs = [];
    }
    const segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs);
    return segs.sort(function(s1, s2) {
        return s1.index - s2.index;
    }).map(function(obj) {
        return {
            data: obj.data,
            mode: obj.mode,
            length: obj.length
        };
    });
}
/**
 * Returns how many bits are needed to encode a string of
 * specified length with the specified mode
 *
 * @param  {Number} length String length
 * @param  {Mode} mode     Segment mode
 * @return {Number}        Bit length
 */ function getSegmentBitsLength(length, mode) {
    switch(mode){
        case Mode.NUMERIC:
            return NumericData.getBitsLength(length);
        case Mode.ALPHANUMERIC:
            return AlphanumericData.getBitsLength(length);
        case Mode.KANJI:
            return KanjiData.getBitsLength(length);
        case Mode.BYTE:
            return ByteData.getBitsLength(length);
    }
}
/**
 * Merges adjacent segments which have the same mode
 *
 * @param  {Array} segs Array of object with segments data
 * @return {Array}      Array of object with segments data
 */ function mergeSegments(segs) {
    return segs.reduce(function(acc, curr) {
        const prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null;
        if (prevSeg && prevSeg.mode === curr.mode) {
            acc[acc.length - 1].data += curr.data;
            return acc;
        }
        acc.push(curr);
        return acc;
    }, []);
}
/**
 * Generates a list of all possible nodes combination which
 * will be used to build a segments graph.
 *
 * Nodes are divided by groups. Each group will contain a list of all the modes
 * in which is possible to encode the given text.
 *
 * For example the text '12345' can be encoded as Numeric, Alphanumeric or Byte.
 * The group for '12345' will contain then 3 objects, one for each
 * possible encoding mode.
 *
 * Each node represents a possible segment.
 *
 * @param  {Array} segs Array of object with segments data
 * @return {Array}      Array of object with segments data
 */ function buildNodes(segs) {
    const nodes = [];
    for(let i = 0; i < segs.length; i++){
        const seg = segs[i];
        switch(seg.mode){
            case Mode.NUMERIC:
                nodes.push([
                    seg,
                    {
                        data: seg.data,
                        mode: Mode.ALPHANUMERIC,
                        length: seg.length
                    },
                    {
                        data: seg.data,
                        mode: Mode.BYTE,
                        length: seg.length
                    }
                ]);
                break;
            case Mode.ALPHANUMERIC:
                nodes.push([
                    seg,
                    {
                        data: seg.data,
                        mode: Mode.BYTE,
                        length: seg.length
                    }
                ]);
                break;
            case Mode.KANJI:
                nodes.push([
                    seg,
                    {
                        data: seg.data,
                        mode: Mode.BYTE,
                        length: getStringByteLength(seg.data)
                    }
                ]);
                break;
            case Mode.BYTE:
                nodes.push([
                    {
                        data: seg.data,
                        mode: Mode.BYTE,
                        length: getStringByteLength(seg.data)
                    }
                ]);
        }
    }
    return nodes;
}
/**
 * Builds a graph from a list of nodes.
 * All segments in each node group will be connected with all the segments of
 * the next group and so on.
 *
 * At each connection will be assigned a weight depending on the
 * segment's byte length.
 *
 * @param  {Array} nodes    Array of object with segments data
 * @param  {Number} version QR Code version
 * @return {Object}         Graph of all possible segments
 */ function buildGraph(nodes, version) {
    const table = {};
    const graph = {
        start: {}
    };
    let prevNodeIds = [
        'start'
    ];
    for(let i = 0; i < nodes.length; i++){
        const nodeGroup = nodes[i];
        const currentNodeIds = [];
        for(let j = 0; j < nodeGroup.length; j++){
            const node = nodeGroup[j];
            const key = '' + i + j;
            currentNodeIds.push(key);
            table[key] = {
                node: node,
                lastCount: 0
            };
            graph[key] = {};
            for(let n = 0; n < prevNodeIds.length; n++){
                const prevNodeId = prevNodeIds[n];
                if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
                    graph[prevNodeId][key] = getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) - getSegmentBitsLength(table[prevNodeId].lastCount, node.mode);
                    table[prevNodeId].lastCount += node.length;
                } else {
                    if (table[prevNodeId]) table[prevNodeId].lastCount = node.length;
                    graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) + 4 + Mode.getCharCountIndicator(node.mode, version); // switch cost
                }
            }
        }
        prevNodeIds = currentNodeIds;
    }
    for(let n = 0; n < prevNodeIds.length; n++){
        graph[prevNodeIds[n]].end = 0;
    }
    return {
        map: graph,
        table: table
    };
}
/**
 * Builds a segment from a specified data and mode.
 * If a mode is not specified, the more suitable will be used.
 *
 * @param  {String} data             Input data
 * @param  {Mode | String} modesHint Data mode
 * @return {Segment}                 Segment
 */ function buildSingleSegment(data, modesHint) {
    let mode;
    const bestMode = Mode.getBestModeForData(data);
    mode = Mode.from(modesHint, bestMode);
    // Make sure data can be encoded
    if (mode !== Mode.BYTE && mode.bit < bestMode.bit) {
        throw new Error('"' + data + '"' + ' cannot be encoded with mode ' + Mode.toString(mode) + '.\n Suggested mode is: ' + Mode.toString(bestMode));
    }
    // Use Mode.BYTE if Kanji support is disabled
    if (mode === Mode.KANJI && !Utils.isKanjiModeEnabled()) {
        mode = Mode.BYTE;
    }
    switch(mode){
        case Mode.NUMERIC:
            return new NumericData(data);
        case Mode.ALPHANUMERIC:
            return new AlphanumericData(data);
        case Mode.KANJI:
            return new KanjiData(data);
        case Mode.BYTE:
            return new ByteData(data);
    }
}
/**
 * Builds a list of segments from an array.
 * Array can contain Strings or Objects with segment's info.
 *
 * For each item which is a string, will be generated a segment with the given
 * string and the more appropriate encoding mode.
 *
 * For each item which is an object, will be generated a segment with the given
 * data and mode.
 * Objects must contain at least the property "data".
 * If property "mode" is not present, the more suitable mode will be used.
 *
 * @param  {Array} array Array of objects with segments data
 * @return {Array}       Array of Segments
 */ exports.fromArray = function fromArray(array) {
    return array.reduce(function(acc, seg) {
        if (typeof seg === 'string') {
            acc.push(buildSingleSegment(seg, null));
        } else if (seg.data) {
            acc.push(buildSingleSegment(seg.data, seg.mode));
        }
        return acc;
    }, []);
};
/**
 * Builds an optimized sequence of segments from a string,
 * which will produce the shortest possible bitstream.
 *
 * @param  {String} data    Input string
 * @param  {Number} version QR Code version
 * @return {Array}          Array of segments
 */ exports.fromString = function fromString(data, version) {
    const segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled());
    const nodes = buildNodes(segs);
    const graph = buildGraph(nodes, version);
    const path = dijkstra.find_path(graph.map, 'start', 'end');
    const optimizedSegs = [];
    for(let i = 1; i < path.length - 1; i++){
        optimizedSegs.push(graph.table[path[i]].node);
    }
    return exports.fromArray(mergeSegments(optimizedSegs));
};
/**
 * Splits a string in various segments with the modes which
 * best represent their content.
 * The produced segments are far from being optimized.
 * The output of this function is only used to estimate a QR Code version
 * which may contain the data.
 *
 * @param  {string} data Input string
 * @return {Array}       Array of segments
 */ exports.rawSplit = function rawSplit(data) {
    return exports.fromArray(getSegmentsFromString(data, Utils.isKanjiModeEnabled()));
};
}}),
"[project]/p2p-react/node_modules/qrcode/lib/core/qrcode.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const Utils = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/core/utils.js [app-ssr] (ecmascript)");
const ECLevel = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/core/error-correction-level.js [app-ssr] (ecmascript)");
const BitBuffer = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/core/bit-buffer.js [app-ssr] (ecmascript)");
const BitMatrix = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/core/bit-matrix.js [app-ssr] (ecmascript)");
const AlignmentPattern = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/core/alignment-pattern.js [app-ssr] (ecmascript)");
const FinderPattern = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/core/finder-pattern.js [app-ssr] (ecmascript)");
const MaskPattern = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/core/mask-pattern.js [app-ssr] (ecmascript)");
const ECCode = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/core/error-correction-code.js [app-ssr] (ecmascript)");
const ReedSolomonEncoder = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/core/reed-solomon-encoder.js [app-ssr] (ecmascript)");
const Version = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/core/version.js [app-ssr] (ecmascript)");
const FormatInfo = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/core/format-info.js [app-ssr] (ecmascript)");
const Mode = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/core/mode.js [app-ssr] (ecmascript)");
const Segments = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/core/segments.js [app-ssr] (ecmascript)");
/**
 * QRCode for JavaScript
 *
 * modified by Ryan Day for nodejs support
 * Copyright (c) 2011 Ryan Day
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
//---------------------------------------------------------------------
// QRCode for JavaScript
//
// Copyright (c) 2009 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//   http://www.opensource.org/licenses/mit-license.php
//
// The word "QR Code" is registered trademark of
// DENSO WAVE INCORPORATED
//   http://www.denso-wave.com/qrcode/faqpatent-e.html
//
//---------------------------------------------------------------------
*/ /**
 * Add finder patterns bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */ function setupFinderPattern(matrix, version) {
    const size = matrix.size;
    const pos = FinderPattern.getPositions(version);
    for(let i = 0; i < pos.length; i++){
        const row = pos[i][0];
        const col = pos[i][1];
        for(let r = -1; r <= 7; r++){
            if (row + r <= -1 || size <= row + r) continue;
            for(let c = -1; c <= 7; c++){
                if (col + c <= -1 || size <= col + c) continue;
                if (r >= 0 && r <= 6 && (c === 0 || c === 6) || c >= 0 && c <= 6 && (r === 0 || r === 6) || r >= 2 && r <= 4 && c >= 2 && c <= 4) {
                    matrix.set(row + r, col + c, true, true);
                } else {
                    matrix.set(row + r, col + c, false, true);
                }
            }
        }
    }
}
/**
 * Add timing pattern bits to matrix
 *
 * Note: this function must be called before {@link setupAlignmentPattern}
 *
 * @param  {BitMatrix} matrix Modules matrix
 */ function setupTimingPattern(matrix) {
    const size = matrix.size;
    for(let r = 8; r < size - 8; r++){
        const value = r % 2 === 0;
        matrix.set(r, 6, value, true);
        matrix.set(6, r, value, true);
    }
}
/**
 * Add alignment patterns bits to matrix
 *
 * Note: this function must be called after {@link setupTimingPattern}
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */ function setupAlignmentPattern(matrix, version) {
    const pos = AlignmentPattern.getPositions(version);
    for(let i = 0; i < pos.length; i++){
        const row = pos[i][0];
        const col = pos[i][1];
        for(let r = -2; r <= 2; r++){
            for(let c = -2; c <= 2; c++){
                if (r === -2 || r === 2 || c === -2 || c === 2 || r === 0 && c === 0) {
                    matrix.set(row + r, col + c, true, true);
                } else {
                    matrix.set(row + r, col + c, false, true);
                }
            }
        }
    }
}
/**
 * Add version info bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */ function setupVersionInfo(matrix, version) {
    const size = matrix.size;
    const bits = Version.getEncodedBits(version);
    let row, col, mod;
    for(let i = 0; i < 18; i++){
        row = Math.floor(i / 3);
        col = i % 3 + size - 8 - 3;
        mod = (bits >> i & 1) === 1;
        matrix.set(row, col, mod, true);
        matrix.set(col, row, mod, true);
    }
}
/**
 * Add format info bits to matrix
 *
 * @param  {BitMatrix} matrix               Modules matrix
 * @param  {ErrorCorrectionLevel}    errorCorrectionLevel Error correction level
 * @param  {Number}    maskPattern          Mask pattern reference value
 */ function setupFormatInfo(matrix, errorCorrectionLevel, maskPattern) {
    const size = matrix.size;
    const bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern);
    let i, mod;
    for(i = 0; i < 15; i++){
        mod = (bits >> i & 1) === 1;
        // vertical
        if (i < 6) {
            matrix.set(i, 8, mod, true);
        } else if (i < 8) {
            matrix.set(i + 1, 8, mod, true);
        } else {
            matrix.set(size - 15 + i, 8, mod, true);
        }
        // horizontal
        if (i < 8) {
            matrix.set(8, size - i - 1, mod, true);
        } else if (i < 9) {
            matrix.set(8, 15 - i - 1 + 1, mod, true);
        } else {
            matrix.set(8, 15 - i - 1, mod, true);
        }
    }
    // fixed module
    matrix.set(size - 8, 8, 1, true);
}
/**
 * Add encoded data bits to matrix
 *
 * @param  {BitMatrix}  matrix Modules matrix
 * @param  {Uint8Array} data   Data codewords
 */ function setupData(matrix, data) {
    const size = matrix.size;
    let inc = -1;
    let row = size - 1;
    let bitIndex = 7;
    let byteIndex = 0;
    for(let col = size - 1; col > 0; col -= 2){
        if (col === 6) col--;
        while(true){
            for(let c = 0; c < 2; c++){
                if (!matrix.isReserved(row, col - c)) {
                    let dark = false;
                    if (byteIndex < data.length) {
                        dark = (data[byteIndex] >>> bitIndex & 1) === 1;
                    }
                    matrix.set(row, col - c, dark);
                    bitIndex--;
                    if (bitIndex === -1) {
                        byteIndex++;
                        bitIndex = 7;
                    }
                }
            }
            row += inc;
            if (row < 0 || size <= row) {
                row -= inc;
                inc = -inc;
                break;
            }
        }
    }
}
/**
 * Create encoded codewords from data input
 *
 * @param  {Number}   version              QR Code version
 * @param  {ErrorCorrectionLevel}   errorCorrectionLevel Error correction level
 * @param  {ByteData} data                 Data input
 * @return {Uint8Array}                    Buffer containing encoded codewords
 */ function createData(version, errorCorrectionLevel, segments) {
    // Prepare data buffer
    const buffer = new BitBuffer();
    segments.forEach(function(data) {
        // prefix data with mode indicator (4 bits)
        buffer.put(data.mode.bit, 4);
        // Prefix data with character count indicator.
        // The character count indicator is a string of bits that represents the
        // number of characters that are being encoded.
        // The character count indicator must be placed after the mode indicator
        // and must be a certain number of bits long, depending on the QR version
        // and data mode
        // @see {@link Mode.getCharCountIndicator}.
        buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version));
        // add binary data sequence to buffer
        data.write(buffer);
    });
    // Calculate required number of bits
    const totalCodewords = Utils.getSymbolTotalCodewords(version);
    const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
    const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
    // Add a terminator.
    // If the bit string is shorter than the total number of required bits,
    // a terminator of up to four 0s must be added to the right side of the string.
    // If the bit string is more than four bits shorter than the required number of bits,
    // add four 0s to the end.
    if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
        buffer.put(0, 4);
    }
    // If the bit string is fewer than four bits shorter, add only the number of 0s that
    // are needed to reach the required number of bits.
    // After adding the terminator, if the number of bits in the string is not a multiple of 8,
    // pad the string on the right with 0s to make the string's length a multiple of 8.
    while(buffer.getLengthInBits() % 8 !== 0){
        buffer.putBit(0);
    }
    // Add pad bytes if the string is still shorter than the total number of required bits.
    // Extend the buffer to fill the data capacity of the symbol corresponding to
    // the Version and Error Correction Level by adding the Pad Codewords 11101100 (0xEC)
    // and 00010001 (0x11) alternately.
    const remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;
    for(let i = 0; i < remainingByte; i++){
        buffer.put(i % 2 ? 0x11 : 0xEC, 8);
    }
    return createCodewords(buffer, version, errorCorrectionLevel);
}
/**
 * Encode input data with Reed-Solomon and return codewords with
 * relative error correction bits
 *
 * @param  {BitBuffer} bitBuffer            Data to encode
 * @param  {Number}    version              QR Code version
 * @param  {ErrorCorrectionLevel} errorCorrectionLevel Error correction level
 * @return {Uint8Array}                     Buffer containing encoded codewords
 */ function createCodewords(bitBuffer, version, errorCorrectionLevel) {
    // Total codewords for this QR code version (Data + Error correction)
    const totalCodewords = Utils.getSymbolTotalCodewords(version);
    // Total number of error correction codewords
    const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
    // Total number of data codewords
    const dataTotalCodewords = totalCodewords - ecTotalCodewords;
    // Total number of blocks
    const ecTotalBlocks = ECCode.getBlocksCount(version, errorCorrectionLevel);
    // Calculate how many blocks each group should contain
    const blocksInGroup2 = totalCodewords % ecTotalBlocks;
    const blocksInGroup1 = ecTotalBlocks - blocksInGroup2;
    const totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);
    const dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);
    const dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1;
    // Number of EC codewords is the same for both groups
    const ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1;
    // Initialize a Reed-Solomon encoder with a generator polynomial of degree ecCount
    const rs = new ReedSolomonEncoder(ecCount);
    let offset = 0;
    const dcData = new Array(ecTotalBlocks);
    const ecData = new Array(ecTotalBlocks);
    let maxDataSize = 0;
    const buffer = new Uint8Array(bitBuffer.buffer);
    // Divide the buffer into the required number of blocks
    for(let b = 0; b < ecTotalBlocks; b++){
        const dataSize = b < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;
        // extract a block of data from buffer
        dcData[b] = buffer.slice(offset, offset + dataSize);
        // Calculate EC codewords for this data block
        ecData[b] = rs.encode(dcData[b]);
        offset += dataSize;
        maxDataSize = Math.max(maxDataSize, dataSize);
    }
    // Create final data
    // Interleave the data and error correction codewords from each block
    const data = new Uint8Array(totalCodewords);
    let index = 0;
    let i, r;
    // Add data codewords
    for(i = 0; i < maxDataSize; i++){
        for(r = 0; r < ecTotalBlocks; r++){
            if (i < dcData[r].length) {
                data[index++] = dcData[r][i];
            }
        }
    }
    // Apped EC codewords
    for(i = 0; i < ecCount; i++){
        for(r = 0; r < ecTotalBlocks; r++){
            data[index++] = ecData[r][i];
        }
    }
    return data;
}
/**
 * Build QR Code symbol
 *
 * @param  {String} data                 Input string
 * @param  {Number} version              QR Code version
 * @param  {ErrorCorretionLevel} errorCorrectionLevel Error level
 * @param  {MaskPattern} maskPattern     Mask pattern
 * @return {Object}                      Object containing symbol data
 */ function createSymbol(data, version, errorCorrectionLevel, maskPattern) {
    let segments;
    if (Array.isArray(data)) {
        segments = Segments.fromArray(data);
    } else if (typeof data === 'string') {
        let estimatedVersion = version;
        if (!estimatedVersion) {
            const rawSegments = Segments.rawSplit(data);
            // Estimate best version that can contain raw splitted segments
            estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel);
        }
        // Build optimized segments
        // If estimated version is undefined, try with the highest version
        segments = Segments.fromString(data, estimatedVersion || 40);
    } else {
        throw new Error('Invalid data');
    }
    // Get the min version that can contain data
    const bestVersion = Version.getBestVersionForData(segments, errorCorrectionLevel);
    // If no version is found, data cannot be stored
    if (!bestVersion) {
        throw new Error('The amount of data is too big to be stored in a QR Code');
    }
    // If not specified, use min version as default
    if (!version) {
        version = bestVersion;
    // Check if the specified version can contain the data
    } else if (version < bestVersion) {
        throw new Error('\n' + 'The chosen QR Code version cannot contain this amount of data.\n' + 'Minimum version required to store current data is: ' + bestVersion + '.\n');
    }
    const dataBits = createData(version, errorCorrectionLevel, segments);
    // Allocate matrix buffer
    const moduleCount = Utils.getSymbolSize(version);
    const modules = new BitMatrix(moduleCount);
    // Add function modules
    setupFinderPattern(modules, version);
    setupTimingPattern(modules);
    setupAlignmentPattern(modules, version);
    // Add temporary dummy bits for format info just to set them as reserved.
    // This is needed to prevent these bits from being masked by {@link MaskPattern.applyMask}
    // since the masking operation must be performed only on the encoding region.
    // These blocks will be replaced with correct values later in code.
    setupFormatInfo(modules, errorCorrectionLevel, 0);
    if (version >= 7) {
        setupVersionInfo(modules, version);
    }
    // Add data codewords
    setupData(modules, dataBits);
    if (isNaN(maskPattern)) {
        // Find best mask pattern
        maskPattern = MaskPattern.getBestMask(modules, setupFormatInfo.bind(null, modules, errorCorrectionLevel));
    }
    // Apply mask pattern
    MaskPattern.applyMask(maskPattern, modules);
    // Replace format info bits with correct values
    setupFormatInfo(modules, errorCorrectionLevel, maskPattern);
    return {
        modules: modules,
        version: version,
        errorCorrectionLevel: errorCorrectionLevel,
        maskPattern: maskPattern,
        segments: segments
    };
}
/**
 * QR Code
 *
 * @param {String | Array} data                 Input data
 * @param {Object} options                      Optional configurations
 * @param {Number} options.version              QR Code version
 * @param {String} options.errorCorrectionLevel Error correction level
 * @param {Function} options.toSJISFunc         Helper func to convert utf8 to sjis
 */ exports.create = function create(data, options) {
    if (typeof data === 'undefined' || data === '') {
        throw new Error('No input text');
    }
    let errorCorrectionLevel = ECLevel.M;
    let version;
    let mask;
    if (typeof options !== 'undefined') {
        // Use higher error correction level as default
        errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M);
        version = Version.from(options.version);
        mask = MaskPattern.from(options.maskPattern);
        if (options.toSJISFunc) {
            Utils.setToSJISFunction(options.toSJISFunc);
        }
    }
    return createSymbol(data, version, errorCorrectionLevel, mask);
};
}}),
"[project]/p2p-react/node_modules/qrcode/lib/renderer/utils.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
function hex2rgba(hex) {
    if (typeof hex === 'number') {
        hex = hex.toString();
    }
    if (typeof hex !== 'string') {
        throw new Error('Color should be defined as hex string');
    }
    let hexCode = hex.slice().replace('#', '').split('');
    if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
        throw new Error('Invalid hex color: ' + hex);
    }
    // Convert from short to long form (fff -> ffffff)
    if (hexCode.length === 3 || hexCode.length === 4) {
        hexCode = Array.prototype.concat.apply([], hexCode.map(function(c) {
            return [
                c,
                c
            ];
        }));
    }
    // Add default alpha value
    if (hexCode.length === 6) hexCode.push('F', 'F');
    const hexValue = parseInt(hexCode.join(''), 16);
    return {
        r: hexValue >> 24 & 255,
        g: hexValue >> 16 & 255,
        b: hexValue >> 8 & 255,
        a: hexValue & 255,
        hex: '#' + hexCode.slice(0, 6).join('')
    };
}
exports.getOptions = function getOptions(options) {
    if (!options) options = {};
    if (!options.color) options.color = {};
    const margin = typeof options.margin === 'undefined' || options.margin === null || options.margin < 0 ? 4 : options.margin;
    const width = options.width && options.width >= 21 ? options.width : undefined;
    const scale = options.scale || 4;
    return {
        width: width,
        scale: width ? 4 : scale,
        margin: margin,
        color: {
            dark: hex2rgba(options.color.dark || '#000000ff'),
            light: hex2rgba(options.color.light || '#ffffffff')
        },
        type: options.type,
        rendererOpts: options.rendererOpts || {}
    };
};
exports.getScale = function getScale(qrSize, opts) {
    return opts.width && opts.width >= qrSize + opts.margin * 2 ? opts.width / (qrSize + opts.margin * 2) : opts.scale;
};
exports.getImageWidth = function getImageWidth(qrSize, opts) {
    const scale = exports.getScale(qrSize, opts);
    return Math.floor((qrSize + opts.margin * 2) * scale);
};
exports.qrToImageData = function qrToImageData(imgData, qr, opts) {
    const size = qr.modules.size;
    const data = qr.modules.data;
    const scale = exports.getScale(size, opts);
    const symbolSize = Math.floor((size + opts.margin * 2) * scale);
    const scaledMargin = opts.margin * scale;
    const palette = [
        opts.color.light,
        opts.color.dark
    ];
    for(let i = 0; i < symbolSize; i++){
        for(let j = 0; j < symbolSize; j++){
            let posDst = (i * symbolSize + j) * 4;
            let pxColor = opts.color.light;
            if (i >= scaledMargin && j >= scaledMargin && i < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
                const iSrc = Math.floor((i - scaledMargin) / scale);
                const jSrc = Math.floor((j - scaledMargin) / scale);
                pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0];
            }
            imgData[posDst++] = pxColor.r;
            imgData[posDst++] = pxColor.g;
            imgData[posDst++] = pxColor.b;
            imgData[posDst] = pxColor.a;
        }
    }
};
}}),
"[project]/p2p-react/node_modules/qrcode/lib/renderer/canvas.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const Utils = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/renderer/utils.js [app-ssr] (ecmascript)");
function clearCanvas(ctx, canvas, size) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!canvas.style) canvas.style = {};
    canvas.height = size;
    canvas.width = size;
    canvas.style.height = size + 'px';
    canvas.style.width = size + 'px';
}
function getCanvasElement() {
    try {
        return document.createElement('canvas');
    } catch (e) {
        throw new Error('You need to specify a canvas element');
    }
}
exports.render = function render(qrData, canvas, options) {
    let opts = options;
    let canvasEl = canvas;
    if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
        opts = canvas;
        canvas = undefined;
    }
    if (!canvas) {
        canvasEl = getCanvasElement();
    }
    opts = Utils.getOptions(opts);
    const size = Utils.getImageWidth(qrData.modules.size, opts);
    const ctx = canvasEl.getContext('2d');
    const image = ctx.createImageData(size, size);
    Utils.qrToImageData(image.data, qrData, opts);
    clearCanvas(ctx, canvasEl, size);
    ctx.putImageData(image, 0, 0);
    return canvasEl;
};
exports.renderToDataURL = function renderToDataURL(qrData, canvas, options) {
    let opts = options;
    if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
        opts = canvas;
        canvas = undefined;
    }
    if (!opts) opts = {};
    const canvasEl = exports.render(qrData, canvas, opts);
    const type = opts.type || 'image/png';
    const rendererOpts = opts.rendererOpts || {};
    return canvasEl.toDataURL(type, rendererOpts.quality);
};
}}),
"[project]/p2p-react/node_modules/qrcode/lib/renderer/svg-tag.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const Utils = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/renderer/utils.js [app-ssr] (ecmascript)");
function getColorAttrib(color, attrib) {
    const alpha = color.a / 255;
    const str = attrib + '="' + color.hex + '"';
    return alpha < 1 ? str + ' ' + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"' : str;
}
function svgCmd(cmd, x, y) {
    let str = cmd + x;
    if (typeof y !== 'undefined') str += ' ' + y;
    return str;
}
function qrToPath(data, size, margin) {
    let path = '';
    let moveBy = 0;
    let newRow = false;
    let lineLength = 0;
    for(let i = 0; i < data.length; i++){
        const col = Math.floor(i % size);
        const row = Math.floor(i / size);
        if (!col && !newRow) newRow = true;
        if (data[i]) {
            lineLength++;
            if (!(i > 0 && col > 0 && data[i - 1])) {
                path += newRow ? svgCmd('M', col + margin, 0.5 + row + margin) : svgCmd('m', moveBy, 0);
                moveBy = 0;
                newRow = false;
            }
            if (!(col + 1 < size && data[i + 1])) {
                path += svgCmd('h', lineLength);
                lineLength = 0;
            }
        } else {
            moveBy++;
        }
    }
    return path;
}
exports.render = function render(qrData, options, cb) {
    const opts = Utils.getOptions(options);
    const size = qrData.modules.size;
    const data = qrData.modules.data;
    const qrcodesize = size + opts.margin * 2;
    const bg = !opts.color.light.a ? '' : '<path ' + getColorAttrib(opts.color.light, 'fill') + ' d="M0 0h' + qrcodesize + 'v' + qrcodesize + 'H0z"/>';
    const path = '<path ' + getColorAttrib(opts.color.dark, 'stroke') + ' d="' + qrToPath(data, size, opts.margin) + '"/>';
    const viewBox = 'viewBox="' + '0 0 ' + qrcodesize + ' ' + qrcodesize + '"';
    const width = !opts.width ? '' : 'width="' + opts.width + '" height="' + opts.width + '" ';
    const svgTag = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path + '</svg>\n';
    if (typeof cb === 'function') {
        cb(null, svgTag);
    }
    return svgTag;
};
}}),
"[project]/p2p-react/node_modules/qrcode/lib/browser.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const canPromise = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/can-promise.js [app-ssr] (ecmascript)");
const QRCode = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/core/qrcode.js [app-ssr] (ecmascript)");
const CanvasRenderer = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/renderer/canvas.js [app-ssr] (ecmascript)");
const SvgRenderer = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/renderer/svg-tag.js [app-ssr] (ecmascript)");
function renderCanvas(renderFunc, canvas, text, opts, cb) {
    const args = [].slice.call(arguments, 1);
    const argsNum = args.length;
    const isLastArgCb = typeof args[argsNum - 1] === 'function';
    if (!isLastArgCb && !canPromise()) {
        throw new Error('Callback required as last argument');
    }
    if (isLastArgCb) {
        if (argsNum < 2) {
            throw new Error('Too few arguments provided');
        }
        if (argsNum === 2) {
            cb = text;
            text = canvas;
            canvas = opts = undefined;
        } else if (argsNum === 3) {
            if (canvas.getContext && typeof cb === 'undefined') {
                cb = opts;
                opts = undefined;
            } else {
                cb = opts;
                opts = text;
                text = canvas;
                canvas = undefined;
            }
        }
    } else {
        if (argsNum < 1) {
            throw new Error('Too few arguments provided');
        }
        if (argsNum === 1) {
            text = canvas;
            canvas = opts = undefined;
        } else if (argsNum === 2 && !canvas.getContext) {
            opts = text;
            text = canvas;
            canvas = undefined;
        }
        return new Promise(function(resolve, reject) {
            try {
                const data = QRCode.create(text, opts);
                resolve(renderFunc(data, canvas, opts));
            } catch (e) {
                reject(e);
            }
        });
    }
    try {
        const data = QRCode.create(text, opts);
        cb(null, renderFunc(data, canvas, opts));
    } catch (e) {
        cb(e);
    }
}
exports.create = QRCode.create;
exports.toCanvas = renderCanvas.bind(null, CanvasRenderer.render);
exports.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL);
// only svg for now.
exports.toString = renderCanvas.bind(null, function(data, _, opts) {
    return SvgRenderer.render(data, opts);
});
}}),
"[project]/p2p-react/node_modules/qrcode/lib/renderer/png.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
const PNG = __turbopack_context__.r("[project]/p2p-react/node_modules/pngjs/lib/png.js [app-ssr] (ecmascript)").PNG;
const Utils = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/renderer/utils.js [app-ssr] (ecmascript)");
exports.render = function render(qrData, options) {
    const opts = Utils.getOptions(options);
    const pngOpts = opts.rendererOpts;
    const size = Utils.getImageWidth(qrData.modules.size, opts);
    pngOpts.width = size;
    pngOpts.height = size;
    const pngImage = new PNG(pngOpts);
    Utils.qrToImageData(pngImage.data, qrData, opts);
    return pngImage;
};
exports.renderToDataURL = function renderToDataURL(qrData, options, cb) {
    if (typeof cb === 'undefined') {
        cb = options;
        options = undefined;
    }
    exports.renderToBuffer(qrData, options, function(err, output) {
        if (err) cb(err);
        let url = 'data:image/png;base64,';
        url += output.toString('base64');
        cb(null, url);
    });
};
exports.renderToBuffer = function renderToBuffer(qrData, options, cb) {
    if (typeof cb === 'undefined') {
        cb = options;
        options = undefined;
    }
    const png = exports.render(qrData, options);
    const buffer = [];
    png.on('error', cb);
    png.on('data', function(data) {
        buffer.push(data);
    });
    png.on('end', function() {
        cb(null, Buffer.concat(buffer));
    });
    png.pack();
};
exports.renderToFile = function renderToFile(path, qrData, options, cb) {
    if (typeof cb === 'undefined') {
        cb = options;
        options = undefined;
    }
    let called = false;
    const done = (...args)=>{
        if (called) return;
        called = true;
        cb.apply(null, args);
    };
    const stream = fs.createWriteStream(path);
    stream.on('error', done);
    stream.on('close', done);
    exports.renderToFileStream(stream, qrData, options);
};
exports.renderToFileStream = function renderToFileStream(stream, qrData, options) {
    const png = exports.render(qrData, options);
    png.pack().pipe(stream);
};
}}),
"[project]/p2p-react/node_modules/qrcode/lib/renderer/utf8.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const Utils = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/renderer/utils.js [app-ssr] (ecmascript)");
const BLOCK_CHAR = {
    WW: ' ',
    WB: '▄',
    BB: '█',
    BW: '▀'
};
const INVERTED_BLOCK_CHAR = {
    BB: ' ',
    BW: '▄',
    WW: '█',
    WB: '▀'
};
function getBlockChar(top, bottom, blocks) {
    if (top && bottom) return blocks.BB;
    if (top && !bottom) return blocks.BW;
    if (!top && bottom) return blocks.WB;
    return blocks.WW;
}
exports.render = function(qrData, options, cb) {
    const opts = Utils.getOptions(options);
    let blocks = BLOCK_CHAR;
    if (opts.color.dark.hex === '#ffffff' || opts.color.light.hex === '#000000') {
        blocks = INVERTED_BLOCK_CHAR;
    }
    const size = qrData.modules.size;
    const data = qrData.modules.data;
    let output = '';
    let hMargin = Array(size + opts.margin * 2 + 1).join(blocks.WW);
    hMargin = Array(opts.margin / 2 + 1).join(hMargin + '\n');
    const vMargin = Array(opts.margin + 1).join(blocks.WW);
    output += hMargin;
    for(let i = 0; i < size; i += 2){
        output += vMargin;
        for(let j = 0; j < size; j++){
            const topModule = data[i * size + j];
            const bottomModule = data[(i + 1) * size + j];
            output += getBlockChar(topModule, bottomModule, blocks);
        }
        output += vMargin + '\n';
    }
    output += hMargin.slice(0, -1);
    if (typeof cb === 'function') {
        cb(null, output);
    }
    return output;
};
exports.renderToFile = function renderToFile(path, qrData, options, cb) {
    if (typeof cb === 'undefined') {
        cb = options;
        options = undefined;
    }
    const fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
    const utf8 = exports.render(qrData, options);
    fs.writeFile(path, utf8, cb);
};
}}),
"[project]/p2p-react/node_modules/qrcode/lib/renderer/terminal/terminal.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
// let Utils = require('./utils')
exports.render = function(qrData, options, cb) {
    const size = qrData.modules.size;
    const data = qrData.modules.data;
    // let opts = Utils.getOptions(options)
    // use same scheme as https://github.com/gtanner/qrcode-terminal because it actually works! =)
    const black = '\x1b[40m  \x1b[0m';
    const white = '\x1b[47m  \x1b[0m';
    let output = '';
    const hMargin = Array(size + 3).join(white);
    const vMargin = Array(2).join(white);
    output += hMargin + '\n';
    for(let i = 0; i < size; ++i){
        output += white;
        for(let j = 0; j < size; j++){
            // let topModule = data[i * size + j]
            // let bottomModule = data[(i + 1) * size + j]
            output += data[i * size + j] ? black : white; // getBlockChar(topModule, bottomModule)
        }
        // output += white+'\n'
        output += vMargin + '\n';
    }
    output += hMargin + '\n';
    if (typeof cb === 'function') {
        cb(null, output);
    }
    return output;
}; /*
exports.renderToFile = function renderToFile (path, qrData, options, cb) {
  if (typeof cb === 'undefined') {
    cb = options
    options = undefined
  }

  let fs = require('fs')
  let utf8 = exports.render(qrData, options)
  fs.writeFile(path, utf8, cb)
}
*/ 
}}),
"[project]/p2p-react/node_modules/qrcode/lib/renderer/terminal/terminal-small.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const backgroundWhite = '\x1b[47m';
const backgroundBlack = '\x1b[40m';
const foregroundWhite = '\x1b[37m';
const foregroundBlack = '\x1b[30m';
const reset = '\x1b[0m';
const lineSetupNormal = backgroundWhite + foregroundBlack // setup colors
;
const lineSetupInverse = backgroundBlack + foregroundWhite // setup colors
;
const createPalette = function(lineSetup, foregroundWhite, foregroundBlack) {
    return {
        // 1 ... white, 2 ... black, 0 ... transparent (default)
        '00': reset + ' ' + lineSetup,
        '01': reset + foregroundWhite + '▄' + lineSetup,
        '02': reset + foregroundBlack + '▄' + lineSetup,
        10: reset + foregroundWhite + '▀' + lineSetup,
        11: ' ',
        12: '▄',
        20: reset + foregroundBlack + '▀' + lineSetup,
        21: '▀',
        22: '█'
    };
};
/**
 * Returns code for QR pixel
 * @param {boolean[][]} modules
 * @param {number} size
 * @param {number} x
 * @param {number} y
 * @return {'0' | '1' | '2'}
 */ const mkCodePixel = function(modules, size, x, y) {
    const sizePlus = size + 1;
    if (x >= sizePlus || y >= sizePlus || y < -1 || x < -1) return '0';
    if (x >= size || y >= size || y < 0 || x < 0) return '1';
    const idx = y * size + x;
    return modules[idx] ? '2' : '1';
};
/**
 * Returns code for four QR pixels. Suitable as key in palette.
 * @param {boolean[][]} modules
 * @param {number} size
 * @param {number} x
 * @param {number} y
 * @return {keyof palette}
 */ const mkCode = function(modules, size, x, y) {
    return mkCodePixel(modules, size, x, y) + mkCodePixel(modules, size, x, y + 1);
};
exports.render = function(qrData, options, cb) {
    const size = qrData.modules.size;
    const data = qrData.modules.data;
    const inverse = !!(options && options.inverse);
    const lineSetup = options && options.inverse ? lineSetupInverse : lineSetupNormal;
    const white = inverse ? foregroundBlack : foregroundWhite;
    const black = inverse ? foregroundWhite : foregroundBlack;
    const palette = createPalette(lineSetup, white, black);
    const newLine = reset + '\n' + lineSetup;
    let output = lineSetup // setup colors
    ;
    for(let y = -1; y < size + 1; y += 2){
        for(let x = -1; x < size; x++){
            output += palette[mkCode(data, size, x, y)];
        }
        output += palette[mkCode(data, size, size, y)] + newLine;
    }
    output += reset;
    if (typeof cb === 'function') {
        cb(null, output);
    }
    return output;
};
}}),
"[project]/p2p-react/node_modules/qrcode/lib/renderer/terminal.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const big = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/renderer/terminal/terminal.js [app-ssr] (ecmascript)");
const small = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/renderer/terminal/terminal-small.js [app-ssr] (ecmascript)");
exports.render = function(qrData, options, cb) {
    if (options && options.small) {
        return small.render(qrData, options, cb);
    }
    return big.render(qrData, options, cb);
};
}}),
"[project]/p2p-react/node_modules/qrcode/lib/renderer/svg.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const svgTagRenderer = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/renderer/svg-tag.js [app-ssr] (ecmascript)");
exports.render = svgTagRenderer.render;
exports.renderToFile = function renderToFile(path, qrData, options, cb) {
    if (typeof cb === 'undefined') {
        cb = options;
        options = undefined;
    }
    const fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
    const svgTag = exports.render(qrData, options);
    const xmlStr = '<?xml version="1.0" encoding="utf-8"?>' + '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">' + svgTag;
    fs.writeFile(path, xmlStr, cb);
};
}}),
"[project]/p2p-react/node_modules/qrcode/lib/server.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const canPromise = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/can-promise.js [app-ssr] (ecmascript)");
const QRCode = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/core/qrcode.js [app-ssr] (ecmascript)");
const PngRenderer = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/renderer/png.js [app-ssr] (ecmascript)");
const Utf8Renderer = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/renderer/utf8.js [app-ssr] (ecmascript)");
const TerminalRenderer = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/renderer/terminal.js [app-ssr] (ecmascript)");
const SvgRenderer = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/renderer/svg.js [app-ssr] (ecmascript)");
function checkParams(text, opts, cb) {
    if (typeof text === 'undefined') {
        throw new Error('String required as first argument');
    }
    if (typeof cb === 'undefined') {
        cb = opts;
        opts = {};
    }
    if (typeof cb !== 'function') {
        if (!canPromise()) {
            throw new Error('Callback required as last argument');
        } else {
            opts = cb || {};
            cb = null;
        }
    }
    return {
        opts: opts,
        cb: cb
    };
}
function getTypeFromFilename(path) {
    return path.slice((path.lastIndexOf('.') - 1 >>> 0) + 2).toLowerCase();
}
function getRendererFromType(type) {
    switch(type){
        case 'svg':
            return SvgRenderer;
        case 'txt':
        case 'utf8':
            return Utf8Renderer;
        case 'png':
        case 'image/png':
        default:
            return PngRenderer;
    }
}
function getStringRendererFromType(type) {
    switch(type){
        case 'svg':
            return SvgRenderer;
        case 'terminal':
            return TerminalRenderer;
        case 'utf8':
        default:
            return Utf8Renderer;
    }
}
function render(renderFunc, text, params) {
    if (!params.cb) {
        return new Promise(function(resolve, reject) {
            try {
                const data = QRCode.create(text, params.opts);
                return renderFunc(data, params.opts, function(err, data) {
                    return err ? reject(err) : resolve(data);
                });
            } catch (e) {
                reject(e);
            }
        });
    }
    try {
        const data = QRCode.create(text, params.opts);
        return renderFunc(data, params.opts, params.cb);
    } catch (e) {
        params.cb(e);
    }
}
exports.create = QRCode.create;
exports.toCanvas = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/browser.js [app-ssr] (ecmascript)").toCanvas;
exports.toString = function toString(text, opts, cb) {
    const params = checkParams(text, opts, cb);
    const type = params.opts ? params.opts.type : undefined;
    const renderer = getStringRendererFromType(type);
    return render(renderer.render, text, params);
};
exports.toDataURL = function toDataURL(text, opts, cb) {
    const params = checkParams(text, opts, cb);
    const renderer = getRendererFromType(params.opts.type);
    return render(renderer.renderToDataURL, text, params);
};
exports.toBuffer = function toBuffer(text, opts, cb) {
    const params = checkParams(text, opts, cb);
    const renderer = getRendererFromType(params.opts.type);
    return render(renderer.renderToBuffer, text, params);
};
exports.toFile = function toFile(path, text, opts, cb) {
    if (typeof path !== 'string' || !(typeof text === 'string' || typeof text === 'object')) {
        throw new Error('Invalid argument');
    }
    if (arguments.length < 3 && !canPromise()) {
        throw new Error('Too few arguments provided');
    }
    const params = checkParams(text, opts, cb);
    const type = params.opts.type || getTypeFromFilename(path);
    const renderer = getRendererFromType(type);
    const renderToFile = renderer.renderToFile.bind(null, path);
    return render(renderToFile, text, params);
};
exports.toFileStream = function toFileStream(stream, text, opts) {
    if (arguments.length < 2) {
        throw new Error('Too few arguments provided');
    }
    const params = checkParams(text, opts, stream.emit.bind(stream, 'error'));
    const renderer = getRendererFromType('png') // Only png support for now
    ;
    const renderToFileStream = renderer.renderToFileStream.bind(null, stream);
    render(renderToFileStream, text, params);
};
}}),
"[project]/p2p-react/node_modules/qrcode/lib/index.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
/*
*copyright Ryan Day 2012
*
* Licensed under the MIT license:
*   http://www.opensource.org/licenses/mit-license.php
*
* this is the main server side application file for node-qrcode.
* these exports use serverside canvas api methods for file IO and buffers
*
*/ module.exports = __turbopack_context__.r("[project]/p2p-react/node_modules/qrcode/lib/server.js [app-ssr] (ecmascript)");
}}),
"[project]/p2p-react/node_modules/dijkstrajs/dijkstra.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
/******************************************************************************
 * Created 2008-08-19.
 *
 * Dijkstra path-finding functions. Adapted from the Dijkstar Python project.
 *
 * Copyright (C) 2008
 *   Wyatt Baldwin <self@wyattbaldwin.com>
 *   All rights reserved
 *
 * Licensed under the MIT license.
 *
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *****************************************************************************/ var dijkstra = {
    single_source_shortest_paths: function(graph, s, d) {
        // Predecessor map for each node that has been encountered.
        // node ID => predecessor node ID
        var predecessors = {};
        // Costs of shortest paths from s to all nodes encountered.
        // node ID => cost
        var costs = {};
        costs[s] = 0;
        // Costs of shortest paths from s to all nodes encountered; differs from
        // `costs` in that it provides easy access to the node that currently has
        // the known shortest path from s.
        // XXX: Do we actually need both `costs` and `open`?
        var open = dijkstra.PriorityQueue.make();
        open.push(s, 0);
        var closest, u, v, cost_of_s_to_u, adjacent_nodes, cost_of_e, cost_of_s_to_u_plus_cost_of_e, cost_of_s_to_v, first_visit;
        while(!open.empty()){
            // In the nodes remaining in graph that have a known cost from s,
            // find the node, u, that currently has the shortest path from s.
            closest = open.pop();
            u = closest.value;
            cost_of_s_to_u = closest.cost;
            // Get nodes adjacent to u...
            adjacent_nodes = graph[u] || {};
            // ...and explore the edges that connect u to those nodes, updating
            // the cost of the shortest paths to any or all of those nodes as
            // necessary. v is the node across the current edge from u.
            for(v in adjacent_nodes){
                if (adjacent_nodes.hasOwnProperty(v)) {
                    // Get the cost of the edge running from u to v.
                    cost_of_e = adjacent_nodes[v];
                    // Cost of s to u plus the cost of u to v across e--this is *a*
                    // cost from s to v that may or may not be less than the current
                    // known cost to v.
                    cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;
                    // If we haven't visited v yet OR if the current known cost from s to
                    // v is greater than the new cost we just found (cost of s to u plus
                    // cost of u to v across e), update v's cost in the cost list and
                    // update v's predecessor in the predecessor list (it's now u).
                    cost_of_s_to_v = costs[v];
                    first_visit = typeof costs[v] === 'undefined';
                    if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
                        costs[v] = cost_of_s_to_u_plus_cost_of_e;
                        open.push(v, cost_of_s_to_u_plus_cost_of_e);
                        predecessors[v] = u;
                    }
                }
            }
        }
        if (typeof d !== 'undefined' && typeof costs[d] === 'undefined') {
            var msg = [
                'Could not find a path from ',
                s,
                ' to ',
                d,
                '.'
            ].join('');
            throw new Error(msg);
        }
        return predecessors;
    },
    extract_shortest_path_from_predecessor_list: function(predecessors, d) {
        var nodes = [];
        var u = d;
        var predecessor;
        while(u){
            nodes.push(u);
            predecessor = predecessors[u];
            u = predecessors[u];
        }
        nodes.reverse();
        return nodes;
    },
    find_path: function(graph, s, d) {
        var predecessors = dijkstra.single_source_shortest_paths(graph, s, d);
        return dijkstra.extract_shortest_path_from_predecessor_list(predecessors, d);
    },
    /**
   * A very naive priority queue implementation.
   */ PriorityQueue: {
        make: function(opts) {
            var T = dijkstra.PriorityQueue, t = {}, key;
            opts = opts || {};
            for(key in T){
                if (T.hasOwnProperty(key)) {
                    t[key] = T[key];
                }
            }
            t.queue = [];
            t.sorter = opts.sorter || T.default_sorter;
            return t;
        },
        default_sorter: function(a, b) {
            return a.cost - b.cost;
        },
        /**
     * Add a new item to the queue and ensure the highest priority element
     * is at the front of the queue.
     */ push: function(value, cost) {
            var item = {
                value: value,
                cost: cost
            };
            this.queue.push(item);
            this.queue.sort(this.sorter);
        },
        /**
     * Return the highest priority element in the queue.
     */ pop: function() {
            return this.queue.shift();
        },
        empty: function() {
            return this.queue.length === 0;
        }
    }
};
// node.js module exports
if ("TURBOPACK compile-time truthy", 1) {
    module.exports = dijkstra;
}
}}),
"[project]/p2p-react/node_modules/pngjs/lib/chunkstream.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
let util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
let Stream = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)");
let ChunkStream = module.exports = function() {
    Stream.call(this);
    this._buffers = [];
    this._buffered = 0;
    this._reads = [];
    this._paused = false;
    this._encoding = "utf8";
    this.writable = true;
};
util.inherits(ChunkStream, Stream);
ChunkStream.prototype.read = function(length, callback) {
    this._reads.push({
        length: Math.abs(length),
        allowLess: length < 0,
        func: callback
    });
    process.nextTick((function() {
        this._process();
        // its paused and there is not enought data then ask for more
        if (this._paused && this._reads && this._reads.length > 0) {
            this._paused = false;
            this.emit("drain");
        }
    }).bind(this));
};
ChunkStream.prototype.write = function(data, encoding) {
    if (!this.writable) {
        this.emit("error", new Error("Stream not writable"));
        return false;
    }
    let dataBuffer;
    if (Buffer.isBuffer(data)) {
        dataBuffer = data;
    } else {
        dataBuffer = Buffer.from(data, encoding || this._encoding);
    }
    this._buffers.push(dataBuffer);
    this._buffered += dataBuffer.length;
    this._process();
    // ok if there are no more read requests
    if (this._reads && this._reads.length === 0) {
        this._paused = true;
    }
    return this.writable && !this._paused;
};
ChunkStream.prototype.end = function(data, encoding) {
    if (data) {
        this.write(data, encoding);
    }
    this.writable = false;
    // already destroyed
    if (!this._buffers) {
        return;
    }
    // enqueue or handle end
    if (this._buffers.length === 0) {
        this._end();
    } else {
        this._buffers.push(null);
        this._process();
    }
};
ChunkStream.prototype.destroySoon = ChunkStream.prototype.end;
ChunkStream.prototype._end = function() {
    if (this._reads.length > 0) {
        this.emit("error", new Error("Unexpected end of input"));
    }
    this.destroy();
};
ChunkStream.prototype.destroy = function() {
    if (!this._buffers) {
        return;
    }
    this.writable = false;
    this._reads = null;
    this._buffers = null;
    this.emit("close");
};
ChunkStream.prototype._processReadAllowingLess = function(read) {
    // ok there is any data so that we can satisfy this request
    this._reads.shift(); // == read
    // first we need to peek into first buffer
    let smallerBuf = this._buffers[0];
    // ok there is more data than we need
    if (smallerBuf.length > read.length) {
        this._buffered -= read.length;
        this._buffers[0] = smallerBuf.slice(read.length);
        read.func.call(this, smallerBuf.slice(0, read.length));
    } else {
        // ok this is less than maximum length so use it all
        this._buffered -= smallerBuf.length;
        this._buffers.shift(); // == smallerBuf
        read.func.call(this, smallerBuf);
    }
};
ChunkStream.prototype._processRead = function(read) {
    this._reads.shift(); // == read
    let pos = 0;
    let count = 0;
    let data = Buffer.alloc(read.length);
    // create buffer for all data
    while(pos < read.length){
        let buf = this._buffers[count++];
        let len = Math.min(buf.length, read.length - pos);
        buf.copy(data, pos, 0, len);
        pos += len;
        // last buffer wasn't used all so just slice it and leave
        if (len !== buf.length) {
            this._buffers[--count] = buf.slice(len);
        }
    }
    // remove all used buffers
    if (count > 0) {
        this._buffers.splice(0, count);
    }
    this._buffered -= read.length;
    read.func.call(this, data);
};
ChunkStream.prototype._process = function() {
    try {
        // as long as there is any data and read requests
        while(this._buffered > 0 && this._reads && this._reads.length > 0){
            let read = this._reads[0];
            // read any data (but no more than length)
            if (read.allowLess) {
                this._processReadAllowingLess(read);
            } else if (this._buffered >= read.length) {
                // ok we can meet some expectations
                this._processRead(read);
            } else {
                break;
            }
        }
        if (this._buffers && !this.writable) {
            this._end();
        }
    } catch (ex) {
        this.emit("error", ex);
    }
};
}}),
"[project]/p2p-react/node_modules/pngjs/lib/interlace.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
// Adam 7
//   0 1 2 3 4 5 6 7
// 0 x 6 4 6 x 6 4 6
// 1 7 7 7 7 7 7 7 7
// 2 5 6 5 6 5 6 5 6
// 3 7 7 7 7 7 7 7 7
// 4 3 6 4 6 3 6 4 6
// 5 7 7 7 7 7 7 7 7
// 6 5 6 5 6 5 6 5 6
// 7 7 7 7 7 7 7 7 7
let imagePasses = [
    {
        // pass 1 - 1px
        x: [
            0
        ],
        y: [
            0
        ]
    },
    {
        // pass 2 - 1px
        x: [
            4
        ],
        y: [
            0
        ]
    },
    {
        // pass 3 - 2px
        x: [
            0,
            4
        ],
        y: [
            4
        ]
    },
    {
        // pass 4 - 4px
        x: [
            2,
            6
        ],
        y: [
            0,
            4
        ]
    },
    {
        // pass 5 - 8px
        x: [
            0,
            2,
            4,
            6
        ],
        y: [
            2,
            6
        ]
    },
    {
        // pass 6 - 16px
        x: [
            1,
            3,
            5,
            7
        ],
        y: [
            0,
            2,
            4,
            6
        ]
    },
    {
        // pass 7 - 32px
        x: [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7
        ],
        y: [
            1,
            3,
            5,
            7
        ]
    }
];
exports.getImagePasses = function(width, height) {
    let images = [];
    let xLeftOver = width % 8;
    let yLeftOver = height % 8;
    let xRepeats = (width - xLeftOver) / 8;
    let yRepeats = (height - yLeftOver) / 8;
    for(let i = 0; i < imagePasses.length; i++){
        let pass = imagePasses[i];
        let passWidth = xRepeats * pass.x.length;
        let passHeight = yRepeats * pass.y.length;
        for(let j = 0; j < pass.x.length; j++){
            if (pass.x[j] < xLeftOver) {
                passWidth++;
            } else {
                break;
            }
        }
        for(let j = 0; j < pass.y.length; j++){
            if (pass.y[j] < yLeftOver) {
                passHeight++;
            } else {
                break;
            }
        }
        if (passWidth > 0 && passHeight > 0) {
            images.push({
                width: passWidth,
                height: passHeight,
                index: i
            });
        }
    }
    return images;
};
exports.getInterlaceIterator = function(width) {
    return function(x, y, pass) {
        let outerXLeftOver = x % imagePasses[pass].x.length;
        let outerX = (x - outerXLeftOver) / imagePasses[pass].x.length * 8 + imagePasses[pass].x[outerXLeftOver];
        let outerYLeftOver = y % imagePasses[pass].y.length;
        let outerY = (y - outerYLeftOver) / imagePasses[pass].y.length * 8 + imagePasses[pass].y[outerYLeftOver];
        return outerX * 4 + outerY * width * 4;
    };
};
}}),
"[project]/p2p-react/node_modules/pngjs/lib/paeth-predictor.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
module.exports = function paethPredictor(left, above, upLeft) {
    let paeth = left + above - upLeft;
    let pLeft = Math.abs(paeth - left);
    let pAbove = Math.abs(paeth - above);
    let pUpLeft = Math.abs(paeth - upLeft);
    if (pLeft <= pAbove && pLeft <= pUpLeft) {
        return left;
    }
    if (pAbove <= pUpLeft) {
        return above;
    }
    return upLeft;
};
}}),
"[project]/p2p-react/node_modules/pngjs/lib/filter-parse.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
let interlaceUtils = __turbopack_context__.r("[project]/p2p-react/node_modules/pngjs/lib/interlace.js [app-ssr] (ecmascript)");
let paethPredictor = __turbopack_context__.r("[project]/p2p-react/node_modules/pngjs/lib/paeth-predictor.js [app-ssr] (ecmascript)");
function getByteWidth(width, bpp, depth) {
    let byteWidth = width * bpp;
    if (depth !== 8) {
        byteWidth = Math.ceil(byteWidth / (8 / depth));
    }
    return byteWidth;
}
let Filter = module.exports = function(bitmapInfo, dependencies) {
    let width = bitmapInfo.width;
    let height = bitmapInfo.height;
    let interlace = bitmapInfo.interlace;
    let bpp = bitmapInfo.bpp;
    let depth = bitmapInfo.depth;
    this.read = dependencies.read;
    this.write = dependencies.write;
    this.complete = dependencies.complete;
    this._imageIndex = 0;
    this._images = [];
    if (interlace) {
        let passes = interlaceUtils.getImagePasses(width, height);
        for(let i = 0; i < passes.length; i++){
            this._images.push({
                byteWidth: getByteWidth(passes[i].width, bpp, depth),
                height: passes[i].height,
                lineIndex: 0
            });
        }
    } else {
        this._images.push({
            byteWidth: getByteWidth(width, bpp, depth),
            height: height,
            lineIndex: 0
        });
    }
    // when filtering the line we look at the pixel to the left
    // the spec also says it is done on a byte level regardless of the number of pixels
    // so if the depth is byte compatible (8 or 16) we subtract the bpp in order to compare back
    // a pixel rather than just a different byte part. However if we are sub byte, we ignore.
    if (depth === 8) {
        this._xComparison = bpp;
    } else if (depth === 16) {
        this._xComparison = bpp * 2;
    } else {
        this._xComparison = 1;
    }
};
Filter.prototype.start = function() {
    this.read(this._images[this._imageIndex].byteWidth + 1, this._reverseFilterLine.bind(this));
};
Filter.prototype._unFilterType1 = function(rawData, unfilteredLine, byteWidth) {
    let xComparison = this._xComparison;
    let xBiggerThan = xComparison - 1;
    for(let x = 0; x < byteWidth; x++){
        let rawByte = rawData[1 + x];
        let f1Left = x > xBiggerThan ? unfilteredLine[x - xComparison] : 0;
        unfilteredLine[x] = rawByte + f1Left;
    }
};
Filter.prototype._unFilterType2 = function(rawData, unfilteredLine, byteWidth) {
    let lastLine = this._lastLine;
    for(let x = 0; x < byteWidth; x++){
        let rawByte = rawData[1 + x];
        let f2Up = lastLine ? lastLine[x] : 0;
        unfilteredLine[x] = rawByte + f2Up;
    }
};
Filter.prototype._unFilterType3 = function(rawData, unfilteredLine, byteWidth) {
    let xComparison = this._xComparison;
    let xBiggerThan = xComparison - 1;
    let lastLine = this._lastLine;
    for(let x = 0; x < byteWidth; x++){
        let rawByte = rawData[1 + x];
        let f3Up = lastLine ? lastLine[x] : 0;
        let f3Left = x > xBiggerThan ? unfilteredLine[x - xComparison] : 0;
        let f3Add = Math.floor((f3Left + f3Up) / 2);
        unfilteredLine[x] = rawByte + f3Add;
    }
};
Filter.prototype._unFilterType4 = function(rawData, unfilteredLine, byteWidth) {
    let xComparison = this._xComparison;
    let xBiggerThan = xComparison - 1;
    let lastLine = this._lastLine;
    for(let x = 0; x < byteWidth; x++){
        let rawByte = rawData[1 + x];
        let f4Up = lastLine ? lastLine[x] : 0;
        let f4Left = x > xBiggerThan ? unfilteredLine[x - xComparison] : 0;
        let f4UpLeft = x > xBiggerThan && lastLine ? lastLine[x - xComparison] : 0;
        let f4Add = paethPredictor(f4Left, f4Up, f4UpLeft);
        unfilteredLine[x] = rawByte + f4Add;
    }
};
Filter.prototype._reverseFilterLine = function(rawData) {
    let filter = rawData[0];
    let unfilteredLine;
    let currentImage = this._images[this._imageIndex];
    let byteWidth = currentImage.byteWidth;
    if (filter === 0) {
        unfilteredLine = rawData.slice(1, byteWidth + 1);
    } else {
        unfilteredLine = Buffer.alloc(byteWidth);
        switch(filter){
            case 1:
                this._unFilterType1(rawData, unfilteredLine, byteWidth);
                break;
            case 2:
                this._unFilterType2(rawData, unfilteredLine, byteWidth);
                break;
            case 3:
                this._unFilterType3(rawData, unfilteredLine, byteWidth);
                break;
            case 4:
                this._unFilterType4(rawData, unfilteredLine, byteWidth);
                break;
            default:
                throw new Error("Unrecognised filter type - " + filter);
        }
    }
    this.write(unfilteredLine);
    currentImage.lineIndex++;
    if (currentImage.lineIndex >= currentImage.height) {
        this._lastLine = null;
        this._imageIndex++;
        currentImage = this._images[this._imageIndex];
    } else {
        this._lastLine = unfilteredLine;
    }
    if (currentImage) {
        // read, using the byte width that may be from the new current image
        this.read(currentImage.byteWidth + 1, this._reverseFilterLine.bind(this));
    } else {
        this._lastLine = null;
        this.complete();
    }
};
}}),
"[project]/p2p-react/node_modules/pngjs/lib/filter-parse-async.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
let util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
let ChunkStream = __turbopack_context__.r("[project]/p2p-react/node_modules/pngjs/lib/chunkstream.js [app-ssr] (ecmascript)");
let Filter = __turbopack_context__.r("[project]/p2p-react/node_modules/pngjs/lib/filter-parse.js [app-ssr] (ecmascript)");
let FilterAsync = module.exports = function(bitmapInfo) {
    ChunkStream.call(this);
    let buffers = [];
    let that = this;
    this._filter = new Filter(bitmapInfo, {
        read: this.read.bind(this),
        write: function(buffer) {
            buffers.push(buffer);
        },
        complete: function() {
            that.emit("complete", Buffer.concat(buffers));
        }
    });
    this._filter.start();
};
util.inherits(FilterAsync, ChunkStream);
}}),
"[project]/p2p-react/node_modules/pngjs/lib/constants.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
module.exports = {
    PNG_SIGNATURE: [
        0x89,
        0x50,
        0x4e,
        0x47,
        0x0d,
        0x0a,
        0x1a,
        0x0a
    ],
    TYPE_IHDR: 0x49484452,
    TYPE_IEND: 0x49454e44,
    TYPE_IDAT: 0x49444154,
    TYPE_PLTE: 0x504c5445,
    TYPE_tRNS: 0x74524e53,
    TYPE_gAMA: 0x67414d41,
    // color-type bits
    COLORTYPE_GRAYSCALE: 0,
    COLORTYPE_PALETTE: 1,
    COLORTYPE_COLOR: 2,
    COLORTYPE_ALPHA: 4,
    // color-type combinations
    COLORTYPE_PALETTE_COLOR: 3,
    COLORTYPE_COLOR_ALPHA: 6,
    COLORTYPE_TO_BPP_MAP: {
        0: 1,
        2: 3,
        3: 1,
        4: 2,
        6: 4
    },
    GAMMA_DIVISION: 100000
};
}}),
"[project]/p2p-react/node_modules/pngjs/lib/crc.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
let crcTable = [];
(function() {
    for(let i = 0; i < 256; i++){
        let currentCrc = i;
        for(let j = 0; j < 8; j++){
            if (currentCrc & 1) {
                currentCrc = 0xedb88320 ^ currentCrc >>> 1;
            } else {
                currentCrc = currentCrc >>> 1;
            }
        }
        crcTable[i] = currentCrc;
    }
})();
let CrcCalculator = module.exports = function() {
    this._crc = -1;
};
CrcCalculator.prototype.write = function(data) {
    for(let i = 0; i < data.length; i++){
        this._crc = crcTable[(this._crc ^ data[i]) & 0xff] ^ this._crc >>> 8;
    }
    return true;
};
CrcCalculator.prototype.crc32 = function() {
    return this._crc ^ -1;
};
CrcCalculator.crc32 = function(buf) {
    let crc = -1;
    for(let i = 0; i < buf.length; i++){
        crc = crcTable[(crc ^ buf[i]) & 0xff] ^ crc >>> 8;
    }
    return crc ^ -1;
};
}}),
"[project]/p2p-react/node_modules/pngjs/lib/parser.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
let constants = __turbopack_context__.r("[project]/p2p-react/node_modules/pngjs/lib/constants.js [app-ssr] (ecmascript)");
let CrcCalculator = __turbopack_context__.r("[project]/p2p-react/node_modules/pngjs/lib/crc.js [app-ssr] (ecmascript)");
let Parser = module.exports = function(options, dependencies) {
    this._options = options;
    options.checkCRC = options.checkCRC !== false;
    this._hasIHDR = false;
    this._hasIEND = false;
    this._emittedHeadersFinished = false;
    // input flags/metadata
    this._palette = [];
    this._colorType = 0;
    this._chunks = {};
    this._chunks[constants.TYPE_IHDR] = this._handleIHDR.bind(this);
    this._chunks[constants.TYPE_IEND] = this._handleIEND.bind(this);
    this._chunks[constants.TYPE_IDAT] = this._handleIDAT.bind(this);
    this._chunks[constants.TYPE_PLTE] = this._handlePLTE.bind(this);
    this._chunks[constants.TYPE_tRNS] = this._handleTRNS.bind(this);
    this._chunks[constants.TYPE_gAMA] = this._handleGAMA.bind(this);
    this.read = dependencies.read;
    this.error = dependencies.error;
    this.metadata = dependencies.metadata;
    this.gamma = dependencies.gamma;
    this.transColor = dependencies.transColor;
    this.palette = dependencies.palette;
    this.parsed = dependencies.parsed;
    this.inflateData = dependencies.inflateData;
    this.finished = dependencies.finished;
    this.simpleTransparency = dependencies.simpleTransparency;
    this.headersFinished = dependencies.headersFinished || function() {};
};
Parser.prototype.start = function() {
    this.read(constants.PNG_SIGNATURE.length, this._parseSignature.bind(this));
};
Parser.prototype._parseSignature = function(data) {
    let signature = constants.PNG_SIGNATURE;
    for(let i = 0; i < signature.length; i++){
        if (data[i] !== signature[i]) {
            this.error(new Error("Invalid file signature"));
            return;
        }
    }
    this.read(8, this._parseChunkBegin.bind(this));
};
Parser.prototype._parseChunkBegin = function(data) {
    // chunk content length
    let length = data.readUInt32BE(0);
    // chunk type
    let type = data.readUInt32BE(4);
    let name = "";
    for(let i = 4; i < 8; i++){
        name += String.fromCharCode(data[i]);
    }
    //console.log('chunk ', name, length);
    // chunk flags
    let ancillary = Boolean(data[4] & 0x20); // or critical
    //    priv = Boolean(data[5] & 0x20), // or public
    //    safeToCopy = Boolean(data[7] & 0x20); // or unsafe
    if (!this._hasIHDR && type !== constants.TYPE_IHDR) {
        this.error(new Error("Expected IHDR on beggining"));
        return;
    }
    this._crc = new CrcCalculator();
    this._crc.write(Buffer.from(name));
    if (this._chunks[type]) {
        return this._chunks[type](length);
    }
    if (!ancillary) {
        this.error(new Error("Unsupported critical chunk type " + name));
        return;
    }
    this.read(length + 4, this._skipChunk.bind(this));
};
Parser.prototype._skipChunk = function() {
    this.read(8, this._parseChunkBegin.bind(this));
};
Parser.prototype._handleChunkEnd = function() {
    this.read(4, this._parseChunkEnd.bind(this));
};
Parser.prototype._parseChunkEnd = function(data) {
    let fileCrc = data.readInt32BE(0);
    let calcCrc = this._crc.crc32();
    // check CRC
    if (this._options.checkCRC && calcCrc !== fileCrc) {
        this.error(new Error("Crc error - " + fileCrc + " - " + calcCrc));
        return;
    }
    if (!this._hasIEND) {
        this.read(8, this._parseChunkBegin.bind(this));
    }
};
Parser.prototype._handleIHDR = function(length) {
    this.read(length, this._parseIHDR.bind(this));
};
Parser.prototype._parseIHDR = function(data) {
    this._crc.write(data);
    let width = data.readUInt32BE(0);
    let height = data.readUInt32BE(4);
    let depth = data[8];
    let colorType = data[9]; // bits: 1 palette, 2 color, 4 alpha
    let compr = data[10];
    let filter = data[11];
    let interlace = data[12];
    // console.log('    width', width, 'height', height,
    //     'depth', depth, 'colorType', colorType,
    //     'compr', compr, 'filter', filter, 'interlace', interlace
    // );
    if (depth !== 8 && depth !== 4 && depth !== 2 && depth !== 1 && depth !== 16) {
        this.error(new Error("Unsupported bit depth " + depth));
        return;
    }
    if (!(colorType in constants.COLORTYPE_TO_BPP_MAP)) {
        this.error(new Error("Unsupported color type"));
        return;
    }
    if (compr !== 0) {
        this.error(new Error("Unsupported compression method"));
        return;
    }
    if (filter !== 0) {
        this.error(new Error("Unsupported filter method"));
        return;
    }
    if (interlace !== 0 && interlace !== 1) {
        this.error(new Error("Unsupported interlace method"));
        return;
    }
    this._colorType = colorType;
    let bpp = constants.COLORTYPE_TO_BPP_MAP[this._colorType];
    this._hasIHDR = true;
    this.metadata({
        width: width,
        height: height,
        depth: depth,
        interlace: Boolean(interlace),
        palette: Boolean(colorType & constants.COLORTYPE_PALETTE),
        color: Boolean(colorType & constants.COLORTYPE_COLOR),
        alpha: Boolean(colorType & constants.COLORTYPE_ALPHA),
        bpp: bpp,
        colorType: colorType
    });
    this._handleChunkEnd();
};
Parser.prototype._handlePLTE = function(length) {
    this.read(length, this._parsePLTE.bind(this));
};
Parser.prototype._parsePLTE = function(data) {
    this._crc.write(data);
    let entries = Math.floor(data.length / 3);
    // console.log('Palette:', entries);
    for(let i = 0; i < entries; i++){
        this._palette.push([
            data[i * 3],
            data[i * 3 + 1],
            data[i * 3 + 2],
            0xff
        ]);
    }
    this.palette(this._palette);
    this._handleChunkEnd();
};
Parser.prototype._handleTRNS = function(length) {
    this.simpleTransparency();
    this.read(length, this._parseTRNS.bind(this));
};
Parser.prototype._parseTRNS = function(data) {
    this._crc.write(data);
    // palette
    if (this._colorType === constants.COLORTYPE_PALETTE_COLOR) {
        if (this._palette.length === 0) {
            this.error(new Error("Transparency chunk must be after palette"));
            return;
        }
        if (data.length > this._palette.length) {
            this.error(new Error("More transparent colors than palette size"));
            return;
        }
        for(let i = 0; i < data.length; i++){
            this._palette[i][3] = data[i];
        }
        this.palette(this._palette);
    }
    // for colorType 0 (grayscale) and 2 (rgb)
    // there might be one gray/color defined as transparent
    if (this._colorType === constants.COLORTYPE_GRAYSCALE) {
        // grey, 2 bytes
        this.transColor([
            data.readUInt16BE(0)
        ]);
    }
    if (this._colorType === constants.COLORTYPE_COLOR) {
        this.transColor([
            data.readUInt16BE(0),
            data.readUInt16BE(2),
            data.readUInt16BE(4)
        ]);
    }
    this._handleChunkEnd();
};
Parser.prototype._handleGAMA = function(length) {
    this.read(length, this._parseGAMA.bind(this));
};
Parser.prototype._parseGAMA = function(data) {
    this._crc.write(data);
    this.gamma(data.readUInt32BE(0) / constants.GAMMA_DIVISION);
    this._handleChunkEnd();
};
Parser.prototype._handleIDAT = function(length) {
    if (!this._emittedHeadersFinished) {
        this._emittedHeadersFinished = true;
        this.headersFinished();
    }
    this.read(-length, this._parseIDAT.bind(this, length));
};
Parser.prototype._parseIDAT = function(length, data) {
    this._crc.write(data);
    if (this._colorType === constants.COLORTYPE_PALETTE_COLOR && this._palette.length === 0) {
        throw new Error("Expected palette not found");
    }
    this.inflateData(data);
    let leftOverLength = length - data.length;
    if (leftOverLength > 0) {
        this._handleIDAT(leftOverLength);
    } else {
        this._handleChunkEnd();
    }
};
Parser.prototype._handleIEND = function(length) {
    this.read(length, this._parseIEND.bind(this));
};
Parser.prototype._parseIEND = function(data) {
    this._crc.write(data);
    this._hasIEND = true;
    this._handleChunkEnd();
    if (this.finished) {
        this.finished();
    }
};
}}),
"[project]/p2p-react/node_modules/pngjs/lib/bitmapper.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
let interlaceUtils = __turbopack_context__.r("[project]/p2p-react/node_modules/pngjs/lib/interlace.js [app-ssr] (ecmascript)");
let pixelBppMapper = [
    // 0 - dummy entry
    function() {},
    // 1 - L
    // 0: 0, 1: 0, 2: 0, 3: 0xff
    function(pxData, data, pxPos, rawPos) {
        if (rawPos === data.length) {
            throw new Error("Ran out of data");
        }
        let pixel = data[rawPos];
        pxData[pxPos] = pixel;
        pxData[pxPos + 1] = pixel;
        pxData[pxPos + 2] = pixel;
        pxData[pxPos + 3] = 0xff;
    },
    // 2 - LA
    // 0: 0, 1: 0, 2: 0, 3: 1
    function(pxData, data, pxPos, rawPos) {
        if (rawPos + 1 >= data.length) {
            throw new Error("Ran out of data");
        }
        let pixel = data[rawPos];
        pxData[pxPos] = pixel;
        pxData[pxPos + 1] = pixel;
        pxData[pxPos + 2] = pixel;
        pxData[pxPos + 3] = data[rawPos + 1];
    },
    // 3 - RGB
    // 0: 0, 1: 1, 2: 2, 3: 0xff
    function(pxData, data, pxPos, rawPos) {
        if (rawPos + 2 >= data.length) {
            throw new Error("Ran out of data");
        }
        pxData[pxPos] = data[rawPos];
        pxData[pxPos + 1] = data[rawPos + 1];
        pxData[pxPos + 2] = data[rawPos + 2];
        pxData[pxPos + 3] = 0xff;
    },
    // 4 - RGBA
    // 0: 0, 1: 1, 2: 2, 3: 3
    function(pxData, data, pxPos, rawPos) {
        if (rawPos + 3 >= data.length) {
            throw new Error("Ran out of data");
        }
        pxData[pxPos] = data[rawPos];
        pxData[pxPos + 1] = data[rawPos + 1];
        pxData[pxPos + 2] = data[rawPos + 2];
        pxData[pxPos + 3] = data[rawPos + 3];
    }
];
let pixelBppCustomMapper = [
    // 0 - dummy entry
    function() {},
    // 1 - L
    // 0: 0, 1: 0, 2: 0, 3: 0xff
    function(pxData, pixelData, pxPos, maxBit) {
        let pixel = pixelData[0];
        pxData[pxPos] = pixel;
        pxData[pxPos + 1] = pixel;
        pxData[pxPos + 2] = pixel;
        pxData[pxPos + 3] = maxBit;
    },
    // 2 - LA
    // 0: 0, 1: 0, 2: 0, 3: 1
    function(pxData, pixelData, pxPos) {
        let pixel = pixelData[0];
        pxData[pxPos] = pixel;
        pxData[pxPos + 1] = pixel;
        pxData[pxPos + 2] = pixel;
        pxData[pxPos + 3] = pixelData[1];
    },
    // 3 - RGB
    // 0: 0, 1: 1, 2: 2, 3: 0xff
    function(pxData, pixelData, pxPos, maxBit) {
        pxData[pxPos] = pixelData[0];
        pxData[pxPos + 1] = pixelData[1];
        pxData[pxPos + 2] = pixelData[2];
        pxData[pxPos + 3] = maxBit;
    },
    // 4 - RGBA
    // 0: 0, 1: 1, 2: 2, 3: 3
    function(pxData, pixelData, pxPos) {
        pxData[pxPos] = pixelData[0];
        pxData[pxPos + 1] = pixelData[1];
        pxData[pxPos + 2] = pixelData[2];
        pxData[pxPos + 3] = pixelData[3];
    }
];
function bitRetriever(data, depth) {
    let leftOver = [];
    let i = 0;
    function split() {
        if (i === data.length) {
            throw new Error("Ran out of data");
        }
        let byte = data[i];
        i++;
        let byte8, byte7, byte6, byte5, byte4, byte3, byte2, byte1;
        switch(depth){
            default:
                throw new Error("unrecognised depth");
            case 16:
                byte2 = data[i];
                i++;
                leftOver.push((byte << 8) + byte2);
                break;
            case 4:
                byte2 = byte & 0x0f;
                byte1 = byte >> 4;
                leftOver.push(byte1, byte2);
                break;
            case 2:
                byte4 = byte & 3;
                byte3 = byte >> 2 & 3;
                byte2 = byte >> 4 & 3;
                byte1 = byte >> 6 & 3;
                leftOver.push(byte1, byte2, byte3, byte4);
                break;
            case 1:
                byte8 = byte & 1;
                byte7 = byte >> 1 & 1;
                byte6 = byte >> 2 & 1;
                byte5 = byte >> 3 & 1;
                byte4 = byte >> 4 & 1;
                byte3 = byte >> 5 & 1;
                byte2 = byte >> 6 & 1;
                byte1 = byte >> 7 & 1;
                leftOver.push(byte1, byte2, byte3, byte4, byte5, byte6, byte7, byte8);
                break;
        }
    }
    return {
        get: function(count) {
            while(leftOver.length < count){
                split();
            }
            let returner = leftOver.slice(0, count);
            leftOver = leftOver.slice(count);
            return returner;
        },
        resetAfterLine: function() {
            leftOver.length = 0;
        },
        end: function() {
            if (i !== data.length) {
                throw new Error("extra data found");
            }
        }
    };
}
function mapImage8Bit(image, pxData, getPxPos, bpp, data, rawPos) {
    // eslint-disable-line max-params
    let imageWidth = image.width;
    let imageHeight = image.height;
    let imagePass = image.index;
    for(let y = 0; y < imageHeight; y++){
        for(let x = 0; x < imageWidth; x++){
            let pxPos = getPxPos(x, y, imagePass);
            pixelBppMapper[bpp](pxData, data, pxPos, rawPos);
            rawPos += bpp; //eslint-disable-line no-param-reassign
        }
    }
    return rawPos;
}
function mapImageCustomBit(image, pxData, getPxPos, bpp, bits, maxBit) {
    // eslint-disable-line max-params
    let imageWidth = image.width;
    let imageHeight = image.height;
    let imagePass = image.index;
    for(let y = 0; y < imageHeight; y++){
        for(let x = 0; x < imageWidth; x++){
            let pixelData = bits.get(bpp);
            let pxPos = getPxPos(x, y, imagePass);
            pixelBppCustomMapper[bpp](pxData, pixelData, pxPos, maxBit);
        }
        bits.resetAfterLine();
    }
}
exports.dataToBitMap = function(data, bitmapInfo) {
    let width = bitmapInfo.width;
    let height = bitmapInfo.height;
    let depth = bitmapInfo.depth;
    let bpp = bitmapInfo.bpp;
    let interlace = bitmapInfo.interlace;
    let bits;
    if (depth !== 8) {
        bits = bitRetriever(data, depth);
    }
    let pxData;
    if (depth <= 8) {
        pxData = Buffer.alloc(width * height * 4);
    } else {
        pxData = new Uint16Array(width * height * 4);
    }
    let maxBit = Math.pow(2, depth) - 1;
    let rawPos = 0;
    let images;
    let getPxPos;
    if (interlace) {
        images = interlaceUtils.getImagePasses(width, height);
        getPxPos = interlaceUtils.getInterlaceIterator(width, height);
    } else {
        let nonInterlacedPxPos = 0;
        getPxPos = function() {
            let returner = nonInterlacedPxPos;
            nonInterlacedPxPos += 4;
            return returner;
        };
        images = [
            {
                width: width,
                height: height
            }
        ];
    }
    for(let imageIndex = 0; imageIndex < images.length; imageIndex++){
        if (depth === 8) {
            rawPos = mapImage8Bit(images[imageIndex], pxData, getPxPos, bpp, data, rawPos);
        } else {
            mapImageCustomBit(images[imageIndex], pxData, getPxPos, bpp, bits, maxBit);
        }
    }
    if (depth === 8) {
        if (rawPos !== data.length) {
            throw new Error("extra data found");
        }
    } else {
        bits.end();
    }
    return pxData;
};
}}),
"[project]/p2p-react/node_modules/pngjs/lib/format-normaliser.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
function dePalette(indata, outdata, width, height, palette) {
    let pxPos = 0;
    // use values from palette
    for(let y = 0; y < height; y++){
        for(let x = 0; x < width; x++){
            let color = palette[indata[pxPos]];
            if (!color) {
                throw new Error("index " + indata[pxPos] + " not in palette");
            }
            for(let i = 0; i < 4; i++){
                outdata[pxPos + i] = color[i];
            }
            pxPos += 4;
        }
    }
}
function replaceTransparentColor(indata, outdata, width, height, transColor) {
    let pxPos = 0;
    for(let y = 0; y < height; y++){
        for(let x = 0; x < width; x++){
            let makeTrans = false;
            if (transColor.length === 1) {
                if (transColor[0] === indata[pxPos]) {
                    makeTrans = true;
                }
            } else if (transColor[0] === indata[pxPos] && transColor[1] === indata[pxPos + 1] && transColor[2] === indata[pxPos + 2]) {
                makeTrans = true;
            }
            if (makeTrans) {
                for(let i = 0; i < 4; i++){
                    outdata[pxPos + i] = 0;
                }
            }
            pxPos += 4;
        }
    }
}
function scaleDepth(indata, outdata, width, height, depth) {
    let maxOutSample = 255;
    let maxInSample = Math.pow(2, depth) - 1;
    let pxPos = 0;
    for(let y = 0; y < height; y++){
        for(let x = 0; x < width; x++){
            for(let i = 0; i < 4; i++){
                outdata[pxPos + i] = Math.floor(indata[pxPos + i] * maxOutSample / maxInSample + 0.5);
            }
            pxPos += 4;
        }
    }
}
module.exports = function(indata, imageData) {
    let depth = imageData.depth;
    let width = imageData.width;
    let height = imageData.height;
    let colorType = imageData.colorType;
    let transColor = imageData.transColor;
    let palette = imageData.palette;
    let outdata = indata; // only different for 16 bits
    if (colorType === 3) {
        // paletted
        dePalette(indata, outdata, width, height, palette);
    } else {
        if (transColor) {
            replaceTransparentColor(indata, outdata, width, height, transColor);
        }
        // if it needs scaling
        if (depth !== 8) {
            // if we need to change the buffer size
            if (depth === 16) {
                outdata = Buffer.alloc(width * height * 4);
            }
            scaleDepth(indata, outdata, width, height, depth);
        }
    }
    return outdata;
};
}}),
"[project]/p2p-react/node_modules/pngjs/lib/parser-async.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
let util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
let zlib = __turbopack_context__.r("[externals]/zlib [external] (zlib, cjs)");
let ChunkStream = __turbopack_context__.r("[project]/p2p-react/node_modules/pngjs/lib/chunkstream.js [app-ssr] (ecmascript)");
let FilterAsync = __turbopack_context__.r("[project]/p2p-react/node_modules/pngjs/lib/filter-parse-async.js [app-ssr] (ecmascript)");
let Parser = __turbopack_context__.r("[project]/p2p-react/node_modules/pngjs/lib/parser.js [app-ssr] (ecmascript)");
let bitmapper = __turbopack_context__.r("[project]/p2p-react/node_modules/pngjs/lib/bitmapper.js [app-ssr] (ecmascript)");
let formatNormaliser = __turbopack_context__.r("[project]/p2p-react/node_modules/pngjs/lib/format-normaliser.js [app-ssr] (ecmascript)");
let ParserAsync = module.exports = function(options) {
    ChunkStream.call(this);
    this._parser = new Parser(options, {
        read: this.read.bind(this),
        error: this._handleError.bind(this),
        metadata: this._handleMetaData.bind(this),
        gamma: this.emit.bind(this, "gamma"),
        palette: this._handlePalette.bind(this),
        transColor: this._handleTransColor.bind(this),
        finished: this._finished.bind(this),
        inflateData: this._inflateData.bind(this),
        simpleTransparency: this._simpleTransparency.bind(this),
        headersFinished: this._headersFinished.bind(this)
    });
    this._options = options;
    this.writable = true;
    this._parser.start();
};
util.inherits(ParserAsync, ChunkStream);
ParserAsync.prototype._handleError = function(err) {
    this.emit("error", err);
    this.writable = false;
    this.destroy();
    if (this._inflate && this._inflate.destroy) {
        this._inflate.destroy();
    }
    if (this._filter) {
        this._filter.destroy();
        // For backward compatibility with Node 7 and below.
        // Suppress errors due to _inflate calling write() even after
        // it's destroy()'ed.
        this._filter.on("error", function() {});
    }
    this.errord = true;
};
ParserAsync.prototype._inflateData = function(data) {
    if (!this._inflate) {
        if (this._bitmapInfo.interlace) {
            this._inflate = zlib.createInflate();
            this._inflate.on("error", this.emit.bind(this, "error"));
            this._filter.on("complete", this._complete.bind(this));
            this._inflate.pipe(this._filter);
        } else {
            let rowSize = (this._bitmapInfo.width * this._bitmapInfo.bpp * this._bitmapInfo.depth + 7 >> 3) + 1;
            let imageSize = rowSize * this._bitmapInfo.height;
            let chunkSize = Math.max(imageSize, zlib.Z_MIN_CHUNK);
            this._inflate = zlib.createInflate({
                chunkSize: chunkSize
            });
            let leftToInflate = imageSize;
            let emitError = this.emit.bind(this, "error");
            this._inflate.on("error", function(err) {
                if (!leftToInflate) {
                    return;
                }
                emitError(err);
            });
            this._filter.on("complete", this._complete.bind(this));
            let filterWrite = this._filter.write.bind(this._filter);
            this._inflate.on("data", function(chunk) {
                if (!leftToInflate) {
                    return;
                }
                if (chunk.length > leftToInflate) {
                    chunk = chunk.slice(0, leftToInflate);
                }
                leftToInflate -= chunk.length;
                filterWrite(chunk);
            });
            this._inflate.on("end", this._filter.end.bind(this._filter));
        }
    }
    this._inflate.write(data);
};
ParserAsync.prototype._handleMetaData = function(metaData) {
    this._metaData = metaData;
    this._bitmapInfo = Object.create(metaData);
    this._filter = new FilterAsync(this._bitmapInfo);
};
ParserAsync.prototype._handleTransColor = function(transColor) {
    this._bitmapInfo.transColor = transColor;
};
ParserAsync.prototype._handlePalette = function(palette) {
    this._bitmapInfo.palette = palette;
};
ParserAsync.prototype._simpleTransparency = function() {
    this._metaData.alpha = true;
};
ParserAsync.prototype._headersFinished = function() {
    // Up until this point, we don't know if we have a tRNS chunk (alpha)
    // so we can't emit metadata any earlier
    this.emit("metadata", this._metaData);
};
ParserAsync.prototype._finished = function() {
    if (this.errord) {
        return;
    }
    if (!this._inflate) {
        this.emit("error", "No Inflate block");
    } else {
        // no more data to inflate
        this._inflate.end();
    }
};
ParserAsync.prototype._complete = function(filteredData) {
    if (this.errord) {
        return;
    }
    let normalisedBitmapData;
    try {
        let bitmapData = bitmapper.dataToBitMap(filteredData, this._bitmapInfo);
        normalisedBitmapData = formatNormaliser(bitmapData, this._bitmapInfo);
        bitmapData = null;
    } catch (ex) {
        this._handleError(ex);
        return;
    }
    this.emit("parsed", normalisedBitmapData);
};
}}),
"[project]/p2p-react/node_modules/pngjs/lib/bitpacker.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
let constants = __turbopack_context__.r("[project]/p2p-react/node_modules/pngjs/lib/constants.js [app-ssr] (ecmascript)");
module.exports = function(dataIn, width, height, options) {
    let outHasAlpha = [
        constants.COLORTYPE_COLOR_ALPHA,
        constants.COLORTYPE_ALPHA
    ].indexOf(options.colorType) !== -1;
    if (options.colorType === options.inputColorType) {
        let bigEndian = function() {
            let buffer = new ArrayBuffer(2);
            new DataView(buffer).setInt16(0, 256, true);
            // Int16Array uses the platform's endianness.
            return new Int16Array(buffer)[0] !== 256;
        }();
        // If no need to convert to grayscale and alpha is present/absent in both, take a fast route
        if (options.bitDepth === 8 || options.bitDepth === 16 && bigEndian) {
            return dataIn;
        }
    }
    // map to a UInt16 array if data is 16bit, fix endianness below
    let data = options.bitDepth !== 16 ? dataIn : new Uint16Array(dataIn.buffer);
    let maxValue = 255;
    let inBpp = constants.COLORTYPE_TO_BPP_MAP[options.inputColorType];
    if (inBpp === 4 && !options.inputHasAlpha) {
        inBpp = 3;
    }
    let outBpp = constants.COLORTYPE_TO_BPP_MAP[options.colorType];
    if (options.bitDepth === 16) {
        maxValue = 65535;
        outBpp *= 2;
    }
    let outData = Buffer.alloc(width * height * outBpp);
    let inIndex = 0;
    let outIndex = 0;
    let bgColor = options.bgColor || {};
    if (bgColor.red === undefined) {
        bgColor.red = maxValue;
    }
    if (bgColor.green === undefined) {
        bgColor.green = maxValue;
    }
    if (bgColor.blue === undefined) {
        bgColor.blue = maxValue;
    }
    function getRGBA() {
        let red;
        let green;
        let blue;
        let alpha = maxValue;
        switch(options.inputColorType){
            case constants.COLORTYPE_COLOR_ALPHA:
                alpha = data[inIndex + 3];
                red = data[inIndex];
                green = data[inIndex + 1];
                blue = data[inIndex + 2];
                break;
            case constants.COLORTYPE_COLOR:
                red = data[inIndex];
                green = data[inIndex + 1];
                blue = data[inIndex + 2];
                break;
            case constants.COLORTYPE_ALPHA:
                alpha = data[inIndex + 1];
                red = data[inIndex];
                green = red;
                blue = red;
                break;
            case constants.COLORTYPE_GRAYSCALE:
                red = data[inIndex];
                green = red;
                blue = red;
                break;
            default:
                throw new Error("input color type:" + options.inputColorType + " is not supported at present");
        }
        if (options.inputHasAlpha) {
            if (!outHasAlpha) {
                alpha /= maxValue;
                red = Math.min(Math.max(Math.round((1 - alpha) * bgColor.red + alpha * red), 0), maxValue);
                green = Math.min(Math.max(Math.round((1 - alpha) * bgColor.green + alpha * green), 0), maxValue);
                blue = Math.min(Math.max(Math.round((1 - alpha) * bgColor.blue + alpha * blue), 0), maxValue);
            }
        }
        return {
            red: red,
            green: green,
            blue: blue,
            alpha: alpha
        };
    }
    for(let y = 0; y < height; y++){
        for(let x = 0; x < width; x++){
            let rgba = getRGBA(data, inIndex);
            switch(options.colorType){
                case constants.COLORTYPE_COLOR_ALPHA:
                case constants.COLORTYPE_COLOR:
                    if (options.bitDepth === 8) {
                        outData[outIndex] = rgba.red;
                        outData[outIndex + 1] = rgba.green;
                        outData[outIndex + 2] = rgba.blue;
                        if (outHasAlpha) {
                            outData[outIndex + 3] = rgba.alpha;
                        }
                    } else {
                        outData.writeUInt16BE(rgba.red, outIndex);
                        outData.writeUInt16BE(rgba.green, outIndex + 2);
                        outData.writeUInt16BE(rgba.blue, outIndex + 4);
                        if (outHasAlpha) {
                            outData.writeUInt16BE(rgba.alpha, outIndex + 6);
                        }
                    }
                    break;
                case constants.COLORTYPE_ALPHA:
                case constants.COLORTYPE_GRAYSCALE:
                    {
                        // Convert to grayscale and alpha
                        let grayscale = (rgba.red + rgba.green + rgba.blue) / 3;
                        if (options.bitDepth === 8) {
                            outData[outIndex] = grayscale;
                            if (outHasAlpha) {
                                outData[outIndex + 1] = rgba.alpha;
                            }
                        } else {
                            outData.writeUInt16BE(grayscale, outIndex);
                            if (outHasAlpha) {
                                outData.writeUInt16BE(rgba.alpha, outIndex + 2);
                            }
                        }
                        break;
                    }
                default:
                    throw new Error("unrecognised color Type " + options.colorType);
            }
            inIndex += inBpp;
            outIndex += outBpp;
        }
    }
    return outData;
};
}}),
"[project]/p2p-react/node_modules/pngjs/lib/filter-pack.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
let paethPredictor = __turbopack_context__.r("[project]/p2p-react/node_modules/pngjs/lib/paeth-predictor.js [app-ssr] (ecmascript)");
function filterNone(pxData, pxPos, byteWidth, rawData, rawPos) {
    for(let x = 0; x < byteWidth; x++){
        rawData[rawPos + x] = pxData[pxPos + x];
    }
}
function filterSumNone(pxData, pxPos, byteWidth) {
    let sum = 0;
    let length = pxPos + byteWidth;
    for(let i = pxPos; i < length; i++){
        sum += Math.abs(pxData[i]);
    }
    return sum;
}
function filterSub(pxData, pxPos, byteWidth, rawData, rawPos, bpp) {
    for(let x = 0; x < byteWidth; x++){
        let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        let val = pxData[pxPos + x] - left;
        rawData[rawPos + x] = val;
    }
}
function filterSumSub(pxData, pxPos, byteWidth, bpp) {
    let sum = 0;
    for(let x = 0; x < byteWidth; x++){
        let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        let val = pxData[pxPos + x] - left;
        sum += Math.abs(val);
    }
    return sum;
}
function filterUp(pxData, pxPos, byteWidth, rawData, rawPos) {
    for(let x = 0; x < byteWidth; x++){
        let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
        let val = pxData[pxPos + x] - up;
        rawData[rawPos + x] = val;
    }
}
function filterSumUp(pxData, pxPos, byteWidth) {
    let sum = 0;
    let length = pxPos + byteWidth;
    for(let x = pxPos; x < length; x++){
        let up = pxPos > 0 ? pxData[x - byteWidth] : 0;
        let val = pxData[x] - up;
        sum += Math.abs(val);
    }
    return sum;
}
function filterAvg(pxData, pxPos, byteWidth, rawData, rawPos, bpp) {
    for(let x = 0; x < byteWidth; x++){
        let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
        let val = pxData[pxPos + x] - (left + up >> 1);
        rawData[rawPos + x] = val;
    }
}
function filterSumAvg(pxData, pxPos, byteWidth, bpp) {
    let sum = 0;
    for(let x = 0; x < byteWidth; x++){
        let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
        let val = pxData[pxPos + x] - (left + up >> 1);
        sum += Math.abs(val);
    }
    return sum;
}
function filterPaeth(pxData, pxPos, byteWidth, rawData, rawPos, bpp) {
    for(let x = 0; x < byteWidth; x++){
        let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
        let upleft = pxPos > 0 && x >= bpp ? pxData[pxPos + x - (byteWidth + bpp)] : 0;
        let val = pxData[pxPos + x] - paethPredictor(left, up, upleft);
        rawData[rawPos + x] = val;
    }
}
function filterSumPaeth(pxData, pxPos, byteWidth, bpp) {
    let sum = 0;
    for(let x = 0; x < byteWidth; x++){
        let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
        let upleft = pxPos > 0 && x >= bpp ? pxData[pxPos + x - (byteWidth + bpp)] : 0;
        let val = pxData[pxPos + x] - paethPredictor(left, up, upleft);
        sum += Math.abs(val);
    }
    return sum;
}
let filters = {
    0: filterNone,
    1: filterSub,
    2: filterUp,
    3: filterAvg,
    4: filterPaeth
};
let filterSums = {
    0: filterSumNone,
    1: filterSumSub,
    2: filterSumUp,
    3: filterSumAvg,
    4: filterSumPaeth
};
module.exports = function(pxData, width, height, options, bpp) {
    let filterTypes;
    if (!("filterType" in options) || options.filterType === -1) {
        filterTypes = [
            0,
            1,
            2,
            3,
            4
        ];
    } else if (typeof options.filterType === "number") {
        filterTypes = [
            options.filterType
        ];
    } else {
        throw new Error("unrecognised filter types");
    }
    if (options.bitDepth === 16) {
        bpp *= 2;
    }
    let byteWidth = width * bpp;
    let rawPos = 0;
    let pxPos = 0;
    let rawData = Buffer.alloc((byteWidth + 1) * height);
    let sel = filterTypes[0];
    for(let y = 0; y < height; y++){
        if (filterTypes.length > 1) {
            // find best filter for this line (with lowest sum of values)
            let min = Infinity;
            for(let i = 0; i < filterTypes.length; i++){
                let sum = filterSums[filterTypes[i]](pxData, pxPos, byteWidth, bpp);
                if (sum < min) {
                    sel = filterTypes[i];
                    min = sum;
                }
            }
        }
        rawData[rawPos] = sel;
        rawPos++;
        filters[sel](pxData, pxPos, byteWidth, rawData, rawPos, bpp);
        rawPos += byteWidth;
        pxPos += byteWidth;
    }
    return rawData;
};
}}),
"[project]/p2p-react/node_modules/pngjs/lib/packer.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
let constants = __turbopack_context__.r("[project]/p2p-react/node_modules/pngjs/lib/constants.js [app-ssr] (ecmascript)");
let CrcStream = __turbopack_context__.r("[project]/p2p-react/node_modules/pngjs/lib/crc.js [app-ssr] (ecmascript)");
let bitPacker = __turbopack_context__.r("[project]/p2p-react/node_modules/pngjs/lib/bitpacker.js [app-ssr] (ecmascript)");
let filter = __turbopack_context__.r("[project]/p2p-react/node_modules/pngjs/lib/filter-pack.js [app-ssr] (ecmascript)");
let zlib = __turbopack_context__.r("[externals]/zlib [external] (zlib, cjs)");
let Packer = module.exports = function(options) {
    this._options = options;
    options.deflateChunkSize = options.deflateChunkSize || 32 * 1024;
    options.deflateLevel = options.deflateLevel != null ? options.deflateLevel : 9;
    options.deflateStrategy = options.deflateStrategy != null ? options.deflateStrategy : 3;
    options.inputHasAlpha = options.inputHasAlpha != null ? options.inputHasAlpha : true;
    options.deflateFactory = options.deflateFactory || zlib.createDeflate;
    options.bitDepth = options.bitDepth || 8;
    // This is outputColorType
    options.colorType = typeof options.colorType === "number" ? options.colorType : constants.COLORTYPE_COLOR_ALPHA;
    options.inputColorType = typeof options.inputColorType === "number" ? options.inputColorType : constants.COLORTYPE_COLOR_ALPHA;
    if ([
        constants.COLORTYPE_GRAYSCALE,
        constants.COLORTYPE_COLOR,
        constants.COLORTYPE_COLOR_ALPHA,
        constants.COLORTYPE_ALPHA
    ].indexOf(options.colorType) === -1) {
        throw new Error("option color type:" + options.colorType + " is not supported at present");
    }
    if ([
        constants.COLORTYPE_GRAYSCALE,
        constants.COLORTYPE_COLOR,
        constants.COLORTYPE_COLOR_ALPHA,
        constants.COLORTYPE_ALPHA
    ].indexOf(options.inputColorType) === -1) {
        throw new Error("option input color type:" + options.inputColorType + " is not supported at present");
    }
    if (options.bitDepth !== 8 && options.bitDepth !== 16) {
        throw new Error("option bit depth:" + options.bitDepth + " is not supported at present");
    }
};
Packer.prototype.getDeflateOptions = function() {
    return {
        chunkSize: this._options.deflateChunkSize,
        level: this._options.deflateLevel,
        strategy: this._options.deflateStrategy
    };
};
Packer.prototype.createDeflate = function() {
    return this._options.deflateFactory(this.getDeflateOptions());
};
Packer.prototype.filterData = function(data, width, height) {
    // convert to correct format for filtering (e.g. right bpp and bit depth)
    let packedData = bitPacker(data, width, height, this._options);
    // filter pixel data
    let bpp = constants.COLORTYPE_TO_BPP_MAP[this._options.colorType];
    let filteredData = filter(packedData, width, height, this._options, bpp);
    return filteredData;
};
Packer.prototype._packChunk = function(type, data) {
    let len = data ? data.length : 0;
    let buf = Buffer.alloc(len + 12);
    buf.writeUInt32BE(len, 0);
    buf.writeUInt32BE(type, 4);
    if (data) {
        data.copy(buf, 8);
    }
    buf.writeInt32BE(CrcStream.crc32(buf.slice(4, buf.length - 4)), buf.length - 4);
    return buf;
};
Packer.prototype.packGAMA = function(gamma) {
    let buf = Buffer.alloc(4);
    buf.writeUInt32BE(Math.floor(gamma * constants.GAMMA_DIVISION), 0);
    return this._packChunk(constants.TYPE_gAMA, buf);
};
Packer.prototype.packIHDR = function(width, height) {
    let buf = Buffer.alloc(13);
    buf.writeUInt32BE(width, 0);
    buf.writeUInt32BE(height, 4);
    buf[8] = this._options.bitDepth; // Bit depth
    buf[9] = this._options.colorType; // colorType
    buf[10] = 0; // compression
    buf[11] = 0; // filter
    buf[12] = 0; // interlace
    return this._packChunk(constants.TYPE_IHDR, buf);
};
Packer.prototype.packIDAT = function(data) {
    return this._packChunk(constants.TYPE_IDAT, data);
};
Packer.prototype.packIEND = function() {
    return this._packChunk(constants.TYPE_IEND, null);
};
}}),
"[project]/p2p-react/node_modules/pngjs/lib/packer-async.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
let util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
let Stream = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)");
let constants = __turbopack_context__.r("[project]/p2p-react/node_modules/pngjs/lib/constants.js [app-ssr] (ecmascript)");
let Packer = __turbopack_context__.r("[project]/p2p-react/node_modules/pngjs/lib/packer.js [app-ssr] (ecmascript)");
let PackerAsync = module.exports = function(opt) {
    Stream.call(this);
    let options = opt || {};
    this._packer = new Packer(options);
    this._deflate = this._packer.createDeflate();
    this.readable = true;
};
util.inherits(PackerAsync, Stream);
PackerAsync.prototype.pack = function(data, width, height, gamma) {
    // Signature
    this.emit("data", Buffer.from(constants.PNG_SIGNATURE));
    this.emit("data", this._packer.packIHDR(width, height));
    if (gamma) {
        this.emit("data", this._packer.packGAMA(gamma));
    }
    let filteredData = this._packer.filterData(data, width, height);
    // compress it
    this._deflate.on("error", this.emit.bind(this, "error"));
    this._deflate.on("data", (function(compressedData) {
        this.emit("data", this._packer.packIDAT(compressedData));
    }).bind(this));
    this._deflate.on("end", (function() {
        this.emit("data", this._packer.packIEND());
        this.emit("end");
    }).bind(this));
    this._deflate.end(filteredData);
};
}}),
"[project]/p2p-react/node_modules/pngjs/lib/sync-inflate.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
let assert = __turbopack_context__.r("[externals]/assert [external] (assert, cjs)").ok;
let zlib = __turbopack_context__.r("[externals]/zlib [external] (zlib, cjs)");
let util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
let kMaxLength = __turbopack_context__.r("[externals]/buffer [external] (buffer, cjs)").kMaxLength;
function Inflate(opts) {
    if (!(this instanceof Inflate)) {
        return new Inflate(opts);
    }
    if (opts && opts.chunkSize < zlib.Z_MIN_CHUNK) {
        opts.chunkSize = zlib.Z_MIN_CHUNK;
    }
    zlib.Inflate.call(this, opts);
    // Node 8 --> 9 compatibility check
    this._offset = this._offset === undefined ? this._outOffset : this._offset;
    this._buffer = this._buffer || this._outBuffer;
    if (opts && opts.maxLength != null) {
        this._maxLength = opts.maxLength;
    }
}
function createInflate(opts) {
    return new Inflate(opts);
}
function _close(engine, callback) {
    if (callback) {
        process.nextTick(callback);
    }
    // Caller may invoke .close after a zlib error (which will null _handle).
    if (!engine._handle) {
        return;
    }
    engine._handle.close();
    engine._handle = null;
}
Inflate.prototype._processChunk = function(chunk, flushFlag, asyncCb) {
    if (typeof asyncCb === "function") {
        return zlib.Inflate._processChunk.call(this, chunk, flushFlag, asyncCb);
    }
    let self = this;
    let availInBefore = chunk && chunk.length;
    let availOutBefore = this._chunkSize - this._offset;
    let leftToInflate = this._maxLength;
    let inOff = 0;
    let buffers = [];
    let nread = 0;
    let error;
    this.on("error", function(err) {
        error = err;
    });
    function handleChunk(availInAfter, availOutAfter) {
        if (self._hadError) {
            return;
        }
        let have = availOutBefore - availOutAfter;
        assert(have >= 0, "have should not go down");
        if (have > 0) {
            let out = self._buffer.slice(self._offset, self._offset + have);
            self._offset += have;
            if (out.length > leftToInflate) {
                out = out.slice(0, leftToInflate);
            }
            buffers.push(out);
            nread += out.length;
            leftToInflate -= out.length;
            if (leftToInflate === 0) {
                return false;
            }
        }
        if (availOutAfter === 0 || self._offset >= self._chunkSize) {
            availOutBefore = self._chunkSize;
            self._offset = 0;
            self._buffer = Buffer.allocUnsafe(self._chunkSize);
        }
        if (availOutAfter === 0) {
            inOff += availInBefore - availInAfter;
            availInBefore = availInAfter;
            return true;
        }
        return false;
    }
    assert(this._handle, "zlib binding closed");
    let res;
    do {
        res = this._handle.writeSync(flushFlag, chunk, inOff, availInBefore, this._buffer, this._offset, availOutBefore); // out_len
        // Node 8 --> 9 compatibility check
        res = res || this._writeState;
    }while (!this._hadError && handleChunk(res[0], res[1]))
    if (this._hadError) {
        throw error;
    }
    if (nread >= kMaxLength) {
        _close(this);
        throw new RangeError("Cannot create final Buffer. It would be larger than 0x" + kMaxLength.toString(16) + " bytes");
    }
    let buf = Buffer.concat(buffers, nread);
    _close(this);
    return buf;
};
util.inherits(Inflate, zlib.Inflate);
function zlibBufferSync(engine, buffer) {
    if (typeof buffer === "string") {
        buffer = Buffer.from(buffer);
    }
    if (!(buffer instanceof Buffer)) {
        throw new TypeError("Not a string or buffer");
    }
    let flushFlag = engine._finishFlushFlag;
    if (flushFlag == null) {
        flushFlag = zlib.Z_FINISH;
    }
    return engine._processChunk(buffer, flushFlag);
}
function inflateSync(buffer, opts) {
    return zlibBufferSync(new Inflate(opts), buffer);
}
module.exports = exports = inflateSync;
exports.Inflate = Inflate;
exports.createInflate = createInflate;
exports.inflateSync = inflateSync;
}}),
"[project]/p2p-react/node_modules/pngjs/lib/sync-reader.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
let SyncReader = module.exports = function(buffer) {
    this._buffer = buffer;
    this._reads = [];
};
SyncReader.prototype.read = function(length, callback) {
    this._reads.push({
        length: Math.abs(length),
        allowLess: length < 0,
        func: callback
    });
};
SyncReader.prototype.process = function() {
    // as long as there is any data and read requests
    while(this._reads.length > 0 && this._buffer.length){
        let read = this._reads[0];
        if (this._buffer.length && (this._buffer.length >= read.length || read.allowLess)) {
            // ok there is any data so that we can satisfy this request
            this._reads.shift(); // == read
            let buf = this._buffer;
            this._buffer = buf.slice(read.length);
            read.func.call(this, buf.slice(0, read.length));
        } else {
            break;
        }
    }
    if (this._reads.length > 0) {
        return new Error("There are some read requests waitng on finished stream");
    }
    if (this._buffer.length > 0) {
        return new Error("unrecognised content at end of stream");
    }
};
}}),
"[project]/p2p-react/node_modules/pngjs/lib/filter-parse-sync.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
let SyncReader = __turbopack_context__.r("[project]/p2p-react/node_modules/pngjs/lib/sync-reader.js [app-ssr] (ecmascript)");
let Filter = __turbopack_context__.r("[project]/p2p-react/node_modules/pngjs/lib/filter-parse.js [app-ssr] (ecmascript)");
exports.process = function(inBuffer, bitmapInfo) {
    let outBuffers = [];
    let reader = new SyncReader(inBuffer);
    let filter = new Filter(bitmapInfo, {
        read: reader.read.bind(reader),
        write: function(bufferPart) {
            outBuffers.push(bufferPart);
        },
        complete: function() {}
    });
    filter.start();
    reader.process();
    return Buffer.concat(outBuffers);
};
}}),
"[project]/p2p-react/node_modules/pngjs/lib/parser-sync.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
let hasSyncZlib = true;
let zlib = __turbopack_context__.r("[externals]/zlib [external] (zlib, cjs)");
let inflateSync = __turbopack_context__.r("[project]/p2p-react/node_modules/pngjs/lib/sync-inflate.js [app-ssr] (ecmascript)");
if (!zlib.deflateSync) {
    hasSyncZlib = false;
}
let SyncReader = __turbopack_context__.r("[project]/p2p-react/node_modules/pngjs/lib/sync-reader.js [app-ssr] (ecmascript)");
let FilterSync = __turbopack_context__.r("[project]/p2p-react/node_modules/pngjs/lib/filter-parse-sync.js [app-ssr] (ecmascript)");
let Parser = __turbopack_context__.r("[project]/p2p-react/node_modules/pngjs/lib/parser.js [app-ssr] (ecmascript)");
let bitmapper = __turbopack_context__.r("[project]/p2p-react/node_modules/pngjs/lib/bitmapper.js [app-ssr] (ecmascript)");
let formatNormaliser = __turbopack_context__.r("[project]/p2p-react/node_modules/pngjs/lib/format-normaliser.js [app-ssr] (ecmascript)");
module.exports = function(buffer, options) {
    if (!hasSyncZlib) {
        throw new Error("To use the sync capability of this library in old node versions, please pin pngjs to v2.3.0");
    }
    let err;
    function handleError(_err_) {
        err = _err_;
    }
    let metaData;
    function handleMetaData(_metaData_) {
        metaData = _metaData_;
    }
    function handleTransColor(transColor) {
        metaData.transColor = transColor;
    }
    function handlePalette(palette) {
        metaData.palette = palette;
    }
    function handleSimpleTransparency() {
        metaData.alpha = true;
    }
    let gamma;
    function handleGamma(_gamma_) {
        gamma = _gamma_;
    }
    let inflateDataList = [];
    function handleInflateData(inflatedData) {
        inflateDataList.push(inflatedData);
    }
    let reader = new SyncReader(buffer);
    let parser = new Parser(options, {
        read: reader.read.bind(reader),
        error: handleError,
        metadata: handleMetaData,
        gamma: handleGamma,
        palette: handlePalette,
        transColor: handleTransColor,
        inflateData: handleInflateData,
        simpleTransparency: handleSimpleTransparency
    });
    parser.start();
    reader.process();
    if (err) {
        throw err;
    }
    //join together the inflate datas
    let inflateData = Buffer.concat(inflateDataList);
    inflateDataList.length = 0;
    let inflatedData;
    if (metaData.interlace) {
        inflatedData = zlib.inflateSync(inflateData);
    } else {
        let rowSize = (metaData.width * metaData.bpp * metaData.depth + 7 >> 3) + 1;
        let imageSize = rowSize * metaData.height;
        inflatedData = inflateSync(inflateData, {
            chunkSize: imageSize,
            maxLength: imageSize
        });
    }
    inflateData = null;
    if (!inflatedData || !inflatedData.length) {
        throw new Error("bad png - invalid inflate data response");
    }
    let unfilteredData = FilterSync.process(inflatedData, metaData);
    inflateData = null;
    let bitmapData = bitmapper.dataToBitMap(unfilteredData, metaData);
    unfilteredData = null;
    let normalisedBitmapData = formatNormaliser(bitmapData, metaData);
    metaData.data = normalisedBitmapData;
    metaData.gamma = gamma || 0;
    return metaData;
};
}}),
"[project]/p2p-react/node_modules/pngjs/lib/packer-sync.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
let hasSyncZlib = true;
let zlib = __turbopack_context__.r("[externals]/zlib [external] (zlib, cjs)");
if (!zlib.deflateSync) {
    hasSyncZlib = false;
}
let constants = __turbopack_context__.r("[project]/p2p-react/node_modules/pngjs/lib/constants.js [app-ssr] (ecmascript)");
let Packer = __turbopack_context__.r("[project]/p2p-react/node_modules/pngjs/lib/packer.js [app-ssr] (ecmascript)");
module.exports = function(metaData, opt) {
    if (!hasSyncZlib) {
        throw new Error("To use the sync capability of this library in old node versions, please pin pngjs to v2.3.0");
    }
    let options = opt || {};
    let packer = new Packer(options);
    let chunks = [];
    // Signature
    chunks.push(Buffer.from(constants.PNG_SIGNATURE));
    // Header
    chunks.push(packer.packIHDR(metaData.width, metaData.height));
    if (metaData.gamma) {
        chunks.push(packer.packGAMA(metaData.gamma));
    }
    let filteredData = packer.filterData(metaData.data, metaData.width, metaData.height);
    // compress it
    let compressedData = zlib.deflateSync(filteredData, packer.getDeflateOptions());
    filteredData = null;
    if (!compressedData || !compressedData.length) {
        throw new Error("bad png - invalid compressed data response");
    }
    chunks.push(packer.packIDAT(compressedData));
    // End
    chunks.push(packer.packIEND());
    return Buffer.concat(chunks);
};
}}),
"[project]/p2p-react/node_modules/pngjs/lib/png-sync.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
let parse = __turbopack_context__.r("[project]/p2p-react/node_modules/pngjs/lib/parser-sync.js [app-ssr] (ecmascript)");
let pack = __turbopack_context__.r("[project]/p2p-react/node_modules/pngjs/lib/packer-sync.js [app-ssr] (ecmascript)");
exports.read = function(buffer, options) {
    return parse(buffer, options || {});
};
exports.write = function(png, options) {
    return pack(png, options);
};
}}),
"[project]/p2p-react/node_modules/pngjs/lib/png.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
let util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
let Stream = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)");
let Parser = __turbopack_context__.r("[project]/p2p-react/node_modules/pngjs/lib/parser-async.js [app-ssr] (ecmascript)");
let Packer = __turbopack_context__.r("[project]/p2p-react/node_modules/pngjs/lib/packer-async.js [app-ssr] (ecmascript)");
let PNGSync = __turbopack_context__.r("[project]/p2p-react/node_modules/pngjs/lib/png-sync.js [app-ssr] (ecmascript)");
let PNG = exports.PNG = function(options) {
    Stream.call(this);
    options = options || {}; // eslint-disable-line no-param-reassign
    // coerce pixel dimensions to integers (also coerces undefined -> 0):
    this.width = options.width | 0;
    this.height = options.height | 0;
    this.data = this.width > 0 && this.height > 0 ? Buffer.alloc(4 * this.width * this.height) : null;
    if (options.fill && this.data) {
        this.data.fill(0);
    }
    this.gamma = 0;
    this.readable = this.writable = true;
    this._parser = new Parser(options);
    this._parser.on("error", this.emit.bind(this, "error"));
    this._parser.on("close", this._handleClose.bind(this));
    this._parser.on("metadata", this._metadata.bind(this));
    this._parser.on("gamma", this._gamma.bind(this));
    this._parser.on("parsed", (function(data) {
        this.data = data;
        this.emit("parsed", data);
    }).bind(this));
    this._packer = new Packer(options);
    this._packer.on("data", this.emit.bind(this, "data"));
    this._packer.on("end", this.emit.bind(this, "end"));
    this._parser.on("close", this._handleClose.bind(this));
    this._packer.on("error", this.emit.bind(this, "error"));
};
util.inherits(PNG, Stream);
PNG.sync = PNGSync;
PNG.prototype.pack = function() {
    if (!this.data || !this.data.length) {
        this.emit("error", "No data provided");
        return this;
    }
    process.nextTick((function() {
        this._packer.pack(this.data, this.width, this.height, this.gamma);
    }).bind(this));
    return this;
};
PNG.prototype.parse = function(data, callback) {
    if (callback) {
        let onParsed, onError;
        onParsed = (function(parsedData) {
            this.removeListener("error", onError);
            this.data = parsedData;
            callback(null, this);
        }).bind(this);
        onError = (function(err) {
            this.removeListener("parsed", onParsed);
            callback(err, null);
        }).bind(this);
        this.once("parsed", onParsed);
        this.once("error", onError);
    }
    this.end(data);
    return this;
};
PNG.prototype.write = function(data) {
    this._parser.write(data);
    return true;
};
PNG.prototype.end = function(data) {
    this._parser.end(data);
};
PNG.prototype._metadata = function(metadata) {
    this.width = metadata.width;
    this.height = metadata.height;
    this.emit("metadata", metadata);
};
PNG.prototype._gamma = function(gamma) {
    this.gamma = gamma;
};
PNG.prototype._handleClose = function() {
    if (!this._parser.writable && !this._packer.readable) {
        this.emit("close");
    }
};
PNG.bitblt = function(src, dst, srcX, srcY, width, height, deltaX, deltaY) {
    // eslint-disable-line max-params
    // coerce pixel dimensions to integers (also coerces undefined -> 0):
    /* eslint-disable no-param-reassign */ srcX |= 0;
    srcY |= 0;
    width |= 0;
    height |= 0;
    deltaX |= 0;
    deltaY |= 0;
    /* eslint-enable no-param-reassign */ if (srcX > src.width || srcY > src.height || srcX + width > src.width || srcY + height > src.height) {
        throw new Error("bitblt reading outside image");
    }
    if (deltaX > dst.width || deltaY > dst.height || deltaX + width > dst.width || deltaY + height > dst.height) {
        throw new Error("bitblt writing outside image");
    }
    for(let y = 0; y < height; y++){
        src.data.copy(dst.data, (deltaY + y) * dst.width + deltaX << 2, (srcY + y) * src.width + srcX << 2, (srcY + y) * src.width + srcX + width << 2);
    }
};
PNG.prototype.bitblt = function(dst, srcX, srcY, width, height, deltaX, deltaY) {
    // eslint-disable-line max-params
    PNG.bitblt(this, dst, srcX, srcY, width, height, deltaX, deltaY);
    return this;
};
PNG.adjustGamma = function(src) {
    if (src.gamma) {
        for(let y = 0; y < src.height; y++){
            for(let x = 0; x < src.width; x++){
                let idx = src.width * y + x << 2;
                for(let i = 0; i < 3; i++){
                    let sample = src.data[idx + i] / 255;
                    sample = Math.pow(sample, 1 / 2.2 / src.gamma);
                    src.data[idx + i] = Math.round(sample * 255);
                }
            }
        }
        src.gamma = 0;
    }
};
PNG.prototype.adjustGamma = function() {
    PNG.adjustGamma(this);
};
}}),
"[project]/p2p-react/node_modules/sdp/sdp.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
/* eslint-env node */ // SDP helpers.
const SDPUtils = {};
// Generate an alphanumeric identifier for cname or mids.
// TODO: use UUIDs instead? https://gist.github.com/jed/982883
SDPUtils.generateIdentifier = function() {
    return Math.random().toString(36).substring(2, 12);
};
// The RTCP CNAME used by all peerconnections from the same JS.
SDPUtils.localCName = SDPUtils.generateIdentifier();
// Splits SDP into lines, dealing with both CRLF and LF.
SDPUtils.splitLines = function(blob) {
    return blob.trim().split('\n').map((line)=>line.trim());
};
// Splits SDP into sessionpart and mediasections. Ensures CRLF.
SDPUtils.splitSections = function(blob) {
    const parts = blob.split('\nm=');
    return parts.map((part, index)=>(index > 0 ? 'm=' + part : part).trim() + '\r\n');
};
// Returns the session description.
SDPUtils.getDescription = function(blob) {
    const sections = SDPUtils.splitSections(blob);
    return sections && sections[0];
};
// Returns the individual media sections.
SDPUtils.getMediaSections = function(blob) {
    const sections = SDPUtils.splitSections(blob);
    sections.shift();
    return sections;
};
// Returns lines that start with a certain prefix.
SDPUtils.matchPrefix = function(blob, prefix) {
    return SDPUtils.splitLines(blob).filter((line)=>line.indexOf(prefix) === 0);
};
// Parses an ICE candidate line. Sample input:
// candidate:702786350 2 udp 41819902 8.8.8.8 60769 typ relay raddr 8.8.8.8
// rport 55996"
// Input can be prefixed with a=.
SDPUtils.parseCandidate = function(line) {
    let parts;
    // Parse both variants.
    if (line.indexOf('a=candidate:') === 0) {
        parts = line.substring(12).split(' ');
    } else {
        parts = line.substring(10).split(' ');
    }
    const candidate = {
        foundation: parts[0],
        component: {
            1: 'rtp',
            2: 'rtcp'
        }[parts[1]] || parts[1],
        protocol: parts[2].toLowerCase(),
        priority: parseInt(parts[3], 10),
        ip: parts[4],
        address: parts[4],
        port: parseInt(parts[5], 10),
        // skip parts[6] == 'typ'
        type: parts[7]
    };
    for(let i = 8; i < parts.length; i += 2){
        switch(parts[i]){
            case 'raddr':
                candidate.relatedAddress = parts[i + 1];
                break;
            case 'rport':
                candidate.relatedPort = parseInt(parts[i + 1], 10);
                break;
            case 'tcptype':
                candidate.tcpType = parts[i + 1];
                break;
            case 'ufrag':
                candidate.ufrag = parts[i + 1]; // for backward compatibility.
                candidate.usernameFragment = parts[i + 1];
                break;
            default:
                if (candidate[parts[i]] === undefined) {
                    candidate[parts[i]] = parts[i + 1];
                }
                break;
        }
    }
    return candidate;
};
// Translates a candidate object into SDP candidate attribute.
// This does not include the a= prefix!
SDPUtils.writeCandidate = function(candidate) {
    const sdp = [];
    sdp.push(candidate.foundation);
    const component = candidate.component;
    if (component === 'rtp') {
        sdp.push(1);
    } else if (component === 'rtcp') {
        sdp.push(2);
    } else {
        sdp.push(component);
    }
    sdp.push(candidate.protocol.toUpperCase());
    sdp.push(candidate.priority);
    sdp.push(candidate.address || candidate.ip);
    sdp.push(candidate.port);
    const type = candidate.type;
    sdp.push('typ');
    sdp.push(type);
    if (type !== 'host' && candidate.relatedAddress && candidate.relatedPort) {
        sdp.push('raddr');
        sdp.push(candidate.relatedAddress);
        sdp.push('rport');
        sdp.push(candidate.relatedPort);
    }
    if (candidate.tcpType && candidate.protocol.toLowerCase() === 'tcp') {
        sdp.push('tcptype');
        sdp.push(candidate.tcpType);
    }
    if (candidate.usernameFragment || candidate.ufrag) {
        sdp.push('ufrag');
        sdp.push(candidate.usernameFragment || candidate.ufrag);
    }
    return 'candidate:' + sdp.join(' ');
};
// Parses an ice-options line, returns an array of option tags.
// Sample input:
// a=ice-options:foo bar
SDPUtils.parseIceOptions = function(line) {
    return line.substring(14).split(' ');
};
// Parses a rtpmap line, returns RTCRtpCoddecParameters. Sample input:
// a=rtpmap:111 opus/48000/2
SDPUtils.parseRtpMap = function(line) {
    let parts = line.substring(9).split(' ');
    const parsed = {
        payloadType: parseInt(parts.shift(), 10)
    };
    parts = parts[0].split('/');
    parsed.name = parts[0];
    parsed.clockRate = parseInt(parts[1], 10); // was: clockrate
    parsed.channels = parts.length === 3 ? parseInt(parts[2], 10) : 1;
    // legacy alias, got renamed back to channels in ORTC.
    parsed.numChannels = parsed.channels;
    return parsed;
};
// Generates a rtpmap line from RTCRtpCodecCapability or
// RTCRtpCodecParameters.
SDPUtils.writeRtpMap = function(codec) {
    let pt = codec.payloadType;
    if (codec.preferredPayloadType !== undefined) {
        pt = codec.preferredPayloadType;
    }
    const channels = codec.channels || codec.numChannels || 1;
    return 'a=rtpmap:' + pt + ' ' + codec.name + '/' + codec.clockRate + (channels !== 1 ? '/' + channels : '') + '\r\n';
};
// Parses a extmap line (headerextension from RFC 5285). Sample input:
// a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
// a=extmap:2/sendonly urn:ietf:params:rtp-hdrext:toffset
SDPUtils.parseExtmap = function(line) {
    const parts = line.substring(9).split(' ');
    return {
        id: parseInt(parts[0], 10),
        direction: parts[0].indexOf('/') > 0 ? parts[0].split('/')[1] : 'sendrecv',
        uri: parts[1],
        attributes: parts.slice(2).join(' ')
    };
};
// Generates an extmap line from RTCRtpHeaderExtensionParameters or
// RTCRtpHeaderExtension.
SDPUtils.writeExtmap = function(headerExtension) {
    return 'a=extmap:' + (headerExtension.id || headerExtension.preferredId) + (headerExtension.direction && headerExtension.direction !== 'sendrecv' ? '/' + headerExtension.direction : '') + ' ' + headerExtension.uri + (headerExtension.attributes ? ' ' + headerExtension.attributes : '') + '\r\n';
};
// Parses a fmtp line, returns dictionary. Sample input:
// a=fmtp:96 vbr=on;cng=on
// Also deals with vbr=on; cng=on
// Non-key-value such as telephone-events `0-15` get parsed as
// {`0-15`:undefined}
SDPUtils.parseFmtp = function(line) {
    const parsed = {};
    let kv;
    const parts = line.substring(line.indexOf(' ') + 1).split(';');
    for(let j = 0; j < parts.length; j++){
        kv = parts[j].trim().split('=');
        parsed[kv[0].trim()] = kv[1];
    }
    return parsed;
};
// Generates a fmtp line from RTCRtpCodecCapability or RTCRtpCodecParameters.
SDPUtils.writeFmtp = function(codec) {
    let line = '';
    let pt = codec.payloadType;
    if (codec.preferredPayloadType !== undefined) {
        pt = codec.preferredPayloadType;
    }
    if (codec.parameters && Object.keys(codec.parameters).length) {
        const params = [];
        Object.keys(codec.parameters).forEach((param)=>{
            if (codec.parameters[param] !== undefined) {
                params.push(param + '=' + codec.parameters[param]);
            } else {
                params.push(param);
            }
        });
        line += 'a=fmtp:' + pt + ' ' + params.join(';') + '\r\n';
    }
    return line;
};
// Parses a rtcp-fb line, returns RTCPRtcpFeedback object. Sample input:
// a=rtcp-fb:98 nack rpsi
SDPUtils.parseRtcpFb = function(line) {
    const parts = line.substring(line.indexOf(' ') + 1).split(' ');
    return {
        type: parts.shift(),
        parameter: parts.join(' ')
    };
};
// Generate a=rtcp-fb lines from RTCRtpCodecCapability or RTCRtpCodecParameters.
SDPUtils.writeRtcpFb = function(codec) {
    let lines = '';
    let pt = codec.payloadType;
    if (codec.preferredPayloadType !== undefined) {
        pt = codec.preferredPayloadType;
    }
    if (codec.rtcpFeedback && codec.rtcpFeedback.length) {
        // FIXME: special handling for trr-int?
        codec.rtcpFeedback.forEach((fb)=>{
            lines += 'a=rtcp-fb:' + pt + ' ' + fb.type + (fb.parameter && fb.parameter.length ? ' ' + fb.parameter : '') + '\r\n';
        });
    }
    return lines;
};
// Parses a RFC 5576 ssrc media attribute. Sample input:
// a=ssrc:3735928559 cname:something
SDPUtils.parseSsrcMedia = function(line) {
    const sp = line.indexOf(' ');
    const parts = {
        ssrc: parseInt(line.substring(7, sp), 10)
    };
    const colon = line.indexOf(':', sp);
    if (colon > -1) {
        parts.attribute = line.substring(sp + 1, colon);
        parts.value = line.substring(colon + 1);
    } else {
        parts.attribute = line.substring(sp + 1);
    }
    return parts;
};
// Parse a ssrc-group line (see RFC 5576). Sample input:
// a=ssrc-group:semantics 12 34
SDPUtils.parseSsrcGroup = function(line) {
    const parts = line.substring(13).split(' ');
    return {
        semantics: parts.shift(),
        ssrcs: parts.map((ssrc)=>parseInt(ssrc, 10))
    };
};
// Extracts the MID (RFC 5888) from a media section.
// Returns the MID or undefined if no mid line was found.
SDPUtils.getMid = function(mediaSection) {
    const mid = SDPUtils.matchPrefix(mediaSection, 'a=mid:')[0];
    if (mid) {
        return mid.substring(6);
    }
};
// Parses a fingerprint line for DTLS-SRTP.
SDPUtils.parseFingerprint = function(line) {
    const parts = line.substring(14).split(' ');
    return {
        algorithm: parts[0].toLowerCase(),
        value: parts[1].toUpperCase()
    };
};
// Extracts DTLS parameters from SDP media section or sessionpart.
// FIXME: for consistency with other functions this should only
//   get the fingerprint line as input. See also getIceParameters.
SDPUtils.getDtlsParameters = function(mediaSection, sessionpart) {
    const lines = SDPUtils.matchPrefix(mediaSection + sessionpart, 'a=fingerprint:');
    // Note: a=setup line is ignored since we use the 'auto' role in Edge.
    return {
        role: 'auto',
        fingerprints: lines.map(SDPUtils.parseFingerprint)
    };
};
// Serializes DTLS parameters to SDP.
SDPUtils.writeDtlsParameters = function(params, setupType) {
    let sdp = 'a=setup:' + setupType + '\r\n';
    params.fingerprints.forEach((fp)=>{
        sdp += 'a=fingerprint:' + fp.algorithm + ' ' + fp.value + '\r\n';
    });
    return sdp;
};
// Parses a=crypto lines into
//   https://rawgit.com/aboba/edgertc/master/msortc-rs4.html#dictionary-rtcsrtpsdesparameters-members
SDPUtils.parseCryptoLine = function(line) {
    const parts = line.substring(9).split(' ');
    return {
        tag: parseInt(parts[0], 10),
        cryptoSuite: parts[1],
        keyParams: parts[2],
        sessionParams: parts.slice(3)
    };
};
SDPUtils.writeCryptoLine = function(parameters) {
    return 'a=crypto:' + parameters.tag + ' ' + parameters.cryptoSuite + ' ' + (typeof parameters.keyParams === 'object' ? SDPUtils.writeCryptoKeyParams(parameters.keyParams) : parameters.keyParams) + (parameters.sessionParams ? ' ' + parameters.sessionParams.join(' ') : '') + '\r\n';
};
// Parses the crypto key parameters into
//   https://rawgit.com/aboba/edgertc/master/msortc-rs4.html#rtcsrtpkeyparam*
SDPUtils.parseCryptoKeyParams = function(keyParams) {
    if (keyParams.indexOf('inline:') !== 0) {
        return null;
    }
    const parts = keyParams.substring(7).split('|');
    return {
        keyMethod: 'inline',
        keySalt: parts[0],
        lifeTime: parts[1],
        mkiValue: parts[2] ? parts[2].split(':')[0] : undefined,
        mkiLength: parts[2] ? parts[2].split(':')[1] : undefined
    };
};
SDPUtils.writeCryptoKeyParams = function(keyParams) {
    return keyParams.keyMethod + ':' + keyParams.keySalt + (keyParams.lifeTime ? '|' + keyParams.lifeTime : '') + (keyParams.mkiValue && keyParams.mkiLength ? '|' + keyParams.mkiValue + ':' + keyParams.mkiLength : '');
};
// Extracts all SDES parameters.
SDPUtils.getCryptoParameters = function(mediaSection, sessionpart) {
    const lines = SDPUtils.matchPrefix(mediaSection + sessionpart, 'a=crypto:');
    return lines.map(SDPUtils.parseCryptoLine);
};
// Parses ICE information from SDP media section or sessionpart.
// FIXME: for consistency with other functions this should only
//   get the ice-ufrag and ice-pwd lines as input.
SDPUtils.getIceParameters = function(mediaSection, sessionpart) {
    const ufrag = SDPUtils.matchPrefix(mediaSection + sessionpart, 'a=ice-ufrag:')[0];
    const pwd = SDPUtils.matchPrefix(mediaSection + sessionpart, 'a=ice-pwd:')[0];
    if (!(ufrag && pwd)) {
        return null;
    }
    return {
        usernameFragment: ufrag.substring(12),
        password: pwd.substring(10)
    };
};
// Serializes ICE parameters to SDP.
SDPUtils.writeIceParameters = function(params) {
    let sdp = 'a=ice-ufrag:' + params.usernameFragment + '\r\n' + 'a=ice-pwd:' + params.password + '\r\n';
    if (params.iceLite) {
        sdp += 'a=ice-lite\r\n';
    }
    return sdp;
};
// Parses the SDP media section and returns RTCRtpParameters.
SDPUtils.parseRtpParameters = function(mediaSection) {
    const description = {
        codecs: [],
        headerExtensions: [],
        fecMechanisms: [],
        rtcp: []
    };
    const lines = SDPUtils.splitLines(mediaSection);
    const mline = lines[0].split(' ');
    description.profile = mline[2];
    for(let i = 3; i < mline.length; i++){
        const pt = mline[i];
        const rtpmapline = SDPUtils.matchPrefix(mediaSection, 'a=rtpmap:' + pt + ' ')[0];
        if (rtpmapline) {
            const codec = SDPUtils.parseRtpMap(rtpmapline);
            const fmtps = SDPUtils.matchPrefix(mediaSection, 'a=fmtp:' + pt + ' ');
            // Only the first a=fmtp:<pt> is considered.
            codec.parameters = fmtps.length ? SDPUtils.parseFmtp(fmtps[0]) : {};
            codec.rtcpFeedback = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-fb:' + pt + ' ').map(SDPUtils.parseRtcpFb);
            description.codecs.push(codec);
            // parse FEC mechanisms from rtpmap lines.
            switch(codec.name.toUpperCase()){
                case 'RED':
                case 'ULPFEC':
                    description.fecMechanisms.push(codec.name.toUpperCase());
                    break;
                default:
                    break;
            }
        }
    }
    SDPUtils.matchPrefix(mediaSection, 'a=extmap:').forEach((line)=>{
        description.headerExtensions.push(SDPUtils.parseExtmap(line));
    });
    const wildcardRtcpFb = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-fb:* ').map(SDPUtils.parseRtcpFb);
    description.codecs.forEach((codec)=>{
        wildcardRtcpFb.forEach((fb)=>{
            const duplicate = codec.rtcpFeedback.find((existingFeedback)=>{
                return existingFeedback.type === fb.type && existingFeedback.parameter === fb.parameter;
            });
            if (!duplicate) {
                codec.rtcpFeedback.push(fb);
            }
        });
    });
    // FIXME: parse rtcp.
    return description;
};
// Generates parts of the SDP media section describing the capabilities /
// parameters.
SDPUtils.writeRtpDescription = function(kind, caps) {
    let sdp = '';
    // Build the mline.
    sdp += 'm=' + kind + ' ';
    sdp += caps.codecs.length > 0 ? '9' : '0'; // reject if no codecs.
    sdp += ' ' + (caps.profile || 'UDP/TLS/RTP/SAVPF') + ' ';
    sdp += caps.codecs.map((codec)=>{
        if (codec.preferredPayloadType !== undefined) {
            return codec.preferredPayloadType;
        }
        return codec.payloadType;
    }).join(' ') + '\r\n';
    sdp += 'c=IN IP4 0.0.0.0\r\n';
    sdp += 'a=rtcp:9 IN IP4 0.0.0.0\r\n';
    // Add a=rtpmap lines for each codec. Also fmtp and rtcp-fb.
    caps.codecs.forEach((codec)=>{
        sdp += SDPUtils.writeRtpMap(codec);
        sdp += SDPUtils.writeFmtp(codec);
        sdp += SDPUtils.writeRtcpFb(codec);
    });
    let maxptime = 0;
    caps.codecs.forEach((codec)=>{
        if (codec.maxptime > maxptime) {
            maxptime = codec.maxptime;
        }
    });
    if (maxptime > 0) {
        sdp += 'a=maxptime:' + maxptime + '\r\n';
    }
    if (caps.headerExtensions) {
        caps.headerExtensions.forEach((extension)=>{
            sdp += SDPUtils.writeExtmap(extension);
        });
    }
    // FIXME: write fecMechanisms.
    return sdp;
};
// Parses the SDP media section and returns an array of
// RTCRtpEncodingParameters.
SDPUtils.parseRtpEncodingParameters = function(mediaSection) {
    const encodingParameters = [];
    const description = SDPUtils.parseRtpParameters(mediaSection);
    const hasRed = description.fecMechanisms.indexOf('RED') !== -1;
    const hasUlpfec = description.fecMechanisms.indexOf('ULPFEC') !== -1;
    // filter a=ssrc:... cname:, ignore PlanB-msid
    const ssrcs = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:').map((line)=>SDPUtils.parseSsrcMedia(line)).filter((parts)=>parts.attribute === 'cname');
    const primarySsrc = ssrcs.length > 0 && ssrcs[0].ssrc;
    let secondarySsrc;
    const flows = SDPUtils.matchPrefix(mediaSection, 'a=ssrc-group:FID').map((line)=>{
        const parts = line.substring(17).split(' ');
        return parts.map((part)=>parseInt(part, 10));
    });
    if (flows.length > 0 && flows[0].length > 1 && flows[0][0] === primarySsrc) {
        secondarySsrc = flows[0][1];
    }
    description.codecs.forEach((codec)=>{
        if (codec.name.toUpperCase() === 'RTX' && codec.parameters.apt) {
            let encParam = {
                ssrc: primarySsrc,
                codecPayloadType: parseInt(codec.parameters.apt, 10)
            };
            if (primarySsrc && secondarySsrc) {
                encParam.rtx = {
                    ssrc: secondarySsrc
                };
            }
            encodingParameters.push(encParam);
            if (hasRed) {
                encParam = JSON.parse(JSON.stringify(encParam));
                encParam.fec = {
                    ssrc: primarySsrc,
                    mechanism: hasUlpfec ? 'red+ulpfec' : 'red'
                };
                encodingParameters.push(encParam);
            }
        }
    });
    if (encodingParameters.length === 0 && primarySsrc) {
        encodingParameters.push({
            ssrc: primarySsrc
        });
    }
    // we support both b=AS and b=TIAS but interpret AS as TIAS.
    let bandwidth = SDPUtils.matchPrefix(mediaSection, 'b=');
    if (bandwidth.length) {
        if (bandwidth[0].indexOf('b=TIAS:') === 0) {
            bandwidth = parseInt(bandwidth[0].substring(7), 10);
        } else if (bandwidth[0].indexOf('b=AS:') === 0) {
            // use formula from JSEP to convert b=AS to TIAS value.
            bandwidth = parseInt(bandwidth[0].substring(5), 10) * 1000 * 0.95 - 50 * 40 * 8;
        } else {
            bandwidth = undefined;
        }
        encodingParameters.forEach((params)=>{
            params.maxBitrate = bandwidth;
        });
    }
    return encodingParameters;
};
// parses http://draft.ortc.org/#rtcrtcpparameters*
SDPUtils.parseRtcpParameters = function(mediaSection) {
    const rtcpParameters = {};
    // Gets the first SSRC. Note that with RTX there might be multiple
    // SSRCs.
    const remoteSsrc = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:').map((line)=>SDPUtils.parseSsrcMedia(line)).filter((obj)=>obj.attribute === 'cname')[0];
    if (remoteSsrc) {
        rtcpParameters.cname = remoteSsrc.value;
        rtcpParameters.ssrc = remoteSsrc.ssrc;
    }
    // Edge uses the compound attribute instead of reducedSize
    // compound is !reducedSize
    const rsize = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-rsize');
    rtcpParameters.reducedSize = rsize.length > 0;
    rtcpParameters.compound = rsize.length === 0;
    // parses the rtcp-mux attrіbute.
    // Note that Edge does not support unmuxed RTCP.
    const mux = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-mux');
    rtcpParameters.mux = mux.length > 0;
    return rtcpParameters;
};
SDPUtils.writeRtcpParameters = function(rtcpParameters) {
    let sdp = '';
    if (rtcpParameters.reducedSize) {
        sdp += 'a=rtcp-rsize\r\n';
    }
    if (rtcpParameters.mux) {
        sdp += 'a=rtcp-mux\r\n';
    }
    if (rtcpParameters.ssrc !== undefined && rtcpParameters.cname) {
        sdp += 'a=ssrc:' + rtcpParameters.ssrc + ' cname:' + rtcpParameters.cname + '\r\n';
    }
    return sdp;
};
// parses either a=msid: or a=ssrc:... msid lines and returns
// the id of the MediaStream and MediaStreamTrack.
SDPUtils.parseMsid = function(mediaSection) {
    let parts;
    const spec = SDPUtils.matchPrefix(mediaSection, 'a=msid:');
    if (spec.length === 1) {
        parts = spec[0].substring(7).split(' ');
        return {
            stream: parts[0],
            track: parts[1]
        };
    }
    const planB = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:').map((line)=>SDPUtils.parseSsrcMedia(line)).filter((msidParts)=>msidParts.attribute === 'msid');
    if (planB.length > 0) {
        parts = planB[0].value.split(' ');
        return {
            stream: parts[0],
            track: parts[1]
        };
    }
};
// SCTP
// parses draft-ietf-mmusic-sctp-sdp-26 first and falls back
// to draft-ietf-mmusic-sctp-sdp-05
SDPUtils.parseSctpDescription = function(mediaSection) {
    const mline = SDPUtils.parseMLine(mediaSection);
    const maxSizeLine = SDPUtils.matchPrefix(mediaSection, 'a=max-message-size:');
    let maxMessageSize;
    if (maxSizeLine.length > 0) {
        maxMessageSize = parseInt(maxSizeLine[0].substring(19), 10);
    }
    if (isNaN(maxMessageSize)) {
        maxMessageSize = 65536;
    }
    const sctpPort = SDPUtils.matchPrefix(mediaSection, 'a=sctp-port:');
    if (sctpPort.length > 0) {
        return {
            port: parseInt(sctpPort[0].substring(12), 10),
            protocol: mline.fmt,
            maxMessageSize
        };
    }
    const sctpMapLines = SDPUtils.matchPrefix(mediaSection, 'a=sctpmap:');
    if (sctpMapLines.length > 0) {
        const parts = sctpMapLines[0].substring(10).split(' ');
        return {
            port: parseInt(parts[0], 10),
            protocol: parts[1],
            maxMessageSize
        };
    }
};
// SCTP
// outputs the draft-ietf-mmusic-sctp-sdp-26 version that all browsers
// support by now receiving in this format, unless we originally parsed
// as the draft-ietf-mmusic-sctp-sdp-05 format (indicated by the m-line
// protocol of DTLS/SCTP -- without UDP/ or TCP/)
SDPUtils.writeSctpDescription = function(media, sctp) {
    let output = [];
    if (media.protocol !== 'DTLS/SCTP') {
        output = [
            'm=' + media.kind + ' 9 ' + media.protocol + ' ' + sctp.protocol + '\r\n',
            'c=IN IP4 0.0.0.0\r\n',
            'a=sctp-port:' + sctp.port + '\r\n'
        ];
    } else {
        output = [
            'm=' + media.kind + ' 9 ' + media.protocol + ' ' + sctp.port + '\r\n',
            'c=IN IP4 0.0.0.0\r\n',
            'a=sctpmap:' + sctp.port + ' ' + sctp.protocol + ' 65535\r\n'
        ];
    }
    if (sctp.maxMessageSize !== undefined) {
        output.push('a=max-message-size:' + sctp.maxMessageSize + '\r\n');
    }
    return output.join('');
};
// Generate a session ID for SDP.
// https://tools.ietf.org/html/draft-ietf-rtcweb-jsep-20#section-5.2.1
// recommends using a cryptographically random +ve 64-bit value
// but right now this should be acceptable and within the right range
SDPUtils.generateSessionId = function() {
    return Math.random().toString().substr(2, 22);
};
// Write boiler plate for start of SDP
// sessId argument is optional - if not supplied it will
// be generated randomly
// sessVersion is optional and defaults to 2
// sessUser is optional and defaults to 'thisisadapterortc'
SDPUtils.writeSessionBoilerplate = function(sessId, sessVer, sessUser) {
    let sessionId;
    const version = sessVer !== undefined ? sessVer : 2;
    if (sessId) {
        sessionId = sessId;
    } else {
        sessionId = SDPUtils.generateSessionId();
    }
    const user = sessUser || 'thisisadapterortc';
    // FIXME: sess-id should be an NTP timestamp.
    return 'v=0\r\n' + 'o=' + user + ' ' + sessionId + ' ' + version + ' IN IP4 127.0.0.1\r\n' + 's=-\r\n' + 't=0 0\r\n';
};
// Gets the direction from the mediaSection or the sessionpart.
SDPUtils.getDirection = function(mediaSection, sessionpart) {
    // Look for sendrecv, sendonly, recvonly, inactive, default to sendrecv.
    const lines = SDPUtils.splitLines(mediaSection);
    for(let i = 0; i < lines.length; i++){
        switch(lines[i]){
            case 'a=sendrecv':
            case 'a=sendonly':
            case 'a=recvonly':
            case 'a=inactive':
                return lines[i].substring(2);
            default:
        }
    }
    if (sessionpart) {
        return SDPUtils.getDirection(sessionpart);
    }
    return 'sendrecv';
};
SDPUtils.getKind = function(mediaSection) {
    const lines = SDPUtils.splitLines(mediaSection);
    const mline = lines[0].split(' ');
    return mline[0].substring(2);
};
SDPUtils.isRejected = function(mediaSection) {
    return mediaSection.split(' ', 2)[1] === '0';
};
SDPUtils.parseMLine = function(mediaSection) {
    const lines = SDPUtils.splitLines(mediaSection);
    const parts = lines[0].substring(2).split(' ');
    return {
        kind: parts[0],
        port: parseInt(parts[1], 10),
        protocol: parts[2],
        fmt: parts.slice(3).join(' ')
    };
};
SDPUtils.parseOLine = function(mediaSection) {
    const line = SDPUtils.matchPrefix(mediaSection, 'o=')[0];
    const parts = line.substring(2).split(' ');
    return {
        username: parts[0],
        sessionId: parts[1],
        sessionVersion: parseInt(parts[2], 10),
        netType: parts[3],
        addressType: parts[4],
        address: parts[5]
    };
};
// a very naive interpretation of a valid SDP.
SDPUtils.isValidSDP = function(blob) {
    if (typeof blob !== 'string' || blob.length === 0) {
        return false;
    }
    const lines = SDPUtils.splitLines(blob);
    for(let i = 0; i < lines.length; i++){
        if (lines[i].length < 2 || lines[i].charAt(1) !== '=') {
            return false;
        }
    // TODO: check the modifier a bit more.
    }
    return true;
};
// Expose public methods.
if ("TURBOPACK compile-time truthy", 1) {
    module.exports = SDPUtils;
}
}}),
"[project]/p2p-react/node_modules/barcode-detector/dist/es/ponyfill.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "BarcodeDetector": ()=>Eo,
    "ZXING_CPP_COMMIT": ()=>bo,
    "ZXING_WASM_SHA256": ()=>Po,
    "ZXING_WASM_VERSION": ()=>$o,
    "prepareZXingModule": ()=>Be,
    "purgeZXingModule": ()=>Co,
    "setZXingModuleOverrides": ()=>To
});
var Ae = (o)=>{
    throw TypeError(o);
};
var Se = (o, f, c)=>f.has(o) || Ae("Cannot " + c);
var Ie = (o, f, c)=>(Se(o, f, "read from private field"), c ? c.call(o) : f.get(o)), De = (o, f, c)=>f.has(o) ? Ae("Cannot add the same private member more than once") : f instanceof WeakSet ? f.add(o) : f.set(o, c), Me = (o, f, c, T)=>(Se(o, f, "write to private field"), T ? T.call(o, c) : f.set(o, c), c);
const Dt = [
    [
        "Aztec",
        "M"
    ],
    [
        "Codabar",
        "L"
    ],
    [
        "Code39",
        "L"
    ],
    [
        "Code93",
        "L"
    ],
    [
        "Code128",
        "L"
    ],
    [
        "DataBar",
        "L"
    ],
    [
        "DataBarExpanded",
        "L"
    ],
    [
        "DataMatrix",
        "M"
    ],
    [
        "EAN-8",
        "L"
    ],
    [
        "EAN-13",
        "L"
    ],
    [
        "ITF",
        "L"
    ],
    [
        "MaxiCode",
        "M"
    ],
    [
        "PDF417",
        "M"
    ],
    [
        "QRCode",
        "M"
    ],
    [
        "UPC-A",
        "L"
    ],
    [
        "UPC-E",
        "L"
    ],
    [
        "MicroQRCode",
        "M"
    ],
    [
        "rMQRCode",
        "M"
    ],
    [
        "DXFilmEdge",
        "L"
    ],
    [
        "DataBarLimited",
        "L"
    ]
], Mt = Dt.map(([o])=>o), La = Mt.filter((o, f)=>Dt[f][1] === "L"), Ba = Mt.filter((o, f)=>Dt[f][1] === "M");
function Yt(o) {
    switch(o){
        case "Linear-Codes":
            return La.reduce((f, c)=>f | Yt(c), 0);
        case "Matrix-Codes":
            return Ba.reduce((f, c)=>f | Yt(c), 0);
        case "Any":
            return (1 << Dt.length) - 1;
        case "None":
            return 0;
        default:
            return 1 << Mt.indexOf(o);
    }
}
function Wa(o) {
    if (o === 0) return "None";
    const f = 31 - Math.clz32(o);
    return Mt[f];
}
function Ua(o) {
    return o.reduce((f, c)=>f | Yt(c), 0);
}
const Va = [
    "LocalAverage",
    "GlobalHistogram",
    "FixedThreshold",
    "BoolCast"
];
function ka(o) {
    return Va.indexOf(o);
}
const Fe = [
    "Unknown",
    "ASCII",
    "ISO8859_1",
    "ISO8859_2",
    "ISO8859_3",
    "ISO8859_4",
    "ISO8859_5",
    "ISO8859_6",
    "ISO8859_7",
    "ISO8859_8",
    "ISO8859_9",
    "ISO8859_10",
    "ISO8859_11",
    "ISO8859_13",
    "ISO8859_14",
    "ISO8859_15",
    "ISO8859_16",
    "Cp437",
    "Cp1250",
    "Cp1251",
    "Cp1252",
    "Cp1256",
    "Shift_JIS",
    "Big5",
    "GB2312",
    "GB18030",
    "EUC_JP",
    "EUC_KR",
    "UTF16BE",
    /**
   * UnicodeBig [[deprecated]]
   */ "UTF16BE",
    "UTF8",
    "UTF16LE",
    "UTF32BE",
    "UTF32LE",
    "BINARY"
];
function Ha(o) {
    return o === "UnicodeBig" ? Fe.indexOf("UTF16BE") : Fe.indexOf(o);
}
const Na = [
    "Text",
    "Binary",
    "Mixed",
    "GS1",
    "ISO15434",
    "UnknownECI"
];
function za(o) {
    return Na[o];
}
const Ga = [
    "Ignore",
    "Read",
    "Require"
];
function Xa(o) {
    return Ga.indexOf(o);
}
const qa = [
    "Plain",
    "ECI",
    "HRI",
    "Hex",
    "Escaped"
];
function Ya(o) {
    return qa.indexOf(o);
}
const It = {
    formats: [],
    tryHarder: !0,
    tryRotate: !0,
    tryInvert: !0,
    tryDownscale: !0,
    tryDenoise: !1,
    binarizer: "LocalAverage",
    isPure: !1,
    downscaleFactor: 3,
    downscaleThreshold: 500,
    minLineCount: 2,
    maxNumberOfSymbols: 255,
    tryCode39ExtendedMode: !0,
    returnErrors: !1,
    eanAddOnSymbol: "Ignore",
    textMode: "HRI",
    characterSet: "Unknown"
};
function je(o) {
    return {
        ...o,
        formats: Ua(o.formats),
        binarizer: ka(o.binarizer),
        eanAddOnSymbol: Xa(o.eanAddOnSymbol),
        textMode: Ya(o.textMode),
        characterSet: Ha(o.characterSet)
    };
}
function Za(o) {
    return {
        ...o,
        format: Wa(o.format),
        contentType: za(o.contentType),
        eccLevel: o.ecLevel
    };
}
const $o = "2.1.2", bo = "a1516b34167cff504bf3c83698ea841e13a8f7f1", Qa = {
    locateFile: (o, f)=>{
        const c = o.match(/_(.+?)\.wasm$/);
        return c ? `https://fastly.jsdelivr.net/npm/zxing-wasm@2.1.2/dist/${c[1]}/${o}` : f + o;
    }
}, St = /* @__PURE__ */ new WeakMap();
function Ja(o, f) {
    return Object.is(o, f) || Object.keys(o).length === Object.keys(f).length && Object.keys(o).every((c)=>Object.prototype.hasOwnProperty.call(f, c) && o[c] === f[c]);
}
function Le(o, { overrides: f, equalityFn: c = Ja, fireImmediately: T = !1 } = {}) {
    var $;
    const [x, D] = ($ = St.get(o)) != null ? $ : [
        Qa
    ], R = f != null ? f : x;
    let O;
    if (T) {
        if (D && (O = c(x, R))) return D;
        const M = o({
            ...R
        });
        return St.set(o, [
            R,
            M
        ]), M;
    }
    (O != null ? O : c(x, R)) || St.set(o, [
        R
    ]);
}
function Ka(o) {
    St.delete(o);
}
async function to(o, f, c = It) {
    const T = {
        ...It,
        ...c
    }, $ = await Le(o, {
        fireImmediately: !0
    });
    let x, D;
    if ("width" in f && "height" in f && "data" in f) {
        const { data: O, data: { byteLength: M }, width: F, height: q } = f;
        D = $._malloc(M), $.HEAPU8.set(O, D), x = $.readBarcodesFromPixmap(D, F, q, je(T));
    } else {
        let O, M;
        if ("buffer" in f) [O, M] = [
            f.byteLength,
            f
        ];
        else if ("byteLength" in f) [O, M] = [
            f.byteLength,
            new Uint8Array(f)
        ];
        else if ("size" in f) [O, M] = [
            f.size,
            new Uint8Array(await f.arrayBuffer())
        ];
        else throw new TypeError("Invalid input type");
        D = $._malloc(O), $.HEAPU8.set(M, D), x = $.readBarcodesFromImage(D, O, je(T));
    }
    $._free(D);
    const R = [];
    for(let O = 0; O < x.size(); ++O)R.push(Za(x.get(O)));
    return R;
}
({
    ...It,
    formats: [
        ...It.formats
    ]
});
var Qt = async function(o = {}) {
    var f, c = o, T, $, x = new Promise((e, t)=>{
        T = e, $ = t;
    }), D = "undefined" == "object", R = typeof Bun < "u", O = typeof WorkerGlobalScope < "u";
    typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string" && process.type != "renderer";
    var M = "./this.program", F = "";
    function q(e) {
        return c.locateFile ? c.locateFile(e, F) : F + e;
    }
    var rt, Y;
    (D || O || R) && (O ? F = self.location.href : typeof document < "u" && document.currentScript && (F = document.currentScript.src), F.startsWith("blob:") ? F = "" : F = F.slice(0, F.replace(/[?#].*/, "").lastIndexOf("/") + 1), O && (Y = (e)=>{
        var t = new XMLHttpRequest();
        return t.open("GET", e, !1), t.responseType = "arraybuffer", t.send(null), new Uint8Array(t.response);
    }), rt = async (e)=>{
        var t = await fetch(e, {
            credentials: "same-origin"
        });
        if (t.ok) return t.arrayBuffer();
        throw new Error(t.status + " : " + t.url);
    });
    var st = console.log.bind(console), k = console.error.bind(console), Z, nt, Jt = !1, Q, B, ut, vt, at, P, Kt, te;
    function ee() {
        var e = nt.buffer;
        Q = new Int8Array(e), ut = new Int16Array(e), c.HEAPU8 = B = new Uint8Array(e), vt = new Uint16Array(e), at = new Int32Array(e), P = new Uint32Array(e), Kt = new Float32Array(e), te = new Float64Array(e);
    }
    function qe() {
        if (c.preRun) for(typeof c.preRun == "function" && (c.preRun = [
            c.preRun
        ]); c.preRun.length;)sr(c.preRun.shift());
        re(ae);
    }
    function Ye() {
        E.ya();
    }
    function Ze() {
        if (c.postRun) for(typeof c.postRun == "function" && (c.postRun = [
            c.postRun
        ]); c.postRun.length;)ir(c.postRun.shift());
        re(ne);
    }
    var J = 0, ct = null;
    function Qe(e) {
        var t;
        J++, (t = c.monitorRunDependencies) === null || t === void 0 || t.call(c, J);
    }
    function Je(e) {
        var t;
        if (J--, (t = c.monitorRunDependencies) === null || t === void 0 || t.call(c, J), J == 0 && ct) {
            var r = ct;
            ct = null, r();
        }
    }
    function Ft(e) {
        var t;
        (t = c.onAbort) === null || t === void 0 || t.call(c, e), e = "Aborted(" + e + ")", k(e), Jt = !0, e += ". Build with -sASSERTIONS for more info.";
        var r = new WebAssembly.RuntimeError(e);
        throw $(r), r;
    }
    var yt;
    function Ke() {
        return q("zxing_reader.wasm");
    }
    function tr(e) {
        if (e == yt && Z) return new Uint8Array(Z);
        if (Y) return Y(e);
        throw "both async and sync fetching of the wasm failed";
    }
    async function er(e) {
        if (!Z) try {
            var t = await rt(e);
            return new Uint8Array(t);
        } catch  {}
        return tr(e);
    }
    async function rr(e, t) {
        try {
            var r = await er(e), n = await WebAssembly.instantiate(r, t);
            return n;
        } catch (a) {
            k(`failed to asynchronously prepare wasm: ${a}`), Ft(a);
        }
    }
    async function nr(e, t, r) {
        if (!e && typeof WebAssembly.instantiateStreaming == "function") try {
            var n = fetch(t, {
                credentials: "same-origin"
            }), a = await WebAssembly.instantiateStreaming(n, r);
            return a;
        } catch (i) {
            k(`wasm streaming compile failed: ${i}`), k("falling back to ArrayBuffer instantiation");
        }
        return rr(t, r);
    }
    function ar() {
        return {
            a: Hn
        };
    }
    async function or() {
        function e(i, u) {
            return E = i.exports, nt = E.xa, ee(), pe = E.Ba, Je(), E;
        }
        Qe();
        function t(i) {
            return e(i.instance);
        }
        var r = ar();
        if (c.instantiateWasm) return new Promise((i, u)=>{
            c.instantiateWasm(r, (s, l)=>{
                i(e(s));
            });
        });
        yt != null || (yt = Ke());
        try {
            var n = await nr(Z, yt, r), a = t(n);
            return a;
        } catch (i) {
            return $(i), Promise.reject(i);
        }
    }
    var re = (e)=>{
        for(; e.length > 0;)e.shift()(c);
    }, ne = [], ir = (e)=>ne.push(e), ae = [], sr = (e)=>ae.push(e), y = (e)=>Xn(e), m = ()=>qn(), mt = [], gt = 0, ur = (e)=>{
        var t = new jt(e);
        return t.get_caught() || (t.set_caught(!0), gt--), t.set_rethrown(!1), mt.push(t), Zn(e), zn(e);
    }, H = 0, cr = ()=>{
        v(0, 0);
        var e = mt.pop();
        Yn(e.excPtr), H = 0;
    };
    class jt {
        constructor(t){
            this.excPtr = t, this.ptr = t - 24;
        }
        set_type(t) {
            P[this.ptr + 4 >> 2] = t;
        }
        get_type() {
            return P[this.ptr + 4 >> 2];
        }
        set_destructor(t) {
            P[this.ptr + 8 >> 2] = t;
        }
        get_destructor() {
            return P[this.ptr + 8 >> 2];
        }
        set_caught(t) {
            t = t ? 1 : 0, Q[this.ptr + 12] = t;
        }
        get_caught() {
            return Q[this.ptr + 12] != 0;
        }
        set_rethrown(t) {
            t = t ? 1 : 0, Q[this.ptr + 13] = t;
        }
        get_rethrown() {
            return Q[this.ptr + 13] != 0;
        }
        init(t, r) {
            this.set_adjusted_ptr(0), this.set_type(t), this.set_destructor(r);
        }
        set_adjusted_ptr(t) {
            P[this.ptr + 16 >> 2] = t;
        }
        get_adjusted_ptr() {
            return P[this.ptr + 16 >> 2];
        }
    }
    var wt = (e)=>Gn(e), Rt = (e)=>{
        var t = H;
        if (!t) return wt(0), 0;
        var r = new jt(t);
        r.set_adjusted_ptr(t);
        var n = r.get_type();
        if (!n) return wt(0), t;
        for (var a of e){
            if (a === 0 || a === n) break;
            var i = r.ptr + 16;
            if (Qn(a, n, i)) return wt(a), t;
        }
        return wt(n), t;
    }, lr = ()=>Rt([]), fr = (e)=>Rt([
            e
        ]), dr = (e, t)=>Rt([
            e,
            t
        ]), hr = ()=>{
        var e = mt.pop();
        e || Ft("no exception to throw");
        var t = e.excPtr;
        throw e.get_rethrown() || (mt.push(e), e.set_rethrown(!0), e.set_caught(!1), gt++), H = t, H;
    }, pr = (e, t, r)=>{
        var n = new jt(e);
        throw n.init(t, r), H = e, gt++, H;
    }, vr = ()=>gt, yr = (e)=>{
        throw H || (H = e), H;
    }, mr = ()=>Ft(""), $t = {}, Lt = (e)=>{
        for(; e.length;){
            var t = e.pop(), r = e.pop();
            r(t);
        }
    };
    function lt(e) {
        return this.fromWireType(P[e >> 2]);
    }
    var ot = {}, K = {}, bt = {}, gr = c.InternalError = class extends Error {
        constructor(e){
            super(e), this.name = "InternalError";
        }
    }, Ct = (e)=>{
        throw new gr(e);
    }, tt = (e, t, r)=>{
        e.forEach((s)=>bt[s] = t);
        function n(s) {
            var l = r(s);
            l.length !== e.length && Ct("Mismatched type converter count");
            for(var d = 0; d < e.length; ++d)V(e[d], l[d]);
        }
        var a = new Array(t.length), i = [], u = 0;
        t.forEach((s, l)=>{
            K.hasOwnProperty(s) ? a[l] = K[s] : (i.push(s), ot.hasOwnProperty(s) || (ot[s] = []), ot[s].push(()=>{
                a[l] = K[s], ++u, u === i.length && n(a);
            }));
        }), i.length === 0 && n(a);
    }, wr = (e)=>{
        var t = $t[e];
        delete $t[e];
        var r = t.rawConstructor, n = t.rawDestructor, a = t.fields, i = a.map((u)=>u.getterReturnType).concat(a.map((u)=>u.setterArgumentType));
        tt([
            e
        ], i, (u)=>{
            var s = {};
            return a.forEach((l, d)=>{
                var h = l.fieldName, p = u[d], w = u[d].optional, b = l.getter, _ = l.getterContext, S = u[d + a.length], A = l.setter, I = l.setterContext;
                s[h] = {
                    read: (X)=>p.fromWireType(b(_, X)),
                    write: (X, L)=>{
                        var W = [];
                        A(I, X, S.toWireType(W, L)), Lt(W);
                    },
                    optional: w
                };
            }), [
                {
                    name: t.name,
                    fromWireType: (l)=>{
                        var d = {};
                        for(var h in s)d[h] = s[h].read(l);
                        return n(l), d;
                    },
                    toWireType: (l, d)=>{
                        for(var h in s)if (!(h in d) && !s[h].optional) throw new TypeError(`Missing field: "${h}"`);
                        var p = r();
                        for(h in s)s[h].write(p, d[h]);
                        return l !== null && l.push(n, p), p;
                    },
                    argPackAdvance: N,
                    readValueFromPointer: lt,
                    destructorFunction: n
                }
            ];
        });
    }, $r = (e, t, r, n, a)=>{}, br = ()=>{
        for(var e = new Array(256), t = 0; t < 256; ++t)e[t] = String.fromCharCode(t);
        oe = e;
    }, oe, j = (e)=>{
        for(var t = "", r = e; B[r];)t += oe[B[r++]];
        return t;
    }, ft = c.BindingError = class extends Error {
        constructor(e){
            super(e), this.name = "BindingError";
        }
    }, C = (e)=>{
        throw new ft(e);
    };
    function Cr(e, t) {
        let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        var n = t.name;
        if (e || C(`type "${n}" must have a positive integer typeid pointer`), K.hasOwnProperty(e)) {
            if (r.ignoreDuplicateRegistrations) return;
            C(`Cannot register type '${n}' twice`);
        }
        if (K[e] = t, delete bt[e], ot.hasOwnProperty(e)) {
            var a = ot[e];
            delete ot[e], a.forEach((i)=>i());
        }
    }
    function V(e, t) {
        let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        return Cr(e, t, r);
    }
    var N = 8, Tr = (e, t, r, n)=>{
        t = j(t), V(e, {
            name: t,
            fromWireType: function(a) {
                return !!a;
            },
            toWireType: function(a, i) {
                return i ? r : n;
            },
            argPackAdvance: N,
            readValueFromPointer: function(a) {
                return this.fromWireType(B[a]);
            },
            destructorFunction: null
        });
    }, Pr = (e)=>({
            count: e.count,
            deleteScheduled: e.deleteScheduled,
            preservePointerOnDelete: e.preservePointerOnDelete,
            ptr: e.ptr,
            ptrType: e.ptrType,
            smartPtr: e.smartPtr,
            smartPtrType: e.smartPtrType
        }), Bt = (e)=>{
        function t(r) {
            return r.$$.ptrType.registeredClass.name;
        }
        C(t(e) + " instance already deleted");
    }, Wt = !1, ie = (e)=>{}, Er = (e)=>{
        e.smartPtr ? e.smartPtrType.rawDestructor(e.smartPtr) : e.ptrType.registeredClass.rawDestructor(e.ptr);
    }, se = (e)=>{
        e.count.value -= 1;
        var t = e.count.value === 0;
        t && Er(e);
    }, dt = (e)=>typeof FinalizationRegistry > "u" ? (dt = (t)=>t, e) : (Wt = new FinalizationRegistry((t)=>{
            se(t.$$);
        }), dt = (t)=>{
            var r = t.$$, n = !!r.smartPtr;
            if (n) {
                var a = {
                    $$: r
                };
                Wt.register(t, a, t);
            }
            return t;
        }, ie = (t)=>Wt.unregister(t), dt(e)), _r = ()=>{
        let e = Tt.prototype;
        Object.assign(e, {
            isAliasOf (r) {
                if (!(this instanceof Tt) || !(r instanceof Tt)) return !1;
                var n = this.$$.ptrType.registeredClass, a = this.$$.ptr;
                r.$$ = r.$$;
                for(var i = r.$$.ptrType.registeredClass, u = r.$$.ptr; n.baseClass;)a = n.upcast(a), n = n.baseClass;
                for(; i.baseClass;)u = i.upcast(u), i = i.baseClass;
                return n === i && a === u;
            },
            clone () {
                if (this.$$.ptr || Bt(this), this.$$.preservePointerOnDelete) return this.$$.count.value += 1, this;
                var r = dt(Object.create(Object.getPrototypeOf(this), {
                    $$: {
                        value: Pr(this.$$)
                    }
                }));
                return r.$$.count.value += 1, r.$$.deleteScheduled = !1, r;
            },
            delete () {
                this.$$.ptr || Bt(this), this.$$.deleteScheduled && !this.$$.preservePointerOnDelete && C("Object already scheduled for deletion"), ie(this), se(this.$$), this.$$.preservePointerOnDelete || (this.$$.smartPtr = void 0, this.$$.ptr = void 0);
            },
            isDeleted () {
                return !this.$$.ptr;
            },
            deleteLater () {
                return this.$$.ptr || Bt(this), this.$$.deleteScheduled && !this.$$.preservePointerOnDelete && C("Object already scheduled for deletion"), this.$$.deleteScheduled = !0, this;
            }
        });
        const t = Symbol.dispose;
        t && (e[t] = e.delete);
    };
    function Tt() {}
    var Ut = (e, t)=>Object.defineProperty(t, "name", {
            value: e
        }), ue = {}, ce = (e, t, r)=>{
        if (e[t].overloadTable === void 0) {
            var n = e[t];
            e[t] = function() {
                for(var a = arguments.length, i = new Array(a), u = 0; u < a; u++)i[u] = arguments[u];
                return e[t].overloadTable.hasOwnProperty(i.length) || C(`Function '${r}' called with an invalid number of arguments (${i.length}) - expects one of (${e[t].overloadTable})!`), e[t].overloadTable[i.length].apply(this, i);
            }, e[t].overloadTable = [], e[t].overloadTable[n.argCount] = n;
        }
    }, le = (e, t, r)=>{
        c.hasOwnProperty(e) ? ((r === void 0 || c[e].overloadTable !== void 0 && c[e].overloadTable[r] !== void 0) && C(`Cannot register public name '${e}' twice`), ce(c, e, e), c[e].overloadTable.hasOwnProperty(r) && C(`Cannot register multiple overloads of a function with the same number of arguments (${r})!`), c[e].overloadTable[r] = t) : (c[e] = t, c[e].argCount = r);
    }, Or = 48, xr = 57, Ar = (e)=>{
        e = e.replace(/[^a-zA-Z0-9_]/g, "$");
        var t = e.charCodeAt(0);
        return t >= Or && t <= xr ? `_${e}` : e;
    };
    function Sr(e, t, r, n, a, i, u, s) {
        this.name = e, this.constructor = t, this.instancePrototype = r, this.rawDestructor = n, this.baseClass = a, this.getActualType = i, this.upcast = u, this.downcast = s, this.pureVirtualFunctions = [];
    }
    var Vt = (e, t, r)=>{
        for(; t !== r;)t.upcast || C(`Expected null or instance of ${r.name}, got an instance of ${t.name}`), e = t.upcast(e), t = t.baseClass;
        return e;
    };
    function Ir(e, t) {
        if (t === null) return this.isReference && C(`null is not a valid ${this.name}`), 0;
        t.$$ || C(`Cannot pass "${embindRepr(t)}" as a ${this.name}`), t.$$.ptr || C(`Cannot pass deleted object as a pointer of type ${this.name}`);
        var r = t.$$.ptrType.registeredClass, n = Vt(t.$$.ptr, r, this.registeredClass);
        return n;
    }
    function Dr(e, t) {
        var r;
        if (t === null) return this.isReference && C(`null is not a valid ${this.name}`), this.isSmartPointer ? (r = this.rawConstructor(), e !== null && e.push(this.rawDestructor, r), r) : 0;
        (!t || !t.$$) && C(`Cannot pass "${embindRepr(t)}" as a ${this.name}`), t.$$.ptr || C(`Cannot pass deleted object as a pointer of type ${this.name}`), !this.isConst && t.$$.ptrType.isConst && C(`Cannot convert argument of type ${t.$$.smartPtrType ? t.$$.smartPtrType.name : t.$$.ptrType.name} to parameter type ${this.name}`);
        var n = t.$$.ptrType.registeredClass;
        if (r = Vt(t.$$.ptr, n, this.registeredClass), this.isSmartPointer) switch(t.$$.smartPtr === void 0 && C("Passing raw pointer to smart pointer is illegal"), this.sharingPolicy){
            case 0:
                t.$$.smartPtrType === this ? r = t.$$.smartPtr : C(`Cannot convert argument of type ${t.$$.smartPtrType ? t.$$.smartPtrType.name : t.$$.ptrType.name} to parameter type ${this.name}`);
                break;
            case 1:
                r = t.$$.smartPtr;
                break;
            case 2:
                if (t.$$.smartPtrType === this) r = t.$$.smartPtr;
                else {
                    var a = t.clone();
                    r = this.rawShare(r, G.toHandle(()=>a.delete())), e !== null && e.push(this.rawDestructor, r);
                }
                break;
            default:
                C("Unsupporting sharing policy");
        }
        return r;
    }
    function Mr(e, t) {
        if (t === null) return this.isReference && C(`null is not a valid ${this.name}`), 0;
        t.$$ || C(`Cannot pass "${embindRepr(t)}" as a ${this.name}`), t.$$.ptr || C(`Cannot pass deleted object as a pointer of type ${this.name}`), t.$$.ptrType.isConst && C(`Cannot convert argument of type ${t.$$.ptrType.name} to parameter type ${this.name}`);
        var r = t.$$.ptrType.registeredClass, n = Vt(t.$$.ptr, r, this.registeredClass);
        return n;
    }
    var fe = (e, t, r)=>{
        if (t === r) return e;
        if (r.baseClass === void 0) return null;
        var n = fe(e, t, r.baseClass);
        return n === null ? null : r.downcast(n);
    }, Fr = {}, jr = (e, t)=>{
        for(t === void 0 && C("ptr should not be undefined"); e.baseClass;)t = e.upcast(t), e = e.baseClass;
        return t;
    }, Rr = (e, t)=>(t = jr(e, t), Fr[t]), Pt = (e, t)=>{
        (!t.ptrType || !t.ptr) && Ct("makeClassHandle requires ptr and ptrType");
        var r = !!t.smartPtrType, n = !!t.smartPtr;
        return r !== n && Ct("Both smartPtrType and smartPtr must be specified"), t.count = {
            value: 1
        }, dt(Object.create(e, {
            $$: {
                value: t,
                writable: !0
            }
        }));
    };
    function Lr(e) {
        var t = this.getPointee(e);
        if (!t) return this.destructor(e), null;
        var r = Rr(this.registeredClass, t);
        if (r !== void 0) {
            if (r.$$.count.value === 0) return r.$$.ptr = t, r.$$.smartPtr = e, r.clone();
            var n = r.clone();
            return this.destructor(e), n;
        }
        function a() {
            return this.isSmartPointer ? Pt(this.registeredClass.instancePrototype, {
                ptrType: this.pointeeType,
                ptr: t,
                smartPtrType: this,
                smartPtr: e
            }) : Pt(this.registeredClass.instancePrototype, {
                ptrType: this,
                ptr: e
            });
        }
        var i = this.registeredClass.getActualType(t), u = ue[i];
        if (!u) return a.call(this);
        var s;
        this.isConst ? s = u.constPointerType : s = u.pointerType;
        var l = fe(t, this.registeredClass, s.registeredClass);
        return l === null ? a.call(this) : this.isSmartPointer ? Pt(s.registeredClass.instancePrototype, {
            ptrType: s,
            ptr: l,
            smartPtrType: this,
            smartPtr: e
        }) : Pt(s.registeredClass.instancePrototype, {
            ptrType: s,
            ptr: l
        });
    }
    var Br = ()=>{
        Object.assign(Et.prototype, {
            getPointee (e) {
                return this.rawGetPointee && (e = this.rawGetPointee(e)), e;
            },
            destructor (e) {
                var t;
                (t = this.rawDestructor) === null || t === void 0 || t.call(this, e);
            },
            argPackAdvance: N,
            readValueFromPointer: lt,
            fromWireType: Lr
        });
    };
    function Et(e, t, r, n, a, i, u, s, l, d, h) {
        this.name = e, this.registeredClass = t, this.isReference = r, this.isConst = n, this.isSmartPointer = a, this.pointeeType = i, this.sharingPolicy = u, this.rawGetPointee = s, this.rawConstructor = l, this.rawShare = d, this.rawDestructor = h, !a && t.baseClass === void 0 ? n ? (this.toWireType = Ir, this.destructorFunction = null) : (this.toWireType = Mr, this.destructorFunction = null) : this.toWireType = Dr;
    }
    var de = (e, t, r)=>{
        c.hasOwnProperty(e) || Ct("Replacing nonexistent public symbol"), c[e].overloadTable !== void 0 && r !== void 0 ? c[e].overloadTable[r] = t : (c[e] = t, c[e].argCount = r);
    }, he = [], pe, g = (e)=>{
        var t = he[e];
        return t || (he[e] = t = pe.get(e)), t;
    }, Wr = function(e, t) {
        let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
        if (e.includes("j")) return dynCallLegacy(e, t, r);
        var n = g(t), a = n(...r);
        return a;
    }, Ur = function(e, t) {
        let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
        return function() {
            for(var n = arguments.length, a = new Array(n), i = 0; i < n; i++)a[i] = arguments[i];
            return Wr(e, t, a, r);
        };
    }, U = function(e, t) {
        e = j(e);
        function r() {
            if (e.includes("j")) return Ur(e, t);
            var a = g(t);
            return a;
        }
        var n = r();
        return typeof n != "function" && C(`unknown function pointer with signature ${e}: ${t}`), n;
    };
    class Vr extends Error {
    }
    var ve = (e)=>{
        var t = Nn(e), r = j(t);
        return et(t), r;
    }, _t = (e, t)=>{
        var r = [], n = {};
        function a(i) {
            if (!n[i] && !K[i]) {
                if (bt[i]) {
                    bt[i].forEach(a);
                    return;
                }
                r.push(i), n[i] = !0;
            }
        }
        throw t.forEach(a), new Vr(`${e}: ` + r.map(ve).join([
            ", "
        ]));
    }, kr = (e, t, r, n, a, i, u, s, l, d, h, p, w)=>{
        h = j(h), i = U(a, i), s && (s = U(u, s)), d && (d = U(l, d)), w = U(p, w);
        var b = Ar(h);
        le(b, function() {
            _t(`Cannot construct ${h} due to unbound types`, [
                n
            ]);
        }), tt([
            e,
            t,
            r
        ], n ? [
            n
        ] : [], (_)=>{
            _ = _[0];
            var S, A;
            n ? (S = _.registeredClass, A = S.instancePrototype) : A = Tt.prototype;
            var I = Ut(h, function() {
                if (Object.getPrototypeOf(this) !== X) throw new ft(`Use 'new' to construct ${h}`);
                if (L.constructor_body === void 0) throw new ft(`${h} has no accessible constructor`);
                for(var Oe = arguments.length, xt = new Array(Oe), At = 0; At < Oe; At++)xt[At] = arguments[At];
                var xe = L.constructor_body[xt.length];
                if (xe === void 0) throw new ft(`Tried to invoke ctor of ${h} with invalid number of parameters (${xt.length}) - expected (${Object.keys(L.constructor_body).toString()}) parameters instead!`);
                return xe.apply(this, xt);
            }), X = Object.create(A, {
                constructor: {
                    value: I
                }
            });
            I.prototype = X;
            var L = new Sr(h, I, X, w, S, i, s, d);
            if (L.baseClass) {
                var W, Ot;
                (Ot = (W = L.baseClass).__derivedClasses) !== null && Ot !== void 0 || (W.__derivedClasses = []), L.baseClass.__derivedClasses.push(L);
            }
            var Ra = new Et(h, L, !0, !1, !1), Ee = new Et(h + "*", L, !1, !1, !1), _e = new Et(h + " const*", L, !1, !0, !1);
            return ue[e] = {
                pointerType: Ee,
                constPointerType: _e
            }, de(b, I), [
                Ra,
                Ee,
                _e
            ];
        });
    }, kt = (e, t)=>{
        for(var r = [], n = 0; n < e; n++)r.push(P[t + n * 4 >> 2]);
        return r;
    };
    function Hr(e) {
        for(var t = 1; t < e.length; ++t)if (e[t] !== null && e[t].destructorFunction === void 0) return !0;
        return !1;
    }
    function Ht(e, t, r, n, a, i) {
        var u = t.length;
        u < 2 && C("argTypes array size mismatch! Must at least get return value and 'this' types!");
        var s = t[1] !== null && r !== null, l = Hr(t), d = t[0].name !== "void", h = u - 2, p = new Array(h), w = [], b = [], _ = function() {
            b.length = 0;
            var S;
            w.length = s ? 2 : 1, w[0] = a, s && (S = t[1].toWireType(b, this), w[1] = S);
            for(var A = 0; A < h; ++A)p[A] = t[A + 2].toWireType(b, A < 0 || arguments.length <= A ? void 0 : arguments[A]), w.push(p[A]);
            var I = n(...w);
            function X(L) {
                if (l) Lt(b);
                else for(var W = s ? 1 : 2; W < t.length; W++){
                    var Ot = W === 1 ? S : p[W - 2];
                    t[W].destructorFunction !== null && t[W].destructorFunction(Ot);
                }
                if (d) return t[0].fromWireType(L);
            }
            return X(I);
        };
        return Ut(e, _);
    }
    var Nr = (e, t, r, n, a, i)=>{
        var u = kt(t, r);
        a = U(n, a), tt([], [
            e
        ], (s)=>{
            s = s[0];
            var l = `constructor ${s.name}`;
            if (s.registeredClass.constructor_body === void 0 && (s.registeredClass.constructor_body = []), s.registeredClass.constructor_body[t - 1] !== void 0) throw new ft(`Cannot register multiple constructors with identical number of parameters (${t - 1}) for class '${s.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
            return s.registeredClass.constructor_body[t - 1] = ()=>{
                _t(`Cannot construct ${s.name} due to unbound types`, u);
            }, tt([], u, (d)=>(d.splice(1, 0, null), s.registeredClass.constructor_body[t - 1] = Ht(l, d, null, a, i), [])), [];
        });
    }, ye = (e)=>{
        e = e.trim();
        const t = e.indexOf("(");
        return t === -1 ? e : e.slice(0, t);
    }, zr = (e, t, r, n, a, i, u, s, l, d)=>{
        var h = kt(r, n);
        t = j(t), t = ye(t), i = U(a, i), tt([], [
            e
        ], (p)=>{
            p = p[0];
            var w = `${p.name}.${t}`;
            t.startsWith("@@") && (t = Symbol[t.substring(2)]), s && p.registeredClass.pureVirtualFunctions.push(t);
            function b() {
                _t(`Cannot call ${w} due to unbound types`, h);
            }
            var _ = p.registeredClass.instancePrototype, S = _[t];
            return S === void 0 || S.overloadTable === void 0 && S.className !== p.name && S.argCount === r - 2 ? (b.argCount = r - 2, b.className = p.name, _[t] = b) : (ce(_, t, w), _[t].overloadTable[r - 2] = b), tt([], h, (A)=>{
                var I = Ht(w, A, p, i, u);
                return _[t].overloadTable === void 0 ? (I.argCount = r - 2, _[t] = I) : _[t].overloadTable[r - 2] = I, [];
            }), [];
        });
    }, Nt = [], z = [], zt = (e)=>{
        e > 9 && --z[e + 1] === 0 && (z[e] = void 0, Nt.push(e));
    }, Gr = ()=>z.length / 2 - 5 - Nt.length, Xr = ()=>{
        z.push(0, 1, void 0, 1, null, 1, !0, 1, !1, 1), c.count_emval_handles = Gr;
    }, G = {
        toValue: (e)=>(e || C(`Cannot use deleted val. handle = ${e}`), z[e]),
        toHandle: (e)=>{
            switch(e){
                case void 0:
                    return 2;
                case null:
                    return 4;
                case !0:
                    return 6;
                case !1:
                    return 8;
                default:
                    {
                        const t = Nt.pop() || z.length;
                        return z[t] = e, z[t + 1] = 1, t;
                    }
            }
        }
    }, me = {
        name: "emscripten::val",
        fromWireType: (e)=>{
            var t = G.toValue(e);
            return zt(e), t;
        },
        toWireType: (e, t)=>G.toHandle(t),
        argPackAdvance: N,
        readValueFromPointer: lt,
        destructorFunction: null
    }, qr = (e)=>V(e, me), Yr = (e, t)=>{
        switch(t){
            case 4:
                return function(r) {
                    return this.fromWireType(Kt[r >> 2]);
                };
            case 8:
                return function(r) {
                    return this.fromWireType(te[r >> 3]);
                };
            default:
                throw new TypeError(`invalid float width (${t}): ${e}`);
        }
    }, Zr = (e, t, r)=>{
        t = j(t), V(e, {
            name: t,
            fromWireType: (n)=>n,
            toWireType: (n, a)=>a,
            argPackAdvance: N,
            readValueFromPointer: Yr(t, r),
            destructorFunction: null
        });
    }, Qr = (e, t, r, n, a, i, u, s)=>{
        var l = kt(t, r);
        e = j(e), e = ye(e), a = U(n, a), le(e, function() {
            _t(`Cannot call ${e} due to unbound types`, l);
        }, t - 1), tt([], l, (d)=>{
            var h = [
                d[0],
                null
            ].concat(d.slice(1));
            return de(e, Ht(e, h, null, a, i), t - 1), [];
        });
    }, Jr = (e, t, r)=>{
        switch(t){
            case 1:
                return r ? (n)=>Q[n] : (n)=>B[n];
            case 2:
                return r ? (n)=>ut[n >> 1] : (n)=>vt[n >> 1];
            case 4:
                return r ? (n)=>at[n >> 2] : (n)=>P[n >> 2];
            default:
                throw new TypeError(`invalid integer width (${t}): ${e}`);
        }
    }, Kr = (e, t, r, n, a)=>{
        t = j(t);
        var i = (h)=>h;
        if (n === 0) {
            var u = 32 - 8 * r;
            i = (h)=>h << u >>> u;
        }
        var s = t.includes("unsigned"), l = (h, p)=>{}, d;
        s ? d = function(h, p) {
            return l(p, this.name), p >>> 0;
        } : d = function(h, p) {
            return l(p, this.name), p;
        }, V(e, {
            name: t,
            fromWireType: i,
            toWireType: d,
            argPackAdvance: N,
            readValueFromPointer: Jr(t, r, n !== 0),
            destructorFunction: null
        });
    }, tn = (e, t, r)=>{
        var n = [
            Int8Array,
            Uint8Array,
            Int16Array,
            Uint16Array,
            Int32Array,
            Uint32Array,
            Float32Array,
            Float64Array
        ], a = n[t];
        function i(u) {
            var s = P[u >> 2], l = P[u + 4 >> 2];
            return new a(Q.buffer, l, s);
        }
        r = j(r), V(e, {
            name: r,
            fromWireType: i,
            argPackAdvance: N,
            readValueFromPointer: i
        }, {
            ignoreDuplicateRegistrations: !0
        });
    }, en = Object.assign({
        optional: !0
    }, me), rn = (e, t)=>{
        V(e, en);
    }, nn = (e, t, r, n)=>{
        if (!(n > 0)) return 0;
        for(var a = r, i = r + n - 1, u = 0; u < e.length; ++u){
            var s = e.charCodeAt(u);
            if (s >= 55296 && s <= 57343) {
                var l = e.charCodeAt(++u);
                s = 65536 + ((s & 1023) << 10) | l & 1023;
            }
            if (s <= 127) {
                if (r >= i) break;
                t[r++] = s;
            } else if (s <= 2047) {
                if (r + 1 >= i) break;
                t[r++] = 192 | s >> 6, t[r++] = 128 | s & 63;
            } else if (s <= 65535) {
                if (r + 2 >= i) break;
                t[r++] = 224 | s >> 12, t[r++] = 128 | s >> 6 & 63, t[r++] = 128 | s & 63;
            } else {
                if (r + 3 >= i) break;
                t[r++] = 240 | s >> 18, t[r++] = 128 | s >> 12 & 63, t[r++] = 128 | s >> 6 & 63, t[r++] = 128 | s & 63;
            }
        }
        return t[r] = 0, r - a;
    }, it = (e, t, r)=>nn(e, B, t, r), ge = (e)=>{
        for(var t = 0, r = 0; r < e.length; ++r){
            var n = e.charCodeAt(r);
            n <= 127 ? t++ : n <= 2047 ? t += 2 : n >= 55296 && n <= 57343 ? (t += 4, ++r) : t += 3;
        }
        return t;
    }, we = typeof TextDecoder < "u" ? new TextDecoder() : void 0, $e = function(e) {
        let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : NaN;
        for(var n = t + r, a = t; e[a] && !(a >= n);)++a;
        if (a - t > 16 && e.buffer && we) return we.decode(e.subarray(t, a));
        for(var i = ""; t < a;){
            var u = e[t++];
            if (!(u & 128)) {
                i += String.fromCharCode(u);
                continue;
            }
            var s = e[t++] & 63;
            if ((u & 224) == 192) {
                i += String.fromCharCode((u & 31) << 6 | s);
                continue;
            }
            var l = e[t++] & 63;
            if ((u & 240) == 224 ? u = (u & 15) << 12 | s << 6 | l : u = (u & 7) << 18 | s << 12 | l << 6 | e[t++] & 63, u < 65536) i += String.fromCharCode(u);
            else {
                var d = u - 65536;
                i += String.fromCharCode(55296 | d >> 10, 56320 | d & 1023);
            }
        }
        return i;
    }, an = (e, t)=>e ? $e(B, e, t) : "", on = (e, t)=>{
        t = j(t), V(e, {
            name: t,
            fromWireType (r) {
                for(var n = P[r >> 2], a = r + 4, i, s, u = a, s = 0; s <= n; ++s){
                    var l = a + s;
                    if (s == n || B[l] == 0) {
                        var d = l - u, h = an(u, d);
                        i === void 0 ? i = h : (i += "\0", i += h), u = l + 1;
                    }
                }
                return et(r), i;
            },
            toWireType (r, n) {
                n instanceof ArrayBuffer && (n = new Uint8Array(n));
                var a, i = typeof n == "string";
                i || ArrayBuffer.isView(n) && n.BYTES_PER_ELEMENT == 1 || C("Cannot pass non-string to std::string"), i ? a = ge(n) : a = n.length;
                var u = Pe(4 + a + 1), s = u + 4;
                return P[u >> 2] = a, i ? it(n, s, a + 1) : B.set(n, s), r !== null && r.push(et, u), u;
            },
            argPackAdvance: N,
            readValueFromPointer: lt,
            destructorFunction (r) {
                et(r);
            }
        });
    }, be = typeof TextDecoder < "u" ? new TextDecoder("utf-16le") : void 0, sn = (e, t)=>{
        for(var r = e, n = r >> 1, a = n + t / 2; !(n >= a) && vt[n];)++n;
        if (r = n << 1, r - e > 32 && be) return be.decode(B.subarray(e, r));
        for(var i = "", u = 0; !(u >= t / 2); ++u){
            var s = ut[e + u * 2 >> 1];
            if (s == 0) break;
            i += String.fromCharCode(s);
        }
        return i;
    }, un = (e, t, r)=>{
        if (r != null || (r = 2147483647), r < 2) return 0;
        r -= 2;
        for(var n = t, a = r < e.length * 2 ? r / 2 : e.length, i = 0; i < a; ++i){
            var u = e.charCodeAt(i);
            ut[t >> 1] = u, t += 2;
        }
        return ut[t >> 1] = 0, t - n;
    }, cn = (e)=>e.length * 2, ln = (e, t)=>{
        for(var r = 0, n = ""; !(r >= t / 4);){
            var a = at[e + r * 4 >> 2];
            if (a == 0) break;
            if (++r, a >= 65536) {
                var i = a - 65536;
                n += String.fromCharCode(55296 | i >> 10, 56320 | i & 1023);
            } else n += String.fromCharCode(a);
        }
        return n;
    }, fn = (e, t, r)=>{
        if (r != null || (r = 2147483647), r < 4) return 0;
        for(var n = t, a = n + r - 4, i = 0; i < e.length; ++i){
            var u = e.charCodeAt(i);
            if (u >= 55296 && u <= 57343) {
                var s = e.charCodeAt(++i);
                u = 65536 + ((u & 1023) << 10) | s & 1023;
            }
            if (at[t >> 2] = u, t += 4, t + 4 > a) break;
        }
        return at[t >> 2] = 0, t - n;
    }, dn = (e)=>{
        for(var t = 0, r = 0; r < e.length; ++r){
            var n = e.charCodeAt(r);
            n >= 55296 && n <= 57343 && ++r, t += 4;
        }
        return t;
    }, hn = (e, t, r)=>{
        r = j(r);
        var n, a, i, u;
        t === 2 ? (n = sn, a = un, u = cn, i = (s)=>vt[s >> 1]) : t === 4 && (n = ln, a = fn, u = dn, i = (s)=>P[s >> 2]), V(e, {
            name: r,
            fromWireType: (s)=>{
                for(var l = P[s >> 2], d, h = s + 4, p = 0; p <= l; ++p){
                    var w = s + 4 + p * t;
                    if (p == l || i(w) == 0) {
                        var b = w - h, _ = n(h, b);
                        d === void 0 ? d = _ : (d += "\0", d += _), h = w + t;
                    }
                }
                return et(s), d;
            },
            toWireType: (s, l)=>{
                typeof l != "string" && C(`Cannot pass non-string to C++ string type ${r}`);
                var d = u(l), h = Pe(4 + d + t);
                return P[h >> 2] = d / t, a(l, h + 4, d + t), s !== null && s.push(et, h), h;
            },
            argPackAdvance: N,
            readValueFromPointer: lt,
            destructorFunction (s) {
                et(s);
            }
        });
    }, pn = (e, t, r, n, a, i)=>{
        $t[e] = {
            name: j(t),
            rawConstructor: U(r, n),
            rawDestructor: U(a, i),
            fields: []
        };
    }, vn = (e, t, r, n, a, i, u, s, l, d)=>{
        $t[e].fields.push({
            fieldName: j(t),
            getterReturnType: r,
            getter: U(n, a),
            getterContext: i,
            setterArgumentType: u,
            setter: U(s, l),
            setterContext: d
        });
    }, yn = (e, t)=>{
        t = j(t), V(e, {
            isVoid: !0,
            name: t,
            argPackAdvance: 0,
            fromWireType: ()=>{},
            toWireType: (r, n)=>{}
        });
    }, Gt = [], mn = (e, t, r, n)=>(e = Gt[e], t = G.toValue(t), e(null, t, r, n)), gn = {}, wn = (e)=>{
        var t = gn[e];
        return t === void 0 ? j(e) : t;
    }, Ce = ()=>{
        if (typeof globalThis == "object") return globalThis;
        function e(t) {
            t.$$$embind_global$$$ = t;
            var r = typeof $$$embind_global$$$ == "object" && t.$$$embind_global$$$ == t;
            return r || delete t.$$$embind_global$$$, r;
        }
        if (typeof $$$embind_global$$$ == "object" || (("TURBOPACK compile-time value", "object") == "object" && e(("TURBOPACK ident replacement", globalThis)) ? $$$embind_global$$$ = ("TURBOPACK ident replacement", globalThis) : typeof self == "object" && e(self) && ($$$embind_global$$$ = self), typeof $$$embind_global$$$ == "object")) return $$$embind_global$$$;
        throw Error("unable to get global object.");
    }, $n = (e)=>e === 0 ? G.toHandle(Ce()) : (e = wn(e), G.toHandle(Ce()[e])), bn = (e)=>{
        var t = Gt.length;
        return Gt.push(e), t;
    }, Te = (e, t)=>{
        var r = K[e];
        return r === void 0 && C(`${t} has unknown type ${ve(e)}`), r;
    }, Cn = (e, t)=>{
        for(var r = new Array(e), n = 0; n < e; ++n)r[n] = Te(P[t + n * 4 >> 2], `parameter ${n}`);
        return r;
    }, Tn = (e, t, r)=>{
        var n = [], a = e.toWireType(n, r);
        return n.length && (P[t >> 2] = G.toHandle(n)), a;
    }, Pn = Reflect.construct, En = (e, t, r)=>{
        var n = Cn(e, t), a = n.shift();
        e--;
        var i = new Array(e), u = (l, d, h, p)=>{
            for(var w = 0, b = 0; b < e; ++b)i[b] = n[b].readValueFromPointer(p + w), w += n[b].argPackAdvance;
            var _ = r === 1 ? Pn(d, i) : d.apply(l, i);
            return Tn(a, h, _);
        }, s = `methodCaller<(${n.map((l)=>l.name).join(", ")}) => ${a.name}>`;
        return bn(Ut(s, u));
    }, _n = (e)=>{
        e > 9 && (z[e + 1] += 1);
    }, On = (e)=>{
        var t = G.toValue(e);
        Lt(t), zt(e);
    }, xn = (e, t)=>{
        e = Te(e, "_emval_take_value");
        var r = e.readValueFromPointer(t);
        return G.toHandle(r);
    }, An = (e, t, r, n)=>{
        var a = /* @__PURE__ */ new Date().getFullYear(), i = new Date(a, 0, 1), u = new Date(a, 6, 1), s = i.getTimezoneOffset(), l = u.getTimezoneOffset(), d = Math.max(s, l);
        P[e >> 2] = d * 60, at[t >> 2] = +(s != l);
        var h = (b)=>{
            var _ = b >= 0 ? "-" : "+", S = Math.abs(b), A = String(Math.floor(S / 60)).padStart(2, "0"), I = String(S % 60).padStart(2, "0");
            return `UTC${_}${A}${I}`;
        }, p = h(s), w = h(l);
        l < s ? (it(p, r, 17), it(w, n, 17)) : (it(p, n, 17), it(w, r, 17));
    }, Sn = ()=>2147483648, In = (e, t)=>Math.ceil(e / t) * t, Dn = (e)=>{
        var t = nt.buffer, r = (e - t.byteLength + 65535) / 65536 | 0;
        try {
            return nt.grow(r), ee(), 1;
        } catch  {}
    }, Mn = (e)=>{
        var t = B.length;
        e >>>= 0;
        var r = Sn();
        if (e > r) return !1;
        for(var n = 1; n <= 4; n *= 2){
            var a = t * (1 + 0.2 / n);
            a = Math.min(a, e + 100663296);
            var i = Math.min(r, In(Math.max(e, a), 65536)), u = Dn(i);
            if (u) return !0;
        }
        return !1;
    }, Xt = {}, Fn = ()=>M || "./this.program", ht = ()=>{
        if (!ht.strings) {
            var e = (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", t = {
                USER: "web_user",
                LOGNAME: "web_user",
                PATH: "/",
                PWD: "/",
                HOME: "/home/web_user",
                LANG: e,
                _: Fn()
            };
            for(var r in Xt)Xt[r] === void 0 ? delete t[r] : t[r] = Xt[r];
            var n = [];
            for(var r in t)n.push(`${r}=${t[r]}`);
            ht.strings = n;
        }
        return ht.strings;
    }, jn = (e, t)=>{
        var r = 0, n = 0;
        for (var a of ht()){
            var i = t + r;
            P[e + n >> 2] = i, r += it(a, i, 1 / 0) + 1, n += 4;
        }
        return 0;
    }, Rn = (e, t)=>{
        var r = ht();
        P[e >> 2] = r.length;
        var n = 0;
        for (var a of r)n += ge(a) + 1;
        return P[t >> 2] = n, 0;
    }, Ln = (e)=>52;
    function Bn(e, t, r, n, a) {
        return 70;
    }
    var Wn = [
        null,
        [],
        []
    ], Un = (e, t)=>{
        var r = Wn[e];
        t === 0 || t === 10 ? ((e === 1 ? st : k)($e(r)), r.length = 0) : r.push(t);
    }, Vn = (e, t, r, n)=>{
        for(var a = 0, i = 0; i < r; i++){
            var u = P[t >> 2], s = P[t + 4 >> 2];
            t += 8;
            for(var l = 0; l < s; l++)Un(e, B[u + l]);
            a += s;
        }
        return P[n >> 2] = a, 0;
    }, kn = (e)=>e;
    br(), _r(), Br(), Xr(), c.noExitRuntime && c.noExitRuntime, c.print && (st = c.print), c.printErr && (k = c.printErr), c.wasmBinary && (Z = c.wasmBinary), c.arguments && c.arguments, c.thisProgram && (M = c.thisProgram);
    var Hn = {
        s: ur,
        w: cr,
        a: lr,
        j: fr,
        m: dr,
        N: hr,
        p: pr,
        da: vr,
        d: yr,
        _: mr,
        sa: wr,
        Z: $r,
        na: Tr,
        qa: kr,
        pa: Nr,
        F: zr,
        la: qr,
        R: Zr,
        S: Qr,
        y: Kr,
        t: tn,
        ra: rn,
        ma: on,
        O: hn,
        K: pn,
        ta: vn,
        oa: yn,
        V: mn,
        ua: zt,
        wa: $n,
        $: En,
        T: _n,
        va: On,
        ka: xn,
        aa: An,
        ea: Mn,
        ba: jn,
        ca: Rn,
        fa: Ln,
        X: Bn,
        Q: Vn,
        I: ba,
        C: Ta,
        U: oa,
        P: Sa,
        q: ma,
        b: ea,
        D: $a,
        ia: Ea,
        c: na,
        ha: _a,
        h: aa,
        i: la,
        r: da,
        M: wa,
        v: pa,
        E: ya,
        J: ga,
        A: Pa,
        H: Ia,
        W: Fa,
        k: sa,
        f: ia,
        e: ra,
        g: ta,
        L: Aa,
        l: ca,
        ja: Ca,
        o: ha,
        x: fa,
        u: va,
        ga: xa,
        B: Oa,
        n: ua,
        G: Da,
        Y: Ma,
        z: kn
    }, E = await or();
    E.ya;
    var Nn = E.za, et = c._free = E.Aa, Pe = c._malloc = E.Ca, zn = E.Da, v = E.Ea, Gn = E.Fa, Xn = E.Ga, qn = E.Ha, Yn = E.Ia, Zn = E.Ja, Qn = E.Ka;
    c.dynCall_viijii = E.La;
    var Jn = c.dynCall_vij = E.Ma;
    c.dynCall_jiji = E.Na;
    var Kn = c.dynCall_jiiii = E.Oa;
    c.dynCall_iiiiij = E.Pa, c.dynCall_iiiiijj = E.Qa, c.dynCall_iiiiiijj = E.Ra;
    function ta(e, t, r, n) {
        var a = m();
        try {
            g(e)(t, r, n);
        } catch (i) {
            if (y(a), i !== i + 0) throw i;
            v(1, 0);
        }
    }
    function ea(e, t) {
        var r = m();
        try {
            return g(e)(t);
        } catch (n) {
            if (y(r), n !== n + 0) throw n;
            v(1, 0);
        }
    }
    function ra(e, t, r) {
        var n = m();
        try {
            g(e)(t, r);
        } catch (a) {
            if (y(n), a !== a + 0) throw a;
            v(1, 0);
        }
    }
    function na(e, t, r) {
        var n = m();
        try {
            return g(e)(t, r);
        } catch (a) {
            if (y(n), a !== a + 0) throw a;
            v(1, 0);
        }
    }
    function aa(e, t, r, n) {
        var a = m();
        try {
            return g(e)(t, r, n);
        } catch (i) {
            if (y(a), i !== i + 0) throw i;
            v(1, 0);
        }
    }
    function oa(e, t, r, n, a) {
        var i = m();
        try {
            return g(e)(t, r, n, a);
        } catch (u) {
            if (y(i), u !== u + 0) throw u;
            v(1, 0);
        }
    }
    function ia(e, t) {
        var r = m();
        try {
            g(e)(t);
        } catch (n) {
            if (y(r), n !== n + 0) throw n;
            v(1, 0);
        }
    }
    function sa(e) {
        var t = m();
        try {
            g(e)();
        } catch (r) {
            if (y(t), r !== r + 0) throw r;
            v(1, 0);
        }
    }
    function ua(e, t, r, n, a, i, u, s, l, d, h) {
        var p = m();
        try {
            g(e)(t, r, n, a, i, u, s, l, d, h);
        } catch (w) {
            if (y(p), w !== w + 0) throw w;
            v(1, 0);
        }
    }
    function ca(e, t, r, n, a) {
        var i = m();
        try {
            g(e)(t, r, n, a);
        } catch (u) {
            if (y(i), u !== u + 0) throw u;
            v(1, 0);
        }
    }
    function la(e, t, r, n, a) {
        var i = m();
        try {
            return g(e)(t, r, n, a);
        } catch (u) {
            if (y(i), u !== u + 0) throw u;
            v(1, 0);
        }
    }
    function fa(e, t, r, n, a, i, u) {
        var s = m();
        try {
            g(e)(t, r, n, a, i, u);
        } catch (l) {
            if (y(s), l !== l + 0) throw l;
            v(1, 0);
        }
    }
    function da(e, t, r, n, a, i) {
        var u = m();
        try {
            return g(e)(t, r, n, a, i);
        } catch (s) {
            if (y(u), s !== s + 0) throw s;
            v(1, 0);
        }
    }
    function ha(e, t, r, n, a, i) {
        var u = m();
        try {
            g(e)(t, r, n, a, i);
        } catch (s) {
            if (y(u), s !== s + 0) throw s;
            v(1, 0);
        }
    }
    function pa(e, t, r, n, a, i, u) {
        var s = m();
        try {
            return g(e)(t, r, n, a, i, u);
        } catch (l) {
            if (y(s), l !== l + 0) throw l;
            v(1, 0);
        }
    }
    function va(e, t, r, n, a, i, u, s) {
        var l = m();
        try {
            g(e)(t, r, n, a, i, u, s);
        } catch (d) {
            if (y(l), d !== d + 0) throw d;
            v(1, 0);
        }
    }
    function ya(e, t, r, n, a, i, u, s) {
        var l = m();
        try {
            return g(e)(t, r, n, a, i, u, s);
        } catch (d) {
            if (y(l), d !== d + 0) throw d;
            v(1, 0);
        }
    }
    function ma(e) {
        var t = m();
        try {
            return g(e)();
        } catch (r) {
            if (y(t), r !== r + 0) throw r;
            v(1, 0);
        }
    }
    function ga(e, t, r, n, a, i, u, s, l) {
        var d = m();
        try {
            return g(e)(t, r, n, a, i, u, s, l);
        } catch (h) {
            if (y(d), h !== h + 0) throw h;
            v(1, 0);
        }
    }
    function wa(e, t, r, n, a, i, u) {
        var s = m();
        try {
            return g(e)(t, r, n, a, i, u);
        } catch (l) {
            if (y(s), l !== l + 0) throw l;
            v(1, 0);
        }
    }
    function $a(e, t, r, n) {
        var a = m();
        try {
            return g(e)(t, r, n);
        } catch (i) {
            if (y(a), i !== i + 0) throw i;
            v(1, 0);
        }
    }
    function ba(e, t, r, n) {
        var a = m();
        try {
            return g(e)(t, r, n);
        } catch (i) {
            if (y(a), i !== i + 0) throw i;
            v(1, 0);
        }
    }
    function Ca(e, t, r, n, a, i, u, s) {
        var l = m();
        try {
            g(e)(t, r, n, a, i, u, s);
        } catch (d) {
            if (y(l), d !== d + 0) throw d;
            v(1, 0);
        }
    }
    function Ta(e, t, r, n, a, i) {
        var u = m();
        try {
            return g(e)(t, r, n, a, i);
        } catch (s) {
            if (y(u), s !== s + 0) throw s;
            v(1, 0);
        }
    }
    function Pa(e, t, r, n, a, i, u, s, l, d) {
        var h = m();
        try {
            return g(e)(t, r, n, a, i, u, s, l, d);
        } catch (p) {
            if (y(h), p !== p + 0) throw p;
            v(1, 0);
        }
    }
    function Ea(e, t, r) {
        var n = m();
        try {
            return g(e)(t, r);
        } catch (a) {
            if (y(n), a !== a + 0) throw a;
            v(1, 0);
        }
    }
    function _a(e, t, r, n, a) {
        var i = m();
        try {
            return g(e)(t, r, n, a);
        } catch (u) {
            if (y(i), u !== u + 0) throw u;
            v(1, 0);
        }
    }
    function Oa(e, t, r, n, a, i, u, s, l, d) {
        var h = m();
        try {
            g(e)(t, r, n, a, i, u, s, l, d);
        } catch (p) {
            if (y(h), p !== p + 0) throw p;
            v(1, 0);
        }
    }
    function xa(e, t, r, n, a, i, u, s, l) {
        var d = m();
        try {
            g(e)(t, r, n, a, i, u, s, l);
        } catch (h) {
            if (y(d), h !== h + 0) throw h;
            v(1, 0);
        }
    }
    function Aa(e, t, r, n, a, i, u) {
        var s = m();
        try {
            g(e)(t, r, n, a, i, u);
        } catch (l) {
            if (y(s), l !== l + 0) throw l;
            v(1, 0);
        }
    }
    function Sa(e, t, r, n) {
        var a = m();
        try {
            return g(e)(t, r, n);
        } catch (i) {
            if (y(a), i !== i + 0) throw i;
            v(1, 0);
        }
    }
    function Ia(e, t, r, n, a, i, u, s, l, d, h, p) {
        var w = m();
        try {
            return g(e)(t, r, n, a, i, u, s, l, d, h, p);
        } catch (b) {
            if (y(w), b !== b + 0) throw b;
            v(1, 0);
        }
    }
    function Da(e, t, r, n, a, i, u, s, l, d, h, p, w, b, _, S) {
        var A = m();
        try {
            g(e)(t, r, n, a, i, u, s, l, d, h, p, w, b, _, S);
        } catch (I) {
            if (y(A), I !== I + 0) throw I;
            v(1, 0);
        }
    }
    function Ma(e, t, r, n) {
        var a = m();
        try {
            Jn(e, t, r, n);
        } catch (i) {
            if (y(a), i !== i + 0) throw i;
            v(1, 0);
        }
    }
    function Fa(e, t, r, n, a) {
        var i = m();
        try {
            return Kn(e, t, r, n, a);
        } catch (u) {
            if (y(i), u !== u + 0) throw u;
            v(1, 0);
        }
    }
    function qt() {
        if (J > 0) {
            ct = qt;
            return;
        }
        if (qe(), J > 0) {
            ct = qt;
            return;
        }
        function e() {
            var t;
            c.calledRun = !0, !Jt && (Ye(), T(c), (t = c.onRuntimeInitialized) === null || t === void 0 || t.call(c), Ze());
        }
        c.setStatus ? (c.setStatus("Running..."), setTimeout(()=>{
            setTimeout(()=>c.setStatus(""), 1), e();
        }, 1)) : e();
    }
    function ja() {
        if (c.preInit) for(typeof c.preInit == "function" && (c.preInit = [
            c.preInit
        ]); c.preInit.length > 0;)c.preInit.shift()();
    }
    return ja(), qt(), f = x, f;
};
function Be(o) {
    return Le(Qt, o);
}
function Co() {
    return Ka(Qt);
}
function To(o) {
    Be({
        overrides: o,
        equalityFn: Object.is,
        fireImmediately: !1
    });
}
async function eo(o, f) {
    return to(Qt, o, f);
}
const Po = "3c07027dbfd6da47330ac18e74e6924019d9ac9a4c1e161b800666f9e3c925ca", We = [
    [
        "aztec",
        "Aztec"
    ],
    [
        "code_128",
        "Code128"
    ],
    [
        "code_39",
        "Code39"
    ],
    [
        "code_93",
        "Code93"
    ],
    [
        "codabar",
        "Codabar"
    ],
    [
        "databar",
        "DataBar"
    ],
    [
        "databar_expanded",
        "DataBarExpanded"
    ],
    [
        "databar_limited",
        "DataBarLimited"
    ],
    [
        "data_matrix",
        "DataMatrix"
    ],
    [
        "dx_film_edge",
        "DXFilmEdge"
    ],
    [
        "ean_13",
        "EAN-13"
    ],
    [
        "ean_8",
        "EAN-8"
    ],
    [
        "itf",
        "ITF"
    ],
    [
        "maxi_code",
        "MaxiCode"
    ],
    [
        "micro_qr_code",
        "MicroQRCode"
    ],
    [
        "pdf417",
        "PDF417"
    ],
    [
        "qr_code",
        "QRCode"
    ],
    [
        "rm_qr_code",
        "rMQRCode"
    ],
    [
        "upc_a",
        "UPC-A"
    ],
    [
        "upc_e",
        "UPC-E"
    ],
    [
        "linear_codes",
        "Linear-Codes"
    ],
    [
        "matrix_codes",
        "Matrix-Codes"
    ],
    [
        "any",
        "Any"
    ]
], ro = [
    ...We,
    [
        "unknown"
    ]
].map((o)=>o[0]), Zt = new Map(We);
function no(o) {
    for (const [f, c] of Zt)if (o === c) return f;
    return "unknown";
}
function ao(o) {
    if (Ue(o)) return {
        width: o.naturalWidth,
        height: o.naturalHeight
    };
    if (Ve(o)) return {
        width: o.width.baseVal.value,
        height: o.height.baseVal.value
    };
    if (ke(o)) return {
        width: o.videoWidth,
        height: o.videoHeight
    };
    if (Ne(o)) return {
        width: o.width,
        height: o.height
    };
    if (Ge(o)) return {
        width: o.displayWidth,
        height: o.displayHeight
    };
    if (He(o)) return {
        width: o.width,
        height: o.height
    };
    if (ze(o)) return {
        width: o.width,
        height: o.height
    };
    throw new TypeError("The provided value is not of type '(Blob or HTMLCanvasElement or HTMLImageElement or HTMLVideoElement or ImageBitmap or ImageData or OffscreenCanvas or SVGImageElement or VideoFrame)'.");
}
function Ue(o) {
    var f, c;
    try {
        return o instanceof ((c = (f = o == null ? void 0 : o.ownerDocument) == null ? void 0 : f.defaultView) == null ? void 0 : c.HTMLImageElement);
    } catch  {
        return !1;
    }
}
function Ve(o) {
    var f, c;
    try {
        return o instanceof ((c = (f = o == null ? void 0 : o.ownerDocument) == null ? void 0 : f.defaultView) == null ? void 0 : c.SVGImageElement);
    } catch  {
        return !1;
    }
}
function ke(o) {
    var f, c;
    try {
        return o instanceof ((c = (f = o == null ? void 0 : o.ownerDocument) == null ? void 0 : f.defaultView) == null ? void 0 : c.HTMLVideoElement);
    } catch  {
        return !1;
    }
}
function He(o) {
    var f, c;
    try {
        return o instanceof ((c = (f = o == null ? void 0 : o.ownerDocument) == null ? void 0 : f.defaultView) == null ? void 0 : c.HTMLCanvasElement);
    } catch  {
        return !1;
    }
}
function Ne(o) {
    try {
        return o instanceof ImageBitmap || Object.prototype.toString.call(o) === "[object ImageBitmap]";
    } catch  {
        return !1;
    }
}
function ze(o) {
    try {
        return o instanceof OffscreenCanvas || Object.prototype.toString.call(o) === "[object OffscreenCanvas]";
    } catch  {
        return !1;
    }
}
function Ge(o) {
    try {
        return o instanceof VideoFrame || Object.prototype.toString.call(o) === "[object VideoFrame]";
    } catch  {
        return !1;
    }
}
function oo(o) {
    try {
        return o instanceof Blob || Object.prototype.toString.call(o) === "[object Blob]";
    } catch  {
        return !1;
    }
}
function io(o) {
    try {
        return o instanceof ImageData || Object.prototype.toString.call(o) === "[object ImageData]";
    } catch  {
        return !1;
    }
}
function so(o, f) {
    try {
        const c = new OffscreenCanvas(o, f);
        if (c.getContext("2d") instanceof OffscreenCanvasRenderingContext2D) return c;
        throw void 0;
    } catch  {
        const c = document.createElement("canvas");
        return c.width = o, c.height = f, c;
    }
}
async function Xe(o) {
    if (Ue(o) && !await fo(o)) throw new DOMException("Failed to load or decode HTMLImageElement.", "InvalidStateError");
    if (Ve(o) && !await ho(o)) throw new DOMException("Failed to load or decode SVGImageElement.", "InvalidStateError");
    if (Ge(o) && po(o)) throw new DOMException("VideoFrame is closed.", "InvalidStateError");
    if (ke(o) && (o.readyState === 0 || o.readyState === 1)) throw new DOMException("Invalid element or state.", "InvalidStateError");
    if (Ne(o) && yo(o)) throw new DOMException("The image source is detached.", "InvalidStateError");
    const { width: f, height: c } = ao(o);
    if (f === 0 || c === 0) return null;
    const $ = so(f, c).getContext("2d");
    $.drawImage(o, 0, 0);
    try {
        return $.getImageData(0, 0, f, c);
    } catch  {
        throw new DOMException("Source would taint origin.", "SecurityError");
    }
}
async function uo(o) {
    let f;
    try {
        f = await createImageBitmap(o);
    } catch  {
        try {
            if (globalThis.Image) {
                f = new Image();
                let $ = "";
                try {
                    $ = URL.createObjectURL(o), f.src = $, await f.decode();
                } finally{
                    URL.revokeObjectURL($);
                }
            } else return o;
        } catch  {
            throw new DOMException("Failed to load or decode Blob.", "InvalidStateError");
        }
    }
    return await Xe(f);
}
function co(o) {
    const { width: f, height: c } = o;
    if (f === 0 || c === 0) return null;
    const T = o.getContext("2d");
    try {
        return T.getImageData(0, 0, f, c);
    } catch  {
        throw new DOMException("Source would taint origin.", "SecurityError");
    }
}
async function lo(o) {
    if (oo(o)) return await uo(o);
    if (io(o)) {
        if (vo(o)) throw new DOMException("The image data has been detached.", "InvalidStateError");
        return o;
    }
    return He(o) || ze(o) ? co(o) : await Xe(o);
}
async function fo(o) {
    try {
        return await o.decode(), !0;
    } catch  {
        return !1;
    }
}
async function ho(o) {
    var f;
    try {
        return await ((f = o.decode) == null ? void 0 : f.call(o)), !0;
    } catch  {
        return !1;
    }
}
function po(o) {
    return o.format === null;
}
function vo(o) {
    return o.data.buffer.byteLength === 0;
}
function yo(o) {
    return o.width === 0 && o.height === 0;
}
function Re(o, f) {
    return mo(o) ? new DOMException(`${f}: ${o.message}`, o.name) : go(o) ? new o.constructor(`${f}: ${o.message}`) : new Error(`${f}: ${o}`);
}
function mo(o) {
    return o instanceof DOMException || Object.prototype.toString.call(o) === "[object DOMException]";
}
function go(o) {
    return o instanceof Error || Object.prototype.toString.call(o) === "[object Error]";
}
var pt;
class Eo {
    constructor(f = {}){
        De(this, pt);
        var c;
        try {
            const T = (c = f == null ? void 0 : f.formats) == null ? void 0 : c.filter(($)=>$ !== "unknown");
            if ((T == null ? void 0 : T.length) === 0) throw new TypeError("Hint option provided, but is empty.");
            for (const $ of T != null ? T : [])if (!Zt.has($)) throw new TypeError(`Failed to read the 'formats' property from 'BarcodeDetectorOptions': The provided value '${$}' is not a valid enum value of type BarcodeFormat.`);
            Me(this, pt, T != null ? T : []), Be({
                fireImmediately: !0
            }).catch(()=>{});
        } catch (T) {
            throw Re(T, "Failed to construct 'BarcodeDetector'");
        }
    }
    static async getSupportedFormats() {
        return ro.filter((f)=>f !== "unknown");
    }
    async detect(f) {
        try {
            const c = await lo(f);
            if (c === null) return [];
            let T;
            const $ = {
                tryCode39ExtendedMode: !1,
                textMode: "Plain",
                formats: Ie(this, pt).map((x)=>Zt.get(x))
            };
            try {
                T = await eo(c, $);
            } catch (x) {
                throw console.error(x), new DOMException("Barcode detection service unavailable.", "NotSupportedError");
            }
            return T.map((x)=>{
                const { topLeft: { x: D, y: R }, topRight: { x: O, y: M }, bottomLeft: { x: F, y: q }, bottomRight: { x: rt, y: Y } } = x.position, st = Math.min(D, O, F, rt), k = Math.min(R, M, q, Y), Z = Math.max(D, O, F, rt), nt = Math.max(R, M, q, Y);
                return {
                    boundingBox: new DOMRectReadOnly(st, k, Z - st, nt - k),
                    rawValue: x.text,
                    format: no(x.format),
                    cornerPoints: [
                        {
                            x: D,
                            y: R
                        },
                        {
                            x: O,
                            y: M
                        },
                        {
                            x: rt,
                            y: Y
                        },
                        {
                            x: F,
                            y: q
                        }
                    ]
                };
            });
        } catch (c) {
            throw Re(c, "Failed to execute 'detect' on 'BarcodeDetector'");
        }
    }
}
pt = new WeakMap();
;
}),
"[project]/p2p-react/node_modules/barcode-detector/dist/es/polyfill.js [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$barcode$2d$detector$2f$dist$2f$es$2f$ponyfill$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/barcode-detector/dist/es/ponyfill.js [app-ssr] (ecmascript)");
;
;
var e;
(e = globalThis.BarcodeDetector) != null || (globalThis.BarcodeDetector = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$barcode$2d$detector$2f$dist$2f$es$2f$ponyfill$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BarcodeDetector"]);
;
}),
"[project]/p2p-react/node_modules/barcode-detector/dist/es/polyfill.js [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$barcode$2d$detector$2f$dist$2f$es$2f$ponyfill$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/barcode-detector/dist/es/ponyfill.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$barcode$2d$detector$2f$dist$2f$es$2f$polyfill$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/barcode-detector/dist/es/polyfill.js [app-ssr] (ecmascript) <locals>");
}),
"[project]/p2p-react/node_modules/barcode-detector/dist/es/index.js [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$barcode$2d$detector$2f$dist$2f$es$2f$polyfill$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/barcode-detector/dist/es/polyfill.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$barcode$2d$detector$2f$dist$2f$es$2f$ponyfill$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/barcode-detector/dist/es/ponyfill.js [app-ssr] (ecmascript)");
;
;
;
}),
"[project]/p2p-react/node_modules/barcode-detector/dist/es/index.js [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$barcode$2d$detector$2f$dist$2f$es$2f$polyfill$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/barcode-detector/dist/es/polyfill.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$barcode$2d$detector$2f$dist$2f$es$2f$ponyfill$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/barcode-detector/dist/es/ponyfill.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$barcode$2d$detector$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/barcode-detector/dist/es/index.js [app-ssr] (ecmascript) <locals>");
}),
"[project]/p2p-react/node_modules/@yudiel/react-qr-scanner/dist/index.esm.mjs [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "Scanner": ()=>k,
    "boundingBox": ()=>f,
    "centerText": ()=>u,
    "outline": ()=>N,
    "useDevices": ()=>K
});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$webrtc$2d$adapter$2f$src$2f$js$2f$adapter_core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/webrtc-adapter/src/js/adapter_core.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$barcode$2d$detector$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/barcode-detector/dist/es/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$barcode$2d$detector$2f$dist$2f$es$2f$ponyfill$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/barcode-detector/dist/es/ponyfill.js [app-ssr] (ecmascript)");
;
;
;
;
function a(o) {
    const { onClick: e, disabled: g, className: t } = o, i = {
        cursor: g ? "default" : "pointer",
        stroke: g ? "grey" : "yellow",
        strokeLineJoin: "round",
        strokeLineCap: "round",
        strokeWidth: 1.5,
        ...o.style
    };
    return __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("svg", {
        onClick: g ? void 0 : e,
        className: t,
        style: i,
        width: "28px",
        height: "28px",
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("path", {
        d: "M3 3L6.00007 6.00007M21 21L19.8455 19.8221M9.74194 4.06811C9.83646 4.04279 9.93334 4.02428 10.0319 4.01299C10.1453 4 10.2683 4 10.5141 4H13.5327C13.7786 4 13.9015 4 14.015 4.01299C14.6068 4.08078 15.1375 4.40882 15.4628 4.90782C15.5252 5.00345 15.5802 5.11345 15.6901 5.33333C15.7451 5.44329 15.7726 5.49827 15.8037 5.54609C15.9664 5.79559 16.2318 5.95961 16.5277 5.9935C16.5844 6 16.6459 6 16.7688 6H17.8234C18.9435 6 19.5036 6 19.9314 6.21799C20.3077 6.40973 20.6137 6.71569 20.8055 7.09202C21.0234 7.51984 21.0234 8.0799 21.0234 9.2V15.3496M19.8455 19.8221C19.4278 20 18.8702 20 17.8234 20H6.22344C5.10333 20 4.54328 20 4.11546 19.782C3.73913 19.5903 3.43317 19.2843 3.24142 18.908C3.02344 18.4802 3.02344 17.9201 3.02344 16.8V9.2C3.02344 8.0799 3.02344 7.51984 3.24142 7.09202C3.43317 6.71569 3.73913 6.40973 4.11546 6.21799C4.51385 6.015 5.0269 6.00103 6.00007 6.00007M19.8455 19.8221L14.5619 14.5619M14.5619 14.5619C14.0349 15.4243 13.0847 16 12 16C10.3431 16 9 14.6569 9 13C9 11.9153 9.57566 10.9651 10.4381 10.4381M14.5619 14.5619L10.4381 10.4381M10.4381 10.4381L6.00007 6.00007"
    }));
}
function B(o) {
    const { onClick: e, disabled: g, className: t } = o, i = {
        cursor: g ? "default" : "pointer",
        stroke: g ? "grey" : "yellow",
        strokeLineJoin: "round",
        strokeLineCap: "round",
        strokeWidth: 1.5,
        ...o.style
    };
    return __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("svg", {
        onClick: g ? void 0 : e,
        className: t,
        style: i,
        width: "28px",
        height: "28px",
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("path", {
        d: "M12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10C10.3431 10 9 11.3431 9 13C9 14.6569 10.3431 16 12 16Z"
    }), __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("path", {
        d: "M3 16.8V9.2C3 8.0799 3 7.51984 3.21799 7.09202C3.40973 6.71569 3.71569 6.40973 4.09202 6.21799C4.51984 6 5.0799 6 6.2 6H7.25464C7.37758 6 7.43905 6 7.49576 5.9935C7.79166 5.95961 8.05705 5.79559 8.21969 5.54609C8.25086 5.49827 8.27836 5.44328 8.33333 5.33333C8.44329 5.11342 8.49827 5.00346 8.56062 4.90782C8.8859 4.40882 9.41668 4.08078 10.0085 4.01299C10.1219 4 10.2448 4 10.4907 4H13.5093C13.7552 4 13.8781 4 13.9915 4.01299C14.5833 4.08078 15.1141 4.40882 15.4394 4.90782C15.5017 5.00345 15.5567 5.11345 15.6667 5.33333C15.7216 5.44329 15.7491 5.49827 15.7803 5.54609C15.943 5.79559 16.2083 5.95961 16.5042 5.9935C16.561 6 16.6224 6 16.7454 6H17.8C18.9201 6 19.4802 6 19.908 6.21799C20.2843 6.40973 20.5903 6.71569 20.782 7.09202C21 7.51984 21 8.0799 21 9.2V16.8C21 17.9201 21 18.4802 20.782 18.908C20.5903 19.2843 20.2843 19.5903 19.908 19.782C19.4802 20 18.9201 20 17.8 20H6.2C5.0799 20 4.51984 20 4.09202 19.782C3.71569 19.5903 3.40973 19.2843 3.21799 18.908C3 18.4802 3 17.9201 3 16.8Z"
    }));
}
function r(e) {
    const { scanning: g, startScanning: t, stopScanning: i } = e, [w, n] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(!1);
    function r() {
        n(!0), g ? i() : t(), setTimeout(()=>n(!1), 1e3);
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        style: {
            bottom: 85,
            right: 8,
            position: "absolute",
            zIndex: 2,
            cursor: w ? "default" : "pointer"
        }
    }, g ? __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(a, {
        disabled: w,
        onClick: r
    }) : __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(B, {
        disabled: w,
        onClick: r
    }));
}
function s(o) {
    const { onClick: e, className: g, style: t } = o;
    return __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("svg", {
        onClick: e,
        width: "30px",
        height: "30px",
        viewBox: "0 0 24 24",
        className: g,
        style: t,
        xmlns: "http://www.w3.org/2000/svg"
    }, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("path", {
        strokeWidth: .2,
        stroke: "yellow",
        fill: "yellow",
        d: "M13.225 9l5.025-7h-7.972l-3.3 11h5.359l-2.452 8.648.75.364L20.374 9zm.438 3H8.322l2.7-9H16.3l-5.025 7h7.101l-6.7 8.953z"
    }));
}
function C(o) {
    const { onClick: e, className: g, style: t } = o;
    return __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("svg", {
        onClick: e,
        width: "30px",
        height: "30px",
        viewBox: "0 0 24 24",
        className: g,
        style: t,
        xmlns: "http://www.w3.org/2000/svg"
    }, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("path", {
        strokeWidth: .2,
        stroke: "yellow",
        fill: "yellow",
        d: "M14.516 15.158l.714.714-4.595 6.14-.75-.364L12.337 13H6.978L8.22 8.861l.803.803L8.322 12h3.036l1.793 1.792-1.475 5.16zm5.984 4.05L4.793 3.5l.707-.707 3.492 3.492L10.278 2h7.972l-5.025 7h7.149l-3.71 4.957 4.543 4.543zM12.707 10l3.243 3.243L18.376 10zM9.795 7.088l2.079 2.079L16.3 3h-5.278z"
    }));
}
function E(o) {
    const { status: e, scanning: g, torchToggle: t } = o;
    function i(A) {
        t(A);
    }
    return g && t ? __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        style: {
            bottom: 35,
            right: 8,
            position: "absolute",
            zIndex: 2,
            cursor: "pointer"
        }
    }, e ? __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(C, {
        onClick: ()=>i(!1)
    }) : __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(s, {
        onClick: ()=>i(!0)
    })) : null;
}
function c(o) {
    const { onClick: e, className: g, disabled: t = !1 } = o, i = {
        cursor: t ? "default" : "pointer",
        stroke: t ? "grey" : "yellow",
        fill: t ? "grey" : "yellow",
        ...o.style
    };
    return __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("svg", {
        onClick: t ? void 0 : e,
        width: "30px",
        height: "30px",
        viewBox: "0 0 24 24",
        className: g,
        style: i,
        xmlns: "http://www.w3.org/2000/svg"
    }, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("path", {
        strokeWidth: .3,
        d: "M16.279,17.039c-1.396,1.209 -3.216,1.941 -5.206,1.941c-4.393,0 -7.96,-3.567 -7.96,-7.96c-0,-4.393 3.567,-7.96 7.96,-7.96c4.393,0 7.96,3.567 7.96,7.96c-0,2.044 -0.772,3.909 -2.04,5.319l0.165,0.165c1.194,1.194 2.388,2.388 3.583,3.582c0.455,0.456 -0.252,1.163 -0.707,0.708l-3.755,-3.755Zm1.754,-6.019c-0,-3.841 -3.119,-6.96 -6.96,-6.96c-3.842,0 -6.96,3.119 -6.96,6.96c-0,3.841 3.118,6.96 6.96,6.96c3.841,0 6.96,-3.119 6.96,-6.96Zm-7.46,0.5l-1.5,0c-0.645,0 -0.643,-1 -0,-1l1.5,0l-0,-1.5c-0,-0.645 1,-0.643 1,0l-0,1.5l1.5,0c0.645,0 0.643,1 -0,1l-1.5,0l-0,1.5c-0,0.645 -1,0.643 -1,0l-0,-1.5Z"
    }));
}
function h(o) {
    const { onClick: e, className: g, disabled: t = !1 } = o, i = {
        cursor: t ? "default" : "pointer",
        stroke: t ? "grey" : "yellow",
        fill: t ? "grey" : "yellow",
        ...o.style
    };
    return __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("svg", {
        onClick: t ? void 0 : e,
        width: "30px",
        height: "30px",
        viewBox: "0 0 24 24",
        className: g,
        style: i,
        xmlns: "http://www.w3.org/2000/svg"
    }, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("path", {
        strokeWidth: .3,
        d: "M16.279,17.039c-1.396,1.209 -3.216,1.941 -5.206,1.941c-4.393,0 -7.96,-3.567 -7.96,-7.96c-0,-4.393 3.567,-7.96 7.96,-7.96c4.393,0 7.96,3.567 7.96,7.96c-0,2.044 -0.772,3.909 -2.04,5.319l0.165,0.165c1.194,1.194 2.388,2.388 3.583,3.582c0.455,0.456 -0.252,1.163 -0.707,0.708l-3.755,-3.755Zm1.754,-6.019c-0,-3.841 -3.119,-6.96 -6.96,-6.96c-3.842,0 -6.96,3.119 -6.96,6.96c-0,3.841 3.118,6.96 6.96,6.96c3.841,0 6.96,-3.119 6.96,-6.96Zm-4.96,-0.5c0.645,0 0.643,1 -0,1l-4,0c-0.645,0 -0.643,-1 -0,-1l4,0Z"
    }));
}
function q(o) {
    const { scanning: g, capabilities: t, onZoom: i, value: w } = o;
    if (!g || !i) return null;
    const n = (t.max - t.min) / 3;
    return __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], null, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        style: {
            bottom: 130,
            right: 8,
            position: "absolute",
            zIndex: 2,
            cursor: "pointer"
        }
    }, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(h, {
        disabled: w <= t.min,
        onClick: function() {
            i(Math.max(w - n, t.min));
        }
    })), __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        style: {
            bottom: 180,
            right: 8,
            position: "absolute",
            zIndex: 2,
            cursor: "pointer"
        }
    }, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(c, {
        disabled: w >= t.max,
        onClick: function() {
            i(Math.min(w + n, t.max));
        }
    })));
}
const l = {
    fullContainer: {
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
    },
    innerContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
    },
    overlay: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    borderBox: {
        position: "relative",
        width: "70%",
        aspectRatio: "1 / 1",
        border: "2px dashed rgba(239, 68, 68, 0.4)",
        borderRadius: "0.5rem"
    },
    cornerTopLeft: {
        position: "absolute",
        width: "15%",
        height: "15%",
        border: "4px solid #ef4444",
        top: 0,
        left: 0,
        borderBottomColor: "transparent",
        borderRightColor: "transparent",
        borderTopLeftRadius: "0.5rem"
    },
    cornerTopRight: {
        position: "absolute",
        width: "15%",
        height: "15%",
        border: "4px solid #ef4444",
        top: 0,
        right: 0,
        borderBottomColor: "transparent",
        borderLeftColor: "transparent",
        borderTopRightRadius: "0.5rem"
    },
    cornerBottomLeft: {
        position: "absolute",
        width: "15%",
        height: "15%",
        border: "4px solid #ef4444",
        bottom: 0,
        left: 0,
        borderTopColor: "transparent",
        borderRightColor: "transparent",
        borderBottomLeftRadius: "0.5rem"
    },
    cornerBottomRight: {
        position: "absolute",
        width: "15%",
        height: "15%",
        border: "4px solid #ef4444",
        bottom: 0,
        right: 0,
        borderTopColor: "transparent",
        borderLeftColor: "transparent",
        borderBottomRightRadius: "0.5rem"
    }
};
function M(o) {
    const { scanning: e, capabilities: g, onOff: t, torch: i, zoom: w, startScanning: n, stopScanning: a } = o;
    return __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        style: l.fullContainer
    }, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        style: l.innerContainer
    }, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        style: l.overlay
    }, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        style: l.borderBox
    }, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        style: l.cornerTopLeft
    }), __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        style: l.cornerTopRight
    }), __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        style: l.cornerBottomLeft
    }), __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        style: l.cornerBottomRight
    }))), t && __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(r, {
        scanning: e,
        startScanning: n,
        stopScanning: a
    }), i && g.torch && __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(E, {
        scanning: e,
        status: i.status,
        torchToggle: i.toggle
    }), w && g.zoom && __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(q, {
        scanning: e,
        capabilities: g.zoom,
        value: w.value,
        onZoom: w.onChange
    })));
}
const G = "data:audio/mp3;base64,//PkZAAhghE0AKToAJra/n0FQygAAAGIkYJgmCYXBMAAGCTJz3zhCEM//z//1hz//8MMMMN08ssV6e5DDWIQreAgCvFKy8bXgIKMkUDDBgzJwIBtkRMQAocxIFdxghQGKDoEziAzQxOBOdH92i/iGi+zDCAEIX46a73HrSybZw1x3JZjXp7dSNy/P68rjcbt7p7fakMP5LVMyzCaj1pjvejYYAIDgDGzECjEAk1Jl3559HIon8hzlfPVTCvGJZzfcKSxXfyMWM88//9VKSxXdtnb9vomOuuRyiWVYbf+X8zp6fKGHIdycuWMMMMMMKSnp+6wsYc/9f/7z7rPPWHN556p6fP8MMMP///PPP/7+GHK9PT6p7f/unldP2np7YeHjweiYA4GLNAgAiI7u57n5//oc5/yfk6znOcPhwOBwggHCMpA4HA4KEyHOc5znO+hPIc5//+fqJh8XQPh90JU5xQinOf//87/zvP+ggAYuhCKHxdA+Hxd0EA4KKHA4ciB3kOXfXB/gmf8p/B96lAMKAgAADU+BujARHgwdisgHMfAUHAiceBg4ASBgZBiBIBH4ZaHOJsLhf8R+HYEciIgYSwj/+Bi7EqBh+AcBn5P6Bh4TuBmrAMBiZH7gaLEWgew//PkZFMlyek60MpYAShzqqZhm6gCUWeEUWAewEWYGN4X4GDEPwGE8S4GDoOIGAYKgIQOkz//gGARAUB+CwGxTwMAACAEgyAwdAlAxKhzAxXiZ///AxcEwAwJjDAziCAAwQgdAwRgdAsJQDAmAcGzYDwAhZIAKAcIQB4GT9TQMJ9/4Gi1Fv/AcAYUqKBAwGgNAwVBAAwGhwAwdBlAxFg1AwlgzAwNBuAkJQDBgEEDEqGECgChFgBgL//CIswYYH//+HKCpk4K0C9AaKKCAOBeMcR4X9C44BwABCgGAsGYCgTwHAcAwXAiAwSAQV///CJP9lwMBQAwAAAWGo5lVLCcaeneVhJAVGai3//ioaUEf//gaTAYGCj8BnEwfrIqDcsIQb/vmhU/8fAs0G8YGGwKST8Igj4GCATipksVzY8p//90FWJwh45AkX//4fCF9wMEgkL3uQc+gbGJ8t4MBAMBP/hEXf9FRuWBcAfIFjYzQdoLCBwh7IWVlxaX/w8oMCP/+EQT5poGB1Ir90DhiV6af/jFYBpT2BgoQyyt2M0ToBdEaZyzt8nTo3xdNDCTSd//o6F06CjooxRr4jVF/0bOKD6OMUNDRxiMUVFR0FFQPhGXRjDpr4MAEA4wIQUhYOIw//PkZE4nrg08sOx4ACQ0CopD2aAAlwTTBxQeMcwd8w8gZTAgABXwGABOkzpI0wAQAExnWfP4x8ZjKunWdZ1o1Qe6lFGKCNULORQCELAAPnRUf/GIx/0FHGfo3SdZ0qP2cukXKLlRtBKFgAQwCkwJgFRYBEEATmDsLSY2QiQYCEnEra+UZo6F1aKMRr6GhoaP/+j//ov+i+hjLqBgMkYoqChoo1GqCjoY06TpRqjjLOYzRRmMuizmgdKhdF8kjTAAAPMCwGswzglgwAJfzqxmioKH/////////////+ijLOAwFmN0f/////////Q///8ZjP/9DGYyFwIDBeB3MA4AlBWidKM5spykAUAQOCakK+udGqN8VDYjTRuN//0bVX//6Kio4xQFv//nf//kKOoAEIB6SY6hcxenp85///4/DEPf/84Xvl4vF4dwtxfEJgCYQHMSgKCROp4+fn////L4tQf0unz89OecLxeL0ul09y6enzp4dIhKAQFA5hKfLu1nU7/Wr71rRKJUBQSUVt////l08GUPVWgAAYAeNKsxbQNAAhQx3/oKGMM6dZ1Yy6sajMbfKio7lNcv0sScZ47lNcw32ekVFMP9fp/f+mklI6at6u/dBMQuW6y+C5BcgwAA//PkZEomGg1HYGe0riWsCqbEwiY0BJFJMxrCcxGgQ2VK8xxCF1wsABgQBBgQBAYAFCkYCgALkK4fJ00E5ctJN1Uxy5au3XoGcM4dSN0EYZwzhW0WCh1PZwzhnFFQxtnbO2d0Kt6CdXbruggkTEX5Rs4TEQUVsdVXaCcuWXIBQUGmwmgoAGcJiM4dSioHQdBnEY+hjcbov//jcb/43G43G/jCRibfxugdBnDqULO2duvQumztncbo4xGKKNxugooxGIxQULoOgFgUMTA/jbrxiMDmETL+eLhcPThzOeeOZfL5fIcBYuXD/OHv8t//LJFxjxQYHHKDGFkZMtlmKM0RgQfbVtxFIHbQBDRuzRguEI1c9XZ/rWmrZfVU3Oc/9utNNygRQkCoHlAYstNN6DJ1IINpoINppv+WG/+g2mmnUmmmpBAoJIJhnwB5xkymn606Df/t000xhU03UXC5Ol8uFyXy+Xy/l8v5w4cLk4XAvwAYUvl/QL5fTdlKZkEEEEGumaKaX00zIOemf6CH///ywI3LKpiQ2Ef4xYWMSDyI0XwzikpL0ajVHZ3j9DGIjeuXcNfjn96/S/TUz/X/vX////5K/r+v7Jn+LlAoGZOIQIwMKBQM/yppKYURmhGZkR2b//PkZE0mHg1HEG8wyiD7mlwAyDU8nJHi5htakZmZGNiRcpkJhBmUmZYQcM1VDEEBggNDV/ASEZRYKFZIhkXKLlKmk7IVTKmZNJ5KhiqVUqpX+k7+qlVKyV/ZIqZDFDWTJlFyi5TJpKhiXKBQyZzIS5JhBoayV/AQWVpGWkcYTV5O/rIVSv8/0nkr+v6/vyR/X9f1/ZN8kf5/n99/n+f5/lTKmf9/mRP8yFUqpWSv4yJUqpX9kj/MmZNJ5K/z/P9J5P/v6yFUz/CEoywgUMqZkz/FssECIsVq0aPRrRRatFFFykQZJ2Ukl///5KjmksOaA7ALROJLDnEsLbq3GTMVrwb/0dGzmM0DlfBlHQOmrdR0MYi92TX6b/cmDHLclyUVYO/4O8sFTKFTKFf8yhUyhUyhXzKlDKlCsr/+ZUoVlSsr/+ZQqZUoZUoceMfcoZUoZUoVlfOPGcmDHKcpynKg9yXJcr3JclyXJclyYO+DXJclyfgxFZVb3KcqD/g2MxzsY72L9LubPR0dCyf5K5NNd+Tv9GXRdV0XJclyfcl/n+k8kf6SX/iVynvXf///4Mg/1OkxguYzmM5jMcLHMxwwGhgNCwXMLAcwMXTLi1MD7w7tmTdBvMmE0xQFzCwHMDAd//PkZGMpigkmAGOUvCfTgcgAuC+ITswMFzC4oMLhYMByn0xvU+p9Tr0xUxf/0xv///1PBYDhgNTFTFTGTGTGTGTGTGTGTGC4GTFMDAcLAdMVMVMULAcMBpgYDhcDGFwsYXFBikLGFwMGA4MBxgcDKfTEMUoAx2BisD+mKp5Tv1OkxkxkxkxkxkxkxkxlO0xVPJi/6nv////U7CwHTFTFTGTGTGTGU+p71PpjJipihYDpipi/6n1Ov//C4GC4GTGTGTGTFU8WBSZdLhWB//yKlotyLZFiLf8tyyRUipFSKkVGRBZQMiWC3yx//wxUGKsSvDFQGHUAL3QMsHDFIYpCYy2Bmagy6BjLgy6Bh3od58DCLAizBgRb+EQiyEQiwGBFuDAi3/////20QqSBJf/qcumv/////wMZdGXAYMu1gYy6MuBEZdBgy4BjLgy6BjLgy6BjLgy6BjLQy6DBlz2cJDLgRGXAMZdGXAYMuhMZcCIy6sJGaoGMuppwNRl3WBjLgy63wiEWAwIt/+EQi0IhFsDCLAi0GBFkGBFgMJCqaqYAgAYIhBBvwf7kwcqRq7V3IctacvlN6NxqgooxRRuNRiijEZjMGRuMvz9FGozQ+1X2qe1T1S//+VhaWAtKwtML//PkZEIkbgcaAHc1xCJrjeAAtfuUAtLAWf///mWePH95ZFgsyssvM88+jzO6K+z7OM48sH+WDiweZx5YOK+zxWLGJWsa6xadAv02fTZLSpsFpvLSga0tMgWgUgWmwgUmyWl8tMgWWmLSoFJsoFlpSwsmyBg4HhEdgwHAYPBwGDgeBg8HwMHg4DB4PBgOAwcOwMHLwDn5lAwcDgiDgYDwMHA/4MB3//+EQeDAdwiDwYLPhEWQYLODBYERZBgt8Ii34GLBaB5pfAZ0FvEAQ/UfwxULlx+IXx+8f5CELH8fxKhAIDFoHBEDRc3////gwHgaRXgMHYMB2EU/gwZ/gYbw3gY3QbgYNgbgYiAbgwN3/+EQbBEG4MBuDAbAwG4RBtAwbg2////+B9B6F//////////hEdD//////////8DRahEQGCInMNg3LBElgNjDciCwG/lgNiwGxWG///mG4bf/+WA3Kw3KyIMNw2Kw3MNg3MNg3MNiIMiQ2OK0xMiA3KyJLAEZgRARmBEDEYFwBBgEgEeomowol5YAJKwCDAIAJ8sAE+gGBgCJYAQUZ/13LubMu5dyiYOAhKwEFGf9AOoz/g4CFAIol/lgAjysAgsAElYBP////lgJksBM//lgRUxF//PkZGApggsIAHt2wiNLoggAqCz8RFSwIqYioipkjEjHCCSN/+WJg5iYOYmPK5krmTmZk5mZ8sTJYmf8yJiNiIisi/ywRmRkZkZGZGRmRERkREZERGRERkREZERGxEf///hETIMEyBiZEyBiZEzwiJgDEwU4DV2gQGFOBgmP8GAiAwRAiBgIgYCIGAi/4MBHAwRgjAwRgjwMEQIgMcgY8DBGCMDBGCMDEyJn///+BiYQIBlObj4eYLIwsjAOBGFkYBoEQ84eULIw88LIA88PKHnw8sPKFkeHlANAiAaFUDAiMYPIHmDzBZBhZB///8GBOA1sH/Awni7AwnhPCITwYE/CKzBgt8Ig8GA4Ig6EQdww4Yb+F1sIgtwYCwGAsAwWAsBgLAYCwDBYCwDBaHUDF+VEDKgC2BgtBaDAWgYLQW////gYLAWQMFgLAMFoLcGAt////4RMABmBSj4NgwMOGHBsHhdcLrwbB4XXC6+F14YcLrww4Ng8MOGHBsHww4Ng8AUC4AoMQMC4fgw3wutV4QIsAgFYIBWCCVgHeVgHeWABCwAIVgH+YBwB5aRAstKgV6Ba1oMg9avtUVN/qdLWciD/cqD3Jg6DFPuTB/////lYAn//mC8C+YLwL5gvgvGC//PkZFEpLgMKYXt2xB5LogAArbdc+C8VgvlYL/mC8C+YLwL5YBfMNgNkwXixDWoHPMc4VUxVA2TBeDZPYXzXl815fK14sLxYXvK1//NeXzXl815fMtdDLSw3UsMtLCstMtLDLSwsFhWWlgt//8sFhW6f/////+WF7zXl8sL5ry+Vrxry+WF/wMLwX4MC+EQv/AwvBfAxsjYAyqpKA0lpLAwvBfBgXv///4RA2DANAYGgNgYGgNgYGwN+EQvf/BgXwYF//8DC+F4Dd6NgGBf4AgFwbB0MMF1wuuDYMBsGwusDYOBsHA2Dvg2DQuuDYOhdcMMF14YYDGYDEGwfhhgbB0MN///4RBaEQWgZByoYRWYMFvwiDsGwaF1gbB34GDwdC64XW/w1aKxDVgatir4YcLrQbBwNg7////////////+ESfgZPyff/////////4MFmBvvMAERZ8CC5adNj02E2S0qbCBSBZaYtN///oFlpU2QMXIFAYuQK9AtAo7IxLTpsIFJs/5aZRxQawaxGfIg9CsrI+PUqkWdOHp7ODsOl6cOHZ4dsulfLI9/8BAAgMBACsBLACVgBjoAWAE5OTM6WDAR0zodMdHCsJLASWAjzCQgsBJhASWAjysI8wkJMICU//PkZFkeqgcaYDd1th6DogAAqCuIxQwtDA5MdMULgyY6YqnXqdep5TpMdMVRNRL/UT9AN6jCiSjKAZRNRhAMomgFQDfCIJwYCQiCAiCMGAkGAgDBJUA3eVAMEgj////8SrDFIYqh5g8kPMHkDzB5OFkYeYPJ+HlDzB5+AYVQDibCyIPLLEZIsjIliWS0WywWyyWuWCyWJaLZbLJYDHgLAItFvy3///4eYPKBlQTh5QYEODBb//hhoNg7/C62DYPFUKwKsVgNWBq8VkVcVkVUVYrH//hGff/8Iz8GT7//////wiX4ML3gwvgwvf4ML3gZeqoHVGyBl4vgZfL2F1oNg4Lrg2DcLrg2DQw0Lrhh8Lr4YcMNBsGhdcGBcMOGGAFGAGMQsF1guuGG4XXV/4uQXOLmF1kL/8lCXkuSk4O8/FzHzuP0hIucf/CIFAMCgFPgYFAKAwCgGBQCgGHYO4GBVM4GgQI4RCMEQKQOtQjUI1CNcI14MqDKwDIAGQDzh5wsjDyw8uHmDzYeUPN+DEYRRhFEIowYgDQgIhWDApgwKAwKQYFAYFQMKkYDOxHAzsRgMKBUGBX/h5v+Hm4ecPNh5A8wBwjhZHhZAHlDzBZAFkAeQPKHnCyILIAsih5QsgDz//PkZLQgIgsMAFp1xCGLogAAA2rkB5w8oeYLIQ8kPMHkCyGHnAMKoGmAgFkUPMHmDYAtfHPHNkr/JYl8c8lCWHPHMkqSo5onMAkBDnfJX//8IgDBgBhEdAaxSQMHUGAEIgAV4risCcipBOMVRVBO////hEvAxsAwvf////8MPDDww4XWC64XXDDww4YcMPC6wYb/wYGgiGwMplMDYhTCIaCIaBga/////8GA+EQdgYPB4MB4GDwdhEH8Ig8Ig8GA6EQcEQf8DBxlBjoAweDuFwgCQXiL//iLiKCKCL4XCiKRFwEgoRT4iqpMQU1FMy4xMDCqqqqqqqr////xuDd8fv/DVwrArEIg6EQdhEHAYPBwMB+ERYBi0WAwWAZ0FoGLYOB+JfgZ0FoGdBaDBYbn+WHm9xW7/Nzzc83PLDzc8reWlA7S0oHamx//6BflpU2C0qbBaf/8yk/ysn+VkMhTKQrKVk8yE8rIVkKyYsAn/5WC+YICmCApWCGTkxtKMcVWlgFMEBTBAX////0C0C0C/////////LTFpvTZLTlpv/0Ci0xaYtOgWmymyWkAxcWmTZTYTY8tMmygUWmLTIFpsFpv9NnywLmLCx2RgWmQKTZ98UjnzZ1/++D4M6/////3//PkZOgjIg8IAFcbxCaTogAAoCuIzfJ8vfJ8Wcs5fBnD5//++L5f////////6nCKv//+o0o0FUYwqDNGCwgUMKC0VVGkVv//4Yf8LrxVCriqDVoasDVuKsNWw1bisBqwVkVkVX//gy/4YYMMGGhhgwwNg4LrhdcLrAYWGAA0zBsH4Ng3C6/////4MAoGBQIDAKBgUCAwCgYEAsDAoEAwKBAYBYMAoGBQIBgUCYGBQIBgUCwiBAYBYMAoRAgRAoGBBMBooCAYFAkIgTEUxFv/EWxFxFhFoi0LhQuFiLCL/EWqTEFNRTMuMTAwqqqq//////8TWJriV/hERAwRgYiEYGIhGBmIRgYiEYMEQMEcDMSiA1GYwMR+UDMTkA7KIgMRGIGGM0SIrRGjRlhEV4jxov8rR/5YRFhEdQSViCsR5iRJWIKxPlgQYgSViSsR5WJMQJLC78IiKERF4REeERGEREERHwMRGOBmIRhERhERAwRAYiEQGIhGBmIRAajkgG5TEEREDBHwYIwYI4REXCIV/4MCmDArgwKAYUO/gYVCkGBUGBTgYUCsGBUIhUDCoUCIVBgVBgVBgUhEKQMKhUDCoUBgVAwoFAYFcGBQDI6oA5+qQiFAMjBUGBXCyEPIFkOH//PkZPMj6gr6AFdVwifkBdwAoC2Ilh5/8PPh5Qsih5IeUA0TAZrE8PP////wMRiIIqID8piAxEIwMxCMDEQjCIj//BiIDRo8Iogii/4MKwYVhEoESkDEiIGJEgYlfBgmDBIMEAYgSBiBIREAwSERH/8I7wPfuCO4I7v/8GBvAw3Bv/////gwN34RBuBg2BuBg2BuBg2BuEQbhEG+EQbAwG4MBtwiDaDAbhEGwMBuDAbAwG4GDYG8DBsDcDBuNwDRWDcIg2AwbA34RBv///CINvCINgMRIN/////wiG4DDeG+TEFNRTMuMTAwqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq/zB4OLAP8rBxWDisHlYOKxb5WLTFgsMWiw18LDOnjPxZoxadDOgsLAtLAbKymVhsrDZWG/LAb8w2GywGysNlgNFgNGFwuBQuWnTZLToFFpisLJsFp0Cy0voFAQLFZkMCAQwIBCsC/5WBCwBCwBCwBCsCeVgUwIBCwBDEwEMCAQrAhgUClgCFgTlgCGJgJ5gQTGJwKWAKYFApgQTGBQL5kY0HMjQYnAhWJvKwIWAIVgQrApYAhWBPBgECIEBgE/8IgXhECQiBAMCkcDEwEwMCAQGAQIhoIhsGBsIhvgwN//PkZN4irgr2AAOVqiUThegAnCtMgwNwiG/8IhuDA1hENhENgYbKYHb2IBhoNhENAwN////8IhsDKZS////8IhuBhspgc0KQRDWEQ3///CNf4GAIMDAwgAwAAwhAwAwYAIgwiHBgAMAYGAAGHv///CIBqBqESDEIgRYGoGHBiDEIgGoGgMAYgxgwgxCIETwYFYMCoMCuDApBgU8DCoU//gY3G//wYFOBhUKBEKQYFfBgV8IhSEQoBkYK8IhT/wMKhXBgUCIU4RCoRCvgYVCsDCp3A1SqAYFAiFP////gY3G1TEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVgwCAwCBEC///////8IgUIgWEQIBgUCAwTQMCAQDAoEhECAYFIwGaRMBotWAasdwH/KqBmhFgaKI4GRgKVpjCBTCBPMJHNMFMIFKwnlgJ5hUxhUwGWlpAMuMuWLTFpvQKQLQKLTIFJsoFIFFZb/8woQwoT///MIF8rC+WAphAphAppgpYClgsmwBC6bHoFFpUCi0wGXFguWCwFLgUsgX6BZaVNj0Ci03//+EQKEQKEQLCIFAxMBcDAgFAwIBQYBODAKBgUCAYEAuDAKBgUCAYFAgRAngwCgwCwiBIRAmE//PkZN4iogj2AFdVxiUrhewAhOkwQIBgQ0gbOI4GRhOBiYCgYEAv////CIFAyMBQYBf///CIF8IgUDAgFBgEAwIRwMCCcDEwFAwIBf///CIEQGMDGEXCKBpCIDCEQDCAsYInDFQMMAuYSoTQMVfBlf//+DKfBgAiGDAQMIMIgCIQYADAEGAgwP////8ItgNu2/8DAAAiABgHhECBgQGEQARA8GAeEQIMABECEQIMAwYBBgCDAARA4GAAgYACDAARAwiAgwDhED4RABEBCIGBgDoH2dgZwCBgAP//BhX/+DCiTEFNRTMuMTAwqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqF1ww////////hdeGGDDBhwjeF102E2fTYAowMLjE0zTDfyyMYjEDJTwMLSwFi0/gQLoFIFpsegWmyBQsWlQL9ApNgtIWn8tMgX6BaBX+WmQL9Nn02f9NktIgUgWmwWl9Avy06bCBSbJaUtImyWkQKLTIFgYWoFFpAKFwMLzZgwAwvLTIFlpU2fQLQK///4Yf4YaF1sLrg2DAuuDYNDDQw4NgwLrhh4XXC64Ng3C60MNwbB4XWC64YcMODYPCJYDlMQBlwRLg2DOF1v/////PkZM0eKgz0AE+UuCnLFfAAk3Fsg2DAYX/ww//4YaGGDDhdbDDACFwMuXA2DADlygusDYOBsGhhv//wNU/CKQusF1oXX+F1wuuGGC6wXWDDBdbC6wXXhHv//4AHIFgC0BZAA4Ba4FkADwFsC3AtQAOcC0BYAtgAcAA9+BYAsgW4FvgWOABwC1oq+it4RT0VVG0VFGkVywo1/RWU4U59TlFb1GvRX////QK9Nj/9AtNn02fTY9NhNlAr/QK//TYTZLSJsIFemx///oF/5aZNj02U2C0yBaBfoFAS6bKBfoFVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQiA8GAO/4RAf//////wYA4GAO+EQHAwB4GDoB4GA4HQRB0BhlDIBpEAcBgPDIBgPAeDAHIFAYuLTpspsJsFpi0haRApAtAstIYKClgF/ysF/ysE/ysF//LAJ6plTlYC1ZUypmqtWVK1VqyplSFgBaqqcwAAVIqcrEBAAKmMBERCQhwD5iICIQEyABMAABBVGXF4gIA4DLAAWAEQgLVSsBaq1ZUv+YKClgELAJ////5YBP//LAL5WC+Vgn+WAX/LT+gW//PkZMIhLgrsAFt1yiD7FiB6A9qwmwViybCbCbCBSBabCBSBabPpsegWmwWn9ApApApNgCGBmEwWlLSpsf////hEHgYOB3////4GDkiBxMHhEdgYOB4GDwcBg4HW23gooFYHd/+BnAz8O8Vv//FaBm4rBWh38es2zbAtD1m2PVBqBrBqBrAF7AF3/5el84MkuHTgyy+dL0dRnEajMIyOn8RsZ5HGG/kbIpHIkYUiD0y2WctlZaWSwrKx6FZbxnL54ul04eLhw9Ol84dl86cOHT3Ipb5Z8qKpVx6/j0EkLctVTEFNRTMuMTAwgWQLQAHgLf/////4Fn+EQESEcIgInCIRW9TkrCzH0YIjjWtI+YeCD0woLCBQwsKRWUaRVCBZFZRtRtFRTlTlThRtAr0C0C//02E2fTZQK/0Ck2f9TlFRTlTlFT/9TlFVFRFb/9ThThynIQbWkAREue5S11rKdlkDEVABh61ExYPU+tOD4MQgcn4iwigivxFRFoXDcRQLhoiwioXCeAkFBcNiL8RURQBIKEVEWiLBcKIqIpEXC4QReIoIpCIKAQMxFAFAsIuIr/4YYLr//ww4XWBgwC64XX/hhgw3hhwuv8MNhhguvhdcAUYgaYTAAoWDDg2DQbBg//PkZPYe6gzuADd1uDKsBhBAe89cYYdGjtDT2hDmlD2leaOv9oX0OX/0NNLplNf8ewakNWGrTfTRpphNJtfaeh7T1/tStdtTpqN532lpX/1/kmQ5eaf2hoaV9paGleJAvd0rer2pWu1ar2vk56vVrV5Hj1Nop+/lfv5Zpkem5kX/2vtata2rq783nbvtbW6VjW6a2rq13+rO6VysV58K7tbp0ru6Vrtqa1a67tr6sau1ulYrnfa2v927Vrt21NSuN5X927/D4diAQANh4gEIfxB+IQG/D/4gDw/iGIRD+HRATEFNRTMuMTAwqqqqqqqqqqqqqqqqqiIEK/ititFX///8VcVuK38VsVhXBOQTpq/qm8QCAcBmIxgdfFZCHECpxFBFAuFEUC4cLhsRTEVEUDVoDQD+KrFYirFX+KwKoVgVUVUVeKwGrhWRWBViqFYDV4rMViKyGroauBg/A0YThVgNAEVQqw1fisis4quKxxWYrAatxWIqoqg1dFYxVxWIrAavAaAArIrAqoqhWYrIqvxWMVYrARCADhcKoVYavDVgqhV4qorIrHFWKuKxFViscVUVYasAaAfFY/4YcMNhdfwuuGGC64YfDDA2DwusANygbBwAxhAECwNg8MOF1hD4//PkZOkc4g7yBjd1sDNkDhgqYwtcYoUyiQ0NCkxQ0NCQkSIbGKIyRGEo5mUaNEhGKEHMmaGhI0UokORvMmZmZSZSiMZQkRnKKZkzRoSNCQpQ0NEZoaNFJkhh3KOUJEhIcoSJCQkIzlDlEjMDMyMpQ0JCQzNCRGaNCRISEZoZihoaIwlEHKNGiMzFEjRmSIwlHMyZmcyiGyMxRyhIkIxRSZokSEYGBkiRojAPESNGjQxvKHMmMoSKTJCQkIwlFKLDYWGhoZhYWAAUGBsAwsMDYUAcK4XDPhQVwwLAH/DfgHC6TEFNRaqqBgjwYI//wYI/8GCL///+DBFhERgwRcIiPAzGYgMRKIDcskBgjAxEIwYI4GiRwNEjhFH4MRwYjA0aOEUf8Io/BiLgxGEUYRRQij/BiKDEYMR+DBGBiMRQiIgYIwiIwYIgiIgMRGIDUSjhEReEREBiIRAwR/wYI/8IiP4MEcGCIIiOERH8GCIIiMIiIIiODBHBgjBgjwiIoREcIiOEREDBFCKiAxHJcIiMGCMGCLwYI8IiPhERgwRAwRAYjEUIiIGCP/AxGIgiIsGCL//4REYMEXhERBERhExhExAzyAZiEWDBGERGeKsVsVRVFcVwTnFcVxVgnYqipFUV//PkZPkcfgzeAFaVxDgUBgAgatvIYrgnYqgnQJyK4riqK4rwTsVor4rQAjABAgnQritFSKoqQTsE5C1haxfF7F4XQtULSFqC1i4LwWkXIWkXRdF+LwqAnME4iqCdwToVuK+HAERWAkAlgJB0OB3Doc8OYc8VCsVgIB3DuHAERUAkAkHMOBwOAIisO4dwEAEAEg6AkAl4CeHA4AkKhXioBIOiv8OB3F+LgWkXxeF8XouxcF0XBeF8XBdF8XhdAdouC8AEsXYWsXOKsVBU/FaKmK/FTxXFbFUVPiv/8VfxXitVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVAXX/8MN/wwwYf//DDBh4Yf/+DYODDfCIFAwKBQiaANFgUDAgFAwIBcADwFuBY/At8C1wLfgAdAtwLGBawLcC3AsgWeBYwLX4XW8LrBhgiFgMlhYLrhh4XWhdb8MOGGhdcMP4YaF1gw8LrwuvhhoYYLrYXWDDBdcGwfC60MN/ww8GwZ4XXC64GZQsF1wbBnDD4XXg2DcLrBdaDYPhhgusF1uGGC64YfhhoNg0LrQwwYcMNC62F1/g2DYXW4XXC6+GH8DTIW4YeB/wR/wjwR+DP/y06bJaRAtAtAtAs//PkZNwY2grqBFW1xDhTRegABLBstL6BRaVAstN5aYtN/psIFf5aQtIgWgUWk8tImyWkQL9Avy0qbKbKbJaf02f/0CkCy05adAsC3K7+mx5aVAv0C/TZ8tOmymwB2pspsFpPLSlpy0qbCBSBXlpk2E2E2C0paUtP6Bfpslp0CkCy0ibJaZAosWQLLTJsemwgUmz6BZaYtOgUWmLTpsJsoFJslpPLT+mwmz//6Bfpsf6BSBSbCBXoFeWk9NhNhAr0Cy0/+WnTZ8tJ/oFf6bP+myWn//8tMmz/lpf//////8sPTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVBgJwiCYMBP//gwE//////wiCAMEgkIggIqIDKpUCIIgwE8IzA4j+EYhGAZMIyDJA5gGRhGcIyDIhEQiIGAgwIRDwiAGAAwYMHBghGAZMGRCMhGYRgGRA5gIyDIwZPBk/wZIRmEY/gyOBxIMgIzCMgcTgwRBgjwYJBgngwTwYJhEQBiBGERMIrwOouAxAgGCQYIhERhEQDBGDBAREgwTCIgGCQYJgwSDBHwiI4MEAwSBiRHCIkGCYGJEQiI/Bgn4REYREeBiBIH6XhERhETwogoy04mpZibFmJuWYmx8n//PkZN4ZrgrkAFZUyDcjofgAA9qc0HafZ8HwNrjaG3xtjaDtJwTo+D55Ow7fxNRNSyLPlqJsAr/lmA/FmWYm5acTQVgTkVQTnBOQTgVxVBOBVFWK4J3FUE7gBABOwToVQTsVhUFcVRXBOhUBORWiuKkVYrCqK+KoqgnQrAnEV+K8E7FQE5xWBOQToVQTsVRW8V4qRUFYVgTsVhXioKgrCqKwqAnYqCtBOhUioK+CcisK8VRUFSKnirFQVBVFcE6FcVoJwKoqCrFXFUE7gnAqiuCcQTsE7xU8VP8VYrgnYrCuTEFNRTMuMTAwqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqn3/l/J/8vHL5f/BhwCETgGpIDOATgEIOFoDcHzgEIDgC+pG7eve1S/6tat7rXupDXSStWoIpGS4TSMQNIySMwpIyAaRkkZ8GJGdBtbwYkZ63tCKRkoIpGWDEjLCKRmEkjOvsEUjJOsIpGa6bOrgxIzsEkjIGJGYUkZVKCKRmqoDkgEjMJJGSYMSMAikZJ3qhp0dq9ru3X1I36FujPbXuxwKbr//waABfg0AC6DUDUDXBqBoAmQawJiGrhqDUGoN//PkZL8USgKcAAblrroTgfQAbhtQAag1QawaYNIAuQa12Lv9si7F2NnXa2Vsi7i/DZl2tlL9l+vL8tlUTUTUTUYQDIBlGUAyifqJKJqJ+p5Mf/U7TETEU7CxkxVO1PKdqeU8u4vq2ddnrsbM2Zs/tl9s67V2NlbIu5sgaA1Q14ExAmAaA0BrDVDXhpgTPDQGuBMA0gTKGgCYgTHDQGrDUGgNcNQaw1hoAmcNIaRIAtALVEgC1gteI8FpBaBIAtcRwkAWgFpBaILVBaIkAWgRwjhIiPEeDXwa/4NUGr+DRwaKBgX/8IhP//wiF8GBMGBP/wYEhEKEQmEQuDAoGFTAwLgwLhG/4MvCM8GSDJCNwZQOXg2DwbB8MPDDhhuGGBsHhh8Lrf4MCQYFCIUGJgiE8GBQMIFhELDDhdaGHhdYGwaGGDDhhuDYMBsHg2D8MMGHBsH8GwYDYMhEKEQgMCeDAsIhAiFBgQIhAYFhEKDAkGBMIhYGEC4GFCBELgYUKDAuEQsGBQMKEwiEBgUGBcIhQYFwYFAwgWDAoRC8GBAYE4RCgwKEQvhEJgYUIBhQkIhAiECIUGBIMC4RCgwJCIUGBAiFgaYLwiEA5cGXCNhGBGwZAw4Ng0MPBkqNqcoqorlh//PkZP8cygrkAFI0wjo7lfAAjhq4SnPor//psoFemygWmwWm/0C0Ci05adApNn/TZQLU5RU9FRFVFdTn1OFG1Gywv/UbUa9Ff0VoFgCwBbAtQLUCzAtgAchHAN8ImAbgBvwDd4RwjQDeAN8I0ImEQEQAbwRgiQjBHhHAN0A3vgG6Ab/CIhEgG5AN6EQESAbmEYI4RABvYRoRABuYRgDehEQiAiIRABvcA3QiQDfwjwDfCICPCJCJCJ4RwiYRwjBEwDehEYRgDfCNCOEQEQEcI+BagAd4FrAscCxAswLfwLAFgC1wLNVMQU1FMy4xMDBVVVVVVVVVBlBkwO3wZAZMIz//////+DJwO0IwI0DsA7cGUI34Rn4RgMuEZgywZQjAZP/hGAcmDKEYDIB28GQGQGXhGgcgRoMgRoHYBywZAZYMmBygyQYFCIUDChQYE4MCgaYJ/gwKEQsGBAiEBgXAwgQLrhdcGwcGHBsGA2Dgw4YYGwZC6/hdYMMF14YcLrYYcMPDDhdYGweF1oYb4MCwYEwYEgwJBgTCIQGBIRC/BgQDCBcIhAMKFhEKDAsGBQYFAwgTgwKDAoMCQiEgwIBhAnCIUGBQiFwiEBicIhAiFhEIgIoBooGieDPA+4GeDPCP//PkZOobXgrkAEY0jjazieQgBKKIBGgyBGhGhGgyAdoMmEaDIB2gyhGwZYMsI0GSDIEaDKB2QOWEaDKB2hGgygcoHYBygdkDtgygcngyAyhG4MgMgRgRmDJCNBkA7QjAZIRoRoMuByhGgyAyAyhGwZYHKByAcgMgRoHIEbCNCNA7fCNA7AZAO0GSEYEaDLA7cDthGgyAyAyQjAOwGUIyDKEYEaEYEYEaEbA5AZQZAZAZIMgRkGXBlBkCMgyAyQZYMngcmEb8GUGQIyDIBywZAZOEZhGBGwO2EbwjcI3hGYMqTEFNRTMuMTAwqqqqqqqqqqqqqqqqqqqqquDqz8GMDQIvBj///+DGDEGAMAifBj8IuEThFCIEQGPCLwiQYBFCKESDCETBhhGAZGEZ4MjgcSEY4GoRQigxCIEQGPCKBiBrgxwiBEwMIRAY4MQNMIkImDEGIRYMIRYRAYhFBjwYwNQYgwBgBh4GAMQiwYgxA0gahFBgBjgYBFhFhFCKEWBgEWEUGEIgMQYQMYRAMQigxhFBh4GkIgRIRYRAY4RIMQYgYhFA18IoMQYQihFhEgwhFCIDEGIRQieBiEUIoRQYhEwYDAFwGrBog0waAaQawacGsGiDQp9MZMVT3piJjJjK//PkZOYZBgjoaUJQ0DprofQgbhq0dep71PqeU69TpMdMVT6n1OlPKdJjpiKdFZkxlPKdJiJj+mKp/0xFPBoAmYaw0BpwJhDSBMQ1BqAmIEzDSGgNXDRDRhp+GsNMNAEyAmYagJkBMA1BpDXAmECZhoDXhqAmYawJjgTICZBrDSGsNAExDVDQGqGgNHDWBMIaQ0BrAmcCYgTHAmIEzDWGgNYaOBMw0BqDSBMYaA04aA1hqwJhw0ATKGqBM8NYEz4aQJkGoNMNIag1+GsCY+BMQJlDVw0cCYfDXw1ho4aQ0gTCTEFNRTMuMTAwqqoD37wjuhHf/////hGf////hHf/gycEZwRn4MnYMncIzsGTwOdOA507A507hGeEZ8GTuDJ4Rn4HPn4Mn4RnhGcDJwM3YM3gzdBm6DNwR3QjvA927Bm//Bm7Bm/Bm8GbgZvBm4GboR3gzeEd+DN8GbvBm6EZ+Bzp4Mn4HOnBGfA588IzsDnTgZPCM8Iz+EZ/CM4DnTgOdPBk8Iz4RJwGTidBi7AycTgiT4RJ8GE6ESdhEngZPJwGTieDCcESfwYToMJ3AycTwiTsDJ5OhEnwibwYb+ETdwibwibvCJuwYb/4RN/Btf/jYGyNv8bHLUtSzE0/LQBW//PkZPQcHgjQAFKVrjfDmgAge1eMLITcshNy1LX8si0LUTQtCyLQTUteWQmvLItSz4mgmnTJops0umEymDSPsnR9HwfB8k7Pvn0fAvwtcLXF/F+L4vQtQWuFoC0BaReF7AeBfwtcXBdF4XheFwXAtAui9C1haRdi6LwvirgnUE6FcVBVisKgrCvioK+KoqiqAhh3AQFXhwVYrFYCWHMOioVAI4dFWHPDgCAdDgdDmHcBIBEO+HRWAiKsBMO4dFQCAdATw6HBWHBWAgHBUHMOf/gICsOCoV4qw7+KxWHA6KhVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVC11Fz1+NP+/Xkqpr9OfuhQ6lZNWf+XsZc/si+KNoOj/Ntai9j7IISgZAklTqQhjToNTeQoreRdaSDODWvYAVFaWWkQmVuZPP8bRUzq896vc+XS6mm5gnnW7JLnV4z9N5XnW4k86x+uyHyxnWkmdborzraff2SvOtvljOtjd/5XRW8MivOsry/K3gUzrFPS1eFTOttTsul1+lLGdbV3c53h51mdbK7xPOr1SpnWlM63kedZnV4XPK86onnW7myrnWTmRTOqascoabXd/L+yuzS95dv1efjhl92ntYyTuIb6wuWRZFmWRa//PkZOcb/gqMACDf1LTLofggA9qc/gKRZiblqWYm3E24moSQnR9BJj6JwfBaFqWZZFoWvLUshNPxNuWn6bTZHgozRTSaNAY5oGjFQVgTkE6FUVorioK8VBXBO8VRUioAhxVioK4qAnIrYrCqKsVRVBORXBORVFcVcVwTgVBUBORUisK4rCoKwrxXFYE4FYVATjFcVhX4rcVBVFQV4rxVFSKwqCpFcV+K8VhXFYV4qivFUE4FaCdivBORUBOfBOgToE6FUVYqisKgqCtxWFbFQVxXisKgqRU4qioKuKwqCvxVBkH/4Mgf4Rg4RgfgxZBizhFYEVuDFvhFbBi3CKyEVsGLf/4MgAxaDFoGsWYMWgaxYBrFngxaDFnCKwIrAYswNas+DFgRWYGtWYMWBFZgxbgaxbgxZCKwGLIRWgxZCK2EVmDFmDFgMW4GtW8IrAYtBi3Bi0GLAYsCK0IrQit4MWeEVgRW+DFsI9cDW9AYtgxZhFaBrVgMWgxaDFvCKwIrIGtWhFaBrFuEVvBi3hFZA1i0IrYMWYMWAxaEVkGLAisCKzBizCK0DWrIRg+EYIRgQjABkHwODABkDhGDwODBgyAEYIRoRvww4YcKILYKILfhRg5htjY4OQbQ2hNAH8su//PkZP8cRgjWAFAUYjwDofQAi9pcJry1E1LUsuWvE2E0LQTcB+E2LMTctQFEEcWnFYVwTkAI4rRWFYE6BOhWwToBBAQgnIrisETANwIiAb/COEQEbgG+EcA38A3wjhGCMEeEaEeKoJwK4J2KoARBVBOIJ1FWKoJ0CcCuCdRWFcV4rioK4rAnYJ2K0V8VYr8E4xWFUVBVFQE6FXBORWFSKorxVFcVwToE5wTvBOoqwToVIJziuKwJxAQgnUVBUgnAqQCaCdxWirFaKwrRWFcE7FfFeK4rgnIrAnYrCoKoqgnAqCrip4qgnCr/////8Iu8BjvP4Ry5/8Izggc4Zw4RnD/hGcP8GThBk4eDJwgycIMnDwjOD4MnBA3eu9hF3kGO8gx3vBjvAN3jvMGO8CLvAY72DHeAbvXe+DHehF3kGO8gbvHeBF3oG713gG713vgx3oMd5BjvAi7wGO9A3eu8BjvMDd470Iu9wN3jvQY7wGO9wN3jvIRd4Bu9d6Bu9d6DHeAbvHewi7yEXecGO9BjvQN3rvIG7zykGO9A3eO9CLvYMd6EXegx3gG7x3kDd470Dd472DHewY7yDHeAKomwmhZFkAof8tCy4m5aCbcTUswFYsy0/LQTX9NBqBgJgYaY//PkZPcaTdCuAFgWlkI0DfQAe9r8Jxz6CShr8++JsArgjxNBNC0LQsyyLMsgRxallyyLIsi0LUTUtS0AVwFPia8si0LMTXiacsxNizLMTYTcsi1LMsy0E2LUsuJqJvxNyy/E1LMteWgm4mpZlkJuWRZFmWnLQTfgncVATkVcVQTsVIqQToVxWFeK4rwTmATCsCcAnQJyKoriqKwrxWiqKoqwToVRWBORWBOBVFSKgq4qAnAqAnArRVgnIJ3FYVQAgCriqK4qYqivBOsVoJwKgJ3FYVBWFfBOIqCoCcivipxUFSCd4qRV4rCvFaCc/BOhW8VxWFUVhX4r1eX/+DHgaYMOEX/CJgwwYQY8GODH/wYf4RAiQiAxCKBj4GAMYRQiwYcGEGMIoMfhECIBgEXAwCJhEA1BjhF+BhCIDEGARYGoRAYgxCLwYeESEUGMDEIoGAMAiAwBiBrCJ8GMGGEWEUGIRYMAYAxCKBiBgBqDDA1wiBEBiDAIsGIMANANMIoMAYhEBh4GMGMGARfAxBj8GAMANYRAYBFAwCIBhgYhEwNQMYGIRAMAiwNYRQi4RQYwYgahEBiBqBgESEUIqa6Z6bTBpGkmUwmkwaZpJlNCkifmkaaaBymgm0wmRPxSDTTa//PkZOYYTgboZUAQIkCEFgAAe898YTZpJtMJhNilphNdMJhMGgmemDSNJNmkaX6aNJN9MJhMc0E2mzSNJMpg0umU2mDS5oJlNJtNJnpg0DSTBoml0wmzTE8TRpGgm00mkzzRNNMJg0jQTSb/NFNdNGl02KTzRTfTPTSbTKZNLphNJpNmgmUymkwaaaTKZ/TSYTBoJr/ifptMpr9MJlNptMpg0kymumEwmf+mEwmOmkymTT5ppv80eaHTCYTHTSaNBNJtN80/0yaBoJo0k2aPTPNA0OaSaTJoplMJv9MgBAB4MBUGwbwVwUBkFAYDAU4NBoMBqhAELk//h/y1/vz6/6zMnEglwqnIsVSHBzAMMIqXiLgxS8ucoLCKl7VwipeupwYpeAxS8Z22hSl4U+qE1L2goKUva1GUJqXqwkpeAxS81IQpS8smBqXql6E1LyEVLxdEJqXoSUvAmpeJhFS8rpH3CKl6EVLxPWFKXgDUvVL1LCal4kuDFL2EVLxFlPClLyEVL2FKXhdwYpeswGpeqXkGKXqLAxS8wYpeqWk8KUvATUvQYpehJS9Bil6yoUpegipeZT2x1vN5NR2X3KrRuXjFmaS0AUCyE1BHflmWZacTYsvy05ZgAIs+WQCqJoWZ//PkZOwZ+gaYBgbm6EQMAfQAe9r8ZCbiaFkWv5ZibialoArlryyDtCSnyfR8hrE7PpNmiaIxDTGKafTJalqJoJoWQm4mnLUtSzE1LUsxNyy4mpZlqJpy14mgD8WpagKvLIEcJuWnLItBNhNhNxNgH8tSyLMTflmA/iaCaFqJqWf4mxZFmCdCvFWKwqivgnQJzFfwToAIwqgnOKgqCoK4J2KwqisKwJwKwqCqKgJwK4rYqirgnIJ2K8VhVwTmKorYrioK4JwKwrRWFQE5FUE6BOwTgV4qYqiuCdAnYqAnMVBVFUVATkVBVirioKoqCviuK8VwTjxWFfivFUVxXBOcVuKvFaKoqiuCdeEW3Bjb/gxvhFvCLYGN8GNwi3CLf8DbtuEW//CM7+DG+EW+DG8DbNgi3CLfA2zYItwY3gbZuDG8GT/Bk+DJ+DJ/hGdCM+EZwMnQZP8GT8GToRngc6dBk4IzwZOBk8GTvhGdBk+DG8Dbt8DbtgY2CLbBjYGNwi2A2zYDbN4RbhFtA2zcDbNwNu3CLaEW4RbeEW2DG8DbNwY3BjYDbNgY3A2zYItwi3CLbgbdvA27YGN/CLaDG4RbgxsDG4Rb8ItsI7oR3cGb00m0wmTT6aTZoJgUpMc0kwaa//PkZNcYqeLUAAAUHjw8DgQAe88cYTXTXNBpXiQdfLVpLJoaCSJs0TQNAbRpJpDWleaGlDmlfQ9fQ7tBZoa0IeOw3Ccq44TcHgrufDVzQNA0Om0wmDTNE0EymkymumU2mU0aSY6ZE8NFMmiaaYNDptMGn+aJpdNptNps0OmU0J50wNtMGmmEz/zQTJpppNplMJlM9M8FAYCoKAAApgqDIMACwAQbBsAMGQAQaCkGg0GgyCkGeCgNABwAAUgrwA+CoAQNAeHCAOAeAyIQHBwgDg4QYDAGgMEEOEAeA0Q4DxAHh0PEMGYMBsFQYDPgoDMGQV4NBqryAZfhGfwjMDl4Rv/wjcGT/4R/CPBH//hH4H3gzv4M7A+/gzoR4GdBnAf+DPBnwj4M7BnwivA1QIpCKcIpgaqDFgaqBogMWBqgGqgxQinA0XBi8IqEUCKBFcD7/CPwj0I+DPA/8GfBnQZ8I+EeCPwZ4R6EfhGcI0GSDIDJCNCMBkgdsIwGQDkBk4HIEZgy4RoHZwZQjcDtCMgcoRgRoRgHKDJBl4RgHIDKDIEYEaEZgyYMoRsIwGQGQIwGUGUI3A5AZMI2EaDLBlwjQZQjAjAZQoqIqqN+pypx/qNIqoqqNKNKcqchwGrCAPqN//PkZOsaCgjiBUZRnkhEBfAgw9tw+iu1RUqp2qNUNalOVG1GkV/U58sLU48sLLCiwFU4hAYA+qQQgasVhVIYQNWKwmAKpvasNoHIDm4OQHIDlGwNgbH4D+JuWQm4mhZFoJsWgm4I4TcbA2xtA5ODnGyNoHJ+NgHKDl/LMBXLUtS04mvLQteAqCaCbFoWQmha8bQ2Acg2ht8bI2RsjaGyNrjYGwNvjbByja/GxFYE4ipBOIrwTiK4J2KuK8BAK4rAnAJwKkE4FYE7FUVgEIqgIRVBO4qRXFQVBVBOMVwCcE5itBOoqAnQqCpBOIrxVBOoJ0KwJxgnQrCuKsVBXioCcCqCdAnYJyKsVYqipBOgjwiAj/8InhH4RMIkIioAC4RiJCMRP////CNk//Blkv4M6F8I9C/8GWT/8I2SwjZOEbJQZZIGWShGyYMsnwj0P///CPQ/hGyQRsn8I2SCNkgOyVkoMsnhGyQMslCNkoMsl4MsnhGyXCNk4MsmEbJ/wZZP8I2SA7JWTgyyQMiKDIieEYiAcRIihGIkIxFwZEUIxEA4iREgcRYihGIoHESIkDiJEUIxFwjEQIxEwZEWDIihGIoRiKEYiHcYJRIr9kzDmO5cIaApXE/NA0TTTKZGym/0//PkZMQWjdCsAwAWCsQ8Cfwoe89cyaXTKZACgKxsmybQFQCyPQPUbRtA9x6QAoegHKmRtClpk0RSkwaCYE/GyaaZ6ZFJTaaTCbTabTBomgmk2mxS0x0waSaTI2gcgOcT0T5MiedM9M9NCfCeGgNhMJlNJoT1MdNJhMjaNPptNGkmhtpnmgmv+KQmRSE0aaY6ZTKZTRoJg0U0aBopg0emU1/xPzTTaa5o80DRTZoJs0TRNEUhMikJs0P0x0wmkwmUymkwaKb5pppNJg0OaInhpGgmeaSbTBp9N/ptNJo0DTNAbOCkGAwGABgA4NgwAAAMAPBgAQKAyDAZgoCkFINAABWAEDAUBTAABgMBTgqACDcGAAQYDAUqLUlVt///+Bj4MIRcGH/hE//hEwY/wi8GPBj8GH8IgRcIv4RYMQi+DAIsIsIn8GHCLCJCJ/BhBgBpgwwifhFhEhF/gwCIDAGIMIMAMQYBFhFBgDH4GAMQiQNAYAwwYBECIAMIAMAAiHBgAMIAiAIg4MABgABhADAhEAGAARCBhCEQhEIMABh6EQAwIMABgCEQwMAQYD4MDCIcGACIQiHwYGDAhEOEQ4MAENB8hJD7PsnXJ0fZ98+D6LItQR3PgnZHmgPYYRopk0xj//PkZMkU/gLsKkITrkL0CfzIetvgJtNdNGkmkwCPLITf8s+WpaFmApAjgFUsyz49jSTCaGMmkyaRZlkJsWpaiagKBZlmWomh8c+CdcnROj4Pk+Akh9E6DsJ0fJ8c+OTs+idk4J2Tg+j7Pr8nB9nwfAa59k7598+D74Sk+eEkFQdDmKsOhwBEVYCeAiAmAiHcBEV4CYCIWmCHF6FqC0haRcF4XYvxfF2LwvC+FqC0xcC0C/FwLSFoF0XBfi7C0xei8LwvcLQLoWoXheC0BaIWoXBdiNiMY6cZ8RkZxnjqOojAz4zx0HUdBGozjoMw6iMjpxdi+L4uC5F/xd/haIui/bZ/+DGBp4RYMQYgw8Ivgw/CJ4RfBh/hECKBgEUGODH8InhFwY4GoMcIgRIMcInCIBrBhCIESESBp+DEGARfhEA1gxBjBj4RAYQYgxgYwiYRcIgMAiAwBjCJgYAawYYRQMQMAYhFgagYhEA0AxA1A1CJBhBgEXwMQNAihFhFAxwYAwgaYMPCJA1hEBiBrwYQiwYwiBFwYhFgxgawihFCLA0gYAwCKESBoBpCJ4MIRcGOEVB9ALR8BJj7/PonB9HyEoJwfZ9E4Dt5OeTnlqJtxNAH7nwfHPonJ8E759E6PoJI//PkZOAWKgjoZUAQYka0Ffgge9VcfZOCdE7J0To+Cc8JWTo+D7J0EqPoO0+T5PsJSfJ9n0TkJUfJOeTknPPo+z6J2Ts+ycE759/k7Pg+z5J2TonBOeTkJUTg+T5DtJ0Tvk5Pjk5DXPg+idH2HYfR9E6PgnR9k5JyfZ9cnR9cNYJSfROidE6Ps+Cdn0fB8E6DtPs+CdHwfH5OAlR8nyfB98+SdE4J0ff5OidH2TknfPkJMfYSg+Cd8+D6PsnP/JwTk++fYSQO0+D5J0fZ8HwTjn2AWDgdAL8ApALQCkO8GACwMgyAVBiAVhzwY4BeDIMgFMOh0ArDgc4BeAV4cgFsOhz/wP225HGw7wCsO4M8AqHP/+DEGQ7/8OgzgFoM4Bf4MhwO4BT4cDmHcGfDnw78GcVhUFTFXFeKoqYJ3isKuKkVgTsVoqCsKwrCoKsVQTqKorYWoXhfxeF/xdi58XOL4WmLnFYVQToE4FXiuK0VwTnFQVRVFcVhU4JzFfDgdhzBnDuHfALgyDAMQZBgGQCgBUAoDAMh3BkAsDMGcGAYgxBn+HAC0ArwCwMAS5adAry0yBSBfoFBVaKqKwVUVrRXUa9FUOEqVUjV3ySPLkvkzlNlNn02E2S06pvVKWACECpW//PkZN8VDgj+zymq5krb1ewAxJvkqe1XysDVFSqlVIo2o0ispyFVoqKNIrKcqNKcKcFhSjaKiKyKhYWiv6nCnCKijajSnPorKNKcKcqcIrqNoqKNqcKNoqKNKNqNKcIqKN//orf6BSbKbKBSBXlp0CvQKTYTZ/0C/LTxFxFoigioigCLC4cRYRWItEXC4cRcI0IoFwwXCiKwjQXC8LhRFcRcRQRSFwoikRcLhxFRFguHiKRF8E7FYVhVBOgCYVRUACKKgqgE0E6ACJFYVoJ0CcgnQrAnMVwTgE6ioKoRwDdhHhG4RARgDcCMEaEYIiAbwRIRuESEcIwRwiYRwjQjBEgWoFuBa4FngWkIQQigwhEwigx/CL/4RfCKEQGP/wYiEUwYHwYGDAwYAGA4RCEQBEGB0rCNcGU4RrBlcIsGGDCESBiEWDCBhCIEWBiDAGHCKEUGEGEGMIgMAiwigxCIDADQGIRfCIEQDXgYYRfBgBoESEXwY/CJCKEQIsGIRODEGIRQYgw8IgRYMMGAGGDEDGDAIoMcDQIkGMGGBrgwCKDAIsIkDUDWDGDDA1hE4RQMQYgwBhhFBhBh4MAMYRMIoRAiAxBjhF4mhZFpxNBNy0LQTUTXhKglR9FqWpaAP5Zi//PkZNYXkgTkGEJwlkXcDfQAe9r8bCa/k5JwTriacsizBHE6CSH1w7efHLPgjuJqWnLITYTX8tRNAH/ialqJuJuWZaFkCO4m5aE7J2TonB8E559nyEnJyfB8FmJrxNxNhNS1E3LT8sxNC0E0LTlqJuWQm3E15ZiaFqWRZiaCagP5aCblkKoqCsCdioKoqwToE6FcVwAhRWBOIrCpFbgnEVRVFUVIJ2K4rAnIqioKgrcV4riuK0E4FcVQTsVxUBOoJ3FUE7itFYE7FYVRXFUVwTkVoqAnYJxBO4rReF4XYWsLWLoui4LwuC9AdsLQL0LQA9C8Lgvi6LguBahfFwXAtIvQQ4vCqKwrxX/8E5xXit4JwKzBnwj+DF+F1guvBiQYkDRIR8I/gz8Gd4R/wYsGLBi8I8DPBneDPBnwZ/8I8DP8I8B/0Gd+DPA+8I/+Ef+DOgzvwj4R/hHoM+Ee4M4D74M+Ef/A/7gfcDPBn4R7BnfCPgz4M7Bngf8DPwjwR6B/3CPwj0Gfgz+EfBnhH8GfwioRQGIBqgRUDVAYoGiBFcIoBqoMWEUA1UDRYRUIqEUA1WBooGiAaqBogRUGJwigM8I/gz+DOCPwj/Bnwj3BnBHgZ4M4I+DOhHhNCz5aiaCb//PkZM0YugrgAAASBEUEBfQAe9rclmWompZ8shNyzLMsy1LMBUAfhNxNicBJCcE5J0JpyyLMTcBVLXloCO5aCagKACiAqflqWYmvE3E3BHlmArFnxNRNC1LUBS5aFoWhZFmWR8k5CTnxz4PonZ8E5Pg+j4LUshNQH4TYtSzLMshNBNhNSyAViyE0FQE4FYVoJ0CcRUgnYqisKoJxFWAhiuKgrCtFUE7FQE5iqKgqRVFWKorwTsVxVFYE7FTFTBOxVgnAqRXBOPisK4BOK0VoriuK0E5BOxUivFcE5FYE5FQVBXFQE6FQVBVFYVxWioCcCoLovi4LoWiL0LSL+LouBaIvBahdi6LoWgEMFoC1hacXxdC14uipiqKn8VPFbiqKsVb//Bm/+EXgx4RdhFb///hE1/8GLP//CKwIrQjoGa/wPewZqEdYM1wZqDNAetgzWEd8GagzYM2DN4M1wjoI7Bm+DNhHcD3rA9awZuEdwZvCOwjsGaA964M1A978I7hHQR0DNge98I6hHYR1wZrBmwPWgPWwZsI7wjqB63COvgzQR3BmwZsGaget8D3rCOgZoGa4R1gzYM0EdwZsI6CO+DN4R1wZsD3oGaBmwjqEdAzXCO/4R0DNAzYR0WgI8TQT//PkZL4XFgTcAE6Tekf8EfQAe9t8YTXiagKwCsJuWXLMTUtC1LMTT8TYTUJP+fAdomomoD8JuWoCgWoI7iaFkJqJqfZ8hrk4CSE5Pk+Cdk5PgnBOT7JwTg+uWZaiaCbcsgFAsy0LPlmJsWYmom5ZFmWpaibiaAjy15ZFkWQm5Zll+JsJqJvy1E0CThJz65OQlJ8H2TknZOT759k6J3z4PgTQTcsy0LITflmWfLUsiyLITYTcTT8syzLQsi0LMEcWZa8tSyE1LTibibFqWYI/8shNCyE1LQsy1LUTUBTLLloWXLUsiyLUtBN+JqJvy1E05Z8TcsxNeWn/LTnxydHwfZ9n1ydk4PsnHJyfR9E4JwTgnB8k4588nB9cnR8c+D7PjxV4q4r8VsVgTgE4/itFShX/xV4rirxVFWKoq4qfxX8E6xVxUBOYrCtwTvwTj/xV8E5/irBOsVuKwqRXFTFQVorCrFf/xWioKwrCtioCcxUFUVAToE4FUVxWFQVhUBO4rgnUVIJyKkVgToE4ipFUVoq4qisKsE64qCoCdxUFUVxXFUE78VxWFQV4qiuKgqiuK4CCK2KoqirBOATsE4FWK4qxVFUVhVFYE4gnIriuCcQTiK4rCoCdCtirBORUiqK2//PkZLAWsgzuADQNNkZj/fjIe9r8K/FXFUVwSE5aiaAKgmhaFpxNQkp8n3z5PsJOGsffLQsyyE1LItS1E1Af+CPLMTUTfibFmJoWQmxanzydHwTsnASknBaCalqWom5ZcsxNyc8nASsnHDt59BrhJgkpOicBKg7D7JyfZ8E5Pk+Cd8EeWXE0LQsiyLQtSyLIsi0LUTYsy0E3LITQshNiyLUsiy4I78shNy0LMVcE6ipgnArRVgncE4wTsVIrCqCcCtBOYrwTgE7iuKwqCoKwrcE7BOQTqKgqiqFpBEC1gPYD3F0X4WoLTF0Xxei6FqC0BaAtQWgXxdwtWFqC0haBW/FQVRUBOBUFcE6ioCcAnEVRX4rYrxWFUVBViuLsXgtAuC6FoBDBaYvi7F8XxexdF8XhcFyI//gx//CJBhgxhEwY/+EXwYgx8ImDH8GPhE8GPhEwigwhFwNQNQNfhE+DGDAGHCIBrhEhEBh4RQMAY/gYBFBhhEAxCIDCEUDEDHBiEUIoRQY+DCBp4McGEIgGgMcGIGMGIGIGgRQYgxCKBiBjBgDGESDADWBgEUDEIuDADWBpBiEUDEDDgYgwBgDEDQDUGIGgRAYQYAxCKBhCKEThEBgBiEUGIRQMQiQiwNAY//PkZKwWNgjoZUAQREakFfQAe9t8YMfwi4GBaFoJsWpaFlyyBHctCzE25ZiaFoAocsy1E24Sk+idk6LMTYTYTQsyyLUtCyLQTUswFYJMGuTg+CdHwErPotAFAsuJtxNCz4m4mvBHiafloWZZ8YppBqzTNI0jTNBMpg0jTTZZFqWfE3Af/xNf+WomhZ8suWZZCb8tC1LQtS14m/LQtBNhNOfR8hKCc8nHJ2EqCUE5CSHxydk6Pg+D7Ps+Sdk6LUTQTcTcTctSz4mwmha8TXlmJvyy5ZiaFl+WpZFoWZa8TQshNCz4mhalmJsWfLQsuWRactBNRNC1E1LLlly0E2PgJWfR8h2H2fJOSdnx+fXPs+T5PgNbnzz6Po+T7JwTk+z4PonROglJ84qCvxXxUirFX4q4qeCd1f8InCI/4R/CP//4RMI/CMEYI4RAR8I8IjCJ4REI/gG8ESEfCOERCP4R/+EaERCPCNCNCI4BvQjYRMHINobIOfjZBzDZG3xtja42gcw2PwcvG2Nng5+NgbY2wcn42htDYGwNrjYGwNsbX42vxscbI2gc3Bzg5Qcg2uNvjaGwNgbI2+Dl4OUbI2Qc42RsjbBy//g5eAboR4RwjQDeCP+EcI8IwBuwjwjBEBEA//PkZKoZMgrqADXt9EV8FfQAe9scG+EThEBGCMESESEbhEQjwjwjwjBHCIwiQDcCNCI/hHE0/LQBSLITf/lqWoSvk7LT8BWLMtRNAk58E7Po+CyLQTcsyyLUsi0Afi1LUTUTUtBNS05aFkWpZHzwkoSgnB9HwfQSsTYsizLQtRNRNgFf/8NcJWEmAWCdn0To+T4CUHyGtxNiyLT/lmJqJqJqWgmpZFqJsWgmwmwmwmv5ZiaibiactBNv/yyLTiaFkWZagKgCmJqWQmgmom3E0LTibAKfE0LLiuKgrYqipBO4JzFUE5BORXBOhVioKwqRWBOYJyKkE6BOIrYqCqCcxVxVFUV8E4FSCdcVgAgCuKkLTBDC6CHi+LwuRfha4uC+FpF8XQtAWgB2wtAWoXBchaBfwtQWnFSCdxVxXFUVhUFYV4rgnOK3wTiKir//1eDCsf//7/+wOYd///ei/f6lmiqGXpyOlCSRm+yP3UtDhFIzqBhwCFHAGFHABYGcAnAAMOAAYcAAw4BYKOAIROANgicAQYcABE4AAzgE4B+1wmcAwYcAK+sDOADgFLCJwAlWBnABwABnABwDWraETgEDOADgDBiRkgoJpGaP+64RSMoRSMGBiRkkwMSMlq7AxIy4//PkZJUYEgieBFw3fkL8FgAied8AROAAicA8DOATgAGHAAROAFwM4BOAGBhwADDgAGHANQUcAgicAYROAfgw4AIkbPNNNpo0TSNBNJgUs0l7lomEwmRSOaRp80zQFK4nvTInnTEGgwGwAwYmOmkyaInppJpMJg0k1+KUaaaTCb42U0mBsGiaSaNNNpo0OaKZNE0jTTSY5oGmaZpJrphM9MGkmDQTCZBzpg0OKR+mBtdMJobfTSbTfG2KSaBpGgaZomiaBomn02mOmkwmjSNPpjmmaKZNA0zSNFNCeClJkT40DTTCY5oJk0kyaJpdMppMdMdN80TR6ZTXTfNJNmimumem+aKZTKaTaaTRops0kwaZppk0+aSa6ZTKYTfTfTPTHTKa5omgmEyaJo9NmkaRp/pnmmaf6aNNMplMplMdMpv8TxMJlNplNJn9MdM1OM6hWa/EjiRiRiO/xIcSP+GgCZQ1+GvDRDV//4aP///4I8EwTwTBLwS/4AHgnBHBHgiwR4JgAgS4IwAYPA8ADg+AAAAFwfB4L4WADC2AGAGFwsFwuD2FgAcAPC+F/B8L4X/B7B4L4WwuD+AGDwXACAAC2D2AEFgfCwAAAAXB8LhcLeDwXCwPYPA+ACACD+AH4XwA//PkZJMVIgb2ejVLxkBMEgTIe898vwv4X/ACB/C4WwtgBg/gA4PA9gBeFhLRTXTRomkmP0yJ6J+mPy0NA0OvibNDQmfzTNNMjaFKNATxMiemiaRoGkmE2mkwmTRTHNBMGiaCZTSZTZomh0PaV9fX2hoX14kzSmOaCY5pJr80U0aPTfNFMps0jSNJMmiaSaTKb6aTKYNLphMpg0eaJoGkJ8aBoppMppMJg00xzTTabNFNJpNJpNpnpg0DT6bTRoppoJMWrSh/690NQ5paV5D2le/LND2hoQxDF/rzR1/r/aWhfaWleQxfXmheaevNDS0tLQ0ryGoch/X15D+vLy+0oc0ry/19DUOXuvIc0oav9oXkNX1/r3X18QCGHQGQHB8PiAPAaHgPDsBgcH+Hqv//+DJ0GNuEW4MbQY2wZO4Rn///4R34R3Qjv//8Gbv//8GbgZuwZvCO4GbsD37+Ed3A586DJ4Rn8DnToRn8GTsGT8GToRn4HOngyf4HOnBGeDJ0IzgjOCM8DnTwjOgydwOdP4RnYMncDbtwY2A27cItgNs3CLeDGwMbwY3CLaEWwRbQi3A27eDG0GN4G2bBFvA2zcItgY3A27YGN4G2bAxtA58/gc6eDJwHOnAyfCM7A588//PkZLMYngTSAFAUhEYcDfggw9V8DnzwOdOBk8IzuEZ4MnAyfgychsy7F3oE13Nl9sy7myrsL6qqOU5anCqkHqNDI3KVUTEU8GNU7U6gxyHKchyVV/Xa2Zspfds3rubK2VsjZmztk9djZi/TZV2NnXYu0vsm0yaBoDZNEbA2k0aKZNjmwbH/Nvm2bRtGyBVArD1G0bQPUevg9h6/+PRzZNkCrzZNgesegesermyPQPXzbHpNvm0PQPUPSbJs82TaHqAtj082h6DaNn8eo2DbHrHpNjj1m1zYHqNo2jYNnmwbPNgek2ja5sj0D1m0bJs80xtJlMdMCeps0U0meaaa6b5p/mmmU3zRTfNFN/pgHPzQNPmkaaaTXTKbTRoJk0zS6b/NBNdNJlNGj02aH6Z4IgAEEYJ4I+CMEQJcEUEXBOpHDX/w1Q0Q1Q1cNWGvw0Q0/hp/AmIaA0cCYhow0w1/w0hoDRhpw1w1BrgTLDXw1BrhrDQGgNQEzAmOGuGiGgNfgTHDQGoCZw1w0BrDWBMIEzDVDTDUGgNfAFwGjBrg1A1YNcGsAXAaQaABcBqg1g1QagaINYaoEyw1Bow1YaA1hoDSBMw1gTICYQJkGrDQGoNGGmGsNcNQawJkGuBM4aIa//PkZKAYngTsATQNQkKMFgDifh7AYagJkGsCZ+GkNWGiGsNAaYaOGgCYgTENQaw0Yaw1Q1Q0/hqw1BkAfmkaCb6ZTCY6bNBNLwmqGA5fzSTCb/lgwXOmMmMmTQ5pmkmUwmkymfzRTaZFJ6aNM002NrppMpg0kwKQmE2m0yKUaKaE95o9MJj9N9NJk0UymOaSaE/TabNNNmmmk2mU2aHTKZTCaNDjaTJoGimkyNvpk0TRTHTf6bTRopg001+mU0aXNBMjYNA0k2mjR5pfps0U100mUz0ym02mDRTHTaaTRpplMc0kz0ySA000mDSTKbNI002mzQTHTaYTf//NA0zQTBodNJk0UyKSaaZNJMprmkaP5oGmKUmEymUyaCbTHNBMJlN80DRNBMmkm/00mUwaZpprplNpvmiaJo80+aSa//TaY/6ZaH//wY4ReEX4RIMfwiAxBh/BhCJ/+ESDDwYcIn+EQIoMAiQYAw8IsGIGGETBj4MP4MQiAxhEAwAxAxBjBiEUIgMIMcDCDAGIMcGMDEGGBgEUDTwNfAx4MAiwiQYgwBgEUIgMIRAiQYhFwYAwBhA1CKDEIoGoGgMQi4MeDADGEQIkIgGMDCDAIoMAiQiAYwYYMQNQigwCJBiDEGAR//PkZJwV+gzoZUAQRkZsCfQAe9tcQYgx8GEGIMQiwMAY4MANAMcIoMSyE1E1/LMTUtCz5OD5PkJJz5Pk+uA/FqWRaib8TUTUTQtC05alqWYm4momgI8TYsxNCzE3LUtQFEsgFM+z6J0fB8nz+TsNcnB9BK+Tk+g7CdhJT6LTiaFqWYI7lqWoCvy05ZlnxNy0/LUshNBNvwR4moCj+Wv5ZlkJqWpalkCOE1E1LQsiyLITUBULLlqWZZlmJsWhZcsi1/4CiWpalkJqJuWvLXlkJsJpyy4mwm5ZlmJuWXLUTQteWgmgmwCsJoWfE3LMsiyLP8TTlkJuAolqJryzE1LTibCbloJuWhZFoWYmxZ8TcXIvxeC0i+FrF0B2i4L8LSL4uBaIDyCHF8XRfF6FqgiwtIuYWoXIrYqAncVvxVip8VIqCvUxPqtFbFf/4q/8V/8V/iririr8VATjxXipxWgnYq+KwqfFTFQVoq+KsVBW8VhUisKuK0VRXivFYE4FTBOhVFcVRV4riuCdCuCdCtwTiCcCqCcgnYqxWFcVIJwKsVxWisK8VxVgnArYqRWFeK0V4qgnQrgnYrfBOoqAnAq4J0CciqKviuK3BOoJyKsE4FUVoqisK2KwrAnArgBAFSK4//PkZJ0VagjyJgGtbkOkFfwAbh4AqRViuK4J0KgrCrFUVxVjOEeDQgjlcT4T40xtjaNI0uaI2QciGNJIl4kJZtCGIaSckIm6GL3TQ2zRTY2UwmjSNE0fxS02aY2BsJs0/+mzSE8TQpHTKZTaaG0aQpApZp/mmm+aHTfTCZGwNgUk0E0aRp/ilJlNJgT5MmkJ9zQNA0TQTH6ZG2mk0mk0mk3zQTKY/G3zQTHTabTBpGgmU0aKaTJpJpNJtMphNjYTfNE0emkymE2mEyaCbNBNfmkaJpdNJnpg0k0mDTTCbTaZTBp80k2aCbTfNE00yaCb6bTZoplMmmaKZTKaTJpmiaHTXNJNdMDbTab6Y6Z6ZNNMJhMJhN9NJrmim02m0ymU300aPTSa6Y//5pJpNdN/9NppxWxU4Jx/xWxU/xU4qcV/ipiuKwqxWFbioK/8VIqivFTwTkVgTkVor4JxFXxX8VcVxUFQE4FaCcwTvBOIqwToVuKwqCtFUVYqxXxWFeK0E7FQVYrwTnwTsV4rCqCcfFaCcRVFQE5gnAr4JyK4r4Jz4J0Koqip4rCvisKoJ3xWBOME7iuKgriuKgrAnAqgnArxXiqCcgnYJzFQVQTmAEIVYrwToAIYrwTiKkVQTkE5//PkZK4XGgzsADQNAkIcCfwAe898FXFTFYVxXxUFQVkzzS5oilg5TTTY2kyaJpJtNGgJ8aKaTQ2k2aCaNI0eaSYNJM/tKHEiQxfJG09MmgaSYTRppg0TRNNMJlMptMCfppNprmiaA2jQNLmmaRppk0jRFLNP9NJhMGmaQpZpJhNCkGkmE0J+mxSk0m0x02mjRTKbTCZ42EwaQpJpptNprmgaRpmim00J4mzSNM0kymkyKWmE0muaKYGwNjmgafTPNE0U0mUwJ7+mem01+J8mhSk2mjRTSb6aTCbNBM9MpjpjppMpk0E2mE2mE2mjSTfTaZ6YNFMcT1MpnprptNmim0wmE100aSaTRo9MGjzTTHTaaTfTSaNLpoFMAAFYNBQGwAvwAYM4NgqqkjaAN3d3d3etERNK5CZ/3Ctf8AaiAc/u7vaIn/+8XPv//+GDKv8W1/+AC8K4Yw+94xe940jgceOBwOcRaxGwH4EuNIjBfxazB8HhkwVjIAII/vDkjG/wAcJPeF5e98hNgSYLWMFvhZ73pX06aoehpmh01hMJtM9K3TKY9E10x+memvlIpZM9MUTCbShbUrtM+n5ophNZuXK+0wmemumMCemkmvc0Uwm/lJJlLe5oJZI0SyW6R0mE//PkZLcXlgrzECFvrEmMEfgAfh7k2aORpbTYUo9SBNsekGYNVKgqg6hrUXK4Q42DOwPWbILEzBSumEgkWJPU8S72G5wUuGDwguEKa1Q0UykS3Bn7FJNgg5qoEgpsGabBtGabZt7NrKCNgLYes1idmabBtm2bZsBRm0PQbF9mwPSPUBbMwzB6QojYM42ePTzbMwzR6TaNs1eBVNv81yDUJ2QYhJtD0m0PVe+x6T2M8HsbFwsh6B6D7HpugT2uZhO6HqZhmE7ISZhhkFNcghtmybBnnsD1Ho49ZtG2bZs5PVBc2EEepCaEHNjj1EJHq5smabZtmwbNEEPR+bJse9z2PY2T1SN0rdNJq6yXI06COvNJj9MGmkkGmUj7pI0TToNGlEsNEnCW10ymi5FtNFKpvps0kz0uW3aaTF00mTSzdNJu0KFYz1KjaGAhyoQCFGM//zFARgIUZ/oZpdCttay6M5drW1joSj6Ekk1b7J7R7aoQNlPrWBKLTTzOsGT5yYxLrtHTy2iUxEkES0HIBVD066VjGj31odPkkSjJtbWs6OIjKmlXHR9K5MTv5pdZolE10kk2lly74TFx5KTXeTGLrS6ExiucvJSSDUdXZm3NLn1rtYBCUEoRj77WOhCPc+g5//PkZJ8XPgzoAABMTrz8BfQyY9ONGxJULutaa1TE5LHxWEo+XecmMa3p0kqBCR6qOFaFUGpNJIIjqVi0ylBqJIkiSJIkmJj605EkSRJPetWAyVacmodBUVhGfrAZPF0AUrgRLNiqDU4VHo8h6HRObJJNdqlRBMFT0qdNE0WZhmay2tCuOY6oieWieianCnVSbzjd7SGhrLi6eUSeLcZTWqdML5PM50uOGJms9VqtYU6hrgrm4V0frUzTvYsiegR2FOkqUxSKdVCpmRCSkIAUZ4VPhqEKgFDU2VhUiIhUaIg0RAkTBYEjYBUbBMuCJgLAkCUBUinABgBE3/9EQqFRM0s0qzktk9ZFqqFC6RULE11JVDkd8Y1vVFOx9oUIpZ8Vnq5klkxBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq";
var I = (A)=>A instanceof Date, Y = (A)=>null == A;
const D = (A)=>"object" == typeof A;
var F = (A)=>!Y(A) && !Array.isArray(A) && D(A) && !I(A), T = (A)=>Y(A) || !D(A);
function m(A, o) {
    if (T(A) || T(o)) return A === o;
    if (I(A) && I(o)) return A.getTime() === o.getTime();
    const e = Object.keys(A), g = Object.keys(o);
    if (e.length !== g.length) return !1;
    for (const t of e){
        const e = A[t];
        if (!g.includes(t)) return !1;
        if ("ref" !== t) {
            const A = o[t];
            if (I(e) && I(A) || F(e) && F(A) || Array.isArray(e) && Array.isArray(A) ? !m(e, A) : e !== A) return !1;
        }
    }
    return !0;
}
const V = {
    facingMode: "environment",
    width: {
        min: 640,
        ideal: 720,
        max: 1920
    },
    height: {
        min: 640,
        ideal: 720,
        max: 1080
    }
}, Q = {
    finder: !0,
    torch: !0,
    tracker: void 0,
    onOff: !1,
    zoom: !1
}, R = {
    width: "100%",
    height: "100%",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    aspectRatio: "1/1"
}, d = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    overflow: "hidden"
};
function N(A, o) {
    for (const e of A){
        const [A, ...g] = e.cornerPoints;
        o.lineWidth = 2, o.strokeStyle = "yellow", o.beginPath(), o.moveTo(A.x, A.y);
        for (const { x: A, y: e } of g)o.lineTo(A, e);
        o.lineTo(A.x, A.y), o.closePath(), o.stroke();
    }
}
function f(A, o) {
    for (const e of A){
        const { boundingBox: { x: A, y: g, width: t, height: i } } = e;
        o.lineWidth = 2, o.strokeStyle = "yellow", o.strokeRect(A, g, t, i);
    }
}
function u(A, o) {
    A.forEach((A)=>{
        const { boundingBox: e, rawValue: g } = A, t = e.x + e.width / 2, i = e.y + e.height / 2, w = Math.max(12, 50 * e.width / o.canvas.width), n = w;
        let a;
        o.font = `${w}px sans-serif`, o.textAlign = "left";
        try {
            a = JSON.stringify(JSON.parse(g), null, 2);
        } catch (A) {
            a = g;
        }
        const B = a.split("\n"), r = Math.max(...B.map((A)=>o.measureText(A).width)), s = B.length * n, C = t - r / 2 - 10, E = i - s / 2 - 10, c = r + 20, h = s + 10;
        o.beginPath(), o.moveTo(C + 8, E), o.lineTo(C + c - 8, E), o.quadraticCurveTo(C + c, E, C + c, E + 8), o.lineTo(C + c, E + h - 8), o.quadraticCurveTo(C + c, E + h, C + c - 8, E + h), o.lineTo(C + 8, E + h), o.quadraticCurveTo(C, E + h, C, E + h - 8), o.lineTo(C, E + 8), o.quadraticCurveTo(C, E, C + 8, E), o.closePath(), o.fillStyle = "rgba(255, 255, 0, 0.9)", o.fill(), B.forEach((A, e)=>{
            const g = i + e * n - (B.length - 1) * n / 2;
            let w = t - r / 2, a = 0;
            const s = [
                ...A.matchAll(/"([^"]+)":/g)
            ], C = [
                ...A.matchAll(/:\s*("[^"]*"|\d+|true|false|null)/g)
            ];
            s.forEach((e, t)=>{
                var i, n;
                const B = e[0].replace(":", ""), r = A.substring(a, e.index);
                if (o.fillStyle = "black", o.fillText(r, w, g), w += o.measureText(r).width, o.fillStyle = "blue", o.fillText(B, w, g), w += o.measureText(B).width, a = e.index + B.length, o.fillStyle = "black", o.fillText(": ", w, g), w += o.measureText(": ").width, t < C.length) {
                    const e = C[t], B = A.substring(a, e.index);
                    o.fillStyle = "black", o.fillText(B, w, g), w += o.measureText(B).width;
                    const r = null !== (n = null === (i = e[0].match(/:\s*(.*)/)) || void 0 === i ? void 0 : i[1]) && void 0 !== n ? n : "";
                    o.fillStyle = "green", o.fillText(r, w, g), w += o.measureText(r).width, a = e.index + e[0].length;
                }
            }), o.fillStyle = "black";
            const E = A.substring(a);
            o.fillText(E, w, g);
        });
    });
}
function p(A) {
    if (null === A) throw new Error("Canvas should always be defined when component is mounted.");
    const o = A.getContext("2d");
    if (null === o) throw new Error("Canvas 2D context should be non-null");
    o.clearRect(0, 0, A.width, A.height);
}
function k(e) {
    var a;
    const { onScan: B, constraints: r, formats: s = [
        "qr_code"
    ], paused: C = !1, components: E, children: c, styles: h, classNames: q, allowMultiple: l, scanDelay: I, onError: Y, sound: D } = e, F = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null), T = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null), N = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null), f = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            ...V,
            ...r
        }), [
        r
    ]), u = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            ...Q,
            ...E
        }), [
        E
    ]), [k, K] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(!1), [y, L] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(!0), [J, x] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(f), U = function() {
        const A = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(Promise.resolve({
            type: "stop",
            data: {}
        })), e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null), w = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null), [n, a] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({}), [B, r] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({}), s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (A, o)=>{
            var g, t, i;
            if (!window.isSecureContext) throw new Error("camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.");
            if (void 0 === (null === (g = null === navigator || void 0 === navigator ? void 0 : navigator.mediaDevices) || void 0 === g ? void 0 : g.getUserMedia)) throw new Error("this browser has no Stream API support");
            const n = await navigator.mediaDevices.getUserMedia({
                audio: !1,
                video: o
            });
            void 0 !== A.srcObject ? A.srcObject = n : void 0 !== A.mozSrcObject ? A.mozSrcObject = n : window.URL.createObjectURL ? A.src = window.URL.createObjectURL(n) : window.webkitURL ? A.src = window.webkitURL.createObjectURL(n) : A.src = n.id, await Promise.race([
                A.play(),
                new Promise((A)=>setTimeout(A, 3e3)).then(()=>{
                    throw new Error("Loading camera stream timed out after 3 seconds.");
                })
            ]), await new Promise((A)=>setTimeout(A, 500));
            const [B] = n.getVideoTracks();
            return r(B.getSettings()), a(null !== (i = null === (t = null == B ? void 0 : B.getCapabilities) || void 0 === t ? void 0 : t.call(B)) && void 0 !== i ? i : {}), e.current = n, w.current = B, {
                type: "start",
                data: {
                    videoEl: A,
                    stream: n,
                    constraints: o
                }
            };
        }, []), C = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (A, o)=>{
            A.src = "", A.srcObject = null, A.load();
            for (const A of o.getTracks())o.removeTrack(A), A.stop();
            return e.current = null, w.current = null, r({}), {
                type: "stop",
                data: {}
            };
        }, []), E = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (o, { constraints: e, restart: g = !1 })=>{
            if (A.current = A.current.then((A)=>{
                if ("start" === A.type) {
                    const { data: { videoEl: t, stream: i, constraints: w } } = A;
                    return g || o !== t || e !== w ? C(t, i).then(()=>s(o, e)) : A;
                }
                return s(o, e);
            }), "stop" === (await A.current).type) throw new Error("Something went wrong with the camera task queue (start task).");
        }, [
            s,
            C
        ]), c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
            if (A.current = A.current.then((A)=>{
                if ("stop" === A.type) return A;
                const { data: { videoEl: o, stream: e } } = A;
                return C(o, e);
            }), "start" === (await A.current).type) throw new Error("Something went wrong with the camera task queue (stop task).");
        }, [
            C
        ]), h = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (A)=>{
            const o = w.current;
            if (!o) throw new Error("No active video track found.");
            {
                A.advanced && A.advanced[0].zoom && o.getCapabilities().torch && await o.applyConstraints({
                    advanced: [
                        {
                            torch: !1
                        }
                    ]
                }), await o.applyConstraints(A);
                const e = o.getCapabilities(), g = o.getSettings();
                a(e), r(g);
            }
        }, []);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>()=>{
                (async ()=>{
                    await c();
                })();
            }, [
            c
        ]), {
            capabilities: n,
            settings: B,
            startCamera: E,
            stopCamera: c,
            updateConstraints: h
        };
    }(), { startScanning: Z, stopScanning: W } = function(A) {
        const { videoElementRef: o, onScan: e, onFound: w, retryDelay: a = 100, scanDelay: B = 0, formats: r = [], allowMultiple: s = !1, sound: C = !0 } = A, E = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$barcode$2d$detector$2f$dist$2f$es$2f$ponyfill$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BarcodeDetector"]({
            formats: r
        })), c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null), h = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
            E.current = new __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$barcode$2d$detector$2f$dist$2f$es$2f$ponyfill$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BarcodeDetector"]({
                formats: r
            });
        }, [
            r
        ]), (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
            "undefined" != "undefined" && C && (c.current = new Audio("string" == typeof C ? C : G));
        }, [
            C
        ]);
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((A)=>async (g)=>{
                if (null !== o.current && o.current.readyState > 1) {
                    const { lastScan: t, contentBefore: i, lastScanHadContent: n } = A;
                    if (g - t < a) h.current = window.requestAnimationFrame(q(A));
                    else {
                        const t = await E.current.detect(o.current), a = t.some((A)=>!i.includes(A.rawValue)), r = t.length > 0;
                        let l = A.lastOnScan;
                        (a || s && r && g - l >= B) && (C && c.current && c.current.paused && c.current.play().catch((A)=>console.error("Error playing the sound", A)), l = g, e(t)), r && w(t), !r && n && w(t);
                        const M = {
                            lastScan: g,
                            lastOnScan: l,
                            lastScanHadContent: r,
                            contentBefore: a ? t.map((A)=>A.rawValue) : i
                        };
                        h.current = window.requestAnimationFrame(q(M));
                    }
                }
            }, [
            o.current,
            e,
            w,
            a
        ]);
        return {
            startScanning: (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
                const A = performance.now(), o = {
                    lastScan: A,
                    lastOnScan: A,
                    contentBefore: [],
                    lastScanHadContent: !1
                };
                h.current = window.requestAnimationFrame(q(o));
            }, [
                q
            ]),
            stopScanning: (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
                null !== h.current && (window.cancelAnimationFrame(h.current), h.current = null);
            }, [])
        };
    }({
        videoElementRef: F,
        onScan: B,
        onFound: (A)=>(function(A, o, e, g) {
                const t = e;
                if (null == t) throw new Error("onFound handler should only be called when component is mounted. Thus tracking canvas is always defined.");
                const i = o;
                if (null == i) throw new Error("onFound handler should only be called when component is mounted. Thus video element is always defined.");
                if (0 === A.length || void 0 === g) p(t);
                else {
                    const o = i.offsetWidth, e = i.offsetHeight, w = i.videoWidth, n = i.videoHeight, a = Math.max(o / w, e / n), B = w * a, r = n * a, s = B / w, C = r / n, E = (o - B) / 2, c = (e - r) / 2, h = ({ x: A, y: o })=>({
                            x: Math.floor(A * s),
                            y: Math.floor(o * C)
                        }), q = ({ x: A, y: o })=>({
                            x: Math.floor(A + E),
                            y: Math.floor(o + c)
                        }), l = A.map((A)=>{
                        const { boundingBox: o, cornerPoints: e } = A, { x: g, y: t } = q(h({
                            x: o.x,
                            y: o.y
                        })), { x: i, y: w } = h({
                            x: o.width,
                            y: o.height
                        });
                        return {
                            ...A,
                            cornerPoints: e.map((A)=>q(h(A))),
                            boundingBox: DOMRectReadOnly.fromRect({
                                x: g,
                                y: t,
                                width: i,
                                height: w
                            })
                        };
                    });
                    t.width = i.offsetWidth, t.height = i.offsetHeight;
                    const M = t.getContext("2d");
                    if (null === M) throw new Error("onFound handler should only be called when component is mounted. Thus tracking canvas 2D context is always defined.");
                    g(l, M);
                }
            })(A, F.current, N.current, u.tracker),
        formats: s,
        retryDelay: void 0 === u.tracker ? 500 : 10,
        scanDelay: I,
        allowMultiple: l,
        sound: D
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>(K(!0), ()=>{
            K(!1);
        }), []), (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        k && (W(), Z());
    }, [
        null == E ? void 0 : E.tracker
    ]), (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!m(f, J)) {
            const A = f;
            (null == r ? void 0 : r.deviceId) && delete A.facingMode, x(A);
        }
    }, [
        r
    ]);
    const v = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            constraints: J,
            shouldStream: k && !C
        }), [
        J,
        k,
        C
    ]), b = async ()=>{
        const A = F.current;
        if (null == A) throw new Error("Video should be defined when component is mounted.");
        const o = T.current;
        if (null == o) throw new Error("Canvas should be defined when component is mounted.");
        const e = o.getContext("2d");
        if (null == e) throw new Error("Canvas should be defined when component is mounted.");
        if (v.shouldStream) {
            await U.stopCamera(), L(!1);
            try {
                await U.startCamera(A, v), A ? L(!0) : await U.stopCamera();
            } catch (A) {
                null == Y || Y(A), console.error("error", A);
            }
        } else o.width = A.videoWidth, o.height = A.videoHeight, e.drawImage(A, 0, 0, A.videoWidth, A.videoHeight), await U.stopCamera(), L(!1);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        (async ()=>{
            await b();
        })();
    }, [
        v
    ]);
    const O = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>v.shouldStream && y, [
        v.shouldStream,
        y
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (O) {
            if (void 0 === T.current) throw new Error("shouldScan effect should only be triggered when component is mounted. Thus pause frame canvas is defined");
            if (p(T.current), void 0 === N.current) throw new Error("shouldScan effect should only be triggered when component is mounted. Thus tracking canvas is defined");
            p(N.current);
            const A = F.current;
            if (null == A) throw new Error("shouldScan effect should only be triggered when component is mounted. Thus video element is defined");
            Z();
        }
    }, [
        O
    ]), __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        style: {
            ...R,
            ...null == h ? void 0 : h.container
        },
        className: null == q ? void 0 : q.container
    }, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("video", {
        ref: F,
        style: {
            ...d,
            ...null == h ? void 0 : h.video,
            visibility: C ? "hidden" : "visible"
        },
        className: null == q ? void 0 : q.video,
        autoPlay: !0,
        muted: !0,
        playsInline: !0
    }), __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("canvas", {
        ref: T,
        style: {
            display: C ? "block" : "none",
            position: "absolute",
            width: "100%",
            height: "100%"
        }
    }), __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("canvas", {
        ref: N,
        style: {
            position: "absolute",
            width: "100%",
            height: "100%"
        }
    }), __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        style: {
            position: "absolute",
            width: "100%",
            height: "100%"
        }
    }, u.finder && __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(M, {
        scanning: y,
        capabilities: U.capabilities,
        onOff: u.onOff,
        zoom: u.zoom && U.settings.zoom ? {
            value: U.settings.zoom,
            onChange: async (A)=>{
                const o = {
                    ...J,
                    advanced: [
                        {
                            zoom: A
                        }
                    ]
                };
                await U.updateConstraints(o);
            }
        } : void 0,
        torch: u.torch ? {
            status: null !== (a = U.settings.torch) && void 0 !== a && a,
            toggle: async (A)=>{
                const o = {
                    ...J,
                    advanced: [
                        {
                            torch: A
                        }
                    ]
                };
                await U.updateConstraints(o);
            }
        } : void 0,
        startScanning: async ()=>await b(),
        stopScanning: async ()=>{
            await U.stopCamera(), p(N.current), L(!1);
        }
    }), c));
}
function K() {
    const [A, e] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        (async ()=>{
            e(await async function() {
                return (await navigator.mediaDevices.enumerateDevices()).filter(({ kind: A })=>"videoinput" === A);
            }());
        })();
    }, []), A;
}
;
 //# sourceMappingURL=index.esm.mjs.map
}),
"[project]/p2p-react/node_modules/@yudiel/react-qr-scanner/dist/index.esm.mjs [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$webrtc$2d$adapter$2f$src$2f$js$2f$adapter_core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/webrtc-adapter/src/js/adapter_core.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$barcode$2d$detector$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/barcode-detector/dist/es/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$yudiel$2f$react$2d$qr$2d$scanner$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/@yudiel/react-qr-scanner/dist/index.esm.mjs [app-ssr] (ecmascript) <locals>");
}),
"[project]/p2p-react/node_modules/@radix-ui/react-progress/dist/index.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "Indicator": ()=>Indicator,
    "Progress": ()=>Progress,
    "ProgressIndicator": ()=>ProgressIndicator,
    "Root": ()=>Root,
    "createProgressScope": ()=>createProgressScope
});
// src/progress.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$context$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/@radix-ui/react-context/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/@radix-ui/react-primitive/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/p2p-react/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext, createProgressScope] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$context$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContextScope"])(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"]((props, forwardedRef)=>{
    const { __scopeProgress, value: valueProp = null, max: maxProp, getValueLabel = defaultGetValueLabel, ...progressProps } = props;
    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
        console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
    }
    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
    if (valueProp !== null && !isValidValueNumber(valueProp, max)) {
        console.error(getInvalidValueError(`${valueProp}`, "Progress"));
    }
    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(ProgressProvider, {
        scope: __scopeProgress,
        value,
        max,
        children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Primitive"].div, {
            "aria-valuemax": max,
            "aria-valuemin": 0,
            "aria-valuenow": isNumber(value) ? value : void 0,
            "aria-valuetext": valueLabel,
            role: "progressbar",
            "data-state": getProgressState(value, max),
            "data-value": value ?? void 0,
            "data-max": max,
            ...progressProps,
            ref: forwardedRef
        })
    });
});
Progress.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"]((props, forwardedRef)=>{
    const { __scopeProgress, ...indicatorProps } = props;
    const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$p2p$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Primitive"].div, {
        "data-state": getProgressState(context.value, context.max),
        "data-value": context.value ?? void 0,
        "data-max": context.max,
        ...indicatorProps,
        ref: forwardedRef
    });
});
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
    return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
    return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
    return typeof value === "number";
}
function isValidMaxNumber(max) {
    return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
    return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
    return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
    return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root = Progress;
var Indicator = ProgressIndicator;
;
 //# sourceMappingURL=index.mjs.map
}),

};

//# sourceMappingURL=ec824_d7808f53._.js.map