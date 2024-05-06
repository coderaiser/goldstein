const {defineProperty} = Object;

export default function fn(Parser) {
    return class extends Parser {
        parseFunction(node, statement, allowExpressionBody, isAsync, forInit) {
            return super.parseFunction(node, statement, allowExpressionBody, true, forInit);
        }
        
        checkUnreserved({start, end, name}) {
            if (this.inGenerator && name === 'yield')
                this.raiseRecoverable(start, `Cannot use 'yield' as identifier inside a generator`);
            
            if (this.inAsync && name === 'await')
                this.raiseRecoverable(start, `Cannot use 'await' as identifier inside an async function`);
            
            if (this.currentThisScope().inClassFieldInit && name === 'arguments')
                this.raiseRecoverable(start, `Cannot use 'arguments' in class field initializer`);
            
            if (this.inClassStaticBlock && (name === 'arguments' || name === 'await'))
                this.raise(start, `Cannot use ${name} in class static initialization block`);
            
            if (this.keywords.test(name))
                this.raise(start, `Unexpected keyword '` + name + `'`);
            
            if (this.options.ecmaVersion < 6 && this.input.slice(start, end).includes('\\'))
                return;
            
            const re = this.strict ? this.reservedWordsStrict : this.reservedWords;
            
            if (re.test(name) && !this.inAsync && name === 'await')
                defineProperty(this, 'inAsync', {
                    value: true,
                });
        }
    };
}
