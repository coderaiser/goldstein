import {types} from 'putout';

const {
    VariableDeclaration,
    VariableDeclarator,
} = types;

export const report = () => `Use 'add-array'`;
export const replace = () => ({
    '{let __a = __b; if (__c) __d}': ({__a, __b}, path) => {
        const ifPath = path.get('body.1');
        
        ifPath.node.test = VariableDeclaration('let', [
            VariableDeclarator(__a, __b),
        ]);
        
        return ifPath;
    },
});
