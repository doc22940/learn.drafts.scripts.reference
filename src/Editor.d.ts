/**
 * An array of numbers containing the location (index in string), and length (number of characters) of a text selection.
 */
type selectionRange = Array<number>
/**
 * # Editor 
 * 
 * A global `editor` object is available in all action scripts. This object allows manipulation of the main editing window in Drafts, altering the text, text selections, or loading a different draft into the editor, etc.
 * 
 * Typically scripting actions that work like custom keyboard commands and similar will utilize the editor functions to manipulate text.
 * 
 * **NOTE:** _Generally speaking, editor methods are best used for quick text manipulations of the type used in the extended keyboard. Most substantial updates to draft content are better applied using the `draft` object._
 * 
 * 
 */
declare class Editor {
    /**
     * Access or set current focus mode status.
     */
    focusModeEnabled: boolean

    /**
     * Access or set current link mode status.
     */
    linkModeEnabled: boolean

    /**
     * Is editor current focused for editing.
     */
    isActive: boolean

    // FUNCTIONS
    /**
    * Creates a new blank draft and loads it into the editor.
    */
    new(): void

    /**
    * Loads an existing draft into the editor.
    */
    load(draft: Draft): void

    /**
    * Save any current changes to the draft.
    */
    save(): void

    /**
    * Apply undo action to editor, if one is available.
    */
    undo(): void

    /**
    * Apply redo action to editor, if one is available.
    */
    redo(): void

    /**
    * Request focus for the editor. This will dismiss other views and show the keyboard on the currently loaded draft. Useful if an action opens user interface elements or otherwise causes the editor to resign focus and you would like to return to editing at the end of the action's execution.
    */
    activate(): void

    /**
    * Resign focus for the editor. If the editor text view is currently focused for editing (e.g. showing keyboard), resign focus.
    */
    deactivate(): void

    /**
    * Open arrange mode in editor. This is a non-blocking method and returns immediately. It is intended only to mimic the tapping of the arrange button. Use `editor.arrange(text)` to wait for a result.
    */
    showArrange(): void

    /**
    * Opens the arrange mode view with the passed text for arranging. Returns the arranged text if the user makes changes and taps "Done", the original text if the user cancels.
    * @param text The text to arrange
    * @returns String containing result of arrange. If user cancels, it will be the same as the original text passed.
    */
    arrange(text: string): string

    /**
    * Open find mode in editor.
    */
    showFind(): void

    /**
    * Open dictation mode in editor. This is a non-blocking method and returns immediately. It is intended only to mimic the tapping of the dictate button. Use `editor.dictate()` to wait for a result and use it in further scripting.
    */
    showDictate(): void

    /**
    * Open dictation interface, and return the result as a string. The string will be empty if user cancels.
    * @param locale the preferred locale can be passed in the format "en-US" (U.S. English), "it-IT" (Italian-Italian), "es-MX" (Mexican Spanish), etc.
    * @returns The accepted dictation text.
    */
    dictate(locale?: string): string

    /**
    * Get the full text currently loaded in the editor.
    */
    getText(): string

    /**
    * Replace the contents of the editor with a string.
    */
    setText(text: string): void

    /**
    * Get text range that was last selected.
    */
    getSelectedText(): string

    /**
    * Replace the contents of the last text selection with a string.
    */
    setSelectedText(text: string): void

    /**
    * Get text range that was last selected.
    */
    getSelectedLineRange(): selectionRange

    /**
    * Get the current selected text range extended to the beginning and end of the lines it encompasses.
    */
    getSelectedRange(): selectionRange

    /**
    * Update the text selection in the editor by passing the start location and the length of the new selection.
    */
    setSelectedRange(location: number, length: number): void

    /**
    * Get the substring in a range from the text in the editor.
    */
    getTextInRange(location: number, length: number): string

    /**
    * Replace the text in the passed range with new text.
    */
    setTextInRange(location: number, length: number, text: string): void
}
/**
 * The active editor
 */
declare const editor: Editor