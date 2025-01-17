// Automatically generated by GDevelop.js/scripts/generate-types.js
declare class gdEventsRefactorer {
  static renameObjectInEvents(platform: gdPlatform, projectScopedContainers: gdProjectScopedContainers, events: gdEventsList, targetedObjectsContainer: gdObjectsContainer, oldName: string, newName: string): void;
  static replaceStringInEvents(project: gdObjectsContainer, layout: gdObjectsContainer, events: gdEventsList, toReplace: string, newString: string, matchCase: boolean, inConditions: boolean, inActions: boolean, inEventStrings: boolean): gdVectorEventsSearchResult;
  static searchInEvents(platform: gdPlatform, events: gdEventsList, search: string, matchCase: boolean, inConditions: boolean, inActions: boolean, inEventStrings: boolean, inEventSentences: boolean): gdVectorEventsSearchResult;
  delete(): void;
  ptr: number;
};