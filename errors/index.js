function add(a, b) {
    if (typeof  a !== "string" || typeof b !== "string") {
        throw new Error('Wrong Type');
    }
    return a+ b;
}

try{
    var result = add('a', 1);
} catch (e) {
    console.log(e);
}
