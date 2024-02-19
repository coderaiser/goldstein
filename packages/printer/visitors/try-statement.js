import {
    visitors as v,
    maybeVisitor,
} from '@putout/printer';

export const TryStatement = (path, printer, semantics) => {
    const {maybe, print} = printer;
    const {node} = path;
    
    if (!node.expression)
        return maybeVisitor(v.TryStatement, path, printer, semantics);
    
    print('try ');
    maybe.print(node.async, 'await ');
    print('__argument');
};
