# Serial Read Line

Read a line of text from the serial port.

```sig
serial.readLine()
```

### ~hint

#### Newline characters

This function expects the line it reads to be terminated with the `\n`
character. If your terminal software does not terminate lines with
`\n`, this function will probably never return a value.


You can override the ``serial.NEW_LINE_DELIMITER`` field to change the newline delimiter.

### ~

## Returns

* a [string](/types/string) containing input from the serial port, such as a response typed by a user

## Example

The following example requests the user's name, then repeats it to greet the user.

```blocks
basic.forever(() => {
    serial.writeLine("What is your name?")
    let answer = serial.readLine();
    serial.writeString("Hello,")
    serial.writeLine(answer)
})
```

## See also

[serial](/device/serial),
[serial write line](/reference/serial/write-line),
[serial write value](/reference/serial/write-value)
