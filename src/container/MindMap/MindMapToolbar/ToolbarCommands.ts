import {ConfigKey} from "./MindMapToolbar";
import {configStore} from "../../../store";
import {EditorPosition, PreviewMode, UserConfig} from "../../../store/ConfigStore";

export default function toolbarCommandsHandler(key: ConfigKey, value?: any) {
  switch (key as ConfigKey) {
    case ConfigKey.EDITOR_POSITION_RIGHT:
      moveEditorTo(EditorPosition.RIGHT);
      break;
    case ConfigKey.EDITOR_POSITION_LEFT:
      moveEditorTo(EditorPosition.LEFT);
      break;
    case ConfigKey.LIVE_PREVIEW:
      codeToMapLivePreview(value);
      break;
    default:
      break;
  }
}

function moveEditorTo(position: EditorPosition) {
  configStore.saveUserConfig(UserConfig.EDITOR_POSITION, position);
}

function codeToMapLivePreview(live: boolean) {
  configStore.saveUserConfig(UserConfig.PREVIEW_MODE, live ? PreviewMode.LIVE : PreviewMode.SAVE)
}
