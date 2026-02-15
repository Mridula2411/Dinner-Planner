export function resolvePromise(prms, promiseState) {

    promiseState.promise = prms;
    promiseState.data = null;
    promiseState.error = null;

    if (!prms) {
        return;
    }

    function successACB(result) {
        if (promiseState.promise === prms) {
            promiseState.data = result;
        }
    }

    function failureACB(error) {
        if (promiseState.promise === prms) {
            promiseState.error = error;
        }
    }

    prms.then(successACB).catch(failureACB);
}
