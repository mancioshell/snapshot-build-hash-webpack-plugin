const path = require('path');
const gitBranchIs = require('git-branch-is');

class SnapshotBuildHashPlugin {

    constructor() {
    }

    apply(compiler) {
        const packagePath = path.resolve(process.cwd(), 'package.json')
        const packageLockPath = path.resolve(process.cwd(), 'package-lock.json')

        let packageFile = require(packagePath)
        let packageLockFile = require(packageLockPath)

        const currentVersion = packageFile.version

        compiler.hooks.afterEmit.tapAsync('SnapshotBuildHashPlugin', (compilation, callback) => {
            const stats = compilation.getStats().toJson({
                hash: true,
                publicPath: false,
                assets: false,
                chunks: false,
                modules: false,
                source: false,
                errorDetails: false,
                timings: false
            });

            gitBranchIs(branchName => /^master$|^release/.test(branchName)).then(
                result => {
                    if (!result) {
                        const release = /^([0-9]\.[0-9]\.[0-9])($|-SNAPSHOT.*$)/.exec(currentVersion)

                        if (release) {
                            packageFile.version = `${release[1]}-SNAPSHOT.${stats.hash}`
                            packageLockFile.version = `${release[1]}-SNAPSHOT.${stats.hash}`

                            compiler.outputFileSystem.writeFile(packagePath, JSON.stringify(packageFile, null, 2), callback);
                            compiler.outputFileSystem.writeFile(packageLockPath, JSON.stringify(packageLockFile, null, 2), callback);
                        }
                    }
                },
                err => console.error(err)
            )

        });
    }
}

module.exports = SnapshotBuildHashPlugin;