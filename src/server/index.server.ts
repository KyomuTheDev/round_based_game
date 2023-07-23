import Game from "server/Game";
import Network from "server/Networking";
import SharedTimer from "./SharedTimer";

const normalGame = new Game();

const getTimer = Network.Get("GetTimer");

let quit = false;

function GetTimer(): { title: string; time: number } {
	return { title: SharedTimer.title, time: SharedTimer.getTimeLeft() };
}

function MainLoop() {
	while (!quit) {
		normalGame.Intermission();
		normalGame.ChooseMap();
		normalGame.ChooseGamemode();
		normalGame.ChooseAttribute();
		normalGame.Start();
	}
}

game.BindToClose(() => (quit = true));
getTimer.SetCallback(() => GetTimer());

MainLoop();
