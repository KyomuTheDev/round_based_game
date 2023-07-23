import User from "shared/User";

class UserService {
	private static users = new Map<Player, User>();

	static CreateUser(player: Player): User {
		const user = new User(player);

		this.users.set(player, user);

		return user;
	}

	static GetUser(player: Player): User | undefined {
		return this.users.get(player);
	}

	static RemoveUser(player: Player): void {
		this.users.delete(player);
	}

	static GetUsers(): Map<Player, User> {
		return this.users;
	}
}

export default UserService;
