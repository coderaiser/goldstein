test('goldstein: keyword: try: not-supported', async ({raise}) => {
    await raise('not-supported', `After 'try' only '{', 'await' and 'function call' can come (1:8)`);
});
