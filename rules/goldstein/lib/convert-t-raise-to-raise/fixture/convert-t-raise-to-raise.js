test('goldstein: keyword: try: not-supported', (t) => {
    t.raise('not-supported', `After 'try' only '{', 'await' and 'function call' can come (1:8)`);
});
