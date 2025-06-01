import {types} from 'putout';

const {
    identifier,
    objectPattern,
    objectProperty,
} = types;

const COMPUTED = false;
const SHORTHAND = true;

export const transform = (name, args) => (vars, path) => {
    const {block} = path.scope;
    
    path.scope.block.async = true;
    
    const id = identifier(name);
    const param = objectPattern([
        objectProperty(id, id, COMPUTED, SHORTHAND),
    ]);
    
    block.params = [param];
    
    return `await ${name}(${args})`;
};
