// Run in locally built PXT project, with clipboard containing output of (gdb) x/40x $sp or so
let fs = require("fs")
let child_process = require("child_process")
let lineNo = 0
let addresses = {}
let fn = ""
let src = ""
let vm = false
for (let line of fs.readFileSync("built/binary.asm", "utf8").split(/\n/)) {
    lineNo++
    let m = /; (0x[a-f0-9]+)/.exec(line)
    if (m) {
        let addr = parseInt(m[1], 0)
        addresses[addr] = fn + " " + src + " @  vi +" + lineNo + " built/binary.asm  / " + line
    }

    if (/^; VM start/.test(line))
        vm = true

    m = /; Function (.*)/.exec(line)
    if (m) fn = m[1]

    m = /; Proc: (.*)/.exec(line)
    if (m) src = m[1]

    m = /^; (\S+\(.*\): .*)/.exec(line)
    if (m) src = m[1]

    if (/^; endfun/.test(line))
        fn = ""
}

let pref = "built/dockercodal"
if (!fs.existsSync(pref)) {
    pref = "built/codal"
}
pref += "/build"
let mapFn = ""

try {
    for (let fn of fs.readdirSync(pref)) {
        if (fn.endsWith(".map"))
            mapFn = pref + "/" + fn
    }
} catch (e) { }

if (!mapFn) {
    mapFn = "built/yt/build/bbc-microbit-classic-gcc/source/pxt-microbit-app.map"
    if (!fs.existsSync(mapFn)) mapFn = ""
}

if (mapFn) {
    let inText = false
    let addrBeg = 0
    let addrSz = 0
    for (let line of fs.readFileSync(mapFn, "utf8").split(/\n/)) {
        let m = /^\s*(0x[0-9a-f]+)\s+(0x[0-9a-f]+)\s+(.*\.o)/.exec(line)
        if (inText && m) {
            addrBeg = parseInt(m[1], 16)
            addrSz = parseInt(m[2])
        } else {
            m = /^\s*(0x[0-9a-f]+)\s+(.*)/.exec(line)
            if (addrBeg && m) {
                for (let i = 0; i < addrSz; i += 2) {
                    let addr = addrBeg + i
                    addresses[addr] = `${m[2]} @${i}`
                }
                addrSz = 0
                addrBeg = 0
            }
        }
        inText = false
        if (line.startsWith(" .text."))
            inText = true
    }
}

function processAddr(k) {
    let ok = false
    let offlist = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4]
    if (vm) offlist = [-2, -4, -6, 0, 2, 4]
    for (const off of offlist) {
        if (addresses[k + off]) {
            console.log(`0x${k.toString(16)} - ${addresses[k + off]}`)
            ok = true
            break
        }
    }
    if (!ok)
        console.log(`0x${k.toString(16)}`)
}

let stack = child_process.execSync("pbpaste", {
    encoding: "utf8"
})
for (let line of stack.split(/\n/)) {
    let m = /^0x[a-f0-9]+[^:]*:\s+(.*)/.exec(line)
    if (m) {
        for (let w of m[1].split(/\s+/)) {
            let k = parseInt(w, 0)
            if (k < k) continue
            processAddr(k)
        }
    } else {
        m = /^  (0x[a-f0-9]+)$/i.exec(line)
        if (m) processAddr(parseInt(m[1], 0))
    }
}
