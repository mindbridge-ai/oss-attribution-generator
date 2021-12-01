const path = require('path');
const assert = require('assert');
const fs = require('fs');
const { execSync } = require('child_process');


describe('end to end', () => {

    let licenseInfos;
    before(() => {
        execSync('npm install', {
            cwd: path.join(__dirname, "fixture"),
        });
        execSync(path.join(__dirname, '../index.js'), {
            cwd: path.join(__dirname, 'fixture'),
        });

        licenseInfos = JSON.parse(fs.readFileSync(
            path.join(__dirname, './fixture/oss-attribution/licenseInfos.json')
        ).toString());
    });

    it('outputs licenseInfos in object format', () => {
        assert('angular' in licenseInfos);
    });

    it('excludes devDependencies', () => {
        assert(!('@angular-devkit/build-angular' in licenseInfos));
    });

    it('includes transitive dependencies', () => {
        assert('tslib' in licenseInfos);
    });
});
