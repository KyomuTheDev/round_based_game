interface User extends Player {
	Instance: Player;
	Gold: number;
	Diamonds: number;
	Level: number;
	Experience: number;

	GetNetworkPing(): number;
}

interface UserConstructor {
	new (instance: Player): User;
}

declare const User: UserConstructor;

export = User;
