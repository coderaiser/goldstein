import {types} from 'putout';

const {
    ObjectProperty,
    ObjectPattern,
    Identifier,
} = types;

const COMPUTED = false;
const SHORTHAND = true;

export const transform = (name, args) => (vars, path) => {
    const {block} = path.scope;
    
    path.scope.block.async = true;
    
    const id = Identifier(name);
    const param = ObjectPattern([
        ObjectProperty(id, id, COMPUTED, SHORTHAND),
    ]);
    
    block.params = [param];
    
    return `await ${name}(${args})`;
};
