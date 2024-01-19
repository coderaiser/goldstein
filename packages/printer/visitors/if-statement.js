import {visitors as v} from '@putout/printer';

export const IfStatement = (path, printer, semantics) => {
    const {print, indent} = printer;
    const {node} = path;
    
    if (!node.goldsteinIf)
        return v.IfStatement(path, printer, semantics);
    
    indent();
    print('if ');
    
    const testPath = path.get('test');
    
    if (testPath.isVariableDeclaration()) {
        const first = testPath.get('declarations.0');
        const id = first.get('id');
        const init = first.get('init');
        
        print(testPath.node.kind);
        print(' ');
        print(id);
        print(' = ');
        print(init);
    } else {
        print('__test');
    }
    
    print(' ');
    print('__consequent');
    
    if (node.alternate) {
        print(' else ');
        print('__alternate');
    }
};
