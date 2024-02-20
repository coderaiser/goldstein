import {
    maybeVisitor,
    visitors as v,
} from '@putout/printer';

export const AwaitExpression = (path, printer, semantics) => {
    const {print} = printer;
    
    if (!path.node.goldstein)
        return maybeVisitor(v.AwaitExpression, path, printer, semantics);
    
    print('__goldstein');
};
