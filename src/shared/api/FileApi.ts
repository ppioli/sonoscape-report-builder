import { ApiResponse } from '../ApiResponse';

export interface FileApi {
  showDirectoryPicker(): Promise<ApiResponse<string>>;
}
