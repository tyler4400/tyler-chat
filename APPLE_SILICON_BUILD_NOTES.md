# Apple Silicon 构建问题解决方案

## 问题描述

在 Apple Silicon 设备上构建 Electron 应用时，遇到了以下错误：

```
Command failed: bless --folder /Volumes/tyler-chat --openfolder /Volumes/tyler-chat
bless: The 'openfolder' is not supported on Apple Silicon devices.
```

## 问题原因

这个问题是由于 `@electron-forge/maker-dmg` 在构建 DMG 文件时，底层的 `appdmg` 库调用了 `bless` 命令的 `--openfolder` 参数，而这个参数在 Apple Silicon 设备上不被支持。

参考 GitHub issue: https://github.com/electron/forge/issues/2831

## 解决方案

### 当前解决方案：使用 ZIP 文件

1. **暂时禁用 DMG 构建**：在 `forge.config.ts` 中注释掉 `MakerDMG` 配置
2. **使用 ZIP 作为主要分发格式**：保留 `MakerZIP` 配置
3. **修改构建脚本**：在 `package.json` 中添加环境变量（虽然当前无效，但为将来做准备）

### 其他可选方案

#### 方案 1：使用 PKG 文件（需要代码签名）
- 安装 `@electron-forge/maker-pkg`
- 配置 `MakerPKG`
- 需要有效的 Apple Developer 证书

#### 方案 2：等待官方修复
- 关注 GitHub issue 的更新
- 等待 Electron Forge 团队修复此问题

## 当前配置

### package.json
```json
{
  "scripts": {
    "make": "cross-env ELECTRON_FORGE_ALLOW_OPENFOLDER_SKIP=true electron-forge make",
    "make:dmg": "cross-env ELECTRON_FORGE_ALLOW_OPENFOLDER_SKIP=true electron-forge make"
  }
}
```

### forge.config.ts
```typescript
makers: [
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
```

## 构建输出

成功构建后，会在 `out/make/zip/darwin/x64/` 目录下生成：
- `tyler-chat-darwin-x64-1.0.0.zip`

## 使用方法

1. **开发构建**：
   ```bash
   npm run make
   ```

2. **用户安装**：
   - 下载生成的 ZIP 文件
   - 解压缩
   - 将 `.app` 文件拖拽到应用程序文件夹

## 未来计划

1. **监控 GitHub issue**：定期检查 https://github.com/electron/forge/issues/2831
2. **测试新版本**：当有新版本的 Electron Forge 发布时，测试是否修复了 DMG 问题
3. **考虑 PKG 方案**：如果需要更专业的安装包，可以考虑申请 Apple Developer 证书并使用 PKG 格式

## 注意事项

- ZIP 文件虽然可以正常工作，但用户体验不如 DMG 文件
- 如果需要发布到 Mac App Store，必须使用 PKG 格式
- 这个问题只影响 Apple Silicon 设备，Intel Mac 不受影响

## 更新日志

- **2024-01-07**：初步解决方案，使用 ZIP 文件代替 DMG
- **待更新**：等待官方修复或找到更好的解决方案 