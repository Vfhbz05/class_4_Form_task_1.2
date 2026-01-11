import { useState } from 'react';

import { Field } from './components/Field';
import { Information } from './components/Information';
import { AppLayout } from './components/AppLayout';
 
function App() {
 const [currentPlayer, setCurrentPlayer] = useState('X');
 const [isGameEnded, setIsGameEnded] = useState(false);
 const [isDraw, setIsDraw] = useState(false);
 const[field, setField] = useState([
	'', '', '',
	'', '', '',
	'', '', ''
 ]);
	const WIN_PATTERNS = [
		[0, 1, 2], [3, 4, 5], [6, 7, 8], // Варианты побед по горизонтали
		[0, 3, 6], [1, 4, 7], [2, 5, 8], // Варианты побед по вертикали
		[0, 4, 8], [2, 4, 6] // Варианты побед по диагонали
		];

		const getWinner = (field) => {
			for (const combination of WIN_PATTERNS){
				const [a, b, c] = combination;
				if (field[a] && field[a] === field[b] && field[a] === field[c]){
					return field[a];
				};
			};
			return null
		};
		
		const getDraw = (field) => {
			
			const isCellFull = field.every((cell)=>{return cell !== ''});
			
			const winner = getWinner(field);
			const hasWinner = winner !== null;
			return isCellFull && !hasWinner;
		}

		const onClickToCell = (index) => {
			if(field[index] !== '' || isGameEnded){
				return;
			}

			const newField = [...field];
			newField[index] = currentPlayer;

			const winner = getWinner(newField);
			const isDrawResult = getDraw(newField);

			setField(newField);
			if(winner) {
				setIsGameEnded(true);
			} else if (isDrawResult){
				setIsDraw(true);
				setIsGameEnded(true);
			} else {
				setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
			};
		} ;

		const onClickRestart = () => {
			setCurrentPlayer('X');
			setField([
					'', '', '',
					'', '', '',
					'', '', '',
				]);
			setIsDraw(false);
			setIsGameEnded(false);
		}
 return(
  <div>
	<AppLayout information = {
		<Information currentPlayer={currentPlayer} isGameEnded={isGameEnded} isDraw={isDraw}/>
		}
		field = {<Field field = {field} onClickToCell = {onClickToCell}/>
		}
		onClickRestart = {onClickRestart}/>
  </div>
 );
};
export default App;
