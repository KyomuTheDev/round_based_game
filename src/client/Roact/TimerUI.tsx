import Maid from "@rbxts/maid";
import Roact from "@rbxts/roact";
import Networking from "client/Networking";
import { RunService } from "@rbxts/services";

const setTimer = Networking.Get("SetTimer");
const getTimer = Networking.Get("GetTimer");

interface Props {}
interface State {
	text: string;
	time: number;
}

function TimerText(props: { text: string; size: UDim2; position: UDim2 }) {
	return (
		<textlabel
			BackgroundTransparency={1}
			Size={props.size}
			Position={props.position}
			AnchorPoint={new Vector2(0.5, 0)}
			TextScaled={true}
			TextColor3={new Color3(1, 1, 1)}
			Text={props.text}
		/>
	);
}

export default class TimerUI extends Roact.Component<Props, State> {
	maid = new Maid();

	public render(): Roact.Element | undefined {
		const state = this.state;

		const timerText = `${math.floor(state.time / 60)}:${math.floor(state.time % 60)}`;

		return (
			<frame
				BackgroundColor3={new Color3(0.08, 0.08, 0.08)}
				BorderSizePixel={2}
				BorderColor3={new Color3(0.05, 0.05, 0.05)}
				Position={new UDim2(0.5, 0, 0, 0)}
				AnchorPoint={new Vector2(0.5, 0)}
				Size={new UDim2(0.11, 0, 0.06, 0)}
			>
				<TimerText text={state.text} size={new UDim2(1, 0, 0.3, 0)} position={new UDim2(0.5, 0, 0, 0)} />
				<TimerText text={timerText} size={new UDim2(1, 0, 0.7, 0)} position={new UDim2(0.5, 0, 0.3, 0)} />
				<uigradient Transparency={new NumberSequence(0, 1)} Rotation={90} />
			</frame>
		);
	}

	SetTimer(title: string, length: number) {
		this.setState({
			text: title,
			time: length,
		});
	}

	constructor(props: Props) {
		super(props);

		this.state = {
			text: "awaiting...",
			time: 180,
		};

		getTimer.CallServerAsync().andThen(
			(timer) => this.SetTimer(timer.title, timer.time),
			() => this.SetTimer("Fixing timer...", 180),
		);

		const netConnection = setTimer.Connect((t, l) => this.SetTimer(t, l));
		const runServiceConnection = RunService.Heartbeat.Connect((dt) =>
			this.setState((prevState) => {
				return {
					time: prevState.time - dt,
				};
			}),
		);
		this.maid.GiveTask(netConnection);
		this.maid.GiveTask(runServiceConnection);
	}
}
