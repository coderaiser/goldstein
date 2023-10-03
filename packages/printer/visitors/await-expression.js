import {visitors as v} from '@putout/printer';

export const AwaitExpression = (path, printer, semantics) => {
    const {print} = printer;
    
    if (!path.node.goldstein)
        return v.AwaitExpression(path, printer, semantics);
    
    print('__goldstein');
};
