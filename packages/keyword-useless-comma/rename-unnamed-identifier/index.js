export const report = () => {};
export const fix = (path) => path.remove();
export const traverse = ({push}) => ({
    ObjectProperty(path) {
        if (!path.node.key.name)
            push(path);
    },
});
