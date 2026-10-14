// End-to-end test inside a real VS Code window. Run with: node test/e2e/runTest.js
// Optional environment variables:
//   VSCODE_EXE     path to the Code executable to use (otherwise a VS Code build is downloaded)
//   MSB_EXT_PATH   folder of an unpacked .vsix (its "extension" folder) to test instead of this source folder
const os = require('os');
const path = require('path');
const fs = require('fs');
const { runTests } = require('@vscode/test-electron');

async function main() {
  delete process.env.ELECTRON_RUN_AS_NODE;
  const repo = path.resolve(__dirname, '..', '..');
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'msb-e2e-'));
  // The launcher splits arguments at spaces on Windows, so work through junctions without spaces.
  const link = (target, name) => {
    if (!/\s/.test(target)) return target;
    const l = path.join(tmp, name);
    fs.symlinkSync(target, l, 'junction');
    return l;
  };
  const extensionDevelopmentPath = link(process.env.MSB_EXT_PATH ? path.resolve(process.env.MSB_EXT_PATH) : repo, 'ext-src');
  const suiteDir = link(path.join(repo, 'test', 'e2e'), 'suite-src');
  const course = path.join(tmp, 'course-folder');
  fs.mkdirSync(course);
  const settingsDir = path.join(tmp, 'user-data', 'User');
  fs.mkdirSync(settingsDir, { recursive: true });
  fs.writeFileSync(path.join(settingsDir, 'settings.json'), JSON.stringify({
    'meanStackBasics.courseFolder': course,
    'workbench.startupEditor': 'none',
    'workbench.colorTheme': 'Default Dark Modern',
    'chat.disableAIFeatures': true,
    'workbench.tips.enabled': false,
    'update.mode': 'none',
  }));
  try {
    await runTests({
      vscodeExecutablePath: process.env.VSCODE_EXE || undefined,
      extensionDevelopmentPath,
      extensionTestsPath: path.join(suiteDir, 'suite.js'),
      extensionTestsEnv: { MSB_E2E_COURSE: course, MSB_E2E_PAUSE: process.env.MSB_E2E_PAUSE || '', MSB_E2E_PAUSE2: process.env.MSB_E2E_PAUSE2 || '', MSB_READY_FILE: process.env.MSB_READY_FILE || '' },
      launchArgs: [
        '--disable-extensions',
        '--disable-workspace-trust',
        `--user-data-dir=${path.join(tmp, 'user-data')}`,
        `--extensions-dir=${path.join(tmp, 'ext')}`,
        ...(process.env.MSB_DEBUG_PORT ? [`--remote-debugging-port=${process.env.MSB_DEBUG_PORT}`] : []),
      ],
    });
  } finally {
    try {
      fs.rmSync(tmp, { recursive: true, force: true, maxRetries: 10, retryDelay: 500 });
    } catch {
      // VS Code may still hold its log files for a moment; the OS temp folder is cleaned up later.
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
