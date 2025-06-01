import {types} from 'putout';

const {
    variableDeclaration,
    variableDeclarator,
} = types;

export const report = () => `Use 'add-array'`;
export const replace = () => ({
    '{let __a = __b; if (__c) __d}': ({__a, __b}, path) => {
        const ifPath = path.get('body.1');
        
        ifPath.node.test = variableDeclaration('let', [
            variableDeclarator(__a, __b),
        ]);
        
        return ifPath;
    },
});
