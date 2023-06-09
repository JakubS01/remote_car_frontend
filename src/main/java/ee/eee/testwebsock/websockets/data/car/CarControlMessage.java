package ee.eee.testwebsock.websockets.data.car;

import lombok.*;

@Data
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CarControlMessage<T> {
	private CarControlMessageType type;
	private T data;

	public enum CarControlMessageType {
		CONTROL_MESSAGE,
		CONFIG_MESSAGE,

		INFO_MESSAGE,
		DISPLAY_MESSAGE
	}
}
