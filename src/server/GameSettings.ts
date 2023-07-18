class WaitTime {
	Time: number;

	Wait() {
		task.wait(this.Time);
	}

	constructor(time: number) {
		this.Time = time;
	}
}

class GameSettings {
	public static IntermissionTime = new WaitTime(15);
	public static RoundTime = new WaitTime(180);
	public static ChoosingTime = new WaitTime(15);
	public static WaitTime = new WaitTime(5);
	public static MaxRounds = 3;
}

export = GameSettings;
