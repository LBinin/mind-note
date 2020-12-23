import {observable, action} from "mobx";

export enum UserConfig {
  PREVIEW_MODE = "MIND-NOTE-PREVIEW-MODE",
  MARKDOWN_CODE = "MARKDOWN-CODE",
  EDITOR_POSITION = "MIND-NOTE-EDITOR-POSITION",
  EDITOR_WIDTH = "MIND-NOTE-EDITOR-WIDTH",
  EDITOR_HEIGHT = "MIND-NOTE-EDITOR-HEIGHT",
}

export enum PreviewMode {
  LIVE = "live", // 实时预览
  SAVE = "save", // 保存时预览
}

export enum EditorPosition {
  LEFT = "left",
  RIGHT = "right",
  TOP = "top",
  BOTTOM = "bottom",
}

export class ConfigStore {
  previewMode = observable.box(this.getUserConfigByKey<PreviewMode>(UserConfig.PREVIEW_MODE) || PreviewMode.LIVE);
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

  getUserConfigByKey<T extends string>(key: string): T | null {
    return localStorage.getItem(key) as T | null;
  }
}
