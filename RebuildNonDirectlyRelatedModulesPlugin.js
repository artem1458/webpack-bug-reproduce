module.exports = class {
    apply(compiler) {
        compiler.hooks.compilation.tap('Compilation Hook', (compilation) => {
            compilation.hooks.buildModule.tap('Rebuild On Change', (module) => {
                if ((compiler.modifiedFiles ?? []).length === 0) {
                    return;
                }

                if (!module.resource) {
                    return;
                }

                //Skipping force rebuild, when it's not module a
                if (!/module_a\.ts$/.test(module.resource)) {
                    return;
                }

                //Finding module b in compilation modules
                const moduleB = Array.from(compilation.modules)
                    .find(it => it.resource && /module_b\.ts$/.test(it.resource));

                if (!moduleB) {
                    return;
                }

                compilation.rebuildModule(moduleB, (error, result) => {
                    if (error) {
                        compilation.errors.push(error);
                    } else {
                        console.log('Successfully rebuilt module B');
                    }
                });
            });
        });
    }
}
