import {observer} from "mobx-react";
import {observable, action} from "mobx";

export enum UserConfig {
  PREVIEW_MODE = "MIND-NOTE-PREVIEW-MODE",
  MARKDOWN_CODE = "MARKDOWN-CODE",
  EDITOR_POSITION = "MIND-NOTE-EDITOR-POSITION",
}

export enum PreviewMode {
  LIVE = "live", // 实时预览
  SAVE = "save", // 保存时预览
}

export enum EditorPosition {
  LEFT = "left",
  RIGHT = "right",
}

interface UserConfigData {
  [UserConfig.PREVIEW_MODE]: PreviewMode;
  [UserConfig.MARKDOWN_CODE]: string | null;
}

export class ConfigStore {
  previewMode = observable.box(this.getUserConfigByKey<PreviewMode>(UserConfig.PREVIEW_MODE) || PreviewMode.SAVE);
  editorPosition = observable.box(this.getUserConfigByKey<EditorPosition>(UserConfig.EDITOR_POSITION) || EditorPosition.LEFT);

  @action.bound
  saveUserConfig(key: UserConfig, value: string) {
    console.log({key, value}, this.editorPosition)

    switch (key) {
      case UserConfig.PREVIEW_MODE:
        this.previewMode.set(value as PreviewMode);
        break;
      case UserConfig.EDITOR_POSITION:
        this.editorPosition.set(value as EditorPosition);
        break;
      default:
        break;
    }

    localStorage.setItem(key, value);
  }

  getUserConfig(): UserConfigData {
    return {
      [UserConfig.PREVIEW_MODE]: localStorage.getItem(UserConfig.PREVIEW_MODE) as PreviewMode,
      [UserConfig.MARKDOWN_CODE]: localStorage.getItem(UserConfig.MARKDOWN_CODE),
    }
  }

  getUserConfigByKey<T>(key: string): T | null {
    return localStorage.getItem(key) as T | null;
  }
}
