function Timer(callback, timeInterval, options) {
    this.timeInterval = timeInterval;
    this.callback = callback;
    this.options = options;
    this.started = false;
   
    this.start = () => {
        if (this.started) {
            console.log('Timer already running');
            return;
        }
        
        this.started = true;
        this.startTime = performance.now();
        this.lastTime = this.startTime;
        if (this.options.immediate) {
            this.callback();
        }
        this.frameRequest = requestAnimationFrame(this.run.bind(this));
        console.log('Timer Started');
    }

    this.stop = () => {
        if (!this.started) {
            console.log('Timer not running');
            return;
        }
        
        this.started = false;
        cancelAnimationFrame(this.frameRequest);
        console.log('Timer Stopped');
    }

    this.run = (currentTime) => {
        if (!this.started) return;

        const timeElapsed = currentTime - this.lastTime;
        if (timeElapsed >= this.timeInterval) {
            const drift = timeElapsed - this.timeInterval;
            this.callback();
            this.lastTime = currentTime - drift;

            console.log('Drift:', drift);
            if (drift > this.timeInterval && this.options.errorCallback) {
                this.options.errorCallback();
            }
        }

        this.frameRequest = requestAnimationFrame(this.run.bind(this));
    }
}

export default Timer;
