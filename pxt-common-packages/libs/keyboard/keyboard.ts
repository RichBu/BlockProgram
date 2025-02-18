
const enum KeyboardMediaKey
{
    //% block="mute"
    Mute,
    //% block="volume up"
    VolumeUp,
    //% block="volume down"
    VolumeDown,
    //% block="play pause"
    PlayPause,
    //% block="stop"
    Stop,
    //% block="previous track"
    PreviousTrack,
    //% block="next track"
    NextTrack,
    //% block="mail"
    Mail,
    //% block="calculator"
    Calculator,
    //% block="web search"
    WebSearch,
    //% block="web home"
    WebHome,
    //% block="web favourites"
    WebFavourites,
    //% block="web refresh"
    WebRefresh,
    //% block="web stop"
    WebStop,
    //% block="web forward"
    WebForward,
    //% block="web back"
    WebBack
}

const enum KeyboardFunctionKey
{
    //% block="F1"
    F1Key = DAL.KEY_F1,  
    //% block="F2"
    F2Key = DAL.KEY_F2,
    //% block="F3"
    F3Key = DAL.KEY_F3,
    //% block="F4"
    F4Key = DAL.KEY_F4, 
    //% block="F5"
    F5Key = DAL.KEY_F5,
    //% block="F6"
    F6Key = DAL.KEY_F6,
    //% block="F7"
    F7Key = DAL.KEY_F7,
    //% block="F8"
    F8Key = DAL.KEY_F8,
    //% block="F9"
    F9Key = DAL.KEY_F9,
    //% block="F0"
    F10Key = DAL.KEY_F10,
    //% block="F11"
    F11Key = DAL.KEY_F11,
    //% block="F12"
    F12Key = DAL.KEY_F12,
    //% block="F13"
    F13Key = DAL.KEY_F13,
    //% block="F14"
    F14Key = DAL.KEY_F14,
    //% block="F15"
    F15Key = DAL.KEY_F15,
    //% block="F16"
    F16Key = DAL.KEY_F16,
    //% block="F17"
    F17Key = DAL.KEY_F17,
    //% block="F18"
    F18Key = DAL.KEY_F18,
    //% block="F19"
    F19Key = DAL.KEY_F19,
    //% block="F20"
    F20Key = DAL.KEY_F20,
    //% block="F21"
    F21Key = DAL.KEY_F21,
    //% block="F22"
    F22Key = DAL.KEY_F22,
    //% block="F23"
    F23Key = DAL.KEY_F23,
    //% block="F24"
    F24Key = DAL.KEY_F24,

    //% block="enter"
    Enter = DAL.KEY_ENTER,
    //% block="esc"
    Esc = DAL.KEY_ESC,
    //% block="backspace"
    Backspace = DAL.KEY_BACKSPACE,
    //% block="tab"
    Tab = DAL.KEY_TAB,
    //% block="caps lock"
    CapsLock = DAL.KEY_CAPSLOCK,
    //% block="num lock"
    NumLock = DAL.KEY_NUMLOCK,
    //% block="keypad /"
    KeypadSlash = DAL.KEY_KPSLASH,
    //% block="keypad *"
    KeypadAsterisk = DAL.KEY_KPASTERISK,
    //% block="keypad -"
    KeypadMinus = DAL.KEY_KPMINUS,
    //% block="keypad +"
    KeypadPlus = DAL.KEY_KPPLUS,
    //% block="keypad enter"
    KeypadEnter = DAL.KEY_KPENTER,
    //% block="keypad 1"
    Keypad1 = DAL.KEY_KP1,
    //% block="keypad 2"
    Keypad2 = DAL.KEY_KP2,
    //% block="keypad 3"
    Keypad3 = DAL.KEY_KP3,
    //% block="keypad 4"
    Keypad4 = DAL.KEY_KP4,
    //% block="keypad 5"
    Keypad5 = DAL.KEY_KP5,
    //% block="keypad 6"
    Keypad6 = DAL.KEY_KP6,
    //% block="keypad 7"
    Keypad7 = DAL.KEY_KP7,
    //% block="keypad 8"
    Keypad8 = DAL.KEY_KP8,
    //% block="keypad 9"
    Keypad9 = DAL.KEY_KP9,
    //% block="keypad 0"
    Keypad0 = DAL.KEY_KP0,
    //% block="keypad ."
    KeypadDot = DAL.KEY_KPDOT,
    //% block="compose"
    Compose = DAL.KEY_COMPOSE,
    //% block="power"
    Power = DAL.KEY_POWER,
    //% block="="
    KeypadEqual = DAL.KEY_KPEQUAL,
    //% block="open"
    Open = DAL.KEY_OPEN,
    //% block="help"
    Help = DAL.KEY_HELP,
    //% block="props"
    Props = DAL.KEY_PROPS,
    //% block="front"
    Front = DAL.KEY_FRONT,
    //% block="stop"
    Stop = DAL.KEY_STOP,
    //% block="again"
    Again = DAL.KEY_AGAIN,
    //% block="undo"
    Undo = DAL.KEY_UNDO,
    //% block="cut"
    Cut = DAL.KEY_CUT,
    //% block="copy"
    Copy = DAL.KEY_COPY,
    //% block="paste"
    Paste = DAL.KEY_PASTE,
    //% block="find"
    Find = DAL.KEY_FIND,
    //% block="mute"
    Mute = DAL.KEY_MUTE,
    //% block="volume up"
    VolumeUp = DAL.KEY_VOLUMEUP,
    //% block="volume down"
    VolumeDown = DAL.KEY_VOLUMEDOWN,
    //% block="keypad ,"
    KeypadComma = DAL.KEY_KPCOMMA,
    //% block="keypad jump comma"
    KeypadJumpComma = DAL.KEY_KPJPCOMMA,
    //% block="keypad ("
    KeypadLeftParenthesis = DAL.KEY_KPLEFTPAREN,
    //% block="keypad )"
    KeypadRightParenthesis = DAL.KEY_KPRIGHTPAREN,

    //% block="print screen"
    PrintScreen = DAL.KEY_SYSRQ,
    //% block="scroll lock"
    ScrollLock = DAL.KEY_SCROLLLOCK,
    //% block="pause"
    Pause = DAL.KEY_PAUSE,
    //% block="insert"
    Insert = DAL.KEY_INSERT,
    //% block="home"
    Home = DAL.KEY_HOME,
    //% block="page up"
    PageUp = DAL.KEY_PAGEUP,
    //% block="delete"
    DeleteForward = DAL.KEY_DELETE,
    //% block="end"
    End = DAL.KEY_END,
    //% block="page down"
    PageDown = DAL.KEY_PAGEDOWN,

    //% block="right arrow"
    RightArrow = DAL.KEY_RIGHT,
    //% block="left arrow"
    LeftArrow = DAL.KEY_LEFT,
    //% block="down arrow"
    DownArrow = DAL.KEY_DOWN,
    //% block="up arrow"
    UpArrow = DAL.KEY_UP
}

