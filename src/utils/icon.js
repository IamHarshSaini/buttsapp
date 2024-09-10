import Image from "next/image";

export const Chat = ({ height, width, onClick, color }) => {
	return (
		<Image
			src="/icons/chat.svg"
			height={height || "24px"}
			width={width || "24px"}
			alt="chat"
			onClick={() => {
				if (onClick) {
					onClick();
				}
			}}
		/>
	);
};

export const Attachment = ({ height, width, onClick, color }) => {
	return (
		<Image
			src="/icons/attachment.svg"
			height={height || "24px"}
			width={width || "24px"}
			alt="attachment"
			onClick={() => {
				if (onClick) {
					onClick();
				}
			}}
		/>
	);
};

export const Camera = ({ height, width, onClick, color }) => {
	return (
		<Image
			src="/icons/camera.svg"
			height={height || "24px"}
			width={width || "24px"}
			alt="camera"
			onClick={() => {
				if (onClick) {
					onClick();
				}
			}}
		/>
	);
};

export const Emoji = ({ height, width, onClick, color }) => {
	return (
		<Image
			src="/icons/emoji.svg"
			height={height || "24px"}
			width={width || "24px"}
			alt="emoji"
			onClick={() => {
				if (onClick) {
					onClick();
				}
			}}
		/>
	);
};

export const Filter = ({ height, width, onClick, color }) => {
	return (
		<Image
			src="/icons/filter.svg"
			height={height || "24px"}
			width={width || "24px"}
			alt="filter"
			onClick={() => {
				if (onClick) {
					onClick();
				}
			}}
		/>
	);
};

export const Group = ({ height, width, onClick, color }) => {
	return (
		<Image
			src="/icons/group.svg"
			height={height || "24px"}
			width={width || "24px"}
			alt="group"
			onClick={() => {
				if (onClick) {
					onClick();
				}
			}}
		/>
	);
};

export const Mic = ({ height, width, onClick, color }) => {
	return (
		<Image
			src="/icons/mic.svg"
			height={height || "24px"}
			width={width || "24px"}
			alt="mic"
			onClick={() => {
				if (onClick) {
					onClick();
				}
			}}
		/>
	);
};

export const More = ({ height, width, onClick, color }) => {
	return (
		<Image
			src="/icons/more.svg"
			height={height || "24px"}
			width={width || "24px"}
			alt="more"
			onClick={() => {
				if (onClick) {
					onClick();
				}
			}}
		/>
	);
};

export const Phone = ({ height, width, onClick, color }) => {
	return (
		<Image
			src="/icons/phone.svg"
			height={height || "24px"}
			width={width || "24px"}
			alt="phone"
			onClick={() => {
				if (onClick) {
					onClick();
				}
			}}
		/>
	);
};

export const Search = ({ height, width, onClick, color }) => {
	return (
		<Image
			src="/icons/search.svg"
			height={height || "24px"}
			width={width || "24px"}
			alt="search"
			onClick={() => {
				if (onClick) {
					onClick();
				}
			}}
		/>
	);
};

export const Status = ({ height, width, onClick, color }) => {
	return (
		<Image
			src="/icons/status.svg"
			height={height || "24px"}
			width={width || "24px"}
			alt="status"
			onClick={() => {
				if (onClick) {
					onClick();
				}
			}}
		/>
	);
};

export const Video = ({ height, width, onClick, color }) => {
	return (
		<Image
			src="/icons/video.svg"
			height={height || "24px"}
			width={width || "24px"}
			alt="video"
			onClick={() => {
				if (onClick) {
					onClick();
				}
			}}
		/>
	);
};

