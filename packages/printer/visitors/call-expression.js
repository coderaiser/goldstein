import {visitors as v} from '@putout/printer';

export const CallExpression = (path, printer, semantics) => {
    const {print} = printer;
    
    if (!path.node.goldstein)
        return v.CallExpression(path, printer, semantics);
    
    print('__goldstein');
};
