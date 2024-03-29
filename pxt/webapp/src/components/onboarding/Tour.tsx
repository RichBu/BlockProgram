import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { TeachingBubble } from "../../../../react-common/components/controls/TeachingBubble";

export interface TourProps {
    onClose: () => void;
    tourSteps: pxt.tour.BubbleStep[];
}

export const Tour = (props: TourProps) => {
    const { onClose, tourSteps } = props;
    const [currentStep, setCurrentStep] = useState(0);
    const tourStartTime = useRef(Date.now());
    const stepStartTime = useRef(Date.now());

    useEffect(() => {
        stepStartTime.current = Date.now();
    }, [currentStep]);

    const getTourDuration = () => {
        return ((Date.now() - tourStartTime.current) / 1000).toFixed(1) + "s";
    }

    const getStepDuration = () => {
        return ((Date.now() - stepStartTime.current) / 1000).toFixed(1) + "s";
    }

    const data = () => ({
        title: tourSteps[currentStep].title,
        stepDuration: getStepDuration(),
        tourDuration: getTourDuration(),
        step: currentStep + 1,
        totalSteps: tourSteps.length
    });

    const onNext = () => {
        pxt.tickEvent("tour.next", data());
        setCurrentStep(currentStep + 1);
    };

    const onBack = () => {
        pxt.tickEvent("tour.back", data());
        setCurrentStep(currentStep - 1);
    };

    const onExit = () => {
        pxt.tickEvent("tour.exit", data());
        onClose();
    }

    const onFinish = () => {
        pxt.tickEvent("tour.finish", data());
        onClose();
    }

    return <TeachingBubble id="teachingBubble"
        targetContent={tourSteps[currentStep]}
        onNext={onNext}
        onBack={onBack}
        stepNumber={currentStep + 1}
        totalSteps={tourSteps.length - 1}
        onClose={onExit}
        onFinish={onFinish}
    />
};