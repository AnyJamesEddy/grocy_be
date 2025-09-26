import fs from "node:fs";

export function searchEnv() {
    let envPath = '.env.development'; // default dev

    if (!fs.existsSync(envPath)) {
        envPath = '.env.production';
        console.log('Using env production');
    }
    else console.log('Using env development');

    return envPath;
}