const enum KeyboardModifierKey {
    //% block="Ctrl"
    Control = DAL.KEY_MOD_LCTRL,
    //% block="Shift"
    Shift = DAL.KEY_MOD_LSHIFT,
    //% block="Alt"
    Alt = DAL.KEY_MOD_LALT,
    //% block="Command"
    Meta = DAL.KEY_MOD_LMETA,
    //% block="Ctrl+Shift"
    ControlShift = Control | Shift,
    //% block="Ctrl+Alt"
    ControlAlt = Control | Alt,
    //% block="Shift+Alt"
    ShiftAlt = Shift | Alt,
    //% block="Ctrl+Cmd"
    ControlCommand = Control | Meta,
    //% block="Ctrl+Cmd"
    ShiftCommand = Shift | Meta,
    //% block="Alt+Cmd"
    AltCommand = Alt | Meta,
    //% block="Ctrl+Shift+Alt"
    ControlShiftAlt = Control | Shift | Alt,
    //% block="Ctrl+Cmd+Shift+Alt"
    ControlCommandShiftAlt = Control | Meta | Shift | Alt,
    //% block="Right Ctrl"
    RightControl = DAL.KEY_MOD_RCTRL,
    //% block="Right Shift"
    RightShift = DAL.KEY_MOD_RSHIFT,
    //% block="Right Alt"
    RightAlt = DAL.KEY_MOD_RALT,
    //% block="Right Command"
    RightMeta = DAL.KEY_MOD_RMETA
}

/**
 * Keyboard emulation
 */
//% icon="\uf11c" color="#303030"
namespace keyboard {
    /**
    * Send a sequence of keystrokes to the keyboard
    */
    //% blockId=keyboardType block="keyboard type $text||with $modifiers"
    //% blockGap=8 weight=100
    //% text.shadowOptions.toString=true
    //% help=keyboard/type
    //% weight=100
    export function type(text: string, modifiers?: KeyboardModifierKey) {
        if (modifiers)
            __modifierKey(modifiers, KeyboardKeyEvent.Down);
        __type(text);
        __flush();
    }

    /**
    * Send a key command
    */
    //% blockId=keyboardStandardKey block="keyboard key %key|%event"
    //% blockGap=8 weight=99
    //% help=keyboard/key
    export function key(key: string, event: KeyboardKeyEvent) {
        if (!key) return;
        const c = key.charCodeAt(0);
        __key(c, event);
    }

    /**
    * Send a media key command
    */
    //% blockId=keyboardMediaKey block="keyboard media %key|%event"
    //% blockGap=8
    //% help=keyboard/media-key
    export function mediaKey(key: KeyboardMediaKey, event: KeyboardKeyEvent) {
        __mediaKey(key, event);
    }

    /**
    * Send a function key command
    */
    //% blockId=keyboardFunctionKey block="keyboard function %key|%event"
    //% blockGap=8
    //% help=keyboard/function-key
    export function functionKey(key: KeyboardFunctionKey, event: KeyboardKeyEvent) {
        __functionKey(key, event)
    }

    /**
    * Send a modifier key command
    */
    //% blockId=keyboardModiferKey block="keyboard modifier %key|%event"
    //% blockGap=8
    //% help=keyboard/modifier-key
    export function modifierKey(key: KeyboardModifierKey, event: KeyboardKeyEvent) {
        __modifierKey(key, event)
    }

    /**
     * Send up commands for any remaning down keys
     */
    //% blockId=keyboardClear block="keyboard clear all"
    //% blockGap=8
    //% help=keyboard/clear-all-keys
    //% weight=10
    export function clearAllKeys() {
        __flush()
    }
}