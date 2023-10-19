import {visitors as v} from '@putout/printer';

export const IfStatement = (path, printer, semantics) => {
    const {print, indent} = printer;
    const {node} = path;
    
    if (!node.goldsteinIf)
        return v.IfStatement(path, printer, semantics);
    
    indent();
    print('if ');
    print('__test');
    print(' ');
    print('__consequent');
    
    if (node.alternate) {
        print(' else ');
        print('__alternate');
    }
};
