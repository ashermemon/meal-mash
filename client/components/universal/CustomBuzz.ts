import { Vibration } from 'react-native';

export function timedBuzz(durationInSeconds: number) {

    Vibration.cancel();
    const PATTERN = [0, 200, 400, 200];
    Vibration.vibrate(PATTERN, true);

    setTimeout(() => {
        Vibration.cancel();
    }, durationInSeconds * 1000);
};