export const IfStatement = (path, printer) => {
    const {print, indent} = printer;
    const {node} = path;
    
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
