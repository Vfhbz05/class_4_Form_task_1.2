import { InformationLayout } from './InformationLayout';
import PropTypes from 'prop-types';

export const Information  = ({currentPlayer, isGameEnded, isDraw}) => {
 let status;

 if (isDraw){
	status = 'Ничья';
 } else if (isGameEnded){
	status = `Победил ${currentPlayer}`;
 } else {
	status = `Ходит ${currentPlayer}`;
 };

 return (
	<InformationLayout status = {status} currentPlayer ={currentPlayer}/>
 )
};

Information.PropTypes = {
currentPlayer: PropTypes.string,
isGameEnded: PropTypes.bool,
isDraw: PropTypes.bool,
}
