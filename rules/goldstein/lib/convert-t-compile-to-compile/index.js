import {types} from 'putout';

const {
    ObjectProperty,
    ObjectPattern,
    Identifier,
} = types;

const COMPUTED = false;
const SHORTHAND = true;

export const report = () => `Use 'compile()' instead of 't.compile'`;

export const replace = () => ({
    't.end()': '',
    't.compile(__a)': (vars, path) => {
        const {block} = path.scope;
        
        path.scope.block.async = true;
        
        const id = Identifier('compile');
        const param = ObjectPattern([
            ObjectProperty(id, id, COMPUTED, SHORTHAND),
        ]);
        
        block.params = [param];
        
        return 'await compile(__a)';
    },
});
