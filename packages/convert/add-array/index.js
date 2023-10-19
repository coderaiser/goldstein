export const report = () => `Use 'add-array'`;
export const replace = () => ({
    '__a.push(...__array)': '__a += __array',
});
