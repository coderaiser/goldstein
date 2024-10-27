import {
    maybeVisitor,
    visitors as v,
} from '@putout/printer';

export const CallExpression = (path, printer, semantics) => {
    const {print} = printer;
    
    if (!path.node.goldstein)
        return maybeVisitor(v.CallExpression, path, printer, semantics);
    
    return print('__goldstein');
};
