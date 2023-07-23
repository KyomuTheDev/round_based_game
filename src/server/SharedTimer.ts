import { Timer, TimerState } from "@rbxts/timer";

class SharedTimer {
	static timer = new Timer(9999999);
	static title: string;

	static start() {
		if (this.timer.getState() === TimerState.Running) return;

		this.timer.start();
	}

	static stop() {
		if (this.timer.getState() === TimerState.NotRunning || this.timer.getState() === TimerState.Paused) return;

		this.timer.stop();
	}

	static pause() {
		if (this.timer.getState() === TimerState.NotRunning || this.timer.getState() === TimerState.Paused) return;

		this.timer.pause();
	}

	static resume() {
		if (this.timer.getState() === TimerState.NotRunning || this.timer.getState() === TimerState.Paused) return;

		this.timer.resume();
	}

	static setLength(length: number) {
		this.stop();

		this.timer.setLength(length);

		this.start();
	}

	static getTimeLeft() {
		return this.timer.getTimeLeft();
	}

	static runSync() {
		this.stop();
		this.timer.runSync();
	}

	static setTitle(title: string) {
		this.title = title;
	}

	static getTitle() {
		return this.title;
	}
}

export default SharedTimer;
