namespace sensors {
    export const enum LightSpectrumRange {
        Full = 10,
        Infrared = 20,
        Visible = 40
    }
    
    export const enum LightSpectrumEvent {
        FullBright = LightSpectrumRange.Full | DAL.LEVEL_THRESHOLD_HIGH,
        FullDark = LightSpectrumRange.Full | DAL.LEVEL_THRESHOLD_LOW,
        InfraredBright = LightSpectrumRange.Infrared | DAL.LEVEL_THRESHOLD_HIGH,
        InfraredDark = LightSpectrumRange.Infrared | DAL.LEVEL_THRESHOLD_LOW,
        VisibleBright = LightSpectrumRange.Visible | DAL.LEVEL_THRESHOLD_HIGH,
        VisibleDark = LightSpectrumRange.Visible | DAL.LEVEL_THRESHOLD_LOW
    }

    
    export class LightSpectrum {
        full: number;
        infrared: number;
        visible: number;
        normalized: number;

        constructor() {
            this.full = -1;
            this.infrared = -1;
            this.visible = -1;
            this.normalized = -1;
        }
    }

    export class LightSpectrumSensor {
        public id: number;
        private reading: boolean;
        private _spectrum: LightSpectrum;
        private normalizedLevelDetector: pins.LevelDetector;

        constructor(id: number) {
            this.id = id;
            this.reading = false;
            this._spectrum = new LightSpectrum();
        }
        protected readSpectrum(): LightSpectrum {
            return new LightSpectrum();
        }
        protected startReading() {
            if (this.reading) return;
            this.reading = true;
            control.runInBackground(() => {
                this.normalizedLevelDetector = new pins.LevelDetector(this.id, 0, 1023, 50, 900);
                this.normalizedLevelDetector.onHigh = () => control.raiseEvent(this.id, LightSpectrumEvent.VisibleBright);
                this.normalizedLevelDetector.onLow = () => control.raiseEvent(this.id, LightSpectrumEvent.VisibleDark);
                while (this.reading) {
                    let spec = this.readSpectrum();
                    if (spec.full != -1 && spec.infrared != -1 && spec.visible != -1) {
                        this._spectrum = spec;
                        this.normalizedLevelDetector.level = spec.normalized;
                    }
                    pause(1);
                }
            });
        }

        spectrum(): LightSpectrum {
            if (!this.reading) {
                this._spectrum = this.readSpectrum();
                this.startReading();
            }
            return this._spectrum;
        }

        onEvent(event: LightSpectrumEvent, handler: () => void): void {
            this.startReading();
            control.onEvent(this.id, event, handler);
        }
    }
}

namespace input {
    let _sensor: sensors.LightSpectrumSensor;
    export function lightSpectrumSensor(): sensors.LightSpectrumSensor {
        if (!_sensor)
            _sensor = new sensors.TSL2591(9980); // TODO
        return _sensor;
    }

    /**
     * Uses a light spectrum sensor to capture the light spectrum range
     */
    //% blockId=sensor_light_spectrum block="light $range spectrum"
    //% group="Light Spectrum Sensor"
    export function lightSpectrum(range: sensors.LightSpectrumRange): number {
        const sensor = lightSpectrumSensor();
        if (sensor) {
            const spectrum = sensor.spectrum();
            if (spectrum) {
                switch (range) {
                    case sensors.LightSpectrumRange.Full: return spectrum.full;
                    case sensors.LightSpectrumRange.Infrared: return spectrum.infrared;
                    case sensors.LightSpectrumRange.Visible: return spectrum.visible;
                }
            }
        }
        return -1;
    }

    /**
     * Register code to run when the light condition changed
     * @param event
     * @param handler
     */
    export function onLightSpectrumConditionChanged(event: sensors.LightSpectrumEvent, handler: () => void): void {
        const sensor = lightSpectrumSensor();
        if (sensor)
            sensor.onEvent(event, handler);
    }
}