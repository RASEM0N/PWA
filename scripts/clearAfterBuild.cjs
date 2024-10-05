const path = require('node:path');
const fs = require('node:fs/promises');
const mainDir = path.join(__dirname, '..');

(async () => {
    const paths = await fs.readdir(mainDir);
    for (const value of paths) {
        if (value.includes('tsbuildinfo')) {
            await fs.unlink(path.join(mainDir, value))
        }
    }
})()