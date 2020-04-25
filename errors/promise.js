function reject() {
    return new Promise(function (resolve, reject) {
        reject(new Error('Promise Error'));
    });
}

reject().catch(function (error) {
    console.log('Has error', error.message);
})
