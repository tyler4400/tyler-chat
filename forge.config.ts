import type { ForgeConfig } from '@electron-forge/shared-types';
// import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
// import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerDMG } from '@electron-forge/maker-dmg';
import { MakerPKG } from '@electron-forge/maker-pkg';
// import { MakerRpm } from '@electron-forge/maker-rpm';
import { VitePlugin } from '@electron-forge/plugin-vite';
import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { FuseV1Options, FuseVersion } from '@electron/fuses';
import { defineConfig } from 'vite';

const config: ForgeConfig = {
  packagerConfig: {
    // name:'TChat',
    icon: './assets/icon',
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    // new MakerSquirrel({}),
    // new MakerZIP({}, ['darwin']),
    // new MakerRpm({}),
    // new MakerDeb({})

    // new MakerSquirrel({
    //   // 应用信息
    //   name: 'VChat',
    //   authors: 'Viking Zhang',
    //   description: 'A chat application',
    //   // 安装程序配置
    //   setupIcon: './assets/icon.ico',  // Windows 安装图标
    //   iconUrl: 'https://raw.githubusercontent.com/your-repo/vchat/main/assets/icon.ico', // 远程图标URL
    //   // 快捷方式设置
    //   setupExe: 'VChat-Setup.exe',  // 安装程序名称
    // }),
    // new MakerRpm({}),
    // new MakerDeb({}),
    
    // 暂时禁用 DMG 构建，因为在 Apple Silicon 上有 openfolder 问题
    // 参考：https://github.com/electron/forge/issues/2831
    // new MakerDMG({
    //   icon: './assets/icon.icns',
    //   format: 'UDZO',
    // }),
    
    // 使用 PKG 作为 DMG 的替代方案（需要代码签名证书，暂时禁用）
    // new MakerPKG({
    //   // PKG 构建不会遇到 openfolder 问题，但需要代码签名
    // }),
    
    // 使用 ZIP 作为主要的分发选项（在 Apple Silicon 上可以正常工作）
    new MakerZIP({}, ['darwin']),
  ],
  plugins: [
    new VitePlugin({
      // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
      // If you are familiar with Vite configuration, it will look really familiar.
      build: [
        {
          // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
          entry: 'src/main.ts',
          config: 'vite.main.config.ts',
          target: 'main',
        },
        {
          entry: 'src/preload.ts',
          config: 'vite.preload.config.ts',
          target: 'preload',
        },
      ],
      renderer: [
        {
          name: 'main_window',
          config: 'vite.renderer.config.ts',
        },
      ],
    }),
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

export default defineConfig(config);
