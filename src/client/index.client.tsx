import Roact from "@rbxts/roact";
import { Players } from "@rbxts/services";
import TimerUI from "client/Roact/TimerUI";
import * as Chrono from "@rbxts/timer";

const localPlayer = Players.LocalPlayer;

const firstElement = (
	<screengui IgnoreGuiInset={true}>
		<TimerUI />
	</screengui>
);

Roact.mount(firstElement, localPlayer.PlayerGui);

print("Timer wait uwu");

const timer = new Chrono.Timer(15);
timer.runSync();

print("Timer wait uwu");
