#include "pxt.h"

/*

These button events need CODAL work.

    // % block="double click"
    DoubleClick = DEVICE_BUTTON_EVT_DOUBLE_CLICK,

    // % block="hold"
    Hold = DEVICE_BUTTON_EVT_HOLD

*/

/**
 * User interaction on buttons
 */
enum class ButtonEvent {
    //% block="click"
    Click = DEVICE_BUTTON_EVT_CLICK,
    //% block="long click"
    LongClick = DEVICE_BUTTON_EVT_LONG_CLICK,
    //% block="up"
    Up = DEVICE_BUTTON_EVT_UP,
    //% block="down"
    Down = DEVICE_BUTTON_EVT_DOWN
};

namespace pxt {
//%
Button *getButtonByPin(int pin, int flags) {
    unsigned highflags = (unsigned)pin >> 16;
    if (highflags & 0xff)
        flags = highflags & 0xff;

    pin &= 0xffff;

    auto cpid = DEVICE_ID_FIRST_BUTTON + pin;
    auto btn = (Button *)lookupComponent(cpid);
    if (btn == NULL) {
        auto pull = PullMode::None;
        if ((flags & 0xf0) == 0x10)
            pull = PullMode::Down;
        else if ((flags & 0xf0) == 0x20)
            pull = PullMode::Up;
        else if ((flags & 0xf0) == 0x30)
            pull = PullMode::None;
        else
            oops(3);
        // GCTODO
        btn = new Button(*lookupPin(pin), cpid, DEVICE_BUTTON_ALL_EVENTS,
                                 (ButtonPolarity)(flags & 0xf), pull);
    }
    return btn;
}

//%
Button *getButtonByPinCfg(int key, int flags) {
    int pin = getConfig(key);
    if (pin == -1)
        soft_panic(PANIC_NO_SUCH_CONFIG);
    return getButtonByPin(pin, flags);
}

MultiButton *getMultiButton(int id, int pinA, int pinB, int flags) {
    auto btn = (MultiButton *)lookupComponent(id);
    if (btn == NULL) {
        auto bA = getButtonByPin(pinA, flags);
        auto bB = getButtonByPin(pinB, flags);
        // GCTODO
        btn = new MultiButton(bA->id, bB->id, id);

        // A user has registered to receive events from the buttonAB multibutton.
        // Disable click events from being generated by ButtonA and ButtonB, and defer the
        // control of this to the multibutton handler.
        //
        // This way, buttons look independent unless a buttonAB is requested, at which
        // point button A+B clicks can be correclty handled without breaking
        // causal ordering.
        bA->setEventConfiguration(DEVICE_BUTTON_SIMPLE_EVENTS);
        bB->setEventConfiguration(DEVICE_BUTTON_SIMPLE_EVENTS);
        btn->setEventConfiguration(DEVICE_BUTTON_ALL_EVENTS);
    }
    return btn;
}

// This is for A, B, and AB
//%
AbstractButton *getButton(int id) {
    int pa = getConfig(CFG_PIN_BTN_A);
    int pb = getConfig(CFG_PIN_BTN_B);
    int flags = getConfig(CFG_DEFAULT_BUTTON_MODE, BUTTON_ACTIVE_LOW_PULL_UP);
    if (id == 0)
        return getButtonByPin(pa, flags);
    else if (id == 1)
        return getButtonByPin(pb, flags);
    else if (id == 2)
        return getMultiButton(DEVICE_ID_BUTTON_AB, pa, pb, flags);
    else {
        soft_panic(PANIC_INVALID_ARGUMENT);
        return NULL;
    }
}

} // namespace pxt

namespace DigitalInOutPinMethods {

/**
 * Get the push button (connected to GND) for given pin
 */
//%
Button_ pushButton(DigitalInOutPin pin) {
    return pxt::getButtonByPin(pin->name, BUTTON_ACTIVE_LOW_PULL_UP);
}

} // namespace DigitalInOutPinMethods

//% noRefCounting fixedInstances
namespace ButtonMethods {
/**
 * Do something when a button (`A`, `B` or both `A` + `B`) is clicked, double clicked, etc...
 * @param button the button that needs to be clicked or used
 * @param event the kind of button gesture that needs to be detected
 * @param body code to run when the event is raised
 */
//% help=input/button/on-event
//% blockId=buttonEvent block="on %button|%event"
//% blockNamespace=input
//% button.fieldEditor="gridpicker"
//% button.fieldOptions.width=220
//% button.fieldOptions.columns=3
//% weight=96 blockGap=12
//% trackArgs=0
void onEvent(Button_ button, ButtonEvent ev, Action body) {
    registerWithDal(button->id, (int)ev, body);
}

/**
 * Check if a button is pressed or not.
 * @param button the button to query the request
 */
//% help=input/button/is-pressed
//% block="%button|is pressed"
//% blockId=buttonIsPressed
//% blockNamespace=input
//% button.fieldEditor="gridpicker"
//% button.fieldOptions.width=220
//% button.fieldOptions.columns=3
//% weight=50 blockGap=8
//% trackArgs=0
bool isPressed(Button_ button) {
    return button->isPressed();
}

/**
 * See if the button was pressed again since the last time you checked.
 * @param button the button to query the request
 */
//% help=input/button/was-pressed
//% block="%button|was pressed"
//% blockId=buttonWasPressed
//% blockNamespace=input
//% button.fieldEditor="gridpicker"
//% button.fieldOptions.width=220
//% button.fieldOptions.columns=3
//% group="More" weight=46 blockGap=8
//% trackArgs=0
bool wasPressed(Button_ button) {
    return button->wasPressed();
}

/**
 * Gets the component identifier for the button
 */
//%
int id(Button_ button) {
    return button->id;
}

} // namespace ButtonMethods
