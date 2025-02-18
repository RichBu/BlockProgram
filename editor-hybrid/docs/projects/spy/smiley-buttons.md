# Smiley Buttons

### @explicitHints true

## Introduction @unplugged

Code the buttons on the @boardname@ to show that it's happy or sad.
(Want to learn how the buttons works? [Watch this video](https://youtu.be/t_Qujjd_38o)).

![Pressing the A and B buttons](/static/mb/projects/smiley-buttons/sim.gif)

## Step 1

Put in an ``||input:on button pressed||`` event to run code when button **A** is pressed.

```spy
input.onButtonPressed(Button.A, function() { 
})
```

## Step 2

Use ``||basic:show icon||`` to display a **Happy** face on the screen.

Press the **A** button in the simulator to see the smiley.

```spy
input.onButtonPressed(Button.A, function() { 
    basic.showIcon(IconNames.Happy)
})
```

## Step 3

Use another ``||input:on button pressed||`` with a ``||basic:show icon||`` inside to display a **Sad** face when button **B** is pressed.

```spy
input.onButtonPressed(Button.B, function() { 
    basic.showIcon(IconNames.Sad)
})
```

## Step 4

Add a secret mode that happens when **A** and **B** are pressed together. For this case, use ``||basic:show icon||`` multiple times to create an animation.

```spy
input.onButtonPressed(Button.AB, function() {
    basic.showIcon(IconNames.Silly)
    basic.showIcon(IconNames.Surprised)
})
```

## Step 5

Click ``|Download|`` to transfer your code to your @boardname@ (if you have one). Try buttons **A**, **B** and then **A** and **B** together.

## Step 6

If you have a @boardname@ connected, click ``|Download|`` and transfer your code to the @boardname@!
