type keyboardTypes =
    | 'default'
    | 'numbersAndPunctuation'
    | 'numberPad'
    | 'phonePad'
    | 'namePhonePad'
    | 'emailAddress'
    | 'decimalPad'
    | 'webSearch'
    | 'URL'

type capitalizationTypes = 'none' | 'sentences' | 'words'

/**
 * # Prompt
 * 
 * Prompts allow the creation and display of custom dialogs to request information or confirmation from the user.
 * 
 * ### Example
 * 
 * ```javascript
 * var p = Prompt.create();
 * 
 * p.title = "Hello";
 * p.message = "World!";
 * 
 * p.addTextField("textFieldName", "Label", "");
 * 
 * p.addDatePicker("myDate", "Start date", new Date(), {
 *   "mode": "date"
 * });
 * p.addButton("First");
 * p.addButton("Second");
 * 
 * var didSelect = p.show();
 * 
 * var textFieldContents = p.fieldValues["textFieldName"];
 * var startDate = p.fieldValues["myDate"];
 * 
 * if (p.buttonPressed == "First") {
 *   // do something
 * }
 * ```
 *
 */
declare class Prompt {
    title: string

    /**
     * A longer message explaining the purpose of the dialog, if needed.
     */
    message: string

    /**
     * If true, a "Cancel" button will be included in the dialog. Defaults to `true`. If the user selects the cancel button, the `show()` method will return `false`. If `false`, no cancel button will be displayed and the user must select one of the button name options.
     */
    isCancellable: boolean

    /**
     * After the `show()` method is called, this property will contain values from any fields added to the prompt. The dictionary keys will be the names of the fields as passed in when they were created, and the value will be the current contents of that field. They type of data depends on the type of field.
     */
    fieldValues: { [x: string]: any }

    /**
     * After the `show()` method is called, this property will contain the name of the button selected by the user.
     */
    buttonPressed: string

    /**
     * Add an information text label to the prompt.
     * @param name Identifier for the field.
     * @param label The text of the label.
     * @param options A dictionary of options for configuring the text field.
     */
    addLabel(
        name: string,
        label: string,
        options?: { textSize?: 'body' | 'caption' | 'headline' } // FIXME: is this actually optional? and the rest of these
    ): void

    /**
     * Add a text input field to the prompt
     * @param name Identifier for the field. This will be used as the key in the `fieldValues` dictionary to access the contents of the field after calling `show()`.
     * @param label User-friendly text label to place next to the field.
     * @param initialText The initial text contents for the field.
     * @param options A dictionary of options for configuring the text field. See [the site](https://reference.getdrafts.com/objects/Prompt.html) for full descriptions of the options.
     */
    addTextField(
        name: string,
        label: string,
        initialText: string, // FIXME: is this optional?
        options?: {
            placeholder?: string
            autocorrect?: boolean
            autocapitalization?: capitalizationTypes
            keyboard?: keyboardTypes
            wantsFocus?: boolean
        }
    ): void

    /**
     * Add a text input field to the prompt
     * @param name Identifier for the field. This will be used as the key in the `fieldValues` dictionary to access the contents of the field after calling `show()`.
     * @param label User-friendly text label to place next to the field.
     * @param initialText The initial text contents for the field.
     * @param options A dictionary of options for configuring the text field. See [the site](https://reference.getdrafts.com/objects/Prompt.html) for full descriptions of the options.
     */
    addTextView(
        name: string,
        label: string,
        initialText: string,
        options?: {
            height?: number
            autocorrect?: boolean
            autocapitalization?: capitalizationTypes
            keyboard?: keyboardTypes
            wantsFocus?: boolean
        }
    ): void

    /**
     * Same as addTextField, but the input field will be password masked.
     */
    addPasswordField(name: string, label: string, initialValue: string): void

    /**
     * Add an on/off toggle switch. The `fieldValues` entry for this item will be a boolean indicating whether the switch was on.
     * @param name Identifier for the field. This will be used as the key in the `fieldValues` dictionary to access the contents of the field after calling `show()`.
     * @param label User-friendly text label to place next to the field.
     * @param initialValue indicate if the switch should be on or off when initially displayed.
     */
    addSwitch(name: string, label: string, initialValue: boolean): void

    /**
     * Add a date and/or time picker to the prompt, with the arguments as below. The `fieldValues` entry for this will be a date object.
     * @param name Identifier for the field. This will be used as the key in the `fieldValues` dictionary to access the contents of the field after calling `show()`.
     * @param label User-friendly text label to place next to the field.
     * @param initialDate The initial date to selected for the field. Minimum and maximum values should be defined in options.
     * @param options A dictionary of options for configuring the text field. See [the site](https://reference.getdrafts.com/objects/Prompt.html) for full descriptions of the options.
     */
    addDatePicker(
        name: string,
        label: string,
        initialDate: Date,
        options?: {
            mode?: 'date' | 'time' | 'dateAndTime'
            minimumDate?: Date
            maximumDate?: Date
            minuteInterval?: number
        }
    ): void

    /**
     * Add a picker to the prompt, with the arguments as below. Picker can contain multiple rows. The `fieldValues` entry for this will be a array of selected index values object.
     * @param name Identifier for the field. This will be used as the key in the `fieldValues` dictionary to access the contents of the field after calling `show()`.
     * @param label User-friendly text label to place next to the field.
     * @param columns The values to display in the picker. Should be an array containing arrays of string values, each sub-array representing a column in the picker. Example two column picker: `[["Item 1", "Item 2"],["Column 2 Item 1", "Column 2 Item 2"]]`
     * @param selectedRows Array of zero-based index values to set the initial selected row in each column.
     */
    addPicker(
        name: string,
        label: string,
        columns: string[][],
        selectedRows: number[]
    ): void

    /**
     * Add a select control. Returns an array of string values in `fieldValues`.
     * @param name Identifier for the field. This will be used as the key in the `fieldValues` dictionary to access the contents of the field after calling `show()`.
     * @param label User-friendly text label to place next to the field.
     * @param values The array of string values that will be available to select.
     * @param selectedValues Array of string values that should be initially selected when the prompt is displayed. All values in this array should match values in the `values` array.
     * @param allowMultiple If `false`, selecting a value will deselect all other values. If `true`, the user may select multiple items.
     */
    addSelect(
        name: string,
        label: string,
        values: string[],
        selectedValues: string[],
        allowMultiple: boolean
    ): void

    /**
     * Add a button to the array of buttons to be displayed. All buttons should be created before calling `show()`.
     * @param name
     * @param value only needed to associate a different value than will be displayed in the button. For example, if you call `prompt.addButton("First Button", 1)`, after calling `prompt.show()` if that button is pressed, the `prompt.buttonPressed` will contain the number value `1`.
     * @param isDefault used to specify a single button which will be pinned to the bottom of the prompt and respond to `cmd + return` as the default button. If only one button is added to a prompt, it is assumed to be the default.
     */
    addButton(name: string, value?: string, isDefault?: boolean): void

    /**
     * Displays the prompt. Returns `true` if the user selected one of the buttons in the buttons array, `false` if the user selected the "Cancel" button. After the dialog has been shown, the `buttonPressed` property will contain the name of the button selected by the user.
     */
    show(): boolean

    static create(): Prompt
}