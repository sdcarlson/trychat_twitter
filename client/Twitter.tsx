import React, { useRef, useState } from 'react';
import TweetEmbed from 'react-tweet-embed';
import { PinButton } from './shared/PinButton';
import { TextField } from '@material-ui/core';

interface ITwitterProps {
	pinTweet: (id: string) => void; //need to change type
	updateIsTyping: (isTyping: boolean) => void;
}

export const Twitter = ({
	updateIsTyping,
	pinTweet
}: ITwitterProps) => {

	//   const classes = useStyles();

	const [chatValue, setChatValue] = useState('');
	const textfieldRef = useRef<HTMLDivElement>(null);

	const onChangeChat = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChatValue(event.target.value);

		if (!!event.target.value !== !!chatValue) {
			updateIsTyping(!!event.target.value);
		}
	};


	const onPinTweet = () => {
		pinTweet(chatValue.split("/")[5]);
		clearMessage();
	};

	const clearMessage = () => {
		setChatValue('');
		updateIsTyping(false);
	};

	const onFocus = () => {
		if (window.innerWidth < 500 && textfieldRef.current) {
			const offsetTop = textfieldRef.current.offsetTop;
			document.body.scrollTop = offsetTop;
		}
	};

	return (
		<div
		// className={classes.container}
		>
			<TextField
				autoFocus={window.innerWidth > 500}
				ref={textfieldRef}
				placeholder="paste your tweet link here"
				variant="outlined"
				value={chatValue}
				onChange={onChangeChat}
				//className={classes.input}
				onFocus={onFocus}
			/>
			<PinButton onPin={onPinTweet} isPinned={false} onUnpin={() => { }} />
		</div>
	);
};

export default Twitter;