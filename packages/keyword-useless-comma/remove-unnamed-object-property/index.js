export const report = () => {};
export const fix = (path) => path.remove();
export const traverse = ({push}) => ({
    'ObjectProperty|ClassProperty'(path) {
        const keyPath = path.get('key');
        
        if (keyPath.isIdentifier() && !keyPath.node.name)
            push(path);
    },
});
