namespace pxsim {
    export interface RadioBoard extends EventBusBoard {
        radioState: RadioState;
    }

    export function getRadioState() {
        return (board() as any as RadioBoard).radioState;
    }

    export interface PacketBuffer {
        payload: SimulatorRadioPacketPayload;
        rssi: number;
        serial: number;
        time: number;
    }

    // Extends interface in pxt-core
    export interface SimulatorRadioPacketPayload {
        bufferData?: Uint8Array;
    }

    export interface RadioDAL {
        ID_RADIO: number;
        RADIO_EVT_DATAGRAM: number;
    }

    export class RadioDatagram {
        datagram: PacketBuffer[] = [];
        lastReceived: PacketBuffer = RadioDatagram.defaultPacket();
        // this value is unset until the user decide to set the RSSI via the simulator UI
        private _rssi: number;

        constructor(private runtime: Runtime, public dal: RadioDAL) {
            this._rssi = undefined; // not set yet
        }

        get rssi() {
            return this._rssi;
        }

        set rssi(value: number) {
            this._rssi = value | 0;
        }

        queue(packet: PacketBuffer) {
            if (this.datagram.length < 4)
                this.datagram.push(packet);
            (<EventBusBoard>runtime.board).bus.queue(this.dal.ID_RADIO, this.dal.RADIO_EVT_DATAGRAM);
        }

        send(payload: SimulatorRadioPacketPayload) {
            const state = getRadioState();
            Runtime.postMessage(<SimulatorRadioPacketMessage>{
                type: "radiopacket",
                broadcast: true,
                rssi: this._rssi || -75,
                serial: state.transmitSerialNumber ? pxsim.control.deviceSerialNumber() : 0,
                time: new Date().getTime(),
                payload
            })
        }

        recv(): PacketBuffer {
            let r = this.datagram.shift();
            if (!r) r = RadioDatagram.defaultPacket();
            return this.lastReceived = r;
        }

        onReceived(handler: RefAction) {
            pxtcore.registerWithDal(this.dal.ID_RADIO, this.dal.RADIO_EVT_DATAGRAM, handler);
            this.recv();
        }

        private static defaultPacket(): PacketBuffer {
            return {
                rssi: -1,
                serial: 0,
                time: 0,
                payload: { type: -1, groupId: 0, bufferData: new Uint8Array(0) }
            };
        }
    }

    export class RadioState {
        power = 0;
        transmitSerialNumber = false;
        datagram: RadioDatagram;
        groupId: number;
        band: number;
        enable: boolean;

        constructor(private readonly runtime: Runtime, private readonly board: BaseBoard, dal: RadioDAL) {
            this.datagram = new RadioDatagram(runtime, dal);
            this.power = 6; // default value
            this.groupId = 0;
            this.band = 7; // https://github.com/lancaster-university/microbit-dal/blob/master/inc/core/MicroBitConfig.h#L320
            this.enable = true;
            this.board.addMessageListener(this.handleMessage.bind(this))
        }

        private handleMessage(msg: SimulatorMessage) {
            if (msg.type == "radiopacket") {
                let packet = <SimulatorRadioPacketMessage>msg;
                this.receivePacket(packet);
            }
        }

        public setGroup(id: number) {
            if (this.enable) {
                this.groupId = id & 0xff; // byte only
            }
        }

        setTransmitPower(power: number) {
            if (this.enable) {
                power = power | 0;
                this.power = Math.max(0, Math.min(7, power));
            }
        }

        setTransmitSerialNumber(sn: boolean) {
            this.transmitSerialNumber = !!sn;
        }

        setFrequencyBand(band: number) {
            if (this.enable) {
                band = band | 0;
                if (band < 0 || band > 83) return;
                this.band = band;
            }
        }

        off() {
           this.enable = false;
        }

        on() {
            this.enable = true;
         }
 
        raiseEvent(id: number, eventid: number) {
            if (this.enable) {
                Runtime.postMessage(<SimulatorEventBusMessage>{
                    type: "eventbus",
                    broadcast: true,
                    id,
                    eventid,
                    power: this.power,
                    group: this.groupId
                })
            }
        }

        receivePacket(packet: SimulatorRadioPacketMessage) {
            if (this.enable) {
                if (this.groupId == packet.payload.groupId) {
                    this.datagram.queue(packet)
               }
            }
        }
    }
}

