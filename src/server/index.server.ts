import Game from "./Game";

const normalGame = new Game();

let quit = false;

function MainLoop() {
	while (!quit) {
		normalGame.Intermission();
		normalGame.ChooseMap();
		normalGame.ChooseGamemode();
		normalGame.ChooseAttributes();
		normalGame.Start();
	}
}

game.BindToClose(() => (quit = true));

MainLoop();
