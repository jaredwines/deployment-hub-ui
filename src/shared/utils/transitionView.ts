export const transitionView = (updateCb: () => void) => {
    // @ts-ignore
    if (document.startViewTransition) {
        // @ts-ignore
        document.startViewTransition(updateCb);
    } else {
        updateCb();
    }
};