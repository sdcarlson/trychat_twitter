import { makeStyles } from '@material-ui/core';
import {
	IChatRoom,
	IEmojiDict,
	ITowerDefenseState,
	PanelItemEnum
} from '../types';
import React, { useState } from 'react';
// import { Profile } from '../routes/Profile';

import AnimationPanel from './AnimationPanel';
import BackgroundPanel from './BackgroundPanel';
import { Chat } from './Chat';
import { Drawer } from '@material-ui/core';
import { EmailPanel } from './EmailPanel';
import EmojiPanel from './EmojiPanel';
import { Gifs } from './Gifs';
import { IGif } from '@giphy/js-types';
import { IImagesState } from './BackgroundPanel';
import { RoomDirectoryPanel } from './RoomDirectoryPanel';
import { SettingsPanel } from './SettingsPanel';
import SoundPanel from './SoundPanel';
import { TowerDefensePanel } from './TowerDefensePanel';
import { Weather } from './Weather';
import { MapsPanel } from './MapsPanel';
import WhiteboardPanel from './WhiteboardPanel';
import { Poem } from './Poem';
import { NFTPanel } from './NFT/NFTPanel';
import { ISubmit } from './NFT/OrderInput';
import { Twitter } from './Twitter';


export interface IBottomPanelProps {
	bottomPanelRef: React.RefObject<HTMLDivElement>;
	isOpen: boolean;
	type?: PanelItemEnum;
	setBrushColor: (color: string) => void;
	onAction: (key: string, ...args: any[]) => void;
	towerDefenseState: ITowerDefenseState;
	updateIsTyping: (isTyping: boolean) => void;
	onNFTError: (message: string) => void;
	onNFTSuccess: (submssion: ISubmit) => void;
	roomData?: IChatRoom;
}

export interface IPanelContentProps {
	type?: PanelItemEnum;
	setBrushColor: (color: string) => void;
	onAction: (key: string, ...args: any[]) => void;
	towerDefenseState: ITowerDefenseState;
	updateIsTyping: (isTyping: boolean) => void;
	images: IImagesState[];
	setImages: React.Dispatch<React.SetStateAction<IImagesState[]>>;
	onNFTError: (message: string) => void;
	onNFTSuccess: (submssion: ISubmit) => void;
	roomData?: IChatRoom;
}

export interface ISoundPairs {
	icon: string;
	type: string;
	category: string;
}

const useStyles = makeStyles((theme) => ({
	drawerRoot: {
		width: 'calc(100vw - 85px)',
		marginLeft: 85
	}
}));

export const BottomPanel = ({
	bottomPanelRef,
	isOpen,
	type,
	setBrushColor,
	onAction,
	towerDefenseState,
	updateIsTyping,
	onNFTError,
	onNFTSuccess,
	roomData
}: IBottomPanelProps) => {
	const [images, setImages] = useState<IImagesState[]>([]);
	const classes = useStyles();

	return (
		<Drawer
			variant="persistent"
			anchor="bottom"
			open={isOpen}
			// className="bottom-panel-drawer"
			classes={{
				paper: classes.drawerRoot
			}}
		>
			<div ref={bottomPanelRef} className="bottom-panel-container">
				<PanelContent
					type={type}
					setBrushColor={setBrushColor}
					onAction={onAction}
					towerDefenseState={towerDefenseState}
					updateIsTyping={updateIsTyping}
					images={images}
					setImages={setImages}
					onNFTError={onNFTError}
					onNFTSuccess={onNFTSuccess}
					roomData={roomData}
				/>
			</div>
		</Drawer>
	);
};

const PanelContent = ({
	type,
	setBrushColor,
	onAction,
	towerDefenseState,
	updateIsTyping,
	images,
	setImages,
	onNFTError,
	onNFTSuccess,
	roomData
}: IPanelContentProps) => {
	switch (type) {
		case 'emoji':
			return (
				<EmojiPanel
					onClick={(data: IEmojiDict) => {
						onAction('emoji', data);
					}}
				/>
			);
		case 'chat':
			return (
				<Chat
					sendMessage={(message) => {
						onAction('chat', message);
					}}
					pinMessage={(message) => {
						onAction('chat-pin', message);
					}}
					updateIsTyping={updateIsTyping}
				/>
			);
		case 'sound':
			return <SoundPanel sendSound={onAction} />;

		case 'gifs':
			return (
				<Gifs
					sendGif={(gif: IGif) => {
						onAction('gif', gif.id);
					}}
				/>
			);
		case 'tower':
			return (
				<TowerDefensePanel
					isStarted={towerDefenseState.isPlaying}
					gold={towerDefenseState.gold}
					onStart={() =>
						onAction('tower defense', {
							key: 'tower defense',
							value: 'start'
						})
					}
					onSelectTower={(towerValue: string) =>
						onAction('tower defense', {
							key: 'tower defense',
							value: 'select tower',
							tower: towerValue
						})
					}
				/>
			);
		case 'background':
			return (
				<BackgroundPanel
					sendImage={(name, type) => onAction(type, name)}
					setImages={setImages}
					images={images}
				/>
			);
		case 'animation':
			return <AnimationPanel sendAnimation={onAction} />;
		case 'whiteboard':
			return <WhiteboardPanel setBrushColor={setBrushColor} />;
		case 'settings':
			return (
				// <Profile />
				<SettingsPanel
					onSubmitUrl={(url) => onAction('settings', 'url', url)}
					onChangeName={(name) => onAction('settings', 'name', name)}
				/>
			);
		case 'weather':
			return (
				<Weather sendLocation={(location) => onAction('weather', location)} />
			);
			case 'maps':
				return (
					<MapsPanel />
				);
		case 'poem':
			return (
				<Poem
					sendMessage={(message) => {
						onAction('chat', message);
					}}
					pinMessage={(message) => {
						onAction('chat-pin', message);
					}}
					updateIsTyping={updateIsTyping}
				/>
			);
		case 'roomDirectory':
			return (
				<RoomDirectoryPanel
					sendRoomDirectory={onAction}
					onClickNewRoom={() => onAction('new-room')}
				/>
			);
		case 'email':
			return (
				<EmailPanel
					sendEmail={(email, message) => onAction('send-email', email, message)}
				/>
			);

		case 'NFT':
			return (
				<NFTPanel
					roomData={roomData}
					onError={onNFTError}
					onSuccess={onNFTSuccess}
				/>
			);
		case 'browseNFT':
			return (
				<iframe
					title="Opensea Listings" src='https://opensea.io/assets?embed=true'
				  width='100%'
				  height='100vh'
				  frameBorder='0'
				  allowFullScreen>
		    </iframe>
			);
		case 'twitter':
			return (
				<Twitter
				pinTweet={(id) => {
					onAction('tweet', id);
					console.log('step 2');
				}}
				updateIsTyping={updateIsTyping} />
			);
		default:
			return null;
	}
};
