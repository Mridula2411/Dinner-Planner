export function resolvePromise(prms, promiseState) {
    promiseState.promise= prms;
    promiseState.data= null;
    promiseState.error= null;
    
    if(!prms) { return; } // check if prms is falsy

    prms.then(resolvedACB).catch(rejectedACB);

    function resolvedACB(result) {
        if (promiseState.promise!== prms) return; // solve race condition
        promiseState.data= result;
    }

    function rejectedACB(result) {
        if (promiseState.promise!== prms) return;
        promiseState.error= result;
    }
}